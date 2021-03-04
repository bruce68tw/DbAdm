using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DbAdm.Services
{
    public class ColumnEdit
    {
        private EditDto GetModel()
        {
            return new EditDto()
            {                
                Table = "dbo.[Column]",
                PkeyFid = "Id",   //primary key 欄位id
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
Select 
    p.Code as ProjectCode, t.Code as TableCode,
    c.*
From dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
inner join dbo.Project p on p.Id=t.ProjectId
where c.Id=@Id
", new List<object>() { "Id", key });
        }

        //key為空白表示新增資料
        public ResultDto Create(JObject json)
        {            
            return new CrudEdit(GetModel()).Create(json);
        }

        public ResultDto Update(string key, JObject json)
        {
            return new CrudEdit(GetModel()).Update(key, json);
        }

        public ResultDto Delete(string key)
        {
            return new CrudEdit(GetModel()).Delete(key);
        }

    } //class
}
