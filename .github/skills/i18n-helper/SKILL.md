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