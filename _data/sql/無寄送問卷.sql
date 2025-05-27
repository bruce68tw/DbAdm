select 
	--distinct i.RptUser
	u.Name, SurveyId=s.Id, i.* 
from dbo.issue i
left join dbo.Survey s on i.Id=s.Id
join dbo.XpUser u on i.OwnerId=u.Id
where 1=1
--and (i.IsFinish=1 and i.rptuser is not null and i.rptUser != '' and i.SendTimes = 0)	--應寄未寄
--and isnull(i.RptUser,'') = ''
and (i.IsFinish=1 and i.SendTimes > 0 and s.Id is null)	--結案有寄沒回
--and (i.IsFinish=1 and i.SendTimes > 0 and s.Id is not null)	--結案有寄有回
--and (i.IsFinish=0 and i.RptUser is not null)	--未結案有回報人
--and i.OwnerId in ('Dyrel','e12838','Hcy','Mark','Aries')	--一組
--and i.OwnerId in ('Carter','Bluebet', 'Ivan','Judy','Thomas')		--二組
and i.WorkDate between '2025/5/1' and '2025/6/1'
and i.IssueType in ('UA','UO','UP','US')

--and i.RptUser = '13169'
--order by u.Name
--order by i.RptUser
order by i.WorkDate, i.RptUser
--select * from dbo.Issue