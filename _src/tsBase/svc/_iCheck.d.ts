import _iBase from './_iBase';
export default class _iCheck extends _iBase {
    /**
     * Check0Id -> FidCheck0
     * default data-fid attribute value for multiple selection
     */
    static fidCheck0: string;
    /**
     * filter for get checked list objects, 初始代階段不可使用 _Input
     */
    static fltCheckeds: string;
    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    static getO(obj: JQuery): string;
    /**
     * (override)set checked or not
     */
    static setO(obj: JQuery, value: any): void;
    /**
     * (override) set status by object(s)
     */
    static setEditO(obj: JQuery, status: boolean): void;
    /**
     * checked -> isChecked
     * get checked status by fid
     * return {bool}
     */
    static isChecked(fid: string, form?: JQuery): boolean;
    /**
     * checkedO -> isCheckedO
     * get checked status by object
     * return {bool}
     */
    static isCheckedO(obj: JQuery): boolean;
    /**
     * getCheckeds -> getCheck0Values
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array} checked value list
     */
    static getCheck0Values(form: JQuery): string[];
    /**
     * (不是處理_check0)讀取多個一群checkbox的值(有勾選的欄位only)
     * form {object} container
     * preFid {string} fid前面字元
     * return {string array} checked value list
     */
    static getCheckedValues(form: JQuery, preFid: string): string[];
    /**
     * no used??
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */
    static checkAll(form: JQuery, status: any): void;
}
