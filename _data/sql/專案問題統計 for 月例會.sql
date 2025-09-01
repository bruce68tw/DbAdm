
/*
select * from dbo.Project
select * from dbo.PrjProg
select distinct RptUser from dbo.Issue 
where created > '2025-06-01'
select * from dbo.Issue 
where 1=1
--and Id='sWX9TwTAzz'
and RptUser in ('²±¹F»Ê','Áú©v¾ç','®}±Òµ¾')
*/

select pName=p.Name, c.Name, count(*)
from dbo.Issue i
join dbo.PrjProg pp on i.ProgId=pp.Id
join dbo.Project p on pp.ProjectId=p.Id
join dbo.XpCode c on c.Type='IssueType' and i.IssueType=c.Value
where 1=1
--and i.ProjectId='anqEH1QbQR'
and i.IssueType in ('UA','UO','UP','US')
and i.Created >= '2025/8/1'
group by p.Name, c.Name
having count(*) > 1
order by p.Name, c.Name

