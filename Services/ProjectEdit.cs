using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class ProjectEdit : XpEdit
    {
        public ProjectEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto
            {
                Table = "dbo.Project",
                PkeyFid = "Id",   //primary key
                Col4 = null,
                Items = new EitemDto[] {
                    new() { Fid = "Id" },
                    new() { Fid = "Code", Required = true },
                    new() { Fid = "DbName", Required = true },
                    //new() { Fid = "ProjectSpace", Required = true },
                    new() { Fid = "ProjectPath", Required = true },
                    new() { Fid = "ConnectStr", Required = true },
                    new() { Fid = "Status", Required = true },
                },
            };
        }

    } //class
}
