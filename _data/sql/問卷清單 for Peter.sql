
select �M��=p.Name, 
	/*
	i.Title,
	i.WorkDate,
	i.RptDeptCode,
	i.RptUser,
	*/
	�ϳB�W��=d.NM_TEAM, i.Id, 
	�^�аݨ�=CASE 
		WHEN s.Id is not null THEN '�w�^��'
		WHEN i.SendTimes > 0 THEN '�H�X'
		ELSE '���H�X'
	END,
	Q1=isnull(s.Q1,''), Q2=isnull(s.Q2,''), Q3=isnull(s.Q3,''), Q4=isnull(s.Q4,''), �^�лP�_='', ��������='', Q5=isnull(s.Q5,'')
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
select * from [192.168.246.26].[05200169].[dbo].PersonalBasicInfo where username='�����s'

*/