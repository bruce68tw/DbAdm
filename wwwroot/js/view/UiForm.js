/**
 * 參考 FlowForm.js
 * 處理 UI 元素和多筆資料之間的轉換
 * param boxId {string} edit canvas id
 * param mItem {EditMany}
 * return {UiForm}
 */ 
function UiForm(boxId, mItem) {

    //是否可編輯
    this.isEdit = false;

    /**
     * initial flow
     */ 
    this._init = function () {
        //#region constant
        //and/or seperator for line condition
        //js only replace first found, so use regular, value is same to code.type=AndOr
        this.OrSep = '{O}';  
        this.AndSep = '{A}';
        this.ColSep = ',';

        //html filter/class
        this.MenuFilter = '.xf-menu';   //menu for node/line property
        this.StartNodeFilter = '.xf-start';    //start node class

        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };  //??initial
        //#endregion

        //#region variables
        //editMany
        this.mItem = mItem;
        //this.mLine = mLine;

        //this.popupMenu = $('.xf-menu');
        //this.divFlowBox = $('#' + boxId);	//??
        //this.divLinesBox = $('#divLinesBox');       //??hidden
        this.eformItems = $('#eformItems');           //nodes edit form for editMany
        //this.eformLines = $('#eformLines');           //lines edit form for editMany
        this.modalItemProp = $('#modalItemProp');
        //this.modalLineProp = $('#modalLineProp');
        this.eformItemProp = this.modalItemProp.find('form');   //modalNodeProp form
        //this.tbodyLineCond = this.modalLineProp.find('tbody');  //modalLineProp tbody for line conds

        //node/line template        
        this.tplItem = $('#tplItem').html();
        //this.tplLine = $('#tplLine').html();
        //this.tplLineCond = $('#tplLineCond').html();

        //now selected type & element
        this.nowIsNode = false;     //true:node, false:line
        this.nowFlowItem = null;    //now selected FlowNode/FlowLine

        /*
        //for FlowLine, 對應 XpCode.Type=LineOp, 數對內容為:儲存值/顯示文字(label)
        var condOpMaps = [
            this.OrSep, ') || (',  	//or, 會自動加上外括號
            this.AndSep, ' && ',    //and
            ',EQ,', '=',
            ',NEQ,', '!=',
            ',GT,', '>',
            ',GE,', '>=',
            ',ST,', '<',
            ',SE,', '<=',
        ];
        this.condOpExprs = [];   //condition op regular expression
        this.condOpShows = [];   //condition op show text
        var j = 0;
        for (var i = 0; i < condOpMaps.length; i = i + 2) {
            this.condOpExprs[j] = new RegExp(condOpMaps[i], 'g');	//for find/replace
            this.condOpShows[j] = condOpMaps[i + 1];
            j++;
        }
        */

        //set instance first
        var uiBase = new UiBase(boxId);
        uiBase.fnMoveItem = (node, x, y) => this.fnMoveItem(node, x, y);
        uiBase.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        uiBase.fnShowMenu = (event, isNode, flowItem) => this.fnShowMenu(event, isNode, flowItem);
        this.uiBase = uiBase;
        //#endregion

        //set event
        this._setFlowEvent();
    };

    this.fnMoveItem = function (node, x, y) {
        var rowBox = this.mItem.idToRowBox(node.getId());
        _form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });    //座標取整數
    };

    /*
    this.fnAfterAddLine = function (json) {
        this.mLine.addRow(json, null, json.Id);   //不產生新Id, FlowLine已經產生
    };
    */

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
            ? (this.isEdit && flowItem.getNodeType() == _flow.TypeNode)
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
        this.uiBase.reset();
    };

	//set editable or not
    this.setEdit = function (status) {
        this.isEdit = status;
        this.uiBase.setEdit(status);
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
        this.uiBase.loadItems(rows);
    };

    //#region node function

    /**
     * add new node
     * param nodeType {string}
     * param name {string} only for normalType node
     */ 
    this.addItem = function (nodeType, name) {

        var name = '';
        if (nodeType == _flow.TypeStart) {
            name = 'S';
        } else if (nodeType == _flow.TypeEnd) {
            name = 'E';
        } else {
            name = '節點-' + this.uiBase.getNewItemId();
        }

        //mItem新筆一筆資料, 會產生新id
        var json = {
            Name: name,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };
        var row = this.mItem.addRow(json);  //會產生id
        //row.Name += "-" + row.Id;

		//flow add node
		this.uiBase.addItem(row);
    };

    this.deleteItem = function (node) {
        //delete mItem
        this.mItem.deleteRow(node.getId());

        //delete mLine
        node.getLines().forEach(line => {
            this.mLine.deleteRow(line.getId());
        });

        //delete  
        this.uiBase.deleteItem();
    };
    //#endregion (node function)


    //delete line without warning msg
    this.deleteLine = function (line) {
        //delete mLine
        this.mLine.deleteRow(line.getId());

        //delete flowLine
        this.uiBase.deleteLine(line);
    };
    //#endregion (line function)

    //將Db的條件內容轉換為顯示內容
    this._condStrToLabel = function (str) {
        if (_str.isEmpty(str))
            return '';

        var hasOr = str.indexOf(this.OrSep) > 0;    //先判斷
        for (var i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    };

    //convert condStr to List<Cond> for 顯示編輯畫面
    this._condStrToList = function (str) {
        if (_str.isEmpty(str))
            return null;

        var orList = str.split(this.OrSep);
        var orLen = orList.length;
        var hasOr = (orLen > 1);
        var result = [];
        var ary = 0;
        for (var i = 0; i < orLen; i++) {
            var andList = orList[i].split(this.AndSep);
            for (var j = 0; j < andList.length; j++) {
                var cols = andList[j].split(this.ColSep);
                result[ary] = {
                    //AndOr: hasOr ? 'O' : 'A',
                    AndOr: hasOr ? this.OrSep : this.AndSep,
                    Fid: cols[0],
                    Op: cols[1],
                    Value: cols[2],
                };
                ary++;
            }
        }
        return result;
    };

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
    this.showLineProp = function (line) {
        //debugger;
        //var line = conn.getParameters();   //line model
        //var line = this._connToLine(conn);
        //var lineType = line.LineType;

        var rowBox = this.mLine.idToRowBox(line.getId());
		
        //show fields
        //_iradio.set('LineType', lineType, form);
        //this.onChangeLineType(lineType); //switch input
        var form = this.modalLineProp.find('form');
        _iread.set('FromColName', line.fromCol.getName(), form);
        _iread.set('ToNodeName', line.toNode.getName(), form);
        _iselect.set('FromType', line.getFromType(), form);
        _itext.set('Sort', _itext.get('Sort', rowBox), form);

        //show modal
        _modal.showO(this.modalLineProp);

        //if (!this.isLineCondMode(lineType))
        //    line.CondStr = '';

        //load line conditions rows
        this.tbodyLineCond.empty();
        var condStr = _itext.get('CondStr', rowBox)
        var condList = this._condStrToList(condStr);
        if (condList != null) {
            for (var i = 0; i < condList.length; i++) {
                var newCond = $(this.tplLineCond);
                _form.loadRow(newCond, condList[i]);
                this.tbodyLineCond.append(newCond);
            }
        }
    };

    this.onAddCol = function () {
        this.addItem(itemType);
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

    //onclick add line condition
    this.onAddLineCond = function () {
        var row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        var cond = $(Mustache.render(this.tplLineCond, row));
        _form.loadRow(cond, row);        //row objec to UI
        this.tbodyLineCond.append(cond);
    };

    this.onDeleteLineCond = function (btn) {
        $(btn).closest('tr').remove();
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

    //line prop click ok
    this.onModalLineOk = function () {
        //check input
		//var form = this.modalLineProp;

        //update mLine
        var modal = this.modalLineProp;
        var row = {
            CondStr: this._getCondStr(),
            Sort: _itext.get('Sort', modal),
            FromType: _iselect.get('FromType', modal),
        };
        var line = this.nowFlowItem;
        var rowBox = this.mLine.idToRowBox(line.getId());
        _form.loadRow(rowBox, row);
		
		//update flowLine
        line.setLabel(this._condStrToLabel(row.CondStr));
        line.setFromType(row.FromType);
		
        //hide modal
        _modal.hideO(modal);
    };
    //#endregion (events)

	//call last
    this._init();

}//class