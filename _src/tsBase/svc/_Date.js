//import type { Moment } from "moment";   //必須加!!
import _Fun from './_Fun';
import _Str from './_Str';
import _iDate from './_iDate';
import _iSelect from './_iSelect';
export default class _Date {
    /**
     * ?? 傳回起迄日期(json) for 日期欄位查詢
     * param {string} start 開始日期欄位id
     * param {string} end 結束日期欄位id
     * params {object} box box object
     * return {json} 包含start, end欄位
     */
    static getStartEnd(start, end, box) {
        //var start2 = box.find
    }
    /**
     * get today date string in UI format
     */
    static uiToday() {
        var mm = moment();
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this week monday in UI format
     */
    static uiWeekMonday() {
        var mm = moment().day(1);
        return _Date.mmToUiDate(mm);
    }
    static uiWeekFriday() {
        var mm = moment().day(5);
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this month first day
     */
    static uiMonthDay1() {
        var mm = moment().startOf('month');
        return _Date.mmToUiDate(mm);
    }
    /**
     * get this month last day
     */
    static uiMonthDayLast() {
        var mm = moment().endOf('month');
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
    static dsToUiDate(ds) {
        return _Str.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate(moment(ds, _Fun.MmDateFmt));
    }
    static dtsToUiDate(dts) {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDate(moment(dts, _Fun.MmDtFmt));
    }
    static dtsToFormat(ds, format) {
        if (format !== undefined) {
            return (_Str.isEmpty(ds))
                ? ''
                : moment(ds, _Fun.MmDtFmt).format(format);
        }
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
        var date = _Str.isEmpty(ds)
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
    }
    //?? get datetime string
    //time為下拉欄位
    static getDt(fDate, fTime, box) {
        var date = _iDate.get(fDate, box);
        var time = _iSelect.get(fTime, box);
        if (date == '')
            return '';
        else
            return (time == '') ? date : date + ' ' + time;
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
        return (dt2.getFullYear() - dt1.getFullYear()) * 12
            + dt2.getMonth() - dt1.getMonth() + 1;
    }
    /**
     * js date string add year
     * jsDateAddYear -> dsAddYear
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */
    static dsAddYear(ds, year) {
        return moment(ds, _Fun.MmDtFmt).add(year, 'y').format(_Fun.MmDtFmt);
    }
}
