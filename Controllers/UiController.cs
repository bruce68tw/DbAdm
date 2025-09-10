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
        public string GetColHtml(string inputType, string fid, string title, string cols, int required)
        {
            //固定 Cols = "2,3", Required = true, 前端自行調整
            XiBaseDto data = new() { Fid = fid, Title = title, Cols = cols, Required = (required == 1) };
            return inputType switch
            {
                //無法直接轉型, 只能用Copy
                QEitemTypeEstr.Check => _Input.XiCheck(_Model.Copy<XiBaseDto, XiCheckDto>(data)),
                QEitemTypeEstr.Date => _Input.XiDate(_Model.Copy<XiBaseDto, XiDateDto>(data)),
                QEitemTypeEstr.DateTime => _Input.XiDt(_Model.Copy<XiBaseDto, XiDtDto>(data)),
                QEitemTypeEstr.Decimal => _Input.XiDec(_Model.Copy<XiBaseDto, XiDecDto>(data)),
                QEitemTypeEstr.File => _Input.XiFile(_Model.Copy<XiBaseDto, XiFileDto>(data)),
                QEitemTypeEstr.Hide => _Input.XiHide(new XiHideDto() { Fid = fid }),
                QEitemTypeEstr.Html => _Input.XiHtml(_Model.Copy<XiBaseDto, XiHtmlDto>(data)),
                QEitemTypeEstr.Integer => _Input.XiInt(_Model.Copy<XiBaseDto, XiIntDto>(data)),
                QEitemTypeEstr.Radio => _Input.XiRadio(_Model.Copy<XiBaseDto, XiRadioDto>(data)),
                QEitemTypeEstr.ReadOnly => _Input.XiRead(_Model.Copy<XiBaseDto, XiReadDto>(data)),
                QEitemTypeEstr.Select => _Input.XiSelect(_Model.Copy<XiBaseDto, XiSelectDto>(data)),
                QEitemTypeEstr.Textarea => _Input.XiTextarea(_Model.Copy<XiBaseDto, XiTextareaDto>(data)),
                _ => _Input.XiText(_Model.Copy<XiBaseDto, XiTextDto>(data)),
            };
        }

        [HttpPost]
        public string GetGroupHtml(string label)
        {
            return _Input.XgGroup(label, false);
        }

    }//class
}