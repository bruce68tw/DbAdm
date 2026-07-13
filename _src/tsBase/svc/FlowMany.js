//import Mustache from "mustache";
import MouseEstr from '../enum/MouseEstr';
import NodeTypeEstr from '../enum/NodeTypeEstr';
import FlowView from './FlowView';
import _Form from './_Form';
import _Obj from './_Obj';
import _Str from './_Str';
import _iSelect from './_iSelect';
import _iText from './_iText';
import _Modal from './_Modal';
import _iRead from './_iRead';
import _Tool from './_Tool';
import _Fun from './_Fun';
export default class FlowMany {
    constructor(areaId, mNode, mLine) {
        this.OrSep = '{O}';
        this.AndSep = '{A}';
        this.ColSep = ',';
        this.FtMenu = '.xf-menu';
        this.FtStartNode = '.xf-start';
        this.InitLineCfg = { stroke: 'blue', strokeWidth: 2 };
        this.isEdit = false;
        this.nowIsNode = false;
        this.nowFlowItem = null;
        this.condOpExprs = [];
        this.condOpShows = [];
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
        const condOpMaps = [
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
        flowView.fnMoveNode = (node, x, y) => this.fnMoveNode(node, x, y);
        flowView.fnAfterAddLine = (json) => this.fnAfterAddLine(json);
        flowView.fnShowMenu = (event, isNode, flowItem) => this.fnShowMenu(event, isNode, flowItem);
        this.flowView = flowView;
        this._setFlowEvent();
    }
    fnMoveNode(node, x, y) {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(rowBox, { PosX: Math.floor(x), PosY: Math.floor(y) });
    }
    fnAfterAddLine(json) {
        this.mLine.addRow(json, null, json.Id);
    }
    fnShowMenu(event, isNode, flowItem) {
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
        }
        else {
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
    reset() {
        this.flowView.reset();
    }
    setEdit(status) {
        this.isEdit = status;
        this.flowView.setEdit(status);
    }
    _setFlowEvent() {
        const me = this;
        $(document).on(MouseEstr.MouseDown, function (e) {
            const filter = me.FtMenu;
            if ($(e.target).closest(filter).length === 0)
                _Obj.hide($(filter));
        });
    }
    loadNodes(rows) {
        this.mNode.loadRowsByRsb(rows, true);
        this.flowView.loadNodes(rows);
    }
    loadLines(rows) {
        this.mLine.loadRowsByRsb(rows, true);
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                rows[i].Label = this._condStrToLabel(rows[i].CondStr);
            }
        }
        this.flowView.loadLines(rows);
    }
    addNode(nodeType, name) {
        let nodeName = name || '';
        if (nodeType == NodeTypeEstr.Start) {
            nodeName = 'S';
        }
        else if (nodeType == NodeTypeEstr.End) {
            nodeName = 'E';
        }
        else {
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
    deleteNode(node) {
        this.mNode.deleteRow(node.getId());
        node.getLines().forEach((line) => {
            this.mLine.deleteRow(line.getId());
        });
        this.flowView.deleteNode();
    }
    deleteLine(line) {
        this.mLine.deleteRow(line.getId());
        this.flowView.deleteLine(line);
    }
    _condStrToLabel(str) {
        if (_Str.isEmpty(str))
            return '';
        const hasOr = str.indexOf(this.OrSep) > 0;
        for (let i = 0; i < this.condOpExprs.length; i++)
            str = str.replace(this.condOpExprs[i], this.condOpShows[i]);
        if (hasOr)
            str = '(' + str + ')';
        return str;
    }
    _condStrToList(str) {
        if (_Str.isEmpty(str))
            return null;
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
    _getCondStr() {
        const me = this;
        let condStr = '';
        this.tbodyLineCond.find('tr').each(function (idx) {
            const tr = $(this);
            const str = (idx == 0 ? '' : _iSelect.get('AndOr', tr)) +
                _iText.get('Fid', tr) + me.ColSep +
                _iSelect.get('Op', tr) + me.ColSep +
                _iText.get('Value', tr);
            condStr += str;
        });
        return condStr;
    }
    showNodeProp(node) {
        const rowBox = this.mNode.idToRowBox(node.getId());
        _Form.loadRow(this.modalNodeProp, _Form.toRow(rowBox));
        _Modal.show(this.modalNodeProp);
    }
    showLineProp(line) {
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
    onAddNode(nodeType) {
        if (nodeType == NodeTypeEstr.Start && this.flowView.hasStartNode()) {
            _Tool.msg('起始節點已經存在，不可再新增。');
            return;
        }
        this.addNode(nodeType);
    }
    _menuStatus(me) {
        return !me[0].classList.contains('off');
    }
    onMenuEdit() {
        const me = _Fun.getMe();
        if (!this._menuStatus(me))
            return;
        if (this.nowIsNode)
            this.showNodeProp(this.nowFlowItem);
        else
            this.showLineProp(this.nowFlowItem);
    }
    onMenuDelete() {
        const me = _Fun.getMe();
        if (!this._menuStatus(me))
            return;
        const the = this;
        if (the.nowIsNode) {
            _Tool.ans('是否確定刪除這個節點和流程線?', function () {
                the.deleteNode(the.nowFlowItem);
            });
        }
        else {
            _Tool.ans('是否確定刪除這一條流程線?', function () {
                the.deleteLine(the.nowFlowItem);
            });
        }
    }
    onMenuView() {
        // todo
    }
    onAddLineCond() {
        const row = {
            AndOr: this.AndSep,
            Op: 'eq',
        };
        const cond = $(Mustache.render(this.tplLineCond, row));
        _Form.loadRow(cond, row);
        this.tbodyLineCond.append(cond);
    }
    onDeleteLineCond(btn) {
        $(btn).closest('tr').remove();
    }
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
