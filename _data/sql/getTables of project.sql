declare @pid varchar(10)
set @pid = 'anqEH1QbQR'

/*
select * from dbo.Project
*/

select Code + ' (' + Name + ')' 
from dbo.[Table]
where ProjectId=@pid
and Status=1
order by Code

