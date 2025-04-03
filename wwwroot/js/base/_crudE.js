/**
 * crud edit function
 *   合併 _edit.js
 * 寫入 _me properties:
 *   fnAfterSwap:
 *   fnAfterOpenEdit:
 *   fnUpdateOrViewA: see _updateOrViewA
 *   divEdit:
 *   hasEdit:
 *   edit0:
 *   eform0: 
 *   hasChild:
 *   _nowFun:
 *   modal:
 */
var _crudE = {

    //constant with underline
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    //edit form mode
    ModeBase: 'Base',
    ModeUR: 'UR',   //user role mode

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    //前後端欄位: isNew, new row flag
    IsNew: '_IsNew',

    /**
     * initial crud edit, 寫入 _me 變數
     * param1 edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * param2 updName {string} update name, default to _BR.Update
     */
    init: function(edits) {
        _me.divEdit = $('#divEdit');
        _me.hasEdit = (_me.divEdit.length > 0);
        if (_me.hasEdit) {
            var Childs = _crudE.Childs;  //constant
            var edit0 = null;  //master edit object
            if (edits == null) {
                edit0 = new EditOne();
                //_me.hasChild = false;
            } else {
                edit0 = (edits[0] === null) ? new EditOne() : edits[0];
                //_me.hasChild = edits.length > 1;
                if (edits.length > 1) {
                    edit0[Childs] = [];
                    //var childs = _me.edits._childs;
                    for (var i = 1; i < edits.length; i++)
                        edit0[Childs][i - 1] = edits[i];
                }
            }

            _me.edit0 = edit0;
            if (edit0.eform != null)
                _me.eform0 = edit0.eform;
            _me.hasChild = (_fun.hasValue(_me.edit0[Childs]) && _me.edit0[Childs].length > 0);
            //_me.editLen = _me.edits.length;
            _crudE._initForm(_me.edit0);
        }

        _me._nowFun = '';    //now fun of edit0 form
        //_me.updName = updName;

        //for xgOpenModal
        _me.modal = null;

        //3.initial forms(recursive)
        //_prog.init();   //prog path
    },

    /**
     * initial edit forms(recursive)
     * param edit {object} EditOne/EditMany object
     */
    _initForm: function(edit) {
        if (edit.eform == null)
            return;

        _idate.init(edit.eform);  //init all date inputs
        edit.validator = _valid.init(edit.eform);   //set valid variables for _ihtml.js !!
        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++)
            _crudE._initForm(_crudE._getEditChild(edit, i));
    },

    //get master edit form
    getEform0: function() {
        return _me.edit0.eform;
    },

    /*
    _getJsonAndSetMode: async function(key, fun) {
        //_crudR.toUpdateMode(key);
        var act = (fun == _fun.FunU) ? 'GetUpdJson' :
            (fun == _fun.FunV) ? 'GetViewJson' : '';
        await _ajax.getJsonA(act, { key: key }, function(data) {
            _crudR.toEditMode(fun, data);
        });
    },
     */

    /**
     * load row(include childs) into UI
     */
    _loadJson: function(json) {
        //load master(single) row
        var edit = _me.edit0;
        edit.loadRow(json);
        edit.dataJson = json;

        //load childs rows(只需載入第一層)
        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crudE._getEditChild(edit, i);
            edit2.dataJson = _crudE._getChildJson(json, i);
            edit2.loadRows(_crudE.jsonGetRows(edit2.dataJson));
        }

        //call fnAfterLoadJson() if existed
        //if (_fun.hasValue(edit.fnAfterLoadJson))
        //    edit.fnAfterLoadJson(json);
    },

    //call fnAfterOpenEdit() if existed
    // _afterOpenEdit -> _afterOpen
    _afterOpenEdit: function(fun, json) {
        if (_fun.hasValue(_me.fnAfterOpenEdit))
            _me.fnAfterOpenEdit(fun, json);
    },

    /**
     * set all forms fields edit status
     * param fun {string} C,U,V
     */ 
    _setEditStatus: function(fun) {
        //if (fun === _me._nowFun)
        //    return;

        /*
        var isView = (fun == _fun.FunV);
        var run = (isView && _me._nowFun != _fun.FunV) ? true :
            (!isView && _me._nowFun == _fun.FunV) ? true :
            false;
        */
        //set variables
        _me._nowFun = fun;
        //if (!run)
        //    return;

        var box = _me.divEdit;
        var eform = _me.edit0.eform;
        var items = box.find('input, textarea, select, button');
        if (fun == _fun.FunV) {
            _crudE.removeIsNew(eform);
            items.prop('disabled', true)
            box.find('#btnToRead').prop('disabled', false);
            _ihtml.setEdits(box, '', false);
        } else if (fun == _fun.FunC) {
            _crudE.addIsNew(eform);    //增加_IsNew隱藏欄位
            var dataEdit = '[data-edit=U]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        } else if (fun == _fun.FunU) {
            _crudE.removeIsNew(eform);
            var dataEdit = '[data-edit=C]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        }

        //remove span error
        _me.divEdit.find('span.error').remove();

        //enable btnToRead for view fun
        //if (isView)
        //    box.find('#btnToRead').prop('disabled', false);
    },

    /**
     * check has upload file or not
     */
    _hasFile: function() {
        var edit = _me.edit0;
        if (edit.hasFile)
            return true;

        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crudE._getEditChild(edit, i);
            if (edit2.hasFile)
                return true;
        }

        //case of not found
        return false;
    },

    /**
     * get updated data for save create/update(has _rows, _childs, _deletes, _fileJson)
     * param formData {FormData} for write uploaded files
     * return {json} include fileJson if existed
     */
    _getUpdJson: function(formData) {
        //load master(single) row
        var edit0 = _me.edit0;
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
        var childLen = _crudE._getEditChildLen(edit0);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crudE._getEditChild(edit0, i);

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
            data[_crudE.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_crudE.Childs] = childs;
        }
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            data[_crudE.FileJson] = fileJson;
        }

        if (!hasData)
            return null;

        //if (!isNew)
        //    data.key = key;
        _json.removeNull(data);
        return data;
    },

    /**
     * forms validate check, also check systemError
     * return {bool}
     */
    validAll: function() {
        //check system error
        var edit = _me.edit0;
        if (_str.notEmpty(edit.systemError)) {
            _tool.msg(edit.systemError);
            return false;
        }

        //validate
        if (!edit.eform.valid())
            return false;

        //check child Edit
        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            //check system error
            var edit2 = _crudE._getEditChild(edit, i);
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
    },

    /**
     * (public) after save
     * data: ResultDto
     */
    afterSave: function(data) {
        //debugger;
        //call fnAfterSave if need
        if (_fun.hasValue(_me.edit0.fnAfterSave))
            _me.edit0.fnAfterSave();

        //save no rows
        if (data.Value === '0') {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //case of ok
        _tool.alert(_BR.SaveOk + '(' + data.Value + ')');

        if (_me.hasRead) {
            _me.dt.reload();
            _crudR.toReadMode();
        }
    },

    /**
     * reset form (recursive)
     * param edit {EditOne}
     */
    _resetForm: function(edit) {
        //reset this
        edit.reset();

        //reset childs
        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crudE._getEditChild(edit, i);
            edit2.reset();
        }
    },

    /**
     * check current is create/update mode or not
     */
    isEditMode: function() {
        return (_me._nowFun !== _fun.FunV);
    },

    //return {bool}
    _updateOrViewA: async function (fun, key) {
        if (_me.fnUpdateOrViewA)
            return await _me.fnUpdateOrViewA(fun, key);

        var act = (fun == _fun.FunU)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _ajax.getJsonA(act, { key: key }, function (json) {
            _crudE._loadJson(json);
            _crudE._setEditStatus(fun);
            _crudE._afterOpenEdit(fun, json);
            _crudR.toEditMode(fun);
        });
    },


    /**
     * get edit child
     * param edit {object} edit object
     * param childIdx {int} child index, base 0
     */
    _getEditChild: function (edit, childIdx) {
        return edit[_crudE.Childs][childIdx];
    },

    /**
     * get edit child len
     * param edit {object} edit object
     */
    _getEditChildLen: function (edit) {
        var fid = _crudE.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    },

    /**
     * getRowsByJson -> jsonGetRows
     * get rows of json 
     * @param {any} json
     * @returns
     */
    jsonGetRows: function (json) {
        return (json == null || json[_crudE.Rows] == null)
            ? null
            : json[_crudE.Rows];
    },

    //get child json
    _getChildJson: function (upJson, childIdx) {
        var childs = _crudE.Childs;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    },

    //get child rows
    getChildRows: function (upJson, childIdx) {
        var child = _crudE._getChildJson(upJson, childIdx);
        return _crudE.jsonGetRows(child);
    },

    /**
     * set child rows
     * param upJson {json}
     * param childIdx {int}
     * param rows {jsons}
     * return {json} child object
     */
    setChildRows: function (upJson, childIdx, rows) {
        var fid = _crudE.Childs;
        if (upJson == null)
            upJson = {};
        if (upJson[fid] == null)
            upJson[fid] = [];
        if (upJson[fid].length <= childIdx)
            upJson[fid][childIdx] = {};

        var child = upJson[fid][childIdx];
        child[_crudE.Rows] = rows;
        return child;
    },

    /**
     * 將目前畫面資料轉變為新資料
     */
    editToNew: function () {
        var fun = _fun.FunC;
        _crudE._setEditStatus(fun);
        _me.edit0.resetKey();
        _prog.setPath(fun);
    },

    //=== move from _edit.js start
    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} jquery object
     */
    addIsNew: function (box) {
        var fid = _crudE.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val(value);
    },

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} jquery object
     */
    removeIsNew: function (box) {
        var fid = _crudE.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    },

    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string}
     */
    getOld: function (obj) {
        return obj.data(_crudE.DataOld);
    },

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
     */
    setOld: function (obj, value) {
        obj.data(_crudE.DataOld, value);
    },

    /*
    zz_loadRowByArg: function (box, row, fidTypes) {
        _form.loadRow(box, row);

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < fidTypes.length; i = i + 2) {
            fid = fidTypes[i];
            var obj = _obj.get(fid, box);
            obj.data(_crudE.DataOld, row[fid]);
        }
    },
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
    getUpdRow: function (kid, fidTypes, box) {
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
            old = obj.data(_crudE.DataOld);
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
    },

    /**
     * setFidTypeVars -> setFidTypes
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    setFidTypes: function (me, box) {
        var fidTypes = [];
        box.find(_input.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _input.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
    },

    /**
     * set file variables: fileFids, fileLen, hasFile
     * called by EditOne/EditMany init()
     * param me {edit} EditOne/EditMany variables
     * param box {object} form or row object
     * return void
     */
    setFileVars: function (me, box) {
        //var me = this;  //use outside .each()
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    getFileSid: function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    },

    /**
     * formData set fileJson field
     * param data {formData}
     * param fileJson {json}
     * return void
     */
    dataSetFileJson: function (data, fileJson) {
        if (_json.isEmpty(fileJson))
            return;

        var fid = _crudE.FileJson
        if (data.has(fid)) {
            var json = data.get(fid);
            fileJson = _json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    },

    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
     */
    isNewRow: function (row) {
        var fid = _crudE.IsNew;
        return (row[fid] != null || row[fid] == '1');
    },
    /*
    isNewKey: function (key) {
        key = key.toString();   //convert to string for checking
        var len = key.length;
        if (len >= 6)
            return false;

        var val = parseInt(key);
        return (!Number.isNaN(val) && (val.toString().length == len));
    },
    */

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     * param key {string} row key
     */
    viewFile: function (table, fid, elm, key) {
        if (_crudE.isNewKey(key)) {
            _tool.msg(_BR.NewFileNotView);
        } else {
            var ext = _file.getFileExt(elm.innerText);
            if (_file.isImageExt(ext))
                _tool.showImage(elm.innerHTML, _str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext));
        }
    },

    //#region remark code
    /**
     * get field info array by box object & row filter
     * box {object} form/div container
     * trFilter {string} (optional 'tr')
     * return json array
     */
    /*
    getFidTypesByDid: function (box, trFilter) {
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
    },
    */

    /*
    //for EditMany.js
    getFidTypesById: function (box) {
        //return _crudE._getFidTypes(box, '[id]');
        var fidTypes = [];
        box.find('[id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.attr('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    },
    */

    //=== move from _edit.js end
    //#endregion


    //=== event start ===
    /**
     * onclick Create button
     */
    onCreate: function() {
        var fun = _fun.FunC;
        _crudE._resetForm(_me.edit0);   //reset first
        _crudE._setEditStatus(fun);
        _crudE._afterOpenEdit(fun, null);
    },

    /**
     * onclick Update button
     * param key {string} row key
     * return {bool}
     */
    onUpdateA: async function(key) {
        _crudE.removeIsNew(_me.edit0.eform);    //增加_IsNew隱藏欄位
        return await _crudE._updateOrViewA(_fun.FunU, key);
    },

    //return { bool }
    onViewA: async function(key) {
        return await _crudE._updateOrViewA(_fun.FunV, key);
    },

    /**
     * table onclick openModal button(link)
     * param btn {button} 
     * param title {string} modal title
     * param fid {string} input field name
     * param required {bool}
     * param maxLen {int} 
     */
    onOpenModal: function(btn, title, fid, required, maxLen) {
        var tr = $(btn).closest('tr');
        _tool.showArea(title, _itext.get(fid, tr), _crudE.isEditMode(), function(result) {
            _itext.set(fid, result, tr);
        });
    },

    /**
     * on click save, when upload file, server side file variable is t(n)_FieldName
     * below variables are sent to backend
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    onSaveA: async function() {
        //validate all input & system error(will show error msg)
        if (!_crudE.validAll()) {
            _tool.alert(_BR.InputWrong);
            return;
        }

        //call fnWhenSave if existed
        var edit0 = _me.edit0;
        if (_fun.hasValue(edit0.fnWhenSave)) {
            var error = edit0.fnWhenSave();
            if (_str.notEmpty(error)) {
                _tool.msg(error);
                return;
            }
        }

        //get saving row
        var formData = new FormData();  //for upload files if need
        var row = _crudE._getUpdJson(formData);
        if (_json.isEmpty(row)) {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //save rows, call backend Save action
        var isNew = edit0.isNewRow();
        var action = isNew ? 'Create' : 'Update';
        var data = null;
        if (_crudE._hasFile()) {
            //has files, use formData
            data = formData;
            data.append('json', _json.toStr(row));
            if (!isNew)
                data.append('key', edit0.getKey());

            await _ajax.getJsonByFdA(action, data, function(result) {
                _crudE.afterSave(result);
            });
        } else {
            //no file, use json
            data = { json: _json.toStr(row) };
            if (!isNew)
                data.key = edit0.getKey();

            await _ajax.getJsonA(action, data, function(result) {
                _crudE.afterSave(result);
            });
        }
    },
    //=== event end ===

};//class