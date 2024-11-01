using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class UserRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select u.*, 
    d.Name as DeptName
from dbo.[User] u
join dbo.Dept d on u.DeptId=d.Id
order by u.Name
",
            Items = new QitemDto[] {
                new() { Fid = "Account", Op = ItemOpEstr.Like },
                new() { Fid = "Name", Op = ItemOpEstr.Like },
                new() { Fid = "DeptId" },
            },
        };

        public async Task<JObject?> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt, ctrl);
        }

    } //class
}