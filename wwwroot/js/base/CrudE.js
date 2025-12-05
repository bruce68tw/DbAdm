/**
 * 控制 CRUD 編輯畫面
 * 說明:
 *   前端使用固定 filter: #divEdit
 * 寫入 _me 屬性:
 *   crudE
 *   divEdit
 *   hasEdit
 *   edit0 {EditOne}
 *   eform0 
 * 自動呼叫 _me 函數:
 *   void fnAfterOpenEdit(fun, json):
 *   bool fnUpdateOrViewA(fun, key): 自訂 GetUpdJson/GetViewJson 函數, see _updateOrViewA
 *   string fnWhenSave(fun): 此時還沒有產生 updated json, return error msg
 *   void fnWhenSave2(fun, json): 此時已經產生 updated json
 * 公用屬性: 無
 */
class CrudE {

    /**
     * @param edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     *   3.如果是 DtoEdit list, 表示多個編輯畫面
     */
    constructor(edits) {
        this._nowFun = '';    //now fun of edit0 form
        //this.updName = updName;

        //多個編輯畫面時利用這個變數來切換, 顯示Read時會重設為null
        this._multiEdit = false;
        this._nowEditNo = 0;

        this._divEdit = $('#divEdit');
        var hasEdit = (this._divEdit.length > 0);

        //set _me, 以下與 editNo 無關
        _me.crudE = this;
        _me.hasEdit = hasEdit;

        if (hasEdit) {
            //var Childs = _edit.Childs;  //constant
            //var edit0 = null;  //master edit object
            if (edits == null) {
                edits = [new EditOne()];
            } else {
                if (edits[0] instanceof DtoEdit) {
                    //如果傳入 DtoEdit[], 表示有2個以上的編輯畫面
                    this._multiEdit = true;
                    //this._edits = edits;
                    //this.setEditNo(0);
                    for (var i = 0; i < edits.length; i++) {
                        var dto = edits[i];
                        if (dto.divEdit == null)
                            dto.divEdit = this._divEdit;
                        this._initEdit0(dto.edits);
                        /*
                        if (dto.edits[0] == null)
                            dto.edits[0] = new EditOne();
                        this._initForm(dto.edits[0]);
                        */
                    }
                } else {
                    //this._initEdit0(edits);
                    /*
                    if (edits[0] == null) {
                        edits[0] = new EditOne();
                    }
                    */
                }

                /*
                //ary0 是master, 把2nd以的edit寫入Childs欄位
                var edit0 = edits[0];
                edit0[Childs] = [];
                for (var i = 1; i < edits.length; i++)
                    edit0[Childs][i - 1] = edits[i];
                */
            }
            if (!this._multiEdit)
                this._initEdit0(edits);

            this._edits = edits;
            //this._hasChild = (_fun.hasValue(this._edit0[Childs]) && this._edit0[Childs].length > 0);
            //this.editLen = this.edits.length;
            /*
            if (!this._multiEdit) {
                this._edit0 = edits[0];
                this._initForm(this._edit0);
            }
            */

            //set now edit no & _me & related variables
            this.setEditNo(0);
        }

        //for xgOpenModal
        //this.modal = null;

        //3.initial forms(recursive)
        //_prog.init();   //prog path

        /*
        //與 editNo 有關
        if (this._multiEdit) {
            this.setEditNo(0);
        } else {
            _me.divEdit = this._divEdit;
            _me.edit0 = this._edit0;
            _me.eform0 = _me.edit0.eform;
        }
        */
    }

    //set _edit0、Childs and initForm
    _initEdit0(edits) {
        var edit0 = edits[0];
        if (edit0 == null) {
            edit0 = new EditOne();
            edits[0] = edit0;   //寫回
        }

        //set edit0.Childs
        const childs = _edit.Childs;    //fid
        edit0[childs] = [];
        for (var i = 1; i < edits.length; i++)
            edit0[childs][i - 1] = edits[i];

        this._initForm(edit0);
    }

