# Column 原檔與串接規則

以下路徑均相對於 DbAdm 根目錄。此索引依建立 Skill 時的原碼核對，引用原檔而不複製整份範本。

## 核心檔案

| 路徑 | 已核對的用途 |
| --- | --- |
| `Controllers/ColumnController.cs` | `ColumnController : BaseCtrl`，登入與 CRUD action 權限、回應轉換 |
| `Services/ColumnRead.cs` | `ReadDto`、SQL 與查詢條件，`GetPageA(DtDto dt)` |
| `Services/ColumnEdit.cs` | `ColumnEdit(string ctrl) : BaseEditSvc(ctrl)`，override `GetDto()` |
| `Views/Column/Read.cshtml` | 查詢、列表、腳本載入與 Edit partial |
| `Views/Column/Edit.cshtml` | `eform` 與編輯元件、儲存工具列 |
| `_src/tsView/Column.ts` | `_me.init()`、DataTable 欄位與 `new CrudR(config)` |

口述的 Current／ColRead／ColEdit 對應上述 Column 功能；此專案核對到的是 `_src/tsView/Column.ts`。

## 讀取與 action 契約

- Controller 的 `[XgLogin]` 作用於整個類別。`Read`、`GetPage` 使用 `CrudEnum.Read`；`Create`／`Update`／`Delete` 各用同名權限；`GetUpdJson` 使用 Update，`GetViewJson` 使用 View。
- `Read()` 載入 `ViewBag.Projects = await _XpCode.ProjectsA()` 後 `return View()`。下拉實作在 `Services/_XpCode.cs`，`ProjectsA(Db? db = null)` 委派 `_Code.TableToCodesA("dbo.Project", db, "Name")`。這是 Column 的業務來源，其他功能不必照搬。
- `GetPage(DtDto dt)` 回傳 `JsonToCnt(await new ColumnRead().GetPageA(dt))`；Read service 實際呼叫 `new CrudReadSvc().GetPageA(dto, dt)`，沒有額外 ctrl 參數。
- `ReadSql` 由 `dbo.[Column] c` join `dbo.[Table] t`、`dbo.Project p`、left join `dbo.XpUser u`，投影 `c.*`、`CreatorName`、`ProjectCode`、`TableCode`；排序為 `p.Id, t.Id, c.Sort`，`TableAs = "c"`。
- `Items`：ProjectId 對應 `t.ProjectId`；TableCode 對應 `t.Code` 且 Like；Fid、Name 為 Like2；DataType 也列入 Items 供排序。新功能應核對所有可排序欄位與讀取框架的實際規則。

## 寫入、key 與權限

- Controller 以 `new ColumnEdit(Ctrl)` 建立服務。`Create(string json)`、`Update(string key, string json)` 將 `_Str.ToJson(json)!` 交給 `CreateA`／`UpdateA`，使用 `Json(...)` 回傳；`Delete(string key)` 委派 `DeleteA(key)` 並用 `Json(...)`。
- `GetUpdJson`／`GetViewJson` 接收 key，分別委派同名 `...A(key)`，以 `JsonToCnt(...)` 回傳。原 Controller 中 GetPage、GetUpdJson、GetViewJson 有 `[HttpPost]`；前端 `_Ajax.getJsonA` 本身使用 POST，勿從方法名稱推測 GET。
- EditDto 的 `Table = "dbo.[Column]"`、`PkeyFid = "Id"`、`Col4 = null`；Items 僅 Id、Fid、Name、Status、Note。單筆 ReadSql 使用 `where c.Id=@Id`，保留顯示 joins 並投影 `_Fun.FidUser=u.Id`、`_Fun.FidDept=u.DeptId`。其使用者來自 `p.Creator=u.Id`，不是 Column 自身擁有者。
- `Tables/Column.cs` 描述實體；`Tables/MyContext.cs` 的 Column 映射以 **Sn** 為 EF key，但上述 CRUD 以 **Id** 為 key。兩者不可混為一談。映射記錄 Id/TableId 長度 10、Fid 100、DataType 20、DefaultValue 100、Name 30、Note 255；View 的 Note MaxLen 卻是 30。新功能以核實的需求／schema 決定，不複製此差異。
- `Models/ColumnDto.cs` 存在，但核心 Controller／Read／Edit 沒有直接引用；不是 CRUD 必需 DTO。`Services/ColumnSvc.cs` 的 `GetRowsA(tableId)` 是 `GenCrudController` 使用的額外查詢，也不是本 CRUD 的依賴；勿照搬其字串插值 SQL。

## 前端契約與驗證

