/**
 * 改為非靜態類別, 控制 CRUD 查詢(含編輯)畫面
 * 說明:
 *   允許不同編輯畫面共用查詢畫面, 參考 Crud/Read.cshtml
 *   前端使用固定 filter: #divRead、#formRead、#formRead2、#tableRead
 *   後端固定呼叫 GetPage action
 * 寫入 _me 屬性:
 *   crudR
 *   divRead
 *   hasRead
 *   rform
 *   rform2
 * 自動呼叫 _me 函數:
 *   fnAfterFind(result):
 *   void fnAfterSwap(toRead):
 * 公用屬性:
 *   rform
 *   rform2
 *   dt
 */
class CrudR {

    /**
     * initial crud read & edit
     * @param dtConfig {Object} datatables config
     * @param edits {EditOne/EditMany Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * @param updName {string} update name, default to _BR.Update
     */
    //this._init = function(dtConfig, edits, updName) {
    constructor(dtConfig, edits, updName) {

        //save middle variables
        this.temp = {};

        //1.set instance variables
        this.divRead = $('#divRead');
        var rform = null;
        var rform2 = null;
        var hasRead = (this.divRead.length > 0);
        if (hasRead) {
            rform = $('#formRead');
            if (rform.length === 0)
                rform = null;
            rform2 = $('#formRead2');
            if (rform2.length === 0)
                rform2 = null;
            if (rform != null)
                _idate.init(rform);
            if (rform2 != null)
                _idate.init(rform2);

            //4.Create Datatable object
            //傳入 _me.fnAfterFind if any !!
            if (_var.notEmpty(dtConfig)) {
                this.dt = new Datatable('#tableRead', 'GetPage', dtConfig, this._getFindCond(), null, null, _me.fnAfterFind || null);
            }
        }

        this._edits = edits;
        this._updName = updName;

        //2.init edit
        new CrudE(edits);

        //3.initial forms(recursive)
        _prog.init();   //prog path

        //set _me
        _me.crudR = this;
        _me.rform = rform;
        _me.rform2 = rform2;
        _me.hasRead = hasRead;
        _me.divRead = this.divRead;
    }

    /**
     * onclick viewFile
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    viewFile(table, fid, key, fileName) {
        var ext = _file.getFileExt(fileName);
        if (_file.isImageExt(ext))
            _tool.showImage(fileName, _str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext));
    }

    /**
     * button html string
     * @param id {string}
     * @param label {string}
     * @param fnOnclick {string}
     * @param fnArgs {string} 多個時逗號分隔
     * @returns button html string
     */ 
    dtBtn(id, label, fnOnclick) {
        return `<button type="button" class="btn btn-outline-secondary btn-sm" data-onclick="${fnOnclick}" data-args="${id}">${label}</button>`;
    }

    /**
     * checkbox for multiple select
     * @param value {string} [1] checkbox value
     * @param editable {bool} [true]
     * //param fid {string} [_icheck.Check0Id] data-fid value
     */
    dtCheck0(value, editable) {
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = "data-fid='" + _icheck.Check0Id + "'" +
            " data-value='" + value + "'";
        if (editable === false)
            attr += ' readonly';
        //if (checked)
        //    attr += ' checked';

        //x-no-label for checked sign position
        return "" +
            "<label class='xi-check x-no-label'>" +
            "   <input " + attr + " type='checkbox'>" +
            "   <span class='xi-cspan'></span>" +
            "</label>";
    }

    //??
    dtRadio1(value, editable) {
        if (editable === undefined)
            editable = true;
        return _iradio.render(_icheck.Check0Id, '', false, value, editable);
    }

    /**
     * set status column(checkbox)
     * @param value {string} checkbox value, will translate to bool
     * @param fnOnClick {string} onclick function, default to this.onSetStatusA
     */
    dtSetStatus(key, value, fnOnClick) {
        //TODO: pending
        return '';

        /*
        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(fnOnClick)) {
            fnOnClick = `_me.crudR.onSetStatusA(this,\'{0}\')`, key);
        }
        //??
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
        */
    }

    dtStatusName(value) {
        return (value == '1')
            ? '<span>' + _BR.StatusYes + '</span>'
            : '<span class="text-danger">' + _BR.StatusNo + '</span>';
    }

