using Base.Services;
using BaseApi.Services;
using DocumentFormat.OpenXml.Packaging;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class GenTableRelatService
    {
        /// <summary>
        /// generate database word document
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="tableIds"></param>
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
            var tplPath = _Xp.GetTplPath("Table.docx", true);
            if (!File.Exists(tplPath))
            {
                error = "no file " + tplPath;
                goto lab_error;
            }
            #endregion

            #region 2.read column rows & group by
            var db = _Xp.GetDb();
            var query = (from c in db.Column
                         join t in db.Table on c.TableId equals t.Id
                         join p in db.Project on t.ProjectId equals p.Id
                         where (c.Status && t.Status)
                         select new { c, t, p }
                         );

            //add where condition
            if (!_Str.IsEmpty(projectId))
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
                    //docx template file use "S" as field name for less space !!
                    S = a.c.Sort,
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

            #region 3.get memory stream for download file
            var ms = new MemoryStream();
            var tplBytes = File.ReadAllBytes(tplPath);
            ms.Write(tplBytes, 0, tplBytes.Length);
            #endregion

            //binding stream && docx
            using (var docx = WordprocessingDocument.Open(ms, true))
            {
                #region 4.get body/row template string
                var wordSet = new WordSetSvc(docx);
                var mainTplStr = wordSet.GetMainPartStr();

                //get word body start/end pos
                //int bodyStart = 0, bodyEnd = 0; //no start/end tag
                var bodyTpl = wordSet.GetBodyTpl(mainTplStr);

                //get row template string
                //int rowStart = 0, rowEnd = 0;
                var rowTpl = wordSet.GetRowTpl(bodyTpl.TplStr);
                if (rowTpl == null)
                {
                    error = "can not find rowTpl String.";
                    goto lab_error;
                }
                #endregion

                //table list loop
                var bodyLeft = bodyTpl.TplStr[..rowTpl.StartPos];
                var bodyRight = bodyTpl.TplStr[rowTpl.EndPos..];
                var fileStr = "";   //file string to echo
                for (var i = 0; i < tableLen; i++)
                {
                    #region 5.get table string
                    var tableCode = tables[i].TableCode;
                    var tableCols = tables[i].Cols;
                    fileStr += bodyLeft.Replace("[Table]", tableCode + "(" + tables[i].TableName + ")") +
                        _Word.TplFillRows(rowTpl.TplStr, tableCols) +
                        bodyRight;
                    #endregion

                    #region 6.add page break if need
                    if (i < tableLen - 1)
                        fileStr += wordSet.GetPageBreak();
                    #endregion
                }

                #region 7.get file string
                fileStr = mainTplStr[..bodyTpl.StartPos] +
                    fileStr +
                    mainTplStr[(bodyTpl.EndPos + 1)..];

                //write string into docx
                wordSet.SetMainPartStr(fileStr);
                #endregion

                #region remark testing code
                //Debug.Assert(IsDocxValid(doc), "Invalid File!");
                //no save, but can debug !!
                //mainPart.Document.Save();
                //return;
                #endregion
            }

            //8.download file
            await _FunApi.ExportByStreamA(ms, "Tables.docx");
            return true;

        lab_error:
            await _Log.ErrorRootA("GenTableRelatService.cs RunA() failed: " + error);
            return false;
        }

    }//class
}
