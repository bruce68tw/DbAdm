
select t.* 
--delete t
from [Table] t
left join [Project] p on t.ProjectId=p.Id
where p.Id is null

select c.*
--delete c
from [Column] c
left join [Table] t on c.TableId=t.Id
where t.Id is null

/*
truncate table tmpTable
truncate table tmpColumn
*/