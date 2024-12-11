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
    public class IssueController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            await using (var db = new Db())
            {
                ViewBag.Projects = await _XpCode.ProjectsA(db);
                ViewBag.IssueTypes = await _XpCode.IssueTypesA(db);
                ViewBag.Users = await _XpCode.UsersA(db);
            }
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new IssueRead().GetPageA(Ctrl, dt));
        }

        private IssueEdit EditService()
        {
            return new IssueEdit(Ctrl);
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

        [HttpPost]
        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Export)]
        public async Task Export(string find)
        {
            await new IssueRead().ExportA(Ctrl, _Str.ToJson(find)!);
        }

        //固定傳入 parentId
        [HttpPost]
        public async Task<JsonResult> GetPrjProgs(string parentId)
        {
            return Json(await _XpCode.PrjProgsA(parentId));
        }

    }//class
}