using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

//修改:DbAdm 改成你的專案 -> AdoptAdm
//修改:Column 改成你的controller -> Maker
namespace DbAdm.Services
{
    public class ColumnRead
    {
        private readonly ReadDto dto = new()
        {
            //修改:讀取資料的sql,欄位必須對應查詢結果頁面的欄位
            //1.set ReadSql
            ReadSql = @"
Select c.*,
    CreatorName=u.Name,
    p.Code as ProjectCode, t.Code as TableCode
From dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
inner join dbo.Project p on p.Id=t.ProjectId
left join dbo.XpUser u on p.Creator=u.Id
Order by p.Id, t.Id, c.Sort
",
            TableAs = "c",

            //修改:查詢條件輸入欄位,與查詢畫面對應
            //2.set query fields
            Items = [
                new() { Fid = "ProjectId", Col = "t.ProjectId" },
                new() { Fid = "TableCode", Col = "t.Code", Op = ItemOpEstr.Like },
                new() { Fid = "Code", Op = ItemOpEstr.Like },
            ],
        };

        //傳回一頁資料, DtDto包含要查詢的條件和頁次、筆數
        public async Task<JObject?> GetPageA(DtDto dt)
        {
            //3.call CrudRead.GetPage()
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
