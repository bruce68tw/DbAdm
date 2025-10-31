using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

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
            ViewBag.InputTypesQ = await _XpCode.InputTypesQA(db);
            ViewBag.InputTypes = await _XpCode.InputTypesA(db);
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

        private BaseEditSvc EditSvc(int editNo)
        {
            return (editNo == 0)
                ? new MyCrudEdit(Ctrl)
                : new MyCrudUiEdit(Ctrl);
        }

        #region Edit View   
        //考慮多個編輯畫面
        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key, int editNo = 0)
        {
            return JsonToCnt(await EditSvc(editNo).GetUpdJsonA(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key, int editNo = 0)
        {
            return JsonToCnt(await EditSvc(editNo).GetViewJsonA(key));
        }

        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc(0).DeleteA(key));
        }

        //myCrud才有新增
        public async Task<JsonResult> Create(string json, int editNo = 0)
        {
            return Json(await EditSvc(0).CreateA(_Str.ToJson(json)!));
        }
        public async Task<JsonResult> Update(string key, string json, int editNo = 0)
        {
            return Json(await EditSvc(editNo).UpdateA(key, _Str.ToJson(json)!));
        }
        #endregion

        #region others
        /// <summary>
        /// generate CRUD
        /// </summary>
        /// <param name="keys">crudId list</param>
        /// <returns>error msg if any</returns>
        [HttpPost]
        public async Task<string> GenCrud(string id)
        {
            var result = await new MyCrudSvc().GenCrudA(id);
            return result;
        }

        //get table columns for modal
        public async Task<ContentResult> GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = await new ColumnSvc().GetRowsA(tableId);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }
        #endregion

    }//class
}