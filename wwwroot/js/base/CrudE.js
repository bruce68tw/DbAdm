/**
 * crud edit function
 *   合併 _edit.js
 * 寫入 this properties:
 *   fnAfterSwap:
 *   fnAfterOpenEdit:
 *   fnUpdateOrViewA: see _updateOrViewA
 *   divEdit:
 *   //hasEdit:
 *   edit0:
 *   eform0: 
 *   hasChild:
 *   _nowFun:
 *   modal:
 */
function CrudE(edits) {

    //constant with underline
    this.Rows = '_rows';
    this.Childs = '_childs';
    this.Deletes = '_deletes';

    /*
    //edit form mode
    this.ModeBase = 'Base';
    this.ModeUR = 'UR';   //user role mode

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    this.FileJson = '_fileJson';

    //data property name for keep old value
    this.DataOld = '_old';

    //前後端欄位: isNew, new row flag
    this.IsNew = '_IsNew';
    */

    /**
     * initial crud edit, 寫入 this 變數
     * param1 edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * param2 updName {string} update name, default to _BR.Update
     */
    this._init = function() {
        this.divEdit = $('#divEdit');
        var hasEdit = (this.divEdit.length > 0);
        if (hasEdit) {
            var Childs = this.Childs;  //constant
            var edit0 = null;  //master edit object
            if (edits == null) {
                edit0 = new EditOne();
                //this.hasChild = false;
            } else {
                edit0 = (edits[0] === null) ? new EditOne() : edits[0];
                //this.hasChild = edits.length > 1;
                if (edits.length > 1) {
                    edit0[Childs] = [];
                    //var childs = this.edits._childs;
                    for (var i = 1; i < edits.length; i++)
                        edit0[Childs][i - 1] = edits[i];
                }
            }

            this.edit0 = edit0;
            if (edit0.eform != null)
                this.eform0 = edit0.eform;
            this.hasChild = (_fun.hasValue(this.edit0[Childs]) && this.edit0[Childs].length > 0);
            //this.editLen = this.edits.length;
            this._initForm(this.edit0);
        }

        this._nowFun = '';    //now fun of edit0 form
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
    };

    /**
     * initial edit forms(recursive)
     * param edit {object} EditOne/EditMany object
     */
    this._initForm = function(edit) {
        if (edit.eform == null)
            return;

        _idate.init(edit.eform);  //init all date inputs
        edit.validator = _valid.init(edit.eform);   //set valid variables for _ihtml.js !!
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++)
            this._initForm(this._getEditChild(edit, i));
    };

    //get master edit form
    this.getEform0 = function() {
        return this.edit0.eform;
    };

    /*
    _getJsonAndSetMode = async function(key, fun) {
        //_me.crudR.toUpdateMode(key);
        var act = (fun == _fun.FunU) ? 'GetUpdJson' :
            (fun == _fun.FunV) ? 'GetViewJson' : '';
        await _ajax.getJsonA(act, { key: key }, function(data) {
            _me.crudR.toEditMode(fun, data);
        });
    };
     */

    /**
     * load row(include childs) into UI
     */
    this._loadJson = function(json) {
        //load master(single) row
        var edit = this.edit0;
        edit.loadRow(json);
        edit.dataJson = json;

        //load childs rows(只需載入第一層)
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            edit2.dataJson = this._getChildJson(json, i);
            edit2.loadRows(this.jsonGetRows(edit2.dataJson));
        }

        //call fnAfterLoadJson() if existed
        //if (_fun.hasValue(edit.fnAfterLoadJson))
        //    edit.fnAfterLoadJson(json);
    };

    //call fnAfterOpenEdit() if existed
    // _afterOpenEdit -> _afterOpen
    this._afterOpenEdit = function(fun, json) {
        if (_fun.hasValue(_me.fnAfterOpenEdit))
            _me.fnAfterOpenEdit(fun, json);
    };

    /**
     * set all forms fields edit status
     * param fun {string} C,U,V
     */ 
    this._setEditStatus = function(fun) {
        //if (fun === this._nowFun)
        //    return;

        /*
        var isView = (fun == _fun.FunV);
        var run = (isView && this._nowFun != _fun.FunV) ? true :
            (!isView && this._nowFun == _fun.FunV) ? true :
            false;
        */
        //set variables
        this._nowFun = fun;
        //if (!run)
        //    return;

        var box = this.divEdit;
        var eform = this.edit0.eform;
        var items = box.find('input, textarea, select, button');
        if (fun == _fun.FunV) {
            _edit.removeIsNew(eform);
            items.prop('disabled', true)
            box.find('#btnToRead').prop('disabled', false);
            _ihtml.setEdits(box, '', false);
        } else if (fun == _fun.FunC) {
            _edit.addIsNew(eform);    //增加_IsNew隱藏欄位
            var dataEdit = '[data-edit=U]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        } else if (fun == _fun.FunU) {
            _edit.removeIsNew(eform);
            var dataEdit = '[data-edit=C]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        }

        //remove span error
        this.divEdit.find('span.error').remove();

        //enable btnToRead for view fun
        //if (isView)
        //    box.find('#btnToRead').prop('disabled', false);
    };

    /**
     * check has upload file or not
     */
    this._hasFile = function() {
        var edit = this.edit0;
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
    };

    /**
     * get updated data for save create/update(has _rows, _childs, _deletes, _fileJson)
     * param formData {FormData} for write uploaded files
     * return {json} include fileJson if existed
     */
    this._getUpdJson = function(formData) {
        //load master(single) row
        var edit0 = this.edit0;
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
                var fileJson2 = edit2.dataAddFiles(levelStr + i, formData, edit2.rowsBox); //upload files
                _json.copy(fileJson2, fileJson);
            }

            var childJson = edit2.getUpdJson(key);
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
            data[this.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[this.Childs] = childs;
        }
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            data[this.FileJson] = fileJson;
        }

        if (!hasData)
            return null;

        //if (!isNew)
        //    data.key = key;
        _json.removeNull(data);
        return data;
    };

    /**
     * forms validate check, also check systemError
     * return {bool}
     */
    this.validAll = function() {
        //check system error
        var edit = this.edit0;
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
    };

    /**
     * (public) after save
     * data: ResultDto
     */
    this.afterSave = function(data) {
        //debugger;
        //call fnAfterSave if need
        if (_fun.hasValue(this.edit0.fnAfterSave))
            this.edit0.fnAfterSave();

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
    };

    /**
     * reset form (recursive)
     * param edit {EditOne}
     */
    this._resetForm = function(edit) {
        //reset this
        edit.reset();

        //reset childs
        var childLen = this._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._getEditChild(edit, i);
            edit2.reset();
        }
    };

    /**
     * check current is create/update mode or not
     */
    this.isEditMode = function() {
        return (this._nowFun !== _fun.FunV);
    };

    //return {bool}
    this._updateOrViewA = async function (fun, key) {
        if (_me.fnUpdateOrViewA)
            return await _me.fnUpdateOrViewA(fun, key);

        var me = this;
        var act = (fun == _fun.FunU)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _ajax.getJsonA(act, { key: key }, function (json) {
            me._loadJson(json);
            me._setEditStatus(fun);
            me._afterOpenEdit(fun, json);
            _me.crudR.toEditMode(fun);
        });
    };


    /**
     * get edit child
     * param edit {object} edit object
     * param childIdx {int} child index, base 0
     */
    this._getEditChild = function (edit, childIdx) {
        return edit[this.Childs][childIdx];
    };

    /**
     * get edit child len
     * param edit {object} edit object
     */
    this._getEditChildLen = function (edit) {
        var fid = this.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    };

    /**
     * getRowsByJson -> jsonGetRows
     * get rows of json 
     * @param {any} json
     * @returns
     */
    this.jsonGetRows = function (json) {
        return (json == null || json[this.Rows] == null)
            ? null
            : json[this.Rows];
    };

    //get child json
    this._getChildJson = function (upJson, childIdx) {
        var childs = this.Childs;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    };

    //get child rows
    this.getChildRows = function (upJson, childIdx) {
        var child = this._getChildJson(upJson, childIdx);
        return this.jsonGetRows(child);
    };

    /**
     * set child rows
     * param upJson {json}
     * param childIdx {int}
     * param rows {jsons}
     * return {json} child object
     */
    this.setChildRows = function (upJson, childIdx, rows) {
        var fid = this.Childs;
        if (upJson == null)
            upJson = {};
        if (upJson[fid] == null)
            upJson[fid] = [];
        if (upJson[fid].length <= childIdx)
            upJson[fid][childIdx] = {};

        var child = upJson[fid][childIdx];
        child[this.Rows] = rows;
        return child;
    };

    /**
     * 將目前畫面資料轉變為新資料
     */
    this.editToNew = function () {
        var fun = _fun.FunC;
        this._setEditStatus(fun);
        this.edit0.resetKey();
        _prog.setPath(fun);
    };

    //=== move from _edit.js start
    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string}
    this.getOld = function (obj) {
        return obj.data(this.DataOld);
    };
    */

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
    this.setOld = function (obj, value) {
        obj.data(this.DataOld, value);
    };
     */

    /*
    zz_loadRowByArg = function (box, row, fidTypes) {
        _form.loadRow(box, row);

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < fidTypes.length; i = i + 2) {
            fid = fidTypes[i];
            var obj = _obj.get(fid, box);
            obj.data(this.DataOld, row[fid]);
        }
    };
    */

    /**
     * get one updated row for New/Updated
     * 只讀取有異動的欄位
     * called by: EditOne.js, DbAdm MyCrud.js(使用變形的 form !!)
     * param kid {string} key fid
     * param fidTypes {id-value array}
     * param box {object} form object
     * return json row
     */
    this.getUpdRow = function (kid, fidTypes, box) {
        //if key empty then return row
        var row = _form.toRow(box);
        var key = _input.get(kid, box);
        if (_str.isEmpty(key))
            return row;

        //讀取有異動的欄位
        var diff = false;
        var result = {};
        var fid, ftype, value, obj, old;
        for (var j = 0; j < fidTypes.length; j = j + 2) {
            //skip read only type
            ftype = fidTypes[j + 1];
            //if (ftype === 'link' || ftype === 'read')
            //    continue;

            fid = fidTypes[j];
            //obj = (ftype === 'radio') ? _iradio.getObj(fid, box) : _obj.get(fid, box);
            obj = _input.getObj(fid, box, ftype);
            //value = _input.getO(obj, box, ftype);
            value = row[fid];
            old = obj.data(this.DataOld);
            //if fully compare, string will not equal numeric !!
            if (value != old) {
                //date/dt old value has more length
                if ((ftype === 'date' || ftype === 'dt') &&
                    _date.dtsToValue(value) === _date.dtsToValue(old))
                    continue;

                result[fid] = value;
                diff = true;
            }
        }
        if (!diff)
            return null;

        result[kid] = key;
        return result;
    };

    /**
     * setFidTypeVars -> setFidTypes
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container
     * return void
    this.setFidTypes = function (me, box) {
        var fidTypes = [];
        box.find(_input.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _input.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
    };
     */

    /**
     * set file variables: fileFids, fileLen, hasFile
     * called by EditOne/EditMany init()
     * param me {edit} EditOne/EditMany variables
     * param box {object} form or row object
     * return void
    this.setFileVars = function (me, box) {
        //var me = this;  //use outside .each()
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    };
     */

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    this.getFileSid = function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    };

    /**
     * formData set fileJson field
     * param data {formData}
     * param fileJson {json}
     * return void
     */
    this.dataSetFileJson = function (data, fileJson) {
        if (_json.isEmpty(fileJson))
            return;

        var fid = this.FileJson
        if (data.has(fid)) {
            var json = data.get(fid);
            fileJson = _json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    };

    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
    this.isNewRow = function (row) {
        var fid = this.IsNew;
        return (row[fid] != null || row[fid] == '1');
    };
     */

    /*
    this.isNewKey = function (key) {
        key = key.toString();   //convert to string for checking
        var len = key.length;
        if (len >= 6)
            return false;

        var val = parseInt(key);
        return (!Number.isNaN(val) && (val.toString().length == len));
    };
    */

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     * param key {string} row key
     */
    this.viewFile = function (table, fid, elm, key) {
        /*
        if (this.isNewKey(key)) {
            _tool.msg(_BR.NewFileNotView);
        } else {
        */
            var ext = _file.getFileExt(elm.innerText);
            if (_file.isImageExt(ext))
                _tool.showImage(elm.innerHTML, _str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext));
        //}
    };

    //#region remark code
    /**
     * get field info array by box object & row filter
     * box {object} form/div container
     * trFilter {string} (optional 'tr')
     * return json array
     */
    /*
    getFidTypesByDid = function (box, trFilter) {
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
    };
    */

    /*
    //for EditMany.js
    getFidTypesById = function (box) {
        //return this._getFidTypes(box, '[id]');
        var fidTypes = [];
        box.find('[id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.attr('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    };
    */

    //=== move from _edit.js end
    //#endregion


    //=== event start ===
    /**
     * onclick Create button
     */
    this.onCreate = function() {
        var fun = _fun.FunC;
        this._resetForm(this.edit0);   //reset first
        this._setEditStatus(fun);
        this._afterOpenEdit(fun, null);
    };

    /**
     * onclick Update button
     * param key {string} row key
     * return {bool}
     */
    this.onUpdateA = async function(key) {
        _edit.removeIsNew(this.edit0.eform);    //增加_IsNew隱藏欄位
        return await this._updateOrViewA(_fun.FunU, key);
    };

    //return { bool }
    this.onViewA = async function(key) {
        return await this._updateOrViewA(_fun.FunV, key);
    };

    /**
     * table onclick openModal button(link)
     * param btn {button} 
     * param title {string} modal title
     * param fid {string} input field name
     * param required {bool}
     * param maxLen {int} 
     */
    this.onOpenModal = function(btn, title, fid, required, maxLen) {
        var tr = $(btn).closest('tr');
        _tool.showArea(title, _itext.get(fid, tr), this.isEditMode(), function(result) {
            _itext.set(fid, result, tr);
        });
    };

    /**
     * on click save, when upload file, server side file variable is t(n)_FieldName
     * below variables are sent to backend
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    this.onSaveA = async function() {
        //validate all input & system error(will show error msg)
        if (!this.validAll()) {
            _tool.alert(_BR.InputWrong);
            return;
        }

        //call fnWhenSave if existed
        var edit0 = this.edit0;
        if (_fun.hasValue(edit0.fnWhenSave)) {
            var error = edit0.fnWhenSave();
            if (_str.notEmpty(error)) {
                _tool.msg(error);
                return;
            }
        }

        //get saving row
        var formData = new FormData();  //for upload files if need
        var row = this._getUpdJson(formData);
        if (_json.isEmpty(row)) {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //save rows, call backend Save action
        var isNew = edit0.isNewRow();
        var action = isNew ? 'Create' : 'Update';
        var data = null;
        var me = this;
        if (this._hasFile()) {
            //has files, use formData
            data = formData;
            data.append('json', _json.toStr(row));
            if (!isNew)
                data.append('key', edit0.getKey());

            await _ajax.getJsonByFdA(action, data, function(result) {
                me.afterSave(result);
            });
        } else {
            //no file, use json
            data = { json: _json.toStr(row) };
            if (!isNew)
                data.key = edit0.getKey();

            await _ajax.getJsonA(action, data, function(result) {
                me.afterSave(result);
            });
        }
    };
    //=== event end ===

    //call last
    this._init();

}//class