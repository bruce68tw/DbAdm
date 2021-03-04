
//處理日期欄位(使用bootstrap-calendar) 和日期資料
var _idate = $.extend({}, _ibase, {

    //=== get/set start ===
    getO: function (obj) {
        return obj.val();
    },

    setO: function (obj, value) {
        obj.val(_idate.toDate(value));
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },


    //=== 日期元件 start ===
    //initial by fid
    //onChange event 記錄在 data-onchange
    //init: function (fid, box, fnOnChange) {
    init: function (fid, box) {
        var obj = _str.isEmpty(fid)
            ? $('.xg-date')
            : _obj.get(fid, box).closet('.xg-date');
        if (obj.length > 0)
            _idate.initO(obj);
    },

    //initial by object(s)
    //initO: function (obj, fnOnChange) {
    initO: function (obj) {
        /*
        //datepicker指向 date input 外面的 div
        obj = (obj === null || obj === undefined)
            ? $('.xg-date')
            : obj.closet('.xg-date');
        */

        //日期欄位
        obj.datepicker({
            //format: _BR.DateEditFormat,
            language: _fun.locale,
            autoclose: true,
            showOnFocus: false,
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
            //$(this).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = !_str.isEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
                fnOnChange(fid, me.val());
            }
            */
        });

        //取消event listen, 否則清除時會顯示日曆(jquery 3.21 會listen) !!
        obj.find('.input-group-addon').off('click');
    },

    //for 多筆區域
    initByBox: function (box, fnOnChange) {
        _idate.initO(box.find('.xg-date'), fnOnChange);
    },

    //show/hide datepicker
    toggle: function (me) {
        //$(me).parent().parent().find('input').trigger('focus');
        $(me).parent().parent().datepicker('show');
    },

    //clean value
    clean: function (me) {
        $(me).parent().parent().datepicker('update', '');
    },

    //(停用)
    //產生一個日期元件(用於多筆區域), 參考 XiDateHelper
    //必須執行 _data.init()
    //input 欄位放一個 xd-date for 判斷欄位種類為日期 !!
    render: function (dataId, value, required, extClass) {
        extClass = extClass || '';
        if (required === true)
            extClass += ' ' + _fun.XdRequired;
        //span 要放在外面, 跟 XiDateHelper 不同 !!
        return _str.format("" +
            "<div class='input-group date xg-date' data-provide='datepicker'>" +
            "    <input data-id='{0}' value='{1}' type='text' class='form-control xd-date {2}'>" +
            "    <div class='input-group-addon'>" +
            "        <i class='fa fa-times' onclick='_idate.clean(this)'></i>" +
            "        <i class='fa fa-calendar' onclick='_idate.toggle(this)'></i>" +
            "    </div>" +
            "</div>" +
            "<span data-id2='{3}' class='{4}'></span>", 
            dataId, _idate.toDate(value), extClass, dataId + _fun.errTail, _fun.errLabCls);
    },

    //=== 計算 start ===
    /**
      傳回起迄日期(json) for 日期欄位查詢
      param {string} start 開始日期欄位id
      param {string} end 結束日期欄位id
      params {object} box box object
      return {json} 包含start, end欄位
     */
    getStartEnd: function(start, end, box) {
        //var start2 = box.find
    },

    //today: yyyy/mm/dd
    today: function(){
        var today = new Date();
        return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    },

    //西元年度
    getYear: function() {
        return (new Date()).getFullYear();
    },

    //to date format(考慮多國語)
    toDate: function (value) {
        return (_str.isEmpty(value))
            ? ''
            : moment(value).format(_BR.DateEditFormat);
    },
    toDt2: function (value) {
        return (_str.isEmpty(value))
            ? ''
            : moment(value).format(_BR.DtFormat2);
    },

    //get datetime string
    //time為下拉欄位
    getDt: function (fDate, fTime, box) {
        var date = _idate.get(fDate, box);
        var time = _iselect.get(fTime, box);
        if (date == '')
            return '';
        else
            return (time == '') ? date : date + ' ' + time;
    },

    //date, hour, minute fields to datetime string
    //hour, min為下拉欄位
    field3ToDt: function (fDate, fHour, fMin, box) {
        var date = _idate.get(fDate, box);
        if (date == '')
            return '';

        var hour = _iselect.get(fHour, box);
        var min = _iselect.get(fMin, box);
        return date + ' ' +
            (hour == '' ? '00' : hour) + ':' +
            (min == '' ? '00' : min);
    },

    //date1是否大於date2
    isBig: function(date1, date2) {
        return (Date.parse(date1) > Date.parse(date2));
    },

    //計算月份差距 by string
    getMonthDiff: function (start, end) {
        return (_str.isEmpty(start) || _str.isEmpty(end))
            ? 0
            : _idate.getMonthDiffByDate(new Date(start), new Date(end));
    },

    //計算月份差距 by date(不考慮日)
    getMonthDiffByDate: function (d1, d2) {
        //var months;
        var months = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth() + 1;
        //if (d2.getDate() > d1.getDate())
        //    months++;
        return months;
    },

    //日期(yyyy/mm/dd) 加上年, 傳回新的日期字串
    addYear: function (date, year) {
        return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
    },

}); //class