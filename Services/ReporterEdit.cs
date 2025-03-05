using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ReporterEdit : BaseEditSvc
    {
        public ReporterEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.Reporter",
                PkeyFid = "Id",
                Col4 = null,

                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "Name" },
                    new() { Fid = "Email" },
                ],
            };
        }

    } //class
}
