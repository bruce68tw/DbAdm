using Base.Services;
using BaseWeb.Services;
using DbAdm.Tables;

namespace DbAdm.Services
{
    //project service
    public static class _Xp
    {
        //public const string MyVer = "20201228f";     //for my.js/css
        public static string MyVer = _Date.NowSecStr(); //for my.js/css
        public const string LibVer = "20211001i";       //for lib.js/css

        //constant
        //upload file max size(MB)
        //public const int UploadFileMax = 5;

        public static MyContext GetDb()
        {
            return new MyContext();
        }

        public static string GetTplPath(string fileName, bool hasLocale)
        {
            var dir = _Fun.Dir("_template");
            if (hasLocale)
                dir += _Locale.GetLocaleByUser() + _Fun.DirSep;
            return dir + fileName;
        }
        

        /*
        public static SessionModel GetSession()
        {
            return new SessionModel();
        }
        */

        /*
        //檢查上傳檔案
        //後端程式不顯示詳細錯誤訊息到前端
        public static ErrorModel CheckUploadFile(HttpPostedFileBase file, int size, string exts)
        {
            var error = new ErrorModel();
            if (!_WebFile.CheckFileSize(file, size))
                error.ErrorMsg = "上傳檔案大小有誤。";
            else if(!_WebFile.CheckFileExt(file, exts))
                error.ErrorMsg = "上傳檔案種類有誤。";

            return error;
        }

        //儲存上傳檔案, 傳回路徑, 如果失敗則傳回空白
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
            return _WebFile.SaveUploadFile(file, path) ? path : "";
        }

        //switch locale
        public static void SetLocale(string locale)
        {            
            _Locale.SetLocale(locale);
        }

        //??
        //功能清單(名稱)設定多國語內容(recursive)
        public static void MenuSetLocale(List<MenuModel> menus)
        {
            //??
            var rm = _Locale.GetResourceFile("");
            rm.GetString("");
        }
        */

    }//class
}