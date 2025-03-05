using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
	public class IssueRead
    {
        private string isWatch = "";

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
    IsWatch=case when w.Id is null then 0 else 1 end,
    RptUserId=r.Id,
    SurveyId=s.Id
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpUser u on i.OwnerId=u.Id
join dbo.XpUser u2 on i.Creator=u2.Id
join dbo.XpCode c on c.Type='{_Xp.IssueType}' and i.IssueType=c.Value
left join dbo.IssueWatch w on i.Id=w.IssueId and w.WatcherId='{_Fun.UserId()}'
left join dbo.Reporter r on i.RptUser=r.Id
left join dbo.Survey s on i.Id=s.Id
/* 判斷是否追踪 */
where ('{isWatch}'='' or ('{isWatch}'='1' and w.Id is not null) or ('{isWatch}'='0' and w.Id is null))
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
                    new() { Fid = "OwnerId" },
                    //new() { Fid = "Creator" },
                    new() { Fid = "IsFinish" },
                    //以下為額外的排序欄位
                    new() { Fid = "ProjectName", Col = "pp.ProjectId" },
                    new() { Fid = "ProgName", Col = "i.ProgId" },
                    new() { Fid = "IssueTypeName", Col = "i.IssueType" },

                ],
            };
        }

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            //底線欄位 _IsWatch 不會自動加入 sql, 手動調整
            isWatch = _Json.GetFidStr(_Str.ToJson(dt.findJson), "_IsWatch", "");
			return await new CrudReadSvc().GetPageA(GetDto(), dt, ctrl);
        }

        //todo
        public async Task ExportA(string ctrl, JObject find)
        {
            await _HttpExcel.ExportByReadA(ctrl, GetDto(), find, 
                "Issue.xlsx", _Xp.GetTplPath("Issue.xlsx", true), 1);
        }

    } //class
}