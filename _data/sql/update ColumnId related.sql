
--update CrudQitem
select a.*
--update a set Fid=c.Fid, Name=case when c.Name='' then c.Fid else c.Name end, DataType=c.DataType
from dbo.CrudQitem a
join dbo.[Column] c on a.ColumnId=c.Id


--update CrudEitem
select a.*
--update a set Fid=c.Fid, Name=case when c.Name='' then c.Fid else c.Name end, DataType=c.DataType
from dbo.CrudEitem a
join dbo.[Column] c on a.ColumnId=c.Id
