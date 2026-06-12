
/*
select * from orgEmp where id='16336'
select * from orgEmp where EmpNo in ('16131','16132')
*/

truncate table dbo.OrgEmp
truncate table dbo.OrgDept

INSERT INTO dbo.OrgEmp
SELECT * FROM [GroupProg].dbo.OrgEmp

--from XpDept !!
INSERT INTO dbo.OrgDept
SELECT * FROM [GroupProg].dbo.XpDept