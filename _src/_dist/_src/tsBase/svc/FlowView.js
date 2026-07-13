import NodeTypeEstr from '../enum/NodeTypeEstr';
import FlowNode from './FlowNode';
import FlowLine from './FlowLine';
/**
 * FlowBase -> FlowView
 * 建立 FlowView 簡化外部程式, 考慮模組化, 所以不使用jQuery
 * 自定函數如下(由flow內部觸發):
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAfterAddLine(json): when add line
 * void fnShowMenu(isNode, flowItem, event);
 * void fnAfterMoveLineEnd(oldNode, newNode): after drop line end point
 */
// 假設 NodeTypeEstr, MouseEstr, _str, SVG, FlowNode, FlowLine 為外部定義或引入
// declare var NodeTypeEstr: any;
// declare var MouseEstr: any;
// declare var _str: any;
// declare var SVG: any;
export default class FlowView {
    constructor(boxId) {
        this.isEdit = false;
        this.newNodeId = 0;
        this.newLineId = 0;
        this.nodes = [];
        this.lines = [];
        this.fromNode = null;
        this.fnMoveNode = null;
        this.fnAfterAddLine = null;
        this.fnShowMenu = null;
        let boxDom = document.getElementById(boxId);
        this.svg = window.SVG().addTo(boxDom).size('100%', '100%');
    }
    getNewNodeId() {
        this.newNodeId++;
        return this.newNodeId;
    }
    getNewLineId() {
        this.newLineId--;
        return this.newLineId;
    }
    setEdit(status) {
        this.isEdit = status;
    }
    reset() {
        this.nodes = [];
        this.lines = [];
        this.fromNode = null;
        Array.from(this.svg.node.childNodes).forEach((node) => {
            node.remove();
        });
    }
    loadNodes(rows) {
        this.reset();
        for (let i = 0; i < rows.length; i++) {
            this.addNode(rows[i]);
        }
    }
    loadLines(rows) {
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                this.addLine(rows[i]);
            }
        }
    }
    addNode(json) {
        let node = new FlowNode(this, json);
        this.nodes.push(node);
        return node;
    }
    addLine(json) {
        return new FlowLine(this, json);
    }
    deleteNode(node) {
        let id = node.getId();
        this.svg.findOne(`g[data-id="${id}"]`).remove();
    }
    deleteLine(line) {
        let id = line.getId();
        this.svg.find(`path[data-id="${id}"]`).remove();
    }
    drawLineStart(fromNode) {
        this.fromNode = fromNode;
    }
    drawLineEnd(toNode) {
        let json = {
            Id: this.newLineId,
            FromNodeId: this.fromNode.getId(),
            ToNodeId: toNode.getId(),
        };
        new FlowLine(this, json, this.fromNode, toNode);
        this.fromNode = null;
        return json;
    }
    idToNode(id) {
        return this.nodes.find(node => node.getId() == id);
    }
    hasStartNode() {
        return this.nodes.some(node => node.getNodeType() == NodeTypeEstr.Start);
    }
}
