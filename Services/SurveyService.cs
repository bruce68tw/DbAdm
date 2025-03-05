using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class SurveyService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="issueId"></param>
        /// <returns>1(成功), or 錯誤訊息</returns>
        public async Task<string> SendSurveyA(string issueId)
        {
            //讀取收件者
            var error = "";
            var sql = @"
select i.Id, i.Title, r.Email
from dbo.Issue i
join dbo.Reporter r on i.RptUser=r.Id
where i.Id=@Id
";
            var row = await _Db.GetRowA(sql, ["Id", issueId]);
            if (row == null)
            {
                error = "找不到Issue.Id=" + issueId;
                goto lab_error;
            }

            //如果已經有填問卷則不可再填

            //讀取email範本
            var filePath = _Xp.GetTplPath("EmailMisSurvey.html", false);
            var html = await _File.ToStrA(filePath);
            if (string.IsNullOrEmpty(html))
            {
                error = "找不到範本檔案: " + filePath;
                goto lab_error;
            }

            //update Issue.SendTimes 欄位加1

            //寄送email
            //html = string.Format(html, row["Title"]!.ToString(), issueId);

            //回傳執行結果
            var email = new EmailDto()
            {
                Subject = "新用戶認証信",
                ToUsers = [row["Email"]!.ToString()],
                Body = _Str.ReplaceJson(html, row),
            };
            await _Email.SendByDtoA(email);
            return "1";

        lab_error:
            _Log.Error("SurveyService.cs SendSurvey() failed: " + error);
            return "無法寄送問卷，請聯絡管理者。";
        }

    }//class
}