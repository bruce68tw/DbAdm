export default class _Input {
    static isRadio(ftype: string): boolean;
    static get(fid: string, box: JQuery): any;
    /**
     * get input value by object
     * param obj {object}
     * param type {string} (optional) data-type
     * return input value
     */
    static getO(obj: JQuery, box?: JQuery, type?: string): any;
    static set(fid: string, value: unknown, box: JQuery): void;
    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param box {object} for radio
     * param type {string} optional, data-type
     */
    static setO(obj: any, value: any, box: JQuery, type?: string): any;
    /**
     * get input field type
     * 如果obj沒有data-type, 可能存在child
     */
    static getType(obj: any): string | undefined;
    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    static getObj(fid: string, box: JQuery, ftype?: string): any;
    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    static getFid(obj: any): string | undefined;
    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {string} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    static fidFilter(fid?: string | null): string;
    static preFidFilter(fid: string): string;
}
