using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class IssueRead
    {
        private string isWatch = "";        //已追踪
        private string hasRptUser = "";     //有回報人
        private string hasSurvey = "";      //有收問卷

        //sql內有變數isWatch, 改使用函數
        private ReadDto GetDto()
        {
            return new()
            {
                ReadSql = $@"
select i.*,
    ProjectName=p.Name,
    ProgName=pp.Name,
    IssueTypeName=c.Name,
    OwnerName=u.Name,
    CreatorName=u2.Name,
    FromMgrName=u3.Name,
    IsWatch=case when w.Id is null then 0 else 1 end,
    SurveyId=s.Id
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpUser u on i.OwnerId=u.Id
join dbo.XpUser u2 on i.Creator=u2.Id
left join dbo.XpUser u3 on i.FromMgr=u3.Id
join dbo.XpCode c on c.Type='{_Xp.IssueType}' and i.IssueType=c.Value
left join dbo.IssueWatch w on i.Id=w.IssueId and w.WatcherId='{_Fun.UserId()}'
left join dbo.Survey s on i.Id=s.Id
/* 判斷是否追踪 */
where 1=1
and ('{isWatch}'='' or ('{isWatch}'='1' and w.Id is not null) or ('{isWatch}'='0' and w.Id is null))
and ('{hasRptUser}'='' or ('{hasRptUser}'='1' and i.RptUser is not null) or ('{hasRptUser}'='0' and i.RptUser is null))
and ('{hasSurvey}'='' or ('{hasSurvey}'='1' and s.Id is not null) or ('{hasSurvey}'='0' and s.Id is null))
order by p.Id, pp.Sort, i.Created desc
",
                TableAs = "i",
                Items = [
                    new() { Fid = "_ProjectId", Col = "pp.ProjectId" },
                    new() { Fid = "ProgId" },
                    new() { Fid = "WorkDate", Type = QitemTypeEnum.Date },
                    new() { Fid = "Created", Type = QitemTypeEnum.Date },
                    new() { Fid = "IssueType" },
                    new() { Fid = "Title", Op = ItemOpEstr.Like2 },
                    new() { Fid = "RptUser" },
                    new() { Fid = "OwnerId" },
                    //new() { Fid = "Creator" },
                    new() { Fid = "FromMgr" },
                    new() { Fid = "IsFinish" },
                    //以下為額外的排序欄位
                    new() { Fid = "ProjectName", Col = "pp.ProjectId" },
                    new() { Fid = "ProgName", Col = "i.ProgId" },
                    new() { Fid = "IssueTypeName", Col = "i.IssueType" },

                ],
            };
        }

        //傳回額外欄位: 工作時數合計
        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            //底線欄位 _IsWatch 不會自動加入 sql, 手動調整
            var findJson = _Str.ToJson(dt.findJson);
            isWatch = _Json.GetFidStr(findJson, "_IsWatch", "");
            hasRptUser = _Json.GetFidStr(findJson, "_HasRptUser", "");
            hasSurvey = _Json.GetFidStr(findJson, "_HasSurvey", "");

            //先讀取分頁
            var svc = new CrudReadSvc();
            var db = svc.GetDb(true);   //外部開啟DB
            var result = await svc.GetPageA(GetDto(), dt, ctrl);

            //加上工作時數合計
            var sqlDto = svc.GetSqlDto();
            var args = svc.GetArgs();
            var sql = $"select sum(i.WorkHours) {sqlDto.From} {sqlDto.Where}";
            result!["SumHours"] = await db.GetIntA(sql, args);
            await db.DisposeAsync();

            return result;
        }

        //todo
        public async Task ExportA(string ctrl, JObject find)
        {
            await _HttpExcel.ExportByReadA(ctrl, GetDto(), find, 
                "Issue.xlsx", _Xp.GetTplPath("Issue.xlsx", true), 1);
        }

    } //class
}