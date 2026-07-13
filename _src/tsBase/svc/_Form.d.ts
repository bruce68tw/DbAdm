export default class _Form {
    /**
     * get input values, 排除不儲存的欄位, 可用在多筆的單行
     * param form {object} input form
     * return {json}
     */
    static toRow(form: JQuery): Json;
    static toRowStr(form: any): string;
    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    static loadRow(form: any, row: Record<string, any>): void;
    /**
     * reset all inputs with name attribute
     * param form {object}
     * param init {bool} 是否填入初始值, default false
     */
    static reset(form: any, init?: boolean): void;
    /**
     * check has file input or not
     */
    static hasFile(form: any): boolean;
    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    static setEdit(form: any, status: boolean): void;
    /**
     * hide & show div with effect
     * param hides {array} object array to hide
     * param shows {array} object array to show
     */
    static hideShow(hides?: JQuery[], shows?: JQuery[]): void;
}
