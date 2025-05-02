select u.Name, i.* 
from dbo.issue i
left join dbo.Survey s on i.Id=s.Id
join dbo.XpUser u on i.OwnerId=u.Id
where i.rptuser is not null and i.rptUser != ''
--and i.OwnerId in ('Dyrel','e12838','Hcy','Mark','Aries')	--一組
and i.OwnerId in ('Carter','Bluebet', 'Ivan','Judy','Thomas')		--二組
and i.SendTimes = 0
order by u.Name