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
        //顯示清單畫面
        public ActionResult Read()
        {
            //讀取專案欄位(下拉式)來源資料
            ViewBag.Projects = _XpCode.GetProjects();
            return View();
        }

        //傳回查詢結果
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

        //顯示編輯畫面
        public ActionResult Edit()
        {
            return View();
        }

        //傳回一筆資料
        public ContentResult GetJson(string key)
        {
            return Content(new ColumnEdit().GetJson(key).ToString(), ContentTypeEstr.Json, Encoding.UTF8);
        }

        //儲存新增的資料
        public JsonResult Create(string json)
        {
            return Json(new ColumnEdit().Create(_Json.StrToJson(json)));
        }

        //儲存修改的資料
        public JsonResult Update(string key, string json)
        {
            return Json(new ColumnEdit().Update(key, _Json.StrToJson(json)));
        }

        //刪除一筆資料
        public JsonResult Delete(string key)
        {
            return Json(new ColumnEdit().Delete(key));
        }

    }//class
}