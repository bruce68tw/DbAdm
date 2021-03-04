/**
 * workflow component
 * param boxId {string} edit canvas id
 * param mNode {EditMany}
 * param mLine {EditMany}
 * return {Flow}
 */ 
function Flow(boxId, mNode, mLine) {

    /**
     * initial flow
     */ 
    this.init = function () {
        //#region constant
        //node types
        this.StartNode = 'S';
        this.EndNode = 'E';
        this.NormalNode = 'N';
        this.AutoNode = 'A';

        //and/or seperator for line condition
        //js only replace first found, so use regular, value is same to code.type=AndOr
        this.OrSep = '{O}';  
        this.AndSep = '{A}';
        this.ColSep = ',';

        //html filter/class
        this.NodeFilter = '.xf-node';   //for find node object
        this.MenuFilter = '.xf-menu';   //menu for node/line property
        this.EpFilter = '.xf-ep';       //node end point
        this.StartNodeCls = 'xf-start-node';    //start node class
        this.EndNodeCls = 'xf-end-node';        //end node class
        this.AutoNodeCls = 'xf-auto-node';      //auto node class

        //connection(line) style: start, agree, disagree
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };  //initial
        this.OkLineCfg = { stroke: 'green', strokeWidth: 2 };   //ok
        this.DenyLineCfg = { stroke: 'red', strokeWidth: 2 };   //deny(reject)

        //start node config
        this.StartNodeCfg = {
            filter: this.EpFilter,
            //anchor: 'Continuous',
            anchor: ['Bottom', 'Left', 'Right'],
            //outlineWidth not work !!
            connectorStyle: {
                stroke: '#5c96bc',
                strokeWidth: 2,
                outlineStroke: 'transparent',
                outlineWidth: 3,
            },
            connectionType: 'basic',
            extract: {
                'action': 'the-action'
            },
            maxConnections: 10,
            /*
            onMaxConnections: function (info, e) {
                alert('Maximum connections (' + info.maxConnections + ') reached');
            }
            */
        };

        //end node config
        this.EndNodeCfg = {
            dropOptions: { hoverClass: 'dragHover' },
            //anchor: 'Continuous',
            anchor: ['Top', 'Bottom', 'Left', 'Right'],
            allowLoopback: true,
        };
        //#endregion

        //#region variables
        //editMany
        this.mNode = mNode;
        this.mLine = mLine;

        //this.popupMenu = $('.xf-menu');
        this.divFlowBox = $('#' + boxId);
        this.divLinesBox = $('#divLinesBox');       //hidden
        this.divLineConds = $('#divLineConds');     //div line conds inside modalLineProp
        this.eformNode = $('#eformNode');           //node edit form
        this.eformLine = $('#eformLine');           //line edit form
        this.modalNodeProp = $('#modalNodeProp');
        this.modalLineProp = $('#modalLineProp');

        //node/line template        
        this.tplNode = $('#tplNode').html();
        this.tplLine = $('#tplLine').html();
        this.tplLineCond = $('#tplLineCond').html();

        //now selected type & element
        this.nowIsNode = false;     //true:node, false:line
        this.nowElm = null;         //node element or connection(line)
        //#endregion

        //this.condOpExprs/this.condOpShows
        //for show line label
        var condOpMaps = [
            this.OrSep, ') || (',  //or
            this.AndSep, ' && ',    //and
            ',eq,', '=',
            ',neq,', '!=',
            ',gt,', '>',
            ',ge,', '>=',
            ',st,', '<',
            ',se,', '<=',
        ];
        this.condOpExprs = [];   //condition op regular expression
        this.condOpShows = [];   //condition op show text
        var j = 0;
        for (var i = 0; i < condOpMaps.length; i = i + 2) {
            this.condOpExprs[j] = new RegExp(condOpMaps[i], 'g');
            this.condOpShows[j] = condOpMaps[i + 1];
            j++;
        }

        //get jsplumb instance
        var plumb = jsPlumb.getInstance({
            Container: boxId,
            //Connector: 'StateMachine',
            Connector: 'Flowchart',            
            Endpoint: ['Dot', { radius: 2 }],
            HoverPaintStyle: { stroke: '#1e8151', strokeWidth: 3 },
            ConnectionOverlays: [
                ['Arrow', {
                    location: 1,
                    id: 'arrow',
                    width: 8,
                    length: 10,
                    foldback: 0.8,
                }],
                ['Label', {
                    label: '',
                    id: 'label',
                    cssClass: 'xf-line-label',
                }]
            ],
        });

        //set one basic connection style 
        plumb.registerConnectionType('basic', {
            anchor: 'Continuous',
            connector: 'Flowchart',
            //connector: 'StateMachine',            
        });

        //set instance first
        this.plumb = plumb;

        //set event
        this.setFlowEvent();

        /*
        //set LineProp event
        //LineType radio
        this.modalLineProp.find('[name=LineType]').change(function () {
            this.onChangeLineType(this.value);
        });
        */

        //return plumb;
    };

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    this.setFlowEvent = function () {
        var plumb = this.plumb;
        var me = this;

        // bind a click listener to each connection; the connection is deleted. you could of course
        // just do this: jsPlumb.bind('click', jsPlumb.detach), but I wanted to make it clear what was
        // happening.
        //(定義)Notification a Connection was clicked.
        /*
        plumb.bind('click', function (c) {
            //this.showModalNode();
            this.modalNodeProp.modal('show');
        });
        */

        //line(connection) show context menu
        plumb.bind('contextmenu', function (elm, event) {
            //"this" not work here !!
            me.showPopupMenu(elm, event, false);
        });

        //event: before build connection
        //info: connection        
        //plumb.bind('connection', function (info) {
        plumb.bind('beforeDrop', function (info) {
            //if (this.loading)
            //    return true;

            //if connection existed, return false for stop 
            //info.source did not work here !!
            var conn = info.connection;
            if (plumb.getConnections({ source: conn.source, target: conn.target }).length > 0)
                return false;

            //get source node & type
            //var sourceType = me.elmToNodeRow(conn.source).NodeType;
            //var lineType = this.isSourceCondMode(sourceType) ? this.LineTypeCond : this.LineTypeYes;
            var prop = me.getLineProp('');

            //set conn style & label
            conn.setPaintStyle(prop.style);    //real connection
            me.setLineLabel(conn, prop.label);

            //add parameters(line model) into connection
            //debugger;
            var row = {
                StartNode: me.elmToNodeValue(conn.source, 'Id'),
                EndNode: me.elmToNodeValue(conn.target, 'Id'),
                //LineType: lineType,
                CondStr: '',
                Sort: 9,
            };
            me.setLineKey(conn, me.addLine(row));
            //this.connSetParas(conn, line, true);

            //alert('connect');
            return true;
        });

        /*
        // click listener for the enable/disable link in the source box (the blue one).
        plumb.on(this.NodeFilter, 'contextmenu', function (ev) {
            //this.nowIsNode = true;
            //this.nowElm = ev.target;
            this.wf._showPopupMenu('.xf-menu', ev);
        */

        /*
        // bind a double click listener to 'boxEl'; add new node when this occurs.
        jsPlumb.on(this.boxEl, 'dblclick', function (e) {
            this.newNode(e.offsetX, e.offsetY);
        });
        */

        //hide context menu (jsPlumb no mousedown event !!)
        $(document).bind('mousedown', function (e) {
            //if (_obj.isShow(me.popupMenu))
            //    me.popupMenu.hide(100);
            
            //"this" is not work here !!
            var filter = me.MenuFilter;
            if (!$(e.target).parents(filter).length > 0)
                $(filter).hide(100);
            
        });
    };

    /**
     * set node event & source/target property
     * param nodeObj {object} node object
     */ 
    this.setNodeEvent = function (nodeObj) {
        //set source & target property
        var nodeType = _itext.get('NodeType', nodeObj);
        var plumb = this.plumb;
        var me = this;

        //event: move node (update x,y)
        //initialise draggable elements.
        //must put before makeSource/makeTarget !!
        var nodeElm = nodeObj[0];
        plumb.draggable(nodeElm, {
            grid: [10, 10],
            //update node position
            stop: function (params) {
                //debugger;
                //var node = $(params.el);
                var pos = $(params.el).position();
                _form.loadRow(nodeObj, { PosX: pos.left, PosY: pos.top });
                //this.mNode.setRow(node.data(_fun.Fid), { PosX: pos.left, PosY: pos.top });
            },
        });

        //build line(connection)
        //must put after plumb.draggable() !!
        if (nodeType != this.EndNode)
            plumb.makeSource(nodeElm, this.StartNodeCfg);
        if (nodeType != this.StartNode)
            plumb.makeTarget(nodeElm, this.EndNodeCfg);

        //event: show node menu
        //this.setNodeEvent(nodeObj);
        nodeObj.on('contextmenu', function (event) {
            //"this" is not work here !!
            me.showPopupMenu(event.target, event, true);
        });

        //產生節點, remark it: 似乎無作用 !!
        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //plumb.fire('jsPlumbDemoNodeAdded', nodeElm);
    };

    /*
    //load nodes & lines(at initial)
    this.loadJson = function (json) {
        //set flag
        //this.loading = true;

        //set instance

        //stop drawing
        jsPlumb.setSuspendDrawing(true);
 
        //load nodes & lines
        this.loadNodes(_crud.getChildRows(json, 0));
        this.loadLines(_crud.getChildRows(json, 1));

        //start drawing
        jsPlumb.setSuspendDrawing(false, true);
        //this.loading = false;
    };
    */

    /**
     * load nodes into UI
     * param rows {jsons} node rows
     */
    this.loadNodes = function (json) {
        //stop drawing
        jsPlumb.setSuspendDrawing(true);

        //empty all nodes first
        var box = this.divFlowBox;
        box.find(this.NodeFilter).remove();

        //set nodes class
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this.setNodeClass(rows[i]);

        //3rd param reset=false, coz box has other objects, cannot reset
        this.mNode.loadRows(box, rows, false);

        //set nodes event
        var me = this;
        box.find(this.NodeFilter).each(function () {
            me.setNodeEvent($(this));
        });

        //start drawing
        jsPlumb.setSuspendDrawing(false, true);
    };

    /**
     * load nodes into UI(hide)
     * param rows {jsons} line rows
     */
    this.loadLines = function (json) {
        //stop drawing
        jsPlumb.setSuspendDrawing(true);

        //empty jsplumb lines
        var conns = this.plumb.getAllConnections();   //for in did not work !!
        for (var i = 0; i < conns.length; i++)
            this.plumb.deleteConnection(conns[i]);

        //render jsplumb line
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this.renderLine(rows[i]);

        //load editMany lines
        this.mLine.loadRows(this.divLinesBox, rows);

        //start drawing
        jsPlumb.setSuspendDrawing(false, true);
    };

    //#region node function
    /**
     * set node class(_NodeClass), template has this field
     * param row {json} node row
     * return {json} new row
     */ 
    this.setNodeClass = function (row) {
        switch (row.NodeType) {
            case this.StartNode:
                row._NodeClass = this.StartNodeCls;
                break;
            case this.EndNode:
                row._NodeClass = this.EndNodeCls;
                break;
            case this.AutoNode:
                row._NodeClass = this.AutoNodeCls;
                break;
            default:
                //normal node
                break;
        }

        return row;
    };

    //add new node
    this.addNode = function (name, nodeType) {
        //json row initial value
        var row = {
            Name: name,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };

        var node = this.mNode.addRow(this.divFlowBox, this.setNodeClass(row));
        this.setNodeEvent(node);   //set node event
    };

    /**
     * node id to node object
     */ 
    this.idToNode = function (id) {
        return this.divFlowBox.find('.xf-node [value=' + id + ']').closest('.xf-node');
    };
    /**
     * inside element to node object
     */ 
    this.elmToNode = function (elm) {
        return $(elm).closest(this.NodeFilter);
    };
    /*
    //get node row (by node object)
    this.getNodeRow = function (obj) {
        return this.mNode.getRow(obj);
    };
    //get node row by inside element
    this.elmToNodeRow = function (elm) {
        var node = this.elmToNode(elm);
        return this.mNode.getRow(node);
    };
    */
    this.elmToNodeValue = function (elm, fid) {
        var node = this.elmToNode(elm);
        return this.boxGetValue(node, fid);
    };
    /*
    this.getNodeIdByElm = function (elm) {
        var node = this.elmToNode(elm);
        return _obj.get('Id', node);
    };
    */

    /**
     * node get field value
     * param node {object} node object
     * param fid {string} field id
     * return {string}
     */ 
    this.boxGetValue = function (node, fid) {
        return _itext.get(fid, node);
    };

    /**
     * node get field values
     * param node {object} node object
     * param fids {strings} field id array
     * return {json}
     */ 
    this.boxGetValues = function (node, fids) {
        var json = {};
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            json[fid] = _itext.get(fid, node);
        }
        return json;
    };

    this.deleteNode = function (nodeElm) {
        //delete from & to lines
        var plumb = this.plumb;
        this.deleteLines(plumb.getConnections({ source: nodeElm }));
        this.deleteLines(plumb.getConnections({ target: nodeElm }));

        //add deleted row of node
        var node = $(nodeElm);
        this.mNode.deleteRow(this.getObjKey(node));

        //delete node 
        $(nodeElm).remove();
    };
    //#endregion (node function)

    //#region line function
    /**
     * add one line(connector)
     * param row {json} line row
     * return void
     */ 
    this.renderLine = function (row) {

        //param 2(reference object) not work here !!
        var prop = this.getLineProp(row.CondStr);    //get line style & label
        var conn = this.plumb.connect({
            //type: 'basic',
            source: this.idToNode(row.StartNode),
            target: this.idToNode(row.EndNode),
            paintStyle: prop.style,
            //anchors: ["Right", "Left"],
        });

        //add custom attributes: whole line model(big camel), only this way workable !!
        //this.connSetParas(conn, row, isNew); 
        this.setLineKey(conn, row.Id);

        //set label
        this.setLineLabel(conn, prop.label);
    };


    /**
     * add flow line into hide UI for crud
     * param row {json}
     * return {string} line key
     */
    this.addLine = function (row) {
        var newLine = $(this.tplLine);      //create row object, no need mustache()
        _form.loadRow(newLine, row);        //row objec to UI
        var key = this.mLine.boxSetNewId(newLine);   //set new key
        this.divLinesBox.append(newLine);   //append row object
        return key;
    };

    /**
     * set connection key
     */ 
    this.setLineKey = function (conn, key) {
        var row = {};
        row['Id'] = key;
        conn.setParameters(row);
    };

    /*
    //save line model into connection object
    this.connSetParas = function (conn, line, isNew) {
        var lineId = isNew ? this.getNewLineId() : line.Id;
        this.mLine.keyValuesToModel(isNew, lineId, line);
        //keep old value
        //line._LineType = line.LineType;
        line._CondStr = line.CondStr; //_CondStr for log changed
        line._Sort = line.Sort;
        conn.setParameters(line);
    };

    //return string
    this.getNewLineId = function () {
        this.maxLineNo++;
        return this.maxLineNo + '';
    };
    */

    //is line source node a condition mode(true) or yes/no type(false)
    this.isSourceCondMode = function (sourceType) {
        return (sourceType == this.StartNode || sourceType == this.AutoNode);
    };

    /*
    this.isLineCondMode = function (lineType) {
        return (lineType === '2');
    };

    //is node type editable or not
    this.isNodeTypeEditable = function (nodeType) {
        return (nodeType === this.NormalNode || nodeType === this.AutoNode);
    };
    */

    /**
     * get line property: style, label
     * return {json} 
     */ 
    this.getLineProp = function (condStr) {
        return {
            //type: type,
            style: this.InitLineCfg,
            label: this.condStrToLabel(condStr),
        }
    };

    this.getLineElmKey = function (conn) {
        return conn.getParameters()['Id'];
    };

    /**
     * get object(node/line) key
     * param obj {object}
     * return {string} key value
     */
    this.getObjKey = function (obj) {
        return _itext.get('Id', obj);
    };

    //set connection label
    this.setLineLabel = function (conn, label) {
        var obj = conn.getOverlay('label');
        obj.setVisible(!_str.isEmpty(label));
        obj.setLabel(label);
        //conn.getOverlay('label').setLabel(label);
    };

    //delete line with warning msg
    this.deleteLineWithMsg = function (conn) {
        _tool.ans('delete this line ?', function () {
            this.deleteLine(conn);
        });
    };
    //delete line without warning msg
    this.deleteLine = function (conn) {
        //add deleted row
        var json = conn.getParameters();    //model
        this.mLine.deleteRow(json.Id);

        //delete conn
        this.plumb.deleteConnection(conn);
    };
    this.deleteLines = function (conns) {
        for (var i = 0; i < conns.length; i++) {
            this.deleteLine(conns[i]);
        }
    };
    //#endregion (line function)

    /**
     * show popup menu for node(normal, auto)/line
     * param elm {element} node element or connection
     * param event {event}
     * param isNode {bool} true(node), false(line)
     */
    this.showPopupMenu = function (elm, event, isNode) {
        //stop default context menu 
        event.preventDefault();

        //set instance variables
        this.nowIsNode = isNode;
        this.nowElm = isNode ? $(elm).closest(this.NodeFilter)[0] : elm;

        //set edit status
        var canEdit = true;
        var nodeType;
        if (isNode) {
            nodeType = this.elmToNodeValue(elm, 'NodeType');
            canEdit = (nodeType == this.NormalNode || nodeType == this.AutoNode);
        } else {
            nodeType = this.elmToNodeValue(elm.source, 'NodeType');
            canEdit = (nodeType == this.StartNode || nodeType == this.AutoNode);
        }
        /*
        //debugger;
        var item = this.popupMenu.find('.xd-edit');
        if (canEdit)
            item.show();
        else
            item.hide();
        */

        // Show contextmenu
        $(this.MenuFilter).finish()
        //this.popupMenu.finish()
            .toggle(100)
            .css({
                top: event.pageY + 'px',
                left: event.pageX + 'px'
            });
    };

    //convert condiction string to label string
    this.condStrToLabel = function (str) {
        if (_str.isEmpty(str))
            return '';

        var hasOr = str.indexOf(this.OrSep) > 0;
        for (var i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    };

    //convert condStr to List<Cond>
    this.condStrToList = function (str) {
        if (_str.isEmpty(str))
            return null;

        var list = [];
        var k = 0;
        var orList = str.split(this.OrSep);
        var orLen = orList.length;
        var hasOr = (orLen > 1);
        for (var i = 0; i < orLen; i++) {
            var andList = orList[i].split(this.AndSep);
            for (var j = 0; j < andList.length; j++) {
                var cols = andList[j].split(this.ColSep);
                list[k] = {
                    //AndOr: hasOr ? 'O' : 'A',
                    AndOr: hasOr ? this.OrSep : this.AndSep,
                    Fid: cols[0],
                    Op: cols[1],
                    Value: cols[2],
                };
                k++;
            }
        }
        return list;
    };

    //get line condition string
    this.getCondStr = function () {
        var me = this;
        var condStr = '';
        this.divLineConds.find('tr').each(function (idx) {
            var tr = $(this);
            var str = (idx == 0 ? '' : _iselect.get('AndOr', tr)) +
                _itext.get('Fid', tr) + me.ColSep +
                _iselect.get('Op', tr) + me.ColSep +
                _itext.get('Value', tr);
            condStr += str;
        });
        return condStr;
    };

    this.showModalNode = function (nodeType) {
        var node = this.elmToNode(this.nowElm);
        var row = this.boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        _form.loadRow(this.modalNodeProp, row);
        /*
        //set NodeType field
        var obj = _obj.get('NodeType', form);
        _iselect.setO(obj, nodeType);
        _iselect.setEditO(obj, this.isNodeTypeEditable(nodeType));
        */

        //show modal
        _modal.showO(this.modalNodeProp);   //.modal('show');
    };

    //conn: line connection
    this.showModalLine = function (conn) {
        //debugger;
        var form = this.eformLine;  //line prop modal edit form
        //var line = conn.getParameters();   //line model
        var line = this.connToLine(conn);
        //var lineType = line.LineType;

        //show fields
        //_iradio.set('LineType', lineType, form);
        //this.onChangeLineType(lineType); //switch input
        _iread.set('StartNode', this.elmToNodeValue(conn.source, 'Name'), form);
        _iread.set('EndNode', this.elmToNodeValue(conn.target, 'Name'), form);
        _itext.set('Sort', this.boxGetValue(line, 'Sort'), form);

        //show modal
        _modal.showO(this.modalLineProp);

        //if (!this.isLineCondMode(lineType))
        //    line.CondStr = '';

        //load line conditions rows
        this.divLineConds.empty();
        var condList = this.condStrToList(this.boxGetValue(line, 'CondStr'));
        if (condList != null) {
            for (var i = 0; i < condList.length; i++) {
                var newCond = $(this.tplLineCond);
                _form.loadRow(newCond, condList[i]);
                this.divLineConds.append(newCond);
            }
        }
    };

    //jsplumb connection to line object
    this.connToLine = function (conn) {
        return this.idToLine(this.getLineElmKey(conn));
    };

    //id to line object
    this.idToLine = function (id) {
        return this.divLinesBox.find('.xd-line [value=' + id + ']').closest('.xd-line');
    };

    /*
    //line prop show cond(true) or agree(false)
    this.linePropShowCond = function (show) {
        var win = this.modalLineProp;
        if (show) {
            win.find('.xu-cond').show();    //show condition input
            win.find('.xu-agree').hide();   //show agree radio
        } else {
            win.find('.xu-cond').hide();
            win.find('.xu-agree').show();
        }
    };
    */

    //#region events
    //on add start node
    this.onAddStartNode = function () {
        //this.renderLine(this.row0);
        //return;

        //check, only one start node allow
        //debugger;
        if (this.divFlowBox.find('.' + this.StartNodeCls).length > 0) {
        //if (_json.findIndex(this.mNode.getRows(), 'NodeType', 'S') >= 0) {
            //_tool.msg(this.R.StartNodeExist);
            _tool.msg('Start Node Already Existed !');
            return;
        }

        //add node
        this.addNode('Start', this.StartNode);
    };
    //on add end node
    this.onAddEndNode = function () {
        this.addNode('E', this.EndNode);
    };
    this.onAddAutoNode = function () {
        this.addNode('Auto', this.AutoNode);
    };
    //on add normal node
    this.onAddNormalNode = function () {
        this.addNode('Node', this.NormalNode);
    };

    /*
    this.deleteNode = function (elm) {
        //delete lines first

        //delete node
    };

    this.deleteLine = function (elm) {
        var tr = $(btn).closest('tr');
    };
    */

    //context menu event
    this.onMenuEdit = function () {
        if (this.nowIsNode)
            this.showModalNode(this.elmToNodeValue(this.nowElm, 'NodeType'));
        else
            this.showModalLine(this.nowElm);
    };

    this.onMenuDelete = function () {
        var me = this;
        if (me.nowIsNode) {
            _tool.ans('delete this node ?', function () {
                me.deleteNode(me.nowElm);
            });
        } else {
            _tool.ans('delete this line ?', function () {
                me.deleteLine(me.nowElm);
            });
        }
    };

    //onclick add line condition
    this.onAddLineCond = function () {
        var row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        var cond = $(Mustache.render(this.tplLineCond, row));
        _form.loadRow(cond, row);        //row objec to UI
        this.divLineConds.append(cond);
    };

    this.onDeleteLineCond = function (btn) {
        $(btn).closest('tr').remove();
    };

    //node prop onclick ok
    this.onModalNodeOk = function () {
        //check input

        //hide modal
        _modal.hideO(this.modalNodeProp);

        //set new value
        var row = _form.toJson(this.eformNode);
        //this.mNode.setRow(nodeObj.data(_fun.Fid), row);

        //update node display name
        var nodeObj = $(this.nowElm);
        nodeObj.find('.xd-name').text(row.Name);

        //update node form fields
        _itext.set('Name', row.Name, nodeObj);
        _itext.set('SignerType', row.SignerType, nodeObj);
        _itext.set('SignerValue', row.SignerValue, nodeObj);

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

        //hide modal
        _modal.hideO(this.modalLineProp);

        //var lineType = _iradio.get('LineType', this.eformLine);
        //_assert.inArray(lineType, ['0','1','2']);

        //conds to string
        var condStr = this.getCondStr();

        //set new value
        //write into line, this.nowElm is line connection
        //var form = this.eformLine;
        var conn = this.nowElm;
        //conn.setParameter('LineType', lineType);
        var row = {
            CondStr: condStr,
            Sort: _itext.get('Sort', this.eformLine),
        };
        //conn.setParameter('CondStr', condStr);
        //conn.setParameter('Sort', _itext.get('Sort', form));
        //var line = conn.getParameters();    //model
        var line = this.connToLine(conn);
        _form.loadRow(line, row);
        //this.mLine.setRow(line[_fun.Fid], row);

        //change line label
        var prop = this.getLineProp(condStr)
        this.setLineLabel(conn, prop.label);
        conn.setPaintStyle(prop.style);
    };

    /*
    this.onChangeLineType = function (lineType) {
        if (lineType === '2')
            _form.hideShow(null, [this.divLineCondBox]);
        else
            _form.hideShow([this.divLineCondBox]);
    };
    */
    //#endregion (events)

    //call last
    this.init();

}//class