using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ColumnEdit : BaseEditSvc
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
select c.*,
    CreatorName=u.Name,
    p.Code as ProjectCode, t.Code as TableCode,    
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.[Column] c
join dbo.[Table] t on t.Id=c.TableId
join dbo.Project p on p.Id=t.ProjectId
left join dbo.[User] u on p.Creator=u.Id
where c.Id=@Id
",
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "Status" },
                    new() { Fid = "Note" },
                ],
            };
        }

    } //class
}
