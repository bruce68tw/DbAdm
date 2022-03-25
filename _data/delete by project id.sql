declare @projectId varchar(12)
set @projectId=''
--'1616J7CT0A'

select c.*
--delete c
from [Column] c
join [Table] t on c.TableId=t.Id
where t.ProjectId=@projectId

select * from [Table]
--delete [Table]
where ProjectId=@projectId

select * from Project
--delete Project
where Id=@projectId

--truncate table tmpTable
--truncate table tmpColumn