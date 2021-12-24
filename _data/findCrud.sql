declare @crudId varchar(10)
set @crudId = '5U01VWCYBA'
--select * from crud

Select [Crud]='',Id,ProjectId,TableId,ReadSql,TableAs,Status 
From dbo.Crud 
Where Id=@crudId

select [CrudQitem]='',
	c.Name, c.Cname, c.DataType,
	a.*
from dbo.CrudQitem a
join dbo.[Column] c on a.ColumnId=c.Id
where a.CrudId in (@crudId)
order by a.Sort

select [CrudRitem]='',
	a.*
from dbo.CrudRitem a
where a.CrudId in (@crudId)
order by a.Sort

Select [CrudEtable]='',t.Name, a.*
From dbo.CrudEtable a
join dbo.Crud c on a.CrudId=c.Id
join dbo.[Table] t on a.TableId=t.Id 
Where c.Id in (@crudId)
order by a.Sort

select [CrudEitem]='',a.*
from dbo.CrudEitem a
join dbo.CrudEtable e on a.EtableId=e.Id
join dbo.Crud c on e.CrudId=c.Id
Where c.Id in (@crudId)
order by e.Sort, a.Sort



