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
        //this.AutoNode = 'A';

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
        //this.AutoNodeCls = 'xf-auto-node';      //auto node class

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

        //this.condOpExprs/this.condOpShows, match XpCode.Type=LineOp
        //for show line label
        var condOpMaps = [
            this.OrSep, ') || (',  //or
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
        this._setFlowEvent();
    };

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    this._setFlowEvent = function () {
        var plumb = this.plumb;
        var me = this;

        // bind a click listener to each connection; the connection is deleted. you could of course
        // just do this: jsPlumb.bind('click', jsPlumb.detach), but I wanted to make it clear what was
        // happening.
        //(定義)Notification a Connection was clicked.
        /*
        plumb.bind('click', function (c) {
            //this.showNodeProp();
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
            //var sourceType = me._elmToNodeRow(conn.source).NodeType;
            //var lineType = this._isSourceCondMode(sourceType) ? this.LineTypeCond : this.LineTypeYes;
            var prop = me.getLineProp('');

            //set conn style & label
            conn.setPaintStyle(prop.style);    //real connection
            me._setLineLabel(conn, prop.label);

            //add parameters(line model) into connection
            //debugger;
            var row = {
                StartNode: me._elmToNodeValue(conn.source, 'Id'),
                EndNode: me._elmToNodeValue(conn.target, 'Id'),
                //LineType: lineType,
                CondStr: '',
                Sort: 9,
            };
            me._setLineKey(conn, me.addLine(row));
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
    this._setNodeEvent = function (nodeObj) {
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
                _form.loadJson(nodeObj, { PosX: Math.floor(pos.left), PosY: Math.floor(pos.top) });
            },
        });

        //build line(connection)
        //must put after plumb.draggable() !!
        if (nodeType != this.EndNode)
            plumb.makeSource(nodeElm, this.StartNodeCfg);
        if (nodeType != this.StartNode)
            plumb.makeTarget(nodeElm, this.EndNodeCfg);

        //event: show node menu
        //this._setNodeEvent(nodeObj);
        nodeObj.on('contextmenu', function (event) {
            //"this" is not work here !!
            me.showPopupMenu(event.target, event, true);
        });

        //create node, remark it: seems no work !!
        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //plumb.fire('jsPlumbDemoNodeAdded', nodeElm);
    };

    /**
     * load nodes into UI
     * param rows {jsons} node rows
     */
    this.loadNodes = function (json) {
        this.reset();

        //stop drawing
        jsPlumb.setSuspendDrawing(true);

        //empty all nodes first
        var box = this.divFlowBox;
        //box.find(this.NodeFilter).remove();

        //set nodes class
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this._setNodeClass(rows[i]);

        //3rd param reset=false, coz box has other objects, cannot reset
        this.mNode.loadRows(box, rows, false);

        //set nodes event
        var me = this;
        box.find(this.NodeFilter).each(function () {
            me._setNodeEvent($(this));
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

        /*
        //empty jsplumb lines
        var conns = this.plumb.getAllConnections();   //for in did not work !!
        for (var i = 0; i < conns.length; i++)
            this.plumb.deleteConnection(conns[i]);
        */

        //render jsplumb line
        var rows = _crud.getJsonRows(json);
        for (var i = 0; i < rows.length; i++)
            this._renderLine(rows[i]);

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
    this._setNodeClass = function (row) {
        switch (row.NodeType) {
            case this.StartNode:
                row._NodeClass = this.StartNodeCls;
                break;
            case this.EndNode:
                row._NodeClass = this.EndNodeCls;
                break;
            /*
            case this.AutoNode:
                row._NodeClass = this.AutoNodeCls;
                break;
            */
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

        var node = this.mNode.addRow(this.divFlowBox, this._setNodeClass(row));
        this._setNodeEvent(node);   //set node event
    };

    /**
     * node id to node object
     */ 
    this._idToNode = function (id) {
        return this.divFlowBox.find('.xf-node [value=' + id + ']').closest('.xf-node');
    };
    /**
     * inside element to node object
     */ 
    this._elmToNode = function (elm) {
        return $(elm).closest(this.NodeFilter);
    };
    this._elmToNodeValue = function (elm, fid) {
        var node = this._elmToNode(elm);
        return this._boxGetValue(node, fid);
    };

    /**
     * node get field value
     * param node {object} node object
     * param fid {string} field id
     * return {string}
     */ 
    this._boxGetValue = function (node, fid) {
        return _itext.get(fid, node);
    };

    /**
     * node get field values
     * param node {object} node object
     * param fids {strings} field id array
     * return {json}
     */ 
    this._boxGetValues = function (node, fids) {
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
        this.mNode.deleteRow(this._getObjKey(node));

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
    this._renderLine = function (row) {

        //param 2(reference object) not work here !!
        var prop = this.getLineProp(row.CondStr);    //get line style & label
        var conn = this.plumb.connect({
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

    /**
     * add flow line into hide UI for crud
     * param row {json}
     * return {string} line key
     */
    this.addLine = function (row) {
        var newLine = $(this.tplLine);      //create row object, no need mustache()
        _form.loadJson(newLine, row);        //row objec to UI
        var key = this.mLine.boxSetNewId(newLine);   //set new key
        this.divLinesBox.append(newLine);   //append row object
        return key;
    };

    /**
     * set connection key
     */ 
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

    /**
     * get line property: style, label
     * return {json} 
     */ 
    this.getLineProp = function (condStr) {
        return {
            //type: type,
            style: this.InitLineCfg,
            label: this._condStrToLabel(condStr),
        }
    };

    this._getLineElmKey = function (conn) {
        return conn.getParameters()['Id'];
    };

    /**
     * get object(node/line) key
     * param obj {object}
     * return {string} key value
     */
    this._getObjKey = function (obj) {
        return _itext.get('Id', obj);
    };

    //set connection label
    this._setLineLabel = function (conn, label) {
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

    this.reset = function () {
        //below method not working !!
        //jsPlumb.deleteEveryEndpoint();
        //jsPlumb.removeAllEndpoints();
        //jsPlumb.detachEveryConnection();
        //jsPlumb.reset();

        //reset lines
        var conns = this.plumb.getAllConnections();   //for in did not work !!
        var len = conns.length;
        for (var i = len - 1; i >= 0; i--)
            this.plumb.deleteConnection(conns[i]);        

        //reset nodes
        var box = this.divFlowBox;
        box.find(this.NodeFilter).remove();
    };

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
            nodeType = this._elmToNodeValue(elm, 'NodeType');
            //canEdit = (nodeType == this.NormalNode || nodeType == this.AutoNode);
            canEdit = (nodeType == this.NormalNode);
        } else {
            nodeType = this._elmToNodeValue(elm.source, 'NodeType');
            //canEdit = (nodeType == this.StartNode || nodeType == this.AutoNode);
            canEdit = (nodeType == this.StartNode);
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
    this._condStrToLabel = function (str) {
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
    this._condStrToList = function (str) {
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
    this._getLineLabel = function () {
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

    this.showNodeProp = function (nodeType) {
        var node = this._elmToNode(this.nowElm);
        var row = this._boxGetValues(node, ['NodeType', 'Name', 'SignerType', 'SignerValue']);
        _form.loadJson(this.modalNodeProp, row);

        //show modal
        _modal.showO(this.modalNodeProp);   //.modal('show');
    };

    //conn: line connection
    this.showLineProp = function (conn) {
        //debugger;
        var form = this.eformLine;  //line prop modal edit form
        //var line = conn.getParameters();   //line model
        var line = this._connToLine(conn);
        //var lineType = line.LineType;

        //show fields
        //_iradio.set('LineType', lineType, form);
        //this.onChangeLineType(lineType); //switch input
        _iread.set('StartNode', this._elmToNodeValue(conn.source, 'Name'), form);
        _iread.set('EndNode', this._elmToNodeValue(conn.target, 'Name'), form);
        _itext.set('Sort', this._boxGetValue(line, 'Sort'), form);

        //show modal
        _modal.showO(this.modalLineProp);

        //if (!this.isLineCondMode(lineType))
        //    line.CondStr = '';

        //load line conditions rows
        this.divLineConds.empty();
        var condList = this._condStrToList(this._boxGetValue(line, 'CondStr'));
        if (condList != null) {
            for (var i = 0; i < condList.length; i++) {
                var newCond = $(this.tplLineCond);
                _form.loadJson(newCond, condList[i]);
                this.divLineConds.append(newCond);
            }
        }
    };

    //jsplumb connection to line object
    this._connToLine = function (conn) {
        return this._idToLine(this._getLineElmKey(conn));
    };

    //id to line object
    this._idToLine = function (id) {
        return this.divLinesBox.find('.xd-line [value=' + id + ']').closest('.xd-line');
    };

    //#region events
    //on add start node
    this.onAddStartNode = function () {
        //check, only one start node allow
        if (this.divFlowBox.find('.' + this.StartNodeCls).length > 0) {
            //_tool.msg(this.R.StartNodeExist);
            _tool.msg('Start Node Already Existed !');
            return;
        }

        //add node
        this.addNode('Start', this.StartNode);
    };
    //on add end node
    this.onAddEndNode = function () {
        this.addNode('End', this.EndNode);
    };
    /*
    this.onAddAutoNode = function () {
        this.addNode('Auto', this.AutoNode);
    };
    */
    //on add normal node
    this.onAddNormalNode = function () {
        this.addNode('Node', this.NormalNode);
    };

    //context menu event
    this.onMenuEdit = function () {
        if (this.nowIsNode)
            this.showNodeProp(this._elmToNodeValue(this.nowElm, 'NodeType'));
        else
            this.showLineProp(this.nowElm);
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
        _form.loadJson(cond, row);        //row objec to UI
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
        var condStr = this._getLineLabel();

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
        var line = this._connToLine(conn);
        _form.loadJson(line, row);

        //change line label
        var prop = this.getLineProp(condStr)
        this._setLineLabel(conn, prop.label);
        conn.setPaintStyle(prop.style);
    };
    //#endregion (events)

    //call last
    this.init();

}//class