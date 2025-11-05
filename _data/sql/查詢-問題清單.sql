
--select * from dbo.Project
--select * from dbo.PrjProg

select pName=p.Name, c.Name, i.Title
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpCode c on c.Type='IssueType' and i.IssueType=c.Value
where 1=1
and p.Id in ('iBYUdLuQPo','TOtrY1wZa5','BKSClebELX')
and i.IssueType in ('UP','US')
and i.Created >= '2025/4/1'
--group by p.Name, c.Name
--having count(*) > 1
order by p.Name, c.Name

