using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
				//ViewBag.Reporters = await _XpCode.ReportersA(db);
				ViewBag.Users = await _XpCode.UsersA(db);
                ViewBag.YesNos = _XpCode.YesNos();
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
		public async Task<JsonResult> Create(string json, List<IFormFile> t00_FileName)
		{
			return Json(await EditService().CreateA(_Str.ToJson(json)!, t00_FileName));
		}

		[HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json, List<IFormFile> t00_FileName)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!, t00_FileName));
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

        //傳回專案功能清單, 固定傳入 parentId
        [HttpPost]
        public async Task<JsonResult> GetPrjProgs(string parentId)
        {
            return Json(await _XpCode.PrjProgsA(parentId));
        }

		public async Task<FileResult?> ViewFile(string table, string fid, string key, string ext)
		{
			return (fid == "FileName")
				? await _Xp.ViewIssueFileA(fid, key, ext)
				: null;
		}

        //加入追踪
        [HttpPost]
        public async Task<string> AddWatch(string issueId)
        {
            return await _Db.ExecSqlA($@"
insert into dbo.IssueWatch(Id,IssueId,WatcherId) values (
    '{_Str.NewId()}',@IssueId, '{_Fun.UserId()}'
)", ["IssueId", issueId]) == 1 ? "1" : "0";
        }

        //取消追踪
        [HttpPost]
        public async Task<string> DeleteWatch(string issueId)
        {
            return await _Db.ExecSqlA($@"
delete dbo.IssueWatch where IssueId=@IssueId and WatcherId='{_Fun.UserId()}'
", ["IssueId", issueId]) == 1 ? "1" : "0";
        }

        //寄送問卷
        [HttpPost]
        public async Task<string> SendSurvey(string issueId)
        {
            return await new SurveyService().SendSurveyA(issueId);
        }

    }//class
}