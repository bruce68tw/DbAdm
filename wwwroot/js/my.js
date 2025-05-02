//jquery ajax call
var _ajax = {

    /** 
     * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    getJsonA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            //dataType: backend return type: xml, html, script, json, jsonp, text
            dataType: 'json',   //return type: ContentType,JsonResult
            //processData: false
        };
        return await _ajax._rpcA(json, fnOk);
    },

    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    getJsonByFdA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type, TODO: pending test
            cache: false,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
        };
        return await _ajax._rpcA(json, fnOk, block);
    },

    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/string}
     */ 
    getStrA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        return await _ajax._rpcA(json, fnOk, block);
    },

    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/html string}
     */
    getViewA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        return await _ajax._rpcA(json, fnOk, block);
    },

    /**
     * ajax return image file
     * return {bool/file}
     */
    getImageFileA: async function (url, data, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        return await _ajax._rpcA(json, null, block);
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
        _ajax._rpcA(json, fnOk, fnError);
    },
    */

    /**
     * ajax call(private), only return success info(include custom message)
     * 使用 async/await 傳回值 for caller 判斷執行結果是否成功
     * param json {json} ajax json
     * param fnOk {function} (optional) callback function
     * param fnError {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json/any} ResultDto return null when error
     *   bool: fnOk not empty, return false when error
     *   json/any: fnOk is empty, return null when error
     */
    _rpcA: async function (json, fnOk, block) {
        if (_var.isEmpty(block)) block = true;
        if (block) _fun.block();

        //改用 async/await
        var status = false;
        var result = null;
        try {
            _jwt.jsonAddJwtHeader(json);
            result = await $.ajax(json);
            var errMsg = _ajax.resultToErrMsg(result);
            /*
            if (!errMsg && typeof result === 'string' && _ajax._isBrError(result)) {
                //case of string error
                errMsg = _ajax.strToErrMsg(result);
            }
            */

            //先判斷error msg
            if (_str.notEmpty(errMsg)) {
                result = null;  //reset here !!
                _tool.msg(errMsg);
            } else if (result.ErrorRows && result.ErrorRows.length > 0) {
                //有欄位驗證錯誤, //todo: 多筆區域是否顯示正確?
                var errJson = {};
                for (var i = 0; i < result.ErrorRows.length; i++) {
                    var row = result.ErrorRows[i];
                    var edit = _str.isEmpty(row.FormId) ? _me.edit0 : $('#' + row.FormId);
                    errJson[row.Fid] = row.Msg;
                    edit.validator.showErrors(errJson);
                }
            } else if (fnOk) {
                fnOk(result);
                status = true;
            }
        } catch (error) {
            console.error(error);
        }

        if (block) _fun.unBlock();
        return (fnOk == null) ? result : status;

        /*
        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (result) {
                //result maps to ResultDto/JObject
                //if (!result)
                //    return;

                var msg = _ajax.resultToErrMsg(result);
                if (msg) {
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(result);

                //case of getStr()
                } else if (typeof result === 'string' && result.substring(0, 2) === _fun.PreBrError) {
                    var msg = _ajax.strToErrMsg(result)
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
        */
    },

    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */ 
    _isBrError: function (result) {
        return (result.length >= 2 && result.substring(0, 2) === _fun.PreBrError);
    },

    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */ 
    resultToErrMsg: function (result) {
        return (result.ErrorMsg)
            ? _ajax.strToErrMsg(result.ErrorMsg)
            : '';
    },

    /**
     * result string to error msg if any
     */ 
    strToErrMsg: function (str) {
        if (_str.isEmpty(str))
            return '';
        if (!_ajax._isBrError(str))
            return str;

        //case of BR error msg
        var fid = str.substring(2);
        return (_BR[fid])
            ? _BR[fid]
            : _str.format('_ajax.strToErrMsg() failed, no BR Fid={0}', fid);
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
        //_me.crudR.divRead = $('#divRead');
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

    //_nowChart: null,

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
    /*
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

    _clear: function () {
        if (_chart._nowChart != null)
            _chart._nowChart.destroy();
    },
    */

    /**
     * show chart
     * param type {string} bar/pie/line
     * param canvasObj {object} canvas Object
     * param dto {model} Chart/ChartGroup, 可加入 config, 屬性datasets -> values !! 
     * param percent {bool} show percentage(for pie,doughnut) or not
     */
    _show: function (type, canvasObj, dto, legend, percent) {
        if (legend == null)
            legend = true;
        if (percent == null)
            percent = false;

        //default config
        var isHbar = (type == 'hbar');
        var config = {
            type: isHbar ? 'bar' : type,
            data: {
                labels: dto.labels,
                /*
                datasets: dto.values,
                */
                datasets: [
                    {
                        //label: "Population (millions)",
                        //backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: dto.values,
                    }
                ]
            },
            options: {
                //多包一層plugins才能顯示title
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: legend,
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    title: {
                        display: true,
                        text: dto.title,
                        //class: 'xc-title',    //3.x以後不支持
                        font: {
                            size: 16,    //temp add
                        },
                    }
                }
            }
        };

        //add ext config.options if any
        if (dto.options != null)
            config.options = _json.copy(dto.options, config.options);

        //add percentage if need
        if (percent) {
            config.options.plugins.tooltip = {
                callbacks: {
                    label: function (ctx) {
                        //注意:不同版本的屬性不同, 以下為3.9.1版 !!
                        //get sum if need
                        var list = ctx.dataset.data;
                        if (ctx.chart._sum == null) {
                            var sum = 0;
                            list.map(a => {
                                sum += a;
                            });
                            ctx.chart._sum = sum;
                        }

                        //save old label if need
                        if (ctx._oldLabel == null)
                            ctx._oldLabel = ctx.label + ' ' + ctx.formattedValue;

                        //get percentage and add tail
                        var percent = (list[ctx.dataIndex] * 100 / ctx.chart._sum).toFixed(2) + "%";
                        return ctx._oldLabel + ' (' + percent + ')';
                    }
                }
            };
        }

        return new Chart(canvasObj, config);
    },

    //線形圖
    line: function (canvasObj, dto) {
        return _chart._show('line', canvasObj, dto, false);
    },

    //水平條狀圖
    hbar: function (canvasObj, dto) {
        dto.options = {
            indexAxis: 'y'
        };
        //debugger;
        return _chart._show('hbar', canvasObj, dto, false);
    },

    //圓餅圖
    pie: function (canvasObj, dto) {
        return _chart._show('pie', canvasObj, dto, null, true);
    },

    //甜甜圈
    doughnut: function (canvasObj, dto) {
        return _chart._show('doughnut', canvasObj, dto, null, true);
    },

    //多個線形圖
    groupLine: function (canvasObj, dto) {
        /*
        //set curve line
        dto.datasets.map(a => {
            a.tension = 0;
        });
        */
        return _chart._show('line', canvasObj, dto);
    },

    //多個線形圖
    groupBar: function (canvasObj, dto) {
        return _chart._show('bar', canvasObj, dto);
    },

    /**
     * show one line chart, called Chart.js
     */ 
    drawLine: function (canvasId, ids, values, color) {
        _chart._clear();
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
 * 日期/時間格式包含: 資料庫、c#/js(兩者設定為一致)、UI
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
     * get today date string in UI format
     */
    uiToday: function(){
        var mm = moment();
        return _date.mmToUiDate(mm);
    },

    /**
     * get this week monday in UI format
     */
    uiWeekMonday: function () {
        var mm = moment().day(1)
        return _date.mmToUiDate(mm);
    },

    uiWeekFriday: function () {
        var mm = moment().day(5)
        return _date.mmToUiDate(mm);
    },

    /**
     * get this month first day
     */
    uiMonthDay1: function () {
        var mm = moment().startOf('month');
        return _date.mmToUiDate(mm);
    },

    /**
     * get this month last day
     */
    uiMonthDayLast: function () {
        var mm = moment().endOf('month');
        return _date.mmToUiDate(mm);
    },

    /**
     * get current year, ex: 2021
     */ 
    nowYear: function() {
        return (new Date()).getFullYear();
    },

    mmToUiDate: function (mm) {
        return mm.format(_BR.MmUiDateFmt);
    },

    mmToUiDt: function (mm) {
        return mm.format(_BR.MmUiDtFmt);
    },

    mmToUiDt2: function (mm) {
        return mm.format(_BR.MmUiDt2Fmt);
    },

    dtsToUiDate: function (dts) {
        return _str.isEmpty(dts)
            ? ''
            : _date.mmToUiDate(moment(dts, _fun.MmDtFmt));
    },

    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */ 
    dtsToFormat: function (ds) {
        return _str.isEmpty(ds)
            ? ''
            : _date.mmToUiDate(moment(ds, _fun.MmDateFmt));
    },

    dtsToUiDt: function (dts) {
        return _str.isEmpty(dts)
            ? ''
            : _date.mmToUiDt(moment(dts, _fun.MmDtFmt));
    },

    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    dtsToUiDt2: function (dts) {
        return _str.isEmpty(dts)
            ? ''
            : _date.mmToUiDt2(moment(dts, _fun.MmDtFmt));
    },

    dtsToFormat: function (dts, format) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _fun.MmDtFmt).format(format);
    },

    //get datetime value for compare
    dtsToValue: function (dts) {
        return (_str.isEmpty(dts))
            ? 0
            : moment(dts, _fun.MmDtFmt).valueOf();
    },

    dtsToMoment: function (dts) {
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
     * param dt1 {moment obj} start date
     * param dt2 {moment obj} end date
     * return {int} 
     */ 
    getMonthDiffByDate: function (dt1, dt2) {
        return (dt2.getFullYear() - dt1.getFullYear()) * 12
            + dt2.getMonth() - dt1.getMonth() + 1;
    },

    /**
     * js date string add year
     * jsDateAddYear -> dsAddYear
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */ 
    dsAddYear: function (ds, year) {
        //return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
        return moment(ds, _fun.MmDtFmt).add(year, 'y').format(_fun.MmDtFmt);
    },

}; //class
/**
 * 許多函數在初始化執行, 所以無法放在CrudE.js
 * only for CrudE.js, EditOne.js, EditMany.js !!
 * 內容為: 
 *   1.靜態 constant
 *   2.初始化函數
 *   3.get/set old value
 *   4.判斷是否為新資料 & 處理
 */ 
