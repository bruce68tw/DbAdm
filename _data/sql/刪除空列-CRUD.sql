
select TableName='Table', a.* 
--delete a
from [Table] a
left join [Project] b on a.ProjectId=b.Id
where b.Id is null

select TableName='Column',a.*
--delete a
from [Column] a
left join [Table] b on a.TableId=b.Id
where b.Id is null

select TableName='Crud',a.*
--delete a
from [Crud] a
left join [Project] b on a.ProjectId=b.Id
where b.Id is null

select TableName='CrudEtable',a.*
--delete a
from [CrudEtable] a
left join [Crud] b on a.CrudId=b.Id
where b.Id is null

select TableName='CrudQitem',a.*
--delete a
from [CrudQitem] a
left join [Crud] b on a.CrudId=b.Id
where b.Id is null

select TableName='CrudRitem',a.*
--delete a
from [CrudRitem] a
left join [Crud] b on a.CrudId=b.Id
where b.Id is null

select TableName='CrudEitem',a.*
--delete a
from [CrudEitem] a
left join [CrudEtable] b on a.EtableId=b.Id
where b.Id is null

/*
truncate table tmpTable
truncate table tmpColumn
*/