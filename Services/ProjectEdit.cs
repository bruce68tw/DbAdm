using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ProjectEdit : MyEdit
    {
        public ProjectEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
                Table = "dbo.Project",
                PkeyFid = "Id",   //primary key
                Col4 = null,
                Items = new[] {
                    new EitemDto { Fid = "Id" },
                    new EitemDto { Fid = "Code", Required = true },
                    new EitemDto { Fid = "DbName", Required = true },
                    //new EitemDto { Fid = "ProjectSpace", Required = true },
                    new EitemDto { Fid = "ProjectPath", Required = true },
                    new EitemDto { Fid = "ConnectStr", Required = true },
                    new EitemDto { Fid = "Status", Required = true },
                },
            };
        }

    } //class
}
