using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class ProjectRead
    {
        private ReadDto dto = new ReadDto()
        {
            ReadSql = @"
Select *
From dbo.Project
Order by Id
",
            Items = new[] {
                new QitemDto { Fid = "Name", Op = ItemOpEstr.Like },
            },
        };

        public JObject GetPage(DtDto dt)
        {
            return new CrudRead().GetPage(dto, dt);
        }

    } //class
}
