using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using BaseWeb.Models;
using BaseWeb.Services;
using DbAdm.Enums;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[XgLogin]
    public class UiController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            ViewBag.Projects = await _XpCode.ProjectsA();
            return View();
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new UiRead().GetPageA(dt));
        }

        private UiEdit EditSvc()
        {
            return new UiEdit(Ctrl);
        }

        [XgProgAuth(CrudEnum.Create)]
        public async Task<JsonResult> Create(string json)
        {
            return Json(await EditSvc().CreateA(_Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Update)]
        public async Task<JsonResult> Update(string key, string json)
        {
            return Json(await EditSvc().UpdateA(key, _Str.ToJson(json)!));
        }

        [XgProgAuth(CrudEnum.Delete)]
        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc().DeleteA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.Update)]
        public async Task<ContentResult> GetUpdJson(string key)
        {
            return JsonToCnt(await EditSvc().GetUpdJsonA(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEnum.View)]
        public async Task<ContentResult> GetViewJson(string key)
        {
            return JsonToCnt(await EditSvc().GetViewJsonA(key));
        }

        //傳回輸入欄位html, 必須傳回ViewComponentResult, 前端收到為字串
        [HttpPost]
        //[XgProgAuth(CrudEnum.View)]
        public string GetInputHtml(string inputType, string fid, string title, string cols)
        {
            XiBaseDto data = new() { Fid = fid, Title = title, Cols = cols };
            switch (inputType)
            {
                case QEitemTypeEstr.Check:
                    return _Input.XiCheck((XiCheckDto)data);
                case QEitemTypeEstr.Date:
                    return _Input.XiDate((XiDateDto)data);
                case QEitemTypeEstr.DateTime:
                    return _Input.XiDt((XiDtDto)data);
                case QEitemTypeEstr.Decimal:
                    return _Input.XiDec((XiDecDto)data);
                case QEitemTypeEstr.File:
                    return _Input.XiFile((XiFileDto)data);
                case QEitemTypeEstr.Hide:
                    return _Input.XiHide(new XiHideDto() { Fid = fid });
                case QEitemTypeEstr.Html:
                    return _Input.XiHtml((XiHtmlDto)data);
                case QEitemTypeEstr.Integer:
                    return _Input.XiInt((XiIntDto)data);
                //case QEitemTypeEstr.Modal:
                //    return _Input.XiModal((XiModalDto) { Fid = fid, Title = title });
                //case QEitemTypeEstr.Password:
                //    return _Input.XiPassword((XiDto) { Fid = fid, Title = title });
                case QEitemTypeEstr.Radio:
                    return _Input.XiRadio((XiRadioDto)data);
                case QEitemTypeEstr.ReadOnly:
                    return _Input.XiRead((XiReadDto)data);
                case QEitemTypeEstr.Select:
                    return _Input.XiSelect((XiSelectDto)data);
                //case QEitemTypeEstr.Sort:
                //    return _Input.Xi((XiDto) { Fid = fid, Title = title });
                case QEitemTypeEstr.Textarea:
                    return _Input.XiTextarea((XiTextareaDto)data);
                default:
                    return _Input.XiText(new XiTextDto() { Fid = fid, Title = title, Cols = cols });
            }
        }

    }//class
}