using Base.Services;
using BaseApi.Services;
 
namespace DbAdm.Services
{
    public class GenDocuSvc
    {
        /// <summary>
        /// generate database word document
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="tableIds">如果要產生某些table的資料, 則填此欄位, 並且projectId為空</param>
        /// <return>error msg if any</return>
        public async Task<bool> RunA(string projectId, string[]? tableIds = null)
        {
            #region 1.check input & template file
            var error = "";
            if (_Str.IsEmpty(projectId) && (tableIds == null || tableIds.Length == 0))
            {
                error = "ProjectId & TableIds are need.";
                goto lab_error;
            }

            //var locale = _Fun.GetLocale();
            var tplPath = _Xp.GetTplPath("Table.docx", false);
            if (!File.Exists(tplPath))
            {
                error = "no file " + tplPath;
                goto lab_error;
            }
            #endregion

            #region 2.read all column rows & group by
            var db = _Xp.GetDb();
            var query = (from c in db.Column
                         join t in db.Table on c.TableId equals t.Id
                         join p in db.Project on t.ProjectId equals p.Id
                         where (c.Status && t.Status)
                         select new { c, t, p }
                         );

            //add where condition
            if (_Str.NotEmpty(projectId))
                query = query.Where(a => a.t.ProjectId == projectId);
            if (tableIds != null && tableIds.Length > 0)
                query = query.Where(a => tableIds.Contains(a.t.Id));

            var tables = query
                .Select(a => new
                {
                    ProjectCode = a.p.Code,
                    TableCode = a.t.Code,
                    TableName = a.t.Name,
                    a.c.Fid,
                    a.c.Name,
                    a.c.DataType,
                    Nullable = a.c.Nullable ? "Y" : "",
                    a.c.DefaultValue,
                    a.c.Note,
                    //docx template file use "S" as field name for less space !!
                    S = a.c.Sort,   //配合template欄位名稱
                })
                .ToList()
                .GroupBy(a => new { a.ProjectCode, a.TableCode, a.TableName })
                .OrderBy(a => a.Key.TableCode)
                .Select(a => new 
                { 
                    a.Key.ProjectCode, 
                    a.Key.TableCode, 
                    a.Key.TableName,
                    //只有一個_Child, 不必使用childs
                    _child = a.OrderBy(b => b.S).ToList(),  //同 _Fun.FidChild
                })
                .ToList();

            var tableLen = tables.Count;
            if (tableLen == 0)
            {
                error = "No table found";
                goto lab_error;
            }
            #endregion

            var ms = _Word.TplRowsToMs(tplPath, tables);

            //8.download file
            await _Fun2.ExportByStreamA(ms!, "Tables.docx");
            return true;

        lab_error:
            await _Log.ErrorRootA("GenDocuSvc.cs RunA() failed: " + error);
            return false;
        }

    }//class
}
