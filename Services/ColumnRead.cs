using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class ColumnRead
    {
        private ReadDto dto = new ReadDto()
        {
            ReadSql = @"
Select 
    p.Code as ProjectCode, t.Code as TableCode,
    c.Id, c.Code, c.Name, 
    c.Status, c.DataType
From dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
inner join dbo.Project p on p.Id=t.ProjectId
Order by p.Id, t.Id, c.Sort
",
            TableAs = "c",
            Items = new [] {
                new QitemDto { Fid = "ProjectId", Col = "t.ProjectId" },
                new QitemDto { Fid = "TableCode", Col = "t.Code", Op = ItemOpEstr.Like },
                new QitemDto { Fid = "Code", Op = ItemOpEstr.Like },
            },
        };

        public JObject GetPage(DtDto dt)
        {
            return new CrudRead().GetPage(dto, dt);
        }        

    } //class
}
