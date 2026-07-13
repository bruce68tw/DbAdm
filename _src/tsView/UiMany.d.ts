import EditMany from "@base/svc/EditMany";
/**
 * 提供語法提示
 * @typedef {Object} Me
 * @property {EditMany} mItem
 * @property {UiView} uiView
 */
/**
 * 控制 EditMany, 參考 FlowMany.js, called by Read.cshtml only !!
 * 處理 UI 元素和多筆資料之間的轉換
 * 注意:
 * 1.whenSave 會重新設定異動Item的BoxId、ChildNo、Sort
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * param ftWorkArea {string} filter of work area
 * return {UiMany}
 */
/** @type {Me} */
export default class UiMany {
    private FtMenu;
    private ModalInput;
    private ModalGroup;
    private ModalTable;
    private ModalTabPage;
    private ModalChecks;
    private Id2;
    private isEdit;
    private modalItem;
    private modalItemId;
    private modalItemType;
    private mItem;
    private newInputNo;
    private eformItems;
    private uiView;
    /**
     * @param {string} ftWorkArea
     * @param {EditMany} mItem
     */
    constructor(ftWorkArea: string, mItem: EditMany);
    /**
     * (by AI)
     * 將樹狀結構 jsons 轉換回 扁平 rows 陣列。
     * 規則：
     * 1. 每個元素都有 Id、BoxId、ChildNo、Sort 欄位。
     * 2. jsons 的層級結構為 Childs2 (子代二維陣列)。
     * 3. 轉換後結果以 BoxId, ChildNo, Sort 排序。
     * param {json array} jsons
     * return {json array} flat rows array
     */
    _newJsonsToRows(jsons: any[]): any[];
    /**
     * (by AI)
     * 將扁平 rows 陣列 轉換成 樹狀結構 jsons, 例如: 讀取DB並顯示UI到畫面, 規則:
     * 1.rows 元素包含欄位: Id(資料Id)、BoxId(上層Id)、ChildNo(在上層的子代序號)、Sort,
     * 並且事先以 BoxId, ChildNo, Sort 排序
     * 2.jsons 包含 Childs2(子代2維陣列) 欄位
     * param {json array} rows
     * return {json array} nested json array
     */
    _dbRowsToJsons(rows: any[]): any[];
    _hideMenu(): void;
    showMenu(e: JQuery.MouseUpEvent, item: any): void;
    addItemRow(itemType: string): any;
    startDragBtn(status: boolean, itemType: string): void;
    onDragEnd(e: any): Promise<void>;
    _idToRB(itemId: string): JQuery<HTMLElement>;
    getInfo(itemId: string): any;
    setInfo(itemId: string, info: any): void;
    setInfoProp(itemId: string, prop: any): void;
    _getInfoByRB(rb: JQuery): any;
    _setInfoByRB(rb: JQuery, info: any): void;
    _mItemAddRow(itemType: string, info: any): any;
    _addInput(): any;
    _addGroup(): any;
    _addChecks(): any;
    _addRB(): any;
    _addTable(): any;
    _addTabPage(): void;
    _deleteItem(): void;
    _menuStatus(): boolean;
    onMenuEdit(): void;
    onMenuDelete(): Promise<void>;
    onMenuView(): void;
    onModalOk(): Promise<void>;
    reset(): void;
    setEdit(status: boolean): void;
    getJsons(): any;
    loadRowsA(rows: any[]): Promise<void>;
    /**
     * json array to new items
     * called by onImport()
     * param {json array} jsons: 巢狀資料
     */
    loadJsonsA(jsons: any[]): Promise<void>;
    /**
     * (by AI) jsons(tree) to rows(陣列), 同時設定2邊的Id欄位
     * 固定的相關欄位: //Id(資料Id)、BoxId(上層Id)、//ChildNo, Childs2(子代2維陣列)
     * param {json array} jsons nested json array
     * return {json array} json array
     */
    _jsonsToRows(jsons: any[]): any[];
}
