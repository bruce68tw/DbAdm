using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using BaseWeb.Models;
using BaseWeb.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[XgLogin]
    public class UiController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            ViewBag.Projects = await _XpCode.ProjectsA();
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new UiRead().GetPageA(dt));
        }

        private UiEdit EditSvc()
        {
            return new UiEdit(Ctrl);
        }

        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditSvc().CreateA(_Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditSvc().UpdateA(key, _Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditSvc().GetUpdJsonA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditSvc().GetViewJsonA(key));
        }

        //�Ǧ^��J���html, �����Ǧ^ViewComponentResult, �e�ݦ��쬰�r��
        [HttpPost]
        //[XgProgAuth(CrudEnum.View)]
        public string GetInputHtml(string inputType)
        {
            return _Input.XiText(new XiTextDto());
        }

    }//class
}