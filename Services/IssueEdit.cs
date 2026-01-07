using Base.Models;
using Base.Services;
using BaseApi.Services;
using DbAdm.Enums;
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
                FnValidateA = FnValidateA,
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
                    new() { Fid = "FromMgr" },
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
        private async Task<List<ErrorRowDto>?> FnValidateA(bool isNew, JObject json)
        {
			var row = _Json.GetRows0(json);
			var result = new List<ErrorRowDto>();

			#region 工作日期不可大於今天
			var workDate = _Json.GetFidStr(row, "WorkDate");
			if (_Str.NotEmpty(workDate))
			{
				if (_Date.CsToDate(workDate) > _Date.Today())
				{
					result.Add(new ErrorRowDto()
					{
						Fid = "WorkDate",
						Msg = "工作日期不可大於今天 !!",
					});
					return result;
				}
			}
			#endregion

			#region 檢查 RptUser
			//var issueType = _Json.GetFidStr(row, "IssueType");
			var issueType = _Json.GetFidStr(row, "_IssueType");
			var rptType = _Json.GetFidStr(row, "RptType");
			if (_Str.NotEmpty(rptType))
			{
				//如果 issueType 為 RptAuth, 則 rptType 只能為: MisDesk, BpmForm, Form, SignDocu
				if (issueType == IssueTypeEstr.RptAuth &&
					!new[]{ IssueRptTypeEstr.MisDesk, 
						IssueRptTypeEstr.BpmForm,
						IssueRptTypeEstr.Form,
						IssueRptTypeEstr.SignDocu
					}.Contains(rptType))
				{
					result.Add(new ErrorRowDto()
					{
						Fid = "RptType",
						Msg = "[資料種類]為[資料與權限調整]時，[回報方式]必須是填寫表單相關 !!",
					});
					return result;
				}
			}
			#endregion

			#region 檢查 RptUser
			var rptUser = _Json.GetFidStr(row, "_RptUser");
			if (_Str.IsEmpty(rptUser))
			{
				//如果issueType為主要4類, 則RptUser不可為空
				var mainTypes = new List<string>() { IssueTypeEstr.RptBug, IssueTypeEstr.RptOp, IssueTypeEstr.RptPerson, IssueTypeEstr.RptAuth };
				if (mainTypes.Contains(issueType))
				{
                    result.Add(new ErrorRowDto()
                    {
                        Fid = "RptUser",
                        Msg = "[資料種類]為[單位回報]時，不可空白 !!",
                    });
					return result;
				}
			}
			else
			{
				//回報人員編不可錯誤, 同時寫入 RptDeptCode
				var deptNo = await _Db.GetStrA(@"
select d.DeptNo
from dbo.OrgEmp e
join dbo.OrgDept d on e.DeptId=d.Id
where e.EmpNo=@EmpNo
", ["EmpNo", rptUser]);

				if (_Str.IsEmpty(deptNo))
				{
					result.Add(new ErrorRowDto()
					{
						Fid = "RptUser",
						Msg = "回報人員編輸入錯誤 !!",
					});
					return result;
				}
				else
				{
					//寫入RptDeptCode
					row!["RptDeptCode"] = deptNo;
				}
			}
			#endregion

			await Task.CompletedTask;   //模擬 async 結束, 此函數實際為同步!!
            return result;
        }

        public async Task<ResultDto> CreateA(JObject json, List<IFormFile> t00_FileName)
		{
			var service = EditSvc();
			var result = await service.CreateA(json);
			if (_Valid.ResultStatus(result))
			{
				var newKeyJson = service.GetNewKeyJson();
				await _HttpFile.SaveCrudFilesA(json, newKeyJson, _Xp.DirIssueFile, t00_FileName, nameof(t00_FileName));
				await CheckCloseA(result, service.GetMainKey());		//寄問卷
			}
			return result;
		}

		public async Task<ResultDto> UpdateA(string key, JObject json, List<IFormFile> t00_FileName)
		{
			var service = EditSvc();
			var result = await service.UpdateA(key, json);
			if (_Valid.ResultStatus(result))
			{
				var newKeyJson = service.GetNewKeyJson();
				await _HttpFile.SaveCrudFilesA(json, newKeyJson, _Xp.DirIssueFile, t00_FileName, nameof(t00_FileName));
                await CheckCloseA(result, service.GetMainKey());		//寄問卷
            }
            return result;
		}

		//如果首次結案, 則進行:結案寄送滿意度問卷、通知交辦主管if need
        private async Task CheckCloseA(ResultDto result, string key)
		{
			//檢查結果
			if (_Result.HasError(result))
				return;

			//是否符合: 已結案、有回報人、寄送次數為0
			var sql = $@"
select RptUser, FromMgr
from dbo.Issue
where 1=1
and Id='{key}'
and IsFinish = 1
and SendTimes = 0
";
			var row = await _Db.GetRowA(sql);
            if (row == null)
				return;

            //寄問卷 if need(有回報人)
            if (_Json.NotFidEmpty(row, "RptUser"))
				await new IssueSvc().SendSurveyA(key);

            //通知交辦主管 if need
            if (_Json.NotFidEmpty(row, "FromMgr"))
                await new IssueSvc().SendFromMgrA(key);
        }

    } //class
}
