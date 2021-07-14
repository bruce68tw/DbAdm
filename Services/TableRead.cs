using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class TableRead
    {
        private ReadDto dto = new ReadDto()
        {
            ReadSql = @"
select 
    a.*, 
    p.Code as ProjectCode, p.DbName
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by p.Id, a.Name
",
            ExportSql = @"
select 
    a.Code, a.Name,  
    p.Code as ProjectCode, p.DbName
from dbo.[Table] a
inner join dbo.Project p on p.Id=a.ProjectId
order by p.Id, a.Name
",
            TableAs = "a",
            Items = new [] {
                new QitemDto { Fid = "ProjectId" },
                new QitemDto { Fid = "Code", Op = ItemOpEstr.Like },
                new QitemDto { Fid = "Name", Op = ItemOpEstr.Like2 },
                new QitemDto { Fid = "TranLog" },
                new QitemDto { Fid = "Status" },
            },
        };

        public JObject GetPage(string ctrl, DtDto dt)
        {
            return new CrudRead().GetPage(ctrl, dto, dt);
        }

        //export excel
        public void Export(string ctrl, JObject find)
        {
            _WebExcel.ExportByRead(ctrl, dto, find, "Table.xlsx", _Xp.GetTpl("Table.xlsx", false), 1);
        }

    } //class
}
