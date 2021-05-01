using Base.Services;
using BaseWeb.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace DbAdm.Services
{
    public class GenLogSqlService
    {
        /// <summary>
        /// 在畫面上直接產生異動Sql檔
        /// </summary>
        /// <param name="projectId"></param>
        public void Run(string projectId)
        {
            //check input
            var error = "";
            if (string.IsNullOrEmpty(projectId))
            {
                error = "ProjectId is need.";
                goto lab_error;
            }

            #region check template file
            var filePath = _Xp.GetTpl("TranLog.sql");
            var tplLog = _File.ToStr(filePath);
            if (string.IsNullOrEmpty(tplLog))
            {
                error = "no file " + filePath;
                goto lab_error;
            }
            #endregion

            #region read column rows
            var NoCols = new List<string>() { "Creator", "Created", "Reviser", "Revised" };
            var db = _Xp.GetDb();
            var query = (from c in db.Column
                         join t in db.Table on c.TableId equals t.Id
                         join p in db.Project on t.ProjectId equals p.Id
                         where t.ProjectId == projectId
                         where !NoCols.Contains(c.Code) 
                         where t.TranLog
                         select new { c, t, p }
                         );

            var tables = query
                .Select(a => new
                {
                    a.p.DbName,
                    TableCode = a.t.Code,
                    ColCode = a.c.Code,
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
                        .Select(b => b.ColCode)
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

            #region ms stream for echo
            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);

            //consider ident, start/end no need carrier
            var tplUpdRow = @"
    if update({Col})        
        insert into dbo.XpTranLog(RowId, TableName, ColName, OldValue, NewValue, Act, Created) values
            (@id, @table, '{Col}', (select[{Col}] from deleted), (select[{Col}] from inserted), @act, @now);";

            //write stream
            var newLine = _Fun.TextCarrier;
            for (var i = 0; i < tableLen; i++)
            {
                //replace
                var cols = "";
                foreach(var col in tables[i].Cols)
                    cols += tplUpdRow.Replace("{Col}", col);
                writer.Write(tplLog.Replace("{Table}", tables[i].TableCode).Replace("{Columns}", cols) + newLine);
            }

            //echo stream to file
            writer.Flush();
            _Web.StreamToScreen(ms, tables[0].DbName + "_TranLog.sql");
            return;
            #endregion

        lab_error:
            _Log.Error("GenLogSqlService.cs Run() failed: " + error);
            return;
        }

    }//class
}
