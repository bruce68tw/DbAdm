using Base.Models;
using Base.Services;
using BaseApi.Services;
using DocumentFormat.OpenXml.Bibliography;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class SurveyService
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
select i.Id, i.Title, i.RptUser, s.UserId
from dbo.Issue i
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
            _Log.Error($"SurveyService.cs SendSurveyA() failed: {error} (Issue.Id={issueId})");
			return "無法寄送問卷，請聯絡管理者。";
        }

    }//class
}