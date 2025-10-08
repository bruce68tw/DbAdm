var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _Ajax from "./_Ajax";
//import _BR from "./_BR";
import _Date from "./_Date";
import _Edit from "./_Edit";
import _File from "./_File";
import _Form from "./_Form";
import _Fun from "./_Fun";
import _IHtml from "./_IHtml";
import _IDate from "./_IDate";
import _Input from "./_Input";
import _IText from "./_IText";
import _Json from "./_Json";
//import _Me from "./_Me";
import _Prog from "./_Prog";
import _Str from "./_Str";
import _Tool from "./_Tool";
import _Valid from "./_Valid";
import EstrFun from "./EstrFun";
//import $ from "jquery";
/**
 * crud edit function
 * 合併 _edit.js
 * 寫入 _me properties:
 * fnAfterSwap:
 * fnAfterOpenEdit:
 * fnUpdateOrViewA: see _updateOrViewA
 * divEdit:
 * //hasEdit:
 * edit0:
 * eform0:
 * hasChild:
 * _nowFun:
 * modal:
 */
export default class CrudE {
    /**
     * initial crud edit, 寫入 this 變數
     * param1 edits {object Array} for edit form
     * 1.null: means one table, get eform
     * 2.many edit object, if ary0 is null, then call new EditOne()
     * param2 updName {string} update name, default to _BR.Update
     */
    constructor(edits) {
        this.eform0 = null; // Master edit form
        this.hasChild = false;
        this._nowFun = '';
        this.modal = null; // For xgOpenModal
        this.edits = edits;
        this._init();
    }
    _init() {
        this.divEdit = $('#divEdit');
        const hasEdit = (this.divEdit.length > 0);
        if (hasEdit) {
            const Childs = _Edit.Childs; //constant
            let edit0 = null; //master edit object
            if (this.edits == null) {
                // Assuming EditOne is imported or globally available (needs adjustment)
                edit0 = new window.EditOne();
                //this.hasChild = false;
            }
            else {
                edit0 = (this.edits[0] === null) ? new window.EditOne() : this.edits[0];
                //this.hasChild = edits.length > 1;
                if (this.edits.length > 1) {
                    edit0[Childs] = [];
                    //var childs = this.edits._childs;
                    for (let i = 1; i < this.edits.length; i++)
                        edit0[Childs][i - 1] = this.edits[i];
                }
            }
            this.edit0 = edit0;
            if (edit0.eform != null)
                this.eform0 = edit0.eform;
            this.hasChild = (_Fun.hasValue(this.edit0[Childs]) && this.edit0[Childs].length > 0);
            //this.editLen = this.edits.length;
            this._initForm(this.edit0);
        }
        this._nowFun = ''; //now fun of edit0 form
        //this.updName = updName;
        //for xgOpenModal
        this.modal = null;
        //3.initial forms(recursive)
        //_prog.init();   //prog path
        //set _me
        _me.crudE = this;
        _me.edit0 = this.edit0;
        _me.eform0 = this.eform0;
        _me.hasEdit = hasEdit;
        _me.divEdit = this.divEdit;
    }
    /**
     * initial edit forms(recursive)
     * param edit {object} EditOne/EditMany object
     */
    _initForm(edit) {
        if (edit.eform == null)
            return;
        _IDate.init(edit.eform); //init all date inputs
        edit.validator = _Valid.init(edit.eform); //set valid variables for _ihtml.js !!
        const childLen = this._getEditChildLen(edit);
        for (let i = 0; i < childLen; i++)
            this._initForm(this._getEditChild(edit, i));
    }
    //get master edit form
    getEform0() {
        return this.edit0.eform;
    }
    /*
    _getJsonAndSetMode = async function(key, fun) {
        //_me.crudR.toUpdateMode(key);
        var act = (fun == EstrFun.Update) ? 'GetUpdJson' :
            (fun == EstrFun.View) ? 'GetViewJson' : '';
        await _ajax.getJsonA(act, { key: key }, function(data) {
            _me.crudR.toEditMode(fun, data);
        });
    };
     */
    /**
     * _loadJson -> loadJson
     * load row(include childs) into UI
     */
    loadJson(json) {
        //load master(single) row
        const edit = this.edit0;
        edit.loadRow(json);
        edit.dataJson = json;
        //load childs rows(只需載入第一層)
        const childLen = this._getEditChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._getEditChild(edit, i);
            edit2.dataJson = this.getChildJson(json, i);
            edit2.loadRows(this.jsonGetRows(edit2.dataJson));
        }
        //call fnAfterLoadJson() if existed
        //if (_fun.hasValue(edit.fnAfterLoadJson))
        //    edit.fnAfterLoadJson(json);
    }
    //call fnAfterOpenEdit() if existed
    // _afterOpenEdit -> afterOpen
    afterOpen(fun, json) {
        //if (_fun.hasValue(_me.fnAfterOpenEdit))
        if (_me.fnAfterOpenEdit)
            _me.fnAfterOpenEdit(fun, json);
    }
    /**
     * _setEditStatus -> setEditStatus
     * set all forms fields edit status
     * param fun {string} C,U,V
     */
    setEditStatus(fun) {
        //if (fun === this._nowFun)
        //    return;
        /*
        var isView = (fun == EstrFun.View);
        var run = (isView && this._nowFun != EstrFun.View) ? true :
            (!isView && this._nowFun == EstrFun.View) ? true :
            false;
        */
        //set variables
        this._nowFun = fun;
        //if (!run)
        //    return;
        const box = this.divEdit;
        const eform = this.edit0.eform;
        const items = box.find('input, textarea, select, button');
        if (fun == EstrFun.View) {
            _Edit.removeIsNew(eform);
            items.prop('disabled', true);
            box.find('#btnToRead').prop('disabled', false);
            _IHtml.setEdits(box, '', false);
        }
        else if (fun == EstrFun.Create) {
            _Edit.addIsNew(eform); //增加_IsNew隱藏欄位
            const dataEdit = '[data-edit=U]';
            items.prop('disabled', false);
            items.filter(dataEdit).prop('disabled', true);
            _IHtml.setEdits(box, '', true);
            _IHtml.setEdits(box, dataEdit, false);
        }
        else if (fun == EstrFun.Update) {
            _Edit.removeIsNew(eform);
            const dataEdit = '[data-edit=C]';
            items.prop('disabled', false);
            items.filter(dataEdit).prop('disabled', true);
            _IHtml.setEdits(box, '', true);
            _IHtml.setEdits(box, dataEdit, false);
        }
        //remove span error
        this.divEdit.find('span.error').remove();
        //enable btnToRead for view fun
        //if (isView)
        //    box.find('#btnToRead').prop('disabled', false);
    }
    /**
     * check has upload file or not
     */
    _hasFile() {
        const edit = this.edit0;
        if (edit.hasFile)
            return true;
        const childLen = this._getEditChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._getEditChild(edit, i);
            if (edit2.hasFile)
                return true;
        }
        //case of not found
        return false;
    }
    /**
     * get updated data for save create/update(has _rows, _childs, _deletes, _fileJson)
     * param formData {FormData} for write uploaded files
     * return {json} include fileJson if existed
     */
    _getUpdJson(formData) {
        //load master(single) row
        const edit0 = this.edit0;
        const row = edit0.getUpdRow();
        const key = edit0.getKey();
        //var isNew = edit0.isNewRow();
        //file for master edit
        let fileJson = {};
        const levelStr = '0'; //string
        if (edit0.hasFile)
            fileJson = edit0.dataAddFiles(levelStr, formData); //upload files
        //load child(multiple) rows
        let hasChild = false;
        let childs = [];
        const childLen = this._getEditChildLen(edit0);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._getEditChild(edit0, i);
            //file
            if (edit2.hasFile) {
                const fileJson2 = edit2.dataAddFiles(levelStr + i, formData, edit2.rowsBox); //upload files
                _Json.copy(fileJson2, fileJson);
            }
            const childJson = edit2.getUpdJson(key);
            if (childJson == null)
                continue;
            //has child rows
            hasChild = true;
            childs[i] = childJson;
        }
        let data = {};
        let hasData = false;
        if (row != null) {
            hasData = true;
            data[_Edit.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_Edit.Childs] = childs;
        }
        if (!_Json.isEmpty(fileJson)) {
            hasData = true;
            data[_Edit.FileJson] = fileJson;
        }
        if (!hasData)
            return null;
        //if (!isNew)
        //    data.key = key;
        _Json.removeNull(data);
        return data;
    }
    /**
     * forms validate check, also check systemError
     * return {bool}
     */
    validAll() {
        //check system error
        const edit = this.edit0;
        if (_Str.notEmpty(edit.systemError)) {
            _Tool.msg(edit.systemError);
            return false;
        }
        //validate
        if (!edit.eform.valid())
            return false;
        //check child Edit
        const childLen = this._getEditChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            //check system error
            const edit2 = this._getEditChild(edit, i);
            if (_Str.notEmpty(edit2.systemError)) {
                _Tool.msg(edit2.systemError);
                return false;
            }
            //validate
            if (!edit2.valid())
                return false;
        }
        //case of ok
        return true;
    }
    /**
     * (public) after save
     * data: ResultDto
     */
    afterSave(data) {
        //debugger;
        //call fnAfterSave if need
        if (_Fun.hasValue(this.edit0.fnAfterSave))
            this.edit0.fnAfterSave();
        //save no rows
        if (data.Value === '0') {
            _Tool.msg(_BR.SaveNone);
            return;
        }
        //case of ok
        _Tool.alert(_BR.SaveOk + '(' + data.Value + ')');
        if (_me.crudR) {
            _me.crudR.dt.reload();
            _me.crudR.toReadMode();
        }
    }
    /**
     * reset form (recursive)
     * param edit {EditOne}
     */
    _resetForm(edit) {
        //reset this
        edit.reset();
        //reset childs
        const childLen = this._getEditChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._getEditChild(edit, i);
            edit2.reset();
        }
    }
    /**
     * check current is create/update mode or not
     */
    isEditMode() {
        return (this._nowFun !== EstrFun.View);
    }
    //return {bool}
    _updateOrViewA(fun, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_me.fnUpdateOrViewA)
                return yield _me.fnUpdateOrViewA(fun, key);
            const me = this;
            const act = (fun == EstrFun.Update)
                ? 'GetUpdJson' : 'GetViewJson';
            return yield _Ajax.getJsonA(act, { key: key }, function (json) {
                me.loadJson(json);
                me.setEditStatus(fun);
                me.afterOpen(fun, json);
                _me.crudR.toEditMode(fun);
            });
        });
    }
    /**
     * get edit child
     * param edit {object} edit object
     * param childIdx {int} child index, base 0
     */
    _getEditChild(edit, childIdx) {
        return edit[_Edit.Childs][childIdx];
    }
    /**
     * get edit child len
     * param edit {object} edit object
     */
    _getEditChildLen(edit) {
        const fid = _Edit.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    }
    /**
     * getRowsByJson -> jsonGetRows
     * get rows of json
     * @param {any} json
     * @returns
     */
    jsonGetRows(json) {
        return (json == null || json[_Edit.Rows] == null)
            ? null
            : json[_Edit.Rows];
    }
    //get child json
    //_getChildJson -> getChildJson
    getChildJson(upJson, childIdx) {
        const childs = _Edit.Childs;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    }
    //get child rows
    getChildRows(upJson, childIdx) {
        const child = this.getChildJson(upJson, childIdx);
        return this.jsonGetRows(child);
    }
    /**
     * set child rows
     * param upJson {json}
     * param childIdx {int}
     * param rows {jsons}
     * return {json} child object
     */
    setChildRows(upJson, childIdx, rows) {
        const fid = _Edit.Childs;
        if (upJson == null)
            upJson = {};
        if (upJson[fid] == null)
            upJson[fid] = [];
        if (upJson[fid].length <= childIdx)
            upJson[fid][childIdx] = {};
        const child = upJson[fid][childIdx];
        child[_Edit.Rows] = rows;
        return child;
    }
    /**
     * 將目前畫面資料轉變為新資料
     */
    editToNew() {
        const fun = EstrFun.Create;
        this.setEditStatus(fun);
        this.edit0.resetKey();
        _Prog.setPath(fun);
    }
    //=== move from _edit.js start
    /**
     * get one updated row for New/Updated
     * 只讀取有異動的欄位
     * called by: EditOne.js, DbAdm MyCrud.js(使用變形的 form !!)
     * param kid {string} key fid
     * param fidTypes {id-value array}
     * param box {object} form object
     * return json row
     */
    getUpdRow(kid, fidTypes, box) {
        //case new return row
        const row = _Form.toRow(box);
        if (_Edit.isNewRow(row))
            return row;
        /*
        var key = _input.get(kid, box);
        if (_str.isEmpty(key))
            return row;
        */
        //case update: 讀取有異動的欄位
        let diff = false;
        const result = {};
        let fid, ftype, value, obj, old;
        for (let j = 0; j < fidTypes.length; j = j + 2) {
            //skip read only type
            ftype = fidTypes[j + 1];
            //if (ftype === 'link' || ftype === 'read')
            //    continue;
            fid = fidTypes[j];
            //obj = (ftype === 'radio') ? _iradio.getObj(fid, box) : _obj.get(fid, box);
            obj = _Input.getObj(fid, box, ftype);
            //value = _input.getO(obj, box, ftype);
            value = row[fid];
            old = obj.data(_Edit.DataOld);
            //if fully compare, string will not equal numeric !!
            if (value != old) {
                //date/dt old value has more length
                if ((ftype === 'date' || ftype === 'dt') &&
                    _Date.dtsToValue(value) === _Date.dtsToValue(old))
                    continue;
                result[fid] = value;
                diff = true;
            }
        }
        if (!diff)
            return null;
        result[kid] = _Input.get(kid, box);
        return result;
    }
    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string}
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    getFileSid(levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    }
    /**
     * formData set fileJson field
     * param data {formData}
     * param fileJson {json}
     * return void
     */
    dataSetFileJson(data, fileJson) {
        if (_Json.isEmpty(fileJson))
            return;
        const fid = _Edit.FileJson;
        if (data.has(fid)) {
            const json = data.get(fid);
            fileJson = _Json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    }
    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     * param key {string} row key
     */
    viewFile(table, fid, elm, key) {
        /*
        if (this.isNewKey(key)) {
            _tool.msg(_BR.NewFileNotView);
        } else {
        */
        const ext = _File.getFileExt(elm.innerText);
        if (_File.isImageExt(ext))
            _Tool.showImage(elm.innerHTML, _Str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext));
        //}
    }
    //#region remark code
    //=== move from _edit.js end
    //#endregion
    //=== event start ===
    /**
     * onclick Create button
     */
    onCreate() {
        const fun = EstrFun.Create;
        this._resetForm(this.edit0); //reset first
        this.setEditStatus(fun);
        this.afterOpen(fun, null);
    }
    /**
     * onclick Update button
     * param key {string} row key
     * return {bool}
     */
    onUpdateA(key) {
        return __awaiter(this, void 0, void 0, function* () {
            _Edit.removeIsNew(this.edit0.eform); //移除_IsNew隱藏欄位
            return yield this._updateOrViewA(EstrFun.Update, key);
        });
    }
    //return { bool }
    onViewA(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._updateOrViewA(EstrFun.View, key);
        });
    }
    /**
     * table onclick openModal button(link)
     * param btn {button}
     * param title {string} modal title
     * param fid {string} input field name
     * param required {bool}
     * param maxLen {int}
     */
    onOpenModal(title, fid, required, maxLen) {
        const tr = _Fun.getObj().closest('tr');
        _Tool.showArea(title, _IText.get(fid, tr), this.isEditMode(), function (result) {
            _IText.set(fid, result, tr);
        });
    }
    /**
     * on click save, when upload file, server side file variable is t(n)_FieldName
     * below variables are sent to backend
     * key, row(包含_childs, _deletes, _fileNo), files
     */
    onSaveA() {
        return __awaiter(this, void 0, void 0, function* () {
            //validate all input & system error(will show error msg)
            if (!this.validAll()) {
                _Tool.alert(_BR.InputWrong);
                return;
            }
            //call fnWhenSave if existed
            const edit0 = this.edit0;
            if (_Fun.hasValue(edit0.fnWhenSave)) {
                const error = edit0.fnWhenSave();
                if (_Str.notEmpty(error)) {
                    _Tool.msg(error);
                    return;
                }
            }
            //get saving row
            const formData = new FormData(); //for upload files if need
            const row = this._getUpdJson(formData);
            if (_Json.isEmpty(row)) {
                _Tool.msg(_BR.SaveNone);
                return;
            }
            //save rows, call backend Save action
            const isNew = edit0.isNewRow();
            const action = isNew ? 'Create' : 'Update';
            let data = null;
            const me = this;
            if (this._hasFile()) {
                //has files, use formData
                data = formData;
                data.append('json', _Json.toStr(row));
                if (!isNew)
                    data.append('key', edit0.getKey());
                yield _Ajax.getJsonByFdA(action, data, function (result) {
                    me.afterSave(result);
                });
            }
            else {
                //no file, use json
                data = { json: _Json.toStr(row) };
                if (!isNew)
                    data.key = edit0.getKey();
                yield _Ajax.getJsonA(action, data, function (result) {
                    me.afterSave(result);
                });
            }
        });
    }
}
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/CrudE.js.map