using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class TableController : ApiCtrl
    {
        public async Task<ActionResult> Read()
        {
            //test
            //_Fun.Except("exception test");

            ViewBag.Projects = await _XpCode.GetProjectsAsync(); //dropdown
            ViewBag.YesNos = _XpCode.GetYesNos();
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new TableRead().GetPageAsync(Ctrl, dt));
        }

        private TableEdit EditService()
        {
            return new TableEdit(Ctrl);
        }

        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonAsync(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonAsync(key));
        }

        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }
        */

        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteAsync(key));
        }

        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateAsync(_Str.ToJson(json)));
        }
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateAsync(key, _Str.ToJson(json)));
        }

        public async Task Export(string find)
        {
            await new TableRead().ExportAsync(_Str.ToJson(find));
        }

        //generate database document in word type
        //[HttpPost]
        public async Task GenWord(string keys)
        {
            var tableIds = keys.Split(',');
            await new GenDocuService().RunAsync("", tableIds);
        }

    }//class
}