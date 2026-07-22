/**
 * FlowBase -> FlowView
 * 建立 FlowView 簡化外部程式, 考慮模組化, 所以不使用jQuery
 * 自定函數如下(由flow內部觸發):
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAfterAddLine(json): when add line
 * void fnShowMenu(isNode, flowItem, event);
 * void fnAfterMoveLineEnd(oldNode, newNode): after drop line end point
 */

class FlowView {
    isEdit: boolean = false;
    newNodeId: number = 0;
    newLineId: number = 0;
    svg: any;
    nodes: FlowNode[] = [];
    lines: FlowLine[] = [];
    fromNode: FlowNode | null = null;
    fnMoveNode: ((node: FlowNode, x: number, y: number) => void) | null = null;
    fnAfterAddLine: ((json: any) => void) | null = null;
    fnShowMenu: ((event: Event, isNode: boolean, item: FlowNode | FlowLine) => void) | null = null;

    constructor(boxId: string) {
        let boxDom = document.getElementById(boxId);
        this.svg = (window as any).SVG().addTo(boxDom!).size('100%', '100%');
    }

    getNewNodeId(): number {
        this.newNodeId++;
        return this.newNodeId;
    }

    getNewLineId(): number {
        this.newLineId--;
        return this.newLineId;
    }

    setEdit(status: boolean): void {
        this.isEdit = status;
    }

    //清除全部UI元件
    reset(): void {
        this.nodes = [];
        this.lines = [];
        this.fromNode = null;

        Array.from(this.svg.node.childNodes).forEach((node: any) => {
            node.remove();
        });
    }

    loadNodes(rows: Json[]): void {
        this.reset();
        for (let i = 0; i < rows.length; i++) {
            this.addNode(rows[i]);
        }
    }

    loadLines(rows?: Json[]): void {
        if (rows != null) {
            for (let i = 0; i < rows.length; i++) {
                this.addLine(rows[i]);
            }
        }
    }

    addNode(json: Json): FlowNode {
        let node = new FlowNode(this, json);
        this.nodes.push(node);
        return node;
    }

    addLine(json: Json): FlowLine {
        return new FlowLine(this, json);
    }

    deleteNode(node: FlowNode): void {
        let id = node.getId();
        this.svg.findOne(`g[data-id="${id}"]`).remove();
    }

    deleteLine(line: FlowLine): void {
        let id = line.getId();
        this.svg.find(`path[data-id="${id}"]`).remove();
    }

    drawLineStart(fromNode: FlowNode): void {
        this.fromNode = fromNode;
    }

    drawLineEnd(toNode: FlowNode): any {
        let json = {
            Id: this.newLineId,
            FromNodeId: this.fromNode!.getId(),
            ToNodeId: toNode.getId(),
        };
        new FlowLine(this, json, this.fromNode!, toNode);
        this.fromNode = null;
        return json;
    }

    idToNode?(id: StrNum): FlowNode {
        return this.nodes.find(node => node.getId() == id);
    }

    hasStartNode(): boolean {
        return this.nodes.some(node => node.getNodeType() == NodeTypeEstr.Start);
    }
}
window.FlowView = FlowView;