
--select * from dbo.Project
--select * from dbo.PrjProg

select pName=p.Name, c.Name, count(*)
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpCode c on c.Type='IssueType' and i.IssueType=c.Value
where 1=1
--and i.ProjectId='anqEH1QbQR'
and i.IssueType in ('UA','UO','UP','US')
and i.Created >= '2025/5/1'
group by p.Name, c.Name
having count(*) > 1
order by p.Name, c.Name

