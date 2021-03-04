# DbAdmin

資料庫文件系統 & CRUD產生器

## 介紹

大多數軟體系統的功能是存取資料庫, 一份完整的資料庫文件可以讓系統開發的工作更加順利。在這裡我們開發了一套簡易的資料庫文件系統(以下稱本系統), 它有以下功能: <br>
1.維護資料庫文件<br>
2.從資料庫匯入欄位資料<br>
3.產生資料庫文件word檔案<br>
4.產生CRUD原始程式<br>
所使用的開發工具為 ASP.NET MVC 5, Bootstrap 4, jQuery, Visual Studio 2017 Community

### 安裝

本系統是一個 Web 系統, 裡面包含3個 project:<br>
1.[Base](https://github.com/bruce66tw/Base) project: 內容為與Web無關的公用的程式<br>
2.BaseWeb project: , 內容為與Web有關的公用的程式(下載url與Base相同)<br>
3.[DbAdmin](https://github.com/bruce66tw/DbAdmin) project: 內容為這個系統的主要程式<br>
從 GitHub 分別下載這2個專案到相同目錄底下後(例如: d:\\_project目錄), 在 Visual Studio 開啟 DbAdmin.sln, 並且加入參考 Base, BaseWeb project, 重新編譯即可。 
本系統在運行時需要Db這個Database, 你可以執行 DbAdmin/_work/Db.sql 這個 script 檔案來建立, 資料庫版本為 Sql Express 12

### web.config 設定

在 connectionStrings 這個區段, 你必須正確設定 db 這個欄位, 它的內容是資料庫的連線設定。
另外, 在 appSettings 區段中, 你可以設定 Locale 這個欄位來改變要顯示的語系, zh-TW表示中文, en-US表示英文。

### 操作畫面
##### 專案管理畫面 :
執行時, 系統會直接進入專案管理畫面, Import Db(匯入Db)可以將某個資料庫的欄位內容匯進來: <br> 
![專案列表畫面](https://github.com/bruce66tw/DbAdmin/blob/master/images/project.png)<br><br>
點選新增按鈕是某一筆連結時, 會進入它的編輯畫面: <br>
![專案編輯畫面](https://github.com/bruce66tw/DbAdmin/blob/master/images/projectE.png)<br>

##### 資料表管理畫面 :
在這個畫面上有2個特別的功能: <br>
1.Gen CRUD: 從勾選的資料表產生 CRUD 檔案<br>
2.Gen Word: 從勾選的資料表產生 Word 文件<br>
![資料表列表畫面](https://github.com/bruce66tw/DbAdmin/blob/master/images/table.png)<br><br>
以下為編輯畫面: <br>
![資料表編輯畫面](https://github.com/bruce66tw/DbAdmin/blob/master/images/tableE.png)<br>

##### 欄位管理畫面 :
![欄位列表畫面](https://github.com/bruce66tw/DbAdmin/blob/master/images/column.png)<br>

## 作者

* **Bruce Chen** - *Initial work*

## 版權

MIT License