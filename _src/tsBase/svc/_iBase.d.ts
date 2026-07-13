export default class _iBase {
    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string}
     */
    static get(fid: string, box: JQuery): any;
    static getD(id: string, box: JQuery): any;
    static getF(ft: string, box: JQuery): any;
    static getO(obj: JQuery): StrNumN;
    static set(fid: string, value: any, box: JQuery): void;
    static setD(id: string, value: JQuery, box: any): void;
    static setF(ft: string, value: any, box: JQuery): void;
    static setO(obj: JQuery, value: any): void;
    static getBorder(obj: JQuery): any;
    static setEdit(fid: string, status: boolean, box: JQuery): void;
    static setEditO(obj: JQuery, status: boolean): void;
}
