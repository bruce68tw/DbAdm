import UiView from "./UiView";
import MouseEstr from "@base/enum/MouseEstr";
import UiItemTypeEstr from "@base/enum/UiItemTypeEstr";
import InputTypeEstr from "@base/enum/InputTypeEstr";
import EditMany from "@base/svc/EditMany";

import _Ajax from "@base/svc/_Ajax";
import _Array from "@base/svc/_Array";
import _Form from "@base/svc/_Form";
import _Fun from "@base/svc/_Fun";
import _iCheck from "@base/svc/_iCheck";
import _iSelect from "@base/svc/_iSelect";
import _iText from "@base/svc/_iText";
import _Json from "@base/svc/_Json";
import _Modal from "@base/svc/_Modal";
import _Nav from "@base/svc/_Nav";
import _Obj from "@base/svc/_Obj";
import _Prog from "@base/svc/_Prog";
import _Str from "@base/svc/_Str";
import _Tab from "@base/svc/_Tab";
import _Tool from "@base/svc/_Tool";
import _Valid from "@base/svc/_Valid";

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
export default class UiMany {

    private FtMenu: string;
    private ModalInput: JQuery;
    private ModalGroup: JQuery;
    private ModalTable: JQuery;
    private ModalTabPage: JQuery;
    private ModalChecks: JQuery;
    private Id2: string;
    private isEdit: boolean;
    private modalItem: any;
    private modalItemId: string;
    private modalItemType: string;
    private mItem: EditMany;
    private newInputNo: number;
    private eformItems: JQuery;
    private uiView: any;

    /**
     * @param {string} ftWorkArea
     * @param {EditMany} mItem
     */
    constructor(ftWorkArea: string, mItem: EditMany) {
        //const
        this.FtMenu = '.xf-menu';   //right menu filter
        this.ModalInput = $('#modalUiInput');
        this.ModalGroup = $('#modalUiGroup');
        this.ModalTable = $('#modalUiTable');
        this.ModalTabPage = $('#modalUiTabPage');
        this.ModalChecks = $('#modalUiChecks');
        //this.EformInput = this.ModalInput.find('form');   //modalNodeProp form
        this.Id2 = '_Id2';   //UiItem欄位 for 儲存 kid 用於後端設定
        
        this.isEdit = false;    //是否可編輯
        this.modalItem = null;    //modal item
        this.modalItemId = '';
        this.modalItemType = '';
        this.mItem = mItem;      //editMany
        this.newInputNo = 0;    //for fid、title, 累加, 不會當做主key
        this.eformItems = $('#eformItems');      //nodes edit form for editMany        
        //this.tplItem = $('#tplUiItem').html();    //item template

        //now container for add item
        //this.divEdit = $(ftBox);
        //this.workArea = this.divEdit.find(ftWorkArea);

        //this.nowBox = this.workArea;
        //this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        //set instance first
        //let uiView = new UiView(this, ftWorkArea);
        //uiView.fnShowMenu = (event, item) => this.fnShowMenu(event, item);
        //uiView.fnAddItemRow = (itemType) => this.fnAddItemRow(itemType);
        //uiView.fnSaveInfo = (itemId, info) => this.fnSaveInfo(itemId, info);
        //this.uiView = uiView;
        this.uiView = new UiView(this, ftWorkArea);

        //mouse down時hide right menu
        var me = this;
        $(document).on(MouseEstr.MouseDown, function (e: JQuery.MouseDownEvent) {
            //右鍵是3，左鍵是1，中鍵是2, 不處理右鍵，避免提前 hide
            if (e.which != 3) {
                let filter = me.FtMenu;
                if ($(e.target as HTMLElement).parents(filter).length == 0)
                    _Obj.hide($(filter));
            }
        });
    }

