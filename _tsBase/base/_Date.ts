import Moment from "moment";
import _Str from "./_Str";
import _Fun from "./_Fun";
import _BR from "./_BR";
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
    public static getStartEnd(start: string, end: string, box: any): any {
        //const start2 = box.find
    }

    /**
     * get today date string in UI format
     */
    public static uiToday(): string {
        const mm = Moment();
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this week monday in UI format
     */
    public static uiWeekMonday(): string {
        const mm = Moment().day(1)
        return _Date.mmToUiDate(mm);
    }

    public static uiWeekFriday(): string {
        const mm = Moment().day(5)
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this month first day
     */
    public static uiMonthDay1(): string {
        const mm = Moment().startOf('month');
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this month last day
     */
    public static uiMonthDayLast(): string {
        const mm = Moment().endOf('month');
        return _Date.mmToUiDate(mm);
    }

    /**
     * get current year, ex: 2021
     */ 
    public static nowYear(): number {
        return (new Date()).getFullYear();
    }

    public static mmToUiDate(mm: Moment.Moment): string {
        return mm.format(_BR.MmUiDateFmt);
    }

    public static mmToUiDt(mm: Moment.Moment): string {
        return mm.format(_BR.MmUiDtFmt);
    }

    public static mmToUiDt2(mm: Moment.Moment): string {
        return mm.format(_BR.MmUiDt2Fmt);
    }

    public static dtsToUiDate(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDate(Moment(dts, _Fun.MmDtFmt));
    }

    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */ 
    public static dtsToFormat(ds: string): string {
        return _Str.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate(Moment(ds, _Fun.MmDateFmt));
    }

    public static dtsToUiDt(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt(Moment(dts, _Fun.MmDtFmt));
    }

    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    public static dtsToUiDt2(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt2(Moment(dts, _Fun.MmDtFmt));
    }

    public static dtsToFormat(dts: string, format: string): string {
        return (_Str.isEmpty(dts))
            ? ''
            : Moment(dts, _Fun.MmDtFmt).format(format);
    }

    //get datetime value for compare
    public static dtsToValue(dts: string): number {
        return (_Str.isEmpty(dts))
            ? 0
            : Moment(dts, _Fun.MmDtFmt).valueOf();
    }

    public static dtsToMoment(dts: string): Moment.Moment | null {
        return (_Str.isEmpty(dts))
            ? null
            : Moment(dts, _Fun.MmDtFmt);
    }

    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    public static uiToMmDate(ds: string): string {
        const date = _Str.isEmpty(ds)
            ? '' : Moment(ds, _BR.MmUiDateFmt).format(_Fun.MmDateFmt);
        return date;
    }

    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    public static tsToUiDt(ts: string): string {
        return (ts == '')
            ? ''
            : Moment(parseInt(ts) * 1000).format(_BR.MmUiDtFmt);
    }

    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    public static getHourStr(dts: string): string {
        // implementation missing in original code
        return '';
    }

    //?? get datetime string
    //time為下拉欄位
    public static getDt(fDate: string, fTime: string, box: any): string {
        const date = _IDate.get(fDate, box);
        const time = _ISelect.get(fTime, box);
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
    public static isBig(ds1: string, ds2: string): boolean {
        return Moment(ds1, _Fun.MmDtFmt).isAfter(Moment(ds2, _Fun.MmDtFmt));
    }

    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int} 
     */ 
    public static getMonthDiff(ds1: string, ds2: string): number {
        // Original code has an error: it uses 'start' and 'end' which are not defined.
        // Assuming it should use ds1 and ds2 as a check for empty, and then pass Moment objects.
        return (_Str.isEmpty(ds1) || _Str.isEmpty(ds2))
            ? 0
            : _Date.getMonthDiffByDate(Moment(ds1, _Fun.MmDtFmt), Moment(ds2, _Fun.MmDtFmt));
    }

    /**
     * get month difference by date
     * param dt1 {moment obj} start date
     * param dt2 {moment obj} end date
     * return {int} 
     */ 
    public static getMonthDiffByDate(dt1: Moment.Moment, dt2: Moment.Moment): number {
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
    public static dsAddYear(ds: string, year: number): string {
        //return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
        return Moment(ds, _Fun.MmDtFmt).add(year, 'y').format(_Fun.MmDtFmt);
    }
}