其他語系：[繁中](Readme-TW.md)、[簡中](Readme-CN.md)、[英文](Readme.md)

### 1.專案介紹
DbAdm 是一套資料庫文件系統，使用的開發工具為 ASP.NET Core 6、jQuery 3、Bootstrap 5、Visual Studio 2022 Community，它的功能如下：
- 從現有 MSSQL 的資料庫匯入欄位資訊。
- 產生資料庫文件檔案 Word 檔。
- 產生 CRUD 原始碼：CRUD 即新增、查詢、修改、刪除，它代表對資料庫的存取動作。
- 產生資料庫異動記錄 Trigger，它可以用來追蹤資料庫的異動記錄。

### 2.操作畫面
進入主畫面後，左側功能表有4個功能項目：
- [專案維護](_docu/zh-TW/project.md)
- [資料表維護]()
- [欄位維護]()
- [CRUD維護]()

### 3.下載 & 安裝
執行 DbAdm 需要從 GitHub 下載以下兩個 Repo 檔案，解壓縮到本機目錄，並且確保 DbAdm 可以正確參照 BaseWeb 專案：
  - Base：包含 Base、BaseApi、BaseWeb、BaseEther 四個專案，內容為基本的公用程式。DbAdm 必須參照 BaseWeb 專案，下載的網址為 https://github.com/bruce68tw/Base
  - DbAdm：內容為 DbAdm 主程式。

### 4.目錄說明
以下是 DbAdm 專案下的目錄，其中底線開頭的目錄表示特殊用途：
  - _data：包含許多工作檔案，其中createDb.sql 用來建立本系統的資料表以及產生資料內容；Tables.docx是利用本系統所產生的資料庫檔案。
  - _log：系統運行所產生 Log 檔案。
  - _template：各種功能所需的範本檔案。
  - Controllers：Controller類別檔案。
  - Enums：列舉類別，如果檔案名稱結尾是Enum表示是數字型，如果是Estr，則表示為字串型，例如：InputTypeEstr.cs
  - Models：系統所需要Model類別，檔案名稱後面為Dto表示Data Transfer Object，Vo表示 View Object
  - Resources：多國語資料檔案，這裡用於View頁面。
  - Services：服務類別。
  - Views：網頁檔案。
  - wwwroot：Web 前端 CSS、JavaScript 檔案。
  - Tables：使用 Database First 所產生的 Entity Model。

### 5.組態設定
DbAdm/appsettings.json 裡面的 FunConfig 區段記錄系統執行時所需要的組態內容，
它包含以下的欄位：
  - Db：標準的資料庫連線字串，用於 ADO.NET 和 Entity Framework，並且加入 MultipleActiveResultSets=True 讓每一次連線可以多次存取資料庫。
  - Locale：指定的多國語語系，目前允許的輸入值分別為：zh-TW（繁體中文）、zh-CN（簡體中文）、en-US（英文），設定這個欄位，執行時系統即會呈現不同的語系。
  - LogSql：是否記錄SQL的內容到 Log 檔案，預設false，所有Log檔案會存放在 _log 目錄底下，這一類的檔案名稱後綴為 sql。

### 6.建立資料庫
DbAdm 的資料庫名稱為 Db，種類為 LocalDB、SQL Express、MS SQL 皆可，進入SQL Server Management Studio（SSMS），建立一個空白的資料庫 Db，然後執行DbAdm/_data/createDb.sql，這個檔案會建立以下的資料表和內容，同時在 DbAdm/_data/Tables.docx 檔案記錄它們的欄位定義：
  - Column：欄位資料。
  - Crud：CRUD設定。
  - CrudEitem：CRUD維護資料表的欄位。
  - CrudEtable：CRUD維護資料表。
  - CrudQitem：CRUD查詢條件欄位。
  - CrudRitem：CRUD查詢結果欄位。
  - Project：專案資料。
  - Table：資料表。
  - XpCode：雜項檔，這個資料表用來儲存 Key-Value 的對應資料，名稱加上Xp表示系統用途。

### 7.參與專案
您可以透過以下方式來參與本專案：
 - 反映系統問題：[GitHub Issues](https://github.com/bruce68tw/DbAdm/issues)
 - 修改程式並且提交請求：[Pull Request](https://github.com/bruce68tw/DbAdm/pulls)
 - 到[臉書](https://www.facebook.com/groups/softblocks)參與討論。
 - 贈送 GitHub Star。
 - 購買[書籍](https://www.tenlong.com.tw/products/9789865029883)。

### 8.作者
 - Bruce Chen - *Initial work*

### 9.版權說明
本專案使用 [MIT 授權許可](https://zh.wikipedia.org/zh-tw/MIT許可證)。