/**
 * 控制 EditMany, 參考 FlowMany.js
 * 處理 UI 元素和多筆資料之間的轉換
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * param ftWorkArea {string} filter of work area
 * return {UiMany}
 */ 
function UiMany(boxId, ftWorkArea, mItem, mCol) {

    //欄位id, title, 後端傳回後再取代
    this.Fid = '_fid_';
    this.Title = '_title_';
    this.Cols = '2,3';

    //是否可編輯
    this.isEdit = false;

    /**
     * initial flow
     */ 
    this._init = function () {
        //#region constant

        //html filter/class
        this.MenuFilter = '.xf-menu';   //menu for node/line property

        //#endregion

        //#region variables
        //editMany
        this.mItem = mItem;
        this.mCol = mCol;

        this.newColNo = 0;

        this.eformItems = $('#eformItems');           //nodes edit form for editMany
        this.modalItemProp = $('#modalItemProp');
        this.eformItemProp = this.modalItemProp.find('form');   //modalNodeProp form

        //node/line template        
        this.tplItem = $('#tplItem').html();

        //now container for add item
        this.divEdit = $('#' + boxId);
        this.workArea = this.divEdit.find(ftWorkArea);
        //this.nowBox = this.workArea;
        //this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        //set instance first
        var uiView = new UiView(boxId);
        uiView.fnMoveItem = (node, x, y) => this.fnMoveItem(node, x, y);
        uiView.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        uiView.fnShowMenu = (event, isNode, flowItem) => this.fnShowMenu(event, isNode, flowItem);
        this.uiView = uiView;
        //#endregion

        //set event
        this._setFlowEvent();
    };

    this.fnMoveItem = function (node, x, y) {
        var rowBox = this.mItem.idToRowBox(node.getId());
        _form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });    //座標取整數
    };

    /**
     * on show right menu
     * param isNode {bool} 
     * param elm {FlowNode/FlowLine} 
     * param mouseX {int} 
     * param mouseY {int} 
     */
    this.fnShowMenu = function (event, isNode, flowItem) {
        //set instance variables
        this.nowIsNode = isNode;
        this.nowFlowItem = flowItem;

        //一般節點才需要設定屬性
        var canEdit = isNode
            ? (this.isEdit && flowItem.getNodeType() == EstrNodeType.Node)
            : this.isEdit;

        //html 不會自動處理自製功能表狀態, 自行配合 css style
        var css = 'off';
        var menu = $(this.MenuFilter);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        } else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }

        // Show contextmenu
        menu.finish()
            .toggle(100)
            .css({
                position: 'fixed',  //使用 fixed 定位
                left: event.clientX + 'px',
                top: event.clientY + 'px',
            });
    };

    //清除UI & flow元件
    this.reset = function () {
        this.uiView.reset();
    };

	//set editable or not
    this.setEdit = function (status) {
        this.isEdit = status;
        this.uiView.setEdit(status);
    };

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    this._setFlowEvent = function () {

        //hide context menu
        var me = this;
        $(document).on('mousedown', function (e) {
            //if (_obj.isShow(me.popupMenu))
            //    me.popupMenu.hide(100);
            
            //"this" not work here !!
            var filter = me.MenuFilter;
            if (!$(e.target).parents(filter).length > 0)
                _obj.hide($(filter));            
        });
    };

    /**
     * load nodes into UI
     * param rows {json} 後端傳回的完整json
     */
    this.loadItems = function (rows) {
        //EditMany load rows by rowsBox
        this.mItem.loadRowsByRsb(rows, true);
		
		//flow loadItems
        this.uiView.loadItems(rows);
    };

    //#region node function
    this.addItem = function (json) {
        this.uiView.addItem(json);
    };

    this.deleteItem = function (json) {
        this.uiView.deleteItem(json);
    };
    //#endregion (node function)


    //delete line without warning msg
    this.deleteLine = function (line) {
        //delete mLine
        this.mLine.deleteRow(line.getId());

        //delete flowLine
        this.uiView.deleteLine(line);
    };
    //#endregion (line function)

    //編輯畫面讀取的是 condStr, flowLine顯示的是 label
    //get line condition string
    this._getCondStr = function () {
        var me = this;
        var condStr = '';
        this.tbodyLineCond.find('tr').each(function (idx) {
            var tr = $(this);
            var str = (idx == 0 ? '' : _iselect.get('AndOr', tr)) +
                _itext.get('Fid', tr) + me.ColSep +
                _iselect.get('Op', tr) + me.ColSep +
                _itext.get('Value', tr);
            condStr += str;
        });
        return condStr;
    };

    this.showItemProp = function (node) {
        //var node = this._elmToItem(this.nowFlowItem);
        //var row = this._boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        //var id = node.getId();
        var rowBox = this.mItem.idToRowBox(node.getId());
        _form.loadRow(this.modalItemProp, _form.toRow(rowBox));

        //show modal
        _modal.showO(this.modalItemProp);   //.modal('show');
    };

    //param line {FlowLine} flow line 
    this.onAddCol = async function () {
        //mItem新筆一筆資料, 會產生新id
        this.newColNo++;
        var code = 'field' + this.newColNo;
        var name = '欄位' + this.newColNo;
        var json = {
            ItemType: EstrUiType.Col,
            Required: false, 
            Info: `${code},${name}`,
            //Code: 'field' + this.newColNo,
            //Name: '欄位' + this.newColNo,
        };
        var row = this.mItem.addRow(json);  //會產生id
        row.Fid = code;
        row.Title = name;
        //row.Name += "-" + row.Id;

        await this.uiView.addCol(EstrInputType.Text, row);
    };
    this.onAddBox = function () {
        this.addItem(itemType);
    };
    this.onAddGroup = function () {
        this.addItem(itemType);
    };
    this.onAddTable = function () {
        this.addItem(itemType);
    };

    //#region events

    this._menuStatus = function (me) {
        return !me.classList.contains('off');
    }

    //context menu event
    this.onMenuEdit = function (me) {
        if (!this._menuStatus(me)) return;

        if (this.nowIsNode)
            this.showItemProp(this.nowFlowItem);
        else
            this.showLineProp(this.nowFlowItem);
    };

    this.onMenuDelete = function (me) {
        if (!this._menuStatus(me)) return;

        var me = this;
        if (me.nowIsNode) {
            _tool.ans('是否確定刪除這個節點和流程線?', function () {
                me.deleteItem(me.nowFlowItem);
            });
        } else {
            _tool.ans('是否確定刪除這一條流程線?', function () {
                me.deleteLine(me.nowFlowItem);
            });
        }
    };

    this.onMenuView = function (me) {
        //todo
    };

    //node prop onclick ok
    this.onModalItemOk = function () {
        //check input

        //set new value
        var row = _form.toRow(this.eformItemProp);

        //update node display name
        var node = this.nowFlowItem;
        var rowBox = this.mItem.idToRowBox(node.getId());
        var oldName = _itext.get('Name', rowBox);   //get before loadRow()
        _form.loadRow(rowBox, row);

        if (oldName != row.Name)
            node.setName(row.Name, true);

        //hide modal
        _modal.hideO(this.modalItemProp);
    };

	//call last
    this._init();

}//class