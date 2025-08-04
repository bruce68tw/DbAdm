using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class PrjProgRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select a.*,
    CreatorName=u.Name,
    ProjectName=p.Name
from dbo.PrjProg a
left join dbo.XpUser u on a.Creator=u.Id
join dbo.Project p on a.ProjectId=p.Id
order by p.Id, a.Sort
",
            TableAs = "a",
            Items = [
                new() { Fid = "ProjectId" },
                new() { Fid = "Name", Op = ItemOpEstr.Like2 },
            ],
        };

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

    } //class
}