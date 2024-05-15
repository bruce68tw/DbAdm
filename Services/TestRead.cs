using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class TestRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by a.Id desc
",
			TableAs = "a",
            Items = new QitemDto[] {
                new() { Fid = "ProjectId" },
                new() { Fid = "Code", Op = ItemOpEstr.Like },
                new() { Fid = "Name", Op = ItemOpEstr.Like },
                new() { Fid = "TranLog" },
            },
        };

        public async Task<JObject?> GetPage(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

    } //class
}