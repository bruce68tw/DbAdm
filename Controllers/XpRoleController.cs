using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using DbAdm.Attributes;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    [MyProgAuth]
    public class XpRoleController : BaseCtrl
    {
        public async Task<ActionResult> Read()
        {
            //for edit view
            await using var db = new Db();
            ViewBag.Users = await _XpCode.UsersA(db);
            ViewBag.Depts = await _XpCode.DeptsA(db);
            ViewBag.Progs = await _XpCode.ProgsA(db);
            ViewBag.AuthRanges = await _XpCode.AuthRangesA(db);
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new XpRoleRead().GetPageA(Ctrl, dt));
        }

        private XpRoleEdit EditSvc()
        {
            return new XpRoleEdit(Ctrl);
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

        //get user list for modal
        [HttpPost]
        public async Task<ContentResult> GetUsers(string deptId, string account)
        {
            if (!string.IsNullOrEmpty(account))
                account += '%';
            var sql = @"
select u.Id, u.Account, 
    u.Name as UserName, d.Name as DeptName
from dbo.XpUser u
join dbo.XpDept d on u.DeptId=d.Id
where (@Account is null or u.Account like @Account)
and d.Id=iif(@DeptId is null, d.Id, @DeptId)
order by d.Id, u.Account
";
            var rows = await _Db.GetRowsA(sql, ["Account", account, "DeptId" , deptId]);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }

    }//class
}