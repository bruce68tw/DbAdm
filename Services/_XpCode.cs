using Base.Models;
using Base.Services;
using BaseWeb.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    //與下拉欄位有關
    public static class _XpCode
    {
        /*
        public static async Task<List<IdStrDto>> TableToCodesA(string table, Db db = null)
        {
            var sql = $@"
select 
    Id, Name as Str
from dbo.[{table}]
order by Id
";
            return await SqlToCodesA(sql, db);
        }

        //get code table rows for 下拉式欄位
        public static async Task<List<IdStrDto>> SqlToCodesA(string sql, Db db = null)
        {
            var emptyDb = false;
            _Fun.CheckOpenDb(ref db, ref emptyDb);

            var rows = await db.GetModelsA<IdStrDto>(sql);
            await _Fun.CheckCloseDbA(db, emptyDb);
            return rows;
        }
        */

        public static async Task<List<IdStrDto>> ProjectsA(Db db = null)
        {
            var sql = @"
select 
    Id, Code as Str
from dbo.Project
order by Id
";
            return await _Db.SqlToCodesA(sql, db);
        }

        public static async Task<List<IdStrDto>> TablesA(string projectId, Db db = null)
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
            var rows = await _Db.SqlToCodesA(sql, db);
            if (rows == null)
                rows = new List<IdStrDto>();
            rows.Insert(0, new IdStrDto() { Id = "", Str = _Locale.GetBaseRes().PlsSelect });
            return rows;
        }

        //get code table rows for 下拉式欄位
        public static async Task<List<IdStrDto>> CodesA(string type, Db db = null)
        {
            var sql = string.Format(@"
select 
    Value as Id, [Name] as Str
from dbo.XpCode
where Type='{0}'
order by Sort
", type);
            return await _Db.SqlToCodesA(sql, db);
        }

        public static async Task<List<IdStrDto>> QitemTypesA(Db db = null)
        {
            var sql = @"
select 
    Value as Id, [Name] as Str
from dbo.XpCode
where Type='EitemType'
and Ext='Q'
order by Sort
";
            return await _Db.SqlToCodesA(sql, db);
        }

        public static async Task<List<IdStrDto>> RitemTypesA(Db db = null)
        {
            return await CodesA("RitemType", db);
        }

        public static async Task<List<IdStrDto>> EitemTypesA(Db db = null)
        {
            return await CodesA("EitemType", db);
        }

        public static async Task<List<IdStrDto>> CheckTypesA(Db db = null)
        {
            return await CodesA("CheckType", db);
        }

        public static async Task<List<IdStrDto>> QitemOpsA(Db db = null)
        {
            return await CodesA("QitemOp", db);
        }

        public static async Task<List<IdStrDto>> AuthTypesA(Db db = null)
        {
            return await CodesA("AuthType", db);
        }

        public static List<IdStrDto> YesNos()
        {
            return new List<IdStrDto>() {
                new IdStrDto(){ Id = "1", Str = "是" },
                new IdStrDto(){ Id = "0", Str = "否" },
            };
        }

        //get db type, match to DbTypeEnum
        public static List<IdStrDto> DbTypes()
        {
            return new List<IdStrDto>() {
                new IdStrDto(){ Id = "0", Str = "MSSql" },
                new IdStrDto(){ Id = "1", Str = "MySql" },
                //new IdStrDto(){ Id = "2", Str = "否" },
            };
        }

        public static List<IdStrDto> AutoIdLens()
        {
            return new List<IdStrDto>() {
                new IdStrDto(){ Id = "_Fun.AutoIdShort", Str = "短字串(6)" },
                new IdStrDto(){ Id = "_Fun.AutoIdMid", Str = "中等字串(10)" },
                new IdStrDto(){ Id = "_Fun.AutoIdLong", Str = "長字串(16)" },
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
