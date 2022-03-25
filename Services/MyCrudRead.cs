using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class MyCrudRead
    {
        private readonly ReadDto _readDto = new()
        {
            ReadSql = @"
select 
    c.Id, c.Status, c.ProgCode, c.ProgName,
    p.Code as ProjectCode,
    c.Created
from dbo.Crud c
join dbo.Project p on p.Id=c.ProjectId
order by p.Id, c.Id desc
",
            TableAs = "c",
            Items = new QitemDto[] {
                new() { Fid = "ProjectId" },
                new() { Fid = "ProgCode", Op = ItemOpEstr.Like },
                //new() { Fid = "Status" },
            },
        };

        public async Task<JObject> GetPageAsync(string ctrl, DtDto dt)
        {
            return await new CrudRead().GetPageAsync(_readDto, dt, ctrl);
        }

    } //class
}
