import moment from "moment";
import _Str from "./_Str";
import _Fun from "./_Fun";
//import _BR from "./_BR";
import _IDate from "./_IDate";
import _ISelect from "./_ISelect";
/**
 * 日期/時間格式包含: 資料庫、c#/js(兩者設定為一致)、UI
 * for date related
 * short name:
 * 1.date: moment date
 * 2.dt: moment datetime
 * 3.ds: date string
 * 4.dts: datetime string
 */
export default class _Date {
    /**
      ?? 傳回起迄日期(json) for 日期欄位查詢
      param {string} start 開始日期欄位id
      param {string} end 結束日期欄位id
      params {object} box box object
      return {json} 包含start, end欄位
     */
    static getStartEnd(start, end, box) {
        //const start2 = box.find
    }
    /**
     * get today date string in UI format
     */
    static uiToday() {
        const mm = moment();
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this week monday in UI format
     */
    static uiWeekMonday() {
        const mm = moment().day(1);
        return _Date.mmToUiDate(mm);
    }
    static uiWeekFriday() {
        const mm = moment().day(5);
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this month first day
     */
    static uiMonthDay1() {
        const mm = moment().startOf('month');
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this month last day
     */
    static uiMonthDayLast() {
        const mm = moment().endOf('month');
        return _Date.mmToUiDate(mm);
    }
    /**
     * get current year, ex: 2021
     */
    static nowYear() {
        return (new Date()).getFullYear();
    }
    static mmToUiDate(mm) {
        return mm.format(_BR.MmUiDateFmt);
    }
    static mmToUiDt(mm) {
        return mm.format(_BR.MmUiDtFmt);
    }
    static mmToUiDt2(mm) {
        return mm.format(_BR.MmUiDt2Fmt);
    }
    static dtsToUiDate(dts) {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDate(moment(dts, _Fun.MmDtFmt));
    }
    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */
    static dtsToDateFormat(ds) {
        return _Str.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate(moment(ds, _Fun.MmDateFmt));
    }
    static dtsToUiDt(dts) {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt(moment(dts, _Fun.MmDtFmt));
    }
    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    static dtsToUiDt2(dts) {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt2(moment(dts, _Fun.MmDtFmt));
    }
    static dtsToFormat(dts, format) {
        return (_Str.isEmpty(dts))
            ? ''
            : moment(dts, _Fun.MmDtFmt).format(format);
    }
    //get datetime value for compare
    static dtsToValue(dts) {
        return (_Str.isEmpty(dts))
            ? 0
            : moment(dts, _Fun.MmDtFmt).valueOf();
    }
    static dtsToMoment(dts) {
        return (_Str.isEmpty(dts))
            ? null
            : moment(dts, _Fun.MmDtFmt);
    }
    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    static uiToMmDate(ds) {
        const date = _Str.isEmpty(ds)
            ? '' : moment(ds, _BR.MmUiDateFmt).format(_Fun.MmDateFmt);
        return date;
    }
    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    static tsToUiDt(ts) {
        return (ts == '')
            ? ''
            : moment(parseInt(ts) * 1000).format(_BR.MmUiDtFmt);
    }
    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    static getHourStr(dts) {
        // implementation missing in original code
        return '';
    }
    //?? get datetime string
    //time為下拉欄位
    static getDt(fDate, fTime, box) {
        const date = _IDate.get(fDate, box);
        const time = _ISelect.get(fTime, box);
        if (_Str.isEmpty(date))
            return '';
        else
            return _Str.isEmpty(time) ? date : date + ' ' + time;
    }
    /**
     * compare two js date/datetime string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    static isBig(ds1, ds2) {
        return moment(ds1, _Fun.MmDtFmt).isAfter(moment(ds2, _Fun.MmDtFmt));
    }
    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int}
     */
    static getMonthDiff(ds1, ds2) {
        // Original code has an error: it uses 'start' and 'end' which are not defined.
        // Assuming it should use ds1 and ds2 as a check for empty, and then pass moment objects.
        return (_Str.isEmpty(ds1) || _Str.isEmpty(ds2))
            ? 0
            : _Date.getMonthDiffByDate(moment(ds1, _Fun.MmDtFmt), moment(ds2, _Fun.MmDtFmt));
    }
    /**
     * get month difference by date
     * param dt1 {moment obj} start date
     * param dt2 {moment obj} end date
     * return {int}
     */
    static getMonthDiffByDate(dt1, dt2) {
        // Note: moment().getFullYear() and moment().getMonth() are not standard moment methods.
        // Assuming the intent was to use the underlying Date object or moment's API methods like year() and month().
        // Based on the original JS code structure, it likely relies on moment's underlying implementation allowing this or expects moment-like objects.
        // Using standard Moment methods here for better type safety and clarity, assuming moment.js is used.
        return (dt2.year() - dt1.year()) * 12
            + dt2.month() - dt1.month() + 1;
    }
    /**
     * js date string add year
     * jsDateAddYear -> dsAddYear
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */
    static dsAddYear(ds, year) {
        //return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
        return moment(ds, _Fun.MmDtFmt).add(year, 'y').format(_Fun.MmDtFmt);
    }
}
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Date.js.map