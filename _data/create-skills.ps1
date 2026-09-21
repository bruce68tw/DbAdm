$root = "C:\_project\DbAdm\.github\skills"

# 建立目錄
$dirs = @("crud-scaffold", "db-schema-sync", "base-web-pattern", "i18n-helper", "ts-jquery-helper")
foreach ($d in $dirs) {
    New-Item -ItemType Directory -Path "$root\$d" -Force | Out-Null
}

# 1. crud-scaffold
$crud = @'
---
name: crud-scaffold
description: 根據 DbAdm 的 CRUD 模式自動生成完整 CRUD 頁面，包含 Controller、Service（Read/Edit）、Razor View 與 TypeScript，遵循 Base 框架與專案命名規範。
---

# CRUD Scaffold Skill

## 用途
協助開發者根據 DbAdm 專案的 CRUD 標準模式，快速生成完整的 CRUD 功能頁面。

## 觸發時機
當使用者要求「新增 CRUD 頁面」、「產生 CRUD」、「建立維護畫面」或類似需求時觸發。

## 專案架構規範

### Controller（Controllers/{Prog}Controller.cs）
- 繼承 BaseCtrl
- 使用 [XgProgAuth(CrudEnum.Xxx)] 控制權限
- 標準 Action：
  - Read() → 回傳 View
  - GetPage(DtDto dt) → 查詢分頁
  - GetUpdJson(string key) / GetViewJson(string key) → 取得編輯/檢視資料
  - Create(string json) / Update(string key, string json) / Delete(string key)
  - 如有檔案上傳：加上 List<IFormFile> t00_FileName 參數
- 回傳格式：JsonToCnt(...) 或 Json(...)

### Service
- Read 類（Services/{Prog}Read.cs）：
  - 定義 ReadDto，包含 ReadSql、TableAs、Items
  - 方法 GetPageA(string ctrl, DtDto dt) 呼叫 new CrudReadSvc().GetPageA(dto, dt, ctrl)
- Edit 類（Services/{Prog}Edit.cs）：
  - 繼承或封裝 CrudEditSvc
  - 建構子傳入 Ctrl

### View（Views/{Prog}/Read.cshtml、Edit.cshtml）
- 第一行：<script @_Fun3.Script("{Prog}")></script>
- 加上 <vc:xg-prog-path />
- 外層：<div class="x-prog">，內含 #divRead 與 #divEdit.d-none
- 查詢表單使用固定 ID：formRead、formRead2、tableRead
- 使用 @await Component.InvokeAsync(XiEstr.Select, new XiSelectDto {...}) 等元件
- 按鈕事件使用 data-onclick="_vo.onXxx"
- Edit 頁面用 <partial name="Edit" /> 引入

### TypeScript（_src/tsView/{Prog}.ts）
- 入口：$(function () { _me.init(); });
- 定義 {Prog}Vo 類別，實例化為 _vo
- 定義 _me 物件，包含 init() 與必要 callback（fnAfterFind, fnAfterSwap）
- DataTable columns 對應 th 順序，最後一欄通常是 { data: '_Crud' }
- 使用 _Ajax.getJsonsA、_Modal.show/hide、_iText.get、_iSelect.get 等 Base 工具

## 生成步驟
1. 詢問使用者：ProgCode（程式代碼）、主資料表名稱、是否需要檔案上傳、權限類型
2. 產生 6 個檔案：Controller、Read Service、Edit Service、Read View、Edit View、TypeScript
3. 提醒使用者：註冊選單（XpProg 資料表）、加入多語系資源

## 參考範本
- C:\_project\DbAdm\_template\Controller.txt
- C:\_project\DbAdm\_template\ReadService.txt
- C:\_project\DbAdm\Controllers\IssueController.cs
- C:\_project\DbAdm\Views\Issue\Read.cshtml
- C:\_project\DbAdm\_src\tsView\XpRole.ts
'@
Set-Content -Path "$root\crud-scaffold\SKILL.md" -Value $crud -Encoding UTF8

# 2. db-schema-sync
$db = @'
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
'@
Set-Content -Path "$root\db-schema-sync\SKILL.md" -Value $db -Encoding UTF8

# 3. base-web-pattern
$base = @'
---
name: base-web-pattern
description: 確保程式碼遵循 DbAdm 專案與 Base/BaseWeb 框架的整合規範，包含 _Fun、_Locale、_XpCode、權限控制與命名慣例。
---

