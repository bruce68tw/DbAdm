using Base.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DbAdm.Services
{
    public class ColumnService
    {
        public JArray GetRows(string tableId)
        {
            if (string.IsNullOrEmpty(tableId) || !_Str.CheckKeyRule(tableId, "ColumnService.cs GetRows() tableId is wrong: " + tableId))
                return null;

            var sql = string.Format(@"
select 
    c.Id, c.Code, c.Name, c.DataType
from dbo.[Column] c
where c.TableId='{0}'
and c.Status=1
order by c.Sort
", tableId);
            return _Db.GetJsons(sql);
        }

    }//class
}