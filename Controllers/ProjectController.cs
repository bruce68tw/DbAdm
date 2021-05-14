using Base.Enums;
using Base.Models;
using Base.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class ProjectController : Controller
    {
        public ActionResult Read()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new ProjectRead().GetPage(dt).ToString(), ContentTypeEstr.Json);
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new ProjectEdit().Delete(key));
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new ProjectEdit().GetJson(key).ToString(), ContentTypeEstr.Json);
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new ProjectEdit().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(new ProjectEdit().Update(key, _Json.StrToJson(json)));
        }

        //import db schema into system
        //id: project Id
        public JsonResult Import(string id)
        {
            return Json(new ImportDbService().Run(id));
        }

        //generate word file
        //id: project Id
        public void GenWord(string id)
        {
            new GenDocuService().Run(id);
        }

        //generate tran log sql file
        //id: project Id
        public void GenLogSql(string id)
        {
            new GenLogSqlService().Run(id);
        }

    }//class
}