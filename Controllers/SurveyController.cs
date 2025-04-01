using Base.Enums;
using Base.Models;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    [XgLogin]
    public class SurveyController : BaseCtrl
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
            return JsonToCnt(await new SurveyRead().GetPageA(dt));
        }

        private SurveyEdit EditService()
        {
            return new SurveyEdit(Ctrl);
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonA(key));
        }

    }//class
}