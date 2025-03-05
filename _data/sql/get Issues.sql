
--select * from dbo.Project
--select * from dbo.PrjProg

select pp.Name, count(*)
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
where i.ProjectId='anqEH1QbQR'
and i.IssueType in ('UO','UP')
and i.Created >= '2025/1/1'
group by pp.Name
having count(*) > 1
order by count(*) desc

