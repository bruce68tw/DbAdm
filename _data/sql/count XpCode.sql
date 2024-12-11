
select Type, count(*)
from dbo.XpCode
group by Type


select Type,Value,Name,Sort,Note
from dbo.XpCode
where Type='IssueType'
order by Sort