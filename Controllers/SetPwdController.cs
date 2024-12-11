using Base.Services;
using BaseApi.Controllers;
using DbAdm.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[MyLogin]
    [MyProgAuth]

    public class SetPwdController : BaseCtrl
    {
        public ActionResult Index()
        {
            return View();
        }

        //return error msg if any
        [HttpPost]
        public async Task<string> Save(string oldPwd, string newPwd)
        {
            oldPwd = string.IsNullOrEmpty(oldPwd)
                ? ""
                : _Str.Md5(oldPwd);

            var sql = $@"
update dbo.XpUser
set Pwd='{_Str.Md5(newPwd)}'
where Id='{_Fun.UserId()}'
and Pwd=@Pwd
";
            return (await _Db.ExecSqlA(sql, new List<object>() { "Pwd", oldPwd }) == 1)
                ? ""
                : "舊密碼輸入錯誤。";
        }

    }//class
}