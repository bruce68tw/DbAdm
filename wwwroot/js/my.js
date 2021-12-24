//jquery ajax call
var _ajax = {

    /** 
     * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} success callback function
     * param fnError {function} failed callback function
     * return {json}
     */
    getJson: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            //dataType: backend return type: xml, html, script, json, jsonp, text
            dataType: 'json',   //return type: ContentType,JsonResult
            //processData: false
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getJson0: function (url, data, fnOk, fnError) {
        _ajax.getJson(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return json by FormData, for upload file
     * param url {string}
     * param data {json}
     * param fnOk {function}
     * param fnError {function}
     * return {json}
     */
    getJsonByFormData: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            cache: false,
            data: data,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            dataType: 'json',   //TODO: pending test
            processData: false, //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getJsonByFormData0: function (url, data, fnOk, fnError) {
        _ajax.getJsonByFormData(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return string
     */ 
    getStr: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getStr0: function (url, data, fnOk, fnError, block) {
        _ajax.getStr(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return html string
     * return html string
     */
    getView: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getView0: function (url, data, fnOk, fnError, block) {
        _ajax.getView(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return image file
     * return html string
     */
    getImageFile: function (url, data, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, null, null, block);
    },
    //no block UI
    getImageFile0: function (url, data) {
        _ajax.getImageFile(url, data, false);
    },

    /**
     * ajax upload file
     * param url {string}
     * param serverFid {string} server side fid
     * param fileObj {file} file object
     * param fnOk {function}
     */
    /*
    file: function (url, serverFid, fileObj, fnOk, fnError) {
        var data = new FormData();  //for upload files if need 
        data.append(serverFid, fileObj);
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',       //server return text
            cache: false,
            contentType: false,     //false!! 傳入參數編碼方式, default為 "application/x-www-form-urlencoded"
            processData: false,     //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },
    */

    /**
     * ajax call(private), only return success info(include custom message)
     * param json {json} ajax json
     * param fnOk {function} callback function
     * param fnError {function} callback function
     * param block {bool} block ui or not, default true
     * return {json} ResultDto
     */
    _call: function (json, fnOk, fnError, block) {
        if (_var.isEmpty(block))
            block = true;

        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (result) {
                //result maps to ResultDto/JObject
                //if (!result)
                //    return;

                var msg = _ajax.resultToMsg(result);
                if (msg) {
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(result);

                //case of getStr()
                } else if (typeof result === 'string' && result.substring(0, 2) === _fun.PreBrError) {
                    var msg = _ajax.strToMsg(result)
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(msg);

                } else if (fnOk) {
                    fnOk(result);
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr != null) {
                    console.log("status" + xhr.status);
                    console.log(thrownError);
                }
            },
            beforeSend: function () {
                //_tool.showWait();
                if (block)
                    _fun.block();
            },
            complete: function () {
                //_tool.hideWait();
                if (block)
                    _fun.unBlock();
            },
        };

        $.ajax(_json.copy(json, config));
    },

    //result to error msg
    //also called by Datatable.js
    resultToMsg: function (result) {
        return (result.ErrorMsg)
            ? _ajax.strToMsg(result.ErrorMsg)
            : '';
    },

    strToMsg: function (str) {
        if (_str.isEmpty(str))
            return '';
        if (str.substring(0, 2) !== _fun.PreBrError)
            return str;

        var fid = str.substring(2);
        return (_BR[fid])
            ? _BR[fid]
            : _str.format('_ajax._call() failed, no BR Fid={0}', fid);
    },

};//class

var _array = {

    /**
     * find array
     * param ary {array}
     * param id {int/string} find value
     * return {int} -1(not found), n
     */ 
    find: function (ary, id) {
        if (ary == null)
            return -1;

        for (var i = 0; i < ary.length; i++) {
            if (ary[i] == id)
                return i;
        }
        return -1;
    },

    /**
     * convert array to string with seperator
     * param ary {array} source array
     * param sep {string} seperator, default to ','
     * retrun {string} ex: '1,2,3'
     */ 
    toStr: function (ary, sep) {
        sep = sep || ',';
        return ary.join(sep);
    },

};//class
var _assert = {

    echo: function (msg) {
        _error.log('_assert.js ' + msg);
    },

    //find array
    //return index
    inArray: function (value, ary) {
        var find = false;
        for (var item in ary) {
            if (item == value) {
                find = true;
                break;
            }
        }
        if (!find)
            _assert.echo('inArray failed: ' + value);
    },

}; //class

var _browser = {

    //傳到後端的語系code 欄位
    _langCode: '_langCode',

    pushState: function (url) {
        history.pushState(null, null, url);
    },

    /*
    //把語系code寫入 cookie (以後可改寫入 localeStorage)
    setLang: function (lang) {
        $.cookie(_browser._langCode, lang);
    },
    */

    zz_print: function (id, fm, fnCallback) {
        _browser.printO(_obj.getById(id, fm, fnCallback));
    },
    zz_printO: function (obj, fnCallback) {
        window.print();
        /*
        debugger;
        //var me = _me;
        var body = document.body;
        var old = body.innerHTML;
        body.innerHTML = obj.html();
        window.print();
        body.innerHTML = old;
        //_me = me;
        //_me.divRead = $('#divRead');
        //if (fnCallback !== undefined)
        //    fnCallback();
        */
    },

}; //class

//button
var _btn = {

    setEdit: function (id, status, box) {
        //use _obj.getById() !!
        _btn.setEditO(_obj.getById(id, box), status);
    },
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    setEditF: function (ft, status, box) {
        _btn.setEditO(_obj.getF(ft, box), status);
    },

}; //class

//use chart.js
var _chart = {

    _nowChart: null,

    //彩虹顏色
    rainbowColors: [
        "#F32E37",
        "#EABE37",
        "#89E926",
        "#22E352",
        "#2FE5E8",
        "#295AE7",
        "#8828EE",
        "#E629B7",
    ],

    /**
     * show one line chart
     * param divId {string}
     * param rows {List<IdNumDto>}
     * param color {string} 
     */
    line: function (canvasId, rows, color) {
        var ids = [];
        var values = [];
        for (var i=0; i<rows.length; i++) {
            var row = rows[i];
            ids[i] = row.Id;
            values[i] = row.Num;
        }
        _chart.drawLine(canvasId, ids, values, color);
    },

    /**
     * show one line chart, called Chart.js
     */ 
    drawLine: function (canvasId, ids, values, color) {
        if (_chart._nowChart != null)
            _chart._nowChart.destroy();

        _chart._nowChart = new Chart(document.getElementById(canvasId), {
            type: 'line',
            data: {
                labels: ids,
                datasets: [{
                    //label: "Africa",
                    data: values,
                    borderColor: color,
                    fill: false
                }]
            },
            options: {
                //legend: { display: false },
                plugins: {
                    legend: { display: false },
                },
                /*
                title: {
                    display: true,
                    text: 'World population per region (in millions)'
                }
                */
            }
        });
    },

    /**
     * initial datatable(use jquery datatables)
     * param {object} canvasObj
     * param {string[]} labels
     * param {number[]} values
     * param {string[]} colors
     * param {json} config: custom config
     * return {Chart}
     */
    initPie: function (canvasObj, labels, values, colors, config) {

        //default config
        var config0 = {
            type: 'pie',
            options: {
                /*
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                },
                */
                legend: {
                    position: 'right',
                    //fullWidth: false,
                    labels: {
                        boxWidth: 10,
                        //padding: 5,
                    },
                },
            },
            data: {
                labels: labels, // 標題
                datasets: [{
                    //label: "# of Votes", // 標籤
                    data: values, // 資料
                    backgroundColor: colors,
                    borderWidth: 1 // 外框寬度
                }]
            },
        };

        //加入外部傳入的自定義組態
        if (config)
            config0 = _json.copy(config, config0);
        return new Chart(canvasObj, config0);
    },

}; //class
/**
 * crud function
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
        //debugger;
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

    dtStatusName: function (value) {
        return (value == '1')
            ? '<div>' + _BR.StatusYes + '</div>'
            : '<div class="text-danger">' + _BR.StatusNo + '</div>';
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
            funs += _str.format('<button type="button" class="btn btn-link" onclick="{0}(\'{1}\')"><i class="ico-pen" title="{2}"></i></button>', ((fnOnUpdate == null) ? '_crud.onUpdate' : fnOnUpdate), key, _BR.TipUpdate);
        if (hasDelete)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="_crud.onDelete(\'{1}\',\'{2}\')"><i class="ico-delete" title="{3}"></i></button>', ((fnOnDelete == null) ? '_crud.onDelete' : fnOnDelete), key, rowName, _BR.TipDelete);
        if (hasView)
            funs += _str.format('<button type="button" class="btn btn-link" onclick="_crud.onView(\'{1}\')"><i class="ico-eye" title="{2}"></i></button>', ((fnOnView == null) ? '_crud.onView' : fnOnView), key, _BR.TipView);
        return funs;
    },
    //=== jQuery datatables end ===    

    /**
     * initial CRUD
     * param dtConfig {Object} datatables config
     * param edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne()
     * param updName {string} update name, default to _BR.Update
     */
    init: function (dtConfig, edits, updName) {
        //_crud.initEdit(edits);
        _me.divEdit = $('#divEdit');
        _me.hasEdit = (_me.divEdit.length > 0);
        if (_me.hasEdit) {
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

            _me.edit0 = edit0;
            _me.hasChild = (_fun.hasValue(_me.edit0[Childs]) && _me.edit0[Childs].length > 0);
            //_me.editLen = _me.edits.length;
            _crud.initForm(_me.edit0);
        }

        //#region 2.set instance variables
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
            _me.dt = new Datatable('#tableRead', 'GetPage', dtConfig);
        }

        _me.nowFun = '';    //now fun of edit0 form
        _me.updName = updName;

        //for xgOpenModal
        _me.modal = null;
        //#endregion

        //3.initial forms(recursive)
        _prog.init();   //prog path
    },

    /**
     * initial forms(recursive)
     * param edit {object} EditOne/EditMany object
     */
    initForm: function (edit) {
        if (edit.eform == null)
            return;

        _idate.init(edit.eform);  //init all date inputs
        edit.validator = _valid.init(edit.eform);   //set valid variables for _ihtml.js !!
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
        if (!_me.hasRead || !_me.hasEdit)
            return;

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
        var find = _crud.getFindCond();
        window.location = 'Export?find=' + _json.toStr(find);
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
        _crud.swap(false);  //call first
        _prog.setPath(fun);
        _crud.setEditStatus(fun);
        _crud.resetForm(_me.edit0);
        _crud._afterOpenEdit(fun, null);
    },

    /**
     * onclick Update button
     * param key {string} row key
     */
    onUpdate: function (key) {
        _crud._getJsonAndSetMode(key, _fun.FunU);
    },

    /**
     * onclick View button
     * param key {string} row key
     */
    onView: function (key) {
        _crud._getJsonAndSetMode(key, _fun.FunV);
    },

    _getJsonAndSetMode: function (key, fun) {
        /*
        if (_str.isEmpty(key)) {
            _log.error('error: key is empty !');
            return;
        }
        */

        //_crud.toUpdateMode(key);
        var act = (fun == _fun.FunU) ? 'GetUpdJson' : 
            (fun == _fun.FunV) ? 'GetViewJson' : '';
        _ajax.getJson(act, { key: key }, function (data) {
            _crud.toEditMode(fun, data);
        });
    },

    //to edit(U/V) mode
    toEditMode: function (fun, data) {
        _crud.swap(false);  //call first
        _prog.setPath(fun, _me.updName);
        _crud.loadJson(data);   //load first
        _crud.setEditStatus(fun);
        _crud._afterOpenEdit(fun, data);
    },

    //set edit form status
    //fun: C,U,V
    setEditStatus: function (fun) {
        if (fun === _me.nowFun)
            return;

        /*
        var isView = (fun == _fun.FunV);
        var run = (isView && _me.nowFun != _fun.FunV) ? true :
            (!isView && _me.nowFun == _fun.FunV) ? true :
            false;
        */
        //set variables
        _me.nowFun = fun;
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
        //if (_fun.hasValue(edit.fnAfterLoadJson))
        //    edit.fnAfterLoadJson(json);
    },

    //call fnAfterOpenEdit() if existed
    _afterOpenEdit: function (fun, json) {
        var edit = _me.edit0;
        if (_fun.hasValue(edit.fnAfterOpenEdit))
            edit.fnAfterOpenEdit(fun, json);
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
        _json.removeNull(data);
        return data;
    },

    /**
     * get edit child len
     * param edit {object} edit object
     */ 
    getEditChildLen: function (edit) {
        var fid = _crud.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length; 
    },

    /**
     * get edit child
     * param edit {object} edit object
     * param childIdx {int} child index, base 0
     */ 
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
     * on click save, when upload file, server side file variable is t(n)_FieldName
     * below variables are sent to backend:  
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
        if (_fun.hasValue(edit0.fnWhenSave)) {
            var error = edit0.fnWhenSave();
            if (_str.notEmpty(error)) {
                _tool.msg(error);
                return;
            }
        }

        //get saving row
        var formData = new FormData();  //for upload files if need
        var row = _crud.getUpdJson(formData);
        if (_json.isEmpty(row)) {
            _tool.msg(_BR.SaveNone);
            return;
        }

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

    /* move to _json.removeNull()
    //recursive remove null for json object
    //level: for debug
    _removeNull: function (level, obj) {
        //debugger;
        $.each(obj, function (key, value) {
            if (value === null) {
                //delete only null, empty is not !!
                delete obj[key];
            } else if (_json.isKeyValue(value)) {
                _crud._removeNull(level+1, value);
            } else if ($.isArray(value)) {
                //check
                var len = value.length;
                if (len == 0) {
                    delete obj[key];
                    return; //continue
                }

                //case of string array
                if (!_json.isKeyValue(value[0])) {
                    var isEmpty = true;
                    for (var i = 0; i < len; i++) {
                        if (!_str.isEmpty(value[i])) {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (isEmpty)
                        delete obj[key];
                    return; //continue
                }

                //case of json array
                $.each(value, function (k, v) {
                    _crud._removeNull(level + 1, v);

                    if (_json.isEmpty(v))
                        v = null;
                });

                //check json and remove if need
                var isEmpty = true;
                //from end
                for (var i=len - 1; i>=0; i--) {
                    if (!_json.isEmpty(value[i])) {
                        isEmpty = false;
                    } else if (isEmpty) {
                        //delete array element
                        delete value[i];
                    } else {
                        value[i] = null;
                    }
                }
                if (isEmpty)
                    delete obj[key];
            }
        });
    },
    */

    /**
     * after save
     * data: ResultDto
     */
    afterSave: function (data) {
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
        //var start = _me.dt.dt.page.info().start;
        _tool.alert(_BR.SaveOk + '(' + data.Value + ')');

        if (_me.hasRead) {
            _me.dt.reload();
            _crud.toReadMode();
        }
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
        _crud.temp.data = { key: key };
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

    /**
     * call fnAfterSwap if existed
     * param toRead {bool} to read mode or not
     */
    _afterSwap: function (toRead) {
        var edit = _me.edit0;
        if (_fun.hasValue(edit.fnAfterSwap))
            edit.fnAfterSwap(toRead);
    },

    /**
     * check current is fun view or not
     */ 
    isEditMode: function () {
        return (_me.nowFun !== _fun.FunV);
    },

};//class
/**
 * for date related
 * short name:
 *  1.date: moment date
 *  2.dt: moment datetime
 *  3.ds: date string
 *  4.dts: datetime string
 */ 
var _date = {

    /**
      ?? 傳回起迄日期(json) for 日期欄位查詢
      param {string} start 開始日期欄位id
      param {string} end 結束日期欄位id
      params {object} box box object
      return {json} 包含start, end欄位
     */
    getStartEnd: function(start, end, box) {
        //var start2 = box.find
    },

    /**
     * ??get today date string in UI format
    uiToday: function(){
        //var date = new Date();
        //return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        return moment().format(_BR.MmDateFmt);
    },
     */

    /**
     * get current year, ex: 2021
     */ 
    nowYear: function() {
        return (new Date()).getFullYear();
    },

    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */ 
    mmToUiDate: function (ds) {
        return (_str.isEmpty(ds))
            ? ''
            : moment(ds, _fun.MmDateFmt).format(_BR.MmUiDateFmt);
    },

    mmToUiDt: function (dts) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _fun.MmDtFmt).format(_BR.MmUiDtFmt);
    },

    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    mmToUiDt2: function (dts) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _fun.MmDtFmt).format(_BR.MmUiDt2Fmt);
    },

    mmToFormat: function (dts, format) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _fun.MmDtFmt).format(format);
    },

    //get datetime value for compare
    mmToValue: function (dts) {
        return (_str.isEmpty(dts))
            ? 0
            : moment(dts, _fun.MmDtFmt).valueOf();
    },

    mmToMoment: function (dts) {
        return (_str.isEmpty(dts))
            ? null
            : moment(dts, _fun.MmDtFmt);
    },

    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    uiToMmDate: function (ds) {
        var date = _str.isEmpty(ds)
            ? '' : moment(ds, _BR.MmUiDateFmt).format(_fun.MmDateFmt);
        return date;
    },

    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    tsToUiDt: function (ts) {
        return (ts == '')
            ? ''
            : moment(parseInt(ts) * 1000).format(_BR.MmUiDtFmt);
    },

    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    getHourStr: function (dts) {

    },

    //?? get datetime string
    //time為下拉欄位
    getDt: function (fDate, fTime, box) {
        var date = _idate.get(fDate, box);
        var time = _iselect.get(fTime, box);
        if (date == '')
            return '';
        else
            return (time == '') ? date : date + ' ' + time;
    },

    /**
     * compare two js date/datetime string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    isBig: function(ds1, ds2) {
        return moment(ds1, _fun.MmDtFmt).isAfter(moment(ds2, _fun.MmDtFmt));
    },

    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int} 
     */ 
    getMonthDiff: function (ds1, ds2) {
        return (_str.isEmpty(start) || _str.isEmpty(end))
            ? 0
            : _date.getMonthDiffByDate(moment(ds1, _fun.MmDtFmt), moment(ds2, _fun.MmDtFmt));
    },

    /**
     * get month difference by date
     * param dt1 {string} start date
     * param dt2 {string} end date
     * return {int} 
     */ 
    getMonthDiffByDate: function (dt1, dt2) {
        return (dt2.getFullYear() - dt1.getFullYear()) * 12
            + dt2.getMonth() - dt1.getMonth() + 1;
    },

    /**
     * js date string add year
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */ 
    jsDateAddYear: function (ds, year) {
        //return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
        return moment(ds, _fun.MmDtFmt).add(year, 'y').format(_fun.MmDtFmt);
    },

}; //class

