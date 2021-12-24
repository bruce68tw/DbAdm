/*=== {Table} table start ===*/
--trigger Create
if object_id('trc_{Table}', 'TR') is not null
   drop trigger trc_{Table};  
go
   
create trigger trc_{Table}
   on dbo.[{Table}]
   after insert
as begin	

	declare @now datetime
	declare @id varchar(10)
	declare @table varchar(30)
	declare @act varchar(10)
	set @now = getdate()
	set @table = '{Table}'
	set @act = 'Create'
	select @id=Id from inserted

	set nocount on;
	
	insert into dbo.XpTranLog(RowId, TableName, Act, Created) values 
		(@id, @table, @act, @now);
	
end
go

--trigger Update
if object_id('tru_{Table}', 'TR') is not null
   drop trigger tru_{Table};  
go
   
create trigger tru_{Table}
   on dbo.[{Table}]
   after update
as begin	

	declare @now datetime
	declare @id varchar(10)
	declare @table varchar(30)
	declare @act varchar(10)
	set @now = getdate()
	set @table = '{Table}'
	set @act = 'Update'
	select @id=Id from deleted

	set nocount on;	
	{Columns}
	
end
go

--trigger Delete
if object_id('trd_{Table}', 'TR') is not null
   drop trigger trd_{Table};  
go
   
create trigger trd_{Table}
   on dbo.[{Table}]
   after delete
as begin	

	declare @now datetime
	declare @id varchar(10)
	declare @table varchar(30)
	declare @act varchar(10)
	set @now = getdate()
	set @table = '{Table}'
	set @act = 'Delete'
	select @id=Id from deleted

	set nocount on;
	
	insert into dbo.XpTranLog(RowId, TableName, Act, Created) values 
		(@id, @table, @act, @now);
	
end
go
/*=== {Table} table end ===*/
