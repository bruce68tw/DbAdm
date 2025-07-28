using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class IssueService
    {
        /// <summary>
        /// 寄送email for 填寫問卷
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns>1(成功), or 錯誤訊息</returns>
        public async Task<string> SendSurveyA(string issueId)
        {
            //讀取收件者
            var error = "";
            var sql = @"
select i.Id, i.Title, i.RptUser, s.UserId, UserName=u.Name
from dbo.Issue i
join dbo.XpUser u on i.OwnerId=u.Id
left join dbo.Survey s on i.Id=s.Id
where i.Id=@Id
";
            //row 的內容會傳入 email template
            var args = new List<object>() { "Id", issueId };
            var row = await _Db.GetRowA(sql, args);
            if (row == null)
            {
                error = "找不到Issue資料";
                goto lab_error;
            }

            //檢查回報人員編
            var rptUser = row!["RptUser"]!.ToString();
			if (rptUser == string.Empty)
			{
				error = "[回報人員編]欄位為空白，無法填寫問卷。";
				goto lab_error;
			}

            //如果已經有填問卷則不可再填
			if (row!["UserId"]!.ToString() != string.Empty)
            {
				error = "此筆工作已經填寫問卷，不可再填。";
				goto lab_error;
			}

			//讀取email範本
			var filePath = _Xp.GetTplPath("EmailMisSurvey.html", false);
            var html = await _File.ToStrA(filePath);
            if (string.IsNullOrEmpty(html))
            {
                error = "找不到範本檔案: " + filePath;
                goto lab_error;
            }

            //update Issue.SendTimes + 1
            var count = await _Db.ExecSqlA(@"
update dbo.Issue set SendTimes = SendTimes + 1
where Id=@Id
", args);
            if (count != 1)
            {
                error = "無法更新 Issue.SendTimes";
                goto lab_error;
            }

            //設定資料 for email template
            var row2 = new JObject
            {
                { "DeptName", _Xp.Config.DeptName },
                { "Title", row!["Title"]!.ToString() },
                { "UserName", row!["UserName"]!.ToString() },
                { "ServerUrl", _Xp.Config.ServerUrl },
                { "SurveyData", _Http.UrlEncode(_Xp.EnDecode(true, $"{rptUser},{issueId}")) },   //必須進行url encode
            };

            //寄送email & 回傳執行結果
            var email = new EmailDto()
            {
                Subject = $"{_Xp.Config.DeptName}-滿意度問卷",
                ToUsers = [$"{rptUser}@eden.org.tw"],   //組合email字串, 新格式前面沒有eden
                Body = _Str.ReplaceJson(html, row2),
            };
            await _Email.SendByDtoA(email);
            return "1";

        lab_error:
            _Log.Error($"IssueService.cs SendSurveyA() failed: {error} (Issue.Id={issueId})");
			return "無法寄送問卷，請聯絡管理者。";
        }

        /// <summary>
        /// 寄送email 交辦主管
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns>1(成功), or 錯誤訊息</returns>
        public async Task<string> SendFromMgrA(string issueId)
        {
            //讀取收件者
            var error = "";
            var sql = @"
select i.Id, i.Title, u2.EmpNo, UserName=u.Name
from dbo.Issue i
join dbo.XpUser u on i.OwnerId=u.Id
left join dbo.XpUser u2 on i.FromMgr=u2.Id
where i.Id=@Id
";
            //row 的內容會傳入 email template
            var args = new List<object>() { "Id", issueId };
            var row = await _Db.GetRowA(sql, args);
            if (row == null)
            {
                error = "找不到Issue資料";
                goto lab_error;
            }

            //檢查回報人員編
            var empNo = row!["EmpNo"]!.ToString();
            if (empNo == string.Empty)
            {
                error = "[交辦主管]的員工編號為空白，無法寄送Email。";
                goto lab_error;
            }

            //讀取email範本
            var filePath = _Xp.GetTplPath("EmailFromMgr.html", false);
            var html = await _File.ToStrA(filePath);
            if (string.IsNullOrEmpty(html))
            {
                error = "找不到範本檔案: " + filePath;
                goto lab_error;
            }

            //設定資料 for email template
            var row2 = new JObject
            {
                { "Title", row!["Title"]!.ToString() },
                { "UserName", row!["UserName"]!.ToString() },
            };

            //寄送email & 回傳執行結果
            var email = new EmailDto()
            {
                Subject = "主管交辦事項完成通知",
                ToUsers = [$"{empNo}@eden.org.tw"],   //組合email字串, 新格式前面沒有eden
                Body = _Str.ReplaceJson(html, row2),
            };
            await _Email.SendByDtoA(email);
            return "1";

        lab_error:
            _Log.Error($"IssueService.cs SendFromMsgA() failed: {error} (Issue.Id={issueId})");
            return "無法寄送主管交辦完成通知，請聯絡管理者。";
        }

    }//class
}