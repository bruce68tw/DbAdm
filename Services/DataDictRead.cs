using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class DataDictRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = $@"
Select a.*,
    TableTypeName=x.Name
From dbo.DataDict a
inner join dbo.XpCode x on x.Type='{_XpCode.TableType}' and a.TableType=x.Value
Order by a.Code
",
            TableAs = "a",
            Items = [
                new() { Fid = "Code", Op = ItemOpEstr.Like },
                new() { Fid = "Name", Op = ItemOpEstr.Like2 },
                new() { Fid = "TableType" },
                new() { Fid = "TableTypeName", Col = "a.TableType" },   //for sort
            ],
        };

        public async Task<JObject?> GetPageA(DtDto dt)
        {
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
