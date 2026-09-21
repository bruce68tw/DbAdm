---
name: db-schema-sync
description: 同步 MSSQL 資料庫結構至 DbAdm 專案，包含 Entity Model（Tables/*.cs）、createDb.sql 腳本與 EF Core Database First 更新。
---

# DB Schema Sync Skill

## 用途
協助開發者將 MSSQL 資料庫結構同步到 DbAdm 專案的程式碼中。

## 觸發時機
當使用者要求「同步資料庫」、「更新 Entity Model」、「產生 SQL 腳本」、「新增資料表」時觸發。

## 專案資料庫架構

### Entity Model（Tables/*.cs）
- 使用 EF Core Database First 產生
- 命名空間：DbAdm.Tables
- 類別為 partial class
- 非 nullable 字串加上 = null!;
- 可空欄位使用 ? 標記

### DbContext
- 透過 _Xp.GetDb() 取得 MyContext 實例
- 連線字串位於 appsettings.json 的 FunConfig:Db

### 核心資料表
- Project：專案資料
- Table：資料表定義
- Column：欄位定義
- Crud、CrudQitem、CrudRitem、CrudEtable、CrudEitem：CRUD 設定
- XpCode：Key-Value 雜項檔（Type/Value/Name/Sort/Ext/Note）

## 操作規範

### 新增資料表時
1. 在 Tables/ 建立 Entity 類別
2. 在 _data/createDb.sql 加上 CREATE TABLE 語句
3. 更新 MyContext.cs 的 DbSet
4. 提醒更新 Tables.docx 文件

### SQL 腳本規範
- 所有資料表加上 dbo. 前綴
- 主鍵命名：PK_{TableName}
- 外鍵命名：FK_{TableName}_{RefTableName}
- 必要欄位：Created、Revised（datetime）

### 欄位型別對應
| SQL | C# |
|-----|-----|
| nvarchar(n) | string |
| int | int |
| bigint | long |
| bit | byte（專案慣例）|
| datetime | DateTime |
| decimal | decimal |

## 注意事項
- 資料庫名稱固定為 Db
- 支援 LocalDB、SQL Express、MS SQL
- 修改後需確認 Base 專案的 BaseWeb 仍能正確參照