    /**
     * (recursive)initial edit forms
     * @param edit {object} EditOne/EditMany object
     */
    _initForm(edit) {
        if (edit.eform == null) return;

        _idate.init(edit.eform);  //init all date inputs
        edit.validator = _valid.init(edit.eform);   //set valid variables for _ihtml.js !!
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++)
            this._initForm(this._getEditChild(edit, i));
    }

    getDivEdit() {
        return this._multiEdit
            ? this._edits[this._nowEditNo].divEdit || _me.divEdit
            : _me.divEdit;
    }

    /**
     * set now editNo, base 0
     */ 
    setEditNo(editNo) {
        if (this._multiEdit) {
            this._nowEditNo = editNo;

            //設定 instance variables
            var dto = this._edits[editNo];
            this._divEdit = dto.divEdit;;
            this._edit0 = dto.edits[0];
        } else {
            this._edit0 = this._edits[0];
        }

        //設定 _me 屬性
        _me.divEdit = this._divEdit;
        _me.edit0 = this._edit0;
        _me.eform0 = _me.edit0.eform;
    }

    getEditNo() {
        return this._nowEditNo;
    }

    /*
    //get master edit form
    getEform0() {
        return this._edit0.eform;
    }
    */

    /**
     * _loadJson -> loadJson
     * load row(include childs) into UI
     */
    loadJson(json) {
        //load master(single) row
        var edit = this._edit0;
        edit.loadRow(json);
        edit.dataJson = json;

        //load childs rows(只需載入第一層)
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            edit2.dataJson = this.getChildJson(json, i);
            edit2.loadRowsBySys(this.jsonGetRows(edit2.dataJson));
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
     * @param fun {string} C,U,V
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

        var box = this.getDivEdit();
        var eform = this._edit0.eform;
        var items = box.find('input, textarea, select, button');
        if (fun == EstrFun.View) {
            //_edit.removeIsNew(eform);
            items.prop('disabled', true)
            box.find('#btnToRead').prop('disabled', false);
            _ihtml.setEdits(box, '', false);
        } else if (fun == EstrFun.Create) {
            //_edit.addIsNew(eform);    //增加_IsNew隱藏欄位
            var dataEdit = '[data-edit=U]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        } else if (fun == EstrFun.Update) {
            //_edit.removeIsNew(eform);
            var dataEdit = '[data-edit=C]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        }

        //remove span error
        box.find('span.error').remove();

        //enable btnToRead for view fun
        //if (isView)
        //    box.find('#btnToRead').prop('disabled', false);
    }

    /**
     * check has upload file or not
     */
    _hasFile() {
        var edit = this._edit0;
        if (edit.hasFile)
            return true;

        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            if (edit2.hasFile)
                return true;
        }

        //case of not found
        return false;
    }

    /**
     * get updated data for save create/update(has _rows, _childs, _deletes, _fileJson)
     * @param formData {FormData} for write uploaded files
     * return {json} include fileJson if existed
     */
    _getUpdJson(formData) {
        //load master(single) row
        var edit0 = this._edit0;
        var row = edit0.getUpdRow();
        var key = edit0.getKey();
        //var isNew = edit0.isNewRow();

        //file for master edit
        var fileJson = {};
        var levelStr = '0'; //string
        if (edit0.hasFile)
            fileJson = edit0.dataAddFiles(levelStr, formData); //upload files

        //load child(multiple) rows
        var hasChild = false;
        var childs = [];
        var childLen = this._getEditChildLen(edit0);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit0, i);

            //file
            if (edit2.hasFile) {
                var fileJson2 = edit2.dataAddFiles(levelStr + i, formData); //upload files
                _json.copy(fileJson2, fileJson);
            }

            var childJson = edit2.getUpdJsonBySys(key);
            if (childJson == null)
                continue;

            //has child rows
            hasChild = true;
            childs[i] = childJson;
        }

        var data = {};
        var hasData = false;
        if (row != null) {
            hasData = true;
            data[_edit.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_edit.Childs] = childs;
        }
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            data[_edit.FileJson] = fileJson;
        }

        if (!hasData)
            return null;

        //if (!isNew)
        //    data.key = key;
        _json.removeNull(data);
        return data;
    }

    /**
     * forms validate check, also check systemError
     * @returns {bool}
     */
    validAll() {
        //check system error
        var edit = this._edit0;
        if (_str.notEmpty(edit.systemError)) {
            _tool.msg(edit.systemError);
            return false;
        }

        //validate
        if (!edit.eform.valid())
            return false;

        //check child Edit
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            //check system error
            var edit2 = this._getEditChild(edit, i);
            if (_str.notEmpty(edit2.systemError)) {
                _tool.msg(edit2.systemError);
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
        if (_fun.hasValue(this._edit0.fnAfterSave))
            this._edit0.fnAfterSave();

        //save no rows
        if (data.Value === '0') {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //case of ok
        _tool.alert(_BR.SaveOk + '(' + data.Value + ')');

        if (_me.crudR) {
            _me.crudR.dt.reload();
            _me.crudR.toReadMode();
        }
    }

    /**
     * (recursive)reset main form and childs
     * @param edit {EditOne}
     */
    _resetForm(edit) {
        //reset this
        edit.reset();

        //reset childs
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            edit2.reset();

            //如果為1對1, 把row設為新增
        }
    }

    /**
     * check current is create/update mode or not
     */
    isEditMode() {
        return (this._nowFun !== EstrFun.View);
    }

    //return {bool}
    async _updateOrViewA(fun, key) {
        if (_me.fnUpdateOrViewA)
            return await _me.fnUpdateOrViewA(fun, key);

        var me = this;
        var data = { key: key };
        //如果多個編輯畫面, 傳入目前編輯序號, 後端個別method必須配合修改
        if (this._multiEdit)
            data.editNo = this._nowEditNo;
        var act = (fun == EstrFun.Update)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _ajax.getJsonA(act, data, function (json) {
            me.loadJson(json);
            me.setEditStatus(fun);
            me.afterOpen(fun, json);
            _me.crudR.toEditMode(fun);
        });
    }


    /**
     * get edit child
     * @param {EditOne} edit - edit object
     * @param {int} childIdx - child index, base 0
     * @returns {EditMany}
     */
    _getEditChild(edit, childIdx) {
        return edit[_edit.Childs][childIdx];
    }

    /**
     * get edit child len
     * @param edit {object} edit object
     */
    _getEditChildLen(edit) {
        var fid = _edit.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    }

    /**
     * getRowsByJson -> jsonGetRows
     * get rows of json 
     * @param {any} json
     * @returns
     */
    jsonGetRows(json) {
        return (json == null || json[_edit.Rows] == null)
            ? null
            : json[_edit.Rows];
    }

    //get child json
    //_getChildJson -> getChildJson
    getChildJson(upJson, childIdx) {
        var childs = _edit.Childs;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    }

    //get child rows
    getChildRows(upJson, childIdx) {
        var child = this.getChildJson(upJson, childIdx);
        return this.jsonGetRows(child);
    }

    /**
     * set child rows
     * @param upJson {json}
     * @param childIdx {int}
     * @param rows {jsons}
     * @returns {json} child object
     */
    setChildRows(upJson, childIdx, rows) {
        var fid = _edit.Childs;
        if (upJson == null)
            upJson = {};
        if (upJson[fid] == null)
            upJson[fid] = [];
        if (upJson[fid].length <= childIdx)
            upJson[fid][childIdx] = {};

        var child = upJson[fid][childIdx];
        child[_edit.Rows] = rows;
        return child;
    }

    /**
     * 將目前畫面資料轉變為新資料
     */
    editToNew() {
        var fun = EstrFun.Create;
        _prog.setPath(fun);
        this.setEditStatus(fun);

        //reset master key
        var edit = this._edit0;
        edit.resetKey();

        //reset childs key
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            edit2.rowsToNew();
        }
    }

    //=== move from _edit.js start
    /**
     * get old value 
     * @param obj {object} input jquery object
     * @returns {string}
    getOld(obj) {
        return obj.data(_edit.DataOld);
    }
    */

    /**
     * set old value
     * @param obj {object} input jquery object
     * @param value {int/string}
    setOld(obj, value) {
        obj.data(_edit.DataOld, value);
    }
     */

    /*
    zz_loadRowByArg(box, row, fidTypes) {
        _form.loadRow(box, row);

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < fidTypes.length; i = i + 2) {
            fid = fidTypes[i];
            var obj = _obj.get(fid, box);
            obj.data(_edit.DataOld, row[fid]);
        }
    }
    */

    //move to _edit.js
    //getUpdRow(kid, fidTypes, box) { }

    //move to _edit.js
    //getFileSid(levelStr, fid) {}

    /**
     * formData set fileJson field
     * @param data {formData}
     * @param fileJson {json}
     * @returns void
     */
    dataSetFileJson(data, fileJson) {
        if (_json.isEmpty(fileJson))
            return;

        var fid = _edit.FileJson
        if (data.has(fid)) {
            var json = data.get(fid);
            fileJson = _json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    }

    //move to _edit.js
    //viewFile(table, fid, elm, key) {}

    //#region remark code
    /**
     * get field info array by box object & row filter
     * box {object} form/div container
     * trFilter {string} (optional 'tr')
     * @returns json array
     */
    /*
    getFidTypesByDid(box, trFilter) {
        //trFilter = trFilter || 'tr';
        //var trObj = box.find(trFilter + ':first');

        var fidTypes = [];
        box.find('[data-id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.data('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    }
    */

    /*
    //for EditMany.js
    getFidTypesById(box) {
        //return this._getFidTypes(box, '[id]');
        var fidTypes = [];
        box.find('[id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.attr('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    }
    */

    //=== move from _edit.js end
    //#endregion


    //=== event start ===
    /**
     * onclick Create button
     */
    onCreate() {
        var fun = EstrFun.Create;
        this._resetForm(this._edit0);   //reset main/child
        this.setEditStatus(fun);
        this.afterOpen(fun, null);
    }

    /**
     * onclick Update button
     * @param key {string} row key
     * @returns {bool}
     */
    async onUpdateA(key) {
        //_edit.removeIsNew(this._edit0.eform);    //移除_IsNew隱藏欄位
        return await this._updateOrViewA(EstrFun.Update, key);
    }

    //return { bool }
    async onViewA(key) {
        return await this._updateOrViewA(EstrFun.View, key);
    }

    //return { bool }
    async onCopyA(key) {
        if (await this._updateOrViewA(EstrFun.View, key))
            this.editToNew();
    }

    /**
     * table onclick openModal button(link)
     * @param btn {button} 
     * @param title {string} modal title
     * @param fid {string} input field name
     * @param required {bool}
     * @param maxLen {int} 
     */
    onOpenModal(title, fid, required, maxLen) {
        var tr = _fun.getMe(true).closest('tr');
        _tool.showArea(title, _itext.get(fid, tr), this.isEditMode(), function(result) {
            _itext.set(fid, result, tr);
        });
    }

    /**
     * on click save, when upload file, server side file variable is t(n)_FieldName
     * below variables are sent to backend
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    async onSaveA() {
        //validate all input & system error(will show error msg)
        if (!this.validAll()) {
            _tool.alert(_BR.InputWrong);
            return;
        }

        //call fnWhenSave if existed, 此時還沒有產生 updated json, 可以修改欄位內容
        if (_fun.hasValue(_me.fnWhenSave)) {
            var error = _me.fnWhenSave(this._nowFun);
            if (_str.notEmpty(error)) {
                _tool.msg(error);
                return;
            }
        }

        //get saving json
        var formData = new FormData();  //for upload files if need
        var json = this._getUpdJson(formData);
        if (_json.isEmpty(json)) {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //call fnWhenSave2 if existed, 此時已經產生 updated json
        if (_fun.hasValue(_me.fnWhenSave2)) {
            var error = _me.fnWhenSave2(this._nowFun, json);
            if (_str.notEmpty(error)) {
                _tool.msg(error);
                return;
            }
        }

        //save rows, call backend Save action
        var edit0 = this._edit0;
        var isNew = edit0.isNewRow();
        var action = isNew ? 'Create' : 'Update';
        var data = null;
        var me = this;
        if (this._hasFile()) {
            //has files, use formData
            data = formData;
            data.append('json', _json.toStr(json));
            if (!isNew)
                data.append('key', edit0.getKey());
            //考慮多個編輯畫面
            if (this._multiEdit)
                data.append('editNo', this._nowEditNo);

            await _ajax.getJsonByFdA(action, data, function(result) {
                me.afterSave(result);
            });
        } else {
            //no file, use json
            data = { json: _json.toStr(json) };
            if (!isNew)
                data.key = edit0.getKey();
            //考慮多個編輯畫面
            if (this._multiEdit)
                data.editNo = this._nowEditNo;

            await _ajax.getJsonA(action, data, function(result) {
                me.afterSave(result);
            });
        }
    }
    //=== event end ===

}//class