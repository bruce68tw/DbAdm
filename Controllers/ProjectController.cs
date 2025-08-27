using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    [XgLogin]
    public class ProjectController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public ActionResult Read()
        {
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new ProjectRead().GetPageA(Ctrl, dt));
        }

        private ProjectEdit EditSvc()
        {
            return new ProjectEdit(Ctrl);
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditSvc().CreateA(_Str.ToJson(json)!));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditSvc().UpdateA(key, _Str.ToJson(json)!));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditSvc().GetUpdJsonA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditSvc().GetViewJsonA(key));
        }

        /// <summary>
        /// import db schema into system
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task<JsonResult> Import(string id)
        {
            //檢查權限: 用戶對此筆專案是否有異動權限
            var error = await _Auth.CheckAuthUserA(Ctrl, CrudEnum.Update, "Project", "Creator", id);
            return (error == "")
                ? Json(await new ImportDbSvc().RunA(id))
                : Json(_Json.GetError(error));
        }

        /// <summary>
        /// generate word file
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task GenWord(string id)
        {
            await new GenDocuSvc().RunA(id);
        }

        /// <summary>
        /// generate tran log sql file
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task GenLogSql(string id)
        {
            //raise exception for show default error.
            if (!await new GenLogSqlSvc().RunA(id))
                _Fun.Except();
        }

        /// <summary>
        /// generate txt file for table relationShips
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        /*
        public async Task GenRelat(string id)
        {
            await new GenTableRelatService().RunA(id);
        }
        */

    }//class
}