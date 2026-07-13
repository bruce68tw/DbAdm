/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 * ItemType Input欄位和Group由後端傳入, RowBox、Table、TabPage由前端產生
 * 注意:
 * 1.新增、修改內容、刪除要寫回 mItem:
 * 2.whenSave 重新設定新增或位置有改變的Item的 BoxId, ChildNo, Sort欄位
 * 3.Info 儲存在 uiMany
 */
export default class UiView {
    private uiMany;
    private Area;
    private BoxId0;
    private ClsItem;
    private ClsChild;
    private ClsRowCol;
    private ClsDragging;
    private DataId;
    private DataItemType;
    private DefaultCols;
    private DropLine;
    private FtItem;
    private FtLabel;
    private FtInput;
    private FtReq;
    private FtTipIcon;
    private FtInputNote;
    private FtChild;
    private FtGroupTitle;
    private FtTable;
    private FtTableTitle;
    private NameInput;
    private NameGroup;
    private NameChecks;
    private NameRB;
    private NameTable;
    private NameTabPage;
    private isEdit;
    private newItemId;
    private chgBoxJsons;
    private inputMap;
    private groupHtml;
    private dragItem;
    private dropItem;
    private dragIsNew;
    private dragging;
    private dropElm;
    private dropArea;
    private dropError;
    constructor(uiMany: any, ftWorkArea: any);
    private _onDragStart;
    private _onDragOver;
    onDragEnd(e: any): Promise<void>;
    boxGetChildIds(boxId: string, childNo: number): string[];
    private _findItem;
    getChgBoxJsons(): any[];
    private _setChgBoxJsons;
    private _getDropLine;
    /**
     * box item add child item
     * param {object} box
     * param {string} boxType, null 表示工作區
     * param {int} childNo child 位置, base 0
     * param {object} item
     */
    startDragBtn(status: boolean, itemType: any): void;
    private _setDragging;
    private _typeToName;
    private _isBoxTypeXor;
    isBox(type: any): boolean;
    private _newItemA;
    /**
     * add input
     * called _newItemA, onModalOk
     * param {string} id
     * param {json} info 包含欄位: Fid, Title, Required
     * returns item
     */
    private _newInputA;
    private _newGroupA;
    private _newChecks;
    private _htmlChecks;
    private _newRB;
    private _newTableA;
    private _newTabPage;
    private _itemAddProp;
    private _noteSetStatus;
    private _setInputForTable;
    /**
     * 重設item寬度, 不處理show/hide
     * param {bool} inBox: in box or not
     * param {int} contGridNum: inBox=true時必須傳入, drop container object(row col)
     * return {string} cols
     */
    private _resizeItemByRB;
    private _objShowGrid;
    private _objSetGrid;
    /**
     * called by UiMany onModalOk(修改item內容)
     * 更新畫面上的Item(含外觀、不含Info欄位)
     * param {json} info
     * param {object} item
     * return {status:bool, itemIds:string[]}如果box有刪減欄位, 則傳回要刪除的itemId 字串陣列
     */
    infoToItemA(info: any, item: JQuery): Promise<{
        status: boolean;
        itemIds: string[] | null;
    } | {
        status: boolean;
        itemIds?: undefined;
    }>;
    /**
     * info json write to input item UI
     * called: _newInputA, InfoToItemA
     * param {json} info
     * param {jquery object} item
     */
    private _infoToInputA;
    private _getUpGridNum;
    private _getGridCss;
    /**
     * info to table item ui
     * called by: 1.新增, 2.改變欄位數
     * //param {function} fnCallback 可為空
     * return {string[]} 要刪除的 itemId 字串陣列
     */
    private _infoToTableA;
    reset(): void;
    /**
     * (recursive)載入items(巢狀格式), 此時Info欄位可能為Json或字串 !!
     * called by uiMany loadRowsA、loadJsonsA
     * param {json array} jsons: 內含Id
     * param {object} (this.Area) cont child container
     */
    loadJsonsA(jsons: any[], cont?: JQuery): Promise<void>;
    getJsons(): any[];
    deleteItem(item: JQuery): void;
    private _getInputType;
    itemGetId(item: JQuery): string;
    itemGetType(item: JQuery): string;
    itemGetInfo(item: JQuery): any;
    /**
     * item get info
     * param {object} item
     * returns {json}
     */
    private _getInfo;
    private _setInfo;
    private _setInfoProp;
    private _elmToItem;
    private _getBox;
    setEdit(status: boolean): void;
}
