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
left join dbo.[User] u on p.Creator=u.Id
order by p.Id
",
            /*
            TableAs = "p",
            Items = [
                new() { Fid = "Name", Op = ItemOpEstr.Like },
            ],
            */
        };

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

    } //class
}
