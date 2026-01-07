
truncate table dbo.OrgEmp
truncate table dbo.OrgDept

INSERT INTO dbo.OrgEmp
SELECT * FROM [GroupProg].dbo.OrgEmp

--from XpDept !!
INSERT INTO dbo.OrgDept
SELECT * FROM [GroupProg].dbo.XpDept