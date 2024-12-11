using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class IssueEdit : BaseEditSvc
    {
        public IssueEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.Issue",
                PkeyFid = "Id",
                ReadSql = @"
select i.*,
    ProjectName=p.Name,
    ProgName=pp.Name,
    OwnerName=u.Name, 
    CreatorName=u2.Name,
    ReviserName=u3.Name
from dbo.Issue i
join dbo.Project p on i.ProjectId=p.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.XpUser u on i.OwnerId=u.Id
join dbo.XpUser u2 on i.Creator=u2.Id
left join dbo.XpUser u3 on i.Reviser=u3.Id
where i.Id=@Id
",
                Items =
                [
                    new() { Fid = "Id" },
					new() { Fid = "ProjectId" },
					new() { Fid = "ProgId" },
					new() { Fid = "OwnerId" },
					new() { Fid = "Title" },
					new() { Fid = "IssueType" },
					new() { Fid = "Note" },
                ],
            };
        }

    } //class
}
