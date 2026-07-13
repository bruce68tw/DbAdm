import _iBase from './_iBase';
export default class _iHtml extends _iBase {
    static Filter: string;
    static getO(obj: JQuery): any;
    static setO(obj: JQuery, value: string): void;
    static setEditO(obj: JQuery, status: boolean): void;
    /**
     * init html editor
     * param edit {object} EditOne/EditMany object
     * param prog {string} program code
     * param height {int} (optional)input height(px)
     */
    static init(edit: any, prog: string, height?: number): void;
    static setEdits(box: JQuery, subFilter: string, status: boolean): void;
}
