using BaseApi.Attributes;
using DbAdm.Enums;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //1.inherit
    [XgProgAuth]
    public class DataDictImpController : XpImportController
    {
        //2.constructor
        public DataDictImpController()
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
            var model = await new DataDictImpSvc().ImportA(file, DirUpload);
            return Json(model);
        }

    }//class
}