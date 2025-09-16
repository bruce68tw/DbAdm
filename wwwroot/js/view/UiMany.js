/**
 * 控制 EditMany, 參考 FlowMany.js
 * 處理 UI 元素和多筆資料之間的轉換
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * param ftWorkArea {string} filter of work area
 * return {UiMany}
 */ 
class UiMany {

    constructor(mItem, ftBox, ftWorkArea) {
        //欄位id, title, 後端傳回後再取代
        //this.Fid = '_fid_';
        //this.Title = '_title_';
        //this.FtMenu = '.xf-menu';   //right menu filter
        //this.Cols = '2,3';

        //是否可編輯
        this.isEdit = false;

        //this.nowItem = null;
        
        //html filter/class

        //#endregion

        //#region variables
        //editMany
        this.mItem = mItem;
        //this.mCol = mCol;

        //this.newItemNo = 0;
        //this.newColNo = 0;

        this.eformItems = $('#eformItems');           //nodes edit form for editMany
        //this.modalInputProp = $('#modalInputProp');
        //this.eformInputProp = this.modalInputProp.find('form');   //modalNodeProp form

        //node/line template        
        this.tplItem = $('#tplItem').html();

        //now container for add item
        this.divEdit = $(ftBox);
        //this.workArea = this.divEdit.find(ftWorkArea);

        //this.nowBox = this.workArea;
        //this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        //set instance first
        var uiView = new UiView(ftWorkArea);
        //uiView.fnMoveItem = (node, x, y) => this.fnMoveItem(node, x, y);
        //uiView.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        //uiView.fnShowMenu = (event, item) => this.fnShowMenu(event, item);
        this.uiView = uiView;
        //#endregion

        //set event
        //this._setEvent();
        //hide context menu

    }

    /*
    fnMoveItem(node, x, y) {
        var rowBox = this.mItem.idToRowBox(node.getId());
        _form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });    //座標取整數
    }
    */

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
    _setEvent() {
        //hide context menu
        var me = this;
        $(document).on(EstrMouse.MouseDown, function (e) {
            //右鍵是3，左鍵是1，中鍵是2, 不處理右鍵，避免提前 hide
            if (e.which != 3) {
                var filter = me.FtMenu;
                if ($(e.target).parents(filter).length == 0)
                    _obj.hide($(filter));
            }
        });
    }
     */

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

    /*
    //編輯畫面讀取的是 condStr, flowLine顯示的是 label
    //get line condition string
    _getCondStr() {
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
    }
    */

}//class