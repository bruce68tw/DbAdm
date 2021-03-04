/**
 * note:
 *   1.reserved function:
 *     a.fnAfterSwap(readMode): called after _crud.swap()
 */
var _crud = {

    //constant
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    /**
     * save middle variables
     */
    temp: {},

    //=== jQuery datatables(dt) start ===
    /**
     * datatable layout
     */
    dtDom: '<"toolbar">t<li>p',

    /**
     * datatable column config
     */ 
    dtColConfig: {
        className: 'xg-center',
        orderable: false,
        targets: '_all',
    },

    /**
     * checkbox for multiple select
     * param value {string} checkbox value
     * param editable {bool} (optional true)
     * param fid {string} (optional '_check1') data-fid value
     */
    dtCheck0: function (value, editable, fid) {
        if (editable === undefined)
            editable = true;
        fid = fid || _icheck.check0Id;
        return _icheck.render2(0, fid, value, false, '', editable);
    },

    //??
    dtRadio1: function (value, editable) {
        if (editable === undefined)
            editable = true;
        return _iradio.render(_icheck.check0Id, '', false, value, editable);
    },

    /**
     * set status column(checkbox)
     * param value {string} checkbox value, will translate to bool
     * param fnOnClick {string} onclick function, default to _crud.onSetStatus
     */ 
    dtSetStatus: function (key, value, fnOnClick) {
        //TODO: pending
        return '';

        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(fnOnClick)) {
            fnOnClick = _str.format("_crud.onSetStatus(this,\'{0}\')", key);
        }
        //??
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
    },

    /**
     * !! change link to button
     * crud functions: update,delete,view
     * param key {string} row key
     * param rowName {string} for show row name before delete
     * param hasUpdate {bool} has update icon or not
     * param hasDelete {bool} has delete icon or not
     * param hasView {bool} has view icon or not
     */
    dtCrudFun: function (key, rowName, hasUpdate, hasDelete, hasView,
        fnOnUpdate, fnOnDelete, fnOnView) {
        var funs = '';
        if (hasUpdate)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-pen" title="{2}"></i></button>', ((fnOnUpdate == null) ? '_crud.onUpdate' : fnOnUpdate), key, _BR.TipUpdate);
        if (hasDelete)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="_crud.onDelete(\'{1}\',\'{2}\')"><i class="ico-delete" title="{3}"></i></button>', ((fnOnDelete == null) ? '_crud.onDelete' : fnOnDelete), key, rowName, _BR.TipDelete);
        if (hasView)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="_crud.onView(\'{1}\')"><i class="ico-eye" title="{2}"></i></button>', ((fnOnView == null) ? '_crud.onView' : fnOnView), key, _BR.TipView);
        return funs;
    },
    //=== jQuery datatables end ===    

    /**
     * initial, 傳入簡化的edits[]
     * dtConfig {Object} datatables config
     * edits {Array} 維護畫面設定{object},
     *   1.null: 表示單一table, 固定捉取eform
     *   2.多個edit object, 如果第一個陣列為null, 則使用new EditOne()
     */
    init: function (dtConfig, edits) {
        //set _me.edits[]
        var Childs = _crud.Childs;  //constant
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

        //set variables
        //_me.row = null; //edit0時從後端傳回
        _me.nowFun = '';    //now fun of edit0 form
        _me.divRead = $('#divRead');
        //_me.divReadTool = $('#divReadTool');
        _me.divEdit = $('#divEdit');
        _me.rform = $('#rform');
        _me.rform2 = $('#rform2');
        if (_me.rform2.length === 0)
            _me.rform2 = null;
        //_me.eform = $('#eform');

        _me.edit0 = edit0;
        _me.hasChild = (_fun.notNull(_me.edit0[Childs]) && _me.edit0[Childs].length > 0);
        //_me.editLen = _me.edits.length;

        //initial forms(recursive)
        _crud.initForm(_me.edit0);

        //for xgOpenModal
        _me.modal = null;

        //table div id固定為 table1, 後端固定呼叫 GetPage
        _me.dt = new Datatable('#table1', 'GetPage', dtConfig);
        _prog.init();   //prog path
    },

    //initial forms(recursive)
    initForm: function (edit) {
        if (edit.eform == null)
            return;

        _idate.init('', edit.eform);  //init 日期欄位(所有欄位)
        _valid.init(edit.eform);
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++)
            _crud.initForm(_crud.getEditChild(edit, i));
    },

    /**
     * get master edit form
     */
    getEform0: function () {
        return _me.edit0.eform;
    },

    /**
     * get Find condition
     */
    getFindCond: function () {
        var row = _form.toJson(_me.rform);
        var find2 = _me.rform2;
        if (find2 !== null && _obj.isShow(find2))
            _json.copy(_form.toJson(find2), row);
        return row;
    },

    /**
     * change newDiv to active
     * param newDiv {object} jquery object
     */ 
    swap: function (toRead) {
        var oldDiv, newDiv;
        if (toRead) {
            oldDiv = _me.divEdit;
            newDiv = _me.divRead;
        } else {
            oldDiv = _me.divRead;
            newDiv = _me.divEdit;
        }

        if (_obj.isShow(oldDiv)) {
            oldDiv.fadeToggle(200);
            newDiv.fadeToggle(500);
        }
        _crud._afterSwap(toRead);
    },

    //=== event start ===
    /**
     * onclick find rows
     */
    onFind: function () {
        var cond = _crud.getFindCond();
        _me.dt.find(cond);
    },

    /**
     * expand find2 form
     */
    onFind2: function () {
        //$('.xg-find-form').slideToggle();
        var find2 = _me.rform2;
        if (find2 == null)
            return;
        else if (_obj.isShow(find2))
            _form.hideShow([find2]);
        else
            _form.hideShow(null, [find2]);

    },

    /**
     * onclick export excel
     */
    onExport: function () {
        var cond = _crud.getFindCond();
        window.location = 'Export?cond=' + _json.toStr(cond);
    },

    /**
     * onclick toRead button
     */
    onToRead: function () {
        _crud.toReadMode();
    },

    /**
     * onclick Create button
     */
    onCreate: function () {
        var fun = _fun.FunC;
        _prog.setPath(fun);
        _crud.setEditStatus(fun);
        _crud.resetForm(_me.edit0);
        _crud.swap(false);        
    },

    /**
     * onclick Update button
     * param key {string} row key
     */
    onUpdate: function (key) {
        _crud.getJsonAndSetMode(key, _fun.FunU);
    },

    /**
     * onclick View button
     * param key {string} row key
     */
    onView: function (key) {
        _crud.getJsonAndSetMode(key, _fun.FunV);
    },

    getJsonAndSetMode: function (key, funType) {
        if (_str.isEmpty(key)) {
            _log.error('error: key is empty !');
            return;
        }

        //_crud.toUpdateMode(key);
        _ajax.getJson('GetJson', { key: key }, function (data) {
            //to edit(U/V) mode
            //_me.key = key;
            _prog.setPath(funType);
            _crud.setEditStatus(funType);
            _crud.swap(false);
            _crud.loadJson(data);
        });
    },

    //set edit form status
    //fun: C,U,V
    setEditStatus: function (fun) {
        var isView = (fun == _fun.FunV);
        var run = (_me.nowFun == _fun.FunV && !isView) ? true :
            (_me.nowFun != _fun.FunV && isView) ? true :
                false;

        //set variables
        _me.nowFun = fun;

        if (run) {
            var div = _me.divEdit;
            div.find('input, textarea, select, button').prop('disabled', isView);
            if (isView)
                div.find('#btnToRead').prop('disabled', false);
            //div.find('input', '').prop('disabled', isView); //for selected
        }
    },

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {string} checkbox element
     * key {string} row key
     */
    onSetStatus: function (me, key) {
        var status = _icheck.checkedO($(me));
        _ajax.getStr('SetStatus', { key: key, status: status }, function (msg) {
            _tool.alert(_BR.UpdateOk);
        });
    },

    /**
     * load row(include childs) into UI
     * will call fnAfterLoadJson() 
     */
    loadJson: function (json) {
        //load master(single) row
        var edit = _me.edit0;
        edit.loadRow(json);

        //load childs rows(只需載入第一層)
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            //_crud.loadChildJson(edit2, _crud.getChildJsonByUp(rowJson, i));
            edit2.loadJson(_crud.getChildJson(json, i));
        }

        //call fnAfterLoadJson() if existed
        if (_fun.notNull(edit.fnAfterLoadJson))
            edit.fnAfterLoadJson(json);
    },

    /**
     * load childs rows into UI(recursive)
     * will call fnLoadJson()
     */
    /*
    loadChild: function (edit, rows) {
        //check rows
        //var rows = _crud.getJsonRows(rowJson);  //??
        if (rows == null)
            return;

        //load this
        edit.loadRows(rows);

        //load childs
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            _crud.loadChild(edit2, _crud.getChildJsonByUp(rowJson, i));
        }
    },
    */

    /**
     * check has upload file or not
     */
    hasFile: function () {
        var edit = _me.edit0;
        if (edit.hasFile)
            return true;

        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
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
    getUpdJson: function (formData) {
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
        var childLen = _crud.getEditChildLen(edit0);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit0, i);

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
            data[_crud.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_crud.Childs] = childs;
        }
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            data[_edit.FileJson] = fileJson;
        }

        if (!hasData)
            return null;

        //if (!isNew)
        //    data.key = key;
        _crud._removeNull(0, data);
        return data;
    },

    //傳入edit
    getEditChildLen: function (edit) {
        var fid = _crud.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length; 
    },
    //傳入edit
    getEditChild: function (edit, childIdx) {
        return edit[_crud.Childs][childIdx];
    },

    //get json rows
    getJsonRows: function (json) {
        return (json == null || json[_crud.Rows] == null)
            ? null
            : json[_crud.Rows];
    },

    //get child json
    getChildJson: function (upJson, childIdx) {
        var childs = _crud.Childs;
        return (upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    },

    //get child json rows
    getChildRows: function (upJson, childIdx) {
        var child = _crud.getChildJson(upJson, childIdx);
        return _crud.getJsonRows(child);
    },

    /**
     * set child rows
     * param upRow {json}
     * param childIdx {int}
     * param rows {jsons}
     * return {json} child object
     */ 
    setChildRows: function (upRow, childIdx, rows) {
        var fid = _crud.Childs;
        if (upRow == null)
            upRow = {};
        if (upRow[fid] == null)
            upRow[fid] = [];
        if (upRow[fid].length <= childIdx)
            upRow[fid][childIdx] = {};
        var child = upRow[fid][childIdx];
        child[_crud.Rows] = rows;
        return child;
    },

    /**
     * forms validate check
     * return {bool}
     */ 
    validAll: function () {
        var edit = _me.edit0;
        if (!edit.eform.valid())
            return false;

        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            if (!edit2.valid())
                return false;
        }

        //case of ok
        return true;
    },

    /**
     * (recursive) childs validate check
     * return {bool}
     */
    /*
    validChild: function (edit) {
        //valid this
        if (!edit.valid())
            return false;

        //valid childs
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            if (!_crud.validChild(_crud.getEditChild(edit, i)))
                return false;
        }

        //case of ok
        return true;
    },
    */

    /**
     * on click save, 有上傳檔案時, 後端參數名稱固定為T(n)+FieldName
     * 傳送到後端的資料包含以下欄位:  
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    onSave: function () {
        //check input
        if (!_crud.validAll()) {
            _tool.alert(_BR.InputWrong);
            return;
        }

        //call fnWhenSave if existed
        var edit0 = _me.edit0;
        if (_fun.notNull(edit0.fnWhenSave)) {
            var error = edit0.fnWhenSave();
            if (error != '') {
                _tool.msg(error);
                return;
            }
        }

        //debugger;
        //get saving row
        var formData = new FormData();  //for upload files if need
        var row = _crud.getUpdJson(formData);

        //temp add
        //return;

        //save rows, call backend Save action
        var isNew = edit0.isNewRow();
        var action = isNew ? 'Create' : 'Update';
        var data = null;
        if (_crud.hasFile()) {
            //has files
            data = formData;
            data.append('json', _json.toStr(row));
            if (!isNew)
                data.append('key', edit0.getKey());

            _ajax.getJsonByFormData(action, data, function (result) {
                _crud.afterSave(result);
            });
        } else {
            //no files
            data = { json: _json.toStr(row) };
            if (!isNew)
                data.key = edit0.getKey();

            _ajax.getJson(action, data, function (result) {
                _crud.afterSave(result);
            });
        }
    },

    //recursive remove null
    //level: for debug
    _removeNull: function (level, obj) {
        //debugger;
        $.each(obj, function (key, value) {
            if (value === null) {
                //null才需要清除, 空白不必 !!
                delete obj[key];
            } else if (_json.isKeyValue(value)) {
                _crud._removeNull(level+1, value);
            } else if ($.isArray(value)) {
                $.each(value, function (k, v) {
                    _crud._removeNull(level + 1, v);

                    if (_json.isEmpty(v))
                        v = null;
                });
                var isEmpty = true;
                var len = value.length;
                //從陣列後面開始處理
                for (var i=len - 1; i>=0; i--) {
                    if (!_json.isEmpty(value[i])) {
                        isEmpty = false;
                    } else if (isEmpty) {
                        //刪除陣列元素
                        delete value[i];
                    } else {
                        value[i] = null;
                    }
                }
                if (isEmpty)
                    delete obj[key];
            /*
            } else {
                if (key.substr(0, 2) === '__')
                    delete obj[key];
            */
            }
        });
    },

    /**
     * 展開查詢畫面的額外欄位
     * data: ResultDto
     */
    afterSave: function (data) {
        //debugger;
        //call fnAfterSave if need
        if (_fun.notNull(_me.edit0.fnAfterSave))
            _me.edit0.fnAfterSave();

        //save no rows
        if (data.Value === '0') {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //case of ok
        //var start = _me.dt.dt.page.info().start;
        _tool.alert(_BR.SaveOk + '(' + data.Value + ')');
        _me.dt.reload();
        _crud.toReadMode();
    },

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * param me {string} row key
     * param box {string} row key
     * param fid {string} fid
     */
    onCheckAll: function (me, box, fid) {
        _icheck.setF(_fun.getFidFilter(fid) + ':not(:disabled)', _icheck.checkedO($(me)), box);
    },

    /**
     * click Delete, 刪除一筆資料, 後端固定呼叫 Delete()
     * key {string} row key
     * rowName {string} 資料列名稱
     */
    onDelete: function (key, rowName) {
        _crud.temp.data = { key: key };
        _tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', function () {
            _ajax.getStr('Delete', { key: key }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },

    /**
     * TODO: need test
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * dataFid {string} row key
     */
    onDeleteRows: function (box, dataFid) {
        //get selected keys
        var keys = _icheck.getCheckedValues(box, dataFid);
        if (keys.length === 0) {
            _tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        _crud.temp.data = { keys: keys };
        _tool.ans(_BR.SureDeleteSelected, function () {
            _ajax.getStr('DeleteByKeys', _crud.temp.data, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },

    /**
     * table onclick openModal button(link)
     * param btn {button} 
     * param title {string} modal title
     * param fid {string} input field name
     * param required {bool}
     * param maxLen {int} 
     */ 
    onOpenModal: function (btn, title, fid, required, maxLen) {
        var tr = $(btn).closest('tr');
        _tool.showArea(title, _itext.get(fid, tr), _crud.isEditMode(), function (result) {
            _itext.set(fid, result, tr);
        });
    },
    //=== event end ===

    /**
     * reset form (recursive)
     * param edit {EditOne}
     */ 
    resetForm: function (edit) {
        //reset this
        edit.reset();

        //reset childs
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            edit2.reset();
        }
    },

    /**
     * back to list form
     */
    toReadMode: function () {
        //_me.divReadTool.show();
        _prog.resetPath();
        _crud.swap(true);
    },

    _afterSwap: function (toRead) {
        if (_me.fnAfterSwap !== undefined)
            _me.fnAfterSwap(toRead);
    },

    /**
     * check current is fun view or not
     */ 
    isEditMode: function () {
        return (_me.nowFun !== _fun.FunV);
    },

};//class