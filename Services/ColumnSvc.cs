using Base.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class ColumnSvc
    {
        public async Task<JArray?> GetRowsA(string tableId)
        {
            //if (_Str.IsEmpty(tableId) || !_Str.CheckKeyRule(tableId, "ColumnService.cs GetRows() tableId is wrong: " + tableId))
            if (_Str.IsEmpty(tableId)) return null;

            var sql = $@"
select 
    c.Id, c.Fid, c.Name, c.DataType
from dbo.[Column] c
where c.TableId='{tableId}'
and c.Status=1
order by c.Sort
";
            return await _Db.GetRowsA(sql);
        }

    }//class
}