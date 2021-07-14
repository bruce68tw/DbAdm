using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class TableEdit : MyEdit
    {
        public TableEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
                Table = "dbo.[Table]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new[] {
                    new EitemDto { Fid = "Id" },
                    new EitemDto { Fid = "ProjectId" },
                    new EitemDto { Fid = "Code" },
                    new EitemDto { Fid = "Name" },
                    new EitemDto { Fid = "TranLog" },
                    new EitemDto { Fid = "Note" },
                    new EitemDto { Fid = "Status" },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        Table = "dbo.[Column]",
                        PkeyFid = "Id",
                        FkeyFid = "TableId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = new [] {
                            new EitemDto { Fid = "Id" },
                            new EitemDto { Fid = "TableId" },
                            new EitemDto { Fid = "Code" },
                            new EitemDto { Fid = "Name" },
                            new EitemDto { Fid = "DataType" },
                            new EitemDto { Fid = "Nullable" },
                            new EitemDto { Fid = "DefaultValue" },
                            new EitemDto { Fid = "Sort" },
                            new EitemDto { Fid = "Note" },
                            new EitemDto { Fid = "Status" },
                        },
                    },
                },
            };
        }

    } //class
}
