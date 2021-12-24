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