    /*
    //#region callback 函數 called by uiView
    //item 改變 box 
    fnMoveBox(itemId, newBoxId) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _Form.loadRow(rowBox, { BoxId: newBoxId });
    }
    */


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
    _newJsonsToRows(jsons: any[]): any[] {
        if (!jsons || jsons.length === 0) return [];

        var rows: any[] = [];
        var idx = 0;    //row Id, 遞減
        var me = this;

        /**
         * 遞迴展開巢狀 Childs2 結構
         * @param {Array} items 當前層的一維或二維陣列
         * @param {string} boxId 上層節點 Id
         */
        function flatten(items: any[], boxId: string = '0') {
            if (!items) return;

            // 若傳入的是一維陣列（根節點），視為 ChildNo=0
            if (boxId == '0') {
                for (let sort = 0; sort < items.length; sort++) {
                    idx--;
                    var item = items[sort];
                    item.Id = idx;
                    item[me.Id2] = idx;     //同時設定
                    const row = { ...item };
                    row.BoxId = boxId;
                    row.ChildNo = 0;
                    row.Info = _Json.toStr(item.Info);  //轉成字串
                    row.Sort = sort;
                    delete row.Childs2;
                    rows.push(row);

                    // 遞迴處理子節點
                    if (item.Childs2 && item.Childs2.length > 0)
                        flatten(item.Childs2, item.Id);
                }
                return;
            }

            // 若為二維陣列（Childs2）
            for (let childNo = 0; childNo < items.length; childNo++) {
                const groups = items[childNo];
                if (!groups) continue;

                for (let sort = 0; sort < groups.length; sort++) {
                    idx--;
                    var group = groups[sort];
                    if (group == null) continue;

                    group.Id = idx;
                    group[me.Id2] = idx;     //同時設定
                    const row = { ...group };
                    row.BoxId = boxId;
                    row.ChildNo = childNo;
                    row.Info = _Json.toStr(group.Info);  //轉成字串
                    row.Sort = sort;
                    delete row.Childs2;
                    rows.push(row);

                    if (group.Childs2 && group.Childs2.length > 0)
                        flatten(group.Childs2, group.Id);
                }
            }
        }

        flatten(jsons, '0');

        /*
        // 依 BoxId, ChildNo, Sort 排序（確保一致性）
        rows.sort((a, b) =>
            a.BoxId.localeCompare(b.BoxId) ||
            a.ChildNo - b.ChildNo ||
            a.Sort - b.Sort
        );
        */
        return rows;
    }

    /**
     * (by AI) 
     * 將扁平 rows 陣列 轉換成 樹狀結構 jsons, 例如: 讀取DB並顯示UI到畫面, 規則:
     * 1.rows 元素包含欄位: Id(資料Id)、BoxId(上層Id)、ChildNo(在上層的子代序號)、Sort, 
     * 並且事先以 BoxId, ChildNo, Sort 排序
     * 2.jsons 包含 Childs2(子代2維陣列) 欄位
     * param {json array} rows
     * return {json array} nested json array
     */
    _dbRowsToJsons(rows: any[]): any[] {
        if (!rows || rows.length === 0) return [];

        // 依 BoxId 分組
        const boxMap = new Map();
        for (const row of rows) {
            const boxId = row.BoxId;
            if (!boxMap.has(boxId)) boxMap.set(boxId, []);
            boxMap.get(boxId).push(row);
        }

        // 遞迴建立 Childs2（二維陣列）
        function buildTree(boxId: string): any[] | null {
            const childs = boxMap.get(boxId);
            if (!childs) return null;

            // 以 boxId 的 ChildNo 分群
            const items2: any[][] = [];
            for (const child of childs) {
                const childNo = parseInt(child.ChildNo);
                if (!items2[childNo])
                    items2[childNo] = [];
                items2[childNo].push(child);
            }

            // 遞迴建立每個 item 的 Childs2
            for (const items of items2) {
                if (!items) continue;

                for (const item of items) {
                    const subs2 = buildTree(item.Id);
                    if (subs2 && subs2.length > 0)
                        item.Childs2 = subs2;
                }
            }

            //根節點為一維, 子節點為二維
            return (boxId == '0')
                ? items2[0]
                : items2;
            //: items2.filter(g => g && g.length > 0);
        }

        // 根節點是 BoxId = '0'，理論上應該只有一個根節點
        return buildTree('0') || [];
    }

