using Base.Models;
using Base.Services;
using BaseWeb.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class ProjectController : MyController
    {
        public ActionResult Read()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return JsonToCnt(new ProjectRead().GetPage(Ctrl, dt));
        }

        private ProjectEdit EditService()
        {
            return new ProjectEdit(Ctrl);
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(EditService().Delete(key));
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

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(EditService().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(EditService().Update(key, _Json.StrToJson(json)));
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