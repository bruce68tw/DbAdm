/**
 * 控制 EditMany, 參考 FlowMany.js, called by Read.cshtml only !!
 * 處理 UI 元素和多筆資料之間的轉換
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * param ftWorkArea {string} filter of work area
 * return {UiMany}
 */ 
class UiMany {

    constructor(ftWorkArea, mItem) {
        //const
        this.FtMenu = '.xf-menu';   //right menu filter
        this.ModalInput = $('#modalInput');
        this.ModalGroup = $('#modalGroup');
        this.ModalTable = $('#modalTable');
        this.ModalTabPage = $('#modalTabPage');
        //this.EformInput = this.ModalInput.find('form');   //modalNodeProp form
        
        this.isEdit = false;    //是否可編輯
        this.nowItem = null;    //now item
        this.nowItemId = '';
        this.nowItemType = '';
        this.mItem = mItem;     //editMany
        this.newInputNo = 0;    //for fid、title, 累加, 不會當做主key
        this.eformItems = $('#eformItems');           //nodes edit form for editMany        
        this.tplItem = $('#tplItem').html();    //item template

        //now container for add item
        //this.divEdit = $(ftBox);
        //this.workArea = this.divEdit.find(ftWorkArea);

        //this.nowBox = this.workArea;
        //this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        //set instance first
        let uiView = new UiView(ftWorkArea);
        uiView.fnMoveBox = (itemId, newBoxId) => this.fnMoveBox(itemId, newBoxId);
        uiView.fnShowMenu = (event, item) => this.fnShowMenu(event, item);
        uiView.fnAddItem = (itemType) => this.fnAddItem(itemType);
        this.uiView = uiView;

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

    //#region callback 函數
    //item 改變 box 
    fnMoveBox(itemId, newBoxId) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _form.loadRow(rowBox, { BoxId: newBoxId });
    }

    //on show right menu
    fnShowMenu(e, item) {
        //set instance variables
        this.nowItem = item;
        this.nowItemId = this.uiView.getItemId(item);
        this.nowItemType = this.uiView.getItemType(item);

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

    fnAddItem(itemType) {
        switch (itemType) {
            case EstrItemType.Input:
                return this._addInput();
            case EstrItemType.Group:
                return this._addGroup();
            case EstrItemType.Row:
                return this._addRow();
            case EstrItemType.Table:
                return this._addTable();
            case EstrItemType.TabPage:
                return this._addTabPage();
        }
    }
    //#endregion

    //#region Read.cshtml -> uiView
    //drag by button
    startDragBtn(status, itemType) {
        this.uiView.startDragBtn(status, itemType);
    }

    async onDragEnd(e) {
        await this.uiView.onDragEnd(e);
    }

    //#endregion

    //#region 功能按鈕相關
    //return row
    _mItemAddRow(itemType, infoJson) {
        //配合後端DB, 欄位使用大camel
        let itemJson = {
            BoxId: '0',
            ItemType: itemType,
            Info: (infoJson == null) ? '' : _json.toStr(infoJson),
        };
        return this.mItem.addRow(itemJson);  //會產生id
    }

    _addInput() {
        //使用畫面上的設定ColsType
        //set info json first
        this.newInputNo++;
        let infoJson = {
            //Id: row.Id,
            InputType: EstrInputType.Text,
            Fid: '_fid' + this.newInputNo,		//前面加底線for註記為需要調整
            Title: '欄位' + this.newInputNo,
            Required: true,
            Cols: _iselect.get('ColsType', _me.eform0),
            //TitleTip: 'label tip 測試',
            //InputNote: 'input note 測試',
        };

        //add to mItem, 會產生id
        return this._mItemAddRow(EstrItemType.Input, infoJson);

        //add to UI
        //await this.uiView.addInputA(row.Id, infoJson);
    }
    _addGroup() {
        let infoJson = {
            Title: '分群文字',
        };

        //add to mItem
        return this._mItemAddRow(EstrItemType.Group, infoJson);

        //add to UI
        //await this.uiView.addGroupA(row.Id, infoJson);
    }
    _addRow() {
        //使用畫面上的設定RowType
        let infoJson = {
            RowType: _iselect.get('RowType', _me.eform0),
        };

        //add to mItem
        return this._mItemAddRow(EstrItemType.Row, infoJson);

        //add to UI
        //this.uiView.addRow(row.Id);
    }
    _addTable() {
        //add to mItem
        let infoJson = {
            Table: '_table',
            Title: '資料名稱',
            Heads: '欄位1,欄位2,欄位3,欄位4,欄位5',
        };
        return this._mItemAddRow(EstrItemType.Table, infoJson);

        //add to UI
        //this.uiView.addTable(row.Id, infoJson);
    }

    //todo
    _addTabPage() {
    }
    //#endregion

    //#region menu 事件相關
    _deleteItem() {
        //todo: 考慮有子item的情形
        this.mLine.deleteRow(this.nowItemId);
        this.uiView.deleteItem(this.nowItem);
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

        let modal;
        switch (this.nowItemType) {
            case EstrItemType.Input:
                modal = this.ModalInput;
                break;
            case EstrItemType.Group:
                modal = this.ModalGroup;
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

        //load info to modal
        var rowBox = this.mItem.idToRowBox(this.nowItemId);
        var row = _str.toJson(_itext.get('Info', rowBox));
        _form.loadRow(modal, row);

        //show modal
        _modal.showO(modal);

    }

    onMenuDelete() {
        if (!this._menuStatus())
            return;

        //刪除box時顯示確認框
        if (this.uiView.isBox(this.nowItemType)) {
            _tool.ans('是否確定刪除這個容器?', function () {
                this._deleteItem();
            });
        } else {
            this._deleteItem();
        }
    }

    onMenuView() {
        //todo
    }
    //#endregion

    //#region modal 相關
    //onclick modal ok
    async onModalOk() {
        //check input
        let modal;
        switch (this.nowItemType) {
            case EstrItemType.Input:
                modal = this.ModalInput;
                break;
            case EstrItemType.Group:
                modal = this.ModalGroup;
                break;
            case EstrItemType.Table:
                modal = this.ModalTable;
                break;
            case EstrItemType.TabPage:
                modal = this.ModalTabPage;
                break;
        }

        //update ui first, Table必須先判斷, 所以傳入函數
        var me = this;
        //ModalTable/ModalTabPage 時回傳ids(要刪除的id字串陣列, 不為null)
        let infoJson = _form.toRow(modal);    //直接讀取modal內欄位, 內容為 Info 欄位
        await this.uiView.rowToItemA(infoJson, this.nowItem, function (ids) {
            if (me.nowItemType == EstrItemType.Table && ids.length > 0) {
                //刪除多筆
                //alert(`ids=${ids}`);
                for (let i = 0; i < ids.length; i++) {
                    me.mItem.deleteRow(ids[i], me.mItem.idToRowBox(ids[i]));
                }
            }

            //成功後 update mItem 裡面的 Info 欄位 only
            let rowBox = me.mItem.idToRowBox(me.nowItemId);
            _form.loadRow(rowBox, { Info: _json.toStr(infoJson) });

            //hide modal
            _modal.hideO(modal);
        });
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

    /**
     * load nodes into UI
     * param rows {json} 後端傳回的完整json
     */
    loadItems(rows) {
        //EditMany load rows by rowsBox
        this.mItem.loadRowsByRsb(rows, true);

        //ui loadItems
        this.uiView.loadItems(rows);
    }

    //??
    addItem(json) {
        //add mLine

        this.uiView.addItem(json);
    }
    //#endregion

}//class