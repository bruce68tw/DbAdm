using Base.Services;
using BaseWeb.Services;
using DocumentFormat.OpenXml.Packaging;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace DbAdm.Services
{
    public class GenDocuService
    {
        /// <summary>
        /// 在畫面上直接產生word檔 for db文件
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="tableIds"></param>
        public void Run(string projectId, string[] tableIds = null)
        {
            //check input
            var error = "";
            if (string.IsNullOrEmpty(projectId) && (tableIds == null || tableIds.Length == 0))
            {
                error = "ProjectId & TableIds are need.";
                goto lab_error;
            }

            #region check template file
            //var locale = _Fun.GetLocale();
            var tplPath = _Xp.GetTpl("Table.docx");
            if (!File.Exists(tplPath))
            {
                error = "no file " + tplPath;
                goto lab_error;
            }
            #endregion

            #region read column rows
            var db = _Xp.GetDb();
            var query = (from c in db.Column
                         join t in db.Table on c.TableId equals t.Id
                         join p in db.Project on t.ProjectId equals p.Id
                         select new { c, t, p }
                         );

            //add where condition
            if (!string.IsNullOrEmpty(projectId))
                query = query.Where(a => a.t.ProjectId == projectId);
            if (tableIds != null && tableIds.Length > 0)
                query = query.Where(a => tableIds.Contains(a.t.Id));

            var tables = query
                .Select(a => new
                {
                    ProjectCode = a.p.Code,
                    TableCode = a.t.Code,
                    TableName = a.t.Name,
                    a.c.Code,
                    a.c.Name,
                    a.c.DataType,
                    Nullable = a.c.Nullable ? "Y" : "",
                    a.c.DefaultValue,
                    a.c.Note,
                    S=a.c.Sort,
                })
                .ToList()
                .GroupBy(a => new { a.ProjectCode, a.TableCode, a.TableName })
                .OrderBy(a => a.Key.TableCode)
                .Select(a => new 
                { 
                    a.Key.ProjectCode, 
                    a.Key.TableCode, 
                    a.Key.TableName,
                    Cols = a.OrderBy(b => b.S).ToList(),
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
            var tplBytes = File.ReadAllBytes(tplPath);
            ms.Write(tplBytes, 0, tplBytes.Length);

            //binding stream && docx
            using (var docx = WordprocessingDocument.Open(ms, true))
            {
                //initial && read template file
                var wordSet = new WordSetService(docx);
                var mainTpl = wordSet.GetMainStr();

                //get word body start/end pos
                int bodyStart = 0, bodyEnd = 0; //no start/end tag
                var bodyTpl = wordSet.GetBodyTpl(mainTpl, ref bodyStart, ref bodyEnd);

                //get row template string
                int rowStart = 0, rowEnd = 0;
                var rowTpl = wordSet.GetRowTpl(bodyTpl, ref rowStart, ref rowEnd);
                if (rowTpl == "")
                {
                    error = "can not find rowTpl String.";
                    goto lab_error;
                }

                //columns loop
                var bodyLeft = bodyTpl.Substring(0, rowStart);
                var bodyRight = bodyTpl.Substring(rowEnd);
                var fileStr = "";   //file string to echo
                for (var i = 0; i < tableLen; i++)
                {
                    //file add table string
                    var tableCode = tables[i].TableCode;
                    var tableCols = tables[i].Cols;
                    fileStr += bodyLeft.Replace("[Table]", tableCode + "(" + tables[i].TableName + ")") +
                        _Word.TplFillRows(rowTpl, tableCols) +
                        bodyRight;

                    //add page break if need
                    if (i < tableLen - 1)
                        fileStr += wordSet.GetPageBreak();
                }

                fileStr = mainTpl.Substring(0, bodyStart) +
                    fileStr +
                    mainTpl.Substring(bodyEnd + 1);

                //write string into docx
                wordSet.WriteMainStr(fileStr);

                //Debug.Assert(IsDocxValid(doc), "Invalid File!");
                //no save, but can debug !!
                //mainPart.Document.Save();
                //return;
            }

            //echo stream to file
            _Web.StreamToScreen(ms, "Table.docx");
            return;
            #endregion

        lab_error:
            _Log.Error("GenDocuService.cs Run() failed: " + error);
            return;
        }

    }//class
}
