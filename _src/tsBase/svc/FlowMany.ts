/**
 * FlowForm -> FlowMany
 * 處理 flow UI 元素和多筆資料(mNode, mLine)之間的轉換
 * workflow component
 * @param areaId {string} editor work area id
 * @param mNode {EditMany}
 * @param mLine {EditMany}
 */
class FlowMany {
    //const
    private readonly OrSep = '{O}';
    private readonly AndSep = '{A}';
    private readonly ColSep = ',';
    private readonly FtMenu = '.xf-menu';
    private readonly FtStartNode = '.xf-start';
    private readonly InitLineCfg = { stroke: 'blue', strokeWidth: 2 };

    private divLinesBox = $('#divLinesBox');
    private eformNodes = $('#eformNodes');
    private eformLines = $('#eformLines');
    private modalNodeProp = $('#modalNodeProp');
    private modalLineProp = $('#modalLineProp');

    private isEdit: boolean = false;
    private mNode: EditMany;
    private mLine: EditMany;
    private eformNodeProp: JQuery;
    private tbodyLineCond: JQuery;
    private tplNode: string;
    private tplLine: string;
    private tplLineCond: string;
    private nowIsNode: boolean = false;
    private nowFlowItem: any = null;
    private condOpExprs: RegExp[] = [];
    private condOpShows: string[] = [];
    private flowView: any;

    constructor(areaId: string, mNode: EditMany, mLine: EditMany) {
        this.mNode = mNode;
        this.mLine = mLine;
        this.eformNodeProp = this.modalNodeProp.find('form');
        this.tbodyLineCond = this.modalLineProp.find('tbody');
        this.tplNode = $('#tplNode').html();
        this.tplLine = $('#tplLine').html();
        this.tplLineCond = $('#tplLineCond').html();

        const condOpMaps: string[] = [
            this.OrSep, ') || (',
            this.AndSep, ' && ',
            ',EQ,', '=',
            ',NEQ,', '!=',
            ',GT,', '>',
            ',GE,', '>=',
            ',ST,', '<',
            ',SE,', '<=',
        ];

        let j = 0;
        for (let i = 0; i < condOpMaps.length; i = i + 2) {
            this.condOpExprs[j] = new RegExp(condOpMaps[i], 'g');
            this.condOpShows[j] = condOpMaps[i + 1];
            j++;
        }

        const flowView = new FlowView(areaId);
        flowView.fnMoveNode = (node: FlowNode, x: number, y: number) => this.fnMoveNode(node, x, y);
        flowView.fnAfterAddLine = (json: Json) => this.fnAfterAddLine(json);
        flowView.fnShowMenu = (event: any, isNode: boolean, flowItem: any) => this.fnShowMenu(event, isNode, flowItem);
        this.flowView = flowView;

        this._setFlowEvent();
    }

