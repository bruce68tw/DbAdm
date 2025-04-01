using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DbAdm.Controllers
{
    //滿意度問卷統計圖
    [XgLogin]
    public class ChartSatisController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            await using (var db = new Db())
            {
                ViewBag.Projects = await _XpCode.ProjectsA(db);
                //ViewBag.IssueTypes = await _XpCode.IssueTypesA(db);
                //ViewBag.Reporters = await _XpCode.ReportersA(db);
                ViewBag.Users = await _XpCode.UsersA(db);
                //ViewBag.YesNos = _XpCode.YesNos();
            }
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult?> GetData(string json)
        {
            return JsonToCnt(await new ChartSatisRead().GetDataA(Ctrl, json));
        }

        //傳回專案功能清單, 固定傳入 parentId
        [HttpPost]
        public async Task<JsonResult> GetPrjProgs(string parentId)
        {
            return Json(await _XpCode.PrjProgsA(parentId));
        }


        /*
        public async Task<ActionResult> Index()
        {
			//ViewBag.Baos = await _XpCode.GetBaos();
            return View();
        }

        //id: Bao.Id
        [HttpPost]
        public async Task<List<IdNumDto>> GetData(string id)
        {
            return await new ChartSatisService().GetDataA(id);
        }
        */

    }//class
}