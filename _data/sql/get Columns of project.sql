declare @pid varchar(10)
set @pid = 'vdLeBA5DxR'	--104人資

/*
select * from dbo.Project
*/

--select Code + ' (' + Name + ')' 
select c.* 
--select c.Code, count(*)
--update c set c.Name='行事曆別', c.Note='0:一般工作日, 1:節日, 2:假日'
from dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
where 1=1
and t.ProjectId='vdLeBA5DxR'
--and c.Code = 'SYS_CALENDAR_LEAVE'
--and (c.Name is null or c.Name = '')
--and c.Code like 'ZZ_%'

group by c.Code
having count(*) > 10
order by count(*) desc


UPDATE_DATE
--and Status=1
--and Code like '%old%'
/*
and (Code like '%test%'
or Code like '%tmp%'
or Code like '%temp%'
or Code like '%log%'
or Code like 'ZZ_%'
)
*/
--order by Code

