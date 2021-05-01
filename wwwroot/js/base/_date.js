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
     * Constant, moment.js datetime format, match to cs _Fun.CsDtFormat, _Fun.DbDtFormat
     */ 
    JsDateFormat: 'YYYY/MM/DD',
    JsDtFormat: 'YYYY/MM/DD HH:mm:ss',

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
        //var date = new Date();
        //return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        return moment().format(_BR.UiDateFormat);
    },

    /**
     * get current year
     */ 
    nowYear: function() {
        return (new Date()).getFullYear();
    },

    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */ 
    jsToUiDate: function (ds) {
        return (_str.isEmpty(ds))
            ? ''
            : moment(ds, _date.JsDateFormat).format(_BR.UiDateFormat);
    },

    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    uiToJsDate: function (ds) {
        return (_str.isEmpty(ds))
            ? ''
            : moment(ds, _BR.UiDateFormat).format(_date.JsDateFormat);
    },

    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */ 
    jsToUiDt2: function (dts) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _date.JsDtFormat).format(_BR.UiDt2Format);
    },

    jsToUiDt: function (dts) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _date.JsDtFormat).format(_BR.UiDtFormat);
    },

    jsToFormat: function (dts, format) {
        return (_str.isEmpty(dts))
            ? ''
            : moment(dts, _date.JsDtFormat).format(format);
    },

    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    tsToUiDt: function (ts) {
        return (ts == '')
            ? ''
            : moment(parseInt(ts) * 1000).format(_BR.UiDtFormat);
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
     * compare two js date string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    isBig: function(ds1, ds2) {
        //return (Date.parse(date1) > Date.parse(date2));
        return moment(ds1, _date.JsDtFormat).isAfter(moment(ds2, _date.JsDtFormat));
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
            : _date.getMonthDiffByDate(moment(ds1, _date.JsDtFormat), moment(ds2, _date.JsDtFormat));
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
        return moment(ds, _date.JsDtFormat).add(year, 'y').format(_date.JsDtFormat);
    },

}; //class