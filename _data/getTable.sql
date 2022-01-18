declare @id varchar(10)
set @id = 'D8EDUSAUDA'

select * from [Table]
where Id=@id

select * from [Column]
where TableId=@id
