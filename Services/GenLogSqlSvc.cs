using Base.Services;
using BaseApi.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class GenLogSqlSvc
    {
        /// <summary>
        /// generate trigger sql file
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public async Task<bool> RunA(string projectId)
        {
            #region 1.check input
            var error = "";
            if (_Str.IsEmpty(projectId))
            {
                error = "ProjectId is Need.";
                goto lab_error;
            }
            #endregion

            #region 2.check template file
            var filePath = _Xp.GetTplPath("TranLog.sql", false);
            var tplLog = await _File.ToStrA(filePath);
            if (_Str.IsEmpty(tplLog))
            {
                error = "no file " + filePath;
                goto lab_error;
            }
            #endregion

            #region 3.get column rows
            var SkipCols = new List<string>() { "Creator", "Created", "Reviser", "Revised" };
            var db = _Xp.GetDb();
            var query = (from c in db.Column
                         join t in db.Table on c.TableId equals t.Id
                         join p in db.Project on t.ProjectId equals p.Id
                         where t.ProjectId == projectId
                         where !SkipCols.Contains(c.Fid) 
                         where t.TranLog
                         where c.Status
                         select new { c, t, p }
                         );
            #endregion

            #region 4.get table rows and group by
            var tables = query
                .Select(a => new
                {
                    a.p.DbName,
                    TableCode = a.t.Code,
                    Fid = a.c.Fid,
                    a.c.Sort,
                })
                .ToList()
                .GroupBy(a => new { a.DbName, a.TableCode })
                .OrderBy(a => a.Key.TableCode)
                .Select(a => new 
                { 
                    a.Key.DbName, 
                    a.Key.TableCode, 
                    Cols = a.OrderBy(b => b.Sort)
                        .Select(b => b.Fid)
                        .ToList(),
                })
                .ToList();

            var tableLen = tables.Count;
            if (tableLen == 0)
            {
                error = "No table found";
                goto lab_error;
            }
            #endregion

            #region 5.write ms stream and output sql file
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);

            //consider ident, start/end no need carrier
            var tplUpdRow = @"
    if update({Col})        
        insert into dbo.XpTranLog(RowId, TableName, ColName, OldValue, NewValue, Act, Created) values
            (@id, @table, '{Col}', (select[{Col}] from deleted), (select[{Col}] from inserted), @act, @now);";

            #region write stream
            var newLine = _Fun.TextCarrier;
            for (var i = 0; i < tableLen; i++)
            {
                //replace
                var cols = "";
                foreach(var col in tables[i].Cols)
                    cols += tplUpdRow.Replace("{Col}", col);
                writer.Write(tplLog!.Replace("{Table}", tables[i].TableCode).Replace("{Columns}", cols) + newLine);
            }
            #endregion

            //echo stream to file
            writer.Flush();
            await _FunApi.ExportByStreamA(ms, tables[0].DbName + "_TranLog.sql");
            return true;
            #endregion

        lab_error:
            await _Log.ErrorRootA("GenLogSqlService.cs Run() failed: " + error);
            return false;
        }
    }
}
