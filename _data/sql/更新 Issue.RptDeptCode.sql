
select i.RptUser, i.RptDeptCode, e.EmpNo, e.DeptNo
--update i set RptDeptCode=e.DeptNo
from DbSoft.dbo.Issue i
join GroupProg.dbo.OrgEmp e on i.RptUser=e.EmpNo
where 1=1 
and (i.RptUser is not null and i.RptUser != '')
and i.WorkDate > '2025/1/1'
and (i.RptDeptCode is null or i.RptDeptCode = '')