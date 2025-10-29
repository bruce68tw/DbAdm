using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class UiRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
Select a.*,
    CreatorName=u.Name,
    ProjectName=p.Name
From dbo.Crud a
join dbo.Project p on p.Id=a.ProjectId
left join dbo.XpUser u on a.Creator=u.Id
where a.IsUi=1
Order by p.Id, a.Id
",
            TableAs = "a",
            Items = [
                new() { Fid = "ProjectId", Col = "ProjectId" },
                new() { Fid = "Code", Op = ItemOpEstr.Like2 },
                new() { Fid = "Name", Op = ItemOpEstr.Like2 },
                //for sort
                //new() { Fid = "DataType" },
            ],
        };

        public async Task<JObject?> GetPageA(DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
