using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class TableRead
    {
        //設定查詢 sql 和查詢欄位
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

        //傳回一頁資料列
        public JObject GetPage(DtDto dt)
        {
            //呼叫公用類別 CrudRead
            return new CrudRead().GetPage(dto, dt);
        }

        //匯出 excel
        public void Export(JObject cond)
        {
            _WebExcel.ExportByRead(dto, cond, "Table.xlsx", _Xp.GetTpl("Table.xlsx"), 1);
            //_WebExcel.ReadToScreen(dto, cond, "Table.xlsx");
        }

    } //class
}
