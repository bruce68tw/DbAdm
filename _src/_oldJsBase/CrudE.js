/**
 * 控制 CRUD 編輯畫面, 可以有多個編輯區域
 * 說明:
 *   前端使用固定 filter: #divEdit
 *   可以單獨使用CrudE(必要時執行CrudE.setGlobal()), 例如:簽核
 * 寫入 _me 屬性:
 *   crudE
 *   divEdit
 *   hasEdit
 *   edit0 {EditOne}
 *   eform0 
 * 自動呼叫 _me 函數:
 *   void fnAfterOpenEdit(fun, json):
 *   fnUpdateOrViewA(fun, key) -> fnGetJsonAndEditA(fun, key)
 *   bool fnGetJsonAndEditA(fun, key): 自訂 GetUpdJson/GetViewJson 函數, see _getJsonAndEditA
 *   string fnWhenSave(fun): 此時還沒有產生 updated json, return error msg
 *   void fnWhenSave2(fun, json): 此時已經產生 updated json
 * 公用屬性: 無
 */
class CrudE {

    /**
     * @param edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne(), 表示多個編輯"區域"
     *   3.如果是 DtoEdit list, 表示多個編輯"畫面"
     */
    constructor(edits) {
        this._nowFun = '';    //now fun of edit0 form
        //this.updName = updName;

        //儲存edits
        this._edits = edits;

        //for _multiEdit only, 多個編輯畫面時利用這個變數來切換, 顯示Read時會重設為null
        this._multiEdit = false;
        this._nowEditNo = 0;

        //divEdit = $('#divEdit');
        //var hasEdit = (divEdit.length > 0);

        //set _me(crudE, hasEdit, divEdit(_multiEdit = false only)), 以下與 editNo 無關
        _me.crudE = this;

        //_me.divEdit = divEdit;
        //_me.hasEdit = hasEdit;

        if (edits && edits[0] instanceof DtoEdit) {
            //如果傳入 DtoEdit[], 表示有2個以上的編輯畫面, divEdit為動態讀取
            this._multiEdit = true;
            //this._edits = edits;
            _me.hasEdit = true;
            for (var i = 0; i < edits.length; i++) {
                var dto = edits[i];
                this._initEdit0(dto.edits);    //此時dto.edits不為空白
            }

            //set now edit no & _me & related variables
            this.mEditSetEditNo(0);
        } else {
            //此為一般正常情形
            var divEdit = $('#divEdit');
            //有form才算有edit, ex:簽核畫面本身沒有edit form, 但可以開啟其他功能edit畫面來簽核
            _me.hasEdit = (divEdit.length > 0 && divEdit.find('form').length > 0);
            _me.divEdit = divEdit;
            if (_me.hasEdit) {
                if (edits == null || edits.length == 0)
                    edits = [new EditOne()]
                this._initEdit0(edits);
                _me.edit0 = edits[0];
                _me.eform0 = _me.edit0.eform;

                //如果child為EditOne(1對1), 則call setIs1to1()
                for (var i = 1; i < edits.length; i++) {
                    if (edits[i] instanceof EditOne)
                        edits[i].setIs1to1();
                }
            }
        }

        this._edit0 = _me.edit0;

        //for xgOpenModal
        //this.modal = null;

        //3.initial forms(recursive)
        //_prog.init();   //prog path
    }

    /**
     * view file by edit no
     * @param {int} editNo edit no, base 0
     * @param {string} table table name
     * @param {string} fid field id
     */
    viewFileByEditNo(editNo, table, fid) {
        this._edits[editNo].onViewFile(table, fid);
    }

    //called outside
    //設定全域變數 for 外部存取
    setGlobal() {
        _me.crudE = this;
        _me.edit0 = this._edit0;
        _me.eform0 = _me.edit0.eform;
    }