    _hideMenu() {
        _Obj.hide($(this.FtMenu));
    }

    //on show right menu
    showMenu(event: JQuery.MouseUpEvent, item: JQuery) {
        //set instance variables
        this.modalItem = item;
        this.modalItemId = this.uiView.itemGetId(item);
        this.modalItemType = this.uiView.itemGetType(item);

        //todo
        let canEdit = true;
        /*
        let canEdit = isNode
            ? (this.isEdit && flowItem.getNodeType() == EstrNodeType.Node)
            : this.isEdit;
        */

        //html 不會自動處理自製功能表狀態, 自行配合 css style
        let css = 'off';
        let menu = $(this.FtMenu);
        _Obj.show(menu);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        } else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }

        //視覺效果較好
        menu.css({
            top: event.pageY,
            left: event.pageX
        }).show();
    }

    //return row
    addItemRow(itemType: string) {
        switch (itemType) {
            case UiItemTypeEstr.Input:
                return this._addInput();
            case UiItemTypeEstr.Group:
                return this._addGroup();
            case UiItemTypeEstr.Checks:
                return this._addChecks();
            //case UiItemTypeEstr.Span:
            //    return this._addSpan();
            case UiItemTypeEstr.RowBox:
                return this._addRB();
            case UiItemTypeEstr.Table:
                return this._addTable();
            case UiItemTypeEstr.TabPage:
                return this._addTabPage();
        }
    }

    //#endregion

    //#region Read.cshtml -> uiView
    //drag by button
    startDragBtn(status: boolean, itemType: string) {
        this.uiView.startDragBtn(status, itemType);
    }

    //called by view drop event
    async onDragEnd(e: any) {
        await this.uiView.onDragEnd(e);
    }

    //#endregion

    _idToRB(itemId: string) {
        return this.mItem.idToRowBox(itemId);
    }

    getInfo(itemId: string) {
        return this._getInfoByRB(this._idToRB(itemId));
    }
    setInfo(itemId: string, info: any) {
        this._setInfoByRB(this._idToRB(itemId), info);
    }
    /*
    //update mItem Info 欄位
    setInfo(itemId, info) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _Form.loadRow(rowBox, { Info: _Json.toStr(info) });
    }
    */

    //set info property
    setInfoProp(itemId: string, prop: any) {
        let rb = this.mItem.idToRowBox(itemId);
        let info = _Json.copy(prop, this._getInfoByRB(rb));
        this._setInfoByRB(rb, info);
    }

    _getInfoByRB(rb: JQuery) {
        return _Str.toJson(_iText.get('Info', rb));
    }
    _setInfoByRB(rb: JQuery, info: any) {
        _iText.set('Info', _Json.toStr(info), rb);
    }

    //#region 功能按鈕相關
    //return row
    _mItemAddRow(itemType: string, info: any) {
        //配合後端DB, 欄位使用大camel
        let itemJson = {
            ItemType: itemType,
            Info: (info == null) ? '' : _Json.toStr(info),
            //Sort: 儲存前設定,
        };
        let mItem = this.mItem;
        let row = mItem.addRow(itemJson);  //會產生id
        _iText.set(this.Id2, row.Id, mItem.idToRowBox(row.Id));   //Id -> _Id2
        return row;
    }

    _addInput() {
        //使用畫面上的設定ColsType
        //set info json first
        this.newInputNo++;
        let info = {
            //Id: row.Id,
            InputType: InputTypeEstr.Text,
            Fid: '_fid' + this.newInputNo,        //前面加底線for註記為需要調整
            Title: '欄位' + this.newInputNo,
            Required: true,
            Cols: this.uiView.DefaultCols,
            //TitleTip: 'label tip 測試',
            //InputNote: 'input note 測試',
        };

        //add to mItem, 會產生id
        return this._mItemAddRow(UiItemTypeEstr.Input, info);

        //add to UI
        //await this.uiView.addInputA(row.Id, info);
    }

    _addGroup() {
        let info = {
            Title: '分群文字',
        };

        //add to mItem
        return this._mItemAddRow(UiItemTypeEstr.Group, info);

        //add to UI
        //await this.uiView.addGroupA(row.Id, info);
    }

    _addChecks() {
        //add to mItem
        let info = {
            Title: '多選欄位',
            Cols: this.uiView.DefaultCols,
            LabelFids: '欄位1,Check1,欄位2,Check2',
            IsHori: 0,  //1=水平, 0=垂直
        };
        return this._mItemAddRow(UiItemTypeEstr.Checks, info);
    }

    /*
    _addSpan() {
        let info = {
            //Title: '分群文字',
        };

        //add to mItem
        return this._mItemAddRow(UiItemTypeEstr.Span, info);
    }
    */

    _addRB() {
        //使用畫面上的設定RowType
        let info = {
            RowType: _iSelect.get('_RowType', (window as any)._me.eform0),
        };

        //add to mItem
        return this._mItemAddRow(UiItemTypeEstr.RowBox, info);

        //add to UI
        //this.uiView.addRow(row.Id);
    }

    _addTable() {
        //add to mItem
        let info = {
            Code: '_table',
            Name: '資料名稱',
            Heads: '欄位1,欄位2,欄位3,欄位4,欄位5',
        };
        return this._mItemAddRow(UiItemTypeEstr.Table, info);

        //add to UI
        //this.uiView.addTable(row.Id, info);
    }

    //todo
    _addTabPage() {
    }
    //#endregion

    //#region menu 事件相關
    _deleteItem() {
        //todo: 考慮有子item的情形
        this.mItem.deleteRow(this.modalItemId);
        this.uiView.deleteItem(this.modalItem);
    }

    //check menu item status
    _menuStatus() {
        let me = _Fun.getMeElm();
        return !me.classList.contains('off');
    }

    //context menu event
    onMenuEdit() {
        if (!this._menuStatus())
            return;

        let info = this.getInfo(this.modalItemId);
        let modal;
        switch (this.modalItemType) {
            case UiItemTypeEstr.Input:
                modal = this.ModalInput;
                break;
            case UiItemTypeEstr.Group:
                modal = this.ModalGroup;
                break;
            case UiItemTypeEstr.Checks:
                modal = this.ModalChecks;
                //LabelFids 分行, 移除尾端逗號
                let result = '';
                let fids = info.LabelFids.split(',');
                for (let i=0; i<fids.length; i+=2) {
                    result += `${fids[i]},${fids[i + 1]}\n`;
                }
                info.LabelFids = result.trimEnd();
                break;
            case UiItemTypeEstr.Table:
                modal = this.ModalTable;
                break;
            case UiItemTypeEstr.TabPage:
                modal = this.ModalTabPage;
                break;
            default:
                return;
        }

        //load info to modal & show
        _Form.loadRow(modal, info);
        _Modal.show(modal);
    }

    async onMenuDelete() {
        if (!this._menuStatus())
            return;

        //刪除box時顯示確認框
        if (this.uiView.isBox(this.modalItemType)) {
            if (await _Tool.ansA('是否確定刪除這個容器?')) {
                this._deleteItem();
                this._hideMenu();
            }
        } else {
            this._deleteItem();
            this._hideMenu();
        }
    }

    onMenuView() {
        //todo
    }
    //#endregion

    //#region modal 相關
    //onclick modal ok
    async onModalOk() {
        //get modal
        let modal;
        switch (this.modalItemType) {
            case UiItemTypeEstr.Input:
                modal = this.ModalInput;
                break;
            case UiItemTypeEstr.Group:
                modal = this.ModalGroup;
                break;
            case UiItemTypeEstr.Checks:
                modal = this.ModalChecks;
                break;
            case UiItemTypeEstr.Table:
                modal = this.ModalTable;
                break;
            case UiItemTypeEstr.TabPage:
                modal = this.ModalTabPage;
                break;
        }

        //check input

        //update ui first, Table必須先判斷, 所以傳入函數
        //ModalTable/ModalTabPage 時回傳ids(要刪除的全部itemId字串陣列, 不為null)
        //let me = this;
        let info = _Form.toRow(modal);    //直接讀取modal內欄位, 內容為 Info 欄位
        let result = await this.uiView.infoToItemA(info, this.modalItem);
        if (result.status) {
            //update mItem Info欄位 & hide modal
            this.setInfo(this.modalItemId, info);

            //刪除多筆
            let itemIds = result.itemIds;
            if (_Array.notEmpty(itemIds)) {
                for (let i = 0; i < itemIds.length; i++)
                    this.mItem.deleteRow(itemIds[i], this.mItem.idToRowBox(itemIds[i]));
            }
        }
        _Modal.hide(modal);
    }
    //#endregion

    //#region 其他
    //清除UI & flow元件
    reset() {
        //reset ui
        this.uiView.reset();
    }

    /*
    deleteAll() {
        //reset ui
        this.uiView.reset();

        //reset mItem
        this.mItem.deleteAll();
    }
    */

    //set editable or not
    setEdit(status: boolean) {
        this.isEdit = status;
        this.uiView.setEdit(status);
    }

    getJsons() {
        return this.uiView.getJsons();
    }

    //called by mUiItem_loadRows
    async loadRowsA(rows: any[]) {
        //EditMany load rows by rowsBox
        this.mItem.loadRowsByRsb(rows, true);

        //rows to jsons
        let jsons = this._dbRowsToJsons(rows);

        //ui load json array
        await this.uiView.loadJsonsA(jsons);
    }

    /**
     * json array to new items
     * called by onImport()
     * param {json array} jsons: 巢狀資料
     */
    async loadJsonsA(jsons: any[]) {
        //jsons(巢狀) to rows(扁平), 同時設定全部Id為小於0數值表示新增
        let rows = this._newJsonsToRows(jsons);

        //delete all first
        var mItem = this.mItem;
        mItem.deleteAll();

        //EditMany load rows by rowsBox
        //json array to rows, 同時設定new Id(負數)
        mItem.loadRowsByRsb(rows, false);   //2nd param: 不reset變數
        mItem.setNewIndex(rows.length);

        //ui loadItems
        this.uiView.reset();    //reset first
        await this.uiView.loadJsonsA(jsons);
    }

    /**
     * (by AI) jsons(tree) to rows(陣列), 同時設定2邊的Id欄位
     * 固定的相關欄位: //Id(資料Id)、BoxId(上層Id)、//ChildNo, Childs2(子代2維陣列)
     * param {json array} jsons nested json array
     * return {json array} json array
     */
    _jsonsToRows(jsons: any[]): any[] {
        const rows: any[] = [];    //result

        function flatten(jsons2: any[], upId: string) {
            for (const json of jsons2) {
                const { ChildNo, ...row } = json;   //取出ChildNo 和其餘屬性
                row.BoxId = upId;
                rows.push(row);

                // 若存在子層群組欄位
                if (ChildNo && Array.isArray(json[ChildNo]) && json[ChildNo].length > 0) {
                    flatten(json[ChildNo], row.Id);
                }
            }
        }

        flatten(jsons, '0');
        return rows;
    }

    /*
    //??
    addItem(json) {
        //add mLine

        this.uiView.addItem(json);
    }
    */
    //#endregion

}//class