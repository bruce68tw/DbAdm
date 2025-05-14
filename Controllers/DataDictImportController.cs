using BaseApi.Attributes;
using DbAdm.Enums;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //1.inherit
    [XgProgAuth]
    public class DataDictImportController : XpImportController
    {
        //2.constructor
        public DataDictImportController()
        {
            //ProgName = "Import User";
            ImportType = ImportTypeEstr.DataDict;
            TplPath = _Xp.DirTpl + "/DataDict.xlsx";
            DirUpload = _Xp.DirDataDict;
        }

        //3.override
        [HttpPost]
        override public async Task<JsonResult> Import(IFormFile file)
        {
            var model = await new DataDictImportService().ImportA(file, this.DirUpload);
            return Json(model);
        }

    }//class
}