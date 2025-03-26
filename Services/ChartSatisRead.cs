using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class ChartSatisRead
    {
        private readonly ReadDto dto = new()
        {
            ReadSql = @"
select Q1=sum(s.Q1), Q2=sum(s.Q2), Q3=sum(s.Q3), Q4=sum(s.Q4), Rows=count(*)
from dbo.Survey s
join dbo.Issue i on s.Id=i.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
",
            TableAs = "s",
            Items = [
                new() { Fid = "_ProjectId", Col = "pp.ProjectId" },
                new() { Fid = "ProgId", Col = "i.ProgId" },
                new() { Fid = "OwnerId", Col = "i.OwnerId" },
                new() { Fid = "Created", Type = QitemTypeEnum.Date },
            ],
        };

        //傳回一頁資料, DtDto包含要查詢的條件和頁次、筆數
        public async Task<JObject?> GetDataA(string ctrl, string json)
        {
            var rows = await new CrudReadSvc().GetRowsA(ctrl, dto, _Str.ToJson(json)!, false);
            return (JObject)rows![0];
        }

        /*
        public async Task<List<IdNumDto>> GetDataA(string baoId)
        {
            var sql = @"
--declare @StartDate date, @EndDate date, @BaoId varchar
--select @StartDate = '2021-11-16'
--select @EndDate = '2021-12-15'
--select @BaoId = 'B001'

-- 1.get range dates
;with result(rowDate) as (
	select @StartDate
    union all
    select dateAdd(day, 1, rowDate)
    from result 
    where rowDate < @EndDate)

-- 2.get data
select 
	Id=convert(char(5), a.rowDate, 1),
	Num=(
		select count(*)
		from dbo.BaoAttend  
        where BaoId=@BaoId
		and convert(date, Created)=a.rowDate
	)
from result a
";
            //3.查詢資料庫
            var today = DateTime.Today;
            var args = new List<object>() {
                "BaoId", baoId,
                "StartDate", today.AddMonths(-1).AddDays(1),
                "EndDate", today,
            };
            return (await _Db.GetModelsA<IdNumDto>(sql, args))!;
        }
        */
    }
}
