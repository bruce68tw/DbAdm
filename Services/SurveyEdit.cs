using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class SurveyEdit : BaseEditSvc
    {
        public SurveyEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new EditDto()
            {                
                Table = "dbo.Survey",
                PkeyFid = "Id",
                Col4 = null,
                ReadSql = @"
Select s.*, i.Title 
From dbo.Survey s
join dbo.Issue i on s.Id=i.Id
where s.Id=@Id
",
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "Title" },
                    new() { Fid = "Q5" },
                    new() { Fid = "Created" },
                ],
            };
        }

    } //class
}
