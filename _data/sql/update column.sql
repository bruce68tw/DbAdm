
--truncate table tmpColumnImport

--update tmpColumnImport set DbName='EDEN-MIS' where DbName='EDEN-MISTEST'

--update tmpColumnImport.Note
select * from dbo.tmpColumnImport
--update dbo.tmpColumnImport set Note=''
where ColumnName = Note
and Note != ''

--update Column.Name by tmpColumnImport.ColumnName
select p.DbName, t.Code, c.*, c2.ColumnName
--update c set c.Name=c2.ColumnName
from dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
join dbo.Project p on t.ProjectId=p.Id
join dbo.tmpColumnImport c2 on t.Code=c2.TableCode and c.Code=c2.ColumnCode
where p.DbName in ('DonateEden')
and c.Name=''

--cleare Column.Note
select p.DbName, t.Code, c.*, c2.ColumnName
--update c set c.Note=''
from dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
join dbo.Project p on t.ProjectId=p.Id
join dbo.tmpColumnImport c2 on t.Code=c2.TableCode and c.Code=c2.ColumnCode
where p.DbName in ('DonateEden')
and c.Name=c.Note

--update  Column.Name by Column.Note
select t.Code as TableId, t.Name as TableName, c.Code as ColumnName, c.Name, c.Note, c.DefaultValue 
--update c set c.Name=c.Note
from dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
join dbo.Project p on t.ProjectId=p.Id
where 1=1
and p.DbName in ('DonateEden')
and c.Name = ''
and t.Status=1
and c.Status=1
and c.Note != '' 
--and len(c.Note) <= 20

/*
select p.DbName, t.Code, c.*
from dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
join dbo.Project p on t.ProjectId=p.Id
where p.DbName in ('EDEN-MIS')
--join dbo.tmpColumnImport c2 on p.DbName=c2.DbName and t.Code=c2.ColumnCode
*/
