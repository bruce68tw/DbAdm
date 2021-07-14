using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class MyCrudRead
    {
        //設定查詢 sql 和查詢欄位
        private ReadDto model = new ReadDto()
        {
            ReadSql = @"
select 
    c.Id, c.Status, c.ProgCode,
    p.Code as ProjectCode,
    c.Created
from dbo.Crud c
join dbo.Project p on p.Id=c.ProjectId
order by p.Id, c.Id desc
",
            TableAs = "c",
            Items = new [] {
                new QitemDto { Fid = "ProjectId" },
                new QitemDto { Fid = "ProgCode", Op = ItemOpEstr.Like },
                //new QitemDto { Fid = "Status" },
            },
        };

        public JObject GetPage(string ctrl, DtDto dt)
        {
            return new CrudRead().GetPage(ctrl, model, dt);
        }

    } //class
}
