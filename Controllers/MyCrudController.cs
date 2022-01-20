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
    public class MyCrudController : ApiCtrl
    {
        #region Read View
        public async Task<ActionResult> Read()
        {
            await using var db = new Db();
            ViewBag.Projects = await _XpCode.GetProjectsAsync(db);
            ViewBag.RitemTypes = await _XpCode.GetRitemTypesAsync(db);
            ViewBag.QitemTypes = await _XpCode.GetQitemTypesAsync(db);
            ViewBag.EitemTypes = await _XpCode.GetEitemTypesAsync(db);
            ViewBag.CheckTypes = await _XpCode.GetCheckTypesAsync(db);
            ViewBag.QitemOps = await _XpCode.GetQitemOpsAsync(db);
            ViewBag.AuthTypes = await _XpCode.GetAuthTypesAsync(db);
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new  MyCrudRead().GetPageAsync(Ctrl, dt));
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
            return JsonToCnt(await EditService().GetUpdJsonAsync(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonAsync(key));
        }

        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteAsync(key));
        }

        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateAsync(_Str.ToJson(json)));
        }
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateAsync(key, _Str.ToJson(json)));
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
            var result = await new GenCrudService().RunAsync(keys);
            return result;
        }

        //get table columns for modal
        public async Task<ContentResult> GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = await new ColumnService().GetRowsAsync(tableId);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }
        #endregion

    }//class
}