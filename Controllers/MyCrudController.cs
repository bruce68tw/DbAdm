using Base.Models;
using Base.Services;
using BaseWeb.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class MyCrudController : Controller
    {
        #region Read View
        public ActionResult Read()
        {
            using (var db = new Db())
            {
                //讀取專案欄位(下拉式)來源資料
                ViewBag.Projects = _Code.GetProjects(db);
                ViewBag.RitemTypes = _Code.GetRitemTypes(db);
                ViewBag.InputTypes = _Code.GetInputTypes(db);
                ViewBag.CheckTypes = _Code.GetCheckTypes(db);
                ViewBag.QitemOps = _Code.GetQitemOps(db);
                ViewBag.AuthTypes = _Code.GetAuthTypes(db);
                return View();
            }
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new MyCrudRead().GetPage(dt).ToString(), _Web.AppJson);
        }
        #endregion

        #region Edit View
        BaseResDto _baseInfo;
        public ActionResult Edit(
            IBaseResService baseInfoService)
        {
            _baseInfo = baseInfoService.GetData();
            return View();
        }
        
        //傳回json必須用ContentResult (JsonResult用來傳回model)
        public ContentResult GetJson(string key)
        {
            return Content(new MyCrudEdit().GetJson(key).ToString(), _Web.AppJson);
        }


        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.Crud", "Id", key, status));
        }

        public JsonResult Delete(string key)
        {
            return Json(new MyCrudEdit().Delete(key));
        }

        public JsonResult Create(string json)
        {
            return Json(new MyCrudEdit().Create(_Json.StrToJson(json)));
        }
        public JsonResult Update(string key, string json)
        {
            return Json(new MyCrudEdit().Update(key, _Json.StrToJson(json)));
        }
        #endregion

        #region others
        //generate CRUD
        //keys: crudId list
        //return: 1(ok), 0(failed)
        [HttpPost]
        public async Task<int> GenCrud(string keys)
        {
            var service = new GenCrudService();
            var result = await service.RunAsync(keys) ? 1 : 0;
            return result;
        }

        //get table columns for modal
        public ContentResult GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = new ColumnService().GetRows(tableId);
            return Content(rows == null ? "" : rows.ToString(), _Web.AppJson);
        }

        #endregion

    }//class
}