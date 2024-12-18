using Base.Models;
using Base.Services;
using BaseApi.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DbAdm.Services
{
	public class IssueEdit : BaseEditSvc
    {
        public IssueEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new()
			{
				Table = "dbo.Issue",
                PkeyFid = "Id",
                ReadSql = $@"
select i.*,
    ProjectName=p.Name,
    ProgName=pp.Name,
    CreatorName=u.Name,
    ReviserName=u3.Name,
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.Issue i
join dbo.Project p on i.ProjectId=p.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.XpUser u on i.Creator=u.Id
left join dbo.XpUser u3 on i.Reviser=u3.Id
where i.Id=@Id
",
                Items =
                [
                    new() { Fid = "Id" },
					new() { Fid = "ProjectId" },
					new() { Fid = "ProgId" },
					new() { Fid = "IssueType" },
					new() { Fid = "WorkDate" },
					new() { Fid = "WorkHours" },
					new() { Fid = "Title" },
					new() { Fid = "Note" },
                ],
                Childs = [
                    new()
					{
                        Table = "dbo.IssueFile",
                        PkeyFid = "Id",
                        FkeyFid = "IssueId",
                        Col4 = [ "Creator", "Created", "","Created" ],
                        Items =
                        [
                            new() { Fid = "Id" },
                            new() { Fid = "IssueId" },
                            new() { Fid = "FileName" },
							new() { Fid = "Created" },
						],
                    },
					new()
					{
						Table = "dbo.IssueRelat",
						PkeyFid = "Id",
						FkeyFid = "IssueId",
						Col4 = [ "Creator", "Created", "", "Created" ],
						ReadSql = @"
select r.*,
	i.Title
from dbo.IssueRelat r
left join dbo.Issue i on r.IssueId=i.Id
where r.IssueId=@Id
",						
						Items =
						[
							new() { Fid = "Id" },
							new() { Fid = "IssueId" },
                            new() { Fid = "Title", Read = true },
                        ],
					},
				],
            };
        }

		public async Task<ResultDto> CreateA(JObject json, List<IFormFile> t00_FileName)
		{
			var service = EditService();
			var result = await service.CreateA(json);
			if (_Valid.ResultStatus(result))
			{
				var newKeyJson = service.GetNewKeyJson();
				await _HttpFile.SaveCrudFilesA(json, newKeyJson, _Xp.DirIssueFile, t00_FileName, nameof(t00_FileName));
			}
			return result;
		}

		public async Task<ResultDto> UpdateA(string key, JObject json, List<IFormFile> t00_FileName)
		{
			var service = EditService();
			var result = await service.UpdateA(key, json);
			if (_Valid.ResultStatus(result))
			{
				var newKeyJson = service.GetNewKeyJson();
				await _HttpFile.SaveCrudFilesA(json, newKeyJson, _Xp.DirIssueFile, t00_FileName, nameof(t00_FileName));
			}
			return result;
		}

	} //class
}