    //set edits[0], Childs and initForm
    _initEdit0(edits) {
        var edit0 = edits[0];
        if (edit0 == null) {
            edit0 = new EditOne();
            edits[0] = edit0;   //必須寫回, 來源才能更新
        }

        //ary0 是master, 把2nd以後的edit寫入Childs欄位
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
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++)
            this._initForm(this._editGetChild(edit, i));
    }

    /**
     * getDivEdit -> mEditGetDivEdit
     * @returns
     */
    mEditGetDivEdit() {
        return this._multiEdit
            ? this._edits[this._nowEditNo].divEdit
            : _me.divEdit;
    }

    /**
     * setEditNo -> mEditSetEditNo
     * set now editNo, base 0
     */ 
    mEditSetEditNo(editNo) {
        if (this._multiEdit) {
            //設定 instance variables
            this._nowEditNo = editNo;

            //設定 _me 屬性
            var dto = this._edits[editNo];
            _me.divEdit = dto.divEdit;
            _me.edit0 = dto.edits[0];
            _me.eform0 = _me.edit0.eform;
        }
    }

    /**
     * getEditNo -> mEditGetEditNo
     * @returns
     */
    mEditGetEditNo() {
        return this._nowEditNo;
    }

    /**
     * _loadJson -> loadJson
     * load row(include childs) into UI
     */
    loadJson(json) {
        this._loadJson2(_me.edit0, json);
        /*
        //load master(single) row
        var edit = _me.edit0;
        edit.loadRow(_edit.jsonGetRows(json)[0]);
        edit.dataJson = json;   //for edit0 only !!

        //load childs rows(只需載入第一層)
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit, i);
            var json2 = _edit.getChildJson(json, i);
            var rows = _edit.jsonGetRows(json2);
            if (_edit.isEditOne(edit2))
                edit2.loadRow(_array.isEmpty(rows) ? null : rows[0]);
            else
                edit2.loadRowsBySys(rows);

        }
        */

        //call fnAfterLoadJson() if existed
        //if (_fun.hasValue(edit.fnAfterLoadJson))
        //    edit.fnAfterLoadJson(json);
    }

    //(recursive)called by loadJson only
    _loadJson2(edit, json) {
        //load this edit
        var rows = _edit.jsonGetRows(json);
        if (_edit.isEditOne(edit)) {
            edit.loadRow(_array.isEmpty(rows) ? null : rows[0]);
            edit.dataJson = json;   //for editOne only
        } else {
            edit.loadRowsBySys(rows);
        }

        //load childs rows
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit, i);
            var json2 = _edit.getChildJson(json, i);
            this._loadJson2(edit2, json2);
        }
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
     * 如果要讓系統自動控制, 則加上data-edit屬性
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

        var box = this.mEditGetDivEdit();
        //var items = box.find('input, textarea, select, button');
        var items = box.find('[data-edit]');    //元素有這個屬性
        _obj.setEdit(items, false);
        if (fun == EstrFun.View) {
            //_edit.removeIsNew(eform);
            //items.prop('disabled', true)
            _obj.setEdit(box.find('#btnToRead'), true);
            //box.find('#btnToRead').prop('disabled', false);
            _ihtml.setEdits(box, '', false);
        } else if (fun == EstrFun.Create) {
            //_edit.addIsNew(eform);    //增加_IsNew隱藏欄位
            _obj.setEdit(items.filter('button'), true);     //C/U不控制button
            var dataEdit = '[data-edit=""],[data-edit*=C]';
            //items.prop('disabled', true)
            _obj.setEdit(items.filter(dataEdit), true);     //正向表列
            //items.filter(dataEdit).prop('disabled', false)  //正向表列
            _ihtml.setEdits(box, '', true);
            _ihtml.setEdits(box, dataEdit, false);
        } else if (fun == EstrFun.Update) {
            //_edit.removeIsNew(eform);
            _obj.setEdit(items.filter('button'), true);     //C/U不控制button
            var dataEdit = '[data-edit=""],[data-edit*=U]';    //包含U
            //items.prop('disabled', true)
            _obj.setEdit(items.filter(dataEdit), true);     //正向表列
            //items.filter(dataEdit).prop('disabled', false)  //正向表列
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
        var edit = _me.edit0;
        if (edit.hasFile)
            return true;

        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit, i);
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
        var edit0 = _me.edit0;
        //var row = edit0.getUpdRow();
        var key = edit0.getKey();
        //var isNew = edit0.isNewRow();

        //file for master edit
        var fileJson = {};
        var dataJson = {};
        var levelStr = '0'; //string
        if (edit0.hasFile)
            fileJson = edit0.dataAddFiles(levelStr, formData); //upload files

        var hasChild = this._getUpdJson2(edit0, key, levelStr, formData, fileJson, dataJson);
        /*
        //load child(multiple) rows
        var hasChild = false;
        var childs = [];
        var childLen = this._editGetChildLen(edit0);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit0, i);

            //file
            if (edit2.hasFile) {
                var fileJson2 = edit2.dataAddFiles(levelStr + i, formData); //upload files
                _json.copy(fileJson2, fileJson);
            }

            var childJson = _edit.isEditOne(edit2)
                ? edit2.getUpdRow(key)
                : edit2.getUpdJsonBySys(key);
            if (_json.isEmpty(childJson))
                continue;

            //has child rows
            hasChild = true;
            childs[i] = childJson;
        }
        */

        var hasData = (!_json.isEmpty(dataJson));
        /*
        if (row != null) {
            hasData = true;
            data[_edit.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_edit.Childs] = childs;
        }
        */
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            dataJson[_edit.FileJson] = fileJson;
        }

        if (!hasData)
            return null;

        //if (!isNew)
        //    data.key = key;
        _json.removeNull(dataJson);
        return dataJson;
    }

    //(recursive) called by _getUpdJson only
    //注意: edit必須是EditOne, 因為可以1-1-多, 不可以1-多-多(只能人工處理) !!
    _getUpdJson2(edit, key, levelStr, formData, fileJson, dataJson) {
        //add file
        if (edit.hasFile) {
            var fileJson2 = edit.dataAddFiles(levelStr, formData); //upload files
            _json.copy(fileJson2, fileJson);
        }

        //get data json
        var isOne = _edit.isEditOne(edit);
        var json = isOne
            ? edit.getUpdRow(key)
            : edit.getUpdJsonBySys(key);
        if (_json.isEmpty(json)) return false;

        //add json, 如果是單筆要包成陣列
        if (isOne) {
            dataJson[_edit.Rows] = [json];
        } else {
            _json.copy(json, dataJson);
        }

        //has child rows
        //hasChild = true;
        //childs[i] = json;

        /*
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
        */
        var childLen = this._editGetChildLen(edit);
        if (childLen == 0) return false;

        //initial childs
        dataJson[_edit.Childs] = [];
        var childs = dataJson[_edit.Childs];

        //load child(multiple) rows
        var hasChild = false;
        //var childs = [];

        for (var i = 0; i < childLen; i++) {
            //EditMany忽略, 只能人工處理 !!
            var edit2 = this._editGetChild(edit, i);
            //如果是EditOne, 重讀key
            var key2 = (_edit.isEditOne(edit2))
                ? edit2.getKey() : key;

            //recursive !!
            childs[i] = {};
            if (this._getUpdJson2(edit2, key2, levelStr + i, formData, fileJson, childs[i]))
                hasChild = true;

            /*
            //file
            if (edit2.hasFile) {
                var fileJson2 = edit2.dataAddFiles(levelStr + i, formData); //upload files
                _json.copy(fileJson2, fileJson);
            }

            var childJson = _edit.isEditOne(edit2)
                ? edit2.getUpdRow(key)
                : edit2.getUpdJsonBySys(key);
            if (_json.isEmpty(childJson))
                continue;

            //has child rows
            hasChild = true;
            childs[i] = childJson;
            */
        }
        return hasChild;
    }

    /**
     * forms validate check, also check systemError
     * @returns {bool}
     */
    validAll() {
        //check system error
        var edit = _me.edit0;
        if (_str.notEmpty(edit.systemError)) {
            _tool.msg(edit.systemError);
            return false;
        }

        //use jquery validator
        if (!edit.eform.valid())
            return false;

        //custom valid

        //check child Edit
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            //check system error
            var edit2 = this._editGetChild(edit, i);
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
        if (_fun.hasValue(_me.edit0.fnAfterSave))
            _me.edit0.fnAfterSave();

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
     * (public) after save
     * data: ResultDto
     */
    _afterSaveDraft(data) {
        //save no rows
        if (data.Value === '0') {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //case of ok
        _tool.alert(_BR.SaveOk);

        if (_me.crudR) {
            _me.crudR.toReadMode();
        }
    }

    /**
     * (recursive)reset main form and childs
     * @param edit {EditOne}
     * @param init {bool} 是否填入初始值
     */
    _resetForm(edit, init) {
        //reset this
        edit.reset(init);

        //reset childs
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit, i);
            if (_edit.isEditOne(edit2))
                edit2.reset(init);
            else
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

    /**
     * _updateOrViewA -> _getJsonAndEditA 
     * 傳回資料 for 編輯畫面(含簽核)
     * @param {any} fun
     * @param {any} key
     * @returns {bool}
     */
    async _getJsonAndEditA(fun, key) {
        if (_me.fnGetJsonAndEditA)
            return await _me.fnGetJsonAndEditA(fun, key);

        var me = this;
        var data = { key: key };
        //如果多個編輯畫面, 傳入目前編輯序號(base 0), 後端個別method必須配合修改
        if (this._multiEdit)
            data.editNo = this._nowEditNo;
        //簽核會使用Create權限!!
        var act = (fun == EstrFun.Update) ? 'GetUpdJson' :
            (fun == EstrFun.Create) ? 'GetSignJson' :
            'GetViewJson';
        return await _ajax.getJsonA(act, data, function (json) {
            me.loadJsonAndEdit(json, fun);
            /*
            me.loadJson(json);
            me.setEditStatus(fun);
            me.afterOpen(fun, json);
            _me.crudR.toEditMode(fun);
            */
        });
    }

    /**
     * load json and edit
     * @param {json} json
     * @param {string} fun: 編輯功能U,C,V
     */
    loadJsonAndEdit(json, fun) {
        this.loadJson(json);
        this.setEditStatus(fun);
        this.afterOpen(fun, json);
        _me.crudR.toEditMode(fun);
    }

    /**
     * get edit child
     * @param {EditOne} edit - edit object
     * @param {int} childIdx - child index, base 0
     * @returns {EditOne/EditMany}
     */
    _editGetChild(edit, childIdx) {
        return edit[_edit.Childs][childIdx];
    }

    /**
     * get edit child len
     * @param edit {object} edit object
     */
    _editGetChildLen(edit) {
        var fid = _edit.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    }

    //-> _edit
    //getRowsByJson -> jsonGetRows
    //jsonGetRows(json)

    //-> _edit
    //_getChildJson -> getChildJson
    //getChildJson(upJson, childIdx)

    //-> _edit
    //getChildRows(upJson, childIdx)

    //-> _edit
    //setChildRows(upJson, childIdx, rows)

    /**
     * 將目前畫面資料轉變為新資料
     */
    editToNew() {
        var fun = EstrFun.Create;
        _prog.setPath(fun);
        this.setEditStatus(fun);

        //reset master key
        var edit = _me.edit0;
        edit.resetKey();

        //reset childs key
        var childLen = this._editGetChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = this._editGetChild(edit, i);
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
        this._resetForm(_me.edit0, true);   //reset main/child
        this.setEditStatus(fun);
        this.afterOpen(fun, null);
    }

    /**
     * onclick Update button
     * @param key {string} row key
     * @returns {bool}
     */
    async onUpdateA(key) {
        return await this._getJsonAndEditA(EstrFun.Update, key);
    }

    //return { bool }
    async onViewA(key) {
        return await this._getJsonAndEditA(EstrFun.View, key);
    }

    //簽核會使用Create權限!!
    //return { bool }
    async onSignA(key) {
        return await this._getJsonAndEditA(EstrFun.Create, key);
    }

    //return { bool }
    async onCopyA(key) {
        if (await this._getJsonAndEditA(EstrFun.View, key))
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
        var tr = _fun.getMe().closest('tr');
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
        var edit0 = _me.edit0;
        //var isNew = edit0.isNewRow();
        var isNew = (this._nowFun == EstrFun.Create);
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

    /**
     * on click draft(程式參考onSaveA)
     * below variables are sent to backend
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    async onDraftA() {
        //get saving json
        var formData = new FormData();  //for upload files if need
        var json = this._getUpdJson(formData);
        if (_json.isEmpty(json)) {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //save rows, call backend Save action
        var edit0 = _me.edit0;
        //var isNew = (this._nowFun == EstrFun.Create);
        var action = 'Draft';
        var data = null;
        var me = this;
        if (this._hasFile()) {
            //has files, use formData
            data = formData;
            data.append('json', _json.toStr(json));
            data.append('key', edit0.getKey());

            //考慮多個編輯畫面 ??
            if (this._multiEdit)
                data.append('editNo', this._nowEditNo);

            await _ajax.getJsonByFdA(action, data, function (result) {
                me._afterSaveDraft(result);
            });
        } else {
            //no file, use json
            data = { json: _json.toStr(json) };
            data.key = edit0.getKey();

            //考慮多個編輯畫面
            if (this._multiEdit)
                data.editNo = this._nowEditNo;

            await _ajax.getJsonA(action, data, function (result) {
                me._afterSaveDraft(result);
            });
        }
    }
    //=== event end ===

}//class