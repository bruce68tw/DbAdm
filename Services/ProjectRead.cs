using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class ProjectRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select p.*, 
    CreatorName=u.Name
from dbo.Project p
left join dbo.XpUser u on p.Creator=u.Id
order by p.Name
",
            TableAs = "p",
            Items = [
                new() { Fid = "Code", Op = QitemOpEstr.Like2 },
                new() { Fid = "Name", Op = QitemOpEstr.Like2 },
                //below for sorting
                new() { Fid = "Status" },
                new() { Fid = "CreatorName", Col = "u.Name" },
            ],
        };

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

    } //class
}
