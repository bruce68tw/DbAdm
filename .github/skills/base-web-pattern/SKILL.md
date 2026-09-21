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