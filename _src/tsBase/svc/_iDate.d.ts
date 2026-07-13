import _iBase from './_iBase';
export default class _iDate extends _iBase {
    static BoxFilter: string;
    /**
     * get ymd with format _Fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    static getO(obj: JQuery): string;
    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _Fun.MmDateFmt
     */
    static setO(obj: JQuery, value: string): void;
    /**
     * set edit status
     * param obj {object} date input object
     */
    static setEditO(obj: JQuery, status: boolean): void;
    /**
     * initial, called by _me.crudE.js
     * 注意:
     * 欄位必須放在 form裡面, 因為使用 validator !!
     * param box {object}
     * param fid {string} optional
     */
    static init(box: JQuery, fid?: string): void;
    static onToggle(): void;
    static onReset(): void;
    static getEditO(obj: JQuery): boolean;
    /**
     * input element to date box
     * return {object}
     */
    private static _elmToBox;
    private static _objToBox;
    private static _boxSetDate;
    private static _boxGetInput;
}
