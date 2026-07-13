export default class CrudR {
    temp: Record<string, any>;
    divRead: any;
    dt: any;
    private _updName;
    hasDraft: boolean;
    constructor(dtConfig: any, edits?: any[], updName?: string);
    /**
     * onclick viewFile
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    viewFile(table: string, fid: string, key: string, fileName: string): void;
    /**
     * button html string
     * @param id {string}
     * @param label {string}
     * @param fnOnclick {string}
     * @param fnArgs {string} 多個時逗號分隔
     * @returns button html string
     */
    dtBtn(id: string, label: string, fnOnclick: string): string;
    /**
     * checkbox for multiple select
     * @param value {string} [1] checkbox value
     * @param editable {bool} [true]
     */
    dtCheck0(value: StrNum, editable?: boolean): string;
    dtRadio1(value: any, editable?: boolean): string;
    /**
     * set status column(checkbox)
     * @param value {string} checkbox value, will translate to bool
     * @param fnOnClick {string} onclick function, default to this.onSetStatusA
     */
    dtSetStatus(key: string, value: any, fnOnClick?: string): string;
    dtStatusName(value: string | number): string;
    dtYesEmpty(value: string | number): string;
    dtRed(text: string, status: boolean): string;
    /**
     * !! change link to button
     * 取消參數 fnOnUpdate, fnOnDelete, fnOnView
     * crud functions: update,delete,view
     * @param key {string} row key
     * @param rowName {string} for show row name before delete
     * @param hasUpdate {bool} has update icon or not
     * @param hasDelete {bool} has delete icon or not
     * @param hasView {bool} has view icon or not
     */
    dtCrudFun(key: string, rowName: string, hasUpdate: boolean, hasDelete: boolean, hasView: boolean, hasCopy: boolean): string;
    /**
     * get Find condition
     */
    private _getFindCond;
    /**
     * 移除參數 nowDiv, fnCallback
     * change newDiv to active
     * @param toRead {bool} show divRead or not
     * //param nowDiv {object} (default _me.divEdit) now div to show
     * //param fnCallback {function} (optional) callback function
     */
    swap(toRead: boolean, fnCallback?: () => void): void;
    /**
     * to edit mode
     * XpFlowSign Read.cshtml 待處理!!
     * param fun {string} U/V
     * param fnCallback {function} 如果進入編輯畫面後要處理畫面, 必須以非同步方式處理
     */
    toEditMode(fun: string, fnCallback?: () => void): void;
    /**
     * back to list form
     */
    toReadMode(): void;
    /**
     * call fnAfterSwap if existed
     * @param toRead {bool} to read mode or not
     */
    /**
     * onclick find rows
     */
    onFind(): void;
    /**
     * onclick find2 button for show/hide find2 form
     */
    onFind2(): void;
    /**
     * onclick reset find form
     */
    onResetFind(): void;
    /**
     * onClick export excel button
     */
    onExport(): void;
    /**
     * onclick toRead button
     */
    onToRead(): void;
    /**
     * onclick Create button
     * 字尾暫不加上A(非同步)
     */
    onCreate(): Promise<void>;
    createAndEdit(): void;
    /**
     * call _me.crudE
     * onclick Update button
     * @param key {string} row key
     */
    /**
     * call _me.crudE
     * onclick View button
     * @param key {string} row key
     */
    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    onSetStatusA(me: any, key: string): Promise<void>;
    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * @param me {string} row key
     * @param box {string} row key
     * @param fid {string} fid
     */
    onCheckAll(me: any, box: any): void;
    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    onDeleteA(key: string, rowName: string): Promise<void>;
    /**
     * TODO: need test
     * 移除參數 fid
     * no called
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string}
     */
    onDeleteRowsA(box: any): Promise<void>;
}
