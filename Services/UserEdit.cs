using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class UserEdit : BaseEditSvc
    {
        public UserEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[User]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new EitemDto[] 
				{
					new() { Fid = "Id" },
					new() { Fid = "Account" },
					new() { Fid = "Name" },
					new() { Fid = "Pwd" },
					new() { Fid = "DeptId" },
					new() { Fid = "Status" },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        Table = "dbo.XpUserRole",
                        PkeyFid = "Id",
                        FkeyFid = "UserId",
                        Col4 = null,
                        Items = new EitemDto[] 
						{
							new() { Fid = "Id" },
							new() { Fid = "UserId" },
							new() { Fid = "RoleId", Required = true },
                        },
                    },
                },
            };
        }

    } //class
}
