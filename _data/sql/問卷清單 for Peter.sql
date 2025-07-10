
select 專案=p.Name, 
	/*
	i.Title,
	i.WorkDate,
	i.RptDeptCode,
	i.RptUser,
	*/
	區處名稱=d.NM_TEAM, i.Id, 
	回覆問卷=CASE 
		WHEN s.Id is not null THEN '已回覆'
		WHEN i.SendTimes > 0 THEN '寄出'
		ELSE '未寄出'
	END,
	Q1=isnull(s.Q1,''), Q2=isnull(s.Q2,''), Q3=isnull(s.Q3,''), Q4=isnull(s.Q4,''), 回覆與否='', 平均分數='', Q5=isnull(s.Q5,'')
from dbo.Issue i 
left join dbo.Survey s on i.Id=s.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
--left join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and i.RptDeptCode=d.ID_DEPT
left join [192.168.246.26].[05200169].[dbo].PersonalBasicInfo e on i.RptUser=e.LogonId
--left join [192.168.246.26].[05200169].[dbo].[HRMS_DEPARTMENT] d on e.[DEPARTMENT_CODE]=d.ID_DEPT
left join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and e.DEPARTMENT_CODE=d.ID_DEPT
where 1=1
and i.WorkDate >= '2025/5/26'
and i.IssueType in ('UA','UO','UP','US')
and i.IsFinish=1
and isnull(i.RptUser,'') != ''
--and isnull(i.RptDeptCode,'') = ''
order by p.Name

/*
select * from dbo.Issue where id='eTxsdhoU94'
left join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and i.RptDeptCode=d.ID_DEPT
select * from [192.168.246.26].[05200169].[dbo].PersonalBasicInfo where username='陳明山'

*/