﻿using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class XpUserEdit : BaseEditSvc
    {
        public XpUserEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.XpUser",
                PkeyFid = "Id",
                Col4 = null,
                Items =
                [
                    new() { Fid = "Id" },
					new() { Fid = "Account" },
					new() { Fid = "Name" },
                    new() { Fid = "EmpNo" },
                    new() { Fid = "Pwd", Value = "" },
					new() { Fid = "DeptId" },
					new() { Fid = "Status" },
                ],
                Childs =
                [
                    new EditDto
                    {
                        Table = "dbo.XpUserRole",
                        PkeyFid = "Id",
                        FkeyFid = "UserId",
                        Col4 = null,
                        Items =
                        [
                            new() { Fid = "Id" },
							new() { Fid = "UserId" },
							new() { Fid = "RoleId", Required = true },
                        ],
                    },
                ],
            };
        }

    } //class
}
