/**
 * 控制 EditMany, 參考 FlowMany.js, called by Read.cshtml only !!
 * 處理 UI 元素和多筆資料之間的轉換
 * 注意:
 *   1.whenSave 會重新設定異動Item的BoxId、ChildNo、Sort
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * param ftWorkArea {string} filter of work area
 * return {UiMany}
 */ 
class UiMany {

    /**
     * @param {string} ftWorkArea
     * @param {EditMany} mItem
     */
    constructor(ftWorkArea, mItem) {
        //const
        this.FtMenu = '.xf-menu';   //right menu filter
        this.ModalInput = $('#modalInput');
        this.ModalGroup = $('#modalGroup');
        this.ModalTable = $('#modalTable');
        this.ModalTabPage = $('#modalTabPage');
        this.ModalChecks = $('#modalChecks');
        //this.EformInput = this.ModalInput.find('form');   //modalNodeProp form
        
        this.isEdit = false;    //是否可編輯
        this.modalItem = null;    //modal item
        this.modalItemId = '';
        this.modalItemType = '';
        this.mItem = mItem;     //editMany
        this.newInputNo = 0;    //for fid、title, 累加, 不會當做主key
        this.eformItems = $('#eformItems');     //nodes edit form for editMany        
        this.tplItem = $('#tplItem').html();    //item template

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
        $(document).on(EstrMouse.MouseDown, function (e) {
            //右鍵是3，左鍵是1，中鍵是2, 不處理右鍵，避免提前 hide
            if (e.which != 3) {
                let filter = me.FtMenu;
                if ($(e.target).parents(filter).length == 0)
                    _obj.hide($(filter));
            }
        });
    }

    /*
    //#region callback 函數 called by uiView
    //item 改變 box 
    fnMoveBox(itemId, newBoxId) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _form.loadRow(rowBox, { BoxId: newBoxId });
    }
    */

    _hideMenu() {
        _obj.hide($(this.FtMenu));
    }