var _edit = {

    //constant with underline
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    //前後端欄位: isNew, new row flag
    IsNew: '_IsNew',

    //edit form mode
    ModeBase: 'Base',
    ModeUR: 'UR',   //user role mode


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
            me.fileFids[index] = _input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

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

    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
     */
    isNewRow: function (row) {
        var fid = _edit.IsNew;
        return (row[fid] != null || row[fid] == '1');
    },

    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} jquery object
     */
    addIsNew: function (box) {
        var fid = _edit.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val('1');
    },

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} jquery object
     */
    removeIsNew: function (box) {
        var fid = _edit.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    },

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
    getFileSid: function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    },
     */

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

/**
 * input form
 * 裡面function預設傳入object(not element or selector) 
 */
var _form = {

    /**
     * get input values, 排除不儲存的欄位, 可用在多筆的單行
     * param form {object} input form
     * return {json}
     */ 
    toRow: function (form) {
        //skip link & read fields
        var row = {};
        form.find(_input.fidFilter()).filter(':not(.xi-unsave)').each(function () {
            var obj = $(this);
            row[_input.getFid(obj)] = _input.getO(obj, form);            
        });
        return row;

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
    toRowStr: function (form) {
        return JSON.stringify(_form.toRow(form));
    },

    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    loadRow: function (form, row) {
        for (var key in row)
            _input.set(key, row[key], form);
    },

    /**
     * reset all inputs with name attribute
     * param form {object}
     */
    reset: function (form) {
        form.find(_input.fidFilter()).each(function () {
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
     //param {array} ids source field id array
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

    //class name of hide RWD phone
    HideRwd: 'xg-hide-rwd',
    //#endregion

    //variables
    locale: 'zh-TW',    //now locale, _Layout.cshmlt will set
    maxFileSize: 50971520,  //upload file limit(50M)
    isRwd: false,
    pageRows: 10,   //must be 10,20(not 25),50,100

    //datatables column define default values
    dtColDef: {
        className: 'xg-center',
        orderable: false,
        targets: '_all',
    },

    //now userId
    userId: '',

    //mid variables
    //data: {},

    //variables ??
    //isCheck: true,
    init: function (locale) {
        //set jwt token
        //_fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        //localStorage.removeItem('_jwtToken');

        _fun.locale = locale;
        //initial
        _leftmenu.init();
        _pjax.init('.xu-body');
        _tool.init();
        moment.locale(_fun.locale);
    },

    //server need Fun/Hello()
    //no called
    onHelloA: async function () {
        await _ajax.getStrA('../Fun/Hello', null, function (msg) {
            alert(msg);
        });
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
    //no called
    onSetLocaleA: async function (code) {
        await _ajax.getStrA('../Fun/SetLocale', { code: code }, function (msg) {
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
        if (_str.notEmpty(extAttr))
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
    //get value by id
    getD: function (id, box) {
        return this.getO(_obj.getD(id, box));
    },
    //get value by object
    getO: function (obj) {
        return obj == null ? null : obj.val();
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
        obj.text(value);    //for XiRead
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
        _obj.getF(_input.fidFilter(fid) + ':checked', form).each(function (i) {
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
//使用 box 來操作 datepicker !!
//for date input (bootstrap-datepicker)
//_idt drive from _idate
var _idate = $.extend({}, _ibase, {

    //find box, 同時用來執行日期欄位初始化
    BoxFilter: '.date',

    //=== get/set start ===
    /**
     * get ymd with format _fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    getO: function (obj) {
        return _date.uiToMmDate(obj.val());
    },

    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _fun.MmDateFmt
     */
    setO: function (obj, value) {
        //_idate._boxSetDate(_idate._objToBox(obj), _date.dtsToFormat(value));
        _idate._boxSetDate(_idate._objToBox(obj), value);
    },

    /**
     * set edit status
     * param obj {object} date input object
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },

    /**
     * initial, called by _me.crudE.js
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
            todayHighlight: true,   // 高亮顯示今天的日期
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
            //datepicker(使用box)和 validation(使用input)是2個不同的機制
            //$(this).focus();
            //$(this).valid();
            //var aa = 'aa';
            _idate._boxGetInput($(this)).valid();
            //$(_idate).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = _str.notEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
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
        var input = _idate._boxGetInput(box);
        if (_idate.getEditO(input)) {
            _idate._boxSetDate(box, '');
            //input.trigger('change');
        }
    },    

    //get edit status, return bool
    getEditO: function (obj) {
        return !obj.is(':disabled');
    },

    //=== private function below ===
    /**
     * input element to date box
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
        //var input = _idate._boxGetInput(box);
        //input.datepicker('update', date);
        // 手動觸發 changeDate 事件
        box.trigger({
            type: 'changeDate',
            date: date // 獲取更新後的日期物件
        });
        //box.datepicker('update', '2024-12-30');
        //box.val().datepicker('update', date('2024-12-25'));
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
        if (_str.notEmpty(exts) && exts !== '*') {
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
        //return box.find('a');
        return box.find('button').last();
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
     * param edit {object} EditOne/EditMany object
     * param prog {string} program code
     * param height {int} (optional)input height(px)
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
                    /*
                    */
                    //https://codepen.io/ondrejsvestka/pen/PROgzQ
                    onChange: function (contents, $editable) {
                        
                        //sync value
                        var me = $(this);
                        if (me.summernote('isEmpty')) {
                            me.val('');
                            //empty html value, carefully cause endless loop !!
                            if (me.summernote('code') != '')
                                me.summernote('code', '');
                        } else {
                            me.val(contents);
                        }
                        //me.val(me.summernote('isEmpty') ? '' : contents);

                        //re-validate
                        edit.validator.element(me);
                        
                        /*
                        var me = $(this);
                        me.val(me.summernote('isEmpty') ? "" : contents);
                        edit.validator.element(me);
                        */
                    },
                    onImageUpload: function (files) {
                        var me = $(this);   //jquery object
                        var data = new FormData();
                        data.append('file', files[0]);
                        //data.append('prog', me.data('prog'));
                        $.ajax({
                            data: data,
                            type: "POST",
                            url: "SetHtmlImage",    //backend fixed action !!
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
        return this.getO(_obj.get(fid, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },

    set: function (fid, value, form) {
        this.setO(_obj.get(fid, form), value);
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class
/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toRow()
 * 3.validation error span position rules:
 *   (a)same parent, could be different child level
 *   (b)sibling(ex: Date)
 */
var _input = {

    //get input value
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
        if (obj == null || !_var.isPureData(value))
            return;

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
                    value = _date.dtsToFormat(value, _BR[format]);
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
            : `[data-fid='${fid}']`;
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
    //get checked data-value
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
        if (obj != null) 
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
        return _iread.getO(_obj.get(fid, form));
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
        _iread.setO(_obj.get(fid, form), value);
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
    filterByExt: function (fid, value, rows, box, allItem, addEmptyStr) {
        if (allItem === undefined)
            allItem = false;
        var obj = _obj.get(fid, box);
        obj.empty();

        if (addEmptyStr != '')
            obj.append(_str.format('<option value="">{0}</option>', addEmptyStr));

        //item.find('option').hide();
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext == '') || row.Ext == value)
                obj.append(_str.format('<option value="{0}">{1}</option>', row.Id, row.Str));
        }

        //選取第0筆
        if (len > 0)
            _iselect.setIndexO(obj, 0);
    },

    /**
     * 處理2個下拉欄位的連動, 例如:城市-鄉鎮, parent欄位改變時, child欄位的內容也改變
     * param parentFid {stirng} parent欄位Id
     * param childFid {stirng} child欄位Id
     * param childId {stirng} child欄位值, 如果空白表示不設定此欄位值(只更新來源)
     * param action {stirng} 後端action讀取來源, 固定傳入parentId
     * param isEdit {bool} true(編輯畫面), false(查詢畫面)
     */
    onChangeParent: function (parentFid, childFid, childId, action, isEdit) {
        var box = isEdit ? _me.crudE.divEdit : _me.crudR.divRead; 
        var thisId = _iselect.get(parentFid, box);
        _ajax.getJsonA(action, { parentId: thisId }, (rows) => {
            _iselect.setItems(childFid, rows, box);
            if (_str.notEmpty(childId)) {
                _iselect.set(childFid, childId, box);
            }
        });
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
     * 轉換一筆json為多筆資料, 用於產生統計圖
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    toChartRows: function (json, cols) {
        var rows = [];
        for (var i = 0; i < cols.length; i++) {
            var fid = cols[i];
            rows.push({ Id: fid, Num:json[fid]});
        }
        return rows;
    },

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
        if (rows == null || rows.length == 0)
            return null;

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
                        if (_str.notEmpty(value[i])) {
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

var _jwt = {

    //??
    //get header json object for jwt
    jsonAddJwtHeader: function (json) {
        if (_fun.jwtToken)
            json.headers = _jwt.getJwtAuth();
    },

    getJwtAuth: function () {
        return {
            'Authorization': _jwt.getJwtBearer()
        };
    },

    getJwtBearer: function () {
        return 'Bearer ' + _fun.jwtToken;
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
        return _obj.getF(_input.fidFilter(fid), box);
    },

    /**
     * get object by filter string
     */
    getF: function (ft, box) {
        var obj = box.find(ft);
        if (obj.length == 0) {
            //_log.info('_obj.js getF() found none. (filter=' + ft + ')');
            return null;
        } else {
            return obj;
        }
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

		/*
        //PJAX請求前
        docu.on('pjax:beforeSend', function (event, xhr, opts) {
            if (_fun.jwtToken)
                xhr.setRequestHeader('Authorization', `Bearer ${_fun.jwtToken}`);
        });
		*/
		
        //'data' 是後端回傳字串, 可能為 HTML 或錯誤訊息
        docu.on('pjax:success', function (event, data, status, xhr, opts) {
            var json = _str.toJson(data);
            if (json != null) {
                //只顯示錯誤訊息, 不處理欄位 validation error
                var errMsg = _ajax.resultToErrMsg(json);
                if (errMsg) {
                    $(opts.container).html(errMsg);
                }
            }
        });

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
        //    if (_str.notEmpty(jsLib)) {
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
        //    if (_str.notEmpty(jsView)) {
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

    toJson: function (str) {
        try {
            return JSON.parse(str);
        } catch (error) {
            //console.log("JSON.parse failed");
            return null;
        }
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

    /*
    //delete, up, down
    rowFun: function () {
        return '' +
            _str.format('<a href="javascript:_me.crudE.onUpdateA(\'{0}\');"><i class="ico-delete" title="{0}"></i></a>', key, _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="ico-up" title="{0}"></i></a>', _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="ico-down" title="{0}"></i></a>', _BR.TipUpdate);
    },
    */

    /**
     * get rows count
     * param table {object} table object
     * param fid {string} field id(name attribute)
     * return {int} rows count
     */
    getRowCount: function (table, fid) {
        return table.find(_input.fidFilter(fid)).length;
    },

}; //class
//temp variables
var _temp = {};

var _time = {

    sleepA: async function (ms) {
        return new Promise(a=> setTimeout(a, ms));
    },

}; //class

//small public components
var _tool = {

    init: function () {
        //alert
        _tool.xgAlert = $('.xg-alert');
        _tool.xgMsg = $('#xgMsg');  //使用id
        _tool.xgAns = $('#xgAns');  //使用id
        _tool.xgArea = $('#xg-area');
        _tool.xgImage = $('#xg-image');
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

    //??show waiting
    showWait: function () {
        //$('body').addClass('xg-show-loading');
        $('.xg-wait').show();
    },
    //??
    hideWait: function () {
        //$('body').removeClass('xg-show-loading');
        $('.xg-wait').hide();
    },

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
            /*
            */
            //errorClass: 'label label-danger',
            //onclick: false, //checkbox, radio, and select
            //ignore: ':hidden:not(.xd-valid[data-type=file]),:hidden:not([data-type=html]),.note-editable.card-block',   //or summernote got error
            //ignore: ':hidden:not(.xd-valid)',     //html/file has .xd-valid need validate !!
            ignore: ':hidden:not(.xd-valid), .note-editable.panel-body',
            errorElement: 'span',
            errorPlacement: function (error, elm) {
                error.insertAfter(_valid._getBox($(elm)));
                return false;
            },
            //顯示validation錯誤
            highlight: function (elm, errorClass, validClass) {
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(validClass).addClass(errorClass);
                var errObj = _valid._getError(me);
                if (errObj != null)
                    errObj.show();
                return false;
            },
            //清除validation錯誤
            unhighlight: function (elm, errorClass, validClass) {
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(errorClass).addClass(validClass);
                var errObj = _valid._getError(me);
                if (errObj != null)
                    errObj.hide();
                return false;
            },
            /*
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
            */
        };

        return form.validate(config);
    },

    /**
     * 使用 jquery validation方式顯示錯誤, 通知由後端傳回錯誤, 再前端顯示
     * param fid{string} field id
     * param msg{string} error msg
     * param eform id{string} (optional for 多筆) 若為多筆則必須配合rowId找到fid
     * param rowId{string} (optional for 多筆) row Id valud
     */
    showError: function (fid, msg, eformId, rowId) {
        var eform = _str.isEmpty(eformId) ? _me.eform0 : $('#' + eformId);
        /*
        var input;
        if (_str.isEmpty(rowId)) {
            input = eform.find(_input.fidFilter(fid));
        } else {
            //多筆??
        }
        */

        eform.validator.showErrors({
            [fid]: msg
        });
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

    /*
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
    */

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
    
    notEmpty: function (var1) {
        return !_var.isEmpty(var1);
    },

    //check not object、array
    isPureData: function (value) {
        return (typeof value !== 'object' && !Array.isArray(value));
    },

};
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

    /*
    //constant with underline
    this.Rows = '_rows';
    this.Childs = '_childs';
    this.Deletes = '_deletes';

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
            var Childs = _edit.Childs;  //constant
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
        return edit[_edit.Childs][childIdx];
    };

    /**
     * get edit child len
     * param edit {object} edit object
     */
    this._getEditChildLen = function (edit) {
        var fid = _edit.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length;
    };

    /**
     * getRowsByJson -> jsonGetRows
     * get rows of json 
     * @param {any} json
     * @returns
     */
    this.jsonGetRows = function (json) {
        return (json == null || json[_edit.Rows] == null)
            ? null
            : json[_edit.Rows];
    };

    //get child json
    this._getChildJson = function (upJson, childIdx) {
        var childs = _edit.Childs;
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
        return obj.data(_edit.DataOld);
    };
    */

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
    this.setOld = function (obj, value) {
        obj.data(_edit.DataOld, value);
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
            obj.data(_edit.DataOld, row[fid]);
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
            old = obj.data(_edit.DataOld);
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

        var fid = _edit.FileJson
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
        var fid = _edit.IsNew;
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
/**
 * 改為非靜態類別
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
            if (_var.notEmpty(dtConfig)) {
                this.dt = new Datatable('#tableRead', 'GetPage', dtConfig, this._getFindCond());
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
     * param nowDiv {object} (default _me.crudE.divEdit) now div to show
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
            nowDiv = _me.crudE.divEdit;

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
        if (this.fnAfterSwap)
            this.fnAfterSwap(toRead);
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
            pageLength: _fun.pageRows || 10,
            lengthMenu: [10, 20, 50, 100], //25 -> 20 for more friendly
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
            dom: '<"toolbar">t<li>p', 

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
                /*
                beforeSend: function (jqXHR) {
                    //debugger;
                    if (_fun.jwtToken)
                        jqXHR.setRequestHeader("Authorization", "Bearer " + _fun.jwtToken);
                },
                */
                //add input parameter for datatables
                data: function (arg) {
                    //write order.fid if any
                    var orders = arg.order;
                    if (orders.length > 0) {
                        var order = orders[0];
                        order.fid = arg.columns[order.column].data;
                    }
                    arg.findJson = _json.toStr(this.findJson);    //string type
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),                

                //on success (cannot use success event), see DataTables document !!
                dataSrc: function (result) {
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset

                    //只顯示錯誤訊息, 不處理欄位 validation error
                    var errMsg = _ajax.resultToErrMsg(result);
                    if (errMsg) {
                        _tool.msg(errMsg);
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
            if (_var.notEmpty(dtConfig.columnDefs)) {
                var colDefs = dtConfig.columnDefs;
                colDefs[colDefs.length] = _fun.dtColDef;   //add last array element
            }
            config = _json.copy(dtConfig, config);
        }

        //add data-rwd-th if need
        var dt = $(selector);
        /*
        if (_fun.isRwd) {
            //讀取多筆資料 header (set this._rwdTh[])
            var me = this;
            me._rwdTh = [];
            dt.find('th').each(function (idx) {
                me._rwdTh[idx] = $(this).text() + '：';
            });
            config.createdRow = function (row, data, dataIndex) {
                $(row).find('td').each(function (idx) {
                    $(this).attr('data-rwd-th', me._rwdTh[idx]);
                });
            };
        }
        */
        
        //before/after ajax call, show/hide waiting msg
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
 * 多筆編輯畫面
 * multiple edit forms
 *   資料儲存在 html input
 * 
 * notice:
 *   set data-fkeyFid when save
 *   函數名稱後面ByRsb(表示by RowsBox)為擴充原本函數, 參數rowsBox空白則為this.RowsBox
 * 
 * 屬性: 參考 init()
 * 
 * 自定函數:
 *   void fnLoadJson(json) -> fnLoadRows(rows)：show json to form, use loadJson instead of loadRows for more situation !!
 *   json fnGetUpdJson(upKey)：get updated json by form
 *   bool fnValid()：validate check
 *   void fnReset()：reset
 *   
 * param-1 kid {string} pkey field id(single key)
 * //param-2 eformId {string} (optional) edit form id
 * param-2 rowsBoxId {string} (optional) rows box id
 *   if empty, you must write functions: fnLoadRows、fnGetUpdJson、fnValid
 * param-3 tplRowId {string} (optional) row template id
 *   tplRowId -> rowTplId
 *   1.if empty, it will log error when call related function.
 *   2.system get fid-type from this variables
 *   3.called by singleFormLoadRow、loadRowsByRsb、_renderRow
 * param-4 rowFilter {string} (optional) jQuery filter for find row object
 *   1.if empty, it will log error when call related function.
 *   2.inside element -> row(onDeleteRow),
 *   3.rowsBox -> row(getUpdRows)
 * param-5 sortFid {string} (optional) sort fid for front-side sorting function
 * 
 * return {EditMany}
 */
//function EditMany(kid, eformId, rowTplId, rowFilter, sortFid) {
function EditMany(kid, rowsBoxId, rowTplId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid, lowercase

        //variables
        this.mode = _edit.ModeBase;    //default value
        this.modeData = '';             //for different mode
        this.isUrm = false;             //is urm or not

        this.kid = kid;
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;
        this.systemError = '';
        this.hasRowTpl = _str.notEmpty(rowTplId);
        this.hasRowFilter = _str.notEmpty(rowFilter);
        this.dataJson = null;

        if (this.hasRowTpl) {
            this.rowTpl = $('#' + rowTplId).html();
            var rowObj = $(this.rowTpl);

            //check input & alert error if wrong
            if (_obj.get(kid, rowObj) == null) {
                this.systemError = `EditMany.js input kid is wrong (${kid})`;
                alert(this.systemError);
            }

            _edit.setFidTypes(this, rowObj);
            _edit.setFileVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = _str.notEmpty(rowsBoxId);
        if (this.hasEform) {
            this.rowsBox = $('#' + rowsBoxId);
            this.eform = this.rowsBox.closest('form');     //edit form object
            if (this.rowsBox.length == 0) {
                this.systemError = `EditMany.js rowsBoxId is wrong (${rowsBoxId})`;
                alert(this.systemError);
            }
        }

        this.deletedRows = [];  //deleted key string array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * initial urm, 參考 XpUser Read.cshmtl
     * param fids: 要傳到後端的欄位id array
     */ 
    this.initUrm = function (fids) {
        this.mode = _edit.ModeUR;
        this.modeData = fids;
        this.isUrm = true;
    };

    /**
     * isNewTr -> _isNewBox
     * check is a new tr or not
     * param tr {object} 
     * return {bool}
     */
    this._isNewBox = function (box) {
        return (_itext.get(_edit.IsNew, box) == '1');
    };

    /**
     * reset edit form
     * param rowsBox {object} optional
     */
    this.reset = function () {
        if (this.fnReset) {
            this.fnReset();
        } else if (this.isUrm) {
            this._urmReset();
        } else if (this.hasEform) {
            this.rowsBox.empty();   //empty rows ui first
            this._resetVar();
        }
    };

    //reset variables
    this._resetVar = function () {
        this.newIndex = 0;
        this._resetDeletes();
    };

    /**
     * resetDeleted -> _resetDeletes
     * reset deleted rows
     */
    this._resetDeletes = function () {
        this.deletedRows = [];
    };

    /**
     * urmLoadJson -> urmLoadRows
     * (urm: UserRole Mode), load json rows into UI by urm
     * param json {json} 
     * param rowsBox {object} 
     * param fids {string[]} 
     */
    this._urmLoadRows = function (rows) {
        this._urmReset();

        //check
        if (rows == null)
            return;

        //set checked sign & old value
        var fids = this.modeData;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = this.rowsBox.find(_input.fidFilter(row[fids[1]]));   //fid map to dataFid
            _icheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    };

    /**
     * get upd json by UserRole mode(urm), Role欄位使用checkbox
     * called by User.js、XpRole.js
     * param upKey {string} up key
     * param rowsBox {object} rows box
     * param keyFid {string} key fid, ex: UserId
     * param dataFid {string} data fid, ex: RoleId
     * return {json} modified columns only
     */
    this._urmGetUpdJson = function (upKey) {
        var json = {};
        var rows = [];
        var me = this;
        var newIdx = 0;
        var fids = this.modeData;   //string array
        this._resetDeletes();    //reset first
        this.rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_str.isEmpty(key)) {
                if (_icheck.checkedO(obj)) {
                    //new row
                    var row = {};
                    row[_edit.IsNew] = '1';     //new row flag
                    row[fids[0]] = ++newIdx;            //Id, base 1 !!
                    row[fids[1]] = _icheck.getO(obj);   //RoleId
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
            json[_edit.Rows] = rows;
        json[_edit.Deletes] = this.getDeletes();
        return json;
    };

    this._urmReset = function () {
        this._resetVar();

        var objs = this.rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');
    };

    /**
     * loadJson(json) -> loadRows(rows)
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * load this json rows into UI, also set old values !!
     * param json {json} 
     */
    this.loadRows = function (rows) {
        if (this.fnLoadRows) {
            this.fnLoadRows(rows);
        } else if (this.isUrm) {
            this._urmLoadRows(rows, _me.divRoles, _me.mUserRoleFids);
        } else {
            //var rows = (json == null || json[_edit.Rows] == null)
            //    ? null : json[_edit.Rows];
            this.loadRowsByRsb(rows, true);
        }
    };

    /**
     * singleFormLoadRow -> loadRowByBox
     * box 與 rsb(rowsBox) 有些不同, 所以用不同名 !!
     * load one row, also set field old value,
     * ex: DbAdm/MyCrud.js Etable is a single form but has multiple rows property !!
     * param rowBox {object}
     * param row {json}
     * param index {int} 資料序號 base 0
     */
    this.loadRowByBox = function (rowBox, row, index) {
        //if (!this._checkRowTpl())
        //    return;

        row.Index = index;
        var box = $(Mustache.render(this.rowTpl, row)); //for 顯示欄位

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            _edit.setOld(_obj.get(fid, box), row[fid]);
        }

        //set date input
        _idate.init(box);

        //one row into UI for 輸入欄位
        _form.loadRow(box, row);    

        //rowBox.append(box);
        box.appendTo(rowBox);
    };

    /**
     * loadRowsByBox(rowsBox, rows, reset) -> loadRowsByRsb(rows, reset, rowsBox)
     * load rows by rowsBox also set old value
     * param rowsBox {object} rows box object
     * param rows {jsons}
     * param reset {bool} (default true) reset rowsBox first.
     * param rowsBox {object} (optional) rows box object, default this.rowsBox
     */ 
    this.loadRowsByRsb = function (rows, reset, rowsBox) {
        if (!this._checkRowTpl())
            return;

        //reset if need
        //use "reset || true"" will cause wrong result !!
        rowsBox = this._getRowsBox(rowsBox);
        if (_var.isEmpty(reset) || reset)
            this.reset(rowsBox);

        //check
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen == 0)
            return;

        //render rows
        for (var i = 0; i < rowLen; i++) {
            this.loadRowByBox(rowsBox, rows[i], i);
            /*
            var row = rows[i];
            var box = $(Mustache.render(this.rowTpl, row));
            //box.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j += 2) {
                fid = this.fidTypes[j];
                _edit.setOld(_obj.get(fid, box), row[fid]);
            }

            //set date input
            _idate.init(box);

            //one row into UI
            _form.loadRow(box, row);

            //into rows box
            box.appendTo(rowsBox);
            */
        }        
    };

    /**
     * validate form
     */
    this.valid = function () {
        return this.fnValid ? this.fnValid() :
            this.hasEform ? this.eform.validTable(this.validator) :
            true;
    };

    /**
     * get row key
     * param rowBox {object} row box
     * return {string} key value
     */
    this.getKey = function (rowBox) {
        return _input.get(this.kid, rowBox);
    };

    /**
      * get row(json) by tr object, 不包含 xi-unsave 欄位
      * trObj {object} tr object
      * fidTypes {string array} field info array
      * return {json} one row
      */
    /*
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
    */
    
    this._checkRowFilter = function () {
        if (this.hasRowFilter)
            return true;

        _log.error('EditMany.js this.rowFilter is empty.');
        return false;
    };

    //checkTplRow -> _checkRowTpl
    this._checkRowTpl = function () {
        if (this.hasRowTpl)
            return true;

        _log.error('EditMany.js this.rowTpl is empty.');
        return false;
    };

    /**
     * get row box by inside element/object
     * param elm {element/object}
     * return {object}
     */
    this._elmToRowBox = function (elm) {
        return this._checkRowFilter()
            ? $(elm).closest(this.rowFilter)
            : null;
    };

    /**
     * get row box by id
     * called Flow.js
     * param id {string} row id
     * return {object} row box
     */
    this.idToRowBox = function (value) {
        var filter = _input.fidFilter(this.kid) + `[value='${value}']`;
        return this.eform.find(filter).parent();
    };

    /**
     * getUpdJsonByCrud -> getUpdJson
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * get updated json, called by crudE.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    this.getUpdJson = function (upKey) {
        return this.fnGetUpdJson ? this.fnGetUpdJson(upKey) :
            this.isUrm ? this._urmGetUpdJson(upKey) :
            this.getUpdJsonByRsb(upKey, this.rowsBox);
    };

    /**
     * getUpdJson -> getUpdJsonByRsb
     * get updated json by rowsBox, called by crud.js only
     * param upKey {string}
     * param rowsBox {object}
     * return {json} modified columns only
     */
    this.getUpdJsonByRsb = function (upKey, rowsBox) {
        var json = {};
        json[_edit.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_edit.Deletes] = this.getDeletes();
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
     * public for myCrud.js
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows box, default this.rowsBox
     * return {jsons} null if empty
     */ 
    this.getUpdRows = function (upKey, rowsBox) {
        if (!this._checkRowFilter())
            return;

        //set sort field
        rowsBox = this._getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //this is not work inside each() !!
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            //add new row if empty key
            var box = $(item);
            var key = _input.get(me.kid, box);
            if (me._isNewBox(box)) {
                var row2 = _form.toRow(box);
                row2[me.DataFkeyFid] = upKey;   //write anyway !!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            //var key = box.data(_fun.DataKey);
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
                obj = _obj.get(fid, box);
                value = _input.getO(obj, box, ftype);
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
     * getDeletedStr -> getDeletes
     * get deleted rows key list字串 for 傳回後端
     * public for MyCrud.js
     * return {string} null for empty.
     */ 
    this.getDeletes = function () {
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
     * add one row(or empty) into UI
     * param {object} (optional) row
     * param {object} (optional) rowsBox, default this.rowsBox
     * return {object} row
     */
    this.addRow = function (row, rowsBox) {
        row = row || {};
        rowsBox = this._getRowsBox(rowsBox);
        var obj = this._renderRow(row, rowsBox);
        this.setNewIdByBox(obj);
        return obj;
    };

    /**
     * onclick deleteRow
     * param btn {element}
     */
    this.onDeleteRow = function (btn) {        
        var box = this._elmToRowBox(btn);
        this.deleteRow(_itext.get(this.kid, box), box);
    };

    /**
     * add deleted row & remove UI row
     * param key {string} row key
     * param rowBox {object} (optional) rows box, default this.rowsBox
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
        var key = this.getKey(this._elmToRowBox(elm));
        _me.crudE.viewFile(table, fid, elm, key);   //非初始階段可以讀取_me.crudE
    };

    /**
     * render row by UI template, called by addRow()
     * param rowsBox {object}
     * param row {json}
     * return {object} row object
     */ 
    this._renderRow = function (row, rowsBox) {
        if (!this._checkRowTpl())
            return null;

        rowsBox = this._getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.rowTpl, row));
        _form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    };

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * param rowsBox {object} (optional) default this.rowsBox
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data, rowsBox) {
        if (!this.hasFile) return null;
        if (!this._checkRowFilter()) return null;

        rowsBox = this._getRowsBox(rowsBox);
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        rowsBox.find(me.rowFilter).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _me.crudE.getFileSid(levelStr, fid);
                if (_ifile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_me.crudE.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * row set fkey value
     * param row {json}
     * param fkeyFid {string}
     */
    this.rowSetFkey = function (row, fkey) {
        if (row != null && _edit.isNewRow(row))
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
                if (row != null && _edit.isNewRow(row))
                    row[this.DataFkeyFid] = fkey;
            }
        }
    };

    /**
     * boxSetNewId -> setNewIdByBox
     * set new id by row box
     * public for MyCrud.js, Flow.js
     * param box {object} row box
     * return {int} new key index
     */
    this.setNewIdByBox = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
        _edit.addIsNew(box);    //增加_IsNew隱藏欄位
        return this.newIndex;
    };

    /**
     * set sort field if need
     * param rowsBox {object} default this.rowsBox
     */
    this.setSort = function (rowsBox) {
        var sortFid = this.sortFid;
        if (_str.isEmpty(sortFid))
            return;

        var me = this;
        rowsBox = this._getRowsBox(rowsBox);
        rowsBox.find(_input.fidFilter(sortFid)).each(function (i, item) {
            //this did not work in this loop !!
            _itext.set(sortFid, i, $(item).closest(me.rowFilter));
        });
    };

    /**
     * getRowsBox -> getTrs
     * get rows box
     * param rowsBox {object} optional, return this.rowsBox if null
     * return {object}
     */
    this._getRowsBox = function (rowsBox) {
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
 * 單筆編輯畫面
 * single edit form, called by _me.crudE.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 
 * 屬性
 *   kid:
 *   eform:
 *   fidTypes:
 *   systemError:
 *   dataJson: 載入資料後(update/view)自動設定
 *   hasFile、fileLen、fileFids: 在 _me.crudE.js setFileVars() 設定
 *   validator: jquery vallidation object (EditMany同), 在 _me.crudE.js _initForm() 設定
 * 
 * 自定函數 called by _me.crudE.js
 *   //void fnAfterLoadJson(json)
 *   //void fnAfterOpenEdit(fun, json): called after open edit form
 *   //void fnAfterSwap(readMode): called after _me.crudR.swap()
 *   error fnWhenSave() ??
 *   void fnAfterSave()
 *   
 * param kid {string} (default 'Id') pkey field id for getKey value & getUpdRow,
 *   must existed or will set systemError variables !!
 * param eformId {string} (default 'eform') must existed or will set systemError variables !!
 * note!! if these two parameters not Id/eform, must new EditOne() and set them !!
 * 
 * return {EditOne}
 */ 
function EditOne(kid, eformId) {

    //fileFids, fileLen, hasFile 屬性在外部設定(_me.crudE.js setFileVars())

    /**
     * initial & and instance variables (this.validator is by _valid.init())
     * called by this(at last)
     */
    this.init = function () {
        this.kid = kid || 'Id';
        eformId = eformId || 'eform';
        this.eform = $('#' + eformId);     //multiple rows container object
        this.dataJson = null;

        //check input & alert error if wrong
        this.systemError = '';
        var error = (this.eform.length != 1) ? 'EditOne.js input eformId is wrong. (' + eformId + ')' :
            (_obj.get(this.kid, this.eform) == null) ? 'EditOne.js input kid is wrong. (' + this.kid + ')' :
            '';
        if (error != '') {
            this.systemError = error;
            alert(error);
            //return;   //not return
        }

        _edit.setFidTypes(this, this.eform);
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
        return (_itext.get(_edit.IsNew, this.eform) == '1');
    };

    /**
     * load row into UI, also save into old variables
     * param row {json}
     */
    this.loadRow = function (row) {
        _form.loadRow(this.eform, row);

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
        return _me.crudE.getUpdRow(this.kid, this.fidTypes, this.eform);
    };

    /**
     * reset UI and edited variables
     */
    this.reset = function () {
        _form.reset(this.eform);
    };

    /**
     * reset key, for update/view -> create
     */
    this.resetKey = function () {
        _itext.set(this.kid, '', this.eform);
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
            var serverFid = _me.crudE.getFileSid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_me.crudE.dataSetFileJson(data, fileJson);
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
        _me.crudE.viewFile(table, fid, elm, key);
    };

    //call last
    this.init();

}//class

//靜態類別 for FlowBase.js only
var _flow = {

	//靜態屬性 node type enum
	TypeStart: 'S',
	TypeEnd: 'E',
	TypeNode: 'N',
	//TypeAuto: 'A',	//auto
};

/**
 * 自定函數:
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAddLine(startNodeId, endNodeId): when add line
 * void fnDropLineEnd(oldNode, newNode): after drop line end point
 */
//控制 FlowNode、FlowLine for 外部程式
function FlowBase(boxId) {	

	/**
	 屬性:
	 boxElm: box element
	 svg: svg
	 nodes: nodes
	 lines: lines
	 startNode: start node
	 onMoveNode: event onMoveNode(node)
	*/

	this._init = function (boxId) {
		this.boxElm = document.getElementById(boxId);
		this.svg = SVG().addTo(this.boxElm).size('100%', '100%');

		this.fnMoveNode = null;
		this.fnAddLine = null;
		this.fnRightMenu = null;
		//this.onMoveNode = onMoveNode;
		//this._reset();
	};

	//清除全部UI元件
	this._reset = function () {
		this.nodes = [];
		this.lines = [];
		this.startNode = null;

		//刪除 svg 裡面的全部子元素
		Array.from(this.svg.node.childNodes).forEach(node => {
			node.remove();
		});
	};

	//載入nodes & lines
	this.loadNodes = function (rows) {
		this._reset();
		for (var i = 0; i < rows.length; i++)
			this.addNode(rows[i]);
	};

	this.loadLines = function (rows) {
		for (var i = 0; i < rows.length; i++)
			this.addLine(rows[i]);
	};

	this.addNode = function (json) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.nodes.length + 1) * (-1);
		let node = new FlowNode(this, json);
		this.nodes.push(node);
		return node;
	};
	
	//addLine(startNode, endNode, id, lineType) {
	this.addLine = function (json) {
		//this.lineCount++;
		//if (id == null)
		//	id = (this.lines.length + 1) * (-1);
		let startNode = this.findNode(json.StartNode);
		let endNode = this.findNode(json.EndNode);
		return new FlowLine(this, startNode, endNode, json.Id, 'A');
	};
	
	this.drawLineStart = function (startNode) {
		this.startNode = startNode;
	};

	//return new line
	this.drawLineEnd = function (endNode) {
		var line = new FlowLine(this, this.startNode, endNode);
		this.startNode = null;
		return line;
	};
	
	this.findNode = function (id) {
		//elm.node 指向dom
		return this.nodes.find(node => node.getId() == id);
	};

	//call last
	this._init(boxId);

} //class FlowBase

/**
 * 流程節點
 * param flowBase {object} FlowBase
 * param json {json} 流程節點資料
 */ 
function FlowNode(flowBase, json) {
	/**
	 屬性:
	 self: this
	 flowBase: FlowBase object
	 svg: svg
	 json: node json, 欄位與後端XgFlowE相同: Id, FlowId, NodeType, Name, PosX, PosY, Width, Height
	 elm: svg group element(與 html element不同)
	 boxElm: border element
	 textElm: text element
	 lines: 進入/離開此節點的流程線
	 width: width
	 height: height
	*/

	//drag evnet
	this.DragStart = 'dragstart';
	this.DragMove = 'dragmove';
	this.DragEnd = 'dragend';

	//start/end node radius
	this.MinRadius = 20;

	//normal node size
	this.MinWidth = 100;
	this.MinHeight = 50;
	this.Padding = 15;

	this._init = function (flowBase, json) {
		this.self = this;
		this.flowBase = flowBase;
		this.svg = flowBase.svg;
		this.json = Object.assign({
			Name: 'Node',
			NodeType: _flow.TypeNode,
			PosX: 50,
			PosY: 50,
			Width: 100,	//??
			Height: 50,	//??
		}, json);

		//set instance variables
		this.lines = [];

		this._render();		//draw node first
		//this._setNodeDrag();	//set node draggable
		//this._setEventJoint();   //讓connector可拖拉
	};

	//繪製完整節點, called by initial
	this._render = function () {
        let nodeType = this.json.NodeType;
        let cssClass = '';
        let nodeName = '';

		// 建立一個 group(有x,y, 沒有大小, 含文字的節點框線), 才能控制文字拖拉
		this.elm = this.svg.group();

		let startEnd = this._isStartEnd();
		if (startEnd) {
            if (nodeType == _flow.TypeStart) {
                cssClass = 'xf-start';
				nodeName = _flow.TypeStart;
            } else {
                cssClass = 'xf-end';
				nodeName = _flow.TypeEnd;
            }

			//circle大小不填, 由css設定, 這時radius還沒確定, 不能move(因為會用到radius)
			this.boxElm = this.elm.circle()
                .addClass(cssClass);
				
			//移動circle時會參考radius, 所以先更新, 從css讀取radius, 而不是從circle建立的屬性 !!
			let style = window.getComputedStyle(this.boxElm.node);	//不能直接讀取circle屬性
            let radius = parseFloat(style.getPropertyValue("r"));	//轉浮點
			this.boxElm.attr("r", radius);
			
			let width = radius * 2;
            this.width = width;		//寫入width, 供後面計算位置
            this.height = width;	//畫流程線時會用到
		} else {
            nodeName = this.json.Name;
            cssClass = 'xf-node';
			this.boxElm = this.elm.rect()
				.addClass(cssClass);
				//.move(this.json.PosX, this.json.PosY);
        }

		this.elm.move(this.json.PosX, this.json.PosY);

		//set data-id = node id
		this._setId(this.json.Id);

		//add 節點文字
		this.textElm = this.elm.text(nodeName)
            .addClass(cssClass + '-text')
            .font({ anchor: 'middle' });

		this._setSize(startEnd);

		//add 連接點 connector(在文字右側), 小方塊, data-nodeElm 記錄節點元素
		if (nodeType != _flow.TypeEnd){
			this.pointElm = this.elm.rect(12, 12).addClass('xf-connector');
			this.pointElm.node.dataset.nodeElm = this.elm;
		}
		
		this._setChildPos(startEnd);
		this._setEvent();
	};

	//是否為起迄節點
	this._isStartEnd = function () {
		return (this.json.NodeType == _flow.TypeStart || this.json.NodeType == _flow.TypeEnd);
	};

	//設定長寬
	this._setSize = function (startEnd) {
		if (!startEnd) {
			let bbox = this.textElm.bbox();
			this.width = Math.max(this.MinWidth, bbox.width + this.Padding * 2);
			this.height = Math.max(this.MinHeight, bbox.height + this.Padding * 2);
		}
		this.boxElm.size(this.width, this.height);
	};

	this.getPos = function () {
		let elm = this.elm;
		return { x: elm.x(), y: elm.y() };
	};

	this.getSize = function () {
		let elm = this.boxElm;
		return { w: elm.width(), h: elm.height() };
	};

	this.getCenter = function () {
		let elm = this.boxElm;
		return { x: elm.cx(), y: elm.cy() };
	};

	//設定子元素位置
	//param startEnd: 如果不是起迄節點要考慮最小寬高
	this._setChildPos = function (startEnd) {
		//文字
		let bbox = this.textElm.bbox();
		//let centerX = this.elm.x() + this.width / 2;
		//let centerY = this.elm.y() + this.height / 2;
		//var box = this.boxElm;
		//let centerX = box.cx();
		//let centerY = box.cy();
		let center = this.getCenter();
		let size = this.getSize();
		//let centerY = box.cy();
        //this.textElm.move(centerX - bbox.width / 2, centerY - bbox.height / 2);
		//this.textElm.move(bbox.width / 2, bbox.height / 2)
		//	.center(centerX, centerY);
		this.textElm.move(size.w / 2, size.h / 2).center(center.x, center.y);

        //連接點
		if (this.pointElm)
			this.pointElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
	};

	this._setEvent = function () {
		//enable right click menu
		var me = this;	//FlowNode
		this.elm.node.addEventListener('contextmenu', function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			var flowBase = me.flowBase;
			if (flowBase.fnRightMenu)
				flowBase.fnRightMenu(true, me.getId(), event.pageX, event.pageY);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		this.elm.draggable().on(this.DragMove, () => {
			this._setChildPos(this._isStartEnd());
			this.lines.forEach(line => line.render());
		}).on(this.DragEnd, (event) => {
			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (this.flowBase.fnMoveNode)
				this.flowBase.fnMoveNode(this.getId(), x, y);
		});

		//set connector draggable
		this._setEventJoint();
	};

	//set event of node connector
	//joint表示起始節點內的連接點
	this._setEventJoint = function () {
		if (!this.pointElm)
			return;
		
		let startElm, startX, startY;
		let tempLine;
		let endElm = null;

		// 啟用 pointElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pointElm !!
		this.pointElm.draggable().on(this.DragStart, (event) => {
			// 初始化線條
			let { x, y } = this.pointElm.rbox(this.svg); // 使用SVG畫布的座標系
			startX = x;
			startY = y;
			startElm = this.self.elm;	//this.self指向這個FlowNode

			tempLine = this.svg.line(startX, startY, startX, startY)
				.addClass('xf-line off');
				
			this.flowBase.drawLineStart(this.self);
				
		}).on(this.DragMove, (event) => {
			//阻止 connector 移動
			event.preventDefault();
			
			// 獲取拖拽的目標座標（相對於 SVG 畫布）
			let { x, y } = event.detail.box;
			let endX = x;
			let endY = y;

			// 更新線條的終點
			tempLine.plot(startX, startY, endX, endY);

			// 檢查座標值是否有效
			if (isFinite(endX) && isFinite(endY)) {
				// 將 SVG 座標轉換為檢視座標
				let svgRect = this.svg.node.getBoundingClientRect();
				let viewPortX = endX + svgRect.x;
				let viewPortY = endY + svgRect.y;

				// 檢查是否懸停在節點上
				let overDom = document.elementsFromPoint(viewPortX, viewPortY)
					.find(elm => elm != startElm && (elm.classList.contains('xf-node') || elm.classList.contains('xf-end')));
				if (overDom) {
					let overElm = overDom.instance;	//svg element
					if (endElm !== overElm) {
						if (endElm) 
							this._markNode(endElm, false);
						endElm = overElm;
						this._markNode(endElm, true);
					}
				} else if (endElm) {
					this._markNode(endElm, false);
					endElm = null;
				}
			}
			
		}).on(this.DragEnd, (event) => {
			// 檢查座標值是否有效
			if (endElm) {
				this._markNode(endElm, false);					
				//this.flowBase.drawLineEnd(this.flowBase.findNode(endElm.node.dataset.id));
				var line = this.flowBase.drawLineEnd(this.flowBase.findNode(this._getIdByElm(endElm)));
				endElm = null;

				//trigger event
				if (this.flowBase.fnAddLine)
					this.flowBase.fnAddLine(line.startNode.getId(), line.endNode.getId());
			}
			tempLine.remove();
		});
	};

	//high light node
	this._markNode = function (elm, status){
		if (status){
			elm.node.classList.add('on');
		} else {
			elm.node.classList.remove('on');
		}
	};

	//id記錄在 boxElm !!
	this.getId = function () {
		return this._getIdByElm(this.boxElm);
	};

	//called by node DragEnd
	this._getIdByElm = function (boxElm) {
		return boxElm.node.dataset.id;
		//return boxElm.dataset.id;
	};

	//id記錄在 boxElm !!
	this._setId = function (id) {
		this.boxElm.node.dataset.id = id;
		//this.boxElm.dataset.id = id;
	};

	this.addLine = function (line) {
		this.lines.push(line);
	};

	this.deleteLine = function (line) {
		let index = this.lines.findIndex(item => item.Id == line.Id);
		this.lines.splice(index, 1);
	};

	//call last
	this._init(flowBase, json);

}//class FlowNode

//名詞使用 startNode/endNode
function FlowLine(flowBase, fromNode, toNode, lineType) {
	//Cnt:中心點, Side:節點邊界, 數值20大約1公分
	this.Max1SegDist = 6;	//2中心點的最大距離, 小於此值可建立1線段(表示在同一水平/垂直位置), 同時用於折線圓角半徑
	this.Min2NodeDist = 25;	//2節點的最小距離, 大於此值可建立line(1,3線段)
	this.Min2SegDist = 20;	//建立2線段的最小距離, 中心點和邊

	//末端箭頭
	this.ArrowLen = 10; 	//長度
	this.ArrowWidth = 5; 	//寬度	

	//line type, 起點位置
	this.TypeAuto = 'A';	//自動
	this.TypeV = 'V';	//垂直(上下)
	this.TypeH = 'H';	//水平(左右)

	/**
	 flowBase: FlowBase object
	 svg: svg
	 path: line path
	 fromNode: from node
	 toNode: to node
	 lineType: 起點位置, A(auto),U(上下),L(左右)
	 isTypeAuto:
	 isTypeV:
	 isTypeH:
	*/
	this._init = function (flowBase, fromNode, toNode, lineType) {
		this.flowBase = flowBase;
		this.svg = flowBase.svg;
		this.fromNode = fromNode;
		this.toNode = toNode;
		this.path = this.svg.path('').addClass('xf-line');
		// 透明的寬線作為觸發區域（放在下面）
		this.path2 = this.svg.path('')
			.fill('none')
			.stroke({ width: 10, color: 'transparent' }) // 注意：透明但可接收事件
			.attr({ 'pointer-events': 'stroke' });       // 只針對 stroke 有事件


		// 用來儲存箭頭的路徑
		this.arrowPath = this.svg.path('').addClass('xf-arrow');
		//this.arrowPath2 = this.svg.path('').addClass('xf-arrow');

		//add line to from/to node
		fromNode.addLine(this);
		toNode.addLine(this);
		this._setEvent();
		this._setType(lineType);
		this.render();
	};

	this._setEvent = function () {
		var me = this;	//FlowLine
		this.path2.node.addEventListener('contextmenu', function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			var flowBase = me.flowBase;
			if (flowBase.fnRightMenu)
				flowBase.fnRightMenu(false, 'me.getId()', event.pageX, event.pageY);
		});
	}

	this._setType = function (lineType) {
		lineType = lineType || this.TypeAuto;
		this.lineType = lineType;
		this.isTypeV = (lineType == this.TypeV);
		this.isTypeH = (lineType == this.TypeH);
		//this.isTypeAuto = (!this.isTypeV && !this.isTypeH) || (lineType == this.TypeAuto);
	};

	/**
	 * 依次考慮使用1線段、2線段、3線段
	 * public for FlowBase.js
	 */
	this.render = function () {

		//=== from Node ===
		// 位置和尺寸, x/y為左上方座標
		const fromPos = this.fromNode.getPos();
		//const fromY = this.fromNode.boxElm.y();
		const fromSize = this.fromNode.getSize();
		//const fromHeight = this.fromNode.height;
		const fromCntX = fromPos.x + fromSize.w / 2;		//中心點
		const fromCntY = fromPos.y + fromSize.h / 2;
		// 四個邊的中間點
		const fromUp = { x: fromPos.x + fromSize.w / 2, y: fromPos.y }; // 上邊中點
		const fromDown = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h };
		const fromLeft = { x: fromPos.x, y: fromPos.y + fromSize.h / 2 };
		const fromRight = { x: fromPos.x + fromSize.w, y: fromPos.y + fromSize.h / 2 };

		//=== to Node ===
		const toPos = this.toNode.getPos();
		//const toY = this.toNode.elm.y();
		const toSize = this.toNode.getSize();
		//const toHeight = this.toNode.height;
		const toCntX = toPos.x + toSize.w / 2;
		const toCntY = toPos.y + toSize.h / 2;
		// 四個邊的中間點
		const toUp = { x: toPos.x + toSize.w / 2, y: toPos.y };
		const toDown = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h };
		const toLeft = { x: toPos.x, y: toPos.y + toSize.h / 2 };
		const toRight = { x: toPos.x + toSize.w, y: toPos.y + toSize.h / 2 };

		// 判斷 fromNode 和 toNode 的相對位置
		const isEndRight = toCntX > fromCntX; 	// toNode 在 fromNode 的右側
		const isEndDown = toCntY > fromCntY; 	// toNode 在 fromNode 的下方

		// 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向
		const match2NodeDistH = (isEndRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x) >= this.Min2NodeDist;
		const match2NodeDistV = (isEndDown ? toUp.y - fromDown.y : fromUp.y - toDown.y) >= this.Min2NodeDist;

		// 是否符合2中心點之間最小距離 for 1線段(否則為3線段)
		const match1SegDistH = Math.abs(fromCntX - toCntX) <= this.Max1SegDist;
		const match1SegDistV = Math.abs(fromCntY - toCntY) <= this.Max1SegDist;

		// 是否符合中心點-邊線之間最小距離 for 2線段
		const match2SegDistIn = Math.abs(fromCntX - toCntX) - toSize.w / 2 >= this.Min2SegDist;
		const match2SegDistOut = Math.abs(fromCntY - toCntY) - fromSize.h / 2 >= this.Min2SegDist;

		//判斷線段數目(1,2,3), 有4個象限, 先考慮上下再左右
		let fromPnt, toPnt;
		let points;
		//let pathStr;
		if (!this.isTypeH && match1SegDistH && match2NodeDistV) {
			//1線段-垂直
			if (isEndDown) {
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${toPnt.y}`;	//取垂直線
			points = [fromPnt, { x: fromPnt.x, y: toPnt.y }];
		} else if (!this.isTypeV && match1SegDistV && match2NodeDistH) {
			//1線段-水平
			if (isEndRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${toPnt.x}`;	//取水平線
			points = [fromPnt, { x: toPnt.x, y: fromPnt.y }];
		} else if (!this.isTypeV && match2NodeDistH && match2SegDistOut) {
			//2線段-水平
			fromPnt = isEndRight ? fromRight : fromLeft;
			toPnt = isEndDown ? toUp : toDown;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${toPnt.x} V ${toPnt.y}`;
			points = [fromPnt, { x: toPnt.x, y: fromPnt.y }, toPnt];
		} else if (!this.isTypeH && match2NodeDistV && match2SegDistIn) {
			//2線段-垂直
			fromPnt = isEndDown ? fromDown : fromUp;
			toPnt = isEndRight ? toLeft : toRight;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, { x: fromPnt.x, y: toPnt.y }, toPnt];
		} else if (!this.isTypeH && match2NodeDistV) {
			//3線段-垂直(2節點內側)
			if (isEndDown) {
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}

			let midY = (fromPnt.y + toPnt.y) / 2;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${midY} H ${toPnt.x} V ${toPnt.y}`;
			points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
		} else if (!this.isTypeV && match2NodeDistH) {
			//3線段-水平(2節點內側)
			if (isEndRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}

			let midX = (fromPnt.x + toPnt.x) / 2;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${midX} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
		} else if (!this.isTypeV) {
			//3線段-水平(2節點外側)
			if (isEndRight) {
				fromPnt = fromRight;
				toPnt = toRight;
			} else {
				fromPnt = fromLeft;
				toPnt = toLeft;
			}
			let midX = isEndRight ? Math.max(fromPnt.x, toPnt.x) + this.Min2NodeDist : Math.min(fromPnt.x, toPnt.x) - this.MinSideSide;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${midX} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
		} else {
			//其他狀況: 用直線(非折線)連接起迄點
			if (isEndDown) {
				if (isEndRight) {
					fromPnt = !this.isTypeH ? fromDown : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isTypeH ? fromDown : fromLeft;
					toPnt = toRight;
				}
			} else {
				if (isEndRight) {
					fromPnt = !this.isTypeH ? fromUp : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isTypeH ? fromUp : fromLeft;
					toPnt = toRight;
				}
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y}`;
			points = [fromPnt, toPnt];
		}

		// 繪製流程線
		this._drawLine(points);
		//this.path.plot(pathStr);
	};

	/**
	 * 繪製流程線部分
	 */
	this._drawLine = function (points) {
		// 生成帶有圓角的折線路徑
		let pathStr = `M ${points[0].x} ${points[0].y}`; // 移動到起點
		let pntLen = points.length;
		let radius = this.Max1SegDist;
		for (let i = 1; i < pntLen; i++) {
			const prevPnt = points[i - 1];
			const nowPnt = points[i];

			// 計算圓角的路徑
			if (i < pntLen - 1) {
				const nextPnt = points[i + 1];

				// 計算圓角的起始點和結束點
				const fromAngle = Math.atan2(nowPnt.y - prevPnt.y, nowPnt.x - prevPnt.x);
				const toAngle = Math.atan2(nextPnt.y - nowPnt.y, nextPnt.x - nowPnt.x);

				const fromOffsetX = radius * Math.cos(fromAngle);
				const fromOffsetY = radius * Math.sin(fromAngle);
				const toOffsetX = radius * Math.cos(toAngle);
				const toOffsetY = radius * Math.sin(toAngle);

				const arcStartX = nowPnt.x - fromOffsetX;
				const arcStartY = nowPnt.y - fromOffsetY;
				const arcEndX = nowPnt.x + toOffsetX;
				const arcEndY = nowPnt.y + toOffsetY;

				// 添加直線到圓角的起始點
				pathStr += ` L ${arcStartX} ${arcStartY}`;

				// 判斷圓弧的方向（順時針或逆時針）
				const angleDiff = toAngle - fromAngle;
				const sweepFlag = angleDiff > 0 ? 1 : 0; // 根據角度差決定 sweep-flag

				// 添加圓角（A 指令）
				pathStr += ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`;
			} else {
				// 最後一段直線
				pathStr += ` L ${nowPnt.x} ${nowPnt.y}`;
			}
		}

		// 繪製流程線
		this.path.plot(pathStr);
		this.path2.plot(pathStr);

		//畫末端箭頭
		this._drawArrow(points[pntLen - 2], points[pntLen - 1]);
		/*
		// 繪製帶有圓角的折線
		const path = svg.path(pathStr)
		  .stroke({ width: 2, color: '#000', linecap: 'round', linejoin: 'round' })
		  .fill('none');
		*/

	};

	/**
	 * 繪製末端箭頭部分, 利用2個傳入端點計算斜率
	 */
	this._drawArrow = function (fromPnt, toPnt) {
		// 計算箭頭的方向
		const angle = Math.atan2(toPnt.y - fromPnt.y, toPnt.x - fromPnt.x); // 計算角度

		// 計算箭頭的2個點
		const arrowPnt1 = {
			x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle - Math.PI / 2),
			y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle - Math.PI / 2)
		};
		const arrowPnt2 = {
			x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle + Math.PI / 2),
			y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle + Math.PI / 2)
		};

		// 更新箭頭路徑
		this.arrowPath.plot(`M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
		//this.arrowPath1.plot(`M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
	};

	//call last
	this._init(flowBase, fromNode, toNode, lineType);

}//class FlowLine

/**
 * 處理 flow UI 元素和資料(mNode, mLine)之間的轉換
 * workflow component
 * param boxId {string} edit canvas id
 * param mNode {EditMany}
 * param mLine {EditMany}
 * return {FlowForm}
 */ 
function FlowForm(boxId, mNode, mLine) {
    /**
     flowBase: flowBase instance
    */

    /**
     * initial flow
     */ 
    this._init = function () {
        //#region constant
        //node types
        //this.StartNode = 'S';
        //this.EndNode = 'E';
        //this.NormalNode = 'N';
        //this.AutoNode = 'A';

        //and/or seperator for line condition
        //js only replace first found, so use regular, value is same to code.type=AndOr
        this.OrSep = '{O}';  
        this.AndSep = '{A}';
        this.ColSep = ',';

        //html filter/class
        this.NodeFilter = '.xf-node';   //for find node object
        this.MenuFilter = '.xf-menu';   //menu for node/line property
        this.EpFilter = '.xf-ep';       //??node end point
        this.StartNodeCls = 'xf-start';    //start node class
        this.EndNodeCls = 'xf-end';        //end node class
        //this.AutoNodeCls = 'xf-auto-node';      //auto node class

        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };  //??initial
        this.OkLineCfg = { stroke: 'green', strokeWidth: 2 };   //??ok
        this.DenyLineCfg = { stroke: 'red', strokeWidth: 2 };   //??deny(reject)

        //??start node config
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

        //??end node config
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

        /*
        //get jsplumb instance
        var flowBox = jsPlumb.getInstance({
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
        flowBox.registerConnectionType('basic', {
            anchor: 'Continuous',
            connector: 'Flowchart',
            //connector: 'StateMachine',            
        });
        */

        //set instance first
        //this.flowBase = new FlowBase(boxId, (nodeId, x, y) => this.onMoveNode(nodeId, x, y));
        var flowBase = new FlowBase(boxId);
        flowBase.fnMoveNode = (nodeId, x, y) => this.onMoveNode(nodeId, x, y);
        flowBase.fnAddLine = (startId, endId) => this.onAddLine(startId, endId);
        flowBase.fnRightMenu = (isNode, rowId, mouseX, mouseY) => this.onRightMenu(isNode, rowId, mouseX, mouseY);
        this.flowBase = flowBase;

        //set event
        this._setFlowEvent();
    };

    this.onMoveNode = function (nodeId, x, y) {
        var rowElm = this.mNode.idToRowBox(nodeId);
        _form.loadRow(rowElm, { PosX: Math.floor(x), PosY: Math.floor(y) });    //座標取整數
    };

    this.onAddLine = function (startId, endId) {
        alert('onAddLine');
    };

    this.onRightMenu = function (isNode, rowId, mouseX, mouseY) {
        alert(`onRightMenu ${isNode}, rowId=${rowId}`);
    };

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    this._setFlowEvent = function () {
        var flowBase = this.flowBase;
        var me = this;

        // bind a click listener to each connection; the connection is deleted. you could of course
        // just do this: jsPlumb.bind('click', jsPlumb.detach), but I wanted to make it clear what was
        // happening.
        //(定義)Notification a Connection was clicked.
        /*
        flowBase.bind('click', function (c) {
            //this.showNodeProp();
            this.modalNodeProp.modal('show');
        });
        */

        /* todo: temp remark
        //line(connection) show context menu
        flowBase.bind('contextmenu', function (elm, event) {
            //"this" not work here !!
            me.showPopupMenu(elm, event, false);
        });
        */

        /*
        //event: before build connection
        //info: connection        
        //flowBase.bind('connection', function (info) {
        flowBase.bind('beforeDrop', function (info) {
            //if (this.loading)
            //    return true;

            //if connection existed, return false for stop 
            //info.source did not work here !!
            var conn = info.connection;
            if (flowBase.getConnections({ source: conn.source, target: conn.target }).length > 0)
                return false;

            //get source node & type
            var prop = me.getLineProp('');

            //set conn style & label
            conn.setPaintStyle(prop.style);    //real connection
            me._setLineLabel(conn, prop.label);

            //add parameters(line model) into connection
            var row = {
                StartNode: me._elmToNodeValue(conn.source, 'Id'),
                EndNode: me._elmToNodeValue(conn.target, 'Id'),
                CondStr: '',
                Sort: 9,
            };
            me._setLineKey(conn, me.addLine(row));

            return true;
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
    /*
    this._setNodeEvent = function (nodeObj) {
        //set source & target property
        var nodeType = _itext.get('NodeType', nodeObj);
        var flowBase = this.flowBase;
        var me = this;

        //event: move node (update x,y)
        //initialise draggable elements.
        //must put before makeSource/makeTarget !!
        var nodeElm = nodeObj[0];
        flowBase.draggable(nodeElm, {
            grid: [10, 10],
            //update node position
            stop: function (params) {
                //debugger;
                //var node = $(params.el);
                var pos = $(params.el).position();
                _form.loadRow(nodeObj, { PosX: Math.floor(pos.left), PosY: Math.floor(pos.top) });
            },
        });

        //build line(connection)
        //must put after flowBase.draggable() !!
        if (nodeType != FlowNode.TypeEnd)
            flowBase.makeSource(nodeElm, this.StartNodeCfg);
        if (nodeType != FlowNode.TypeStart)
            flowBase.makeTarget(nodeElm, this.EndNodeCfg);

        //event: show node menu
        //this._setNodeEvent(nodeObj);
        nodeObj.on('contextmenu', function (event) {
            //"this" is not work here !!
            me.showPopupMenu(event.target, event, true);
        });
    };
    */

    /**
     * load nodes into UI
     * param rows {json} 後端傳回的完整json
     */
    this.loadNodes = function (rows) {
        //this.flowBase.reset();

        //stop drawing
        //jsPlumb.setSuspendDrawing(true);

        //empty all nodes first
        //var box = this.divFlowBox;

        //set nodes class
        //var rows = _me.crudE.jsonGetRows(json);
        //for (var i = 0; i < rows.length; i++)
        //    this._setNodeClass(rows[i]);

        //3rd param reset=false, coz box has other objects, cannot reset
        this.mNode.loadRowsByRsb(rows, true, this.mNode.eform);

        this.flowBase.loadNodes(rows);

        /*
        //set nodes event
        var me = this;
        box.find(this.NodeFilter).each(function () {
            me._setNodeEvent($(this));
        });
        */

        //start drawing
        //jsPlumb.setSuspendDrawing(false, true);
    };

    /**
     * load nodes into UI(hide)
     * param rows {rows} line rows
     */
    this.loadLines = function (rows) {
        //stop drawing
        //jsPlumb.setSuspendDrawing(true);


        //render jsplumb line
        //var rows = _me.crudE.jsonGetRows(json);
        //for (var i = 0; i < rows.length; i++)
        //    this._renderLine(rows[i]);

        //load editMany lines
        this.mLine.loadRowsByRsb(rows, true, this.mLine.eform);

        this.flowBase.loadLines(rows);

        //start drawing
        //jsPlumb.setSuspendDrawing(false, true);
    };

    //#region node function
    /**
     * set node class(_NodeClass), template has this field
     * param row {json} node row
     * return {json} new row
     */
    /*
    this._setNodeClass = function (row) {
        switch (row.NodeType) {
            case this.StartNode:
                row._NodeClass = this.StartNodeCls;
                break;
            case this.EndNode:
                row._NodeClass = this.EndNodeCls;
                break;
            //case this.AutoNode:
            //    row._NodeClass = this.AutoNodeCls;
            //    break;
            default:
                //normal node
                break;
        }

        return row;
    };
    */

    //add new node
    this.addNode = function (name, nodeType) {
        //json row initial value
        var row = {
            Name: name,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };

        var node = this.mNode.addRow(this._setNodeClass(row), this.divFlowBox);
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
        var flowBase = this.flowBase;
        this.deleteLines(flowBase.getConnections({ source: nodeElm }));
        this.deleteLines(flowBase.getConnections({ target: nodeElm }));

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
        //debugger;
        var conn = this.flowBase.connect({
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
        _form.loadRow(newLine, row);        //row objec to UI
        var key = this.mLine.setNewIdByBox(newLine);   //set new key
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
        obj.setVisible(_str.notEmpty(label));
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
        this.flowBase.deleteConnection(conn);
    };
    this.deleteLines = function (conns) {
        for (var i = 0; i < conns.length; i++) {
            this.deleteLine(conns[i]);
        }
    };
    //#endregion (line function)

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
            canEdit = (nodeType == FlowNode.TypeStart);
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
        _form.loadRow(this.modalNodeProp, row);

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
                _form.loadRow(newCond, condList[i]);
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
        _form.loadRow(cond, row);        //row objec to UI
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
        var row = _form.toRow(this.eformNode);

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
        _form.loadRow(line, row);

        //change line label
        var prop = this.getLineProp(condStr)
        this._setLineLabel(conn, prop.label);
        conn.setPaintStyle(prop.style);
    };
    //#endregion (events)

    //call last
    this._init();

}//class
/**
 * pagin component, config has properties:
 * pageStr {string} json string from backend(pageNo,pageRows,filterRows)
 * pager {object} jquery page object
 * linker {object} (optional) link object, if empty
 * action {string} action url
 * showMenu {bool} (default false) show page menu or not(select page rows)
 * pageRowList {array} (default [10,25,50,100]) page menu item list
 * onFind {function} (optional) callback for get input json
 * return {Page}
 */ 
function Page(config) {

	//get from input parameters
	this.pager = config.pager;
	this.linker = config.linker;
	this.action = config.action;
	this.showMenu = config.showMenu || _var.notEmpty(config.pageRowList);
	this.pageRowList = config.pageRowList || [10,25,50,100];
	//this.onFind = config.onFind;
	//this.noRowMsg = noRowMsg || _BR.FindNone;

	//initial
	this._init = function(pageStr, onFind) {
		//has: pageNo, pageRows, filterRows
		this.pageArg = this._getPageArg(pageStr);
		var arg = this.pageArg;
		var pager = this.pager;
		if (arg.filterRows <= 0) {
			pager.hide();
			_tool.msg(_BR.FindNone);
			return;
		}

		/*
		//var count = this.pager.length == 0 ? 0 : parseInt(this.pager.data('count'));
		if (arg.filterRows <= arg.pageRows) {
			if (arg.filterRows == 0)
				pager.html('<div class="-info">' + noRowMsg + '</div>')
			//pager.hide();
			return;
		}
		*/

		//set rows menu if need
		var menu = '';
		if (this.showMenu) {
			//var tpl = "每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆";
			var cols = _BR.Page.split('@@');
			menu = cols[0].replace('_Menu', this._getMenuHtml());

			var start = (arg.pageNo - 1) * arg.pageRows + 1;
			var end = start + arg.pageRows - 1;
			var info = cols[1]
				.replace('_Start', start)
				.replace('_End', end <= arg.filterRows ? end : arg.filterRows)
				.replace('_Total', arg.filterRows);
			menu = _str.format(
				"<div class='xg-page-menu'>" +
					"<label>{0}<span>{1}</span></label>" +
				"</div>", menu, info);
		}

		//set html
		//pager.addClass('row');	//for layout
		pager.html(menu + "<div class='xg-page-btns'></div>");

		//register onchange event, this did not work inside !!
		pager.find('select').change(function () {
			onFind();
		});

		//initial simplePagin
		pager.find('.xg-page-btns').pagination({
			currentPage: arg.pageNo,
			itemsOnPage: arg.pageRows,
			items: arg.filterRows,
			//displayedPages: 3,
			//cssStyle: 'col-md-' + (this.showMenu ? '8' : '12'),	//for layout, will add into ul class(listStyle)
			//listStyle: 'pagination justify-content-' + (this.showMenu ? 'end' : 'center'),
			listStyle: 'pagination ' + (this.showMenu ? 'xg-has-menu' : 'xg-no-menu'),
			prevText: "<",
			nextText: ">",
			//prevText: "<i class='fas fa-chevron-left'></i>",
			//nextText: "<i class='fas fa-chevron-right'></i>",
			onPageClick: onFind,
		});

	};

	this._getMenuHtml = function () {
		var menu = "<select class='form-select' style='width:80px; display:inline-block'>";
		for (var i = 0; i < this.pageRowList.length; i++) {
			menu += _str.format("<option value='{0}'{1}>{0}</option>", this.pageRowList[i],
				this.pageArg.pageRows == this.pageRowList[i] ? ' selected' : '');
		}
		menu += "</select>";
		return menu;
	};

	//pageArg has 3 property: pageNo, pageRows, filterRows
	this._getPageArg = function (pageStr) {
		var json = JSON.parse(_html.decode(pageStr));
		if (json['pageNo'] == null)
			json['pageNo'] = 1;
		if (json['pageRows'] == null)
			json['pageRows'] = 0;
		if (json['filterRows'] == null)
			json['filterRows'] = -1;
		return json;
	};

	/**
	 * public method for find rows
	 * param url {string} action url
	 * param json {json} query json
	 * param page {int} page no
	 */
	this.find = function (json, page) {
		json = json || {};
		var arg = this.pageArg;
		if (_var.isEmpty(page)) {
			arg.pageNo = 1;
			arg.filterRows = -1;
			arg.pageRows = this.pager.find('select').val();
		} else {
			arg.pageNo = page;
		}

		var url = this.action +
			'?page=' + arg.pageNo +
			'&rows=' + arg.pageRows +
			'&filter=' + arg.filterRows;
		for (var key in json) {
			if (_str.notEmpty(json[key]))
				url += '&' + key + '=' + json[key];
		}

		var linker = this.linker;
		if (_obj.isExist(linker)) {
			linker.attr('href', url);
			linker.trigger('click');
		} else {
			window.location = url;
        }
	};

    //call last
    this._init(config.pageStr, config.onFind);

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
                _me.crudR.dtProp,
                { targets: [0], render: function (data, type, full, meta) {
                    //多選或單選
                    var value = _str.colsToStr(full.Id, full.Name, full.Account);
                    return ou.isRows
                        ? _me.crudR.dtCheck0(value)
                        : _me.crudR.dtRadio1(value);
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