//for EditOne.js, EditMany.js
var _edit = {

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string}
     */
    getOld: function (obj) {
        return obj.data(_edit.DataOld);
    },

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
     */
    setOld: function (obj, value) {
        obj.data(_edit.DataOld, value);
    },

    /*
    loadRowByArg: function (box, row, fidTypes) {
        _form.loadJson(box, row);

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < fidTypes.length; i = i + 2) {
            fid = fidTypes[i];
            var obj = _obj.get(fid, box);
            obj.data(_edit.DataOld, row[fid]);
        }
    },
    */

    /**
     * get one updated row for New/Updated
     * called by: EditOne.js, DbAdm MyCrud.js
     * param kid {string} key fid
     * param fidTypes {id-value array}
     * param box {object} form object
     * return json row
     */ 
    getUpdRow: function (kid, fidTypes, box) {
        //if key empty then return row
        var row = _form.toJson(box);
        var key = _input.get(kid, box);
        if (_str.isEmpty(key))
            return row;

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
            old = obj.data(_edit.DataOld);
            //if fully compare, string will not equal numeric !!
            if (value != old) {
                //date/dt old value has more length
                if ((ftype === 'date' || ftype === 'dt') &&
                    _date.mmToValue(value) === _date.mmToValue(old))
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
     * set fid-type related variables: fidTypes, fidTypeLen
     * param box {object} container
     * return void
     */
    setFidTypeVars: function (me, box) {
        var fidTypes = [];
        box.find(_fun.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _fun.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
    },

    /**
     * set file related variables: fileFids, fileLen, hasFile
     * called by EditOne/EditMany init()
     * param me {edit} EditOne/EditMany variables
     * param box {object} form or row object
     * return void
     */
    setFileVars: function (me, box) {
        //var me = this;  //use outside .each()
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _fun.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

    /**
     * get server side var name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    getServerFid: function (levelStr, fid) {
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

        var fid = _edit.FileJson
        if (data.has(fid)) {
            var json = data.get(fid);
            fileJson = _json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    },

    /**
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
     */
    isNewKey: function (key) {
        key = key.toString();   //convert to string for checking
        return (key.length <= 3);
    },

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     * param key {string} row key
     */
    viewFile: function (table, fid, elm, key) {
        if (_edit.isNewKey(key)) {
            _tool.msg(_BR.NewFileNotView);
            return;
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
        //return _edit._getFidTypes(box, '[id]');
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

    /**
     * get field info array: 0:id, 1:type
     * param {object} trObj
     * return {string array}
     */
    /*
    _getFidTypes: function (box, filter) {
        var fidTypes = [];
        box.find(filter).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.data('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    },
    */
    //#endregion

};
var _error = {

    log: function (msg) {
        console.log(msg);
    },

}; //class

var _file = {

    /**
     * get file name by path
     */ 
    getFileName: function (path) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _str.getTail(path, sep);
    },

    /**
     * get file ext without '.' in lowerCase, ex: txt
     */
    getFileExt: function (path) {
        return _str.getTail(path, '.').toLowerCase();
    },

    isImageExt: function (ext) {
        return (",jpg,jpeg,png,gif,tif,tiff,").indexOf("," + ext + ",") >= 0;
    }
};//class

//裡面function預設傳入object(not element or selector)
var _form = {

    /**
     * get input values, except read type
     * param form {object} input form
     * return {json}
     */ 
    toJson: function (form) {
        //skip link & read fields
        var json = {};
        form.find(_fun.fidFilter()).filter(':not(.xi-unsave)').each(function () {
            var obj = $(this);
            json[_fun.getFid(obj)] = _input.getO(obj, form);            
        });
        return json;

        /*
        //get input
        var attr = 'name';
        var array = form.serializeArray();  //key-value

        //good: jquery foreach
        var json = {};
        $.each(array, function () {
            json[this.name] = this.value || '';
        });

        //add checkbox input, skip pre name with '-'(for summernote)
        form.find(':checkbox').each(function () {
            var item = $(this);
            var id = item.attr(attr);
            //summernote auto generate checkbox with pre name '-', must skip !!
            if (_fun.hasValue(id) && id.indexOf('-') < 0)
                json[id] = _icheck.getO(item);
        });

        //add radio input
        var attr2 = '[' + attr + ']:radio';
        form.find(attr2).each(function () {
            var item = $(this);
            var id = item.attr(attr);
            json[id] = _iradio.get(id, form);
        });
        return json;
        */
    },
    toJsonStr: function (form) {
        return JSON.stringify(_form.toJson(form));
    },

    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    loadJson: function (form, json) {
        for (var key in json)
            _input.set(key, json[key], form);
    },

    /**
     * reset all inputs with name attribute
     * param form {object}
     */
    reset: function (form) {
        form.find(_fun.fidFilter()).each(function () {
            _input.setO($(this), '', form);
        });
    },

    /**
     * check has file input or not
     */ 
    hasFile: function (form) {
        return (form.find(':file').length > 0);
    },

    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    setEdit: function (form, status) {
        //text & textArea
        _itext.setEditO(form.find('input:text'), status);
        _itextarea.setEditO(form.find('textarea'), status);

        //date, dt
        _idate.setEditO(form.find('.date input'), status);

        //dropdown
        _iselect.setEditO(form.find('select'), status);

        //checkbox & radio
        _icheck.setEditO(form.find(':checkbox'), status);
        _iradio.setEditO(form.find(':radio'), status);

        //TODO: html

        //button
        _btn.setEditO(form.find('button'), status);

        /*
        form.find(':checkbox').each(function () {
            $(this).icheck(enabled);
        });
        //radio
        form.find(':radio').each(function () {
            $(this).icheck(enabled);
        });
        */
    },

    /**
     * hide & show div with effect
     * param hides {array} object array to hide
     * param shows {array} object array to show
     */
    hideShow: function (hides, shows) {
        //hide first
        if (hides) {
            for (var i = 0; i < hides.length; i++) {
                var form1 = hides[i];
                form1.fadeOut(500, function () {
                    form1.hide();
                });
            }
        }

        //show
        if (shows) {
            for (var i = 0; i < shows.length; i++) {
                var form2 = shows[i];
                form2.fadeIn(500, function () {
                    form2.show();
                });
            }
        }
    },


    //=== below is old and remark ===
    /*
    //get save data without files
    //row: jobject
    //deletes: list<list<string>>
    //rows: list<JArray>
    //return json
    getSaveData: function (isNew, key, row, rows, deletes) {
        return {
            isNew: isNew,
            key: key,
            row: _json.toStr(row),
            rows: _json.toStr(rows),
            deletes: _form.keysToStr(deletes),
        };
    },

    //??
    //單筆資料包含要上傳的多個檔案
    //files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
    getSaveRow: function (isNew, box, row, files) {
        files = files || [];
        //multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        //var i;
        for (var i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], box);

        data.append('row', _json.toStr(row));
        return data;
    },
    */

    /** 
     * description 傳回要送到後端的儲存資料
     * param {bool} isNew
     * param {object} box object
     * param {object} row json object, for save
     * param {array} files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
     * param {array} multis 多筆資料 src
     * return {FormData} json
     */
    /*
    //getSaveData: function (isNew, box, row, files, multis) {
    getSaveDataWithFiles: function (isNew, box, row, files, multis) {
        files = files || [];
        multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        var i;
        for (i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], box);

        //rows 加入單筆
        var rows = [row];

        //多筆資料的異動/刪除
        var deletes = [];
        for (i = 0; i < multis.length; i++) {
            //異動資料
            _editMany.dataAddRows(data, rows, multis[i]); //多筆
            //var hasRows = (multis[i][1] !== null && multis[i][1] !== undefined);
            //if (hasRows)
            //    multis[i][1].rows = rows2;

            //刪除資料
            deletes[i] = multis[i].deletes;
        }

        //加入
        data.append('rows', _json.toStr(rows));     //加入多筆
        data.append('deletes', _editMany.keysToStr(deletes));  //輸出字串
        return data;
    },

    //??
    //捲動畫面到第一個錯誤欄位
    zz_scrollTopError: function () {
        $('.' + _fun.errLabCls).each(function (i, data) {
            if ($(data).is(':visible')) {
                var t = $(data);
                var x = $(t).offset().top - 185;

                if ($('.wrapper').parent().hasClass('slimScrollDiv'))
                    $('.wrapper').slimScroll({ scrollTo: x });
                else if ($('.wrapper').hasClass('noWrapperScroll'))
                    $('.scroolablePanel').slimScroll({ scrollTo: $(t).position().top - 200 });
                else
                    $("html, body").animate({ scrollTop: x }, "slow");
                return (false);
            }
        })
    },

    //move to _crud.js
    //keys is two dimension
    zz_keysToStr: function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    },
    */

    /**
     * ??
     檢查欄位清單內是否有空白欄位, 如果有則顯示必填
     讀取 xd-required class
     如果欄位值有錯誤, 則會focus在第一個錯誤欄位
     包含多筆區域 !!
     //@param {array} ids source field id array
     param {object} box box object, for 多筆畫面??
     //param {string} msg error msg, 如果沒輸入, 則使用 _BR.FieldRequired
     return {bool} true(field ok), false(has empty)
    */
    /*
    checkEmpty: function (box) {
        //clear error label first
        box.find('.' + _fun.errCls).removeClass(_fun.errCls);
        box.find('.' + _fun.errLabCls).hide();

        //if (_str.isEmpty(msg))
        //var msg = ;

        //get ids
        //var ids = [];
        var ok = true;
        box.find('.' + _fun.XdRequired).each(function () {
            var me = $(this);
            if (_str.isEmpty(_input.getO(me, box))) {
                ok = false;
                //me.addClass(_fun.errCls);
                var id = _obj.getId(me);
                if (_str.isEmpty(id))
                    id = _obj.getDid(me);
                _input.showError(me, id, _BR.FieldRequired, box);
            }
        });
        return ok;

        //check if ids is string
        //if (typeof ids === 'string') {
        //    ids = [ ids ];    //把字串變成陣列
        //if (ids == null || ids.length == 0)
        //    return true;

    },
    */

    /*
    //把json的資料比對checkbox,相同值勾選起來(相同欄位名稱)
    jsonCheckBoxToForm: function (json, boxId) {
        var box = $('#' + boxId);
        Object.keys(json).map(function (key, index) {
            $('input[name=""]' + key).each(function () {
                if ($(this).val() == json[key]) {
                    $(this).prop("checked", true);
                }
            });
        });
    },
    */    

    /*
    zz_reset: function (box) {
        //var box = $('#' + box);
        //文字欄位
        box.find('input:text').val('');
    },
    */

}; //class

//FormData
var _formData = {


}; //class

var _fun = {

    //#region constant (big camel) ===
    //for moment.js, match to _Fun.cs CsDtFmt
    MmDateFmt: 'YYYY/MM/DD',
    MmDtFmt: 'YYYY/MM/DD HH:mm:ss',

    //input field error validation, need match server side _Web.cs
    //jsPath: '../Scripts/',      //js path for load

    //for mapping to backend
    FunC: 'C',     //create
    FunR: 'R',     //read
    FunU: 'U',     //update
    FunD: 'D',     //delete, for input file
    FunV: 'V',     //view row

    //error BR code, same to _Fun.PreBrError, fixed len to 2
    PreBrError: 'B:',
    //#endregion

    //variables
    locale: 'zh-TW',    //now locale, _Layout.cshmlt will set
    maxFileSize: 50971520,  //upload file limit(50M)

    //mid variables
    //data: {},

    //variables ??
    //isCheck: true,

    //server need Fun/Hello()
    onHello: function () {
        _ajax.getStr('../Fun/Hello', null, function (msg) {
            alert(msg);
        });
    },

    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    getFid: function (obj) {
        return obj.data('fid');
    },

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    fidFilter: function (fid) {
        return _str.isEmpty(fid)
            ? '[data-fid]'
            : '[data-fid=' + fid + ']';
    },

    /*
    isNull: function (obj) {
        return (obj == null);
    },
    */

    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    default: function (val, defVal) {
        return (val == null) ? defVal : val;
    },

    hasValue: function (obj) {
        //can not obj != null !!
        return !(obj == null);
    },

    //on change locale, 後端必須實作 Fun/SetLocale()
    onSetLocale: function (code) {
        _ajax.getStr('../Fun/SetLocale', { code: code }, function (msg) {
            //_browser.setLang(lang);
            location.reload();
        });
    },

    block: function (){
        $.blockUI({
            message: '' +
                '<table><tr><td style="height:50px">' +
                '   <i class="spinner ico-spin"></i>' +
                '   <span style="margin-left:3px; vertical-align:middle;">' + _BR.Working + '</span>' +
                '</td></tr></table>',
            css: {
                padding: '0 30px',
                borderWidth: '2px', //no dash here, use camel or add '
                width: 'auto',
                left: '42%',
            },
            overlayCSS: { opacity: 0.3 },
        });
    },

    unBlock: function () {
        $.unblockUI();
    },

    //#region remark code
    /*
      ??
    xgTextBoxValid: function (obj, Regex) {
        var parent = obj.parentNode;
        if (Regex == "") {
            if (obj.value != "") {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
        else {
            if (obj.value.match(new RegExp(Regex)) != null) {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
    },

     ??
    xgCheckfn: function () {
        _fun.isCheck = true;
        var Inputs = document.getElementsByClassName('xg-textbox');
        for (var i = 0; i < Inputs.length; i++) {
            Inputs[i].childNodes[1].onchange();
        }
        var selects = document.getElementsByClassName('xg-select');
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].childNodes[1].value == 0 || selects[i].childNodes[1].value == "") {
                selects[i].classList.add("xg-error");
                _fun.isCheck = false;
            }
            else {
                selects[i].classList.remove("xg-error");
            }
        }
        return _fun.isCheck;
    },

    //
     multiple checkbox onclick event
     params
       me : this component
       fid: field id 
       value: field value
    //onClickCheckMulti: function (me, fid, value, separator, onClickFn) {
    zz_onChangeMultiCheck: function (me, fid) {

        //var fid = $(me).attr('data-item-id');
        //var field = $('[data-id="' + fid + '"]');           //field
        var field = $('#' + fid);       //field
        //var box = field.parent();     //找包含所有 checkbox 的 container
        //update value list
        var values = '';
        var texts = '';
        var separator = field.attr('data-separator');
        var onClickFn = field.attr('data-onclick');
        $(field.parent()).find('input:checked').each(function () {
            values += $(this).val() + separator;
            texts += $(this).text() + ',';
        });

        //adjust
        if (values != '') {
            values = values.substring(0, values.length - 1);
            texts = texts.substring(0, texts.length - 1);
        }
        //更新欄位內容
        field.attr('title', texts); //update show text
        field.val(values);           //set field value

        //call user define function
        if (onClickFn != undefined && onClickFn != "")
            onClickFn(me, $(me).val());

    },
    */
 
    /**
     * 傳回錯誤訊息(多國語)
     * params
     *   form : 多國語 form 
     *   errorCode: error code
     */
    /*
    errorMsg: function (form, errorCode) {
        if (errorCode == null || errorCode == '')
            return '';
        else if (errorCode.subsubstring(0, 1) == 'E')
            return (_global[errorCode] == null) ? '(no error code: ' + errorCode +')' : _global[errorCode];
        else
            return (form[errorCode] == null) ? '(no error code: ' + errorCode + ')' : form[errorCode];
    },
    */

    /**
     * get value of multiple select field
     * params
     *   fid : field id
     * return : string
     */
    //getMultiSelectValue: function (fid, separator) {
    //    var field = $('#' + fid);
    //    return (field.length == 0) ? '' : field.val().join(separator);
    //},
    //#endregion

};//class

var _helper = {

    /**
     * ??
     */ 
    getBaseProp: function (rowNo, fid, value, type, required, editable, extAttr) {
        var attr = _str.format("type='{0}' data-id='{1}' name='{2}' value='{3}'",
            type, fid, fid + rowNo, value);
        if (required === true)
            attr += " required";
        if (editable === false)
            attr += " readonly";
        if (!_str.isEmpty(extAttr))
            attr += " " + extAttr;
        return _str.trim(attr);
    },
};
/*
 * handle html data
 */
var _html = {
    //*** 必要屬性 or 函式 ***
    //get locale code
    encodeRow: function (row, fields) {
        for (var i = 0; i < fields.length; i++) {
            var id = fields[i];
            row[id] = _html.encode(row[id]);
        }
        return row;
    },

    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    encode: function (value) {
        return $('<div/>').text(value).html();
    },

    decode: function(value){
        return $('<div/>').html(value).text();
    },

    //?? 更新html欄位內容, 讀取 text()
    update: function(id, box) {
        var filter = '#' + id;
        var obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
	//??
    updates: function (ids, box) {
        for (var i = 0; i < ids.length; i++)
            _html.update(ids[i], box);
    },
    
};

//base class of all input field, use 'this' instead of '_ibase'
//must loaded first, or will got error !!
var _ibase = {

    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string}
     */ 
    get: function (fid, box) {
        return this.getO(_obj.get(fid, box));
    },
    //get value by filter
    getF: function (ft, box) {
        return this.getO(_obj.getF(ft, box));
    },
    //get value by object
    getO: function (obj) {
        return obj.val();
    },

    //get input border for show red border
    //default return this, drive class could rewrite.
    getBorder: function (obj) {
        return obj;
    },

    //set value, set -> setF -> setO
    set: function (fid, value, box) {
        this.setO(_obj.get(fid, box), value)
    },
    setF: function (ft, value, box) {
        this.setO(_obj.getF(ft, box), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },

    //set edit status
    setEdit: function (fid, status, box) {
        this.setEditO(_obj.get(fid, box), status);
    },
    setEditF: function (ft, status, box) {
        this.setEditO(_obj.getF(ft, box), status);
    },
    setEditO: function (obj, status) {
        obj.prop('readonly', !status);
    },

};//class
//for checkbox(use html checkbox)
var _icheck = $.extend({}, _ibase, {

    /**
     * default data-fid attribute value for multiple selection
     */
    Check0Id: '_check0',

    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */ 
    getO: function (obj) {
        //return obj.val();
        return obj.is(':checked') ? obj.data('value') : '0';
    },

    /**
     * (override)set checked or not
     */
    setO: function (obj, value) {
        //obj.val(value);
        var status = !(value == null || value == '0' || value == 'False' || value == false);
        obj.prop('checked', status);
    },

    /**
     * (override) set status by object(s)
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    
    /**
     * get checked status by fid
     */
    checked: function (fid, form) {
        return _icheck.checkedO(_obj.get(fid, form));
    },

    /**
     * get checked status by filter
     */
    checkedF: function (filter, form) {
        return _icheck.checkedO(_obj.getF(filter, form));
    },

    /**
     * get checked status by object
     */
    checkedO: function (obj) {
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    },

    /**
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */ 
    getCheckeds: function (form, fid) {
        fid = fid || _icheck.Check0Id;
        var ary = [];
        _obj.getF(_fun.fidFilter(fid) + ':checked', form).each(function (i) {
            ary[i] = $(this).data('value');
        });
        return ary;
    },

    /**
     * set checked status for multiple rows
     * form {object} container
     * rows {json array}
     * fid {string} (optional '_check0') field name in rows
     * return void
    setCheckedByJsons: function (form, rows, fid) {
        if (_str.isEmpty(rows))
            return;

        fid = fid || _icheck.Check0Id;
        for (var i = 0; i < rows.length; i++) {
            var obj = form.find('[data-value=' + rows[i][fid] + ']');
            _icheck.setO(obj, 1);
        }
    },
     */

}); //class

var _icolor = {

    init: function () {
        $('.xg-color').colorpicker({
            //component: true,
            /*
            onchange: function (me, color) {
                $(me).css('background-color', color.toHex());
            },
            */
        });
    },

    get: function (fid, form) {
        return _icolor.getO(_obj.get(fid, form));
    },
    //value by filter
    getF: function (filter, form) {
        return _icolor.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return _icolor.rgbToHex(obj.find('i').css('background-color'));
    },

    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    rgbToHex: function(rgb) {
        var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete (parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1)
                parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('');
    },

    /*
    onChange: function(me) {
        $(me).css('background-color', me.color.toHex());
    },
    */

    /*
    set: function (fid, value, form) {
        _itext.setO(_obj.get(fid, form), value)
    },
    setF: function (filter, value, form) {
        _itext.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },
    */

}; //class
//for date input (bootstrap-datepicker)
//_idt drive from _idate
var _idate = $.extend({}, _ibase, {

    //constant
    BoxFilter: '.date',

    //=== get/set start ===
    //get ymd with format _fun.MmDateFmt
    getO: function (obj) {
        return _date.uiToMmDate(obj.val());
    },

    /**
     * set input value
     * param obj {object} date object
     * param value {string} format: _fun.MmDateFmt
     */
    setO: function (obj, value) {
        _idate._boxSetDate(_idate._objToBox(obj), _date.mmToUiDate(value));
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },

    /**
     * initial, called by _crud.js
     * param box {object}
     * param fid {string} optional
     */ 
    init: function (box, fid) {
        var obj = _str.isEmpty(fid)
            ? box.find(_idate.BoxFilter)
            : _obj.get(fid, box).closet(_idate.BoxFilter);
        if (obj.length == 0)
            return;

        //initial
        obj.datepicker({
            //format in bootstrap-datepicker.js
            language: _fun.locale,
            autoclose: true,
            showOnFocus: false,
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
            //$(_idate).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = !_str.isEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
                fnOnChange(fid, me.val());
            }
            */
        });

        //stop event, or it will popup when reset(jquery 3.21) !!
        obj.find('.input-group-addon').off('click');
    },

    //show/hide datepicker
    onToggle: function (btn) {
        //$(btn).parent().parent().find('input').trigger('focus');
        _idate._elmToBox(btn).datepicker('show');
    },

    //reset value
    onReset: function (btn) {
        //check input status first
        var box = _idate._elmToBox(btn);
        if (_idate.getEditO(_idate._boxGetInput(box)))
            _idate._boxSetDate(box, '');
    },    

    //get edit status, return bool
    getEditO: function (obj) {
        return !obj.is(':disabled');
    },

    //=== private function below ===
    /**
     * element to date box
     * return {object}
     */
    _elmToBox: function (elm) {
        return _idate._objToBox($(elm));
    },
    _objToBox: function (obj) {
        return obj.closest(_idate.BoxFilter);
    },

    _boxSetDate: function (box, date) {
        box.datepicker('update', date);
    },

    _boxGetInput: function (box) {
        return box.find('input');
    },

}); //class
//for datetime input (bootstrap-datepicker)
var _idt = $.extend({}, _idate, {

    //constant
    //BoxFilter: '.date',

    //=== get/set start ===
    getO: function (obj) {        
        //var date = _date.uiToMmDate(_idate.getO(_idt._boxGetDate(obj)));
        var date = _idate.getO(_idt._boxGetDate(obj));
        return _str.isEmpty(date)
            ? ''
            : date + ' ' +
                _iselect.getO(_idt._boxGetHour(obj)) + ':' +
                _iselect.getO(_idt._boxGetMin(obj));
    },

    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _fun.MmDtFmt
     */
    setO: function (obj, value) {
        var date, hour, min;
        if (_str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        } else {
            date = value;   //_idate will set
            hour = parseInt(_str.getMid(value, ' ', ':'));
            min = parseInt(_str.getMid(value, ':', ':'));
        }
        _idate.setO(_idt._boxGetDate(obj), date);
        _iselect.setO(_idt._boxGetHour(obj), hour);
        _iselect.setO(_idt._boxGetMin(obj), min);
    },

    setEditO: function (obj, status) {
        _idate.setEditO(_idt._boxGetDate(obj), status);
        _iselect.setEditO(_idt._boxGetHour(obj), status);
        _iselect.setEditO(_idt._boxGetMin(obj), status);
    },

    //=== private function below ===
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    _boxGetDate: function (box) {
        return box.find('input:first');
    },

    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    _boxGetHour: function (box) {
        return box.find('select:first');
    },

    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    _boxGetMin: function (box) {
        return box.find('select:last');
    },

}); //class

//input file
var _ifile = $.extend({}, _ibase, {

    //object: file input

    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */ 
    getBorder: function (obj) {
        return obj.prev();
    },

    setO: function (obj, value) {
        obj.val(value);     //set hidden input value
        _ifile._elmToLink(obj).text(value);  //set link show text
    },
    //=== overwrite end ===

    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    dataAddFile: function (data, fid, serverFid, box) {
        var obj = _obj.get(fid, box);
        var file = _ifile.getUploadFile(_ifile._elmToFile(obj));
        var hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    },

    //=== event start ===
    onOpenFile: function (btn) {
        var file = _ifile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    },

    //file: input element
    onChangeFile: function (file) {
        //case of empty file
        var obj = _ifile._elmToObj(file);
        var fileObj = $(file);
        var value = file.value; //full path
        if (_str.isEmpty(value)) {
            _ifile.setO(obj, '');
            return;
        }

        //check file ext
        var exts = fileObj.data('exts').toLowerCase();
        if (!_str.isEmpty(exts) && exts !== '*') {
            var ext = _file.getFileExt(value);
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _tool.msg(_BR.UploadFileNotMatch);
                file.value = '';
                return;
            }
        }

        //check file size
        var max = fileObj.data('max');
        if (file.files[0].size > max * 1024 * 1024) {
            _tool.msg(_str.format(_BR.UploadFileNotBig, max));
            file.value = '';
            return;
        }

        //case ok
        _ifile.setO(obj, _file.getFileName(value));
    },

    onDeleteFile: function (btn) {
        _ifile.setO(_ifile._elmToObj(btn), '');
    },
    //=== event end ===

    //?? initial after load rows
    zz_init: function(fid, path, form) {
        var fileObj = _obj.get(fid, form);
        fileObj.val('');
        //_ifile.setFun(fileObj, ''); //set fun to empty
        //_ifile.setPathByFile(fileObj, path);

        /*
        //file element 要 reset
        var file = _obj.getF(_ifile.fileF(id), form);
        //var $el = $('#example-file');
        file.wrap('<form>').closest('form').get(0).reset();
        file.unwrap();
        */
    },


    //=== private function below ===
    /**
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    _elmToBox: function (elm) {
        return $(elm).closest('.xi-box');
    },
    //get file object
    _elmToFile: function (elm) {
        return _ifile._boxGetFile(_ifile._elmToBox(elm));
    },
    //get input object
    _elmToObj: function (elm) {
        return _ifile._boxGetObj(_ifile._elmToBox(elm));
    },
    //get link object
    _elmToLink: function (elm) {
        return _ifile._boxGetLink(_ifile._elmToBox(elm));
    },

    /**
     * box get link object
     * param box {object} box object
     */
    _boxGetLink: function (box) {
        return box.find('a');
    },
    _boxGetFile: function (box) {
        return box.find(':file');
    },
    //box get input object
    _boxGetObj: function (box) {
        return box.find('[data-type=file]');
    },

    //border get uploaded file, return null if empty
    getUploadFile: function (fileObj) {
        if (fileObj.length == 0)
            return null;

        var files = fileObj.get(0).files;
        return (files.length > 0) ? files[0] : null;
    },

}); //class
/*
 * html input, use summernote !!
 */
var _ihtml = $.extend({}, _ibase, {

    //constant
    Filter: '[data-type=html]',

    getO: function (obj) {
        //return obj.html();
        //return obj.val();
        return obj.summernote('code');
    },

    setO: function (obj, value) {
        //value = $('<div/>').html(value).text(); //decode
        obj.summernote('code', value);
        //obj.html(value);
        //obj.val(value);
    },

    //set edit status
    setEditO: function (obj, status) {
        obj.summernote(status ? 'enable' : 'disable');
    },

    /**
     * init html editor
     * param obj {objects} html input object array
     * param prog {string} program code
     * param height {int} input height(px)
     * //param fnFileName {function} js function to get filename, 
     * //  if empty, fileName use prog + '_' + fid
     */
    init: function (edit, prog, height) {
        edit.eform.find(_ihtml.Filter).each(function () {
            var upMe = $(this);
            upMe.data('prog', prog);    //for onImageUpload()
            //init summernote
            upMe.summernote({
                height: height || 200,
                //new version use callbacks !!
                callbacks: {
                    //https://codepen.io/ondrejsvestka/pen/PROgzQ
                    onChange: function (contents, $editable) {
                        //sync value
                        var me = $(this);
                        me.val(me.summernote('isEmpty') ? "" : contents);

                        //re-validate
                        edit.validator.element(me);
                    },

                    onImageUpload: function (files) {
                        var me = $(this);   //jquery object
                        var data = new FormData();
                        data.append('file', files[0]);
                        //data.append('prog', me.data('prog'));
                        $.ajax({
                            data: data,
                            type: "POST",
                            url: "SetHtmlImage",    //fixed action !!
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (url) {
                                //create image element & add into editor
                                var image = document.createElement('img');
                                image.src = url;
                                me.summernote('insertNode', image); //new version syntax !!
                            }
                        });
                    },
                },

                //=== add image ext attr start ===
                /*
                lang: _fun.locale,
                popover: {
                    image: [
                        ['custom', ['imageAttributes']],
                        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']]
                    ],
                },
                imageAttributes: {
                    imageDialogLayout: 'default', // default|horizontal
                    icon: '<i class="note-icon-pencil"/>',
                    removeEmpty: false // true = remove attributes | false = leave empty if present
                },
                displayFields: {
                    imageBasic: true,  // show/hide Title, Source, Alt fields
                    imageExtra: false, // show/hide Alt, Class, Style, Role fields
                    linkBasic: false,   // show/hide URL and Target fields for link
                    linkExtra: false   // show/hide Class, Rel, Role fields for link
                },
                */
                //=== add image ext attr start ===

            });//summernote()

        });//each()
    },

    //set edit status for all html input
    setEdits: function (box, subFilter, status) {
        var items = box.find(_ihtml.Filter + subFilter);
        if (items.length > 0)
            items.summernote(status ? 'enable' : 'disable');
    },

    /*
    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    encode: function (value) {
        return $('<div/>').text(value).html();
    },

    decode: function(value){
        return $('<div/>').html(value).text();
    },

    //encode row
    encodeRow: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _ihtml.encode(row[fid]);
        }
        return row;
    },

    //更新html欄位內容, 讀取 text()
    update: function(fid, box) {
        //var filter = '#' + fid;
        //var obj = (box === undefined) ? $(filter) : box.find(filter);
        var obj = _obj.get(fid, box);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
    updates: function (fids, box) {
        for (var i = 0; i < fids.length; i++)
            _ihtml.update(fids[i], box);
    },
    */

}); //class

//link file
var _ilink = {

    //value by fid
    get: function (fid, form) {
        return this.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },

    set: function (fid, value, form) {
        this.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class

//link file
var _ilinkFile = {

    //value by fid
    get: function (fid, form) {
        return this.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        this.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class
/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toJson()
 * 3.validation error span position rules:
 *   (a)same parent, could be different child level
 *   (b)sibling(ex: Date)
 */
var _input = {

    //get input value by data-fid
    get: function (fid, box) {
        return _input.getO(_obj.get(fid, box), box);
    },

    /**
     * get input value by object
     * param obj {object}
     * param type {string} (optional) data-type
     * return input value
     */ 
    getO: function (obj, box, type) {
        type = type || _input.getType(obj);
        switch (type) {
            case 'text':
                return _itext.getO(obj);
            case 'textarea':
                return _itextarea.getO(obj);
            case 'check':
                return _icheck.getO(obj);
            case 'radio':
                return _iradio.getO(obj, box);
            case 'select':
                return _iselect.getO(obj);
            case 'date':
                return _idate.getO(obj);
            case 'dt':
                return _idt.getO(obj);
            case 'file':
                return _ifile.getO(obj);
            case 'html':
                return _ihtml.getO(obj);
            case 'read':
                return _iread.getO(obj);
            case 'link':
                return _ilink.getO(obj);
            default:
                //text, textarea
                return obj.val();
        }
    },

    set: function (fid, value, box) {
        _input.setO(_obj.get(fid, box), value, box);
    },

    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param type {string} optional, data-type
     */ 
    setO: function (obj, value, box, type) {
        type = type || _input.getType(obj);
        switch (type) {
            case 'text':
                _itext.setO(obj, value);
                break;
            case 'check':
                _icheck.setO(obj, value);
                break;
            case 'radio':
                //此時 obj 為 array
                value = value || '0';
                _iradio.setO(obj, value, box);
                break;
            case 'select':
                _iselect.setO(obj, value);
                break;
            case 'date':
                return _idate.setO(obj, value);
            case 'dt':
                return _idt.setO(obj, value);
            case 'file':
                _ifile.setO(obj, value);
                break;
            case 'textarea':
                _itextarea.setO(obj, value);
                break;
            case 'html':
                _ihtml.setO(obj, value);
                break;
            case 'read':
                var format = obj.data('format');
                if (_str.notEmpty(format) && _str.notEmpty(_BR[format]))
                    value = _date.mmToFormat(value, _BR[format]);
                _iread.setO(obj, value);
                break;
            case 'link':
                return _ilink.setO(obj, value);
            default:
                //text
                obj.val(value);
                break;
        }
    },

    /**
     * get input field type
     */ 
    getType: function (obj) {
        return obj.data('type');
    },

    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    getObj: function (fid, box, ftype) {
        ftype = ftype || _input.getType(_obj.get(fid, box));
        return (ftype === 'radio') ? _iradio.getObj(fid, box) : _obj.get(fid, box);
    },


    //#region remark code
    /**
     * ??顯示欄位的錯誤訊息, fid欄位會直接加上 error className
     * 先找 error label, 再找上面相鄰的 object, 然後加入 xg-error
     * param fid {string} 欄位id
     * param msg {string} 顯示訊息, 可為空白, 此時會顯示錯誤外框, 但是無錯誤訊息
     * param box {object} (optional) box(jquery object), for 多筆畫面
     * return: void
    showError: function (obj, fid, msg, box) {
        //輸入欄位增加 error class
        obj.addClass(_fun.errCls);

        //label欄位設定文字內容
        var filter = '[data-id2=' + fid + _fun.errTail + ']';
        //先找parent下
        //var label = _obj.getF(filter, box);
        var parent = obj.parent();
        var label = parent.find(filter);
        if (label.length == 0)
            label = parent.next();
        //obj.addClass(_fun.errCls);
        label.text(msg);
        label.show();
        //_form.scrollTopError();
    },
     */

    /**
     * get old value (get data-old value)
    getOld: function (obj) {
        return obj.data('old');
    },
     */

    /**
     * 檢查欄位是否binding event
    isBound: function(filter) {
        var field = $(filter);
        return (field.find(':not(.bound)').length == 0);
    },
     */

    /**
     * set edit status
    setEdit: function (fid, status, box) {
        //文字欄位
        _obj.get(fid, box).attr('readonly', !status);
    },
    setEdits: function (fids, status, box) {
        //文字欄位
        for (var i = 0; i < fids.length; i++) 
            _obj.get(fids[i], box).attr('readonly', !status);
    },

    //檢查欄位是否存在, true/fales
    exist: function (fid, box) {
        return _input.existF('#' + fid, box);
    },

    existF: function (filter, box) {
        var field = (box === undefined) ? $(filter) : box.find(filter);
        return (field.length > 0);
    },
     */

    /**
     * select option on change event.
    _onChangeSelect: function (me) {
        //var tt = 'tt';
        var className = 'selected';
        var len = me.options.length;
        for (var i = 0; i < len; i++) {
            var opt = me.options[i];
            var opt2 = $(opt);

            // check if selected
            if (opt.selected) {
                if (!opt2.hasClass(className))
                    opt2.addClass(className);
            } else {
                if (opt2.hasClass(className))
                    opt2.removeClass(className);
            }
        }
    },
     */

    /**
     * set select field value
     * params
     *   data : address
     * return : true/false
    setSelect: function (fid, value) {
        $('#' + fid).selectpicker('val', value);
    },

    setValue: function (fid, value) {
        var field = $('#' + fid);
        if (field.length == 0)
            console.log('no field: ' + fid);
        else
            field.val(value);
    },
     */

    /**
     * 寫入 multiple select value (使用 bootstrap-select)
     * 多選欄位值為陣列, 必須轉成字串
     * param :
     *    fid: 欄位id
     *    separator: 分隔符號
    writeMultiValue: function (fid, separator) {
        var value = $('#' + fid + '_tmp').val();
        if (value)
            value = value.join(separator);
        $('#' + fid).val(value);
    },

    //把json塞進label的text(相同欄位名稱)
    setLabel: function (fid, value) {
            $('#'+fid).text(value); 
    },
     */

    /* 
    ??
     移除欄位的 error class
     para:
       fid: 欄位id
       box: (optional) box(jquery object), for 多筆畫面
     return: void
    clearFieldError: function (fid, box) {
        var labelFid = '#' + fid + _fun.errTail;
        var error = (box === undefined) ? $(labelFid) : box.find(labelFid);
        var field = error.prev();
        var id = field.attr('id');
        //
        field.removeClass(_fun.errCls)
    },
    */

    /* 
     移除所有 error class
     return: void
    clearFieldsError: function () {
        //尋找所有 err_ 開頭的 dom
        $('.' + _fun.errCls).removeClass(_fun.errCls);
        //$('.' + _fun.errBoxCls).removeClass(_fun.errBoxCls);
    },
    */
    //#endregion

}; //class

//注意: 單筆時, 要設定 fid/data-fid(只設定第1個radio), name (2個屬性的內容必須相同!!)
//與其他類型輸入欄位操作不同 !!
//iRadio 沒有 getD/setD
var _iradio = $.extend({}, _ibase, {

    //=== get ===
    //get checked data-value by fid
    get: function (fid, box) {
        return _iradio._getByName(fid, box);
    },
    /**
     * get checked data-value by fid
     * param obj {object} single object
     */ 
    getO: function (obj, box) {
        return _iradio._getByName(_obj.getName(obj), box);
    },

    //get checked object
    getObj: function (fid, box) {
        return _obj.getF('[name=' + fid + ']:checked', box);
    },

    //get data-value by checked name
    _getByName: function (name, box) {
        return _iradio.getObj(name, box).data('value');
    },

    //=== set ===
    //改成用name來查欄位
    set: function (fid, value, box) {
        _iradio._setByName(fid, value, box);
    },
    
    //setO: function (obj, value, box) {
    setO: function (obj, value, box) {
        _iradio._setByName(_obj.getName(obj), value, box);
    },

    //set checked status by name & data-value
    _setByName: function (name, value, box) {
        var obj = _obj.getF('[name=' + name + '][data-value=' + value + ']', box);
        obj.prop('checked', true);
    },

    //set status by name
    //改成用name來查欄位
    setEdit: function (fid, status, box) {
        //use getN() !!
        _iradio.setEditOs(_obj.get(fid, box));
    },
    setEditOs: function (objs, status) {
        objs.attr('disabled', !status); //use attr !!
    },

    /**
     button radio onclick event
     params
       me : this component
       fid: field id 
       value: field value
       onClickFn: (optional) callback function
     */
    /*
    _onClickBtnRadio: function (me, fid, value, onClickFn) {
        //unselect所有欄位
        fid = '#' + fid;
        var field = $(me);
        var box = field.closest(fid + '_box');      //找最近的 xxx_box 元素, 因為考慮相同 id的情況
        box.find('.active').removeClass('active');

        //更新欄位內容
        field.addClass('active');   //high light
        box.find(fid).val(value);   //set field value

        //更新欄位 xxx_now 內容
        box.find(fid + '_now').val(field.attr('data-old'));

        //call user define function
        //if (onClickFn != undefined && onClickFn != "")
        if (onClickFn)
            onClickFn(me, value);
    },

    //get field value
    getValue: function (fid) {
        var me = $('[name="' + fid + '"]:radio');
        if (me.length > 0) {
            return me.parent().hasClass('checked') ? me.val() : '';
        } else {
            return '';
        }
    },
    */

    /** 
     ?? for 多筆資料only(data-id)
     產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     @param {string} fid (optional)id/data-id 
     @param {string} label (optional)show label 
     @param {bool} checked default false, 是否勾選
     @param {string} value (optional) 如果null則為1
     @param {bool} editable default true, 是否可編輯
     @param {string} boxClass (optional) boxClass
     @param {string} extClass (optional) extClass
     @param {string} extProp (optional) extProp
     @return {string} html string.
    */
    render: function (fid, label, checked, value, editable, extClass, extProp) {
        var html = "" +
            "<label class='xi-check {0}'>" +
            "   <input type='radio'{1}>{2}" +
            "   <span class='xi-rspan'></span>" +
            "</label>";

        //adjust
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extProp = extProp || '';
        value = value || '';
        if (label == '')
            label = '&nbsp;';
        if (_str.isEmpty(value))
            value = 1;

        //attr
        extProp += " data-id='" + fid + "' name='" + fid + "'" + 
            " value='" + value + "'";
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled';    //disabled='disabled'

        return _str.format(html, extClass, extProp, label);
    },

}); //class

//label
var _iread = {

    //value by fid
    get: function (fid, form) {
        return _iread.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by filter
    getF: function (filter, form) {
        return _iread.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        _iread.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setF: function (filter, value, form) {
        _iread.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class

//select option 
var _iselect = $.extend({}, _ibase, {

    //#region override
    getO: function (obj) {
        return (obj.length === 0) ? '' : obj.find('option:selected').val();
    },

    setO: function (obj, value) {
        filter = 'option[value="' + value + '"]';
        var item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        } else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    //#endregion

    //get selected index(base 0)
    getIndex: function (fid, box) {
        return _iselect.getIndexO(_obj.get(fid, box));
    },
    getIndexO: function (obj) {
        return obj.prop('selectedIndex');
    },

    //get options count
    getCount: function (fid, box) {
        return _iselect.getCountO(_obj.get(fid, box));
    },
    getCountO: function (obj) {
        return obj.find('option').length;
    },

    //set by index(base 0)
    setIndex: function (fid, idx, box) {
        _iselect.setIndexO(_obj.get(fid, box), idx);
    },
    setIndexO: function (obj, idx) {
        obj.find('option').eq(idx).prop('selected', true);
    },

    //傳回選取的欄位的文字
    getText: function (fid, box) {
        var obj = _obj.get(fid, box);
        return _iselect.getTextO(obj);
    },
    getTextO: function (obj) {
        return obj.find('option:selected').text();
    },

    //傳回data屬性(name)值
    getData: function (fid, name, box) {
        return _obj.get(fid, box).find('option:selected').data(name);
    },
    getDataO: function (obj, name) {
        return obj.find('option:selected').data(name);
    },

    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    setItems: function (fid, items, box) {
        var obj = _obj.get(fid, box);
        _iselect.setItemsO(obj, items);
    },
    setItemsF: function (filter, items, box) {
        var obj = _obj.getF(filter, box);
        _iselect.setItemsO(obj, items);
    },
    //by object
    setItemsO: function (obj, items) {
        obj.find('option').remove();
        if (items === null)
            return;

        for (var i = 0; i < items.length; i++)
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    },

    //get all options
    //getIdStrExts -> getExts
    getExts: function (fid, box) {
        var rows = [];
        _obj.get(fid, box).find('option').each(function (i) {
            var me = $(this);
            rows[i] = {
                Id: me.val(),
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    },

    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    setExts: function (fid, items, box) {
        var filter = '#' + fid;
        var obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (var i = 0; i < items.length; i++)
            obj.append(_str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    },

    //把多欄位值寫入json
    //fids: 欄位名稱 array
    valuesToJson: function (json, fids, box) {
        for (var i = 0; i < fids.length; i++)
            json[fids[i]] = _iselect.get(fids[i], box);
        return json;
    },

    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    filterByExt: function (fid, value, rows, box, allItem) {
        if (allItem === undefined)
            allItem = false;
        var obj = _obj.get(fid, box);
        obj.empty();
        //item.find('option').hide();
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext == '') || row.Ext == value)
                obj.append(_str.format('<option value="{0}">{1}</option>', row.Id, row.Text));
        }

        //選取第0筆
        if (len > 0)
            _iselect.setIndexO(obj, 0);
    },

}); //class

//extend _ibase.js, use jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
var _itext = $.extend({}, _ibase, {

    //new method
    //add input mask, use jquery maskedinput
    mask: function (box) {
        var filter = "[data-mask!='']";
        _obj.getF(filter, box).each(function () {
            var me = $(this);
            me.mask(me.data('mask'));
        });
    },

}); //class


//for textarea input
var _itextarea = $.extend({}, _ibase, {

    /*
    getO: function (obj) {
        //return obj.html();
        return obj.val();
    },

    setO: function (obj, value) {
        //obj.html(value);
        obj.val(value);
    },
    */

}); //class

var _json = {

    /**
     add json object into another object
     @param {object} source source object
     @param {object} target target object
     @return {object}
     */
    /*
    addJson: function (source, target) {
        if (!target)
            target = {};
        Object.keys(source).map(function (key, index) {
            target[key] = source[key];
        });
        return target;
    },
    */

    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */ 
    copy: function (from, to) {
        var to = to || {};
        for (var key in from)
            to[key] = from[key];
        return to;
        /*
        Object.keys(from).map(function (key, index) {
            to[key] = from[key];
        });
        */
    },

    /**
     * convert keyValues to json object
     * param keyValues {array} keyValue array
     * param keyId {string} key field id, default to 'Key'
     * param valueId {string} value field id, default to 'Value'
     * return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    keyValuesToJson: function (keyValues, keyId, valueId) {
        if (keyValues === null || keyValues.length === 0)
            return null;

        if (!keyId)
            keyId = 'Key';
        if (!valueId)
            valueId = 'Value';
        var data = {};
        for (var i=0; i<keyValues.length; i++) {
            var row = keyValues[i];
            data['f'+row[keyId]] = row[valueId];
        }
        return data;
    },

    //json: object or object array
    toStr: function (json) {
        return (_json.isEmpty(json)) ? '' : JSON.stringify(json);
    },

    isEmpty: function (json) {
        return (json == null || $.isEmptyObject(json));
    },

    //check is key-value pair
    isKeyValue: function (value) {
        return (Object.prototype.toString.call(value) === '[object Object]');
    },

    //convert url to json 
    urlToJson: function (url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        var pairs = url.split('&');
        var json = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            if (pair[0] !== "")
                json[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return json;
    },

    //convert string to json array
    strToArray: function (str) {
        return $.parseJSON(str);
    },

    //find jarray
    //return array index
    findIndex: function (rows, fid, value) {
        if (rows == null)
            return -1;

        for (var i = 0; i < rows.length; i++) {
            if (rows[i][fid] == value) 
                return i;           
        }

        //case of not found
        return -1;
    },

    //filter json array
    filterRows: function (rows, fid, value) {
        return rows.filter(function (row) {
            return (row[fid] === value);
        });
    },

    //appendRows
    appendRows: function (froms, tos) {
        if (froms == null || froms.length == 0)
            return;

        var len = tos.length;
        for (var i = 0; i < froms.length; i++) {
            tos[len + i] = froms[i];
        }
    },

    /**
     * (recursive) remove null for json object
     * param obj {json} by ref
     * param level {int} (default 0) debug purpose, base 0
     * return void
     */
    removeNull: function (obj, level) {
        //debugger;
        level = level || 0;
        $.each(obj, function (key, value) {
            if (value === null) {
                //delete only null, empty is not !!
                delete obj[key];
            } else if (_json.isKeyValue(value)) {
                _json.removeNull(value, level + 1);
            } else if ($.isArray(value)) {
                //check
                var len = value.length;
                if (len == 0) {
                    delete obj[key];
                    return; //continue
                }

                //case of string array
                if (!_json.isKeyValue(value[0])) {
                    var isEmpty = true;
                    for (var i = 0; i < len; i++) {
                        if (!_str.isEmpty(value[i])) {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (isEmpty)
                        delete obj[key];
                    return; //continue
                }

                //case of json array
                $.each(value, function (k2, v2) {
                    _json.removeNull(v2, level + 1);

                    if (_json.isEmpty(v2))
                        v2 = null;
                });

                //check json and remove if need
                var isEmpty = true;
                //from end
                for (var i = len - 1; i >= 0; i--) {
                    if (!_json.isEmpty(value[i])) {
                        isEmpty = false;
                    } else if (isEmpty) {
                        //delete array element
                        delete value[i];
                    } else {
                        value[i] = null;
                    }
                }
                if (isEmpty)
                    delete obj[key];
            }
        });

        if (_json.isEmpty(obj))
            obj = null;
    },

}; //class

var _leftmenu = {

    init: function () {
        //set variables
        _leftmenu.menu = $('.xg-leftmenu');
        //_leftmenu.box = _leftmenu.menu.parent();
        //_leftmenu.body = $('#_Body');
        //_leftmenu.setBoxWidth(true);
        //.css('width', _leftmenu.menu.data('max-width') + 'px');

        //click時, show/hide 下一個 element, 可省去在panel設定id的步驟
        //for left-menu
        $('.xg-toggle').click(function (e) {
            e.preventDefault();

            var me = $(this);
            me.next().collapse('toggle');
            var arrow = me.find('.xg-arrow');
            var clsName= 'xg-open';
            if (arrow.hasClass(clsName))
                arrow.removeClass(clsName);
            else
                arrow.addClass(clsName);
        });
    },

    /*
    //set width for container of left menu
    setBoxWidth: function (isOpen) {
        var fid = isOpen ? 'max-width' : 'min-width';
        //_leftmenu.box.css('width', _leftmenu.menu.data(fid) + 'px');
    },
    */

    onToggleMenu: function () {
        _leftmenu.menu.toggleClass('xg-close');
    },
};
var _locale = {

}; //class

var _log = {

    /**
     * @description 記錄程式時間功能的變數
     */
    _start: 0,      //開始時間
    _now: 0,        //目前時間
    //_result: '',    //目前記錄的內容

    info: function (msg) {
        console.log(msg);
    },

    error: function (msg) {
        alert(msg);
    },

    /**
     * @description 初始化記錄程式時間功能
     */
    logTimeInit: function (name) {
        _start = new Date();
        _now = _start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    },

    /**
     * @description 記錄程式執行時花用的時間
     */
    logTime: function (name) {
        var now = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        var msg = name + ":" + (now - _now) + "/" + (now - _start);
        console.log(msg);
        _now = new Date();;    //reset
    },

}; //class

var _modal = {

    show: function (id) {
        $('#' + id).modal('show');
    },
    hide: function (id) {
        $('#' + id).modal('hide');
    },
    showO: function (obj) {
        obj.modal('show');
    },
    hideO: function (obj) {
        obj.modal('hide');
    },
    showF: function (filter) {
        $(filter).modal('show');
    },
    hideF: function (filter) {
        $(filter).modal('hide');
    },

};//class

var _nav = {

    moveLeft: function (obj) {
        obj.insertBefore(obj.prev());
    },
    moveRight: function (obj) {
        obj.insertAfter(obj.next());
    },

}; //class

//數字相關
var _num = {
    //是否為數字而且大於(等於)0
    //zeor: 可否為0
    isBigZero: function (value, zero) {
        if (isNaN(value))
            return false;
        else if (!zero && (value === '0' || value === 0)) 
            return false;
        else if (parseInt(value) < 0)
            return false;
        else
            return true;
    },

    isNum: function (value) {
        return !isNaN(value);
    },

    toBool: function (value) {
        return (value === 1);
    },

    rowToBool: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _num.toBool(row[fid]);
        }
        return row;
    },

    //http://www.mredkj.com/javascript/numberFormat.html
    addComma: function (str) {
        str += '';
        x = str.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },

};//class


//jquery object
//同時用在輸入欄位和非輸入欄位(ex: button)
var _obj = {

    /**
     * get object by name for input field
     */
    get: function (fid, box) {
        return _obj.getF(_fun.fidFilter(fid), box);
    },

    /**
     * get object by filter string
     */
    getF: function (ft, box) {
        var obj = box.find(ft);
        if (obj == null)
            _log.info('_obj.js getF() found none. (filter=' + ft + ')');
        return obj;
    },

    /**
     * get object by name
     */
    getN: function (name, box) {
        return _obj.getF('[name=' + name + ']', box);
    },

    /**
     * get object by data-id
    getD: function (val, box) {
        return _obj.getF('[data-id=' + val + ']', box);
    },
     */

    /**
     * get object by value
     */
    getV: function (val, box) {
        return _obj.getF('[value=' + val + ']', box);
    },

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    getById: function (id, box) {
        return _obj.getF('#' + id, box);
    },

    //以下function都傳入object
    /**
     * get id of object
     */
    getId: function (obj) {
        return (obj.length > 0) ? obj.attr('id') : '';
    },

    /**
     * get name of object
     */
    getName: function (obj) {
        return (obj.length > 0) ? obj.attr('name') : '';
    },

    /**
     * get data-id of object
    getDid: function (obj) {
        return (obj.length > 0) ? obj.data('id') : '';
    },
     */

    /**
     * check object is visible or not
     */
    isShow: function (obj) {
        return obj.is(':visible');
    },

    /**
     * check object existed or not
     */
    isExist: function (obj) {
        return (obj !== undefined && obj !== null && obj.length > 0);
    },

    /**
     * check object has attribute or not
     * return boolean
     */
    hasAttr: function (obj) {
        return obj.attr(attr);
    },

}; //class
//SPA pjax
var _pjax = {

    /**
     * initial
     * param {string} boxFt : box(container) filter
     */
    init: function (boxFt) {
        //if skip 'POST', it will trigger twice !!
        var docu = $(document);
        docu.pjax('[data-pjax]', boxFt, { type: 'POST' });

        //when backend exception
        docu.on('pjax:error', function (event, xhr, textStatus, errorThrown, opts) {
            opts.success(xhr.responseText, textStatus, xhr);
            return false;
        });

        /*
        $(document).on('ready pjax:success', box, function () {
            debugger;
        });
        $(document).on('ready pjax:end', box, function () {
            debugger;
        });
        $(document).on('ready pjax:complete', box, function () {
            debugger;
        });
        
        $(document).ready(function () {
            debugger;
        });
        */
        //選擇性 binding event 
        //xd-bind 只有用在這裡
        //debugger;
        //$('[data-pjax]:not(.xd-bind)').addClass('xd-bind').on('click', function () {
        //    //post submit
        //    //debugger;
        //    /*
        //    */
        //    $(document).on('ready pjax:success', box, function () {
        //        //bindPJAX(target); // Call initializers
        //        init();
        //        $(document).off('ready pjax:success', box); // Unbind initialization
        //    });
        //    /*
        //    $(document).on('pjax:end', function () {
        //        init();

        //        $(document).off('pjax:end');
        //    });
        //    */

        //    // PJAX-load the new content
        //    //debugger;
        //    //$.pjax.click(event, { container: $(box) });

        //    //var path = _pjax._getPath($(this), '');
        //    var url = $(this).data('pjax');
        //    _pjax.submit(url, box);
        //});

        /*
        //如果後端驗証失敗, 則取消 submit
        $(document).on('pjax:beforeReplace', function (contents, options) {
        });
        $(document).on('pjax:end', function (data, status, xhr) {
            init();
        });
        */

        //pjax載入完成後必須程式載入.js檔案
        //$(document).on('pjax:success', function (data, status, xhr) {
        //    //_me.initByPjax();
        //    //_me.init();
        //    /*
        //    //先載入 JsLib if need
        //    var jsLib = $('#_JsLib').val();
        //    if (!_str.isEmpty(jsLib)) {
        //        $.getScript('../Scripts/' + jsLib + '.js');
        //    }

        //    //如果view包含_JsView這個hidden欄位, 則表示要載入指定的js檔案, 
        //    //否則載入與controller相同名稱的js file
        //    var jsView = $('#_JsView').val();
        //    if (_str.isEmpty(jsView)) {
        //        //get controller name, 在倒數第2個, js檔案名稱固定為controller小寫
        //        var url = data.currentTarget.URL.replace('//', '/');
        //        if (url.substr(url.length - 1, 1) == '/')
        //            url = url.substr(0, url.length - 1);
        //        var items = url.split('/');
        //        if (items.length >= 4)
        //            jsView = items[items.length - 2].toLowerCase();
        //    }

        //    //載入 jsView
        //    if (!_str.isEmpty(jsView)) {
        //        $.getScript('../Scripts/view/' + jsView + '.js', function (data, textStatus, jqxhr) {
        //            //載入成功後執行 init()
        //            if (typeof (_me) !== 'undefined')
        //                _me.init();
        //        });
        //    }
        //    */
        //});
    },

};//class

//program, 包含 crud功能
var _prog = {
    //filter: '.xg-prog-path',
    me: null,
    oriPath: '',    //original path

    init: function () {
        _prog.me = $('.xg-prog-path');
        _prog.oriPath = _prog.me.text();
    },

    //reset path to initial
    resetPath: function () {
        _prog.me.text(_prog.oriPath);
    },

    /**
     * set program path
     * param fun {string} fun mode
     */
    setPath: function (fun, updName) {
        var name = (fun == _fun.FunC) ? _BR.Create :
            (fun == _fun.FunV) ? _BR.View :
            (fun != _fun.FunU) ? '??' :
            _str.isEmpty(updName) ? _BR.Update :
            updName;
        _prog.setFunName(name);
    },

    /**
     * set fun name
     * param name {string} fun name
     */
    setFunName: function (name) {
        _prog.me.text(_prog.oriPath + '-' + name);
    },
};

//https://github.com/davidshimjs/qrcodejs
var _qrcode = {

    set: function (id, box, url, width) {
        return _qrcode.setO(_obj.getById(id, box), url, width);
    },
    setO: function (obj, url, width) {
        width = width || 128;

        //return new QRCode(document.getElementById(id), {
        return new QRCode(obj[0], {
            text: url,
            width: width,
            height: width,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },

};//class

var _str = {

    //column seperator
    colSep: '@@',

    //variables is empty or not
    isEmpty: function (str) {
        return (str === undefined || str === null || str === '');
    },

    notEmpty: function (str) {
        return !_str.isEmpty(str);
    },

    //convert empty string to new string
    emptyToStr: function (str, newStr) {
        return _str.isEmpty(str) ? newStr : str;
    },

    //format string like c# String.Format()
    format: function () {
        var str = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, arguments[i + 1]);
        }
        return str;
    },

    //get mid part string
    getMid: function (str, find1, find2) {
        if (_str.isEmpty(str))
            return '';
        var pos = str.indexOf(find1);
        if (pos < 0)
            return str;
        var pos2 = str.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? str.substring(pos + find1.length)
            : str.substring(pos + find1.length, pos2)
    },

    //get tail part string
    getTail: function (value, find) {
        var pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    },

    toBool: function (val) {
        return (val == '1' || val == true || val == 'True');
    },

    //合併多個欄位成為字串??
    colsToStr: function () {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++)
            str += _str.colSep + arguments[i];
        return str;
    },

    trim: function (str) {
        return $.trim(str);
    },

}; //class

//switch radio, 使用 css3 toggle switch
//https://www.htmllion.com/css3-toggle-switch-button.html
var _switch = {

    //傳回元件內容字串 for client render
    getText: function (yes, no, width, status, inline, fid, cls) {
        var inline2 = (inline) ? ' xg-inline' : '';
        var attr = (fid) ? (' id="' + fid + '"') : '';
        if (status)
            attr += ' checked';
        cls = (cls) ? (' ' + cls) : '';
        var  html = '' +
            '<label class="switch{5}" style="width:{2}px;">' +
                '<input{3} class="switch-input{4}" type="checkbox" />' +
                '<span class="switch-label" data-on="{0}" data-off="{1}"></span>' +
                '<span class="switch-handle"></span>' +
            '</label>';
        return _str.format(html, yes, no, width, attr, cls, inline2);
    },

}; //class

var _tab = {

    moveLeft: function (obj) {
        obj.insertBefore(obj.prev());
    },
    moveRight: function (obj) {
        obj.insertAfter(obj.next());
    },

}; //class

var _table = {

    //btn: fun button in tr
    rowMoveUp: function (btn) {
        var row = $(btn).closest('tr');
        row.insertBefore(row.prev());
    },
    rowMoveDown: function (btn) {
        var row = $(btn).closest('tr');
        row.insertAfter(row.next());
    },

    //delete, up, down
    rowFun: function () {
        return '' +
            _str.format('<a href="javascript:_crud.onUpdate(\'{0}\');"><i class="ico-delete" title="{0}"></i></a>', key, _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="ico-up" title="{0}"></i></a>', _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="ico-down" title="{0}"></i></a>', _BR.TipUpdate);
    },

    /**
     * get rows count
     * param table {object} table object
     * param fid {string} field id(name attribute)
     * return {int} rows count
     */
    getRowCount: function (table, fid) {
        return table.find(_fun.fidFilter(fid)).length;
    },

}; //class

//small public components
var _tool = {

    init: function () {
        //alert
        _tool.xgAlert = $('#xgAlert');
        _tool.xgMsg = $('#xgMsg');
        _tool.xgAns = $('#xgAns');
        _tool.xgArea = $('#xgArea');
        _tool.xgImage = $('#xgImage');
    },

    /**
     * show message box
     * param msg {string} html or string
     * param fnOk {function} callback function
     */
    msg: function (msg, fnClose) {
        var box = _tool.xgMsg;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnMsgClose = fnClose;
    },

    /**
     * show confirmation 
     */
    ans: function (msg, fnYes, fnNo) {
        var box = _tool.xgAns;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnAnsYes = fnYes;
        _tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    },

    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    alert: function (msg, color) {
        var box = _tool.xgAlert;
        box.find('.xd-msg').text(msg)
        box.fadeIn(500, function () {
            box.show();
            setTimeout(function () {
                _tool.onAlertClose();
            }, 5000);   //show 5 seconds
        });
    },

    /*
    //show waiting
    showWait: function () {
        //$('body').addClass('xg-show-loading');
        $('#xgWait').show();
    },
    hideWait: function () {
        //$('body').removeClass('xg-show-loading');
        $('#xgWait').hide();
    },
    */

    /**
     * show textarea editor
     * param title {string} modal title
     * param value {string} textarea value
     * param isEdit {bool} true:edit, false:readonly
     * param fnOk {function} function of onOk
     */
    showArea: function (title, value, isEdit, fnOk) {
        //set title
        var box = _tool.xgArea;
        box.find('.modal-title').text(title);

        //get value & yes button status
        var obj = box.find('textarea');
        obj.val(value);
        _itextarea.setEditO(obj, isEdit);
        _btn.setEditO(box.find('.xd-yes'), isEdit);

        //set callback function
        if (isEdit)
            _tool._fnOnAreaYes = fnOk;

        //show modal
        _modal.showO(box);
    },

    onAreaYes: function () {
        var box = _tool.xgArea;
        if (_tool._fnOnAreaYes) {
            _modal.hideO(box);
            var value = box.find('textarea').val();
            _tool._fnOnAreaYes(value);
        }
    },

    /**
     * show image modal
     * param fileName {string} image file name without path
     * param imageSrc {string} image src
     */ 
    showImage: function (fileName, imageSrc) {
        var box = _tool.xgImage;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _modal.showO(box);
    },

    /**
     * onclick alert close button
     */
    onAlertClose: function () {
        var box = _tool.xgAlert;
        box.fadeOut(500, function () {
            box.hide();
        });
    },

    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    onAnsYes: function () {
        if (_tool._fnOnAnsYes) {
            _modal.hideO(_tool.xgAns);
            _tool._fnOnAnsYes();
        }
    },
    onAnsNo: function () {
        if (_tool._fnOnAnsNo)
            _tool._fnOnAnsNo();
        _modal.hideO(_tool.xgAns);
    },
    onMsgClose: function () {
        if (_tool._fnOnMsgClose)
            _tool._fnOnMsgClose();
        _modal.hideO(_tool.xgMsg);
    },

}; //class

//use jquery validation
var _valid = {

    //error & valid class same to jquer validate
    //errorClass: 'error',
    //validClass: 'valid',

    /**
     * initial jQuery Validation
     * param form {object} form object
     * return {object} validator object
     */
    init: function (form) {
        //remove data first
        form.removeData('validator');

        //config
        var config = {
            ignore: ':hidden:not([data-type=html]),.note-editable.card-block',   //or summernote got error
            //errorClass: 'label label-danger',
            errorElement: 'span',
            errorPlacement: function (error, elm) {
                //debugger;
                error.insertAfter(_valid._getBox($(elm)));
                return false;
            },
            //ignore: '',     //xiFile has hidden input need validate
            //onclick: false, //checkbox, radio, and select
            /*
            */
            highlight: function (elm, errorClass, validClass) {
                //debugger;
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(validClass).addClass(errorClass);
                var obj = _valid._getError(me);
                if (obj != null)
                    obj.show();
                return false;
            },
            unhighlight: function (elm, errorClass, validClass) {
                //debugger;
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(errorClass).addClass(validClass);
                var obj = _valid._getError(me);
                if (obj != null)
                    obj.hide();
                return false;
                //var me = $(elm);
                //me.data('edit', 1);    //註記此欄位有異動
            },
            //copy from jquery validate defaultShowErrors()
            showErrors: function (errorMap, errorList) {
                //this.defaultShowErrors();
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                //remark below !!
                //this.toHide = this.toHide.not(this.toShow);
                //this.hideErrors();
                //this.addWrapper(this.toShow).show();
                //return false;
            },
        };

        return form.validate(config);
    },

    _getBox: function (obj) {
        //closest will check this first !!
        return obj.closest('.xi-box');
    },

    /**
     * get error object
     * param obj {object} input object
     */ 
    _getError: function (obj) {
        var error = _valid._getBox(obj).next();
        return (error.length == 1 && error.hasClass('error') && error.is('span'))
            ? error : null;
    },

    valid: function () {
        var valid, validator, errorList;

        if ($(this[0]).is("form")) {
            valid = this.validate().form();
        } else {
            errorList = [];
            valid = true;
            validator = $(this[0].form).validate();
            this.each(function () {
                valid = validator.element(this) && valid;
                if (!valid) {
                    errorList = errorList.concat(validator.errorList);
                }
            });
            validator.errorList = errorList;
        }
        return valid;
    },

    //#region remark code
    /**
     * check regular
     * param fids {array} fid string array
     * param msg {string} error message
     * param expr {regular} regular expression
     * return {bool}
    anyRegularsWrong: function (fids, msg, expr) {
        if (fids == null || fids.length == 0)
            return false;

        //var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var find = false;
        for (var i = 0; i < fids.length; i++) {
            var value = $('#' + fids[i]).val();
            if (!expr.test(value)) {
                find = true;
                _input.showError(fids[i], msg);
            }
        }
        return find;
    },
     */

    /**
     * check email 
     * see : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
     * params
     *   data : email address
     * return : true/false
    anyEmailsWrong: function (fids, msg) {
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return _valid.anyRegularsWrong(fids, msg, expr);
    },
     */

    /**
     * check address
     * params
     *   data : address
     * return : true/false
    anyAddressesWrong: function (fids, msg) {
        var expr = /^\d+\w*\s*(?:(?:[\-\/]?\s*)?\d*(?:\s*\d+\/\s*)?\d+)?\s+/;
        return _valid.anyRegularsWrong(fids, msg, expr);
    },
     */
    //#endregion

}; //class

var _var = {

    emptyToValue: function (var1, value) {
        return _str.isEmpty(var1) ? value : var1;
    },

    //variables is empty or not
    isEmpty: function (var1) {
        return (var1 === undefined || var1 === null)
    },

};

/**
 * create jQuery dataTables object
 * param selector {string} datatable selector
 * param url {string} backend action url
 * param dtConfig {json} datatables config
 * param findJson {json} (optional) find condition when initial
 * param fnOk {function} (optional) callback after query ok, if empty then show successful msg
 * param tbarHtml {string} (optional) datatable toolbar html for extra button
 */
function Datatable(selector, url, dtConfig, findJson, fnOk, tbarHtml) {

    //public property 
    this.dt = null;             //jquery datatables object
    this.findJson = findJson;   //find condition
    this.recordsFiltered = -1;  //found count, -1 for recount, name map to DataTables
    this.defaultShowOk = true;  //whethor show find ok msg, default value

    //private
    //keep start row idx, false(find), true(save reload)
    this._keepStart = false;

    //now start row idx, coz ajax.dataSrc() always get 0 !!
    this._start = 0;

    //(now)show find ok msg or not
    this._nowShowOk = this.defaultShowOk;      
        
    /**
     * reset found count
     */ 
    this.resetCount = function () {
        //var count = reset ? -1 : this.dt.recordsFiltered;
        this.recordsFiltered = -1;
    };

    /**
     * find rows
     * param findJson {json} find condition
     */
    this.find = function (findJson) {

        this.findJson = findJson;
        //this.findStr = findStr || '';
        this.resetCount();   //recount first

        //trigger dataTables search event
        //this.dt.search(this.findStr).draw();
        this.dt.search('').draw(!this._keepStart);
    };

    /**
     * refind with same condition for refresh form
     * not show find ok msg
     */ 
    this.reload = function () {
        this._keepStart = true;
        this._nowShowOk = false;  //not show find ok msg
        this.find(this.findJson);
    };

    /**
     * initial jquery datatables, 參數參考前面的建構子
     */
    this.init = function (selector, url, dtConfig, fnOk, tbarHtml) {
        
        //default config for dataTables
        var config = {
            processing: false,  //use custom processing msg
            serverSide: true,   //server pagination
            jQueryUI: false,
            filter: false,      //find string            
            paginate: true,     //paging          
            lengthChange: true, //set page rows
            info: true,         //show page info, include now page, total pages
            sorting: [],        //default not sorting, or datatable will sort by first column !!
            pagingType: "full_numbers",
            //stateSave: true,
            //ordering: false,

            //set locale file
            language: {
                url: "/locale/" + _fun.locale + "/dataTables.txt",
            },

            //default toolbar layout
            dom: _crud.dtDom,

            //call after dataTables initialize
            //1.add toolbar button list if need
            //2.change find action: find after enter !!
            initComplete: function (settings, json) {
                //1.toolbar
                if (tbarHtml)
                    $(this).closest('.dataTables_wrapper').find('div.toolbar').html(tbarHtml);

                //check filter existed
                var filter = $(selector + "_filter input");
                if (filter.length > 0) {
                    //2.unbind first
                    filter.unbind();

                    //bind key enter for quick search
                    var api = this.api();
                    filter.bind('keyup', function (e) {
                        if (e.keyCode === 13) {
                            this.resetCount();

                            //run search
                            api.search(this.value).draw();     //must draw() !!
                        }
                    });
                } else {
                    //console.log('no dataTables filter !!');
                    //return;
                }
            }.bind(this),

            //ajax config(not standard jquery ajax !!)
            //me: this,
            ajax: {
                //config
                url: url,
                type: 'POST',
                dataType: 'json',

                //add input parameter for datatables
                data: function (arg) {
                    arg.findJson = _json.toStr(this.findJson);    //string type
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),                

                //on success (cannot use success event), see DataTables document !!
                dataSrc: function (result) {
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset

                    var msg = _ajax.resultToMsg(result);
                    if (msg) {
                        _tool.msg(msg);
                        result.recordsFiltered = 0;
                        this.recordsFiltered = 0;
                        return [];  //no null, or jquery will get wrong !!

                    } else {
                        //set global
                        this.recordsFiltered = result.recordsFiltered;

                        if (fnOk) {
                            return fnOk(result);
                        } else if (result.data === null || result.data.length === 0) {
                            _tool.alert(_BR.FindNone, 'R');
                            return [];
                        } else {
                            if (this._nowShowOk)
                                _tool.alert(_BR.FindOk);
                            this._nowShowOk = this.defaultShowOk;  //reset to default
                            return result.data;
                        }
                    }
                }.bind(this),

                //on error
                error: function (xhr, ajaxOptions, thrownError) {
                    _tool.hideWait();
                    _tool.msg('Datatable.js error.');
                    if (xhr != null) {
                        console.log('status' + xhr.status);
                        console.log(thrownError);
                    }
                },
            },
        };

        //add custom columnDefs
        if (dtConfig) {
            if (!_var.isEmpty(dtConfig.columnDefs)) {
                var colDefs = dtConfig.columnDefs;
                colDefs[colDefs.length] = _crud.dtColDef;
            }
            config = _json.copy(dtConfig, config);
        }
        
        //before/after ajax call, show/hide waiting msg
        var dt = $(selector);
        dt.on('preXhr.dt', function (e, settings, data) { _fun.block(); });
        dt.on('xhr.dt', function (e, settings, data) { _fun.unBlock(); });
        this.dt = dt.DataTable(config);

        //.DataTables() will return DataTable API instance, but .dataTable() only return jQuery object !!
        //return { datatable: dt.DataTable(config), findJson: {} };
    };

    //must put last
    this.init(selector, url, dtConfig, fnOk, tbarHtml);

} //class
/**
 * multiple edit forms
 * notice:
 *   1.set data-fkeyFid when save
 *   
 * param kid {string} (required) pkey field id(single key)
 * param eformId {string} (optional) edit form id
 *   if not empty, system will load UI & prepare save rows
 *     and rows container tag is fixed to 'tbody'
 *   if empty, you could write below custom functions:
 *     1.void fnLoadJson(json): necessary, show form
 *     2.json fnGetUpdJson(upKey): necessary
 *     3.bool fnValid(): (optional) validate check
 * param tplRowId {string} (optional) row template id for load row & render row.
 * param rowFilter {string} (optional) filter for find row object
 *   1.inside element -> row(onDeleteRow), 2.rowsBox -> row(getUpdRows)
 * param sortFid {string} (optional) sort fid for sorting function
 * return {EditMany}
 */
function EditMany(kid, eformId, tplRowId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid

        this.kid = kid;
        this.hasTplRow = !_str.isEmpty(tplRowId);
        this.hasRowFilter = !_str.isEmpty(rowFilter);
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;

        if (this.hasTplRow) {
            this.tplRow = $('#' + tplRowId).html();
            var rowObj = $(this.tplRow);
            _edit.setFidTypeVars(this, rowObj);
            _edit.setFileVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = !_str.isEmpty(eformId);
        if (this.hasEform) {
            this.eform = $('#' + eformId);     //edit form object
            this.rowsBox = this.eform.find('tbody'); //use tbody(in table)
        }

        this.deletedRows = [];  //deleted key string array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * check is a new row or not
     * param row {json} 
     * return {bool}
     */
    this.isNewRow = function (row) {
        //return _str.isEmpty(row[this.kid]);
        return _edit.isNewKey(row[this.kid]);
    };

    /**
     * reset edit form
     * param rowsBox {object} optional
     */
    this.reset = function (rowsBox) {
        rowsBox = this.getRowsBox(rowsBox);
        if (rowsBox != null)
            rowsBox.empty();   //empty rows ui first

        //reset variables
        this.newIndex = 0;
        this.resetDeleted();
    };

    /**
     * reset deleted rows
     */
    this.resetDeleted = function () {
        this.deletedRows = [];
    };

    /**
     * load this json rows into UI
     * param json {json} 
     */
    this.loadJson = function (json) {
        if (this.hasEform) {
            var rows = (json == null || json[_crud.Rows] == null)
                ? null : json[_crud.Rows];
            this.loadRows(this.rowsBox, rows);
        } else {
            //raise error if no function
            this.fnLoadJson(json);
        }
    };

    /**
     * load json rows into UI by UserRole Mode(urm)
     * param json {json} 
     */
    this.urmLoadJson = function (json, rowsBox, fids) {
        //reset form first
        var objs = rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');

        //check
        var rows = _crud.getJsonRows(json);
        if (rows == null)
            return;

        //set checked sign & old value
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = rowsBox.find(_fun.fidFilter(row[fids[1]]));   //fid map to dataFid
            _icheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    };

    /**
     * get upd json by UserRole mode(urm)
     * param upKey {string} up key
     * param rowsBox {object} rows box
     * param keyFid {string} key fid, ex: UserId
     * param dataFid {string} data fid, ex: RoleId
     * return {json} modified columns only
     */
    this.urmGetUpdJson = function (upKey, rowsBox, fids) {
        var json = {};
        var rows = [];
        var me = this;
        var newIdx = 0;
        this.resetDeleted();    //reset first
        rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_str.isEmpty(key)) {
                if (_icheck.checkedO(obj)) {
                    //new row
                    var row = {};
                    row[fids[0]] = ++newIdx;
                    row[fids[1]] = _icheck.getO(obj);
                    me.rowSetFkey(row, upKey);  //set foreign key value
                    rows[rows.length] = row;
                }
            } else {
                if (!_icheck.checkedO(obj)) {
                    //delete row
                    me.deleteRow(key);
                }
            }
        });

        if (rows.length > 0)
            json[_crud.Rows] = rows;
        json[_crud.Deletes] = this.getDeletedStr();
        return json;
    },

    /**
     * load row by row box(container), also set old value
     * param rowBox {object}
     * param row {json}
     * param index {int}
     */
    this.loadRow = function (rowBox, row, index) {
        if (!this.checkTplRow())
            return;

        var form = $(Mustache.render(this.tplRow, { Index: index }));
        _form.loadJson(form, row);   //use name field

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, form);
            obj.data(_edit.DataOld, row[fid]);
        }

        rowBox.append(form);
    };

    /**
     * load rows to form UI, also set old values !!
     * param rowsBox {object} rows box object
     * param rows {jsons}
     */ 
    this.loadRows = function (rowsBox, rows, reset) {
        if (!this.checkTplRow())
            return;

        //reset if need
        if (reset === undefined)
            reset = true;
        if (reset)
            this.reset(rowsBox);

        //var rows = json._rows;
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen === 0)
            return;

        //render rows
        for (var i = 0; i < rowLen; i++) {
            var row = rows[i];
            var box = $(Mustache.render(this.tplRow, row));
            //box.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j = j + 2) {
                fid = this.fidTypes[j];
                var obj2 = _obj.get(fid, box);
                _edit.setOld(obj2, row[fid]);
            }

            //one row into UI
            _form.loadJson(box, row);

            //into rows box
            box.appendTo(rowsBox);
        }        
    };

    /**
     * validate form
     */
    this.valid = function () {
        return (this.hasEform) ? this.eform.validTable(this.validator) :
            (this.fnValid == null) ? true : this.fnValid();
    };

    /**
     * get row key
     * param box {object} row box
     * return {string} key value
     */
    this.getKey = function (box) {
        return _input.get(this.kid, box);
    };

    /**
      * get row(json) by tr object
      * trObj {object} tr object
      * fidTypes {string array} field info array
      * return {json} one row
      */
    this.getRow = function (trObj) {
        //var fidTypes = this.fidTypes;
        var row = {};
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            obj = _obj.get(fid, trObj);
            row[fid] = _input.getO(obj, trObj, this.fidTypes[i + 1]);
        }
        return row;
    };

    this.checkRowFilter = function () {
        if (this.hasRowFilter)
            return true;

        _log.error('EditMany.js this.rowFilter is empty.');
        return false;
    };

    this.checkTplRow = function () {
        if (this.hasTplRow)
            return true;

        _log.error('EditMany.js this.tplRow is empty.');
        return false;
    };

    /**
     * get row box by inside element/object
     * param elm {element/object}
     * return {object}
     */
    this.elmToRowBox = function (elm) {
        return this.checkRowFilter()
            ? $(elm).closest(this.rowFilter)
            : null;
    };

    /**
     * get updated json, called by crud.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    this.getUpdJsonByCrud = function (upKey) {
        return (this.hasEform)
            ? this.getUpdJson(upKey, this.rowsBox)
            : this.fnGetUpdJson(upKey);
    };

    /**
     * get updated json, called by crud.js only
     * param upKey {string}
     * param rowsBox {object}
     * return {json} modified columns only
     */
    this.getUpdJson = function (upKey, rowsBox) {
        rowsBox = this.getRowsBox(rowsBox);
        var json = {};
        json[_crud.Rows] = this.getUpdRows(upKey, rowsBox);
        json[_crud.Deletes] = this.getDeletedStr();
        return json;
    };

    /**
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
    this.isNewKey = function (key) {
        return (key.length <= 3);
    };
     */

    /**
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows container
     * return {jsons} null if empty
     */ 
    this.getUpdRows = function (upKey, rowsBox) {
        if (!this.checkRowFilter())
            return;

        //set sort field
        rowsBox = this.getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //this is not work inside each() !!
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            //add new row if empty key
            var tr = $(item);
            var key = _input.get(me.kid, tr);
            if (_edit.isNewKey(key)) {
                var row2 = me.getRow(tr);
                row2[me.DataFkeyFid] = upKey;   //write anyway !!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            //var key = tr.data(_fun.DataKey);
            //var oldRow = me.getOldRow(key);
            var diffRow = {};
            var diff = false;
            var fid, ftype, value, obj;
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                //skip read only input !!
                ftype = me.fidTypes[j + 1];
                if (ftype === 'read')
                    continue;

                fid = me.fidTypes[j];
                obj = _obj.get(fid, tr);
                value = _input.getO(obj, tr, ftype);
                //if totally compare, string is not equal to numeric !!
                if (value != _edit.getOld(obj)) {
                    diffRow[fid] = value;
                    diff = true;
                }
            }

            if (diff) {
                /* ??
                //diffRow[me.DataIsNew] = 0;
                //diffRow[_fun.DataKey] = key;
                for (var j = 0; j < me.extFidLen; j++) {
                    diffRow[me.extFids[j]] = oldRow[me.extFids[j]];
                }
                */
                diffRow[kid] = key;    //set key value
                //diffRow[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    };

    /** 
     * get deleted rows(key array "string" !!)
     * return {string} null for empty.
     */ 
    this.getDeletedStr = function () {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    };    

    /**
     * onclick addRow button
     */
    this.onAddRow = function () {
        this.addRow();
    };

    /**
     * add one row into UI
     * param {object} row(optional)
     * return {object} row jquery object(with UI)
     */
    this.addRow = function (rowsBox, row) {
        row = row || {};
        rowsBox = this.getRowsBox(rowsBox);
        var obj = this.renderRow(rowsBox, row);
        this.boxSetNewId(obj);
        return obj;
    };

    /**
     * onclick deleteRow
     * param btn {element}
     */
    this.onDeleteRow = function (btn) {        
        var box = this.elmToRowBox(btn);
        this.deleteRow(_itext.get(this.kid, box), box);
    };

    /**
     * add deleted row & remove UI row
     * param key {string} row key
     * param rowBox {object} (optional) row box object
     */ 
    this.deleteRow = function (key, rowBox) {
        var deletes = this.deletedRows;
        var found = false;
        var rowLen = deletes.length;
        for (var i = 0; i < rowLen; i++) {
            //do nothing if existed
            if (deletes[i][this.kid] === key) {
                found = true;
                break;
            }
        }

        //add deleted[]
        if (!found)
            deletes[rowLen] = key;

        //remove UI row if need
        if (_obj.isExist(rowBox))
            rowBox.remove();
    };

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    this.onViewFile = function (table, fid, elm) {
        var key = this.getKey(this.elmToRowBox(elm));
        _edit.viewFile(table, fid, elm, key);
    };

    /**
     * render row by UI template, called by addRow()
     * param rowsBox {object}
     * param row {json}
     * return {object} row object
     */ 
    this.renderRow = function (rowsBox, row) {
        if (!this.checkTplRow())
            return;

        rowsBox = this.getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.tplRow, row));
        _form.loadJson(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    };

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data, rowsBox) {
        if (!this.hasFile)
            return null;

        if (!this.checkRowFilter())
            return null;

        rowsBox = this.getRowsBox(rowsBox);
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        rowsBox.find(me.rowFilter).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _edit.getServerFid(levelStr, fid);
                if (_ifile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * row set fkey value
     * param row {json}
     * param fkeyFid {string}
     */
    this.rowSetFkey = function (row, fkey) {
        if (row != null && this.isNewRow(row))
            row[this.DataFkeyFid] = fkey;
    };

    /**
     * rows set fkey value
     * param rows {jsons}
     * param fkeyFid {string} fkey value
     */
    this.rowsSetFkey = function (rows, fkey) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && this.isNewRow(row))
                    row[this.DataFkeyFid] = fkey;
            }
        }
    };

    /**
     * set new id by row box
     * param box {object} row box
     * return {int} new key index
     */
    this.boxSetNewId = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
        return this.newIndex;
    };

    /**
     * set sort field if need
     * param rowsBox {object}
     */
    this.setSort = function (rowsBox) {
        var sortFid = this.sortFid;
        if (_str.isEmpty(sortFid))
            return;

        var me = this;
        rowsBox = this.getRowsBox(rowsBox);
        rowsBox.find(_fun.fidFilter(sortFid)).each(function (i, item) {
            //this did not work in this loop !!
            _itext.set(sortFid, i, $(item).closest(me.rowFilter));
        });
    };

    /**
     * get rows box
     * param rowsBox {object} optional, return this.rowsBox if null
     * return {object}
     */
    this.getRowsBox = function (rowsBox) {
        return rowsBox || this.rowsBox;
    };

    //call last
    this.init();

    /*
    //??
    //src: 來源資料
    //return: true/false
    this.onClickDeleteRows = function (src) {
        var find = false;
        if (src.deletedRows == null)
            src.deletedRows = [];
        src.box.find('[data-id=' + src.checkFid + ']:checked').each(function (index, item) {
            find = true;
            var check = $(item);
            var tr = check.closest('tr');
            var key = tr.data('key');
            if (key !== '')
                src.deletedRows[src.deletedRows.length] = key;
            //刪除資料
            tr.remove();
        });
        return find;
        //_tool.msg('請先選取資料。')
    };

    //選取所有checkbox
    //onClickCheckAll: function (tableId, dataFid, status) {
    onClickCheckAll: function (me, dataFid) {
        dataFid = dataFid || '_check0';
        var status = me.checked;
        $(me).closest('table').find('[data-id=' + dataFid + ']:not(:disabled)').prop('checked', status);
    };

    //??
    //get field by rowNo and dataId ??
    this.getField = function (tbody, rowNo, dataId) {
        return tbody.find('tr').eq(rowNo).find('[data-id=' + dataId + ']');
    };

    //?? -> _crud.js
    //keys is two dimension
    this.keysToStr = function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    };
    */

} //class
/**
 * single edit form, called by _crud.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 
 * custom function called by _crud.js
 *   //void fnAfterLoadJson(json)
 *   void fnAfterOpenEdit(fun, json): called after open edit form
 *   void fnAfterSwap(readMode): called after _crud.swap()
 *   error fnWhenSave()
 *   void fnAfterSave()
 *   
 * param kid {string} (optional 'Id') key field id
 * param eformId {string} (optional 'eform')
 * return {EditOne}
 */ 
function EditOne(kid, eformId) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     */
    this.init = function () {
        this.kid = kid || 'Id';
        this.eform = $('#' + (eformId || 'eform'));     //multiple rows container object

        _edit.setFidTypeVars(this, this.eform);
        _edit.setFileVars(this, this.eform);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.getKey = function () {
        return _input.get(this.kid, this.eform);
    };

    /**
     * get field value
     * return {string}
     */
    this.getValue = function (fid) {
        return _input.get(fid, this.eform);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.isNewRow = function () {
        return _str.isEmpty(this.getKey());
    };

    /**
     * load row into UI, also save into old variables
     * param row {json}
     */
    this.loadRow = function (row) {
        _form.loadJson(this.eform, row);

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, this.eform);
            obj.data(_edit.DataOld, row[fid]);
        }
    };

    /**
     * get updated row, 包含 _childs
     * return {json} different column only
     */
    this.getUpdRow = function () {
        return _edit.getUpdRow(this.kid, this.fidTypes, this.eform);
    };

    /**
     * reset UI and edited variables
     */
    this.reset = function () {
        _form.reset(this.eform);
    };

    /**
     * set form edit status
     * param status {bool} edit status
     */
    this.setEdit = function (status) {
        _form.setEdit(this.eform, status);
    };

    /**
     * formData add files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        var fileJson = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _edit.getServerFid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    this.onViewFile = function (table, fid, elm) {
        var key = this.getKey();
        _edit.viewFile(table, fid, elm, key);
    };

    //call last
    this.init();

}//class
/**
 * workflow component
 * param boxId {string} edit canvas id
 * param mNode {EditMany}
 * param mLine {EditMany}
 * return {Flow}
 */ 
function Flow(boxId, mNode, mLine) {

    /**
     * initial flow
     */ 
    this.init = function () {
        //#region constant
        //node types
        this.StartNode = 'S';
        this.EndNode = 'E';
        this.NormalNode = 'N';
        //this.AutoNode = 'A';

        //and/or seperator for line condition
        //js only replace first found, so use regular, value is same to code.type=AndOr
        this.OrSep = '{O}';  
        this.AndSep = '{A}';
        this.ColSep = ',';

        //html filter/class
        this.NodeFilter = '.xf-node';   //for find node object
        this.MenuFilter = '.xf-menu';   //menu for node/line property
        this.EpFilter = '.xf-ep';       //node end point
        this.StartNodeCls = 'xf-start-node';    //start node class
        this.EndNodeCls = 'xf-end-node';        //end node class
        //this.AutoNodeCls = 'xf-auto-node';      //auto node class

        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };  //initial
        this.OkLineCfg = { stroke: 'green', strokeWidth: 2 };   //ok
        this.DenyLineCfg = { stroke: 'red', strokeWidth: 2 };   //deny(reject)

        //start node config
        this.StartNodeCfg = {
            filter: this.EpFilter,
            //anchor: 'Continuous',
            anchor: ['Bottom', 'Left', 'Right'],
            //outlineWidth not work !!
            connectorStyle: {
                stroke: '#5c96bc',
                strokeWidth: 2,
                outlineStroke: 'transparent',
                outlineWidth: 3,
            },
            connectionType: 'basic',
            extract: {
                'action': 'the-action'
            },
            maxConnections: 10,
            /*
            onMaxConnections: function (info, e) {
                alert('Maximum connections (' + info.maxConnections + ') reached');
            }
            */
        };

        //end node config
        this.EndNodeCfg = {
            dropOptions: { hoverClass: 'dragHover' },
            //anchor: 'Continuous',
            anchor: ['Top', 'Bottom', 'Left', 'Right'],
            allowLoopback: true,
        };
        //#endregion

        //#region variables
        //editMany
        this.mNode = mNode;
        this.mLine = mLine;

        //this.popupMenu = $('.xf-menu');
        this.divFlowBox = $('#' + boxId);
        this.divLinesBox = $('#divLinesBox');       //hidden
        this.divLineConds = $('#divLineConds');     //div line conds inside modalLineProp
        this.eformNode = $('#eformNode');           //node edit form
        this.eformLine = $('#eformLine');           //line edit form
        this.modalNodeProp = $('#modalNodeProp');
        this.modalLineProp = $('#modalLineProp');

        //node/line template        
        this.tplNode = $('#tplNode').html();
        this.tplLine = $('#tplLine').html();
        this.tplLineCond = $('#tplLineCond').html();

        //now selected type & element
        this.nowIsNode = false;     //true:node, false:line
        this.nowElm = null;         //node element or connection(line)
        //#endregion

        //this.condOpExprs/this.condOpShows, match XpCode.Type=LineOp
        //for show line label
        var condOpMaps = [
            this.OrSep, ') || (',  //or
            this.AndSep, ' && ',    //and
            ',EQ,', '=',
            ',NEQ,', '!=',
            ',GT,', '>',
            ',GE,', '>=',
            ',ST,', '<',
            ',SE,', '<=',
        ];
        this.condOpExprs = [];   //condition op regular expression
        this.condOpShows = [];   //condition op show text
        var j = 0;
        for (var i = 0; i < condOpMaps.length; i = i + 2) {
            this.condOpExprs[j] = new RegExp(condOpMaps[i], 'g');
            this.condOpShows[j] = condOpMaps[i + 1];
            j++;
        }

        //get jsplumb instance
        var plumb = jsPlumb.getInstance({
            Container: boxId,
            //Connector: 'StateMachine',
            Connector: 'Flowchart',            
            Endpoint: ['Dot', { radius: 2 }],
            HoverPaintStyle: { stroke: '#1e8151', strokeWidth: 3 },
            ConnectionOverlays: [
                ['Arrow', {
                    location: 1,
                    id: 'arrow',
                    width: 8,
                    length: 10,
                    foldback: 0.8,
                }],
                ['Label', {
                    label: '',
                    id: 'label',
                    cssClass: 'xf-line-label',
                }]
            ],
        });

        //set one basic connection style 
        plumb.registerConnectionType('basic', {
            anchor: 'Continuous',
            connector: 'Flowchart',
            //connector: 'StateMachine',            
        });

        //set instance first
        this.plumb = plumb;

        //set event
        this._setFlowEvent();
    };

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    this._setFlowEvent = function () {
        var plumb = this.plumb;
        var me = this;

        // bind a click listener to each connection; the connection is deleted. you could of course
        // just do this: jsPlumb.bind('click', jsPlumb.detach), but I wanted to make it clear what was
        // happening.
        //(定義)Notification a Connection was clicked.
        /*
        plumb.bind('click', function (c) {
            //this.showNodeProp();
            this.modalNodeProp.modal('show');
        });
        */

        //line(connection) show context menu
        plumb.bind('contextmenu', function (elm, event) {
            //"this" not work here !!
            me.showPopupMenu(elm, event, false);
        });

        //event: before build connection
        //info: connection        
        //plumb.bind('connection', function (info) {
        plumb.bind('beforeDrop', function (info) {
            //if (this.loading)
            //    return true;

            //if connection existed, return false for stop 
            //info.source did not work here !!
            var conn = info.connection;
            if (plumb.getConnections({ source: conn.source, target: conn.target }).length > 0)
                return false;

            //get source node & type
            //var sourceType = me._elmToNodeRow(conn.source).NodeType;
            //var lineType = this._isSourceCondMode(sourceType) ? this.LineTypeCond : this.LineTypeYes;
            var prop = me.getLineProp('');

            //set conn style & label
            conn.setPaintStyle(prop.style);    //real connection
            me._setLineLabel(conn, prop.label);

            //add parameters(line model) into connection
            //debugger;
            var row = {
                StartNode: me._elmToNodeValue(conn.source, 'Id'),
                EndNode: me._elmToNodeValue(conn.target, 'Id'),
                //LineType: lineType,
                CondStr: '',
                Sort: 9,
            };
            me._setLineKey(conn, me.addLine(row));
            //this.connSetParas(conn, line, true);

            //alert('connect');
            return true;
        });

        /*
        // click listener for the enable/disable link in the source box (the blue one).
        plumb.on(this.NodeFilter, 'contextmenu', function (ev) {
            //this.nowIsNode = true;
            //this.nowElm = ev.target;
            this.wf._showPopupMenu('.xf-menu', ev);
        */

        /*
        // bind a double click listener to 'boxEl'; add new node when this occurs.
        jsPlumb.on(this.boxEl, 'dblclick', function (e) {
            this.newNode(e.offsetX, e.offsetY);
        });
        */

        //hide context menu (jsPlumb no mousedown event !!)
        $(document).bind('mousedown', function (e) {
            //if (_obj.isShow(me.popupMenu))
            //    me.popupMenu.hide(100);
            
            //"this" is not work here !!
            var filter = me.MenuFilter;
            if (!$(e.target).parents(filter).length > 0)
                $(filter).hide(100);
            
        });
    };

    /**
     * set node event & source/target property
     * param nodeObj {object} node object
     */ 
    this._setNodeEvent = function (nodeObj) {
        //set source & target property
        var nodeType = _itext.get('NodeType', nodeObj);
        var plumb = this.plumb;
        var me = this;

        //event: move node (update x,y)
        //initialise draggable elements.
        //must put before makeSource/makeTarget !!
        var nodeElm = nodeObj[0];
        plumb.draggable(nodeElm, {
            grid: [10, 10],
            //update node position
            stop: function (params) {
                //debugger;
                //var node = $(params.el);
                var pos = $(params.el).position();
                _form.loadJson(nodeObj, { PosX: pos.left, PosY: pos.top });
            },
        });

        //build line(connection)
        //must put after plumb.draggable() !!
        if (nodeType != this.EndNode)
            plumb.makeSource(nodeElm, this.StartNodeCfg);
        if (nodeType != this.StartNode)
            plumb.makeTarget(nodeElm, this.EndNodeCfg);

        //event: show node menu
        //this._setNodeEvent(nodeObj);
        nodeObj.on('contextmenu', function (event) {
            //"this" is not work here !!
            me.showPopupMenu(event.target, event, true);
        });

        //create node, remark it: seems no work !!
        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //plumb.fire('jsPlumbDemoNodeAdded', nodeElm);
    };

    /**
     * load nodes into UI
     * param rows {jsons} node rows
     */
    this.loadNodes = function (json) {
        this.reset();

        //stop drawing
        jsPlumb.setSuspendDrawing(true);

        //empty all nodes first
        var box = this.divFlowBox;
        //box.find(this.NodeFilter).remove();

        //set nodes class
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this._setNodeClass(rows[i]);

        //3rd param reset=false, coz box has other objects, cannot reset
        this.mNode.loadRows(box, rows, false);

        //set nodes event
        var me = this;
        box.find(this.NodeFilter).each(function () {
            me._setNodeEvent($(this));
        });

        //start drawing
        jsPlumb.setSuspendDrawing(false, true);
    };

    /**
     * load nodes into UI(hide)
     * param rows {jsons} line rows
     */
    this.loadLines = function (json) {
        //stop drawing
        jsPlumb.setSuspendDrawing(true);

        /*
        //empty jsplumb lines
        var conns = this.plumb.getAllConnections();   //for in did not work !!
        for (var i = 0; i < conns.length; i++)
            this.plumb.deleteConnection(conns[i]);
        */

        //render jsplumb line
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this._renderLine(rows[i]);

        //load editMany lines
        this.mLine.loadRows(this.divLinesBox, rows);

        //start drawing
        jsPlumb.setSuspendDrawing(false, true);
    };

    //#region node function
    /**
     * set node class(_NodeClass), template has this field
     * param row {json} node row
     * return {json} new row
     */ 
    this._setNodeClass = function (row) {
        switch (row.NodeType) {
            case this.StartNode:
                row._NodeClass = this.StartNodeCls;
                break;
            case this.EndNode:
                row._NodeClass = this.EndNodeCls;
                break;
            /*
            case this.AutoNode:
                row._NodeClass = this.AutoNodeCls;
                break;
            */
            default:
                //normal node
                break;
        }

        return row;
    };

    //add new node
    this.addNode = function (name, nodeType) {
        //json row initial value
        var row = {
            Name: name,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };

        var node = this.mNode.addRow(this.divFlowBox, this._setNodeClass(row));
        this._setNodeEvent(node);   //set node event
    };

    /**
     * node id to node object
     */ 
    this._idToNode = function (id) {
        return this.divFlowBox.find('.xf-node [value=' + id + ']').closest('.xf-node');
    };
    /**
     * inside element to node object
     */ 
    this._elmToNode = function (elm) {
        return $(elm).closest(this.NodeFilter);
    };
    this._elmToNodeValue = function (elm, fid) {
        var node = this._elmToNode(elm);
        return this._boxGetValue(node, fid);
    };

    /**
     * node get field value
     * param node {object} node object
     * param fid {string} field id
     * return {string}
     */ 
    this._boxGetValue = function (node, fid) {
        return _itext.get(fid, node);
    };

    /**
     * node get field values
     * param node {object} node object
     * param fids {strings} field id array
     * return {json}
     */ 
    this._boxGetValues = function (node, fids) {
        var json = {};
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            json[fid] = _itext.get(fid, node);
        }
        return json;
    };

    this.deleteNode = function (nodeElm) {
        //delete from & to lines
        var plumb = this.plumb;
        this.deleteLines(plumb.getConnections({ source: nodeElm }));
        this.deleteLines(plumb.getConnections({ target: nodeElm }));

        //add deleted row of node
        var node = $(nodeElm);
        this.mNode.deleteRow(this._getObjKey(node));

        //delete node 
        $(nodeElm).remove();
    };
    //#endregion (node function)

    //#region line function
    /**
     * add one line(connector)
     * param row {json} line row
     * return void
     */ 
    this._renderLine = function (row) {

        //param 2(reference object) not work here !!
        var prop = this.getLineProp(row.CondStr);    //get line style & label
        var conn = this.plumb.connect({
            //type: 'basic',
            source: this._idToNode(row.StartNode),
            target: this._idToNode(row.EndNode),
            paintStyle: prop.style,
            //anchors: ["Right", "Left"],
        });

        //add custom attributes: whole line model(big camel), only this way workable !!
        //this.connSetParas(conn, row, isNew); 
        this._setLineKey(conn, row.Id);

        //set label
        this._setLineLabel(conn, prop.label);
    };

    /**
     * add flow line into hide UI for crud
     * param row {json}
     * return {string} line key
     */
    this.addLine = function (row) {
        var newLine = $(this.tplLine);      //create row object, no need mustache()
        _form.loadJson(newLine, row);        //row objec to UI
        var key = this.mLine.boxSetNewId(newLine);   //set new key
        this.divLinesBox.append(newLine);   //append row object
        return key;
    };

    /**
     * set connection key
     */ 
    this._setLineKey = function (conn, key) {
        var row = {};
        row['Id'] = key;
        conn.setParameters(row);
    };

    //is line source node a condition mode(true) or yes/no type(false)
    this._isSourceCondMode = function (sourceType) {
        //return (sourceType == this.StartNode || sourceType == this.AutoNode);
        return (sourceType == this.StartNode);
    };

    /**
     * get line property: style, label
     * return {json} 
     */ 
    this.getLineProp = function (condStr) {
        return {
            //type: type,
            style: this.InitLineCfg,
            label: this._condStrToLabel(condStr),
        }
    };

    this._getLineElmKey = function (conn) {
        return conn.getParameters()['Id'];
    };

    /**
     * get object(node/line) key
     * param obj {object}
     * return {string} key value
     */
    this._getObjKey = function (obj) {
        return _itext.get('Id', obj);
    };

    //set connection label
    this._setLineLabel = function (conn, label) {
        var obj = conn.getOverlay('label');
        obj.setVisible(!_str.isEmpty(label));
        obj.setLabel(label);
        //conn.getOverlay('label').setLabel(label);
    };

    //delete line with warning msg
    this.deleteLineWithMsg = function (conn) {
        _tool.ans('delete this line ?', function () {
            this.deleteLine(conn);
        });
    };
    //delete line without warning msg
    this.deleteLine = function (conn) {
        //add deleted row
        var json = conn.getParameters();    //model
        this.mLine.deleteRow(json.Id);

        //delete conn
        this.plumb.deleteConnection(conn);
    };
    this.deleteLines = function (conns) {
        for (var i = 0; i < conns.length; i++) {
            this.deleteLine(conns[i]);
        }
    };
    //#endregion (line function)

    this.reset = function () {
        //below method not working !!
        //jsPlumb.deleteEveryEndpoint();
        //jsPlumb.removeAllEndpoints();
        //jsPlumb.detachEveryConnection();
        //jsPlumb.reset();

        //reset lines
        var conns = this.plumb.getAllConnections();   //for in did not work !!
        var len = conns.length;
        for (var i = len - 1; i >= 0; i--)
            this.plumb.deleteConnection(conns[i]);        

        //reset nodes
        var box = this.divFlowBox;
        box.find(this.NodeFilter).remove();
    };

    /**
     * show popup menu for node(normal, auto)/line
     * param elm {element} node element or connection
     * param event {event}
     * param isNode {bool} true(node), false(line)
     */
    this.showPopupMenu = function (elm, event, isNode) {
        //stop default context menu 
        event.preventDefault();

        //set instance variables
        this.nowIsNode = isNode;
        this.nowElm = isNode ? $(elm).closest(this.NodeFilter)[0] : elm;

        //set edit status
        var canEdit = true;
        var nodeType;
        if (isNode) {
            nodeType = this._elmToNodeValue(elm, 'NodeType');
            //canEdit = (nodeType == this.NormalNode || nodeType == this.AutoNode);
            canEdit = (nodeType == this.NormalNode);
        } else {
            nodeType = this._elmToNodeValue(elm.source, 'NodeType');
            //canEdit = (nodeType == this.StartNode || nodeType == this.AutoNode);
            canEdit = (nodeType == this.StartNode);
        }
        /*
        //debugger;
        var item = this.popupMenu.find('.xd-edit');
        if (canEdit)
            item.show();
        else
            item.hide();
        */

        // Show contextmenu
        $(this.MenuFilter).finish()
        //this.popupMenu.finish()
            .toggle(100)
            .css({
                top: event.pageY + 'px',
                left: event.pageX + 'px'
            });
    };

    //convert condiction string to label string
    this._condStrToLabel = function (str) {
        if (_str.isEmpty(str))
            return '';

        var hasOr = str.indexOf(this.OrSep) > 0;
        for (var i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    };

    //convert condStr to List<Cond>
    this._condStrToList = function (str) {
        if (_str.isEmpty(str))
            return null;

        var list = [];
        var k = 0;
        var orList = str.split(this.OrSep);
        var orLen = orList.length;
        var hasOr = (orLen > 1);
        for (var i = 0; i < orLen; i++) {
            var andList = orList[i].split(this.AndSep);
            for (var j = 0; j < andList.length; j++) {
                var cols = andList[j].split(this.ColSep);
                list[k] = {
                    //AndOr: hasOr ? 'O' : 'A',
                    AndOr: hasOr ? this.OrSep : this.AndSep,
                    Fid: cols[0],
                    Op: cols[1],
                    Value: cols[2],
                };
                k++;
            }
        }
        return list;
    };

    //get line condition string
    this._getLineLabel = function () {
        var me = this;
        var condStr = '';
        this.divLineConds.find('tr').each(function (idx) {
            var tr = $(this);
            var str = (idx == 0 ? '' : _iselect.get('AndOr', tr)) +
                _itext.get('Fid', tr) + me.ColSep +
                _iselect.get('Op', tr) + me.ColSep +
                _itext.get('Value', tr);
            condStr += str;
        });
        return condStr;
    };

    this.showNodeProp = function (nodeType) {
        var node = this._elmToNode(this.nowElm);
        var row = this._boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        _form.loadJson(this.modalNodeProp, row);

        //show modal
        _modal.showO(this.modalNodeProp);   //.modal('show');
    };

    //conn: line connection
    this.showLineProp = function (conn) {
        //debugger;
        var form = this.eformLine;  //line prop modal edit form
        //var line = conn.getParameters();   //line model
        var line = this._connToLine(conn);
        //var lineType = line.LineType;

        //show fields
        //_iradio.set('LineType', lineType, form);
        //this.onChangeLineType(lineType); //switch input
        _iread.set('StartNode', this._elmToNodeValue(conn.source, 'Name'), form);
        _iread.set('EndNode', this._elmToNodeValue(conn.target, 'Name'), form);
        _itext.set('Sort', this._boxGetValue(line, 'Sort'), form);

        //show modal
        _modal.showO(this.modalLineProp);

        //if (!this.isLineCondMode(lineType))
        //    line.CondStr = '';

        //load line conditions rows
        this.divLineConds.empty();
        var condList = this._condStrToList(this._boxGetValue(line, 'CondStr'));
        if (condList != null) {
            for (var i = 0; i < condList.length; i++) {
                var newCond = $(this.tplLineCond);
                _form.loadJson(newCond, condList[i]);
                this.divLineConds.append(newCond);
            }
        }
    };

    //jsplumb connection to line object
    this._connToLine = function (conn) {
        return this._idToLine(this._getLineElmKey(conn));
    };

    //id to line object
    this._idToLine = function (id) {
        return this.divLinesBox.find('.xd-line [value=' + id + ']').closest('.xd-line');
    };

    //#region events
    //on add start node
    this.onAddStartNode = function () {
        //check, only one start node allow
        if (this.divFlowBox.find('.' + this.StartNodeCls).length > 0) {
            //_tool.msg(this.R.StartNodeExist);
            _tool.msg('Start Node Already Existed !');
            return;
        }

        //add node
        this.addNode('Start', this.StartNode);
    };
    //on add end node
    this.onAddEndNode = function () {
        this.addNode('End', this.EndNode);
    };
    /*
    this.onAddAutoNode = function () {
        this.addNode('Auto', this.AutoNode);
    };
    */
    //on add normal node
    this.onAddNormalNode = function () {
        this.addNode('Node', this.NormalNode);
    };

    //context menu event
    this.onMenuEdit = function () {
        if (this.nowIsNode)
            this.showNodeProp(this._elmToNodeValue(this.nowElm, 'NodeType'));
        else
            this.showLineProp(this.nowElm);
    };

    this.onMenuDelete = function () {
        var me = this;
        if (me.nowIsNode) {
            _tool.ans('delete this node ?', function () {
                me.deleteNode(me.nowElm);
            });
        } else {
            _tool.ans('delete this line ?', function () {
                me.deleteLine(me.nowElm);
            });
        }
    };

    //onclick add line condition
    this.onAddLineCond = function () {
        var row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        var cond = $(Mustache.render(this.tplLineCond, row));
        _form.loadJson(cond, row);        //row objec to UI
        this.divLineConds.append(cond);
    };

    this.onDeleteLineCond = function (btn) {
        $(btn).closest('tr').remove();
    };

    //node prop onclick ok
    this.onModalNodeOk = function () {
        //check input

        //hide modal
        _modal.hideO(this.modalNodeProp);

        //set new value
        var row = _form.toJson(this.eformNode);

        //update node display name
        var nodeObj = $(this.nowElm);
        nodeObj.find('.xd-name').text(row.Name);

        //update node form fields
        _itext.set('Name', row.Name, nodeObj);
        _itext.set('SignerType', row.SignerType, nodeObj);
        _itext.set('SignerValue', row.SignerValue, nodeObj);

        //change node style, has xf-ep div at the end !!
        //var html = row.Name + '<div class="xf-ep" action="begin"></div>';
        //nodeObj.html(html);

        /*
        //reset auto node class
        if (row.NodeType == this.AutoNode)
            nodeObj.addClass(this.AutoNodeCls);
        else
            nodeObj.removeClass(this.AutoNodeCls);
        */
    };

    //line prop click ok
    this.onModalLineOk = function () {
        //check input

        //hide modal
        _modal.hideO(this.modalLineProp);

        //var lineType = _iradio.get('LineType', this.eformLine);
        //_assert.inArray(lineType, ['0','1','2']);

        //conds to string
        var condStr = this._getLineLabel();

        //set new value
        //write into line, this.nowElm is line connection
        //var form = this.eformLine;
        var conn = this.nowElm;
        //conn.setParameter('LineType', lineType);
        var row = {
            CondStr: condStr,
            Sort: _itext.get('Sort', this.eformLine),
        };
        //conn.setParameter('CondStr', condStr);
        //conn.setParameter('Sort', _itext.get('Sort', form));
        //var line = conn.getParameters();    //model
        var line = this._connToLine(conn);
        _form.loadJson(line, row);

        //change line label
        var prop = this.getLineProp(condStr)
        this._setLineLabel(conn, prop.label);
        conn.setPaintStyle(prop.style);
    };
    //#endregion (events)

    //call last
    this.init();

}//class

