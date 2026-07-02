using Base.Enums;
using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class TestEdit(string ctrl) : BaseEditSvc(ctrl)
    {
        override public EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[Table]",
                PkeyFid = "Id",
                Col4 = null,
                Items =
                [
                    new() { Fid = "Id" },
					new() { Fid = "ProjectId", Required = true },
					new() { Fid = "Code", Required = true },
					new() { Fid = "Name", Required = true },
					new() { Fid = "TranLog" },
					new() { Fid = "Status" },
                ],
                Childs =
                [
                    new EditDto
                    {
                        Table = "dbo.[Column]",
                        PkeyFid = "Id",
                        FkeyFid = "TableId",
                        Col4 = null,
                        Items =
                        [
                            new() { Fid = "Id" },
							new() { Fid = "TableId" },
							new() { Fid = "Code", Required = true },
							new() { Fid = "Name", Required = true },
							new() { Fid = "DataType", Required = true },
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
