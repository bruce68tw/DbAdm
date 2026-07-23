class FlowMany {
    private OrSep: string = '{O}';
    private AndSep: string = '{A}';
    private ColSep: string = ',';
    private FtMenu: string = '.xf-menu';
    private FtStartNode: string = '.xf-start';
    private InitLineCfg: { stroke: string; strokeWidth: number } = { stroke: 'blue', strokeWidth: 2 };
    private isEdit: boolean = false;
    private mNode: any;
    private mLine: any;
    private divLinesBox: JQuery;
    private eformNodes: JQuery;
    private eformLines: JQuery;
    private modalNodeProp: JQuery;
    private modalLineProp: JQuery;
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

    constructor(areaId: string, mNode: any, mLine: any) {
        this.mNode = mNode;
        this.mLine = mLine;
        this.divLinesBox = $('#divLinesBox');
        this.eformNodes = $('#eformNodes');
        this.eformLines = $('#eformLines');
        this.modalNodeProp = $('#modalNodeProp');
        this.modalLineProp = $('#modalLineProp');
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
        flowView.fnMoveNode = (node: any, x: number, y: number) => this.fnMoveNode(node, x, y);
        flowView.fnAfterAddLine = (json: any) => this.fnAfterAddLine(json);
        flowView.fnShowMenu = (event: any, isNode: boolean, flowItem: any) => this.fnShowMenu(event, isNode, flowItem);
        this.flowView = flowView;

        this._setFlowEvent();
    }

    private fnMoveNode(node: any, x: number, y: number): void {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });
    }

    private fnAfterAddLine(json: any): void {
        this.mLine.addRow(json, null, json.Id);
    }

    fnShowMenu(event: any, isNode: boolean, flowItem: any): void {
        this.nowIsNode = isNode;
        this.nowFlowItem = flowItem;

        const canEdit = isNode
            ? (this.isEdit && flowItem.getNodeType() == NodeTypeEstr.Node)
            : this.isEdit;

        const css = 'off';
        const menu = $(this.FtMenu);
        if (canEdit) {
            menu.find('.xd-edit').removeClass(css);
            menu.find('.xd-delete').removeClass(css);
        } else {
            menu.find('.xd-edit').addClass(css);
            menu.find('.xd-delete').addClass(css);
        }

        menu.finish()
            .removeClass('d-none')
            .css({
                position: 'fixed',
                left: event.clientX + 'px',
                top: event.clientY + 'px',
            });
    }

    reset(): void {
        this.flowView.reset();
    }

    setEdit(status: boolean): void {
        this.isEdit = status;
        this.flowView.setEdit(status);
    }

    private _setFlowEvent(): void {
        const me = this;
        $(document).on(MouseEstr.MouseDown, function (e: any) {
            const filter = me.FtMenu;
            if ($(e.target).closest(filter).length === 0)
                _Obj.hide($(filter));
        });
    }

    loadNodes(rows: any): void {
        this.mNode.loadRowsByRsb(rows, true);
        this.flowView.loadNodes(rows);
    }

    loadLines(rows: any): void {
        this.mLine.loadRowsByRsb(rows, true);
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].Label = this._condStrToLabel(rows[i].CondStr);
            }
        }
        this.flowView.loadLines(rows);
    }

    addNode(nodeType: string, name?: string): void {
        let nodeName = name || '';
        if (nodeType == NodeTypeEstr.Start) {
            nodeName = 'S';
        } else if (nodeType == NodeTypeEstr.End) {
            nodeName = 'E';
        } else {
            nodeName = '節點-' + this.flowView.getNewNodeId();
        }

        const json = {
            Name: nodeName,
            NodeType: nodeType,
            PosX: 100,
            PosY: 100,
        };
        const row = this.mNode.addRow(json);
        this.flowView.addNode(row);
    }

    deleteNode(node: any): void {
        this.mNode.deleteRow(node.getId());
        node.getLines().forEach((line: any) => {
            this.mLine.deleteRow(line.getId());
        });
        this.flowView.deleteNode();
    }

    deleteLine(line: any): void {
        this.mLine.deleteRow(line.getId());
        this.flowView.deleteLine(line);
    }

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

    showNodeProp(node: any): void {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(this.modalNodeProp, _Form.toRow(rowBox));
        _Modal.show(this.modalNodeProp);
    }

    showLineProp(line: any): void {
        const rowBox = this.mLine.idToRowBox(line.getId());
        const form = this.modalLineProp.find('form');
        _iRead.set('FromNodeName', line.fromNode.getName(), form);
        _iRead.set('ToNodeName', line.toNode.getName(), form);
        _iSelect.set('FromType', line.getFromType(), form);
        _iText.set('Sort', _iText.get('Sort', rowBox), form);

        _Modal.show(this.modalLineProp);

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

    onAddNode(nodeType: string): void {
        if (nodeType == NodeTypeEstr.Start && this.flowView.hasStartNode()) {
            _Tool.msg('起始節點已經存在，不可再新增。');
            return;
        }
        this.addNode(nodeType);
    }

    private _menuStatus(me: JQuery): boolean {
        return !me[0].classList.contains('off');
    }

    onMenuEdit(): void {
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

    onMenuView(): void {
        // todo
    }

    onAddLineCond(): void {
        const row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        const cond = $(Mustache.render(this.tplLineCond, row));
        _Form.loadRow(cond, row);
        this.tbodyLineCond.append(cond);
    }

    onDeleteLineCond(btn: Elm): void {
        $(btn).closest('tr').remove();
    }

    onModalNodeOk(): void {
        const row = _Form.toRow(this.eformNodeProp);
        const node = this.nowFlowItem;
        const rowBox = this.mNode.idToRowBox(node.getId());
        const oldName = _iText.get('Name', rowBox);
        _Form.loadRow(rowBox, row);

        if (oldName != row.Name)
            node.setName(row.Name, true);

        _Modal.hide(this.modalNodeProp);
    }

    onModalLineOk(): void {
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