using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class TableController : BaseCtrl
    {
        public async Task<ActionResult> Read()
        {
            //test
            //_Fun.Except("exception test");

            ViewBag.Projects = await _XpCode.ProjectsA(); //dropdown
            ViewBag.YesNos = _XpCode.YesNos();
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new TableRead().GetPageA(Ctrl, dt));
        }

        private TableEdit EditService()
        {
            return new TableEdit(Ctrl);
        }

        //讀取要修改的資料(Get Updated Json)
        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonA(key));
        }

        //新增(DB)
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }
        //修改(DB)
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        //刪除(DB)
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        public async Task Export(string find)
        {
            await new TableRead().ExportAsync(_Str.ToJson(find)!);
        }

        //generate database document in word type
        //[HttpPost]
        public async Task GenWord(string keys)
        {
            var tableIds = keys.Split(',');
            await new GenDocuService().RunA("", tableIds);
        }

        /*
        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonAsync(key));
        }

        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }
        */

    }//class
}