
## 1.專案介紹

維護資料庫文件相關的資料表。
- 從現有的MSSQL資料庫匯入欄位資訊。
- 產生資料庫文件Word檔案。
- 產生CRUD原始碼：所謂CRUD指的是新增、查詢、修改、刪除，它代表對資料庫的存取動作，是最常見的系統功能，我們將在「CH2 CRUD產生器」介紹這個功能。
- 產生資料庫異動記錄：自動產生Trigger檔案來追踪資料庫異動，這個功能我們在「CH17資料異動記錄」介紹。
...


測試帳號密碼 **（請斟酌提供，建議只提供僅能觀看不能操作的帳號密碼）**

```bash
帳號： example@example.com
密碼： example
```


## 2.操作畫面

- [專案維護]()
- [資料表維護]()
- [欄位維護]()
- [CRUD維護]()
...

> 可提供 1~3 張圖片，讓觀看者透過 README 了解整體畫面


## 下載專案 & 安裝

```bash
git clone git@github.com:hsiangfeng/README-Example-Template.git
```

## 建立資料庫


## 組態設定

```env
APIPATH= # API 位置
COUSTOMPATH= # 自訂變數
...
```

請在終端機輸入 `cp .env.example .env` 來複製 .env.example 檔案，並依據 `.env` 內容調整相關欄位。


## 專案目錄說明

- views - 畫面放置處
- controllers - 控制器放置處
- modules - 模組放置處
- assets - 靜態資源放置處
  - scss - scss 檔案放置處
  - images - 圖片放置處
...

```bash
npm run serve
```

## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [贡献者](#贡献者)
  - [如何参与开源项目](#如何参与开源项目)
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)


## 執行專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```

## 環境變數說明



## 專案技術

- ASP.NET Core 6
- jQuery v3.5.1
- Bootstrap v5.1.3
...

## 第三方套件

- Algolia
- Google Analytics
...


## 聯絡作者

> ps. 這邊絕對不是業配，而是要適當提供一些方式讓觀看者知道你的聯絡方式，讓他們可以更方便的找到你。

你可以到臉書社團討論

- [Facebook](https://www.facebook.com/softblock)
...

## 作者

* **Bruce Chen** - *Initial work*

## 版權

MIT License

### 贡献者

请阅读**CONTRIBUTING.md** 查阅为该项目做出贡献的开发者。

#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt)