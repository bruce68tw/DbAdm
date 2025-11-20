using Base.Enums;
using Base.Models;
using Base.Services;
using BaseApi.Controllers;
using BaseWeb.Models;
using BaseWeb.Services;
using DbAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace DbAdm.Controllers
{
    //[Permission(Prog = _Prog.Course)]
    public class GenCrudController : BaseCtrl
    {
        #region Read View
        public async Task<ActionResult> Read()
        {
            await using var db = new Db();
            ViewBag.Projects = await _XpCode.ProjectsA(db);
            ViewBag.RitemTypes = await _XpCode.RitemTypesA(db);
            ViewBag.InputTypesQ = await _XpCode.InputTypesQA(db);
            ViewBag.InputTypes = await _XpCode.InputTypesA(db);
            ViewBag.CheckTypes = await _XpCode.CheckTypesA(db);
            ViewBag.QitemOps = await _XpCode.QitemOpsA(db);
            ViewBag.AuthTypes = await _XpCode.AuthTypesA(db);
            ViewBag.AutoIdLens = _XpCode.AutoIdLens();
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> GetPage(DtDto dt)
        {
            return JsonToCnt(await new  GenCrudRead().GetPageA(Ctrl, dt));
        }
        #endregion

        private BaseEditSvc EditSvc(int editNo)
        {
            return (editNo == 0)
                ? new GenCrudEdit(Ctrl)
                : new GenCrudUiEdit(Ctrl);
        }

        #region Edit View   
        //考慮多個編輯畫面
        [HttpPost]
        public async Task<ContentResult> GetUpdJson(string key, int editNo = 0)
        {
            return JsonToCnt(await EditSvc(editNo).GetUpdJsonA(key));
        }

        [HttpPost]
        public async Task<ContentResult> GetViewJson(string key, int editNo = 0)
        {
            return JsonToCnt(await EditSvc(editNo).GetViewJsonA(key));
        }

        public async Task<JsonResult> Delete(string key)
        {
            return Json(await EditSvc(0).DeleteA(key));
        }

        //Crud才有新增
        public async Task<JsonResult> Create(string json, int editNo = 0)
        {
            return Json(await EditSvc(0).CreateA(_Str.ToJson(json)!));
        }
        public async Task<JsonResult> Update(string key, string json, int editNo = 0)
        {
            return Json(await EditSvc(editNo).UpdateA(key, _Str.ToJson(json)!));
        }
        #endregion

        #region others for Crud
        /// <summary>
        /// generate CRUD
        /// </summary>
        /// <param name="keys">crudId list</param>
        /// <returns>error msg if any</returns>
        [HttpPost]
        public async Task<string> GenCrud(string id)
        {
            var result = await new GenCrudSvc().GenCrudA(id);
            return result;
        }

        //get table columns for modal
        public async Task<ContentResult> GetColumns(string tableId)
        {
            //var tableId = _Datatable.GetFindValue(dt, "tableId");
            var rows = await new ColumnSvc().GetRowsA(tableId);
            return Content(rows == null ? "" : rows.ToString(), ContentTypeEstr.Json);
        }
        #endregion

        #region for 拖拉編輯
        //傳回輸入欄位html for 模版用途, 必須傳回ViewComponentResult, 前端收到為字串
        [HttpPost]
        //[XgProgAuth(CrudEnum.View)]
        public string GetInputHtml(string inputType, string fid, string title,
            string labelTip, string inputNote, string cols, bool required)
        {
            //固定 Cols = "2,3", Required = true, 前端自行調整
            XiBaseDto data = new()
            {
                Fid = fid,
                Title = title,
                InputNote = inputNote,
                TitleTip = labelTip,
                Cols = cols,
                Required = required
            };
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
                InputTypeEstr.Read => _Input.XiRead(_Model.Copy<XiBaseDto, XiReadDto>(data)),
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

        //傳回 group item 模版
        [HttpPost]
        public string DownTableSql(string id)
        {
            return new GenCrudUiSvc().DownTableSql(id);
        }

        #endregion

    }//class
}