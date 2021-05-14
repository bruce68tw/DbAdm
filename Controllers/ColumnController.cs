using Base.Enums;
using Base.Models;
using Base.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class ColumnController : Controller
    {
        public ActionResult Read()
        {
            ViewBag.Projects = _XpCode.GetProjects();
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new ColumnRead().GetPage(dt).ToString(), ContentTypeEstr.Json, Encoding.UTF8);
        }

        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Column]", "Id", key, status));
        }
		*/

        public ContentResult GetJson(string key)
        {
            return Content(new ColumnEdit().GetJson(key).ToString(), ContentTypeEstr.Json, Encoding.UTF8);
        }

        public JsonResult Create(string json)
        {
            return Json(new ColumnEdit().Create(_Json.StrToJson(json)));
        }

        public JsonResult Update(string key, string json)
        {
            return Json(new ColumnEdit().Update(key, _Json.StrToJson(json)));
        }

        public JsonResult Delete(string key)
        {
            return Json(new ColumnEdit().Delete(key));
        }

    }//class
}