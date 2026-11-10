---
name: dbadm-overview
description: 在需要了解 DbAdm 的用途、功能範圍、專案相依或開發入口時，提供原始碼與任務專用技能的索引。
---

# DbAdm 開發總覽

依任務選讀此總覽與下列技能。

DbAdm 是 ASP.NET Core MVC 資料庫文件與程式碼產生工具。以專案管理資料表、欄位及 CRUD 設定，可從 SQL Server 匯入結構、產生 Word 資料庫文件、CRUD 原始碼及異動記錄 Trigger。操作流程與安裝背景見[繁體中文說明](../../../Readme-TW.md)。

## 開發入口

- 從 [DbAdm.sln](../../../DbAdm.sln) 或 [DbAdm.csproj](../../../DbAdm.csproj) 進入。目前目標為 .NET 8，以專案檔的設定為準。本機需將 Base 放在 DbAdm 的同層目錄，專案檔直接參照其中的 Base、BaseApi、BaseOffice、BaseWeb。
- [Program.cs](../../../Program.cs) 綁定 `FunConfig` 與 `MyConfig`，並初始化 Base 框架、SQL Server 連線服務及應用程式語系。系統本身的資料庫結構與初始資料從 [_data/createDb.sql](../../../_data/createDb.sql) 查起，EF Core Database First 實體位於 [Tables](../../../Tables)。
- 追查維護頁面時，先找 [Controllers](../../../Controllers) 中的同名控制器，再查 [Services](../../../Services) 的讀寫服務、[Views](../../../Views) 的 Razor 頁面及 [_src/tsView](../../../_src/tsView) 的 TypeScript。資料表匯入、文件、CRUD 與異動記錄 SQL 分別從 `ImportDbSvc`、`GenDocuSvc`、`GenCrudSvc` 與 `GenLogSqlSvc` 查起，產生器範本位於 [_template](../../../_template)。
- 前端共用來源位於 [_src/tsBase](../../../_src/tsBase)，搭配 jQuery 與 Bootstrap 5。[gulpfile.js](../../../gulpfile.js) 使用 esbuild 將共用程式及頁面程式輸出至 [wwwroot](../../../wwwroot)。

## 依任務選讀技能

- Base／BaseWeb 整合、命名、權限及共用服務。[base-web-pattern](../base-web-pattern/SKILL.md)
- DbAdm 既有 CRUD 架構與頁面骨架。[crud-scaffold](../crud-scaffold/SKILL.md)
- 以 Column 為範例，在指定目標專案及目錄產生單表 CRUD。[generate-single-table-crud](../generate-single-table-crud/SKILL.md)
- SQL Server 結構、EF Core 實體及建庫腳本同步。[db-schema-sync](../db-schema-sync/SKILL.md)
- 前端共用服務、模組載入及建置流程。[dbadm-frontend](../dbadm-frontend/SKILL.md)
- TypeScript／jQuery CRUD、DataTables、AJAX 與 Modal。[ts-jquery-helper](../ts-jquery-helper/SKILL.md)
- Razor、資源及列舉的多語系維護。[i18n-helper](../i18n-helper/SKILL.md)