- `Views/Column/Read.cshtml` 是查詢畫面；`Views/Column/Edit.cshtml` 是新增、修改、檢視共用的編輯畫面，不是三個獨立頁面。`CrudE.ts` 的 `onCreate`、`loadJsonAndEdit`、`setEditStatus` 配合 CrudR 切換顯示與模式；生成時保留此結構。
- Read View 用 `<script @_Fun3.Script("Column")></script>`、`<vc:xg-prog-path />`，外層 `.x-prog`；ID 為 divRead、formRead、formRead2、tableRead、divEdit（初始 d-none），以 `<partial name="Edit" />` 載入編輯。
- Edit View 使用 `eform`、`<vc:xi-hide-id />`、`<vc:xg-save2 />`。ProjectCode、TableCode、Fid、DataType 是 xi-read；Name、Note 為 xi-text；Status 為 xi-check（Value="1"、IsCheck=true）。因此此畫面不是完整新增所有資料表必填欄位的範本。
- TS 僅 `_me` 物件，沒有 `{Prog}Vo`／`_vo`。columns 順序為 ProjectCode、TableCode、Fid、Name、DataType、CreatorName、Status、`_Fun`；index 6 用 `dtStatusName`，index 7 用 `dtCrudFun(full.Id, full.Name, '*')`。按需求重算 indexes，不沿用固定數字或把 `_Fun` 改成 `_Crud`。
- `_src/tsBase/svc/CrudR.ts` 初始化 `Datatable('#tableRead', 'GetPage', ...)`，並建立 CrudE；`_src/tsBase/svc/CrudE.ts` 在未傳 edits 時使用 `new EditOne()`。`EditOne.ts` 預設表單 eform、key 來自 `_Fun.pkeyFid`；非預設 key 需核對並顯式傳入 `EditOne(kid, eformId)`。
- CrudE 透過 `_Valid.init` 初始化驗證；`EditOne.valid()` 呼叫表單 `.valid()` 及可選 fnValid。儲存前執行 validAll、可選 `_me.fnWhenSave`／`fnWhenSave2`；不可將前端 hook 當成伺服器驗證。
- `_src/tsBase/svc/_Edit.ts` 定義 `_rows`；EditOne 及 CrudE 保留差異更新與 key，不能另造扁平 JSON。讀取 CrudE 的 `_getUpdJson`、`loadJson`、`afterSave` 及 `_Ajax.ts` 的回應處理，再實作必要擴充。Create 傳 `{ json: _Json.toStr(json) }`，Update 另加 key；使用 `_Ajax.getJsonA`。
- 回應由現有 Base service 產生；前端 `_src/tsBase/dto/ResultDto.ts` 列出 Value、Code、_ErrorMsg、ErrorRows。欄位錯誤與成功流程須配合 CrudE／_Ajax 原碼，不改成自訂 `{ success, data }` 包裝。

## 外部相依與建置

- `DbAdm.csproj` 實際為 net8.0，參照 `../Base/BaseApi`、`BaseOffice`、`BaseWeb`、`Base` 的 csproj。本次 worktree 的 `../Base` 不存在，所以 BaseCtrl、BaseEditSvc、CrudReadSvc、後端 DTO、權限 attribute 及 ViewComponent 內部行為未能從實作核實；只能確認呼叫端契約。未來需由目標 ProjectReference 或使用者提供的來源定位，勿臆造方法／驗證屬性。
- `Views/_ViewImports.cshtml` 引用 Base、BaseApi、BaseWeb 及 DbAdm 命名空間與 BaseWeb tag helpers。`Program.cs` 使用 Base 初始化、SQL Server DbConnection／DbCommand 註冊，`_Fun.Init(... DbTypeEnum.MSSql, AuthTypeEnum.Row, ...)`。目標專案自行核對。
- `tsconfig.json` 納入 `_src/forEdit.d.ts`、`forEdit2.d.ts`、tsBase 與 tsView；必要時追蹤 `_src/forBoth.ts` 的共用匯出。`gulpfile.js` 的 tsView task 以 esbuild 輸出 `wwwroot/jsView/{name}.js`，format 實際是 iife；不要依 Read View 的 esm 註解宣稱建置為 ESM。
- 依目標相依安裝狀態執行 `dotnet build <目標.csproj>`、本地 TypeScript 的 noEmit 檢查及實際前端 task。DbAdm 可用 gulp 的 `tsView` 或預設 build，預設只建 tsView；`-a` 會重建含共用資源。不要為單頁無故重建全部或使用會下載未知工具的命令。
- `.agents/skills/crud-scaffold/SKILL.md` 等既有 Skill 可供理解歷史結構，但其 Read 方法簽章、Vo、`_Crud` 或輸出目錄描述與本次 Column 原碼不一致；本 Skill 選用上述原檔，不修改其他 Skill。