//會用到公用js : _fun, _xp, _datatable
//後端固定呼叫 :
//  datatables讀資料: ../OpenUser/GetPage
var _openUser = {

    //fn: 按下ok時會回call的函數
    //boxId: 必須配合引用 OpenUser partial view時的 ViewDataDictionary 的 BoxId 欄位, 2邊要一致 !! (可同時空白)
    //  modal的div id 為 _xxx, xxx為boxId
    //return: 整個openUser變數
    init: function (fn, boxId) {
        boxId = boxId || 'ou';
        //type = type || 0;
        //if (isRows === undefined)
        //    isRows = true;

        //要回傳的資料(ou: open user)
        var filter = '#_' + boxId;
        var box = $(filter);
        var ou = {
            boxId: boxId,
            filter: filter, //配合 Read.cshtml !!
            fn: fn,
            //type: _iText.get('_Type', box),
            //isAdmin: _iText.get('_IsAdmin', box),    //文字
            isRows: (_iText.get('_IsRows', box) == 1),   //bool
        };

        //datatable config
        var config = {
            filter: true,  //範本: 開啟文字搜尋欄位(使用自訂欄位) !!
            //columns 數必須與 datatables ui 一致
            columns: [
                { data: '_Fun' },
                { data: 'Account' },
                { data: 'Name' },
            ],
            //客製化欄位
            columnDefs: [
                _crud.dtProp,
                { targets: [0], render: function (data, type, full, meta) {
                    //多選或單選
                    var value = _str.colsToStr(full.Id, full.Name, full.Account);
                    return ou.isRows
                        ? _crud.dtCheck0(value)
                        : _crud.dtRadio1(value);
                }},
            ],
        };

        //初始化 datatable, table id和action必須對應正確
        //html table名稱固定為 _Table
        var table = ou.filter + ' #_Table';
        //var findJson = { OrgId: orgId, _Type: ou.type };
        ou.dt = _datatable.init(table, '../OpenUser/GetPage', config);

        /*
        //註刪click事件 for 讀取目前資料列
        $(table + ' tbody').on('click', 'tr', function () {
            ou.row = ou.dt.row(this).data();
        });
        */

        return ou;
    },

    /*
    getBaseCond: function (box, ou) {
        return {
            OrgId: _input.exist('OrgId', box) ? _iSelect.get('OrgId', box) : '',
            _IsAdmin: ou.isAdmin,
            _Type: ou.type,
        };
    },
    */

    //show modal
    show: function (ou) {
        //清除上次的選取
        //$(ou.filter + ' #_Table :checked').prop('checked', false);
        _iCheck.setF(ou.filter + ' #_Table', false);
        _modal.showF(ou.filter);
    },

    //pjax無法動態載入 .js, 所以放到這裡面
    onClickFind: function (ou) {
        var box = $(ou.filter);
        //var json = _iSelect.valuesToJson({}, ['DeptId', 'TeamId'], box);
        //json = _json.addProps(json, _openUser.getBaseCond(box, ou));
        //json._Type = _iText.get('_Type', box);
        //json._Type = ou.type;
        _datatable.find(ou.dt, null, _iText.get('Name', box));
    },

    /**
     * user click [選取]按鈕
     * param ou {object} open user variables
     */ 
    onClickOk: function (ou) {
        var box = $(ou.filter);
        //var fn = ou.boxId + 'OnClickOk';  //要callback的函數名稱 !!
        if (ou.isRows) {
            //多選
            var keys = _iCheck.getCheckeds(box, _icheck.Check0Id);
            if (keys.length == 0) {
                _tool.msg('請先選取資料。');
            } else {
                //範本: 呼叫動態 function !!
                //_me[fn](keys);
                ou.fn(keys);
                _modal.hideO(box);
            }
        } else {
            //單選, radio欄位名稱固定為 _dtRadio1 !!
            var value = _iRadio.get(_iCheck.Check1Id, box);
            if (value == '') {
            //var obj = box.find('input[name=_dtRadio1]:checked');
            //if (obj.length == 0) {
                _tool.msg('請先選取資料。');
            } else {
                //_me[fn](ou.row);
                ou.fn(value);
                _modal.hideO(box);
            }
        }
    },

}; //class
var _xp = {

};//class