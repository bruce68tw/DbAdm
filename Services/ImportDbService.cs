using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DbAdm.Services
{
    public class ImportDbService
    {
        public async Task<ResultDto> RunAsync(string projectId)
        {
            var result = new ResultDto();

            #region 1.get dbo.Project row
            var db = new Db();
            Db dbSrc = null;
            var project = await db.GetJsonAsync(string.Format(@"
select DbName, ConnectStr
from dbo.Project
where Id='{0}'
", projectId));

            if (project == null)
            {
                result.ErrorMsg = "Project no row";
                goto lab_exit;
            }
            else if(_Object.IsEmpty(project["DbName"]) || _Object.IsEmpty(project["ConnectStr"]))
            {
                result.ErrorMsg = "Project.DbName or ConnectStr is empty.";
                goto lab_exit;
            }

            //connect source db
            dbSrc = new Db(project["ConnectStr"].ToString());
            if (!await dbSrc.InitDbAsync())
            {
                result.ErrorMsg = "Project.ConnectStr is wrong.";
                goto lab_exit;
            }
            #endregion

            #region 2.create temp table: #tmpTable, #tmpColumn
            await db .ExecSqlAsync(@"
CREATE TABLE #tmpTable(
    Code varchar(30) NOT NULL primary key,
    Note varchar(255) NULL
);
CREATE TABLE #tmpColumn(
	Code varchar(30) NOT NULL,
	TableCode varchar(30) NULL,
	DataType varchar(20) NOT NULL,
	Nullable bit NOT NULL,
	DefaultValue varchar(30) NULL,
	Sort smallint NOT NULL,
	Note nvarchar(100) NULL
);
CREATE NONCLUSTERED	INDEX ix_tmpColumn ON #tmpColumn (Code);");
            #endregion

            #region 3.write #tmpTable(from Information_Schema.Tables)
            //欄位順序必須與Db相同
            var dbName = project["DbName"].ToString();
            var reader = await dbSrc.GetReaderAsync(string.Format(@"
select 
    Code=t.table_name,
	Note=CASE WHEN p.value IS NULL THEN '' ELSE cast(p.value as varchar) end
from Information_Schema.Tables t
LEFT JOIN sys.extended_properties p ON p.major_id = object_id(t.table_schema + '.' + t.table_name) 
	AND p.minor_id = 0
	AND p.name = 'MS_Description'     
WHERE 1=1
--and TABLE_SCHEMA = 'dbo'
AND TABLE_CATALOG = '{0}'
and table_type = 'BASE TABLE'
ORDER BY t.table_name
", dbName));

            //bulk copy
            using (var bcp = new SqlBulkCopy((SqlConnection)db.GetConnection()))
            {
                bcp.DestinationTableName = "#tmpTable";
                try
                {
                    bcp.WriteToServer(reader);
                }
                catch (Exception ex)
                {
                    //_Log.Error("#tmpTable bulk copy failed: " + ex.Message);
                    result.ErrorMsg = "#tmpTable bulk copy failed. " + ex.Message;
                    goto lab_exit;
                }
                finally
                {
                    reader.Close();
                }
            }
            #endregion

            #region 4.write #tmpColumn(from Information_Schema.Columns)
            reader = await dbSrc.GetReaderAsync(string.Format(@"
SELECT 
    Code=column_name, 
	TableCode=table_name, 
	DataType=data_type + (case when character_maximum_length is null then '' else '('+CONVERT(VARCHAR, character_maximum_length)+')' end),
    Nullable=case when is_nullable = 'YES' then 1 else 0 end,
	DefaultValue=case when i.COLUMN_DEFAULT is null then '' else replace(replace(i.COLUMN_DEFAULT,'(',''),')','') end,
	Sort=ORDINAL_POSITION,
    Note=ISNULL(( 
		SELECT cast(value as varchar)
        FROM ::FN_ListExtendedProperty(NULL, 'user', 'dbo', 
			'table', table_name, 'column',
			column_name)
	), '') 
FROM Information_Schema.Columns AS i
WHERE 1=1
AND TABLE_CATALOG = '{0}'
ORDER BY table_name, ORDINAL_POSITION
", dbName));

            using (var bcp = new SqlBulkCopy((SqlConnection)db.GetConnection()))
            {
                bcp.DestinationTableName = "#tmpColumn";
                try
                {
                    bcp.WriteToServer(reader);
                }
                catch (Exception ex)
                {
                    //_Log.Error("#tmpColumn bulk copy failed: " + ex.Message);
                    result.ErrorMsg = "#tmpColumn bulk copy failed. " + ex.Message;
                    goto lab_exit;
                }
                finally
                {
                    reader.Close();
                }
            }
            #endregion

            #region 5.insert/update dbo.Table from #tmpTable
            //get rows for insert new 
            var tables = await db.GetJsonsAsync(string.Format(@"
select Code, Note
from #tmpTable
where Code not in (
    select Code 
    from dbo.[Table]
    where ProjectId='{0}'
)
", projectId));

            //insert new table
            if (tables != null)
            {
                foreach (JObject table in tables)
                {
                    await db.ExecSqlAsync(string.Format(@"
insert into dbo.[Table](Id, ProjectId, Code, Name, Note, Status)
values('{0}', '{1}', '{2}', '', '{3}', 1)
", _Str.NewId(), projectId, table["Code"].ToString(), table["Note"].ToString()));
                }
            }

            //update table.status(0/1)
            await db.ExecSqlAsync(string.Format(@"
update a set 
    Status=case when t.Code is null then 0 else 1 end
from dbo.[Table] a
left outer join #tmpTable t on t.Code=a.Code
where a.ProjectId='{0}'
", projectId));
            #endregion

            #region 6.insert/update dbo.Column from #tmpColumn
            //get rows for insert new 
            var cols = await db.GetJsonsAsync(string.Format(@"
select
    c.Code, t.Id as TableId, c.Note,
    c.Nullable
from #tmpColumn c
inner join dbo.[Table] t on t.Code=c.TableCode and t.ProjectId='{0}' 
where t.Id+c.Code not in (
    select t.Id+c.Code 
    from dbo.[Column] c
    inner join dbo.[Table] t on t.Id=c.TableId
    where t.ProjectId='{0}'
)", projectId));

            //insert new, 同時寫入Note欄位
            if (cols != null)
            {
                foreach (JObject col in cols)
                {
                    //create new Column
                    //在這裡只寫入部分欄位, 後面會再update一次
                    await db.ExecSqlAsync(string.Format(@"
insert into dbo.[Column](
    Id, TableId, Code, 
    Name, DataType, Nullable,
    DefaultValue, Sort, Note, 
    Status)
values(
    '{0}', '{1}', '{2}', 
    '', '', {3}, 
    '', 0, '{4}',
    1)
",
_Str.NewId(), col["TableId"].ToString(), col["Code"].ToString(), 
Convert.ToByte(col["Nullable"]),
col["Note"].ToString()
));
                }
            }

            //set column status = 0
            await db.ExecSqlAsync(string.Format(@"
update c
    set Status=0
from dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
where t.projectId='{0}'
and t.Code+c.Code not in (
    select TableCode+Code from #tmpColumn
)
", projectId));

            //update column 
            //如果原本的Note為空白, 則無條件從來源欄位更新
            await db.ExecSqlAsync(string.Format(@"
update c set 
    DataType=tc.DataType, Nullable=tc.Nullable, 
    DefaultValue=tc.DefaultValue, Sort=tc.Sort, 
    Status=1,
    Note=case when (c.Note is null or c.Note = '') then tc.Note else c.Note end
from dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
inner join #tmpColumn tc on t.Code=tc.TableCode and c.Code=tc.Code
where t.projectId='{0}'
", projectId));
            #endregion

        lab_exit:
            if (dbSrc != null)
                await dbSrc.DisposeAsync();

            await db.DisposeAsync();
            return result;
        }
    }
}
