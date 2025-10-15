using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class UiEdit : BaseEditSvc
    {
        public UiEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.[Ui]",
                PkeyFid = "Id",
                Col4 = ["Creator", "Created"],
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "ProjectId" },
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "Status", Value = 1 },
                    new() { Fid = "Note" },
                ],
                Childs = [
                    new()
                    {
                        Table = "dbo.UiItem",
                        PkeyFid = "Id",
                        FkeyFid = "UiId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = [
                            new() { Fid = "Id" },
                            new() { Fid = "UiId" },
                            new() { Fid = "UpId" },
                            new() { Fid = "ItemType" },
                            new() { Fid = "Info" },
                            new() { Fid = "Sort" },
                        ],
                    },
                ],
            };
        }

    } //class
}
