
select �M��=p.Name, �ϳB�W��=d.NM_TEAM, i.Id, 
	�^�аݨ�=CASE 
		WHEN s.Id is not null THEN '�w�^��'
		WHEN i.SendTimes > 0 THEN '�H�X'
		ELSE '���H�X'
	END,
	s.Q1, s.Q2, s.Q3, s.Q4, �^�лP�_='', ��������='', s.Q5
from dbo.Issue i 
left join dbo.Survey s on i.Id=s.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and i.RptDeptCode=d.ID_DEPT
where i.Created >= '2025/4/1'
order by p.Name