# Base Web Pattern Skill

## 用途
確保所有產生的程式碼都遵循 DbAdm 專案與 Base 框架的整合規範。

## 觸發時機
任何涉及後端 C# 或前端 TypeScript 的程式碼生成/修改時都應套用。

## 核心規範

### 底線開頭的靜態類別（Base 框架工具）
- _Fun：系統工具（_Fun.IsDev, _Fun.Dir(), _Fun.Config.SystemName, _Fun3.Nonce, _Fun3.Script()）
- _Locale：多語系（_Locale.GetLocale(), _Locale.GetBaseRes()）
- _Str：字串工具（_Str.ToJson(), _Str.Encode()）
- _Date：日期工具（_Date.NowSecStr()）
- _Http / _HttpFile：HTTP 與檔案工具
- _Xp：專案層級工具（_Xp.GetDb(), _Xp.GetTplPath(), _Xp.LibVer, _Xp.MyVer）
- _XpCode：XpCode 資料表存取（_XpCode.ProjectsA(db), _XpCode.YesNos()）
- _Auth：權限（_Auth.GetMenu1A()）

### 前端底線開頭工具（TypeScript）
- _me：目前頁面的控制物件
- _vo：View Object 實例
- _Ajax：AJAX 呼叫（_Ajax.getJsonsA()）
- _Modal：Bootstrap Modal 操作（_Modal.show(), _Modal.hide()）
- _Tool：訊息提示（_Tool.msg()）
- _Form：表單操作（_Form.loadRow()）
- _iText, _iSelect, _iCheck, _iDate：輸入元件存取

### 命名慣例
- Controller：{Prog}Controller : BaseCtrl
- Read Service：{Prog}Read
- Edit Service：{Prog}Edit
- View 資料夾：Views/{Prog}/
- TypeScript：_src/tsView/{Prog}.ts
- DTO 結尾為 Dto，View Object 結尾為 Vo
- Enum 數字型結尾為 Enum，字串型結尾為 Estr

### 權限控制
- 使用 [XgLogin] 標記需要登入的 Controller
- 使用 [XgProgAuth(CrudEnum.Read/Create/Update/Delete/View/Print/Export)] 控制功能權限
- 功能權限儲存於 XpProg 資料表的 FunXxx 欄位

### CSRF 與安全
- Layout 中使用 _Fun3.Nonce 設定 CSP nonce
- Script 標籤使用 @_Fun3.Script("{Prog}") 產生
- 防止 XSS：所有使用者輸入需經過編碼

### 目錄慣例
- 底線開頭目錄為特殊用途：_data、_log、_template、_upload、_src、_md
- _src/tsBase/svc/：共用 TypeScript 服務
- _src/tsView/：各頁面 TypeScript

## 禁止事項
- 不要在 View 中硬編碼連線字串或設定值
- 不要繞過 _Fun 直接存取 IConfiguration
- 不要在前端直接寫 $.ajax，一律使用 _Ajax
- 不要在 TypeScript 中新增 var（既有檔案中的 var 保留）
'@
Set-Content -Path "$root\base-web-pattern\SKILL.md" -Value $base -Encoding UTF8

# 4. i18n-helper
$i18n = @'
---
name: i18n-helper
description: 處理 DbAdm 專案的多語系（zh-TW / zh-CN / en-US），包含 Resources 檔案管理、View 本地化與 Enum 多語對應。
---

# i18n Helper Skill

## 用途
協助開發者正確處理 DbAdm 專案的多語系支援。

## 觸發時機
當使用者要求「加入多語系」、「翻譯」、「新增語系資源」或涉及 UI 文字顯示時觸發。

## 支援語系
- zh-TW（繁體中文，預設）
- zh-CN（簡體中文）
- en-US（英文）
- 設定位置：appsettings.json 的 FunConfig:Locale

## 多語系架構

### 後端 Resources
- 位置：Resources/ 目錄
- 透過 _Locale.GetBaseRes() 取得基礎資源
- 透過 _Locale.GetLocale() 取得目前語系代碼

### View 本地化
- 不要在 View 中硬編碼文字
- 使用資源檔或 ViewBag 傳入本地化字串
- 共用按鈕文字由 XgFindTbar、XgCreate 等 ViewComponent 處理

