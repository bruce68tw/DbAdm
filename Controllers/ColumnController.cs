using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

//�ק�:DbAdm�令�A���M��
//�ק�:Column�令�A��controller
//�ק�:[XgLogin], [XgProgAuth(xx)]������,�]���Ȥ��Ҽ{�Τ��v��
namespace DbAdm.Controllers
{
    [XgLogin]
    public class ColumnController : BaseCtrl
    {
        //��ܬd�ߵe��
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            //�ק�:�p�G�S���U�����h�����]�wViewBag
            ViewBag.Projects = await _XpCode.ProjectsA();   //for �U�����
            return View();
        }

        //�Ǧ^�@�����
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

        //�x�s�@���s�W�����
        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditService().CreateA(_Str.ToJson(json)!));
        }

        //�x�s�@�����ʪ����
        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditService().UpdateA(key, _Str.ToJson(json)!));
        }

        //�R���@�����
        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditService().DeleteA(key));
        }

        //�Ǧ^�@���n�ק諸���
        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditService().GetUpdJsonA(key));
        }

        //�Ǧ^�@���n�R�������
        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditService().GetViewJsonA(key));
        }

    }//class
}