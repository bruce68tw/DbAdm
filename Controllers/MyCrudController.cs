using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class MyCrudController : MyController
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
            return JsonToCnt(new MyCrudRead().GetPage(Ctrl, dt));
        }
        #endregion

        private MyCrudEdit EditService()
        {
            return new MyCrudEdit(Ctrl);
        }

        #region Edit View        
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
            return Json(_Db.SetRowStatus("dbo.Crud", "Id", key, status));
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