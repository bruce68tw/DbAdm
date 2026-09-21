using Base.Services;
using BaseApi.Services;
using DbAdm.Models;
using DbAdm.Tables;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Services
{
    /// <summary>
    /// 專案層級的靜態工具類別，提供系統共用的常數、目錄路徑、
    /// 資料庫連線、範本路徑、檔案檢視等功能。
    /// </summary>
    public static class _Xp
    {
        /// <summary>
        /// AES 加密金鑰，用於問卷功能（不可更改）。
        /// </summary>
        public const string AesKey = "EdenDbAdmSurvey";

        /// <summary>
        /// 自訂 JS/CSS 的版本號，每次系統啟動時以目前時間（秒）產生，
        /// 用於強制瀏覽器重新載入自訂的前端資源檔案（my.js、my.css）。
        /// </summary>
        public static string MyVer = _Date.NowSecStr();

        /// <summary>
        /// 共用函式庫 JS/CSS 的版本號，手動更新此值以強制瀏覽器
        /// 重新載入共用前端資源檔案（lib.js、lib.css）。
        /// </summary>
        public const string LibVer = "20250815";

        /// <summary>
        /// XpCode 資料表中「資料種類」的類型代碼，用於查詢 IssueType 相關的 Key-Value 資料。
        /// </summary>
        public const string IssueType = "IssueType";

        /// <summary>
        /// 範本檔案的根目錄路徑（_template 目錄）。
        /// </summary>
        public static string DirTpl = _Fun.Dir("_template");

        /// <summary>
        /// 上傳檔案的根目錄路徑（_upload 目錄）。
        /// </summary>
        public static string DirBaseUpload = _Fun.Dir("_upload");

        /// <summary>
        /// Issue 功能的上傳檔案目錄路徑（_upload/Issue/）。
        /// </summary>
		public static string DirIssueFile = DirUpload("Issue");

        /// <summary>
        /// 資料字典功能的上傳檔案目錄路徑（_upload/DataDict/）。
        /// </summary>
        public static string DirDataDict = DirUpload("DataDict");

        /// <summary>
        /// 系統組態設定，從 appsettings.json 的 FunConfig 區段讀取，
        /// 包含資料庫連線字串、語系、是否記錄 SQL 等設定。
        /// </summary>
        public static MyConfigDto Config = null!;

        /// <summary>
        /// 取得 Entity Framework 的資料庫內容物件（DbContext），
        /// 用於存取 DbAdm 資料庫。
        /// </summary>
        /// <returns>MyContext 資料庫內容物件</returns>
        public static MyContext GetDb()
        {
            return new MyContext();
        }

        /// <summary>
        /// 取得範本檔案的完整路徑，可依語系選擇對應的範本子目錄。
        /// </summary>
        /// <param name="fileName">範本檔案名稱</param>
        /// <param name="hasLocale">是否依目前語系加入子目錄（例如 zh-TW、en-US）</param>
        /// <returns>範本檔案的完整路徑</returns>
        public static string GetTplPath(string fileName, bool hasLocale)
        {
            return $"{DirTpl}{(hasLocale ? _Locale.GetLocale() : "")}/{fileName}";
        }

        /*
        /// <summary>
        /// 取得用戶端唯一識別碼，可選擇是否結合 IP 位址。
        /// </summary>
        /// <param name="hasIp">是否加入用戶端 IP 位址</param>
        /// <returns>用戶端唯一識別碼字串</returns>
        public static string GetClientKey(bool hasIp)
        {
            var key = _Http.GetCookie(_Fun.FidClientKey);
            return hasIp
                ? key + _Http.GetIp(false)
                : key;
        }
        */

        /// <summary>
        /// 組合指定子目錄的上傳檔案路徑。
        /// </summary>
        /// <param name="subDir">子目錄名稱（例如 Issue、DataDict）</param>
        /// <param name="sep">是否在結尾加上目錄分隔符號，預設為 true</param>
        /// <returns>完整的上傳目錄路徑</returns>
		private static string DirUpload(string subDir, bool sep = true)
		{
			return DirBaseUpload + subDir + (sep ? _Fun.DirSep : "");
		}

        /// <summary>
        /// 檢視指定目錄下的上傳檔案，依檔案識別碼、鍵值和副檔名組合路徑。
        /// </summary>
        /// <param name="dir">檔案所在目錄</param>
        /// <param name="fid">檔案識別碼</param>
        /// <param name="key">檔案鍵值</param>
        /// <param name="ext">檔案副檔名</param>
        /// <returns>FileResult 檔案結果，若檔案不存在則回傳 null</returns>
		private static FileResult? ViewFile(string dir, string fid, string key, string ext)
		{
			var path = $"{dir}{fid}_{key}.{ext}";
			return _HttpFile.ViewFile(path, $"{fid}.{ext}");
		}

        /// <summary>
        /// 檢視 Issue 功能的上傳檔案。
        /// </summary>
        /// <param name="fid">檔案識別碼</param>
        /// <param name="key">檔案鍵值</param>
        /// <param name="ext">檔案副檔名</param>
        /// <returns>FileResult 檔案結果，若檔案不存在則回傳 null</returns>
		public static FileResult? ViewIssueFile(string fid, string key, string ext)
		{
			return ViewFile(DirIssueFile, fid, key, ext);
		}

        /*
        /// <summary>
        /// 字串加密/解密，使用 AesKey 進行 AES 加解密。
        /// </summary>
        /// <param name="isEncode">true 表示加密，false 表示解密</param>
        /// <param name="data">要處理的原始字串</param>
        /// <returns>加密或解密後的字串</returns>
        public static string EnDecode(bool isEncode, string data)
        {
            return isEncode 
                ? _Str.Encode(data, AesKey)
                : _Str.Decode(data, AesKey);
        }
        */

        /*
        /// <summary>
        /// 取得目前使用者的 Session 模型物件。
        /// </summary>
        /// <returns>SessionModel 工作階段模型</returns>
        public static SessionModel GetSession()
        {
            return new SessionModel();
        }
        */

        /*
        /// <summary>
        /// 檢查上傳檔案的大小和副檔名是否符合限制。
        /// 後端程式不顯示詳細錯誤訊息到前端。
        /// </summary>
        /// <param name="file">上傳的檔案物件</param>
        /// <param name="size">允許的最大檔案大小（MB）</param>
        /// <param name="exts">允許的副檔名清單（以逗號分隔）</param>
        /// <returns>ErrorModel，若驗證通過則 ErrorMsg 為空字串</returns>
        public static ErrorModel CheckUploadFile(HttpPostedFileBase file, int size, string exts)
        {
            var error = new ErrorModel();
            if (!_HttpFile.CheckFileSize(file, size))
                error.ErrorMsg = "上傳檔案大小有誤。";
            else if(!_HttpFile.CheckFileExt(file, exts))
                error.ErrorMsg = "上傳檔案種類有誤。";

            return error;
        }

        /// <summary>
        /// 儲存上傳檔案到 ImportFiles 目錄，若檔名重複則自動重新命名。
        /// </summary>
        /// <param name="file">上傳的檔案物件</param>
        /// <returns>成功時回傳完整檔案路徑，失敗時回傳空字串</returns>
        public static string SaveUploadFile(HttpPostedFileBase file)
        {
            //rename existed file if any
            var dir = _Fun.DirRoot + "ImportFiles\\";
            var name = file.FileName;
            var path = dir + Path.GetFileName(name);
            if (File.Exists(path))
            {
                var path2 = dir + Path.GetFileNameWithoutExtension(name) + "_" + _Date.NowSecStr() + Path.GetExtension(name);
                File.Move(path, path2);
            }
            return _HttpFile.SaveUploadFile(file, path) ? path : "";
        }

        /// <summary>
        /// 切換系統語系。
        /// </summary>
        /// <param name="locale">語系代碼（zh-TW、zh-CN、en-US）</param>
        public static void SetLocale(string locale)
        {            
            _Locale.SetLocale(locale);
        }

        /// <summary>
        /// 遞迴設定功能清單（選單）的多國語系顯示名稱。
        /// </summary>
        /// <param name="menus">功能清單的 MenuModel 清單</param>
        public static void MenuSetLocale(List<MenuModel> menus)
        {
            var rm = _Locale.GetResourceFile("");
            rm.GetString("");
        }
        */

    }//class
}