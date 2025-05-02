
select 專案=p.Name, 區處名稱=d.NM_TEAM, i.Id, 
	回覆問卷=CASE 
		WHEN s.Id is not null THEN '已回覆'
		WHEN i.SendTimes > 0 THEN '寄出'
		ELSE '未寄出'
	END,
	s.Q1, s.Q2, s.Q3, s.Q4, 回覆與否='', 平均分數='', s.Q5
from dbo.Issue i 
left join dbo.Survey s on i.Id=s.Id
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join [192.168.246.57].[Warehouse].[dbo].[J_TEAM_DEPT] d on d.DT_YYY='114' and i.RptDeptCode=d.ID_DEPT
where i.Created >= '2025/4/1'
order by p.Name