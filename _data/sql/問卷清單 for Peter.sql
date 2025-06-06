
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
left join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and i.RptDeptCode=d.ID_DEPT
where 1=1
and i.WorkDate >= '2025/4/26'
and i.IssueType in ('UA','UO','UP','US')
and i.IsFinish=1
and isnull(i.RptUser,'') != ''
--and isnull(i.RptDeptCode,'') = ''
order by p.Name