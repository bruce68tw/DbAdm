--可重複執行
Declare @dbName SysName = 'GroupProg';
Declare @dboAccount SysName = '14700';
Declare @dboPwd nvarchar(50) = 'home66tw';
Declare @appPwd nvarchar(50) = 'home66tw';

Declare @dboLogin SysName;
Declare @appLogin SysName;
Declare @useDb nvarchar(100);
Declare @sql nvarchar(MAX);

SET @appLogin = @dbName + N'App';
SET @dboLogin = @dbName + @dboAccount;

--temp add
SET @appLogin = 'ehr14700';
SET @dboLogin = 'ehr14700';


-- 建立 USE 指令巨集方便操作
SET @useDb = FormatMessage(N'USE [%s];' + CHAR(13), @dbName);

-- 1. 建立資料庫（如果不存在）
IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = @dbName)
BEGIN
    SET @sql = FormatMessage(N'Create Database [%s];', @dbName);
    EXEC (@sql);
END

-- 2.建立 App帳號 & 授權 CRUD
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @appLogin)
BEGIN
    SET @sql = FormatMessage(N'%s CREATE LOGIN [%s] WITH PASSWORD = ''%s'';', @useDb, @appLogin, @appPwd);
    EXEC (@sql);
END

-- create user
SET @sql = FormatMessage(
    N'%s IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = ''%s'')
      CREATE USER [%s] FOR LOGIN [%s];',
    @useDb, @appLogin, @appLogin, @appLogin
);
EXEC (@sql);

-- 全部 table 授權 CRUD 功能
SET @sql = N'
USE [' + @dbName + N'];
Declare @s nvarchar(MAX);

SELECT @s = STRING_AGG(
    ''GRANT SELECT, INSERT, UPDATE, DELETE ON ['' + SCHEMA_NAME(schema_id) + ''].['' + name + ''] TO [' + @appLogin + '];'',
    CHAR(13)
)
FROM sys.tables
WHERE type = ''U'';

EXEC(@s);
';

EXEC (@sql);


-- 3. 建立帳號: dbo User(dbName + dboAccount)
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @dboLogin)
BEGIN
    SET @sql = FormatMessage(N'CREATE LOGIN [%s] WITH PASSWORD = ''%s'';',@dboLogin, @dboPwd);
    EXEC (@sql);
END

-- 建立 User
SET @sql = FormatMessage(
    N'%sIF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = ''%s'')
      CREATE USER [%s] FOR LOGIN [%s];',
    @useDb, @dboLogin, @dboLogin, @dboLogin
);
EXEC (@sql);

-- 加入 db_owner
SET @sql = FormatMessage(N'%s ALTER ROLE db_owner ADD MEMBER [%s];',@useDb, @dboLogin);
EXEC (@sql);


/*
--**加入dba
CREATE LOGIN DBA WITH PASSWORD = 'YLO3Dr5RQoAl';
GO
CREATE USER DBA FOR LOGIN DBA;
GO
-- 將登入帳號設為伺服器管理員
ALTER SERVER ROLE sysadmin ADD MEMBER DBA;
*/

/*
--檢查目前資料庫擁有者
SELECT name AS DatabaseName, SUSER_SNAME(owner_sid) AS OwnerName
FROM sys.databases
WHERE name = 'Safe';

-- 查看 SafeDbo 對應的 Login
USE Safe;
SELECT name, type_desc, authentication_type_desc
FROM sys.database_principals
WHERE name = 'SafeDbo';

USE Safe;
SELECT dp.name AS UserName, sp.name AS LoginName
FROM sys.database_principals dp
LEFT JOIN sys.server_principals sp
    ON dp.sid = sp.sid
WHERE dp.name = 'SafeDbo';
*/

