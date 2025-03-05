using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class ReporterRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
Select * 
From dbo.Reporter
Order by Id
",
            Items = [
                new() { Fid = "Name", Op = ItemOpEstr.Like },
            ],
        };

        public async Task<JObject?> GetPageA(DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
