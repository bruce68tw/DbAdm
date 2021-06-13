using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DbAdm.Services
{
    public class ColumnEdit
    {
        private EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.[Column]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new EitemDto[] {
                    new EitemDto() { Fid = "Id" },
                    new EitemDto() { Fid = "Code" },
                    new EitemDto() { Fid = "Name" },
                    new EitemDto() { Fid = "Status" },
                    new EitemDto() { Fid = "Note" },
                },
            };
        }

        public JObject GetJson(string key)
        {
            return _Db.GetJson(@"
select 
    p.Code as ProjectCode, t.Code as TableCode,
    c.*
from dbo.[Column] c
join dbo.[Table] t on t.Id=c.TableId
join dbo.Project p on p.Id=t.ProjectId
where c.Id=@Id
", new List<object>() { "Id", key });
        }

        public ResultDto Create(JObject json)
        {            
            return Service().Create(json);
        }

        public ResultDto Update(string key, JObject json)
        {
            return Service().Update(key, json);
        }

        public ResultDto Delete(string key)
        {
            return Service().Delete(key);
        }

        private CrudEdit Service()
        {
            return new CrudEdit(GetDto());
        }

    } //class
}
