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
        #region master table to codes
        public static async Task<List<IdStrDto>?> DeptsA(Db? db = null)
        {
            return await _Db.TableToCodesA("Dept", db);
        }
        public static async Task<List<IdStrDto>?> RolesA(Db? db = null)
        {
            return await _Db.TableToCodesA("XpRole", db);
        }
        public static async Task<List<IdStrDto>?> UsersA(Db? db = null)
        {
            return await _Db.TableToCodesA("User", db);
        }

        #endregion

        /*
        public static async Task<List<IdStrDto>> TableToCodesA(string table, Db? db = null)
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
        public static async Task<List<IdStrDto>> SqlToCodesA(string sql, Db? db = null)
        {
            var emptyDb = false;
            _Fun.CheckOpenDb(ref db, ref emptyDb);

            var rows = await db.GetModelsA<IdStrDto>(sql);
            await _Fun.CheckCloseDbA(db, emptyDb);
            return rows;
        }
        */

        public static async Task<List<IdStrDto>> ProjectsA(Db? db = null)
        {
            var sql = @"
select 
    Id, Code as Str
from dbo.Project
order by Id
";
            return await BySqlA(sql, db);
        }

        public static async Task<List<IdStrDto>> ByTablesA(string projectId, Db? db = null)
        {
            //if (_Str.IsEmpty(projectId) || !_Str.CheckKeyRule(projectId, "_XpCode.cs GetTables() projectId is wrong: " + projectId))
            //if (_Str.IsEmpty(projectId)) return null;

            var sql = $@"
select 
    Id, Code as Str
from dbo.[Table]
where ProjectId='{projectId}'
order by Code
";
            var rows = await _Db.SqlToCodesA(sql, db);
            if (rows == null)
                rows = new List<IdStrDto>();
            rows.Insert(0, new IdStrDto() { Id = "", Str = _Locale.GetBaseRes().PlsSelect });
            return rows;
        }

        //get code table rows for 下拉式欄位
        public static async Task<List<IdStrDto>> ByCodesA(string type, Db? db = null)
        {
            var sql = string.Format(@"
select 
    Value as Id, [Name] as Str
from dbo.XpCode
where Type='{0}'
order by Sort
", type);
            return await BySqlA(sql, db);
        }

        public static async Task<List<IdStrDto>> QitemTypesA(Db? db = null)
        {
            var sql = @"
select 
    Value as Id, [Name] as Str
from dbo.XpCode
where Type='EitemType'
and Ext='Q'
order by Sort
";
            return await BySqlA(sql, db);
        }

        public static async Task<List<IdStrDto>> RitemTypesA(Db? db = null)
        {
            return await ByCodesA("RitemType", db);
        }

        public static async Task<List<IdStrDto>> EitemTypesA(Db? db = null)
        {
            return await ByCodesA("EitemType", db);
        }

        public static async Task<List<IdStrDto>> CheckTypesA(Db? db = null)
        {
            return await ByCodesA("CheckType", db);
        }

        public static async Task<List<IdStrDto>> QitemOpsA(Db? db = null)
        {
            return await ByCodesA("QitemOp", db);
        }

        public static async Task<List<IdStrDto>> AuthTypesA(Db? db = null)
        {
            return await ByCodesA("AuthType", db);
        }

        public static async Task<List<IdStrDto>> AuthRangesA(Db? db = null)
        {
            return await ByCodesA("AuthRange", db);
        }

        public static List<IdStrDto> YesNos()
        {
            return new List<IdStrDto>() {
                new IdStrDto(){ Id = "1", Str = "Yes" },
                new IdStrDto(){ Id = "0", Str = "No" },
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
                new IdStrDto(){ Id = "_Fun.AutoIdShort", Str = "Short(6)" },
                new IdStrDto(){ Id = "_Fun.AutoIdMid", Str = "Medium(10)" },
                new IdStrDto(){ Id = "_Fun.AutoIdLong", Str = "Long(22)" },
            };
        }

        public static async Task<List<IdStrDto>> BySqlA(string sql, Db? db = null)
        {
            return await _Db.SqlToCodesA(sql, db) ?? new();
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
