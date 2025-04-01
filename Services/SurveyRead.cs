using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class SurveyRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
Select s.*, i.Title 
From dbo.Survey s
join dbo.Issue i on s.Id=i.Id
Order by s.Id
",
            TableAs = "s",
            Items = [
                new() { Fid = "Created", Type = QitemTypeEnum.Date },
            ],
        };

        public async Task<JObject?> GetPageA(DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
