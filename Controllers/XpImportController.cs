using Base.Models;
using BaseApi.Attributes;
using BaseApi.Controllers;
using BaseApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //Excel import base controller
    [XgProgAuth]
    abstract public class XpImportController : BaseCtrl 
    {
        //public string ProgName;     //program display name
        public string ImportType = "";   //map to ImportLog.Type
        public string TplPath = "";      //template file path
        public string DirUpload = "";    //upload dir, no right slash

        public ActionResult Read()
        {			
            //ViewBag.ProgName = ProgName;
            ViewBag.ImportType = ImportType;
            return View("/Views/XpImport/Read.cshtml"); //public view
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new XgImportRead(ImportType).GetPageA(Ctrl, dt));
        }

        //run import, drived class implement !!
        //abstract could not be async(CS1994), must use virtual method !!
        virtual public async Task<JsonResult> Import(IFormFile file) 
        { 
            return await Task.FromResult<JsonResult>(result: null);
        }

        /// <summary>
        /// download template file
        /// </summary>
        /// <param name="file">file name</param>
        /// <returns>file</returns>
        public async Task<FileResult?> Template()
        {
            return await _HttpFile.ViewFileA(TplPath);  //use this instead of PhysicalFile()
        }

        //download source import file
        public async Task<FileResult?> GetSource(string id, string name)
        {
            return await GetFile(id, name);
            /*
            var file = GetFile(id, name);
            return (file == null)
                ? NotFound() : file;
            */
        }

        //download failed import file
        public async Task<FileResult?> GetFail(string id, string name)
        {
            return await GetFile(id + "_fail", name);
        }

        //download import file
        private async Task<FileResult?> GetFile(string realFileStem, string downFileName)
        {
            return await _HttpFile.ViewFileA($"{DirUpload}/{realFileStem}.xlsx", downFileName);
        }

    }//class
}