    dtYesEmpty(value) {
        return (value == '1') ? _BR.Yes : '';
    }

    //顯示紅色
    dtRed(text, status) {
        return status
            ? '<span class="text-danger">' + text + '</span>'
            : '<span>' + text + '</span>';
    }

    /**
     * !! change link to button
     * 取消參數 fnOnUpdate, fnOnDelete, fnOnView
     * crud functions: update,delete,view
     * @param key {string} row key
     * @param rowName {string} for show row name before delete
     * @param hasUpdate {bool} has update icon or not
     * @param hasDelete {bool} has delete icon or not
     * @param hasView {bool} has view icon or not
     */
    //dtCrudFun(key, rowName, hasUpdate, hasDelete, hasView, fnOnUpdate, fnOnDelete, fnOnView) {
    dtCrudFun(key, rowName, hasUpdate, hasDelete, hasView, hasCopy) {
        var funs = '';
        if (hasUpdate)
            funs += `<button type="button" class="btn btn-link" data-onclick="_me.crudE.onUpdateA" data-args="${key}"><i class="ico-pen" title="${_BR.TipUpdate}"></i></button>`;
        if (hasDelete)
            funs += `<button type="button" class="btn btn-link" data-onclick="_me.crudR.onDeleteA" data-args="${key},${rowName}"><i class="ico-delete" title="${_BR.TipDelete}"></i></button>`;
        if (hasView)
            funs += `<button type="button" class="btn btn-link" data-onclick="_me.crudE.onViewA" data-args="${key}"><i class="ico-eye" title="${_BR.TipView}"></i></button>`;
        if (hasCopy)
            funs += `<button type="button" class="btn btn-link" data-onclick="_me.crudE.onCopyA" data-args="${key}"><i class="ico-copy" title="${_BR.TipCopy}"></i></button>`;
        return funs;
    }

    /**
     * get Find condition
     */
    _getFindCond() {
        if (_me.rform == null)
            return null;

        var row = _form.toRow(_me.rform);
        var find2 = _me.rform2;
        if (find2 !== null && _obj.isShow(find2))
            _json.copy(_form.toRow(find2), row);
        return row;
    }

    /**
     * 移除參數 nowDiv, fnCallback
     * change newDiv to active
     * @param toRead {bool} show divRead or not
     * //param nowDiv {object} (default _me.divEdit) now div to show
     * //param fnCallback {function} (optional) callback function
     */
    swap(toRead) {
        if (!_me.hasRead || !_me.hasEdit) {
            //if (fnCallback)
            //    fnCallback();
            return;
        }

        /*
        var isDefault = _var.isEmpty(nowDiv);
        if (isDefault)
            nowDiv = _me.divEdit;
        */

        //考慮多個編輯畫面
        var divEdit = _me.crudE.mEditGetDivEdit();
        var oldDiv, newDiv;
        if (toRead) {
            oldDiv = divEdit;
            newDiv = this.divRead;
        } else {
            oldDiv = this.divRead;
            newDiv = divEdit;
        }

        oldDiv.addClass('x-off');
        setTimeout(() => {
            oldDiv.addClass('d-none').removeClass('x-off');
            newDiv.removeClass('d-none').addClass('x-on');

            setTimeout(() => {
                newDiv.removeClass('x-on');
                //if (fnCallback) fnCallback();
            }, 500);
        }, 200);

        if (_me.fnAfterSwap)
            _me.fnAfterSwap(toRead);

        //還原 nowEditNo
        if (toRead)
            _me.crudE.mEditSetEditNo(0);

        /*
        // fadeOut 用 d-none 隱藏
        oldDiv.animate({ opacity: 0 }, 200, function () {
            oldDiv.addClass('d-none').css('opacity', 1);  // 動畫結束後隱藏並還原透明度

            // fadeIn 用 d-none 顯示
            newDiv.removeClass('d-none').css('opacity', 0).animate({ opacity: 1 }, 500);

            if (fnCallback)
                fnCallback();
        });
        */

        /*
        newDiv.fadeIn(500, function () {
            //debugger;
            oldDiv.fadeOut(200);
        });
        
        if (toRead) {
            //nowDiv.fadeOut(200);
            //this.divRead.fadeIn(500);
        } else {
            //this.divRead.fadeOut(200);
            //nowDiv.fadeIn(500);
        }
        */
        //if (isDefault)
            //this._afterSwap(toRead);
    }

