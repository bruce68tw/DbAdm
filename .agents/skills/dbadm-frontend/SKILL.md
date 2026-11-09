---
name: dbadm-frontend
description: 開發或維護 DBADM 前端時，使用 _src/tsBase 的 svc 共用服務、dto 模型與 enum 列舉，遵循現有 CRUD、表單及全域載入方式。
---

# DBADM 前端共用基礎

以 `_src/tsBase` 為準：`svc` 是主要實作，`dto` 是模型，`enum` 是列舉。頁面程式位於 `_src/tsView`。先查既有服務與相近頁面，沿用已存在的功能；不要依名稱猜測參數或自行建立同功能包裝。

## 查找與使用

先讀 [來源索引](references/source-map.md)，找到對應服務後閱讀原始實作、公開方法與呼叫處。索引是導航，實際簽章、預設值、回傳值及初始化條件以原始碼為準。註解若出現亂碼，以實作與正常運作的呼叫處交叉確認，不順手改寫檔案編碼。

- 查詢／編輯：先讀 `CrudR.ts`、`CrudE.ts`、`Datatable.ts`，再按單筆／多筆需求讀 `EditOne.ts`、`EditMany.ts`。參考 `_src/tsView/Project.ts` 的 `_me.init()`、表格欄位與 `new CrudR(config)`。
- CRUD 頁面依賴固定 DOM：查詢的 `#divRead`、`#formRead`、`#formRead2`、`#tableRead`；編輯的 `#divEdit`。核對相應 `Views` 範本，不任意改名。`CrudR` 使用 `GetPage`，並建立 `CrudE`；避免重複初始化。
- `_me` 儲存頁面狀態與 CRUD 實例，`_vo` 承載頁面行為。新增 hook 前查 `CrudR`／`CrudE` 的實際呼叫時機、參數及是否 await，尤其儲存驗證與切換編輯畫面。
- AJAX：沿用 `_Ajax`，其共用流程加入 JWT header、處理 UI blocking 與錯誤訊息。`getJsonA`、`getJsonsA` 實際使用 POST，不因名稱含 get 改成 GET；上傳可查 `getJsonByFdA`。無 callback 時回傳結果，錯誤可能為 null；有 callback 時內部回傳成功狀態。型別宣告不完全描述此差異，應讀 `_rpcA`。`ErrorRows` 會嘗試交給編輯區 validator，不能只以非 null 判斷業務成功。
- 欄位：先查對應 `_i*`、`_Input`、`_Form`、`_Valid` 的讀寫與初始化，保留既有控制項 DOM 契約。
- 提示與確認：查 `_Tool.msg`、`_Tool.ansA` 與 `_Modal`；確認函式需 await 後再執行動作。
- 模型與列舉：讀取既有 dto／enum，保留後端對應欄位大小寫及常數值。enum 目錄中的實作可能是 static readonly 類別，不預設為 TypeScript enum。

## 全域與建置契約

目前使用瀏覽器全域類別、jQuery 及 IIFE。檢查類別尾端的 `window` 掛載、`_src/forBoth.ts` 的 side-effect imports、`_src/forBoth2.ts` 與 `_src/forEdit.d.ts`／`forEdit2.d.ts` 的宣告與銜接；新增服務時按現有方式補齊必要登錄，不直接改造成模組匯入架構。

`tsconfig.json` 的 `@base/*` 指向 `_src/tsBase/*`，target 為 ES2019。`gulpfile.js` 用 esbuild 將共用程式打包到 `wwwroot/base.min.js`，頁面獨立輸出到 `wwwroot/jsView`。修改來源，不手改產物。

變更程式後按範圍驗證：`npx tsc --noEmit` 檢查型別；`npx gulp tsBase` 建置共用程式；`npx gulp tsView` 建置頁面。一般預設 gulp build 只建置 tsView；不要以它宣稱共用程式已建置。完整 `-a` 流程含清除與其他資產產生，僅在需要時使用。區分既有錯誤與本次引入的問題，報告實際執行的檢查。僅修改 skill 文件時使用 skill validator，不需重建前端產物。
