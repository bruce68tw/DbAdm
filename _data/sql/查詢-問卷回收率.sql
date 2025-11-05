select 專案名稱=Name, 全部報修件數=Total, 問卷回收件數=SendTimes, 回覆率=ROUND(1.0 * SendTimes / Total, 2)
from (
	select p.Name,
		COUNT(*) AS Total,
		COUNT(CASE WHEN s.Id IS not NULL THEN 1 END) AS SendTimes
	from dbo.issue i
	left join dbo.Survey s on i.Id=s.Id
	join dbo.PrjProg pp on i.ProgId=pp.Id
	join dbo.Project p on pp.ProjectId=p.Id
	where 1=1
	--and i.rptuser is not null and i.rptUser != ''
	--and i.SendTimes = 0
	--order by u.Name
	group by p.Id, p.Name
) a
order by Name
