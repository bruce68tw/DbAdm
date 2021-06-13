using Base.Enums;
using Base.Models;
using Base.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class MyCrudController : Controller
    {
        #region Read View
        public ActionResult Read()
        {
            using (var db = new Db())
            {
                ViewBag.Projects = _XpCode.GetProjects(db);
                ViewBag.RitemTypes = _XpCode.GetRitemTypes(db);
                ViewBag.QitemTypes = _XpCode.GetQitemTypes(db);
                ViewBag.EitemTypes = _XpCode.GetEitemTypes(db);
                ViewBag.CheckTypes = _XpCode.GetCheckTypes(db);
                ViewBag.QitemOps = _XpCode.GetQitemOps(db);
                ViewBag.AuthTypes = _XpCode.GetAuthTypes(db);
                return View();
            }
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new MyCrudRead().GetPage(dt).ToString(), ContentTypeEstr.Json);
        }
        #endregion

        #region Edit View        
        //ContentResult for newton json, (JsonResult for model)
        public ContentResult GetJson(string key)
        {
            return Content(new MyCrudEdit().GetJson(key).ToString(), ContentTypeEstr.Json);
        }

        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.Crud", "Id", key, status));
        }

        public JsonResult Delete(string key)
        {
            return Json(new MyCrudEdit().Delete(key));
        }

        public JsonResult Create(string json)
        {
            return Json(new MyCrudEdit().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(new MyCrudEdit().Update(key, _Json.StrToJson(json)));
        }
        #endregion

        #region others
        //generate CRUD
        //keys: crudId list
        //return: 1(ok), 0(failed)
        [HttpPost]
        public async Task<int> GenCrud(string keys)
        {
            var service = new GenCrudService();
            var result = await service.RunAsync(keys) ? 1 : 0;
            return result;
        }

        //get table columns for modal
        public ContentResult GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = new ColumnService().GetRows(tableId);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }

        #endregion

    }//class
}