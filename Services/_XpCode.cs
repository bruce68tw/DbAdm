using Base.Models;
using Base.Services;
using BaseApi.Services;

namespace DbAdm.Services
{
    //與下拉欄位有關
    public static class _XpCode
    {
        public const string TableType = "TableType";
        public const string UiItemType = "UiItemType";

        #region 1.master table to codes
        public static async Task<List<IdStrDto>?> DeptsA(Db? db = null)
        {
            return await _Db.TableToCodesA("XpDept", db);
        }
        public static async Task<List<IdStrDto>?> RolesA(Db? db = null)
        {
            return await _Db.TableToCodesA("XpRole", db);
        }
        public static async Task<List<IdStrDto>?> UsersA(Db? db = null)
        {
            return await _Db.TableToCodesA("XpUser", db);
        }
        /*
        public static async Task<List<IdStrDto>?> ReportersA(Db? db = null)
        {
            return await _Db.TableToCodesA("Reporter", db);
        }
        */
        public static async Task<List<IdStrDto>?> ProgsA(Db? db = null)
        {
            var sql = @"
select 
    Id, [Name] as Str
from dbo.XpProg
order by Sort
";
            return await BySqlA(sql, db);
        }

        public static async Task<List<IdStrDto>?> ProjectsA(Db? db = null)
        {
            //return await _Db.TableToCodesA("Project", db);
            var sql = @"
select 
    Id, [Name] as Str
from dbo.Project
order by [Name]
";
            return await BySqlA(sql, db);
        }

        #endregion

        /* remark
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

        #region 2.XpCode to codes

        //讀取 XpCode.Type='InputType' and Ext = 'Q'
        public static async Task<List<IdStrDto>> InputTypesQA(Db? db = null)
        {
            var sql = @"
select 
    Value as Id, [Name] as Str
from dbo.XpCode
where Type='InputType'
and Ext='Q'
order by Sort
";
            return await BySqlA(sql, db);
        }

        public static async Task<List<IdStrDto>> UiItemTypesA(Db? db = null)
        {
            return await ByTypeA(UiItemType, db);
        }
        public static async Task<List<IdStrDto>> TableTypesA(Db? db = null)
        {
            return await ByTypeA(TableType, db);
        }
        public static async Task<List<IdStrDto>> SurveySatisesA(Db? db = null)
        {
            return await ByTypeA("SurveySatis", db);
        }

        public static async Task<List<IdStrDto>> RitemTypesA(Db? db = null)
        {
            return await ByTypeA("RitemType", db);
        }

        public static async Task<List<IdStrDto>> InputTypesA(Db? db = null)
        {
            return await ByTypeA("InputType", db);
        }

        public static async Task<List<IdStrDto>> CheckTypesA(Db? db = null)
        {
            return await ByTypeA("CheckType", db);
        }

        public static async Task<List<IdStrDto>> QitemOpsA(Db? db = null)
        {
            return await ByTypeA("QitemOp", db);
        }

        public static async Task<List<IdStrDto>> AuthTypesA(Db? db = null)
        {
            return await ByTypeA("AuthType", db);
        }

        public static async Task<List<IdStrDto>> AuthRangesA(Db? db = null)
        {
            return await ByTypeA("AuthRange", db);
        }
        public static async Task<List<IdStrDto>> IssueTypesA(Db? db = null)
        {
            return await ByTypeA(_Xp.IssueType, db);
        }

        private static async Task<List<IdStrDto>> BySqlA(string sql, Db? db = null)
        {
            return await _Db.SqlToCodesA(sql, null, db) ?? [];
        }

        //get by XpCode.Type
        private static async Task<List<IdStrDto>> ByTypeA(string type, Db? db = null)
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

        private static async Task<List<IdStrExtDto>> ByTypeExtA(string type, Db? db = null)
        {
            var sql = string.Format(@"
select 
    Value as Id, [Name] as Str, Ext
from dbo.XpCode
where Type='{0}'
order by Sort
", type);
            return await _Db.SqlToCodeExtsA(sql, null, db) ?? [];
        }
        #endregion

        #region 3.靜態資料
        public static List<IdStrDto> YesNos()
        {
            return [
                new(){ Id = "1", Str = "是" },
                new(){ Id = "0", Str = "否" },
            ];
        }

        public static List<IdStrDto> Statuses()
        {
            return [
                new(){ Id = "1", Str = "正常" },
                new(){ Id = "0", Str = "停用" },
            ];
        }

        //get db type, match to DbTypeEnum
        public static List<IdStrDto> DbTypes()
        {
            return [
                new(){ Id = "0", Str = "MSSql" },
                new(){ Id = "1", Str = "MySql" },
                //new IdStrDto(){ Id = "2", Str = "否" },
            ];
        }

        //for CRUD 產生器
        public static List<IdStrDto> AutoIdLens()
        {
            return [
                new(){ Id = "_Fun.AutoIdShort", Str = "Short(6)" },
                new(){ Id = "_Fun.AutoIdMid", Str = "Medium(10)" },
                new(){ Id = "_Fun.AutoIdLong", Str = "Long(22)" },
            ];
        }
        #endregion

        #region 4.其他
        //專案功能清單
        public static async Task<List<IdStrDto>> PrjProgsA(string projectId, Db? db = null)
        {
            var sql = @"
select 
    Id, [Name] as Str
from dbo.PrjProg
where ProjectId=@Id
order by Sort
";
            var rows = await _Db.GetModelsA<IdStrDto>(sql, ["Id", projectId], db) ?? [];
            return _List.CodesAddEmpty(rows, _Locale.GetBaseRes().PlsSelect);
        }

        #endregion

        /// <summary>
        /// [Table] to Codes, called by XpCodeController
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="db"></param>
        /// <returns></returns>
        public static async Task<List<IdStrDto>> TablesA(string projectId, Db? db = null)
        {
            //if (_Str.IsEmpty(projectId) || !_Str.CheckKeyRule(projectId, "_XpCode.cs GetTables() projectId is wrong: " + projectId))
            //if (_Str.IsEmpty(projectId)) return null;

            var sql = $@"
select 
    Id, Code as Str
from dbo.[Table]
where ProjectId=@Id
order by Code
";
            var rows = await _Db.SqlToCodesA(sql, ["Id", projectId], db) ?? [];
            rows.Insert(0, new IdStrDto() { Id = "", Str = _Locale.GetBaseRes().PlsSelect });
            return rows;
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
