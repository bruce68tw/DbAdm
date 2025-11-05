declare @pid varchar(10)
set @pid = 'vdLeBA5DxR'		--104¤H¸ê

/*
select * from dbo.Project
*/

--select Code + ' (' + Name + ')' 
select Code
from dbo.[Table]
--update dbo.[Table] set status=0
where ProjectId='vdLeBA5DxR'
and Status=1
--and Code like 'PORTAL%'
order by Code

/*
and (Code like 'HRMSP_%'
or Code like 'HRMSR_%'
or Code like 'HRMST_%'
or Code like 'HRMSW_%'
or Code like 'HRS_%'
or Code like 'J_DW_%'
or Code like 'PORTAL%'
)

and (Code like '%test%'
or Code like '%tmp%'
or Code like '%temp%'
or Code like '%log%'
or Code like '%ZZ_%'
)
*/
--order by Code