    private fnMoveNode(node: FlowNode, x: number, y: number) {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });
    }

    private fnAfterAddLine(json: Json) {
        this.mLine.addRow(json, null, json.Id);
    }

    /**
     * on show right menu
     * @param event
     * @param isNode
     * @param flowItem
     */
    fnShowMenu(event: any, isNode: boolean, flowItem: any) {
        this.nowIsNode = isNode;
        this.nowFlowItem = flowItem;

        //一般節點才需要設定屬性
        const canEdit = isNode
            ? (this.isEdit && flowItem.getNodeType() == NodeTypeEstr.Node)
            : this.isEdit;

        //html 不會自動處理自製功能表狀態, 自行配合 css style
        const css = 'off';
        const menu = $(this.FtMenu);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        } else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }

        // Show contextmenu
        menu.finish()
            .removeClass('d-none')
            .css({
                position: 'fixed',
                left: event.clientX + 'px',
                top: event.clientY + 'px',
            });
    }

    //清除UI & flow元件
    reset() {
        this.flowView.reset();
    }

    //set editable or not
    setEdit(status: boolean) {
        this.isEdit = status;
        this.flowView.setEdit(status);
    }

    /**
     * set flow events:
     *   1.line right click to show context menu
     *   2.mouse down to hide context menu
     */
    private _setFlowEvent() {
        //hide context menu
        const me = this;
        $(document).on(MouseEstr.MouseDown, function (e: any) {
            const filter = me.FtMenu;
            if ($(e.target).closest(filter).length === 0)
                _Obj.hide($(filter));
        });
    }

    /**
     * load nodes into UI
     * @param rows {json} 後端傳回的完整json
     */
    loadNodes(rows: Json[]) {
        //EditMany load rows by rowsBox
        this.mNode.loadRowsByRsb(rows, true);

        //flow loadNodes
        this.flowView.loadNodes(rows);
    }

    /**
     * load nodes into UI(hide)
     * @param rows {rows} line rows
     */
    loadLines(rows: Json[]) {
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
     * @param nodeType {string}
     * @param name {string} only for normalType node
     */ 
    addNode(nodeType: string, name?: string) {
        let nodeName = name || '';
        if (nodeType == NodeTypeEstr.Start) {
            nodeName = 'S';
        } else if (nodeType == NodeTypeEstr.End) {
            nodeName = 'E';
        } else {
            nodeName = '節點-' + this.flowView.getNewNodeId();
        }

        //mNode新筆一筆資料, 會產生新id
        const json = {
            Name: nodeName,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };
        const row = this.mNode.addRow(json);    //會產生id

        //flow add node
        this.flowView.addNode(row);
    }

    deleteNode(node: FlowNode) {
        this.mNode.deleteRow(node.getId());
        node.getLines().forEach((line: FlowLine) => {
            this.mLine.deleteRow(line.getId());
        });
        this.flowView.deleteNode();
    }
    //#endregion (node function)

    //#region line function
    //delete line without warning msg
    deleteLine(line: FlowLine) {
        this.mLine.deleteRow(line.getId());
        this.flowView.deleteLine(line);
    }

    //將Db的條件內容轉換為顯示內容
    private _condStrToLabel(str: string): string {
        if (_Str.isEmpty(str))
            return '';

        const hasOr = str.indexOf(this.OrSep) > 0;
        for (let i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    }

    //convert condStr to List<Cond> for 顯示編輯畫面
    private _condStrToList(str: string): any[] | null {
        if (_Str.isEmpty(str))
            return null;

        const orList = str.split(this.OrSep);
        const orLen = orList.length;
        const hasOr = (orLen > 1);
        const result: any[] = [];
        let ary = 0;
        for (let i = 0; i < orLen; i++) {
            const andList = orList[i].split(this.AndSep);
            for (let j = 0; j < andList.length; j++) {
                const cols = andList[j].split(this.ColSep);
                result[ary] = {
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
    private _getCondStr(): string {
        const me = this;
        let condStr = '';
        this.tbodyLineCond.find('tr').each(function (idx: number) {
            const tr = $(this);
            const str = (idx == 0 ? '' : _iSelect.get('AndOr', tr)) +
                _iText.get('Fid', tr) + me.ColSep +
                _iSelect.get('Op', tr) + me.ColSep +
                _iText.get('Value', tr);
            condStr += str;
        });
        return condStr;
    }

    showNodeProp(node: FlowNode) {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(this.modalNodeProp, _Form.toRow(rowBox));
        _Modal.show(this.modalNodeProp);
    }

    //param line {FlowLine} flow line 
    showLineProp(line: FlowLine) {
        //show fields
        const rowBox = this.mLine.idToRowBox(line.getId());
        const form = this.modalLineProp.find('form');
        _iRead.set('FromNodeName', line.fromNode.getName(), form);
        _iRead.set('ToNodeName', line.toNode.getName(), form);
        _iSelect.set('FromType', line.getFromType(), form);
        _iText.set('Sort', _iText.get('Sort', rowBox), form);

        _Modal.show(this.modalLineProp);

        //load line conditions rows
        this.tbodyLineCond.empty();
        const condStr = _iText.get('CondStr', rowBox);
        const condList = this._condStrToList(condStr);
        if (condList != null) {
            for (let i = 0; i < condList.length; i++) {
                const newCond = $(this.tplLineCond);
                _Form.loadRow(newCond, condList[i]);
                this.tbodyLineCond.append(newCond);
            }
        }
    }

    onAddNode(nodeType: string) {
        if (nodeType == NodeTypeEstr.Start && this.flowView.hasStartNode()) {
            _Tool.msg('起始節點已經存在，不可再新增。');
            return;
        }
        this.addNode(nodeType);
    }

    private _menuStatus(me: JQuery): boolean {
        return !me[0].classList.contains('off');
    }

    //context menu event
    onMenuEdit() {
        const me = _Fun.getMe();
        if (!this._menuStatus(me)) return;

        if (this.nowIsNode)
            this.showNodeProp(this.nowFlowItem);
        else
            this.showLineProp(this.nowFlowItem);
    }

    async onMenuDelete() {
        const me = _Fun.getMe();
        if (!this._menuStatus(me)) return;

        //const the = this;
        if (this.nowIsNode) {
            if (await _Tool.ansA('是否確定刪除這個節點和流程線?'))
                this.deleteNode(this.nowFlowItem);
        } else {
            if (await _Tool.ansA('是否確定刪除這一條流程線?'))
                this.deleteLine(this.nowFlowItem);
        }
    }

    onMenuView() {
        // todo
    }

    //onclick add line condition
    onAddLineCond() {
        const row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        const cond = $(Mustache.render(this.tplLineCond, row));
        _Form.loadRow(cond, row);
        this.tbodyLineCond.append(cond);
    }

    onDeleteLineCond(btn: Elm) {
        $(btn).closest('tr').remove();
    }

    //node prop onclick ok
    onModalNodeOk() {
        const row = _Form.toRow(this.eformNodeProp);
        const node = this.nowFlowItem;
        const rowBox = this.mNode.idToRowBox(node.getId());
        const oldName = _iText.get('Name', rowBox);
        _Form.loadRow(rowBox, row);

        if (oldName != row.Name)
            node.setName(row.Name, true);

        _Modal.hide(this.modalNodeProp);
    }

    //line prop click ok
    onModalLineOk() {
        const modal = this.modalLineProp;
        const row = {
            CondStr: this._getCondStr(),
            Sort: _iText.get('Sort', modal),
            FromType: _iSelect.get('FromType', modal),
        };
        const line = this.nowFlowItem;
        const rowBox = this.mLine.idToRowBox(line.getId());
        _Form.loadRow(rowBox, row);

        line.setLabel(this._condStrToLabel(row.CondStr));
        line.setFromType(row.FromType);

        _Modal.hide(modal);
    }
}
window.FlowMany = FlowMany;