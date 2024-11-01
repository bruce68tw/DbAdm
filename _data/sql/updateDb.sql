
/* ==================
 2022/8/28 add CrudEtable.AutoIdLen
 ==================*/
if COL_LENGTH('dbo.CrudEtable','AutoIdLen') is null
begin
	alter table dbo.CrudEtable add AutoIdLen varchar(20) NULL;	
	execute sp_addextendedproperty 'MS_Description', N'自動Id欄位長度'
end
go