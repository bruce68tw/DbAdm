using Base.Models;
using Base.Services;
using BaseApi.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DbAdm.Controllers
{
    public class HomeController : Controller
    {
        private bool encodePwd = true;
        private string surveyView = "Survey";

        //public IActionResult Index()
        public ActionResult Index()
        {
            return View();
        }

        //called by XgLogin
        public ActionResult Login(string url = "")
        {
            return View(new LoginVo() { FromUrl = url });
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginVo vo)
        {
            //await _Login.LoginA(vo, encodePwd);
            //return View(vo);
            return await _Login.LoginByVoA(vo, encodePwd)
                ? Redirect(_Str.IsEmpty(vo.FromUrl) ? "/Home/Index" : vo.FromUrl)
                : View(vo);
        }

        //登出
        public ActionResult Logout()
        {
            _Http.DeleteCookie(_Fun.FidClientKey);
            return Redirect("/Home/Login");
        }
        public ActionResult Error()
        {
            var error = HttpContext.Features.Get<IExceptionHandlerFeature>();
            return View("Error", (error == null) ? _Fun.SystemError : error.Error.Message);
        }

        /// <summary>
        /// 顯示填寫問卷UI
        /// </summary>
        /// <param name="data">AES加密, 2欄位(逗號分隔):userId,issueId</param>
        /// <returns></returns>
        public async Task<ActionResult> Survey(string data)
        {
            //temp add
            //data = _Xp.EnDecode(true, "001A,rJYWPDoqYz");
            //data = "SMAiSox+mVsDYpvibtNoqoIc3PB/7NyGRwXQaooWeY4=";

            var result = await CheckSurveyDataA(data);
            if (result.Error != "")
                return View(surveyView, result.Error);

            //讀取問卷題目清單
            var rows = await _XpCode.SurveySatisesA();

            ViewBag.IssueTitle = result.Row!["Title"]!.ToString();
            ViewBag.SurveyData = data;  //填寫完畢後將此資料傳送到後端
            ViewBag.SurveyRows = rows;
            return View();
        }

        /// <summary>
        /// 傳送問卷, 欄位名稱配合DB使用大camel
        /// </summary>
        /// <param name="SurveyData"></param>
        /// <param name="Q1"></param>
        /// <param name="Q2"></param>
        /// <param name="Q3"></param>
        /// <param name="Q4"></param>
        /// <param name="Q5"></param>
        /// <returns>view</returns>
        [HttpPost]
        public async Task<ActionResult> Survey(string SurveyData, int Q1, int Q2, int Q3, int Q4, string Q5)
        {
            //檢查資料
            var result = await CheckSurveyDataA(SurveyData);
            if (result.Error != "")
                return View(surveyView, result.Error);

            //新增加一筆Survey
            var sql = $@"
insert into dbo.Survey(Id, UserId, Q1, Q2, Q3, Q4, Q5, Created) values (
@Id, @UserId, {Q1}, {Q2}, {Q3}, {Q4}, @Q5, getDate()
)";
            //傳回訊息, 無訊息表示正常
            var row = result.Row!;
            var msg = (await _Db.ExecSqlA(sql, ["Id", row["Id"]!.ToString(), "UserId", row["UserId"]!.ToString(), "Q5", Q5]) == 1)
                ? "已成功送出問卷，謝謝您"
                : "無法寫入問卷，請聯絡管理員。";
            return View(surveyView, msg);
        }

        //檢查傳入的 SurveyData 是否正確
        //param data: 先進行url decode
        //傳回: Id:userId, Str:error msg if any
        private async Task<(string Error, JObject? Row)> CheckSurveyDataA(string data)
        {
            //傳入的url encode資料在後端不必再decode, 系統會自動decode !!
            var cols = _Xp.EnDecode(false, data).Split(',');
            if (cols.Length != 2)
                return ("傳入的問卷資料格式不正確。", null);

            var userId = cols[0];
            var issueId = cols[1];

            //檢查問卷狀態(問卷Id同issue.Id), 必須傳回Id,Title,UserId
            var row = await _Db.GetRowA($@"
select top 1 i.Title, i.Id, UserId='{userId}', SurveyId=s.Id
from dbo.Issue i
left join dbo.Survey s on i.Id=s.Id
where i.Id=@Id
", ["Id", issueId]);

            //case of error !!
            return (row!["SurveyId"]!.ToString() == string.Empty)
                ? ("", row)
                : ("此筆問卷資料已經存在，不必再填寫。", null);
        }

    }//class
}
