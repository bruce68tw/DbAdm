using Base.Enums;
using Base.Models;
using Base.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class TableController : Controller
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
            return Content(new TableRead().GetPage(dt).ToString(), ContentTypeEstr.Json);
        }

        public void Export(string cond)
        {
            new TableRead().Export(_Json.StrToJson(cond));
        }

        public ContentResult GetJson(string key)
        {
            return Content(new TableEdit().GetJson(key).ToString(), ContentTypeEstr.Json);
        }
                
        /*
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Table]", "Id", key, status));
        }
        */

        public JsonResult Delete(string key)
        {
            return Json(new TableEdit().Delete(key));
        }

        public JsonResult Create(string json)
        {
            return Json(new TableEdit().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(new TableEdit().Update(key, _Json.StrToJson(json)));
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