export default class _Date {
    /**
     * ?? 傳回起迄日期(json) for 日期欄位查詢
     * param {string} start 開始日期欄位id
     * param {string} end 結束日期欄位id
     * params {object} box box object
     * return {json} 包含start, end欄位
     */
    static getStartEnd(start: string, end: string, box: JQuery): void;
    /**
     * get today date string in UI format
     */
    static uiToday(): string;
    /**
     * get this week monday in UI format
     */
    static uiWeekMonday(): string;
    static uiWeekFriday(): string;
    /**
     * get this month first day
     */
    static uiMonthDay1(): string;
    /**
     * get this month last day
     */
    static uiMonthDayLast(): string;
    /**
     * get current year, ex: 2021
     */
    static nowYear(): number;
    static mmToUiDate(mm: Moment): string;
    static mmToUiDt(mm: Moment): string;
    static mmToUiDt2(mm: Moment): string;
    static dsToUiDate(ds: string): string;
    static dtsToUiDate(dts: string): string;
    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */
    static dtsToFormat(dts: string, format: string): string;
    static dtsToFormat(ds: string): string;
    static dtsToUiDt(dts: string): string;
    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    static dtsToUiDt2(dts: string): string;
    static dtsToValue(dts: string): number;
    static dtsToMoment(dts: string): any;
    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    static uiToMmDate(ds: string): string;
    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    static tsToUiDt(ts: string): string;
    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    static getHourStr(dts: string): void;
    static getDt(fDate: string, fTime: string, box: JQuery): string;
    /**
     * compare two js date/datetime string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    static isBig(ds1: string, ds2: string): boolean;
    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int}
     */
    static getMonthDiff(ds1: string, ds2: string): number;
    /**
     * get month difference by date
     * param dt1 {moment obj} start date
     * param dt2 {moment obj} end date
     * return {int}
     */
    static getMonthDiffByDate(dt1: any, dt2: any): number;
    /**
     * js date string add year
     * jsDateAddYear -> dsAddYear
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */
    static dsAddYear(ds: string, year: number): string;
}
