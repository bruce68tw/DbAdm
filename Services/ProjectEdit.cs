using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ProjectEdit : BaseEditSvc
    {
        public ProjectEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
                Table = "dbo.Project",
                PkeyFid = "Id",   //primary key
                Col4 = null,
                ReadSql = $@"
select p.*, 
    CreatorName=u.Name, ReviserName=u2.Name,
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.Project p
left join dbo.[User] u on p.Creator=u.Id
left join dbo.[User] u2 on p.Reviser=u2.Id
where p.Id=@Id
",
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "Code", Required = true },
                    new() { Fid = "DbName", Required = true },
                    new() { Fid = "ProjectPath", Required = true },
                    new() { Fid = "ConnectStr", Required = true },
                    new() { Fid = "Status", Required = true },
                ],
            };
        }

    } //class
}
