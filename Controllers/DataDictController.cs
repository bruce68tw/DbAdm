using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    [XgLogin]
    public class DataDictController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            ViewBag.TableTypes = await _XpCode.TableTypesA();
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new DataDictRead().GetPageA(dt));
        }

        private DataDictEdit EditService()
        {
            return new DataDictEdit(Ctrl);
        }

        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonA(key));
        }

    }//class
}