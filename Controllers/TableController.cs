using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    [XgLogin]
    public class TableController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            //test
            //_Fun.Except("exception test");

            ViewBag.Projects = await _XpCode.ProjectsA(); //dropdown
            ViewBag.YesNos = _XpCode.YesNos();
            ViewBag.Statuses = _XpCode.Statuses();
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new TableRead().GetPageA(Ctrl, dt));
        }

        private TableEdit EditSvc()
        {
            return new TableEdit(Ctrl);
        }

        //新增(DB)
        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditSvc().CreateA(_Str.ToJson(json)!));
        }

        //修改(DB)
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditSvc().UpdateA(key, _Str.ToJson(json)!));
        }

        //讀取要修改的資料(Get Updated Json)
        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditSvc().GetUpdJsonA(key));
        }

        //刪除(DB)
        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditSvc().GetViewJsonA(key));
        }

        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }
        */

        public async Task Export(string find)
        {
            await new TableRead().ExportA(_Str.ToJson(find)!);
        }

        //generate database document in word type
        //[HttpPost]
        public async Task GenWord(string keys)
        {
            var tableIds = keys.Split(',');
            await new GenDocuSvc().RunA("", tableIds);
        }

    }//class
}