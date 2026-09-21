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