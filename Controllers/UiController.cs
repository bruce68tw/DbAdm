using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Attributes;
using BaseApi.Controllers;
using BaseWeb.Models;
using BaseWeb.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DbAdm.Controllers
{
    //[XgLogin]
    public class UiController : BaseCtrl
    {
        [XgProgAuth(CrudEnum.Read)]
        public async Task<ActionResult> Read()
        {
            await using var db = new Db();
            ViewBag.Projects = await _XpCode.ProjectsA(db);
            ViewBag.InputTypes = await _XpCode.InputTypesA(db);
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

        //傳回輸入欄位html for 模版用途, 必須傳回ViewComponentResult, 前端收到為字串
        [HttpPost]
        //[XgProgAuth(CrudEnum.View)]
        public string GetInputHtml(string inputType, string fid, string title, 
            string labelTip, string inputNote, string cols, bool required)
        {
            //固定 Cols = "2,3", Required = true, 前端自行調整
            XiBaseDto data = new() { Fid = fid, Title = title, InputNote = inputNote, 
                TitleTip = labelTip, Cols = cols, Required = required };
            return inputType switch
            {
                //無法直接轉型, 只能用Copy
                InputTypeEstr.Check => _Input.XiCheck(_Model.Copy<XiBaseDto, XiCheckDto>(data)),
                InputTypeEstr.Date => _Input.XiDate(_Model.Copy<XiBaseDto, XiDateDto>(data)),
                InputTypeEstr.DateTime => _Input.XiDt(_Model.Copy<XiBaseDto, XiDtDto>(data)),
                InputTypeEstr.Decimal => _Input.XiDec(_Model.Copy<XiBaseDto, XiDecDto>(data)),
                InputTypeEstr.File => _Input.XiFile(_Model.Copy<XiBaseDto, XiFileDto>(data)),
                InputTypeEstr.Hide => _Input.XiHide(new XiHideDto() { Fid = fid }),
                InputTypeEstr.Html => _Input.XiHtml(_Model.Copy<XiBaseDto, XiHtmlDto>(data)),
                InputTypeEstr.Integer => _Input.XiInt(_Model.Copy<XiBaseDto, XiIntDto>(data)),
                InputTypeEstr.Radio => _Input.XiRadio(_Model.Copy<XiBaseDto, XiRadioDto>(data)),
                InputTypeEstr.ReadOnly => _Input.XiRead(_Model.Copy<XiBaseDto, XiReadDto>(data)),
                InputTypeEstr.Select => _Input.XiSelect(_Model.Copy<XiBaseDto, XiSelectDto>(data)),
                InputTypeEstr.Textarea => _Input.XiTextarea(_Model.Copy<XiBaseDto, XiTextareaDto>(data)),
                _ => _Input.XiText(_Model.Copy<XiBaseDto, XiTextDto>(data)),
            };
        }

        //傳回 group item 模版
        [HttpPost]
        public string GetGroupHtml(string title)
        {
            return _Input.XgGroup(title, false);
        }

        /// <summary>
        /// generate CRUD
        /// </summary>
        /// <param name="id">UI.Id</param>
        /// <returns>error msg if any</returns>
        [HttpPost]
        public async Task<string> GenCrud(string id)
        {
            var result = await new GenCrudSvc().GenCrudsA(id);
            return result;
        }

    }//class
}