### Enum 多語對應
- 字串型 Enum（Estr 結尾）：值即為代碼，顯示名稱存於 XpCode 資料表
- 透過 _XpCode 取得下拉選單資料，例如：
  - _XpCode.ProjectsA(db) → 專案清單
  - _XpCode.YesNos() → 是/否
  - _XpCode.IssueTypesA(db) → 資料種類

### 前端多語
- TypeScript 中的提示訊息（如 _Tool.msg(...)）需考慮多語化
- 日期格式依 _Locale.GetLocale() 調整

### 文件目錄
- _md/zh-TW/：繁體中文文件
- _md/zh-CN/：簡體中文文件
- _md/en-US/：英文文件
- 各語系 Readme：Readme-TW.md、Readme-CN.md、Readme.md

## 操作規範
1. 新增 UI 文字時，同時更新三個語系的資源
2. XpCode 的 Type 欄位用於分類多語資料
3. 使用 _Xp.GetTplPath(fileName, true) 取得語系相關的範本路徑
4. 語系切換後，系統自動載入對應的 Resources
'@
Set-Content -Path "$root\i18n-helper\SKILL.md" -Value $i18n -Encoding UTF8

# 5. ts-jquery-helper
$ts = @'
---
name: ts-jquery-helper
description: TypeScript + jQuery + Bootstrap 5 前端開發輔助，包含 CrudR/CrudE 繼承模式、DataTable 設定、AJAX 呼叫與 Modal 操作。
---

# TS jQuery Helper Skill

## 用途
協助開發者撰寫符合 DbAdm 專案規範的 TypeScript 前端程式碼。

## 觸發時機
當使用者要求修改/新增 .ts 檔案、處理前端邏輯、DataTable、AJAX 或 Modal 時觸發。

## 核心架構

### 頁面 TypeScript 標準結構
\`\`\`typescript
$(function () {
    _me.init();
});

class {Prog}Vo {
    // View Object 屬性與方法
}
_vo = new {Prog}Vo();

_me = {
    init() {
        // 初始化邏輯
    },
    // callback 函數
};
\`\`\`

### CrudR 查詢畫面
- 固定 HTML ID：#divRead、#formRead、#formRead2、#tableRead
- 後端固定呼叫 GetPage action
- 自動呼叫 _me 的 fnAfterFind(result) 與 fnAfterSwap(toRead)
- 使用 crudR.dt 存取 DataTable 實例

### DataTable 設定模式
\`\`\`typescript
var config = {
    columns: [
        { data: 'Name' },
        { data: '_Crud' },  // 最後一欄固定為操作按鈕
    ],
    columnDefs: [
        // 自訂欄位渲染
    ],
};
\`\`\`

### AJAX 呼叫
- 使用 _Ajax.getJsonA() 或 _Ajax.getJsonsA()
- **不要**直接使用 $.ajax
- Controller action 名稱對應前端呼叫

### Modal 操作
- 使用 _Modal.show(modal) / _Modal.hide(modal)
- Modal HTML 放在 View 中，TypeScript 用 $('#modalXxx') 取得

### 輸入元件存取
- _iText.get('Fid', form) → 取得文字輸入值
- _iSelect.get('Fid', form) → 取得下拉選單值
- _iCheck.ftChecked → 已勾選的 checkbox filter
- _iDate → 日期元件

### 檔案上傳
- 使用 EditMany 類別處理一對多編輯
- 檔案欄位命名：t00_FileName（對應 Controller 的 List<IFormFile> 參數）
- 檔案存取路徑透過 _Xp.DirUpload("Xxx") 設定

### Mustache 範本
- 用於動態產生表格列：Mustache.render(tpl, row)
- 範本定義在 View 的 <script type="text/template"> 中
- 使用 _Form.loadRow(tr, row) 將資料綁定到新增的 tr

## 注意事項
- TypeScript 檔案放在 _src/tsView/，編譯後輸出到 wwwroot/js/
- 全域變數 _me、_vo 不需要 var/let/const 宣告（TS 設定允許）
- 舊版 JavaScript 位於 _src/_oldJsBase/，僅供參考，不要修改
'@
Set-Content -Path "$root\ts-jquery-helper\SKILL.md" -Value $ts -Encoding UTF8

Write-Host "✅ 已成功建立 5 個 SKILL.md 檔案於 $root" -ForegroundColor Green