    /**
     * 移除參數 fnCallback
     * to edit(U/V) mode
     * XpFlowSign Read.cshtml 待處理!! 
     * @param {any} fun
     * //param {any} fnCallback
     */
    //toEditMode = function(fun, data) {
    toEditMode(fun) {
        this.swap(false);  //call first
        _prog.setPath(fun, this._updName);
    }

    /**
     * back to list form
     */
    toReadMode() {
        //_obj.show(this.divReadTool);
        _prog.resetPath();
        this.swap(true);
    }

    /**
     * call fnAfterSwap if existed
     * @param toRead {bool} to read mode or not
     */
    /*
    _afterSwap(toRead) {
        if (_me.fnAfterSwap)
            _me.fnAfterSwap(toRead);
    }
    */

    //=== event start ===
    /**
     * onclick find rows
     */
    onFind() {
        var cond = this._getFindCond();
        this.dt.find(cond);
    }

    /**
     * onclick find2 button for show/hide find2 form
     */
    onFind2() {
        var find2 = _me.rform2;
        if (find2 == null)
            return;
        else if (_obj.isShow(find2))
            _form.hideShow([find2]);
        else
            _form.hideShow(null, [find2]);
    }

    /**
     * onclick reset find form
     */
    onResetFind() {
        _form.reset(_me.rform);
        if (_me.rform2 != null)
            _form.reset(_me.rform2);
    }

    /**
     * onClick export excel button
     */
    onExport() {
        var find = this._getFindCond();
        window.location = 'Export?find=' + _json.toStr(find);
    }

    /**
     * onclick toRead button
     */
    onToRead() {
        this.toReadMode();
    }

    /**
     * onclick Create button
     */
    onCreate() {
        //var fun = EstrFun.Create;
        //this.swap(false);  //call first
        //_prog.setPath(fun);
        _me.crudE.onCreate();
        this.toEditMode(EstrFun.Create);
    }

    /**
     * call _me.crudE
     * onclick Update button
     * @param key {string} row key
     */
    /*
    async onUpdateA(key) {
        //_me.crudE._getJsonAndSetMode(key, EstrFun.Update);
        //this.toEditMode(EstrFun.Update);
        await _me.crudE.onUpdateA(key);
    }
    */

    /**
     * call _me.crudE
     * onclick View button
     * @param key {string} row key
     */
    /*
    async onViewA(key) {
        //_me.crudE._getJsonAndSetMode(key, EstrFun.View);
        await _me.crudE.onViewA(key);
        //this.toEditMode(EstrFun.View);
    }
    */

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    async onSetStatusA(me, key) {
        var status = _icheck.isCheckedO($(me));
        await _ajax.getStrA('SetStatus', { key: key, status: status }, function(msg) {
            _tool.alert(_BR.UpdateOk);
        });
    }

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * @param me {string} row key
     * @param box {string} row key
     * @param fid {string} fid
     */
    //onCheckAll(me, box, fid) {
    onCheckAll(me, box) {
        _icheck.setF(_input.fidFilter(_icheck.Check0Id) + ':not(:disabled)', _icheck.isCheckedO($(me)), box);
    }

    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    async onDeleteA(key, rowName) {
        //_temp.data = { key: key }
        var me = this;
        _tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', async function () {
            await _ajax.getJsonA('Delete', { key: key }, function(msg) {
                _tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    }

    /**
     * TODO: need test
     * 移除參數 fid
     * no called
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string} 
     */
    //async onDeleteRowsA(box, fid) {
    async onDeleteRowsA(box) {
        //get selected keys
        var keys = _icheck.getCheckeds(box);
        if (keys.length === 0) {
            _tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        //_temp.data = { keys: keys }
        var me = this;
        _tool.ans(_BR.SureDeleteSelected, async function() {
            await _ajax.getStrA('DeleteByKeys', { keys: keys }, function(msg) {
                _tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    }
    //=== event end ===

    //call last
    //this._init();

}//class