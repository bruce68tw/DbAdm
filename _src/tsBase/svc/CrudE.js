import _Edit from './_Edit';
import _iDate from './_iDate';
import _Valid from './_Valid';
import _Obj from './_Obj';
import _iHtml from './_iHtml';
import _Array from './_Array';
import _Str from './_Str';
import _Tool from './_Tool';
import _Fun from './_Fun';
import _Json from './_Json';
import _Ajax from './_Ajax';
import _Prog from './_Prog';
import _iText from './_iText';
import FunEstr from '../enum/FunEstr';
import EditDto from '../dto/EditDto';
import EditOne from './EditOne';
export default class CrudE {
    constructor(edits) {
        this._nowFun = '';
        this._Edits = edits;
        this._multiEdit = false;
        this._nowEditNo = 0;
        _me.crudE = this;
        if (edits && edits[0] instanceof EditDto) {
            this._multiEdit = true;
            _me.hasEdit = true;
            for (let i = 0; i < edits.length; i++) {
                const dto = edits[i];
                this._initEdit0(dto.edits);
            }
            this.mEditSetEditNo(0);
        }
        else {
            const divEdit = $('#divEdit');
            _me.hasEdit = (divEdit.length > 0 && divEdit.find('form').length > 0);
            _me.divEdit = divEdit;
            if (_me.hasEdit) {
                if (edits == null || edits.length == 0) {
                    edits = [new EditOne()];
                }
                this._initEdit0(edits);
                _me.edit0 = edits[0];
                _me.eform0 = _me.edit0.eform;
                for (let i = 1; i < edits.length; i++) {
                    if (edits[i] instanceof EditOne) {
                        edits[i].setIs1to1();
                    }
                }
            }
        }
        this._Edit0 = _me.edit0;
    }
    getEditByNo(editNo) {
        return this._Edits[editNo];
    }
    viewFileByEditNo(editNo, table, fid) {
        this._Edits[editNo].onViewFile(table, fid);
    }
    setGlobal() {
        _me.crudE = this;
        _me.edit0 = this._Edit0;
        _me.eform0 = _me.edit0.eform;
    }
    _initEdit0(edits) {
        let edit0 = edits[0];
        if (edit0 == null) {
            edit0 = new EditOne();
            edits[0] = edit0;
        }
        //const childs = _Edit.Childs;
        edit0._childs = [];
        for (let i = 1; i < edits.length; i++) {
            edit0._childs[i - 1] = edits[i];
        }
        this._initForm(edit0);
    }
    _initForm(edit) {
        if (edit.eform == null)
            return;
        _iDate.init(edit.eform);
        edit.validator = _Valid.init(edit.eform);
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            this._initForm(this._EditGetChild(edit, i));
        }
    }
    mEditGetDivEdit() {
        return this._multiEdit
            ? this._Edits[this._nowEditNo].divEdit
            : _me.divEdit;
    }
    mEditSetEditNo(editNo) {
        if (this._multiEdit) {
            this._nowEditNo = editNo;
            const dto = this._Edits[editNo];
            _me.divEdit = dto.divEdit;
            _me.edit0 = dto.edits[0];
            _me.eform0 = _me.edit0.eform;
        }
    }
    mEditGetEditNo() {
        return this._nowEditNo;
    }
    loadJson(json) {
        this._loadJson2(_me.edit0, json);
    }
    _loadJson2(edit, json) {
        const rows = _Edit.jsonGetRows(json);
        if (_Edit.isEditOne(edit)) {
            edit.loadRow(_Array.isEmpty(rows) ? null : rows[0]);
            edit.dataJson = json;
        }
        else {
            edit.loadRowsBySys(rows);
        }
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            const json2 = _Edit.getChildJson(json, i);
            this._loadJson2(edit2, json2);
        }
    }
    afterOpen(fun, json) {
        if (_me.fnAfterOpenEdit) {
            _me.fnAfterOpenEdit(fun, json);
        }
    }
    setEditStatus(fun) {
        this._nowFun = fun;
        const box = this.mEditGetDivEdit();
        const items = box.find('[data-edit]');
        _Obj.setEdit(items, false);
        if (fun == FunEstr.View) {
            _Obj.setEdit(box.find('#btnToRead'), true);
            _iHtml.setEdits(box, '', false);
        }
        else if (fun == FunEstr.Create) {
            _Obj.setEdit(items.filter('button'), true);
            const dataEdit = '[data-edit=""],[data-edit*=C]';
            _Obj.setEdit(items.filter(dataEdit), true);
            _iHtml.setEdits(box, '', true);
            _iHtml.setEdits(box, dataEdit, false);
        }
        else if (fun == FunEstr.Update) {
            _Obj.setEdit(items.filter('button'), true);
            const dataEdit = '[data-edit=""],[data-edit*=U]';
            _Obj.setEdit(items.filter(dataEdit), true);
            _iHtml.setEdits(box, '', true);
            _iHtml.setEdits(box, dataEdit, false);
        }
        box.find('span.error').remove();
    }
    _hasFile() {
        const edit = _me.edit0;
        if (edit.hasFile)
            return true;
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (edit2.hasFile)
                return true;
        }
        return false;
    }
    _getUpdJson(formData) {
        const edit0 = _me.edit0;
        const key = edit0.getKey();
        let fileJson = {};
        const dataJson = {};
        const levelStr = '0';
        if (edit0.hasFile) {
            fileJson = edit0.dataAddFiles(levelStr, formData);
        }
        this._getUpdJson2(edit0, key, levelStr, formData, fileJson, dataJson);
        let hasData = (!_Json.isEmpty(dataJson));
        if (!_Json.isEmpty(fileJson)) {
            hasData = true;
            dataJson[_Edit.FileJson] = fileJson;
        }
        if (!hasData)
            return null;
        _Json.removeNull(dataJson);
        return dataJson;
    }
    _getUpdJson2(edit, key, levelStr, formData, fileJson, dataJson) {
        if (edit.hasFile) {
            const fileJson2 = edit.dataAddFiles(levelStr, formData);
            _Json.copy(fileJson2, fileJson);
        }
        const isOne = _Edit.isEditOne(edit);
        const json = isOne
            ? edit.getUpdRow(key)
            : edit.getUpdJsonBySys(key);
        if (_Json.isEmpty(json))
            return false;
        if (isOne) {
            dataJson[_Edit.Rows] = [json];
        }
        else {
            _Json.copy(json, dataJson);
        }
        const childLen = this._EditGetChildLen(edit);
        if (childLen == 0)
            return false;
        dataJson[_Edit.Childs] = [];
        const childs = dataJson[_Edit.Childs];
        let hasChild = false;
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            const key2 = (_Edit.isEditOne(edit2)) ? edit2.getKey() : key;
            childs[i] = {};
            if (this._getUpdJson2(edit2, key2, levelStr + i, formData, fileJson, childs[i])) {
                hasChild = true;
            }
        }
        return hasChild;
    }
    validAll() {
        const edit = _me.edit0;
        if (_Str.notEmpty(edit.systemError)) {
            _Tool.msg(edit.systemError);
            return false;
        }
        if (!edit.eform.valid())
            return false;
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (_Str.notEmpty(edit2.systemError)) {
                _Tool.msg(edit2.systemError);
                return false;
            }
            if (!edit2.valid())
                return false;
        }
        return true;
    }
    afterSave(data) {
        if (_Fun.hasValue(_me.edit0.fnAfterSave)) {
            _me.edit0.fnAfterSave();
        }
        if (data.Value === '0') {
            _Tool.msg(_BR.SaveNone);
            return;
        }
        _Tool.alert(_BR.SaveOk + '(' + data.Value + ')');
        if (_me.crudR) {
            _me.crudR.dt.reload();
            _me.crudR.toReadMode();
        }
    }
    _afterSaveDraft(data) {
        if (data.Value === '0') {
            _Tool.msg(_BR.SaveNone);
            return;
        }
        _Tool.alert(_BR.SaveOk);
        if (_me.crudR) {
            _me.crudR.toReadMode();
        }
    }
    _resetForm(edit, init) {
        edit.reset(init);
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (_Edit.isEditOne(edit2)) {
                edit2.reset(init);
            }
            else {
                edit2.reset();
            }
        }
    }
    isEditMode() {
        return this._nowFun !== FunEstr.View;
    }
    async _getJsonAndEditA(fun, key) {
        if (_me.fnGetJsonAndEditA) {
            return await _me.fnGetJsonAndEditA(fun, key);
        }
        const me = this;
        const data = { key: key };
        if (this._multiEdit) {
            data.editNo = this._nowEditNo;
        }
        const act = (fun == FunEstr.Update) ? 'GetUpdJson' :
            (fun == FunEstr.Create) ? 'GetSignJson' :
                'GetViewJson';
        await _Ajax.getJsonA(act, data, function (json) {
            me.loadJsonAndEdit(json, fun);
        });
        return true;
    }
    loadJsonAndEdit(json, fun) {
        this.loadJson(json);
        this.setEditStatus(fun);
        this.afterOpen(fun, json);
        _me.crudR.toEditMode(fun);
    }
    _EditGetChild(edit, childIdx) {
        return edit._childs[childIdx];
    }
    _EditGetChildLen(edit) {
        //const fid = _Edit.Childs;
        return (edit._childs == null) ? 0 : edit._childs.length;
    }
    editToNew() {
        const fun = FunEstr.Create;
        _Prog.setPath(fun);
        this.setEditStatus(fun);
        const edit = _me.edit0;
        edit.resetKey();
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            edit2.rowsToNew();
        }
    }
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
    onCreate() {
        const fun = FunEstr.Create;
        this._resetForm(_me.edit0, true);
        this.setEditStatus(fun);
        this.afterOpen(fun, null);
    }
    async onUpdateA(key) {
        return await this._getJsonAndEditA(FunEstr.Update, key);
    }
    async onViewA(key) {
        return await this._getJsonAndEditA(FunEstr.View, key);
    }
    async onSignA(key) {
        return await this._getJsonAndEditA(FunEstr.Create, key);
    }
    async onCopyA(key) {
        if (await this._getJsonAndEditA(FunEstr.View, key)) {
            this.editToNew();
        }
    }
    onOpenModal(title, fid, required, maxLen) {
        const tr = _Fun.getMe().closest('tr');
        _Tool.showArea(title, _iText.get(fid, tr), this.isEditMode(), function (result) {
            _iText.set(fid, result, tr);
        });
    }
    async onSaveA() {
        if (!this.validAll()) {
            _Tool.alert(_BR.InputWrong);
            return;
        }
        if (_Fun.hasValue(_me.fnWhenSave)) {
            const error = _me.fnWhenSave(this._nowFun);
            if (_Str.notEmpty(error)) {
                _Tool.msg(error);
                return;
            }
        }
        const formData = new FormData();
        const json = this._getUpdJson(formData);
        if (_Json.isEmpty(json)) {
            _Tool.msg(_BR.SaveNone);
            return;
        }
        if (_Fun.hasValue(_me.fnWhenSave2)) {
            const error = _me.fnWhenSave2(this._nowFun, json);
            if (_Str.notEmpty(error)) {
                _Tool.msg(error);
                return;
            }
        }
        const edit0 = _me.edit0;
        const isNew = (this._nowFun == FunEstr.Create);
        const action = isNew ? 'Create' : 'Update';
        let data = null;
        const me = this;
        if (this._hasFile()) {
            data = formData;
            data.append('json', _Json.toStr(json));
            if (!isNew) {
                data.append('key', edit0.getKey());
            }
            if (this._multiEdit) {
                data.append('editNo', this._nowEditNo);
            }
            await _Ajax.getJsonByFdA(action, data, function (result) {
                me.afterSave(result);
            });
        }
        else {
            data = { json: _Json.toStr(json) };
            if (!isNew) {
                data.key = edit0.getKey();
            }
            if (this._multiEdit) {
                data.editNo = this._nowEditNo;
            }
            await _Ajax.getJsonA(action, data, function (result) {
                me.afterSave(result);
            });
        }
    }
    async onDraftA() {
        const formData = new FormData();
        const json = this._getUpdJson(formData);
        if (_Json.isEmpty(json)) {
            _Tool.msg(_BR.SaveNone);
            return;
        }
        const edit0 = _me.edit0;
        const action = 'Draft';
        let data = null;
        const me = this;
        if (this._hasFile()) {
            data = formData;
            data.append('json', _Json.toStr(json));
            data.append('key', edit0.getKey());
            if (this._multiEdit) {
                data.append('editNo', this._nowEditNo);
            }
            await _Ajax.getJsonByFdA(action, data, function (result) {
                me._afterSaveDraft(result);
            });
        }
        else {
            data = { json: _Json.toStr(json) };
            data.key = edit0.getKey();
            if (this._multiEdit) {
                data.editNo = this._nowEditNo;
            }
            await _Ajax.getJsonA(action, data, function (result) {
                me._afterSaveDraft(result);
            });
        }
    }
}
