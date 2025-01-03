using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DbAdm.Controllers
{
    //[XgProgAuth]
    public class RptIssueController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            await using (var db = new Db())
            {
                ViewBag.Projects = await _XpCode.ProjectsA(db);
                ViewBag.IssueTypes = await _XpCode.IssueTypesA(db);
            }
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            //讀取資料, 但是傳回Page model配合datatables
            var rows = await new RptIssueRead().GetRowsA(Ctrl, _Str.ToJson(dt.findJson)!);
            var json = JObject.FromObject(new
            {
                data = rows,
                recordsFiltered = (rows == null) ? 0 : rows.Count,
            });
            return JsonToCnt(json);
        }

        //[HttpPost]
        [XgProgAuth(CrudEnum.Export)]
        public async Task Export(string find)
        {
            await new RptIssueRead().ExportA(Ctrl, _Str.ToJson(find)!);
        }

    }//class
}