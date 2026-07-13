import _iBase from './_iBase';
export default class _iRadio extends _iBase {
    static get(fid: string, box?: JQuery): string;
    /**
     * get checked data-value by fid
     * param obj {object} single object
     */
    static getO(obj: JQuery, box?: JQuery): string;
    static getObj(fid: string, box?: JQuery): JQuery;
    private static _getByName;
    static set(fid: string, value: string | number, box?: JQuery): void;
    static setO(obj: JQuery, value: string | number, box?: JQuery): void;
    static reset(fid: string, box?: JQuery): void;
    private static _setByName;
    static setEdit(fid: string, status: boolean, box?: JQuery): void;
    /**
     * setEditOs -> setEditO, 因為上層呼叫 setEditO !!
     * @param {object} obj, 可以是複數
     * @param {bool} status
     */
    static setEditO(obj: JQuery, status: boolean): void;
    static getCheck0Tr(form: JQuery): JQuery | null;
    /** * ?? for 多筆資料only(data-id)
     * 產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     * @param {string} fid (optional)id/data-id
     * @param {string} label (optional)show label
     * @param {bool} checked default false, 是否勾選
     * @param {string} value (optional) 如果null則為1
     * @param {bool} editable default true, 是否可編輯
     * @param {string} extClass (optional) extClass
     * @param {string} extProp (optional) extProp
     * @return {string} html string.
    */
    static render(fid: string, label?: string, checked?: boolean, value?: StrNum, editable?: boolean, extClass?: string, extProp?: string): string;
}
