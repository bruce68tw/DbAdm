//處理日期轉換, moment因為停更, 改用dayjs
class _Date {

    //更換語系(或初始化)後必須設定
    static setLocale(locale: string) {
        dayjs.locale(locale);
    }

    /**
     * ?? 傳回起迄日期(json) for 日期欄位查詢
     * param {string} start 開始日期欄位id
     * param {string} end 結束日期欄位id
     * params {object} box box object
     * return {json} 包含start, end欄位
     */
    static getStartEnd(start: string, end: string, box: JQuery): void {
        //var start2 = box.find
    }

    //傳回 dayjs 物件
    //dts: date/datetime 字串, 空白表示目前時間
    static getObj(dts?:string): Dayjs {
        return dayjs(dts);
    }

    /**
     * get today date string in UI format
     */
    static uiToday(): string {
        var mm = _Date.getObj();
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this week monday in UI format
     */
    static uiWeekMonday(): string {
        var mm = _Date.getObj().day(1);
        return _Date.mmToUiDate(mm);
    }

    static uiWeekFriday(): string {
        var mm = _Date.getObj().day(5);
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this month first day
     */
    static uiMonthDay1(): string {
        var mm = _Date.getObj().startOf('month');
        return _Date.mmToUiDate(mm);
    }

    /**
     * get this month last day
     */
    static uiMonthDayLast(): string {
        var mm = _Date.getObj().endOf('month');
        return _Date.mmToUiDate(mm);
    }

    /**
     * get current year, ex: 2021
     */
    static nowYear(): number {
        return (new Date()).getFullYear();
    }

    static mmToUiDate(mm: Dayjs): string {
        return mm.format(_BR.MmUiDateFmt);
    }

    static mmToUiDt(mm: Dayjs): string {
        return mm.format(_BR.MmUiDtFmt);
    }

    static mmToUiDt2(mm: Dayjs): string {
        return mm.format(_BR.MmUiDt2Fmt);
    }

    static dsToUiDate(ds: string): string {
        return _Str.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate(_Date.getObj(ds));
    }

    static dtsToUiDate(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDate(_Date.getObj(dts));
    }

    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */
    static dtsToFormat(dts: string, format: string): string;
    static dtsToFormat(ds: string): string;
    static dtsToFormat(ds: string, format?: string): string {
        if (format !== undefined) {
            return (_Str.isEmpty(ds))
                ? ''
                : _Date.getObj(ds).format(format);
        }

        return _Str.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate(_Date.getObj(ds));
    }

    static dtsToUiDt(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt(_Date.getObj(dts));
    }

    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    static dtsToUiDt2(dts: string): string {
        return _Str.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt2(_Date.getObj(dts));
    }

    //get datetime value for compare
    static dtsToValue(dts: string): number {
        return (_Str.isEmpty(dts))
            ? 0
            : _Date.getObj(dts).valueOf();
    }

    static dtsToMoment(dts: string): Dayjs | null {
        return (_Str.isEmpty(dts))
            ? null
            : _Date.getObj(dts);
    }

    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    static uiToMmDate(ds: string): string {
        var date = _Str.isEmpty(ds)
            ? ''
            : dayjs(ds, _BR.MmUiDateFmt).format(_Fun.MmDateFmt);
        return date;
    }

    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    static tsToUiDt(ts: string): string {
        return (ts == '')
            ? ''
            : dayjs(parseInt(ts) * 1000).format(_BR.MmUiDtFmt);
    }

    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    static getHourStr(dts: string): void {

    }

    //?? get datetime string
    //time為下拉欄位
    static getDt(fDate: string, fTime: string, box: JQuery): string {
        var date = _iDate.get(fDate, box);
        var time = _iSelect.get(fTime, box);
        return (date == '') ? '' :
            (time == '') ? date :
            `${date} ${time}`;
    }

    /**
     * compare two js date/datetime string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    static isBig(ds1: string, ds2: string): boolean {
        return _Date.getObj(ds1).isAfter(_Date.getObj(ds2));
    }

    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int}
     */
    static getMonthDiff(ds1: string, ds2: string): number {
        return (_Str.isEmpty(ds1) || _Str.isEmpty(ds2))
            ? 0
            : _Date.getMonthDiffByDate(_Date.getObj(ds1), _Date.getObj(ds2));
    }

    /**
     * get month difference by date
     * param dt1 {dayjs obj} start date
     * param dt2 {dayjs obj} end date
     * return {int}
     */
    static getMonthDiffByDate(dt1: Dayjs, dt2: Dayjs): number {
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
    static dsAddYear(ds: string, year: number): string {
        return _Date.getObj(ds).add(year, 'year').format(_Fun.MmDtFmt);
    }

}
window._Date = _Date;