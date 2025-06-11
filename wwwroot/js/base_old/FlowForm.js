﻿/**
 * 處理 flow UI 元素和資料(mNode, mLine)之間的轉換
 * workflow component
 * param boxId {string} edit canvas id
 * param mNode {EditMany}
 * param mLine {EditMany}
 * return {FlowForm}
 */ 
function FlowForm(boxId, mNode, mLine) {

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
        //this.NodeFilter = '.xf-node';   //for find node object
        this.MenuFilter = '.xf-menu';   //menu for node/line property
        //this.EpFilter = '.xf-ep';       //??node end point
        this.StartNodeFilter = '.xf-start';    //start node class
        //this.EndNodeCls = 'xf-end';        //??end node class
        //this.AutoNodeCls = 'xf-auto-node';      //auto node class

        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };  //??initial
        //this.OkLineCfg = { stroke: 'green', strokeWidth: 2 };   //??ok
        //this.DenyLineCfg = { stroke: 'red', strokeWidth: 2 };   //??deny(reject)

        //#endregion

        //#region variables
        //editMany
        this.mNode = mNode;
        this.mLine = mLine;

        //this.popupMenu = $('.xf-menu');
        //this.divFlowBox = $('#' + boxId);	//??
        this.divLinesBox = $('#divLinesBox');       //??hidden
        this.eformNodes = $('#eformNodes');           //nodes edit form for editMany
        this.eformLines = $('#eformLines');           //lines edit form for editMany
        this.modalNodeProp = $('#modalNodeProp');
        this.modalLineProp = $('#modalLineProp');
        this.eformNodeProp = this.modalNodeProp.find('form');   //modalNodeProp form
        this.tbodyLineCond = this.modalLineProp.find('tbody');  //modalLineProp tbody for line conds

        //node/line template        
        this.tplNode = $('#tplNode').html();
        this.tplLine = $('#tplLine').html();
        this.tplLineCond = $('#tplLineCond').html();

        //now selected type & element
        this.nowIsNode = false;     //true:node, false:line
        this.nowFlowItem = null;    //now selected FlowNode/FlowLine

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

        //set instance first
        var flowBase = new FlowBase(boxId);
        flowBase.fnMoveNode = (node, x, y) => this.fnMoveNode(node, x, y);
        flowBase.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        flowBase.fnShowMenu = (event, isNode, flowItem) => this.fnShowMenu(event, isNode, flowItem);
        this.flowBase = flowBase;
        //#endregion

        //set event
        this._setFlowEvent();
    };

    this.fnMoveNode = function (node, x, y) {
        var rowBox = this.mNode.idToRowBox(node.getId());
        _form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });    //座標取整數
    };

    this.fnAfterAddLine = function (json) {
        this.mLine.addRow(json, null, json.Id);   //不產生新Id, FlowLine已經產生
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
        this.flowBase.reset();
    };

	//set editable or not
    this.setEdit = function (status) {
        this.isEdit = status;
        this.flowBase.setEdit(status);
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
            
            //"this" is not work here !!
            var filter = me.MenuFilter;
            if (!$(e.target).parents(filter).length > 0)
                $(filter).hide(100);
            
        });
    };

    /**
     * load nodes into UI
     * param rows {json} 後端傳回的完整json
     */
    this.loadNodes = function (rows) {
        //EditMany load rows by rowsBox
        this.mNode.loadRowsByRsb(rows, true);
		
		//flow loadNodes
        this.flowBase.loadNodes(rows);
    };

    /**
     * load nodes into UI(hide)
     * param rows {rows} line rows
     */
    this.loadLines = function (rows) {
        this.mLine.loadRowsByRsb(rows, true);

        //set label
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                rows[i].Label = this._condStrToLabel(rows[i].CondStr);
            }
        }
        this.flowBase.loadLines(rows);
    };

    //#region node function

    /**
     * add new node
     * param nodeType {string}
     * param name {string} only for normalType node
     */ 
    this.addNode = function (nodeType, name) {

        var name = '';
        if (nodeType == _flow.TypeStart) {
            name = 'S';
        } else if (nodeType == _flow.TypeEnd) {
            name = 'E';
        } else {
            name = '節點-' + this.flowBase.getNewNodeId();
        }

        //mNode新筆一筆資料, 會產生新id
        var json = {
            Name: name,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };
        var row = this.mNode.addRow(json);  //會產生id
        //row.Name += "-" + row.Id;

		//flow add node
		this.flowBase.addNode(row);
    };

    /**
     * node id to node object
    this._idToNode = function (id) {
        return this.divFlowBox.find('.xf-node [value=' + id + ']').closest('.xf-node');
    };
     */

    /**
     * inside element to node object
    this._elmToNode = function (elm) {
        return $(elm).closest(this.NodeFilter);
    };
    this._elmToNodeValue = function (elm, fid) {
        var node = this._elmToNode(elm);
        return this._boxGetValue(node, fid);
    };
     */

    /**
     * node get field value
     * param node {object} node object
     * param fid {string} field id
     * return {string}
    this._boxGetValue = function (node, fid) {
        return _itext.get(fid, node);
    };
     */

    /**
     * node get field values
     * param node {object} node object
     * param fids {strings} field id array
     * return {json}
    this._boxGetValues = function (node, fids) {
        var json = {};
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            json[fid] = _itext.get(fid, node);
        }
        return json;
    };
     */

    this.deleteNode = function (node) {
        //delete mNode
        this.mNode.deleteRow(node.getId());

        //delete mLine
        node.getLines().forEach(line => {
            this.mLine.deleteRow(line.getId());
        });

        //delete flowNode(自動刪除相關流程線) 
        this.flowBase.deleteNode();
    };
    //#endregion (node function)

    //#region line function
    /**
     * ?? add one line(connector)
     * param row {json} line row
     * return void
    this._renderLine = function (row) {

        //param 2(reference object) not work here !!
        var prop = this.getLineProp(row.CondStr);    //get line style & label
        //debugger;
        var conn = this.flowBase.connect({
            //type: 'basic',
            source: this._idToNode(row.StartNode),
            target: this._idToNode(row.EndNode),
            paintStyle: prop.style,
            //anchors: ["Right", "Left"],
        });

        //add custom attributes: whole line model(big camel), only this way workable !!
        //this.connSetParas(conn, row, isNew); 
        this._setLineKey(conn, row.Id);

        //set label
        this._setLineLabel(conn, prop.label);
    };
     */

    /**
     * add flow line into hide UI for crud
     * param row {json}
     * return {string} line key
    this.addLine = function (row) {
        var newLine = $(this.tplLine);      //create row object, no need mustache()
        _form.loadRow(newLine, row);        //row objec to UI
        var key = this.mLine.setNewIdByBox(newLine);   //set new key
        this.divLinesBox.append(newLine);   //append row object
        return key;
    };
     */

    /**
     * set connection key
    this._setLineKey = function (conn, key) {
        var row = {};
        row['Id'] = key;
        conn.setParameters(row);
    };

    //is line source node a condition mode(true) or yes/no type(false)
    this._isSourceCondMode = function (sourceType) {
        //return (sourceType == this.StartNode || sourceType == this.AutoNode);
        return (sourceType == this.StartNode);
    };
     */

    /** ??
     * get line property: style, label
     * return {json} 
    this.getLineProp = function (condStr) {
        return {
            //type: type,
            style: this.InitLineCfg,
            label: this._condStrToLabel(condStr),
        }
    };
     */

    /*
    this._getLineElmKey = function (conn) {
        return conn.getParameters()['Id'];
    };
    */

    /**
     * get object(node/line) key
     * param obj {object}
     * return {string} key value
    this._getObjKey = function (obj) {
        return _itext.get('Id', obj);
    };

    //set connection label
    this._setLineLabel = function (conn, label) {
        var obj = conn.getOverlay('label');
        obj.setVisible(_str.notEmpty(label));
        obj.setLabel(label);
        //conn.getOverlay('label').setLabel(label);
    };
     */

    /*
    //delete line with warning msg
    this.deleteLineWithMsg = function (conn) {
        _tool.ans('delete this line ?', function () {
            this.deleteLine(conn);
        });
    };
    */

    //delete line without warning msg
    this.deleteLine = function (line) {
        //delete mLine
        this.mLine.deleteRow(line.getId());

        //delete flowLine
        this.flowBase.deleteLine(line);
    };
    /*
    this.deleteLines = function (lines) {
        for (var i = 0; i < lines.length; i++) {
            this.deleteLine(lines[i]);
        }
    };
    */
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

    this.showNodeProp = function (node) {
        //var node = this._elmToNode(this.nowFlowItem);
        //var row = this._boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        //var id = node.getId();
        var rowBox = this.mNode.idToRowBox(node.getId());
        _form.loadRow(this.modalNodeProp, _form.toRow(rowBox));

        //show modal
        _modal.showO(this.modalNodeProp);   //.modal('show');
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
        _iread.set('FromNodeName', line.fromNode.getName(), form);
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

    /*
    //jsplumb connection to line object
    this._connToLine = function (conn) {
        return this._idToLine(this._getLineElmKey(conn));
    };

    //id to line object
    this._idToLine = function (id) {
        return this.divLinesBox.find('.xd-line [value=' + id + ']').closest('.xd-line');
    };

    this._idToLineBox = function (id) {
        return this.eformLines.find('.xd-line [value=' + id + ']').closest('.xd-line');
    };
    */

    this.onAddNode = function (nodeType) {
        if (nodeType == _flow.TypeStart && this.flowBase.hasStartNode()) {
            _tool.msg('起始節點已經存在，不可再新增。');
            return;
        }

        //add node
        this.addNode(nodeType);
    };

    //#region events
    /*
    //on add start node
    this.onAddStartNode = function () {
        //check, only one start node allow
        if (this.eformNodes.find(this.StartNodeFilter).length > 0) {
            //_tool.msg(this.R.StartNodeExist);
            _tool.msg('Start Node Already Existed !');
            return;
        }

        //add node
        this.addNode(_flow.TypeStart);
    };
    //on add end node
    this.onAddEndNode = function () {
        this.addNode(_flow.TypeEnd);
    };
    //on add normal node
    this.onAddNormalNode = function () {
        this.addNode(this.NormalNode, '節點');
    };
    this.onAddAutoNode = function () {
        this.addNode('Auto', this.AutoNode);
    };
    */

    this._menuStatus = function (me) {
        return !me.classList.contains('off');
    }

    //context menu event
    this.onMenuEdit = function (me) {
        if (!this._menuStatus(me)) return;

        if (this.nowIsNode)
            this.showNodeProp(this.nowFlowItem);
        else
            this.showLineProp(this.nowFlowItem);
    };

    this.onMenuDelete = function (me) {
        if (!this._menuStatus(me)) return;

        var me = this;
        if (me.nowIsNode) {
            _tool.ans('是否確定刪除這個節點和流程線?', function () {
                me.deleteNode(me.nowFlowItem);
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
    this.onModalNodeOk = function () {
        //check input

        //set new value
        var row = _form.toRow(this.eformNodeProp);

        //update node display name
        var node = this.nowFlowItem;
        var rowBox = this.mNode.idToRowBox(node.getId());
        var oldName = _itext.get('Name', rowBox);   //get before loadRow()
        _form.loadRow(rowBox, row);

        if (oldName != row.Name)
            node.setName(row.Name, true);

        //hide modal
        _modal.hideO(this.modalNodeProp);

        /*
        //update node form fields
        _itext.set('Name', row.Name, nodeObj);
        _itext.set('SignerType', row.SignerType, nodeObj);
        _itext.set('SignerValue', row.SignerValue, nodeObj);
        */

        //change node style, has xf-ep div at the end !!
        //var html = row.Name + '<div class="xf-ep" action="begin"></div>';
        //nodeObj.html(html);

        /*
        //reset auto node class
        if (row.NodeType == this.AutoNode)
            nodeObj.addClass(this.AutoNodeCls);
        else
            nodeObj.removeClass(this.AutoNodeCls);
        */
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