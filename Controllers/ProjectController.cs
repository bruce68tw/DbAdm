using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class ProjectController : ApiCtrl
    {
        public ActionResult Read()
        {
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new ProjectRead().GetPageA(Ctrl, dt));
        }

        private ProjectEdit EditService()
        {
            return new ProjectEdit(Ctrl);
        }

        [HttpPost]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

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

        [HttpPost]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)));
        }

        [HttpPost]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)));
        }

        /// <summary>
        /// import db schema into system
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task<JsonResult> Import(string id)
        {
            return Json(await new ImportDbService().RunA(id));
        }

        /// <summary>
        /// generate word file
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task GenWord(string id)
        {
            await new GenDocuService().RunA(id);
        }

        /// <summary>
        /// generate tran log sql file
        /// </summary>
        /// <param name="id">project Id</param>
        /// <returns></returns>
        public async Task GenLogSql(string id)
        {
            //raise exception for show default error.
            if (!await new GenLogSqlService().RunA(id))
                _Fun.Except();
        }

    }//class
}