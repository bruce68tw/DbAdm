using Base.Models;
using Base.Services;
using System.Collections.Generic;

namespace DbAdm.Services
{
    //與下拉欄位有關
    public static class _XpCode
    {
        public static List<IdStrDto> TableToCodes(string table, Db db = null)
        {
            var sql = $@"
select 
    Id, Name as Str
from dbo.[{table}]
order by Id
";
            return SqlToCodes(sql, db);
        }

        public static List<IdStrDto> GetProjects(Db db = null)
        {
            var sql = @"
select 
    Id, Code as Str
from dbo.Project
order by Id
";
            return SqlToCodes(sql, db);
        }

        //get code table rows for 下拉式欄位
        public static List<IdStrDto> SqlToCodes(string sql, Db db = null)
        {
            var emptyDb = false;
            _Fun.CheckOpenDb(ref db, ref emptyDb);

            var rows = db.GetModels<IdStrDto>(sql);
            _Fun.CheckCloseDb(db, emptyDb);
            return rows;
        }

        public static List<IdStrDto> GetTables(string projectId, Db db = null)
        {
            if (string.IsNullOrEmpty(projectId) || !_Str.CheckKeyRule(projectId, "_XpCode.cs GetTables() projectId is wrong: " + projectId))
                return null;

            var sql = string.Format(@"
select 
    Id, Code as Str
from dbo.[Table]
where ProjectId='{0}'
order by Code
", projectId);
            return SqlToCodes(sql, db);
        }

        //get code table rows for 下拉式欄位
        public static List<IdStrDto> GetCodes(string type, Db db = null)
        {
            var sql = string.Format(@"
select 
    Value as Id, Name as Str
from dbo.XpCode
where Type='{0}'
order by Sort
", type);
            return SqlToCodes(sql, db);
        }

        public static List<IdStrDto> GetQitemTypes(Db db = null)
        {
            var sql = @"
select 
    Value as Id, Name as Str
from dbo.XpCode
where Type='EitemType'
and Ext='Q'
order by Sort
";
            return SqlToCodes(sql, db);
        }

        public static List<IdStrDto> GetRitemTypes(Db db = null)
        {
            return GetCodes("RitemType", db);
        }

        public static List<IdStrDto> GetEitemTypes(Db db = null)
        {
            return GetCodes("EitemType", db);
        }

        public static List<IdStrDto> GetCheckTypes(Db db = null)
        {
            return GetCodes("CheckType", db);
        }

        public static List<IdStrDto> GetQitemOps(Db db = null)
        {
            return GetCodes("QitemOp", db);
        }

        public static List<IdStrDto> GetAuthTypes(Db db = null)
        {
            return GetCodes("AuthType", db);
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
