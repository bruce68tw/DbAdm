using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ColumnEdit : MyEdit
    {
        public ColumnEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.[Column]",
                PkeyFid = "Id",
                Col4 = null,
                ReadSql = $@"
select 
    p.Code as ProjectCode, t.Code as TableCode,
    c.*
from dbo.[Column] c
join dbo.[Table] t on t.Id=c.TableId
join dbo.Project p on p.Id=t.ProjectId
where c.Id='{{0}}'
",
                Items = new EitemDto[] {
                    new EitemDto() { Fid = "Id" },
                    new EitemDto() { Fid = "Code" },
                    new EitemDto() { Fid = "Name" },
                    new EitemDto() { Fid = "Status" },
                    new EitemDto() { Fid = "Note" },
                },
            };
        }

        /*
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
        */

    } //class
}
