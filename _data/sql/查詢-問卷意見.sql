
select u.Name, i.Title, s.Id, Q1,Q2,Q3,Q4,Q5, i.Created
from dbo.Survey s
join dbo.Issue i on s.Id=i.Id
join dbo.XpUser u on i.OwnerId=u.Id
where 1=1
and i.Created between '2026/3/1' and '2026/4/1'
and s.Q5 is not null
and s.Q5 != 'µL'
order by u.Name, i.Created
