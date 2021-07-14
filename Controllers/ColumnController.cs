using Base.Models;
using Base.Services;
using BaseWeb.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class ColumnController : MyController
    {
        public ActionResult Read()
        {
            ViewBag.Projects = _XpCode.GetProjects();
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return JsonToCnt(new ColumnRead().GetPage(Ctrl, dt));
        }

        private ColumnEdit EditService()
        {
            return new ColumnEdit(Ctrl);
        }

        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Column]", "Id", key, status));
        }
		*/

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

        public JsonResult Create(string json)
        {
            return Json(EditService().Create(_Json.StrToJson(json)));
        }

        public JsonResult Update(string key, string json)
        {
            return Json(EditService().Update(key, _Json.StrToJson(json)));
        }

        public JsonResult Delete(string key)
        {
            return Json(EditService().Delete(key));
        }        

    }//class
}