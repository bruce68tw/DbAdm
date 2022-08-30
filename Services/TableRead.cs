using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class TableRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select 
    '' as _F1, 
    p.Code as ProjectCode, p.DbName,
    a.Code, a.Name, a.TranLog,
    '' as _Fun, a.Status, 
    a.Id
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by p.Id, a.Code
",
            ExportSql = @"
select 
    a.Code, a.Name,  
    p.Code as ProjectCode, p.DbName
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by p.Id, a.Code
",
            TableAs = "a",
            Items = new QitemDto[] {
                new() { Fid = "ProjectId" },
                new() { Fid = "Code", Op = ItemOpEstr.Like },
                new() { Fid = "Name", Op = ItemOpEstr.Like2 },
                new() { Fid = "TranLog" },
                new() { Fid = "Status" },
            },
        };

        public async Task<JObject> GetPageA(string ctrl, DtDto dt)
        {
            return await new CrudRead().GetPageA(dto, dt, ctrl);
        }

        /// <summary>
        /// export excel
        /// </summary>
        /// <param name="ctrl">controller name for authorize</param>
        /// <param name="find"></param>
        /// <returns></returns>
        public async Task ExportAsync(JObject find)
        {
            await _WebExcel.ExportByReadA("", dto, find, 
                "Table.xlsx", _Xp.GetTplPath("Table.xlsx", true), 1);
        }

    } //class
}
