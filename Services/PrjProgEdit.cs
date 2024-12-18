using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class PrjProgEdit : BaseEditSvc
    {
        public PrjProgEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[PrjProg]",
                PkeyFid = "Id",
                Col4 = ["Creator"],
                ReadSql = $@"
select a.*,
    CreatorName=u.Name,
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.PrjProg a
left join dbo.XpUser u on a.Creator=u.Id
where a.Id=@Id
",
                Items = 
				[
					new() { Fid = "Id" },
					new() { Fid = "Name", Required = true },
					new() { Fid = "ProjectId", Required = true },
					new() { Fid = "Sort", Required = true },
					new() { Fid = "Status" },
                ],
            };
        }

    } //class
}
