import EstrMouse from "./EstrMouse";
import EstrNodeType from "./EstrNodeType";
import FlowView from "./FlowView";
import _Form from "./_Form";
import _ISelect from "./_ISelect";
import _IText from "./_IText";
import _Modal from "./_Modal";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Tool from "./_Tool";
/**
 * FlowForm -> FlowMany
 * 處理 flow UI 元素和多筆資料(mNode, mLine)之間的轉換
 * workflow component
 * param areaId {string} editor work area id
 * param mNode {EditMany}
 * param mLine {EditMany}
 */
export default class FlowMany {
    //#endregion
    constructor(areaId, mNode, mLine) {
        //#region constant
        //and/or seperator for line condition
        //js only replace first found, so use regular, value is same to code.type=AndOr
        this.OrSep = '{O}';
        this.AndSep = '{A}';
        this.ColSep = ',';
        //html filter/class
        //this.NodeFilter = '.xf-node';     //for find node object
        this.FtMenu = '.xf-menu'; //menu for node/line property
        //this.EpFilter = '.xf-ep';         //??node end point
        this.FtStartNode = '.xf-start'; //start node class
        //this.EndNodeCls = 'xf-end';       //??end node class
        //this.AutoNodeCls = 'xf-auto-node';      //auto node class
        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 }; //??initial
        //this.OkLineCfg = { stroke: 'green', strokeWidth: 2 };   //??ok
        //this.DenyLineCfg = { stroke: 'red', strokeWidth: 2 };   //??deny(reject)
        //#endregion
        //是否可編輯
        this.isEdit = false;
        //now selected type & element
        this.nowIsNode = false; //true:node, false:line
        this.nowFlowItem = null; //now selected FlowNode/FlowLine
        this.condOpExprs = []; //condition op regular expression
        this.condOpShows = []; //condition op show text
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        //for FlowLine, 對應 XpCode.Type=LineOp, 數對內容為:儲存值/顯示文字(label)
        const condOpMaps = [
            this.OrSep, ') || (', //or, 會自動加上外括號
            this.AndSep, ' && ', //and
            ',EQ,', '=',
            ',NEQ,', '!=',
            ',GT,', '>',
            ',GE,', '>=',
            ',ST,', '<',
            ',SE,', '<=',
        ];
        this.mNode = mNode;
        this.mLine = mLine;
        // JQuery 選擇器初始化
        this.divLinesBox = $('#divLinesBox');
        this.eformNodes = $('#eformNodes');
        this.eformLines = $('#eformLines');
        this.modalNodeProp = $('#modalNodeProp');
        this.modalLineProp = $('#modalLineProp');
        this.eformNodeProp = this.modalNodeProp.find('form');
        this.tbodyLineCond = this.modalLineProp.find('tbody');
        // template 初始化
        this.tplNode = $('#tplNode').html();
        this.tplLine = $('#tplLine').html();
        this.tplLineCond = $('#tplLineCond').html();
        let j = 0;
        for (let i = 0; i < condOpMaps.length; i = i + 2) {
            this.condOpExprs[j] = new RegExp(condOpMaps[i], 'g'); //for find/replace
            this.condOpShows[j] = condOpMaps[i + 1];
            j++;
        }
        //set instance first
        const flowView = new FlowView(areaId);
        flowView.fnMoveNode = (node, x, y) => this.fnMoveNode(node, x, y);
        flowView.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        flowView.fnShowMenu = (event, isNode, flowItem) => this.fnShowMenu(event, isNode, flowItem);
        this.flowView = flowView;
        //set event
        this._setFlowEvent();
    }
    fnMoveNode(node, x, y) {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) }); //座標取整數
    }
    fnAfterAddLine(json) {
        this.mLine.addRow(json, null, json.Id); //不產生新Id, FlowLine已經產生
    }
    /**
     * on show right menu
     * param event {JQuery.ContextMenuEvent}
     * param isNode {boolean}
     * param flowItem {FlowNode/FlowLine}
     */
    fnShowMenu(event, isNode, flowItem) {
        //set instance variables
        this.nowIsNode = isNode;
        this.nowFlowItem = flowItem;
        //一般節點才需要設定屬性
        const canEdit = isNode
            ? (this.isEdit && flowItem.getNodeType() == EstrNodeType.Node)
            : this.isEdit;
        //html 不會自動處理自製功能表狀態, 自行配合 css style
        const css = 'off';
        const menu = $(this.FtMenu);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        }
        else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }
        // Show contextmenu
        menu.finish()
            .toggle(100)
            .css({
            position: 'fixed', //使用 fixed 定位
            left: event.clientX + 'px',
            top: event.clientY + 'px',
        });
    }
    //清除UI & flow元件
    reset() {
        this.flowView.reset();
    }
    //set editable or not
    setEdit(status) {
        this.isEdit = status;
        this.flowView.setEdit(status);
    }
    /**
     * set flow events:
     * 1.line right click to show context menu
     * 2.mouse down to hide context menu
     */
    _setFlowEvent() {
        //hide context menu
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        const me = this;
        $(document).on(EstrMouse.MouseDown, function (e) {
            //if (_obj.isShow(me.popupMenu))
            //    me.popupMenu.hide(100);
            //"this" is not work here !!
            const filter = me.FtMenu;
            if (!$(e.target).parents(filter).length > 0)
                _Obj.hide($(filter));
        });
    }
    /**
     * load nodes into UI
     * param rows {any[]} 後端傳回的完整json
     */
    loadNodes(rows) {
        //EditMany load rows by rowsBox
        this.mNode.loadRowsByRsb(rows, true);
        //flow loadNodes
        this.flowView.loadNodes(rows);
    }
    /**
     * load nodes into UI(hide)
     * param rows {any[]} line rows
     */
    loadLines(rows) {
        this.mLine.loadRowsByRsb(rows, true);
        //set label
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].Label = this._condStrToLabel(rows[i].CondStr);
            }
        }
        this.flowView.loadLines(rows);
    }
    //#region node function
    /**
     * add new node
     * param nodeType {string}
     * param name {string} only for normalType node
     */
    addNode(nodeType, name) {
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        let nodeName = '';
        if (nodeType == EstrNodeType.Start) {
            nodeName = 'S';
        }
        else if (nodeType == EstrNodeType.End) {
            nodeName = 'E';
        }
        else {
            nodeName = '節點-' + this.flowView.getNewNodeId();
        }
        //mNode新筆一筆資料, 會產生新id
        const json = {
            Name: nodeName,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };
        const row = this.mNode.addRow(json); //會產生id
        //row.Name += "-" + row.Id;
        //flow add node
        this.flowView.addNode(row);
    }
    /**
     * node id to node object
    _idToNode(id) {
        return this.divFlowBox.find('.xf-node [value=' + id + ']').closest('.xf-node');
    }
     */
    //... 註解掉的內部方法，不需轉換
    deleteNode(node) {
        //delete mNode
        this.mNode.deleteRow(node.getId());
        //delete mLine
        node.getLines().forEach(line => {
            this.mLine.deleteRow(line.getId());
        });
        //delete flowNode(自動刪除相關流程線) 
        this.flowView.deleteNode();
    }
    //#endregion (node function)
    //#region line function
    //... 註解掉的內部方法，不需轉換
    //delete line without warning msg
    deleteLine(line) {
        //delete mLine
        this.mLine.deleteRow(line.getId());
        //delete flowLine
        this.flowView.deleteLine(line);
    }
    //... 註解掉的內部方法，不需轉換
    //#endregion (line function)
    //將Db的條件內容轉換為顯示內容
    _condStrToLabel(str) {
        if (_Str.isEmpty(str))
            return '';
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        let hasOr = str.indexOf(this.OrSep) > 0; //先判斷
        for (let i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    }
    //convert condStr to List<Cond> for 顯示編輯畫面
    _condStrToList(str) {
        if (_Str.isEmpty(str))
            return null;
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        const orList = str.split(this.OrSep);
        const orLen = orList.length;
        const hasOr = (orLen > 1);
        const result = [];
        let ary = 0;
        for (let i = 0; i < orLen; i++) {
            const andList = orList[i].split(this.AndSep);
            for (let j = 0; j < andList.length; j++) {
                const cols = andList[j].split(this.ColSep);
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
    }
    //編輯畫面讀取的是 condStr, flowLine顯示的是 label
    //get line condition string
    _getCondStr() {
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        const me = this;
        let condStr = '';
        this.tbodyLineCond.find('tr').each(function (idx) {
            const tr = $(this);
            const str = (idx == 0 ? '' : _ISelect.get('AndOr', tr)) +
                _IText.get('Fid', tr) + me.ColSep +
                _ISelect.get('Op', tr) + me.ColSep +
                _IText.get('Value', tr);
            condStr += str;
        });
        return condStr;
    }
    showNodeProp(node) {
        //var node = this._elmToNode(this.nowFlowItem);
        //var row = this._boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        //var id = node.getId();
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(this.modalNodeProp, _Form.toRow(rowBox));
        //show modal
        _Modal.showO(this.modalNodeProp); //.modal('show');
    }
    //param line {FlowLine} flow line 
    showLineProp(line) {
        //debugger;
        //var line = conn.getParameters();   //line model
        //var line = this._connToLine(conn);
        //var lineType = line.LineType;
        const rowBox = this.mLine.idToRowBox(line.getId());
        //show fields
        //_iradio.set('LineType', lineType, form);
        //this.onChangeLineType(lineType); //switch input
        const form = this.modalLineProp.find('form');
        // 假設 _IRead 是類似 _IText 的輸入控制項
        // 如果沒有 _IRead，則假設它是 _IText 的一個唯讀版本，這裡使用 _IText
        _IText.set('FromNodeName', line.fromNode.getName(), form);
        _IText.set('ToNodeName', line.toNode.getName(), form);
        _ISelect.set('FromType', line.getFromType(), form);
        _IText.set('Sort', _IText.get('Sort', rowBox), form);
        //show modal
        _Modal.showO(this.modalLineProp);
        //if (!this.isLineCondMode(lineType))
        //    line.CondStr = '';
        //load line conditions rows
        this.tbodyLineCond.empty();
        const condStr = _IText.get('CondStr', rowBox);
        const condList = this._condStrToList(condStr);
        if (condList != null) {
            for (let i = 0; i < condList.length; i++) {
                //var newCond = $(this.tplLineCond); // 原始 js 少了 mustache render
                //這裡修正為使用 Mustache.render
                const newCond = $(Mustache.render(this.tplLineCond, condList[i]));
                _Form.loadRow(newCond, condList[i]);
                this.tbodyLineCond.append(newCond);
            }
        }
    }
    //... 註解掉的內部方法，不需轉換
    onAddNode(nodeType) {
        if (nodeType == EstrNodeType.Start && this.flowView.hasStartNode()) {
            _Tool.msg('起始節點已經存在，不可再新增。');
            return;
        }
        //add node
        this.addNode(nodeType);
    }
    //#region events
    //... 註解掉的內部方法，不需轉換
    _menuStatus(me) {
        return !me.classList.contains('off');
    }
    //context menu event
    onMenuEdit(me) {
        if (!this._menuStatus(me))
            return;
        //由於 nowFlowItem 被定義為 FlowNode | FlowLine | null，這裡需要斷言
        if (this.nowIsNode)
            this.showNodeProp(this.nowFlowItem);
        else
            this.showLineProp(this.nowFlowItem);
    }
    onMenuDelete(me) {
        if (!this._menuStatus(me))
            return;
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        const instance = this; // 將 this 賦值給 instance
        if (instance.nowIsNode) {
            _Tool.ans('是否確定刪除這個節點和流程線?', function () {
                // 回呼函式中 this 會改變，使用 instance 
                instance.deleteNode(instance.nowFlowItem);
            });
        }
        else {
            _Tool.ans('是否確定刪除這一條流程線?', function () {
                // 回呼函式中 this 會改變，使用 instance
                instance.deleteLine(instance.nowFlowItem);
            });
        }
    }
    onMenuView(me) {
        //todo
    }
    //onclick add line condition
    onAddLineCond() {
        //變數宣告 var 改用 let, const (這裡針對區域變數)
        const row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        const cond = $(Mustache.render(this.tplLineCond, row));
        _Form.loadRow(cond, row); //row objec to UI
        this.tbodyLineCond.append(cond);
    }
    onDeleteLineCond(btn) {
        $(btn).closest('tr').remove();
    }
    //node prop onclick ok
    onModalNodeOk() {
        //check input
        //set new value
        const row = _Form.toRow(this.eformNodeProp);
        //update node display name
        const node = this.nowFlowItem; // 斷言為 FlowNode
        const rowBox = this.mNode.idToRowBox(node.getId());
        const oldName = _IText.get('Name', rowBox); //get before loadRow()
        _Form.loadRow(rowBox, row);
        if (oldName != row.Name)
            node.setName(row.Name, true);
        //hide modal
        _Modal.hideO(this.modalNodeProp);
        //... 註解掉的程式碼
    }
    //line prop click ok
    onModalLineOk() {
        //check input
        //var form = this.modalLineProp;
        //update mLine
        const modal = this.modalLineProp;
        const row = {
            CondStr: this._getCondStr(),
            Sort: _IText.get('Sort', modal),
            FromType: _ISelect.get('FromType', modal),
        };
        const line = this.nowFlowItem; // 斷言為 FlowLine
        const rowBox = this.mLine.idToRowBox(line.getId());
        _Form.loadRow(rowBox, row);
        //update flowLine
        line.setLabel(this._condStrToLabel(row.CondStr));
        line.setFromType(row.FromType);
        //hide modal
        _Modal.hideO(modal);
    }
}
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/FlowMany.js.map