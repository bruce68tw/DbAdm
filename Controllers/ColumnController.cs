using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

//修改:DbAdm改成你的專案
//修改:Column改成你的controller
//修改:[XgLogin], [XgProgAuth(xx)]先註解,因為暫不考慮用戶權限
namespace DbAdm.Controllers
{
    [XgLogin]
    public class ColumnController : BaseCtrl
    {
        //顯示查詢畫面
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            //修改:如果沒有下拉欄位則不必設定ViewBag
            ViewBag.Projects = await _XpCode.ProjectsA();   //for 下拉欄位
            return View();
        }

        //傳回一頁資料
        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new ColumnRead().GetPageA(dt));
        }

        private ColumnEdit EditService()
        {
            return new ColumnEdit(Ctrl);
        }

        //儲存一筆新增的資料
        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }

        //儲存一筆異動的資料
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        //刪除一筆資料
        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        //傳回一筆要修改的資料
        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonA(key));
        }

        //傳回一筆要刪除的資料
        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonA(key));
        }

    }//class
}