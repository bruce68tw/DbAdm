/**
 * crud read function
 * main for admin Web system
 */
var _crudR = {

    /**
     * save middle variables
     */
    temp: {},

    /**
     * default datatable layout
     * toolbar layout:l(length),f(filter),r(processing),t(table),i(info),p(page)
     */
    dtDom: '<"toolbar">t<li>p',

    /**
     * default datatable column define
     */
    dtColDef: {
        className: 'xg-center',
        orderable: false,
        targets: '_all',
    },

    /**
     * checkbox for multiple select
     * param value {string} [1] checkbox value
     * param editable {bool} [true]
     * //param fid {string} [_icheck.Check0Id] data-fid value
     */
    dtCheck0: function (value, editable) {
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
    },
    /*
    dtCheck0: function (value, editable, fid) {
        if (editable === undefined)
            editable = true;
        fid = fid || _icheck.Check0Id;
        return _icheck.render2(0, fid, value, false, '', editable);
    },
    */

    //??
    dtRadio1: function (value, editable) {
        if (editable === undefined)
            editable = true;
        return _iradio.render(_icheck.Check0Id, '', false, value, editable);
    },

    /**
     * set status column(checkbox)
     * param value {string} checkbox value, will translate to bool
     * param fnOnClick {string} onclick function, default to _crudR.onSetStatus
     */
    dtSetStatus: function (key, value, fnOnClick) {
        //TODO: pending
        return '';

        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(fnOnClick)) {
            fnOnClick = _str.format("_crudR.onSetStatus(this,\'{0}\')", key);
        }
        //??
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
    },

    dtStatusName: function (value) {
        return (value == '1')
            ? '<span>' + _BR.StatusYes + '</span>'
            : '<span class="text-danger">' + _BR.StatusNo + '</span>';
    },

    dtYesEmpty: function (value) {
        return (value == '1') ? _BR.Yes : '';
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
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-pen" title="{2}"></i></button>', ((fnOnUpdate == null) ? '_crudR.onUpdate' : fnOnUpdate), key, _BR.TipUpdate);
        if (hasDelete)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\',\'{2}\')"><i class="ico-delete" title="{3}"></i></button>', ((fnOnDelete == null) ? '_crudR.onDelete' : fnOnDelete), key, rowName, _BR.TipDelete);
        if (hasView)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-eye" title="{2}"></i></button>', ((fnOnView == null) ? '_crudR.onView' : fnOnView), key, _BR.TipView);
        return funs;
    },

    /**
     * initial crud read & edit
     * param1 dtConfig {Object} datatables config
     * param2 edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * param3 updName {string} update name, default to _BR.Update
     */
    init: function (dtConfig, edits, updName) {

        //1.set instance variables
        _me.divRead = $('#divRead');
        _me.hasRead = (_me.divRead.length > 0);
        if (_me.hasRead) {
            _me.rform = $('#formRead');
            if (_me.rform.length === 0)
                _me.rform = null;
            _me.rform2 = $('#formRead2');
            if (_me.rform2.length === 0)
                _me.rform2 = null;
            if (_me.rform != null)
                _idate.init(_me.rform);
            if (_me.rform2 != null)
                _idate.init(_me.rform2);

            //4.Create Datatable object
            if (_var.notEmpty(dtConfig)) {
                _me.dt = new Datatable('#tableRead', 'GetPage', dtConfig, _crudR._getFindCond());
            }
        }

        _me._updName = updName;

        //2.init edit
        _crudE.init(edits);

        //3.initial forms(recursive)
        _prog.init();   //prog path
    },

    /**
     * get Find condition
     */
    _getFindCond: function () {
        if (_me.rform == null)
            return null;

        var row = _form.toJson(_me.rform);
        var find2 = _me.rform2;
        if (find2 !== null && _obj.isShow(find2))
            _json.copy(_form.toJson(find2), row);
        return row;
    },

    /**
     * change newDiv to active
     * param toRead {bool} show divRead or not
     * param nowDiv {object} (default _me.divEdit) now div to show
     */
    swap: function (toRead, nowDiv) {
        if (!_me.hasRead || !_me.hasEdit)
            return;

        var isDefault = _var.isEmpty(nowDiv);
        if (isDefault)
            nowDiv = _me.divEdit;

        var oldDiv, newDiv;
        if (toRead) {
            oldDiv = nowDiv;
            newDiv = _me.divRead;
        } else {
            oldDiv = _me.divRead;
            newDiv = nowDiv;
        }

        if (_obj.isShow(oldDiv)) {
            oldDiv.fadeToggle(200);
            newDiv.fadeToggle(500);
        }

        if (isDefault)
            _crudR._afterSwap(toRead);
    },

    //XpFlowSign Read.cshtml 待處理!!
    //to edit(U/V) mode
    //toEditMode: function(fun, data) {
    toEditMode: function (fun) {
        _crudR.swap(false);  //call first
        _prog.setPath(fun, _me._updName);
    },

    /**
     * back to list form
     */
    toReadMode: function () {
        //_me.divReadTool.show();
        _prog.resetPath();
        _crudR.swap(true);
    },

    /**
     * call fnAfterSwap if existed
     * param toRead {bool} to read mode or not
     */
    _afterSwap: function (toRead) {
        var edit = _me.edit0;
        if (_fun.hasValue(edit.fnAfterSwap))
            edit.fnAfterSwap(toRead);
    },


    //=== event start ===
    /**
     * onclick find rows
     */
    onFind: function () {
        var cond = _crudR._getFindCond();
        _me.dt.find(cond);
    },

    /**
     * onclick find2 button for show/hide find2 form
     */
    onFind2: function () {
        var find2 = _me.rform2;
        if (find2 == null)
            return;
        else if (_obj.isShow(find2))
            _form.hideShow([find2]);
        else
            _form.hideShow(null, [find2]);
    },

    /**
     * onclick reset find form
     */
    onResetFind: function () {
        _form.reset(_me.rform);
        if (_me.rform2 != null)
            _form.reset(_me.rform2);
    },

    /**
     * onClick export excel button
     */
    onExport: function () {
        var find = _crudR._getFindCond();
        window.location = 'Export?find=' + _json.toStr(find);
    },

    /**
     * onclick toRead button
     */
    onToRead: function () {
        _crudR.toReadMode();
    },

    /**
     * onclick Create button
     */
    onCreate: function () {
        //var fun = _fun.FunC;
        //_crudR.swap(false);  //call first
        //_prog.setPath(fun);
        _crudE.onCreate();
        _crudR.toEditMode(_fun.FunC);
    },

    /**
     * onclick Update button
     * param key {string} row key
     */
    onUpdate: function (key) {
        //_crudE._getJsonAndSetMode(key, _fun.FunU);
        _crudE.onUpdate(key);
        _crudR.toEditMode(_fun.FunU);
    },

    /**
     * onclick View button
     * param key {string} row key
     */
    onView: function (key) {
        //_crudE._getJsonAndSetMode(key, _fun.FunV);
        _crudE.onView(key);
        _crudR.toEditMode(_fun.FunV);
    },

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    onSetStatus: function (me, key) {
        var status = _icheck.checkedO($(me));
        _ajax.getStr('SetStatus', { key: key, status: status }, function (msg) {
            _tool.alert(_BR.UpdateOk);
        });
    },

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * param me {string} row key
     * param box {string} row key
     * param fid {string} fid
     */
    onCheckAll: function (me, box, fid) {
        _icheck.setF(_fun.fidFilter(fid) + ':not(:disabled)', _icheck.checkedO($(me)), box);
    },

    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    onDelete: function (key, rowName) {
        //_temp.data = { key: key };
        _tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', function () {
            _ajax.getJson('Delete', { key: key }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },

    /**
     * TODO: need test
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string} 
     */
    onDeleteRows: function (box, fid) {
        //get selected keys
        var keys = _icheck.getCheckeds(box, fid);
        if (keys.length === 0) {
            _tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        //_temp.data = { keys: keys };
        _tool.ans(_BR.SureDeleteSelected, function () {
            _ajax.getStr('DeleteByKeys', { keys: keys }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },
    //=== event end ===

};//class