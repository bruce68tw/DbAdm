--update Column.Name from 另一個專案
SELECT TableCode=t.Code, ColFid=c.Fid, ColName=c.Name, a.ColName
--update c set Name=a.ColName
FROM dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id and t.ProjectId='I8e2oaXvO8'
join (
	SELECT TableCode=t.Code, ColFid=c.Fid, ColName=c.Name
	FROM dbo.[Column] c
	join dbo.[Table] t on c.TableId=t.Id and t.ProjectId='Y3HCle04UV'
) a on t.Code=a.TableCode and c.Fid=a.ColFid
where c.Name = '' and a.ColName != ''

--update 常用欄位
--SELECT TableCode=t.Code, ColFid=c.Fid, ColName=c.Name
update c 
--set Name='Id'
--set Name='名稱'
set Name='排序'
--set Name='資料狀態'
--set Name='序號'
--set Name='建檔人員'
--set Name='建檔日期'
--set Name='修改人員'
--set Name='修改日期'
--set Name='個案Id'
FROM dbo.[Column] c
join dbo.[Table] t on c.TableId=t.Id
where t.ProjectId='I8e2oaXvO8'
and c.Name = ''
--and c.Fid='Id'
--and c.Fid='Name'
and c.Fid='Sort'
--and c.Fid='Status'
--and c.Fid='Sn'
--and c.Fid='Creator'
--and c.Fid='Created'
--and c.Fid='Reviser'
--and c.Fid='Revised'
--and c.Fid='KidId'

-- 讀取某個 Table 的 Column.Name for 手動更新
SELECT c.Fid, c.Name
FROM dbo.[Column] c
where c.TableId=
(
	select Id 
	from dbo.[Table]
	where ProjectId='I8e2oaXvO8'
	and Code='Apply'
)
order by c.Fid
