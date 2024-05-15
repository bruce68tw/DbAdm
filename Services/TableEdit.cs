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
                Items = new EitemDto[] {
                    new() { Fid = "Id" },
                    new() { Fid = "ProjectId" },
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "TranLog" },
                    new() { Fid = "Note" },
                    new() { Fid = "Status" },
                },
                Childs = new EditDto[]
                {
                    new()
                    {
                        Table = "dbo.[Column]",
                        PkeyFid = "Id",
                        FkeyFid = "TableId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = new EitemDto[] {
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
                        },
                    },
                },
            };
        }

    } //class
}
