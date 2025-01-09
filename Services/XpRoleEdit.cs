using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class XpRoleEdit : BaseEditSvc
    {
        public XpRoleEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.XpRole",
                PkeyFid = "Id",
                Col4 = null,
                Items =
                [
                    new() { Fid = "Id" },
					new() { Fid = "Name" },
                ],
                Childs =
                [
                    new EditDto
                    {
                        ReadSql = @"
select a.*, u.Account, 
    u.Name as UserName, d.Name as DeptName
from dbo.XpUserRole a
join dbo.XpUser u on a.UserId=u.Id
join dbo.XpDept d on u.DeptId=d.Id
where a.RoleId=@Id
order by u.Account
",
                        Table = "dbo.XpUserRole",
                        PkeyFid = "Id",
                        FkeyFid = "RoleId",
                        Col4 = null,
                        Items =
                        [
                            new() { Fid = "Id" },
                            new() { Fid = "UserId", Required = true },
                            new() { Fid = "RoleId" },
                        ],
                    },
                    new EditDto
                    {
                        ReadSql = @"
select a.*
from dbo.XpRoleProg a
join dbo.XpProg p on a.ProgId=p.Id
where a.RoleId=@Id
order by p.Sort
",
                        Table = "dbo.XpRoleProg",
                        PkeyFid = "Id",
                        FkeyFid = "RoleId",
                        //OrderBy = "",
                        Col4 = null,
                        Items =
                        [
                            new() { Fid = "Id" },
							new() { Fid = "RoleId" },
							new() { Fid = "ProgId", Required = true },
                            new() { Fid = "FunCreate" },
                            new() { Fid = "FunRead" },
                            new() { Fid = "FunUpdate" },
                            new() { Fid = "FunDelete" },
                            new() { Fid = "FunPrint" },
                            new() { Fid = "FunExport" },
                            new() { Fid = "FunView" },
                        ],
                    },
                ],
            };
        }

    } //class
}
