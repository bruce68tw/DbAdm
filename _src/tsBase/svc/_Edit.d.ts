/**
 * 做為 EditOne/EditMany 的延伸函數庫, 可以在這裡存取其 instance 變數!!
 * 許多函數在初始化執行, 所以無法放在CrudE.js
 * 主要called by CrudE.js, EditOne.js, EditMany.js, 但其它程式也可呼叫 !!
 * 內容為:
 * 1.靜態 constant
 * 2.初始化函數
 * 3.get/set old value
 * 4.判斷是否為新資料 & 處理
 */
export default class _Edit {
    static readonly Rows = "_rows";
    static readonly Childs = "_childs";
    static readonly Deletes = "_deletes";
    static readonly DataFkeyFid = "_fkeyfid";
    static readonly FileJson = "_fileJson";
    static readonly DataOld = "_old";
    /**
     * setFidTypeVars + setFileVars -> initVars
     * 設定: fidTypes, fidTypeLen, fileFids, fileLen, hasFile
     * param edit {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    static initVars(edit: OneMany, box: JQuery): void;
    /**
     * get rows of json
     * @param {any} json
     * @returns
     */
    static jsonGetRows(json: any): any[] | null;
    static jsonGetRows0(json: any): any | null;
    static getChildJson(upJson: any, childIdx: number): any | null;
    static getChildRows(upJson: any, childIdx: number): any[] | null;
    static getChildRows0(upJson: any, childIdx: number): any | null;
    /**
     * upJson set child rows
     * @param upJson {json}
     * @param childIdx {int}
     * @param rows {jsons}
     * @returns {json} child object
     */
    static setChildRows(upJson: Json, childIdx: number, rows: Json[]): Json;
    static isEditOne(edit: any): boolean;
    /**
     * get old value
     * param obj {object} input JQuery object
     * return {string}
     */
    static getOld(obj: JQuery): any;
    /**
     * set old value
     * param obj {object} input JQuery object
     * param value {int/string}
     */
    static setOld(obj: JQuery, value: any): void;
    /**
     * check a new row or not, parseInt(ABC123) will get int, cannot use it!!
     * param row {json}
     * param key {string}
     * return {bool}
     */
    static isNewRow(row: any, kid: string): boolean;
    /**
     * check a new JQuery object or not
     * param box {object} JQuery object
     * param key {string}
     * return {bool}
     */
    static isNewBox(box: JQuery, kid: string): boolean;
    /**
     * check is new key or not, key為空值或是小於0都視為new key
     * param key {string}
     * return {bool}
     */
    static isNewKey(key: any): boolean;
    /**
     * load row into 單筆UI
     * called by EditOne, EditMany(mode=one)
     * @param edit {EditOne/EditMany}
     * @param box {JQuery}
     * @param row {json}
     */
    static loadRow(edit: any, box: JQuery, row: any): void;
    /**
     * get one updated row for New/Updated
     * 只讀取有異動的欄位
     * @param edit {EditOne/EditMany}
     * @param box {object} form object
     * @returns json row
     */
    static getUpdRow(edit: any, box: JQuery): any | null;
    /**
     * onclick viewFile
     * 雖然直接開啟(pdf,docx...)比較方便, 但是各瀏覽器行為不同, 最後只有圖檔直接開啟, 其他則下載
     * window.open(url, "_blank") 會出現小方塊, 故不採用
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    static viewFileA(table: string, fid: string, elm: Elm, key: string): Promise<void>;
    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * @param levelStr {string}
     * @param fid {string} ui file id
     * @returns {string} format: Table_Fid
     */
    static getFileSid(levelStr: string, fid: string): string;
}
