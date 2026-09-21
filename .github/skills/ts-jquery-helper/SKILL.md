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