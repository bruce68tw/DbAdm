using Base.Models;
using Base.Services;
using BaseWeb.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class TableController : MyController
    {
        public ActionResult Read()
        {
            ViewBag.Projects = _XpCode.GetProjects(); //dropdown
            ViewBag.YesNos = _XpCode.GetYesNos();
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return JsonToCnt(new TableRead().GetPage(Ctrl, dt));
        }

        private TableEdit EditService()
        {
            return new TableEdit(Ctrl);
        }

        [HttpPost]
        public ContentResult GetUpdateJson(string key)
        {
            return JsonToCnt(EditService().GetUpdateJson(key));
        }

        [HttpPost]
        public ContentResult GetViewJson(string key)
        {
            return JsonToCnt(EditService().GetViewJson(key));
        }

        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }
        */

        public JsonResult Delete(string key)
        {
            return Json(EditService().Delete(key));
        }

        public JsonResult Create(string json)
        {
            return Json(EditService().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(EditService().Update(key, _Json.StrToJson(json)));
        }

        public void Export(string find)
        {
            new TableRead().Export(Ctrl, _Json.StrToJson(find));
        }

        //generate database document in word type
        //[HttpPost]
        public void GenWord(string keys)
        {
            var tableIds = keys.Split(',');
            new GenDocuService().Run("", tableIds);
        }

    }//class
}