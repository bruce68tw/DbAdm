using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class RptIssueRead
    {
        //sql內有變數isWatch, 改使用函數
        private ReadDto GetDto()
        {
            return new()
            {
                ReadSql = $@"
select 
    ProjectName=p.Name,
    IssueTypeName=c.Name,
	RowLen=count(*)
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpUser u on i.OwnerId=u.Id
join dbo.XpCode c on c.Type='{_Xp.IssueType}' and i.IssueType=c.Value
group by p.Name, c.Sort, c.Name
order by p.Name, c.Sort
",
                TableAs = "i",
                Items = [
                    new() { Fid = "ProjectId", Col = "pp.ProjectId" },
                    new() { Fid = "IssueType" },
                    new() { Fid = "WorkDate", Type = QitemTypeEnum.Date },
                ],
            };
        }

        public async Task<JArray?> GetRowsA(string ctrl, JObject find)
        {
            return await new CrudReadSvc().GetRowsA(ctrl, GetDto(), find);
        }

        //todo
        public async Task ExportA(string ctrl, JObject find)
        {
            await _HttpExcel.ExportByReadA(ctrl, GetDto(), find,
                "RptIssue.xlsx", _Xp.GetTplPath("RptIssue.xlsx", true), 1);
        }

    } //class
}