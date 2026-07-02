using Base.Enums;
using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class DataDictEdit(string ctrl) : BaseEditSvc(ctrl)
    {
        override public EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.DataDict",
                PkeyFid = "Code",
                Col4 = null,
                AutoIdLen = 0,
                Items = [
                    new() { Fid = "Code" },
                    new() { Fid = "Name" },
                    new() { Fid = "DataType" },
                    new() { Fid = "Nullable" },
                    new() { Fid = "DefaultValue" },
                    new() { Fid = "Note" },
                    new() { Fid = "TableType" },
                ],
            };
        }

    } //class
}
