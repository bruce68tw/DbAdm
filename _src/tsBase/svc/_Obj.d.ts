export default class _Obj {
    static toAny(obj: JQuery): any;
    static setEdit(obj: JQuery, status: boolean): void;
    /**
     * get object by name for input field
     */
    static get(fid: string, box: JQuery): JQuery;
    /**
     * getF -> getByFt
     * get object by filter string
     * 傳回JQuery物件, 裡面包含多個 element,
     */
    static getByFt(ft: string, box: JQuery): JQuery;
    /**
     * for none input object
     * get object by id for none input field, like button
     */
    static getById(id: string, box: JQuery): JQuery;
    static getByPreFid(id: string, box: JQuery): JQuery;
    /**
     * get id of object
     */
    static getId(obj: JQuery): string;
    /**
     * get name of object
     */
    static getName(obj: JQuery): string;
    /**
     * check object is visible or not
     */
    static isShow(obj: JQuery): boolean;
    /**
     * check object existed or not
     */
    static isEmpty(obj: JQuery): boolean;
    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    static notEmpty(obj: JQuery): boolean;
    /**
     * check object has attribute or not
     * return boolean
     */
    static hasAttr(obj: JQuery, attr: string): string;
    static show(obj: JQuery): void;
    static hide(obj: JQuery): void;
    static showByStatus(obj: JQuery, status: any): void;
    static getData(obj: JQuery, fid: string): string;
    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    static setData(obj: JQuery, fid: string, value: string): void;
    static tagName(obj: JQuery): string;
    static renameCss(obj: JQuery, oldCss: string, newCss: string): void;
}
