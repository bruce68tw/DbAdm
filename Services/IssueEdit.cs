using Base.Models;
using Base.Services;
using BaseApi.Services;
using Newtonsoft.Json.Linq;

namespace DbAdm.Services
{
    public class IssueEdit : BaseEditSvc
    {
        public IssueEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            return new()
			{
				FnValidate = FnValidate,
				Table = "dbo.Issue",
                PkeyFid = "Id",
                ReadSql = $@"
select i.*,
	_ProjectId=pp.ProjectId,
	WatchId=w.Id,
    ProjectName=p.Name,
    ProgName=pp.Name,
    CreatorName=u2.Name,
    ReviserName=u3.Name,
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpUser u on i.OwnerId=u.Id
join dbo.XpUser u2 on i.Creator=u2.Id
left join dbo.XpUser u3 on i.Reviser=u3.Id
left join dbo.IssueWatch w on i.Id=w.IssueId and w.WatcherId='{_Fun.UserId()}'
where i.Id=@Id
",
                Items =
                [
                    new() { Fid = "Id" },
					//new() { Fid = "ProjectId" },
					new() { Fid = "ProgId" },
					new() { Fid = "IssueType" },
					new() { Fid = "WorkDate" },
					new() { Fid = "WorkHours" },
					new() { Fid = "IsFinish" },
					new() { Fid = "Title" },
					new() { Fid = "Note" },
					new() { Fid = "OwnerId" },
					new() { Fid = "RptDeptCode" },
					new() { Fid = "RptUser" },
					new() { Fid = "RptType" },
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
left join dbo.Issue i on r.SourceIssue=i.Id
where r.IssueId=@Id
",						
						Items =
						[
							new() { Fid = "Id" },
							new() { Fid = "IssueId" },
                            new() { Fid = "Title", Read = true },
                            new() { Fid = "SourceIssue" },
                        ],
					},
				],
            };
        }

        //檢查傳入資料 for Create, Update
        private List<ErrorRowDto>? FnValidate(bool isNew, JObject json)
        {
			var row = _Json.GetRows0(json);
			var workDate = _Json.GetFidStr(row, "WorkDate");
			if (_Str.IsEmpty(workDate))
				return null;

			//工作日期不可大於今天
			var result = new List<ErrorRowDto>();
            if (_Date.CsToDate(workDate) > _Date.Today())
			{
				result.Add(new ErrorRowDto()
				{
					Fid = "WorkDate",
					Msg = "工作日期不可大於今天 !!",
				});
			}
			return result;
        }

        public async Task<ResultDto> CreateA(JObject json, List<IFormFile> t00_FileName)
		{
			var service = EditService();
			var result = await service.CreateA(json);
			if (_Valid.ResultStatus(result))
			{
				var newKeyJson = service.GetNewKeyJson();
				await _HttpFile.SaveCrudFilesA(json, newKeyJson, _Xp.DirIssueFile, t00_FileName, nameof(t00_FileName));
				await SurveyA(result, service.GetMainKey());		//寄問卷
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
                await SurveyA(result, service.GetMainKey());		//寄問卷
            }
            return result;
		}

		//寄送滿意度問卷 if need
        private async Task SurveyA(ResultDto result, string key)
		{
			//檢查結果
			if (_Result.HasError(result))
				return;

			//是否符合: 已結案、有回報人、寄送次數為0
			var sql = $@"
select Id
from dbo.Issue
where 1=1
and Id='{key}'
and IsFinish = 1
and SendTimes = 0
and isnull(RptUser,'') != '' 
";
			if (_Str.IsEmpty(await _Db.GetStrA(sql)))
				return;

			//寄問卷
			await new SurveyService().SendSurveyA(key);
        }

    } //class
}
