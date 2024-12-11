using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class TableEdit : BaseEditSvc
    {
        public TableEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
                Table = "dbo.[Table]",
                PkeyFid = "Id",
                Col4 = null,
                ReadSql = $@"
select t.*, 
    CreatorName=u.Name, 
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.[Table] t
join dbo.Project p on t.ProjectId=p.Id
left join dbo.XpUser u on p.Creator=u.Id
where t.Id=@Id
",
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "ProjectId" },
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "TranLog" },
                    new() { Fid = "Note" },
                    new() { Fid = "Status" },
                ],
                Childs = [
                    new()
                    {
                        Table = "dbo.[Column]",
                        PkeyFid = "Id",
                        FkeyFid = "TableId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = [
                            new() { Fid = "Id" },
                            new() { Fid = "TableId" },
                            new() { Fid = "Code" },
                            new() { Fid = "Name" },
                            new() { Fid = "DataType" },
                            new() { Fid = "Nullable" },
                            new() { Fid = "DefaultValue" },
                            new() { Fid = "Sort" },
                            new() { Fid = "Note" },
                            new() { Fid = "Status" },
                        ],
                    },
                ],
            };
        }
    } //class
}
