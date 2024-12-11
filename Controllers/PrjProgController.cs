using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    [XgProgAuth]
    public class PrjProgController : BaseCtrl
    {
        public async Task<ActionResult> Read()
        {
			//for read view
			ViewBag.Projects = await _XpCode.ProjectsA();
			//for edit view
			//ViewBag. = _XpCode.();
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new PrjProgRead().GetPageA(Ctrl, dt));
        }

        private PrjProgEdit EditService()
        {
            return new PrjProgEdit(Ctrl);
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
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }

        [HttpPost]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        [HttpPost]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }


    }//class
}