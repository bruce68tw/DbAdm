
--todo: ­«·sÀË¬d
select * from XpUser
select * from XpRole
select * from XpProg

select XpUserRole='', a.*, u.Id, r.Id 
--delete a
from XpUserRole a
left join XpUser u on a.UserId=u.Id
left join XpRole r on a.RoleId=r.Id
where u.Id is null or r.Id is null

select XpDeptRole='', a.*, d.Id, r.Id 
--delete a
from XpDeptRole a
left join XpDept d on a.DeptId=d.Id
left join XpRole r on a.RoleId=r.Id
where d.Id is null or r.Id is null

select XpRoleProg='', a.*, dr.Id, p.Id 
--delete a
from XpRoleProg a
left join XpDeptRole dr on a.SourceId=dr.Id
left join XpProg p on a.ProgId=p.Id
where dr.Id is null or p.Id is null
