using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DbAdm.Services
{
    public class ColumnEdit
    {
        //設定編輯欄位
        private EditDto GetDto()
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

        //傳回一筆資料
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

        //儲存新增的資料
        public ResultDto Create(JObject json)
        {            
            return new CrudEdit(GetDto()).Create(json);
        }

        //儲存修改的資料
        public ResultDto Update(string key, JObject json)
        {
            return new CrudEdit(GetDto()).Update(key, json);
        }

        //刪除一筆資料
        public ResultDto Delete(string key)
        {
            return new CrudEdit(GetDto()).Delete(key);
        }

    } //class
}
