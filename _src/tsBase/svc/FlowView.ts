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
    public isEdit: boolean = false;
    public newNodeId: number = 0;
    public newLineId: number = 0;
    public svg: any;
    public nodes: FlowNode[] = [];
    public lines: FlowLine[] = [];
    public fromNode: FlowNode | null = null;
    public fnMoveNode: ((node: FlowNode, x: number, y: number) => void) | null = null;
    public fnAfterAddLine: ((json: any) => void) | null = null;
    public fnShowMenu: ((event: Event, isNode: boolean, item: FlowNode | FlowLine) => void) | null = null;

    constructor(boxId: string) {
        let boxDom = document.getElementById(boxId);
        this.svg = (window as any).SVG().addTo(boxDom!).size('100%', '100%');
    }

    public getNewNodeId(): number {
        this.newNodeId++;
        return this.newNodeId;
    }

    public getNewLineId(): number {
        this.newLineId--;
        return this.newLineId;
    }

    public setEdit(status: boolean): void {
        this.isEdit = status;
    }

    public reset(): void {
        this.nodes = [];
        this.lines = [];
        this.fromNode = null;

        Array.from(this.svg.node.childNodes).forEach((node: any) => {
            node.remove();
        });
    }

    public loadNodes(rows: Json[]): void {
        this.reset();
        for (let i = 0; i < rows.length; i++) {
            this.addNode(rows[i]);
        }
    }

    public loadLines(rows?: Json[]): void {
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                this.addLine(rows[i]);
            }
        }
    }

    public addNode(json: Json): FlowNode {
        let node = new FlowNode(this, json);
        this.nodes.push(node);
        return node;
    }

    public addLine(json: Json): FlowLine {
        return new FlowLine(this, json);
    }

    public deleteNode(node: FlowNode): void {
        let id = node.getId();
        this.svg.findOne(`g[data-id="${id}"]`).remove();
    }

    public deleteLine(line: FlowLine): void {
        let id = line.getId();
        this.svg.find(`path[data-id="${id}"]`).remove();
    }

    public drawLineStart(fromNode: FlowNode): void {
        this.fromNode = fromNode;
    }

    public drawLineEnd(toNode: FlowNode): any {
        let json = {
            Id: this.newLineId,
            FromNodeId: this.fromNode!.getId(),
            ToNodeId: toNode.getId(),
        };
        new FlowLine(this, json, this.fromNode!, toNode);
        this.fromNode = null;
        return json;
    }

    public idToNode?(id: StrNum): FlowNode {
        return this.nodes.find(node => node.getId() == id);
    }

    public hasStartNode(): boolean {
        return this.nodes.some(node => node.getNodeType() == NodeTypeEstr.Start);
    }
}