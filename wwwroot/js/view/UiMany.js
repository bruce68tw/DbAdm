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
        //欄位id, title, 後端傳回後再取代
        //this.Fid = '_fid_';
        //this.Title = '_title_';
        //this.Cols = '2,3';

        this.FtMenu = '.xf-menu';   //right menu filter
        this.ModalInputProp = $('#modalInputProp');
        this.EformInputProp = this.ModalInputProp.find('form');   //modalNodeProp form

        //是否可編輯
        this.isEdit = false;

        //開啟modal時記錄
        this.nowItem = null;
        //this.nowItemType = '';
        this.nowInputType = '';

        //html filter/class

        //#endregion

        //#region variables
        //editMany
        this.mItem = mItem;
        //this.mCol = mCol;

        this.newInputNo = 0;    //for fid、title, 累加, 不會當做主key
        //this.newColNo = 0;

        this.eformItems = $('#eformItems');           //nodes edit form for editMany
        //this.modalInputProp = $('#modalInputProp');
        //this.eformInputProp = this.modalInputProp.find('form');   //modalNodeProp form

        //node/line template        
        this.tplItem = $('#tplItem').html();

        //now container for add item
        //this.divEdit = $(ftBox);
        //this.workArea = this.divEdit.find(ftWorkArea);

        //this.nowBox = this.workArea;
        //this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        //set instance first
        let uiView = new UiView(ftWorkArea);
        uiView.fnMoveBox = (itemId, newBoxId) => this.fnMoveBox(itemId, newBoxId);
        //uiView.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        uiView.fnShowMenu = (event, item) => this.fnShowMenu(event, item);
        this.uiView = uiView;
        //#endregion

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

    fnMoveBox(itemId, newBoxId) {
        let rowBox = this.mItem.idToRowBox(itemId);
        _form.loadRow(rowBox, { BoxId: newBoxId });
    }

    //清除UI & flow元件
    reset() {
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
		
		//flow loadItems
        this.uiView.loadItems(rows);
    }

    //#region node function
    addItem(json) {
        this.uiView.addItem(json);
    }

    deleteItem(json) {
        this.uiView.deleteItem(json);
    }
    //#endregion (node function)


    //delete line without warning msg
    deleteLine(line) {
        //delete mLine
        this.mLine.deleteRow(line.getId());

        //delete flowLine
        this.uiView.deleteLine(line);
    }
    //#endregion (line function)

    /**
     * on show right menu
     * param isNode {bool} 
     * param item {object} 
     */
    fnShowMenu(e, item) {
        //set instance variables
        //this.nowIsNode = isNode;
        //this.nowFlowItem = flowItem;

        //set instance variables
        this.nowItem = item;
        //this.nowItemType = itemType;

        //一般節點才需要設定屬性
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

    //region events
    //check menu item status
    _menuStatus(me) {
        return !me.classList.contains('off');
    }

    //context menu event
    onMenuEdit() {
        if (!this._menuStatus(_fun.getMe()))
            return;

        //let itemType = this._getItemType(this.nowItem);
        switch (this._getItemType()) {
            case EstrItemType.Input:
                this._showInputProp();
                break;
            //todo
        }
    }

    //??
    onMenuDelete(me) {
        if (!this._menuStatus(_fun.getMe()))
            return;

        if (me.nowIsNode) {
            _tool.ans('是否確定刪除這個節點和流程線?', function () {
                me.deleteItem(me.nowFlowItem);
            });
        } else {
            _tool.ans('是否確定刪除這一條流程線?', function () {
                me.deleteLine(me.nowFlowItem);
            });
        }
    }

    onMenuView(me) {
        //todo
    }

    //從uiView取比較方便
    //param item 如果空值表示 this.nowItem
    _getItemId(item) {
        return this.uiView.getItemId(item || this.nowItem);
    }
    _getItemType(item) {
        return this.uiView.getItemType(item || this.nowItem);
    }

    _showInputProp() {
        //load info to modal
        let form = this.ModalInputProp;
        var rowBox = this.mItem.idToRowBox(this._getItemId());
        var row = _str.toJson(_itext.get('Info', rowBox));
        _form.loadRow(form, row);

        //show
        _modal.showO(form);
    }

    async onAddInput() {
        //set info json first
        this.newInputNo++;
        let infoJson = {
            //Id: row.Id,
            InputType: EstrInputType.Text,
            Fid: '_fid' + this.newInputNo,		//前面加底線for註記為需要調整
            Title: '欄位' + this.newInputNo,
            Required: true,
            Cols: this.uiView.Cols,
            LabelTip: 'label tip 測試',
            InputNote: 'input note 測試',
        };

        //add to mItem
        //配合後端DB, 欄位使用大camel
        let itemJson = {
            BoxId: '0',
            ItemType: EstrItemType.Input,
            Info: _json.toStr(infoJson),
        };
        let row = this.mItem.addRow(itemJson);  //會產生id

        //add to UI
        await this.uiView.addInputA(row.Id, infoJson);
    }
    async onAddGroup() {
        //add to mItem
        let json = {
            BoxId: '0',
            ItemType: EstrItemType.Group,
            Info: '欄位群組',
        };
        let row = this.mItem.addRow(json);  //會產生id

        //add to UI
        await this.uiView.addGroupA(row.Id, json.Info);
    }
    onAddRow() {
        //add to mItem
        let json = {
            BoxId: '0',
            ItemType: EstrItemType.Row,
        };
        let row = this.mItem.addRow(json);  //會產生id

        //add to UI
        this.uiView.addRow(row.Id);
    }
    onAddTable() {
        //add to mItem
        let json = {
            BoxId: '0',
            ItemType: EstrItemType.Table,
        };
        let row = this.mItem.addRow(json);  //會產生id

        //add to UI
        this.uiView.addTable(row.Id);
    }

    //node prop onclick ok
    async onModalInputOk() {
        //check input

        //update mItem
        let json = _form.toRow(this.EformInputProp);
        let rowBox = this.mItem.idToRowBox(this._getItemId());
        _form.loadRow(rowBox, json);

        //update ui
        await this.uiView.updateInputA(this.nowItem, json);

        //hide modal
        _modal.hideO(this.ModalInputProp);
    }

}//class