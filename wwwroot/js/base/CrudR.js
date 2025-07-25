/**
 * 改為非靜態類別
 * trigger _me.fnAfterFind(result) if any
 * crud read function
 * main for admin Web system
 * this properties:
 *   //divEdit
 *   divRead
 *   //hasRead
 *   rform
 *   rform2
 *   dt
 *   _updName
*/
function CrudR(dtConfig, edits, updName) {

    /**
     * save middle variables
     */
    this.temp = {};


    /**
     * default datatable layout
     * toolbar layout:l(length),f(filter),r(processing),t(table),i(info),p(page)
     */
    //dtDom: '<"toolbar">t<li>p',

    /**
     * default datatable column define
     
    dtColDef: {
        className: 'xg-center',
        orderable: false,
        targets: '_all',
    },
    */

    /**
     * initial crud read & edit
     * param1 dtConfig {Object} datatables config
     * param2 edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * param3 updName {string} update name, default to _BR.Update
     */
    //this._init = function (dtConfig, edits, updName) {
    this._init = function () {

        //1.set instance variables
        this.divRead = $('#divRead');
        var hasRead = (this.divRead.length > 0);
        if (hasRead) {
            this.rform = $('#formRead');
            if (this.rform.length === 0)
                this.rform = null;
            this.rform2 = $('#formRead2');
            if (this.rform2.length === 0)
                this.rform2 = null;
            if (this.rform != null)
                _idate.init(this.rform);
            if (this.rform2 != null)
                _idate.init(this.rform2);

            //4.Create Datatable object
            //傳入 _me.fnAfterFind if any !!
            if (_var.notEmpty(dtConfig)) {
                this.dt = new Datatable('#tableRead', 'GetPage', dtConfig, this._getFindCond(), null, null, _me.fnAfterFind || null);
            }
        }

        this._updName = updName;

        //2.init edit
        new CrudE(edits);

        //3.initial forms(recursive)
        _prog.init();   //prog path

        //set _me
        _me.crudR = this;
        _me.hasRead = hasRead;
        _me.divRead = this.divRead;
    };

    /**
     * checkbox for multiple select
     * param value {string} [1] checkbox value
     * param editable {bool} [true]
     * //param fid {string} [_icheck.Check0Id] data-fid value
     */
    this.dtCheck0 = function(value, editable) {
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = "data-fid='" + _icheck.Check0Id + "'" +
            " data-value='" + value + "'";
        if (editable === false)
            attr += ' readonly';
        //if (checked)
        //    attr += ' checked';

        //xg-no-label for checked sign position
        return "" +
            "<label class='xi-check xg-no-label'>" +
            "   <input " + attr + " type='checkbox'>" +
            "   <span class='xi-cspan'></span>" +
            "</label>";
    };
    /*
    this.dtCheck0 = function (value, editable, fid) {
        if (editable === undefined)
            editable = true;
        fid = fid || _icheck.Check0Id;
        return _icheck.render2(0, fid, value, false, '', editable);
    };
    */

    //??
    this.dtRadio1 = function (value, editable) {
        if (editable === undefined)
            editable = true;
        return _iradio.render(_icheck.Check0Id, '', false, value, editable);
    };

    /**
     * set status column(checkbox)
     * param value {string} checkbox value, will translate to bool
     * param fnOnClick {string} onclick function, default to this.onSetStatusA
     */
    this.dtSetStatus = function (key, value, fnOnClick) {
        //TODO: pending
        return '';

        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(fnOnClick)) {
            fnOnClick = _str.format("_me.crudR.onSetStatusA(this,\'{0}\')", key);
        }
        //??
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
    };

    this.dtStatusName = function (value) {
        return (value == '1')
            ? '<span>' + _BR.StatusYes + '</span>'
            : '<span class="text-danger">' + _BR.StatusNo + '</span>';
    };

    this.dtYesEmpty = function (value) {
        return (value == '1') ? _BR.Yes : '';
    };

    //顯示紅色
    this.dtRed = function (text, status) {
        return status
            ? '<span class="text-danger">' + text + '</span>'
            : '<span>' + text + '</span>';
    };

    /**
     * !! change link to button
     * crud functions: update,delete,view
     * param key {string} row key
     * param rowName {string} for show row name before delete
     * param hasUpdate {bool} has update icon or not
     * param hasDelete {bool} has delete icon or not
     * param hasView {bool} has view icon or not
     */
    this.dtCrudFun = function (key, rowName, hasUpdate, hasDelete, hasView,
        fnOnUpdate, fnOnDelete, fnOnView) {
        var funs = '';
        if (hasUpdate)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-pen" title="{2}"></i></button>', ((fnOnUpdate == null) ? '_me.crudR.onUpdateA' : fnOnUpdate), key, _BR.TipUpdate);
        if (hasDelete)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\',\'{2}\')"><i class="ico-delete" title="{3}"></i></button>', ((fnOnDelete == null) ? '_me.crudR.onDeleteA' : fnOnDelete), key, rowName, _BR.TipDelete);
        if (hasView)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-eye" title="{2}"></i></button>', ((fnOnView == null) ? '_me.crudR.onViewA' : fnOnView), key, _BR.TipView);
        return funs;
    };

    /**
     * get Find condition
     */
    this._getFindCond = function () {
        if (this.rform == null)
            return null;

        var row = _form.toRow(this.rform);
        var find2 = this.rform2;
        if (find2 !== null && _obj.isShow(find2))
            _json.copy(_form.toRow(find2), row);
        return row;
    };

    /**
     * change newDiv to active
     * param toRead {bool} show divRead or not
     * param nowDiv {object} (default _me.divEdit) now div to show
     * param fnCallback {function} (optional) callback function
     */
    this.swap = function (toRead, nowDiv, fnCallback) {
        if (!_me.hasRead || !_me.hasEdit) {
            if (fnCallback)
                fnCallback();
            return;
        }

        var isDefault = _var.isEmpty(nowDiv);
        if (isDefault)
            nowDiv = _me.divEdit;

        var oldDiv, newDiv;
        if (toRead) {
            oldDiv = nowDiv;
            newDiv = this.divRead;
        } else {
            oldDiv = this.divRead;
            newDiv = nowDiv;
        }

        /*
        if (_obj.isShow(oldDiv)) {
            oldDiv.fadeToggle(200);
            newDiv.fadeToggle(500);
        }
        */
        oldDiv.fadeOut(200, function () {
            newDiv.fadeIn(500);
            if (fnCallback)
                fnCallback();
        });
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
        if (isDefault)
            this._afterSwap(toRead);
    };

    //XpFlowSign Read.cshtml 待處理!!
    //to edit(U/V) mode
    //toEditMode = function(fun, data) {
    this.toEditMode = function (fun, fnCallback) {
        this.swap(false, null, fnCallback);  //call first
        _prog.setPath(fun, this._updName);
    };

    /**
     * back to list form
     */
    this.toReadMode = function () {
        //this.divReadTool.show();
        _prog.resetPath();
        this.swap(true);
    };

    /**
     * call fnAfterSwap if existed
     * param toRead {bool} to read mode or not
     */
    this._afterSwap = function (toRead) {
        if (_me.fnAfterSwap)
            _me.fnAfterSwap(toRead);
    };


    //=== event start ===
    /**
     * onclick find rows
     */
    this.onFind = function () {
        var cond = this._getFindCond();
        this.dt.find(cond);
    };

    /**
     * onclick find2 button for show/hide find2 form
     */
    this.onFind2 = function () {
        var find2 = this.rform2;
        if (find2 == null)
            return;
        else if (_obj.isShow(find2))
            _form.hideShow([find2]);
        else
            _form.hideShow(null, [find2]);
    };

    /**
     * onclick reset find form
     */
    this.onResetFind = function () {
        _form.reset(this.rform);
        if (this.rform2 != null)
            _form.reset(this.rform2);
    };

    /**
     * onClick export excel button
     */
    this.onExport = function () {
        var find = this._getFindCond();
        window.location = 'Export?find=' + _json.toStr(find);
    };

    /**
     * onclick toRead button
     */
    this.onToRead = function () {
        this.toReadMode();
    };

    /**
     * onclick Create button
     */
    this.onCreate = function () {
        //var fun = _fun.FunC;
        //this.swap(false);  //call first
        //_prog.setPath(fun);
        _me.crudE.onCreate();
        this.toEditMode(_fun.FunC);
    };

    /**
     * onclick Update button
     * param key {string} row key
     */
    this.onUpdateA = async function (key) {
        //_me.crudE._getJsonAndSetMode(key, _fun.FunU);
        //this.toEditMode(_fun.FunU);
        await _me.crudE.onUpdateA(key);
    };

    /**
     * onclick View button
     * param key {string} row key
     */
    this.onViewA = async function (key) {
        //_me.crudE._getJsonAndSetMode(key, _fun.FunV);
        await _me.crudE.onViewA(key);
        //this.toEditMode(_fun.FunV);
    };

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    this.onSetStatusA = async function (me, key) {
        var status = _icheck.checkedO($(me));
        await _ajax.getStrA('SetStatus', { key: key, status: status }, function (msg) {
            _tool.alert(_BR.UpdateOk);
        });
    };

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * param me {string} row key
     * param box {string} row key
     * param fid {string} fid
     */
    this.onCheckAll = function (me, box, fid) {
        _icheck.setF(_input.fidFilter(fid) + ':not(:disabled)', _icheck.checkedO($(me)), box);
    };

    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    this.onDeleteA  = async function (key, rowName) {
        //_temp.data = { key: key };
        var me = this;
        _tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', async function () {
            await _ajax.getJsonA('Delete', { key: key }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    };

    /**
     * TODO: need test
     * no called
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string} 
     */
    this.onDeleteRowsA = async function (box, fid) {
        //get selected keys
        var keys = _icheck.getCheckeds(box, fid);
        if (keys.length === 0) {
            _tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        //_temp.data = { keys: keys };
        var me = this;
        _tool.ans(_BR.SureDeleteSelected, async function () {
            await _ajax.getStrA('DeleteByKeys', { keys: keys }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    };
    //=== event end ===

    //call last
    this._init();

}//class