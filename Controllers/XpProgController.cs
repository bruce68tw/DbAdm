using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using BaseApi.Services;
using DbAdm.Attributes;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    [MyProgAuth]
    public class XpProgController : BaseCtrl
    {
        public async Task<ActionResult> Read()
        {
            //for edit view
            await using (var db = new Db())
            {
                ViewBag.Roles = await _Code.RolesA(db);
                ViewBag.AuthRanges = await _XpCode.AuthRangesA(db);
            }
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new XgProgRead().GetPageA(Ctrl, dt));
        }

        private XgProgEdit EditSvc()
        {
            return new XgProgEdit(Ctrl);
        }

        [HttpPost]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditSvc().CreateA(_Str.ToJson(json)!));
        }

        [HttpPost]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditSvc().UpdateA(key, _Str.ToJson(json)!));
        }

        [HttpPost]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc().DeleteA(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditSvc().GetUpdJsonA(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditSvc().GetViewJsonA(key));
        }

    }//class
}