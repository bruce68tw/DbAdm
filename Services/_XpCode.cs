using Base.Models;
using Base.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    //與下拉欄位有關
    public static class _XpCode
    {
        public static async Task<List<IdStrDto>> TableToCodesAsync(string table, Db db = null)
        {
            var sql = $@"
select 
    Id, Name as Str
from dbo.[{table}]
order by Id
";
            return await SqlToCodesAsync(sql, db);
        }

        public static async Task<List<IdStrDto>> GetProjectsAsync(Db db = null)
        {
            var sql = @"
select 
    Id, Code as Str
from dbo.Project
order by Id
";
            return await SqlToCodesAsync(sql, db);
        }

        //get code table rows for 下拉式欄位
        public static async Task<List<IdStrDto>> SqlToCodesAsync(string sql, Db db = null)
        {
            var emptyDb = false;
            _Fun.CheckOpenDb(ref db, ref emptyDb);

            var rows = await db.GetModelsAsync<IdStrDto>(sql);
            await _Fun.CheckCloseDb(db, emptyDb);
            return rows;
        }

        public static async Task<List<IdStrDto>> GetTablesAsync(string projectId, Db db = null)
        {
            //if (_Str.IsEmpty(projectId) || !_Str.CheckKeyRule(projectId, "_XpCode.cs GetTables() projectId is wrong: " + projectId))
            if (_Str.IsEmpty(projectId))
                return null;

            var sql = string.Format(@"
select 
    Id, Code as Str
from dbo.[Table]
where ProjectId='{0}'
order by Code
", projectId);
            return await SqlToCodesAsync(sql, db);
        }

        //get code table rows for 下拉式欄位
        public static async Task<List<IdStrDto>> GetCodesAsync(string type, Db db = null)
        {
            var sql = string.Format(@"
select 
    Value as Id, Name as Str
from dbo.XpCode
where Type='{0}'
order by Sort
", type);
            return await SqlToCodesAsync(sql, db);
        }

        public static async Task<List<IdStrDto>> GetQitemTypesAsync(Db db = null)
        {
            var sql = @"
select 
    Value as Id, Name as Str
from dbo.XpCode
where Type='EitemType'
and Ext='Q'
order by Sort
";
            return await SqlToCodesAsync(sql, db);
        }

        public static async Task<List<IdStrDto>> GetRitemTypesAsync(Db db = null)
        {
            return await GetCodesAsync("RitemType", db);
        }

        public static async Task<List<IdStrDto>> GetEitemTypesAsync(Db db = null)
        {
            return await GetCodesAsync("EitemType", db);
        }

        public static async Task<List<IdStrDto>> GetCheckTypesAsync(Db db = null)
        {
            return await GetCodesAsync("CheckType", db);
        }

        public static async Task<List<IdStrDto>> GetQitemOpsAsync(Db db = null)
        {
            return await GetCodesAsync("QitemOp", db);
        }

        public static async Task<List<IdStrDto>> GetAuthTypesAsync(Db db = null)
        {
            return await GetCodesAsync("AuthType", db);
        }

        public static List<IdStrDto> GetYesNos()
        {
            return new List<IdStrDto>() {
                new IdStrDto(){ Id = "1", Str = "是" },
                new IdStrDto(){ Id = "0", Str = "否" },
            };
        }

        /*
        public static List<IdStrDto> CodesAddEmpty(List<IdStrDto> codes, bool emptyItem)
        {
            if (!emptyItem)
                return codes;

            if (codes == null)
                codes = new List<IdStrDto>();
            codes.Insert(0, new IdStrDto()
            {
                Id = "",
                Str = _Fun.SelectText,
            });
            return codes;
        }
        */

    }//class
}
