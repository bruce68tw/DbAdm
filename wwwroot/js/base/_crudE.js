/**
 * crud edit function
 * _me properties:
 *   fnAfterSwap:
 *   fnAfterOpenEdit:
 *   fnUpdateOrViewA: see _updateOrViewA
 *   divEdit:
 *   hasEdit:
 *   edit0:
 *   hasChild:
 *   _nowFun:
 *   modal:
 */
var _crudE = {

    //constant with underline
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    /**
     * initial crud edit
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

        //load childs rows(只需載入第一層)
        var childLen = _crudE._getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crudE._getEditChild(edit, i);
            edit2.loadJson(_crudE._getChildJson(json, i));
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
        if (fun === _me._nowFun)
            return;

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
        var items = box.find('input, textarea, select, button');
        if (fun == _fun.FunV) {
            items.prop('disabled', true)
            box.find('#btnToRead').prop('disabled', false);
            _ihtml.setEdits(box, '', false);
        } else if (fun == _fun.FunC) {
            var dataEdit = '[data-edit=U]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        } else if (fun == _fun.FunU) {
            var dataEdit = '[data-edit=C]';
            items.prop('disabled', false)
            items.filter(dataEdit).prop('disabled', true)
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        }

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

            var childJson = edit2.getUpdJsonByCrud(key);
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
            data[_edit.FileJson] = fileJson;
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

    //get rows of json
    getRowsByJson: function (json) {
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
        return _crudE.getRowsByJson(child);
    },

    /**
     * set child rows
     * param upRow {json}
     * param childIdx {int}
     * param rows {jsons}
     * return {json} child object
     */
    setChildRows: function (upRow, childIdx, rows) {
        var fid = _crudE.Childs;
        if (upRow == null)
            upRow = {};
        if (upRow[fid] == null)
            upRow[fid] = [];
        if (upRow[fid].length <= childIdx)
            upRow[fid][childIdx] = {};

        var child = upRow[fid][childIdx];
        child[_crudE.Rows] = rows;
        return child;
    },

    //=== event start ===
    /**
     * onclick Create button
     */
    onCreate: function() {
        var fun = _fun.FunC;
        _crudE._setEditStatus(fun);
        _crudE._resetForm(_me.edit0);
        _crudE._afterOpenEdit(fun, null);
    },

    /**
     * onclick Update button
     * param key {string} row key
     * return {bool}
     */
    onUpdateA: async function(key) {
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
            //has files
            data = formData;
            data.append('json', _json.toStr(row));
            if (!isNew)
                data.append('key', edit0.getKey());

            await _ajax.getJsonByFdA(action, data, function(result) {
                _crudE.afterSave(result);
            });
        } else {
            //no files
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