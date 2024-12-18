using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Services;
using BaseWeb.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class IssueRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = $@"
select i.*,
    ProjectName=p.Name,
    ProgName=pp.Name,
    IssueTypeName=c.Name,
    CreatorName=u2.Name
from dbo.Issue i
join dbo.Project p on i.ProjectId=p.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.XpUser u2 on i.Creator=u2.Id
join dbo.XpCode c on c.Type='{_Xp.IssueType}' and i.IssueType=c.Value
order by i.Created desc
",
            TableAs = "i",
            Items = [
                new() { Fid = "ProjectId" },
                new() { Fid = "ProgId" },
                new() { Fid = "WorkDate", Type = QitemTypeEnum.Date },
                new() { Fid = "Created", Type = QitemTypeEnum.Date },
                new() { Fid = "IssueType" },
                new() { Fid = "Title", Op = ItemOpEstr.Like2 },
                new() { Fid = "Creator" },
            ],
        };

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

        public async Task ExportA(string ctrl, JObject find)
        {
            await _HttpExcel.ExportByReadA(ctrl, dto, find, 
                "Issue.xlsx", _Xp.GetTplPath("Issue.xlsx", true), 1);
        }

    } //class
}