    //on show right menu
    showMenu(e, item) {
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
        _obj.show(menu);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        } else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }

        //視覺效果較好
        menu.css({
            top: e.pageY,
            left: e.pageX
        }).show();
    }

    //return row
    addItemRow(itemType) {
        switch (itemType) {
            case EstrItemType.Input:
                return this._addInput();
            case EstrItemType.Group:
                return this._addGroup();
            case EstrItemType.Checks:
                return this._addChecks();
            //case EstrItemType.Span:
            //    return this._addSpan();
            case EstrItemType.RowBox:
                return this._addRB();
            case EstrItemType.Table:
                return this._addTable();
            case EstrItemType.TabPage:
                return this._addTabPage();
        }
    }

    //update mItem Info 欄位
    setInfo(itemId, info) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _form.loadRow(rowBox, { Info: _json.toStr(info) });
    }

    //#endregion

    //#region Read.cshtml -> uiView
    //drag by button
    startDragBtn(status, itemType) {
        this.uiView.startDragBtn(status, itemType);
    }

    //called by view drop event
    async onDragEnd(e) {
        await this.uiView.onDragEnd(e);
    }

    //#endregion

    _idToRB(itemId) {
        return this.mItem.idToRowBox(itemId);
    }

    getInfo(itemId) {
        return this._getInfoByRB(this._idToRB(itemId));
    }
    setInfo(itemId, info) {
        this._setInfoByRB(this._idToRB(itemId), info);
    }

    //set info property
    setInfoProp(itemId, prop) {
        let rb = this.mItem.idToRowBox(itemId);
        let info = _json.copy(prop, this._getInfoByRB(rb));
        this._setInfoByRB(rb, info);
    }

    _getInfoByRB(rb) {
        return _str.toJson(_itext.get('Info', rb));
    }
    _setInfoByRB(rb, info) {
        _itext.set('Info', _json.toStr(info), rb);
    }

    //#region 功能按鈕相關
    //return row
    _mItemAddRow(itemType, info) {
        //配合後端DB, 欄位使用大camel
        let itemJson = {
            ItemType: itemType,
            Info: (info == null) ? '' : _json.toStr(info),
            //Sort: 儲存前設定,
        };
        let mItem = this.mItem;
        let row = mItem.addRow(itemJson);  //會產生id
        _itext.set('_Id2', row.Id, mItem.idToRowBox(row.Id));   //Id -> _Id2
        return row;
    }

    _addInput() {
        //使用畫面上的設定ColsType
        //set info json first
        this.newInputNo++;
        let info = {
            //Id: row.Id,
            InputType: EstrInputType.Text,
            Fid: '_fid' + this.newInputNo,		//前面加底線for註記為需要調整
            Title: '欄位' + this.newInputNo,
            Required: true,
            Cols: this.uiView.DefaultCols,
            //TitleTip: 'label tip 測試',
            //InputNote: 'input note 測試',
        };

        //add to mItem, 會產生id
        return this._mItemAddRow(EstrItemType.Input, info);

        //add to UI
        //await this.uiView.addInputA(row.Id, info);
    }

    _addGroup() {
        let info = {
            Title: '分群文字',
        };

        //add to mItem
        return this._mItemAddRow(EstrItemType.Group, info);

        //add to UI
        //await this.uiView.addGroupA(row.Id, info);
    }

    _addChecks() {
        //add to mItem
        let info = {
            Title: '多選欄位',
            Cols: this.uiView.DefaultCols,
            LabelFids: '欄位1,Check1,欄位2,Check2',
            IsHori: false,  //true=水平, false=垂直
        };
        return this._mItemAddRow(EstrItemType.Checks, info);
    }

    /*
    _addSpan() {
        let info = {
            //Title: '分群文字',
        };

        //add to mItem
        return this._mItemAddRow(EstrItemType.Span, info);
    }
    */

    _addRB() {
        //使用畫面上的設定RowType
        let info = {
            RowType: _iselect.get('_RowType', _me.eform0),
        };

        //add to mItem
        return this._mItemAddRow(EstrItemType.RowBox, info);

        //add to UI
        //this.uiView.addRow(row.Id);
    }

    _addTable() {
        //add to mItem
        let info = {
            Table: '_table',
            Title: '資料名稱',
            Heads: '欄位1,欄位2,欄位3,欄位4,欄位5',
        };
        return this._mItemAddRow(EstrItemType.Table, info);

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
        let me = _fun.getMe();
        return !me.classList.contains('off');
    }

    //context menu event
    onMenuEdit() {
        if (!this._menuStatus())
            return;

        let info = this.getInfo(this.modalItemId);
        let modal;
        switch (this.modalItemType) {
            case EstrItemType.Input:
                modal = this.ModalInput;
                break;
            case EstrItemType.Group:
                modal = this.ModalGroup;
                break;
            case EstrItemType.Checks:
                modal = this.ModalChecks;
                //LabelFids 分行, 移除尾端逗號
                let result = '';
                let fids = info.LabelFids.split(',');
                for (let i=0; i<fids.length; i+=2) {
                    result += `${fids[i]},${fids[i + 1]}\n`;
                }
                info.LabelFids = result.trimEnd();
                break;
            case EstrItemType.Table:
                modal = this.ModalTable;
                break;
            case EstrItemType.TabPage:
                modal = this.ModalTabPage;
                break;
            default:
                return;
        }

        //load info to modal & show
        _form.loadRow(modal, info);
        _modal.showO(modal);
    }

    async onMenuDelete() {
        if (!this._menuStatus())
            return;

        //刪除box時顯示確認框
        if (this.uiView.isBox(this.modalItemType)) {
            if (await _tool.ansA('是否確定刪除這個容器?')) {
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
            case EstrItemType.Input:
                modal = this.ModalInput;
                break;
            case EstrItemType.Group:
                modal = this.ModalGroup;
                break;
            case EstrItemType.Checks:
                modal = this.ModalChecks;
                break;
            case EstrItemType.Table:
                modal = this.ModalTable;
                break;
            case EstrItemType.TabPage:
                modal = this.ModalTabPage;
                break;
        }

        //check input

        //update ui first, Table必須先判斷, 所以傳入函數
        //ModalTable/ModalTabPage 時回傳ids(要刪除的全部itemId字串陣列, 不為null)
        let me = this;
        let info = _form.toRow(modal);    //直接讀取modal內欄位, 內容為 Info 欄位
        let itemIds = await this.uiView.infoToItemA(info, this.modalItem);
        if (_array.notEmpty(itemIds)) {
            //刪除多筆
            for (let i = 0; i < itemIds.length; i++) {
                me.mItem.deleteRow(itemIds[i], me.mItem.idToRowBox(itemIds[i]));
            }

            //update mItem Info欄位 & hide modal
            me.setInfo(me.modalItemId, info);
            _modal.hideO(modal);
        }
    }
    //#endregion

    //#region 其他
    //清除UI & flow元件
    reset() {
        //todo: reset mItem
        this.uiView.reset();
    }

    //set editable or not
    setEdit(status) {
        this.isEdit = status;
        this.uiView.setEdit(status);
    }

    async loadRowsA(rows) {
        //EditMany load rows by rowsBox
        this.mItem.loadRowsByRsb(rows, true);

        //rows to jsons
        let jsons = _json.rowsToJsons(rows);

        //ui load json array
        await this.uiView.loadJsonsA(jsons);
    }

    /**
     * json array to new items
     * param {json array} jsons: 巢狀資料
     */
    async loadJsonsA(jsons) {
        //jsons to rows
        let rows = _json.jsonsToRows(jsons);

        //EditMany load rows by rowsBox
        //json array to rows, 同時設定new Id(負數)
        this.mItem.loadRowsByRsb(rows, true);

        //ui loadItems
        await this.uiView.loadJsonsA(jsons);
    }

    getJsons() {
        return this.uiView.getJsons();
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