import _iBase from './_iDate';
export default class _iDt extends _iBase {
    static getO(obj: JQuery): string;
    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _Fun.MmDtFmt
     */
    static setO(obj: JQuery, value: string | null | undefined): void;
    static setEditO(obj: JQuery, status: boolean): void;
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetDate;
    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetHour;
    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetMin;
}
