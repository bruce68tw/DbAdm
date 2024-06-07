using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class MyCrudController : BaseCtrl
    {
        #region Read View
        public async Task<ActionResult> Read()
        {
            await using var db = new Db();
            ViewBag.Projects = await _XpCode.ProjectsA(db);
            ViewBag.RitemTypes = await _XpCode.RitemTypesA(db);
            ViewBag.QitemTypes = await _XpCode.QitemTypesA(db);
            ViewBag.EitemTypes = await _XpCode.EitemTypesA(db);
            ViewBag.CheckTypes = await _XpCode.CheckTypesA(db);
            ViewBag.QitemOps = await _XpCode.QitemOpsA(db);
            ViewBag.AuthTypes = await _XpCode.AuthTypesA(db);
            ViewBag.AutoIdLens = _XpCode.AutoIdLens();
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new  MyCrudRead().GetPageA(Ctrl, dt));
        }
        #endregion

        private MyCrudEdit EditService()
        {
            return new MyCrudEdit(Ctrl);
        }

        #region Edit View        
        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonA(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonA(key));
        }

        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }
        #endregion

        #region others
        /// <summary>
        /// generate CRUD
        /// </summary>
        /// <param name="keys">crudId list</param>
        /// <returns>error msg if any</returns>
        [HttpPost]
        public async Task<string> GenCrud(string keys)
        {
            var result = await new GenCrudService().RunA(keys);
            return result;
        }

        //get table columns for modal
        public async Task<ContentResult> GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = await new ColumnService().GetRowsA(tableId);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }
        #endregion

    }//class
}