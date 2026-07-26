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
    isEdit = false;
    newNodeId = 0;
    newLineId = 0;
    svg: Svg;
    nodes: FlowNode[] = [];
    lines: FlowLine[] = [];
    fromNode: FlowNode | null = null;
    fnMoveNode: ((node: FlowNode, x: number, y: number) => void) | null = null;
    fnAfterAddLine: ((json: Json) => void) | null = null;
    fnShowMenu: ((evt: MouseEvent, isNode: boolean, item: FlowNode | FlowLine) => void) | null = null;

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

    setEdit(status: boolean) {
        this.isEdit = status;
    }

    //清除全部UI元件
    reset() {
        this.nodes = [];
        this.lines = [];
        this.fromNode = null;

        Array.from(this.svg.node.childNodes).forEach((node: ChildNode) => {
            node.remove();
        });
    }

    loadNodes(dtos: FlowNodeDto[]) {
        this.reset();
        for (let i = 0; i < dtos.length; i++) {
            this.addNode(dtos[i]);
        }
    }

    loadLines(dtos?: FlowLineDto[]) {
        if (dtos != null) {
            for (let i = 0; i < dtos.length; i++) {
                this.addLine(dtos[i]);
            }
        }
    }

    addNode(dto: FlowNodeDto): FlowNode {
        let node = new FlowNode(this, dto);
        this.nodes.push(node);
        return node;
    }

    addLine(dto: FlowLineDto): FlowLine {
        return new FlowLine(this, dto);
    }

    deleteNode(node: FlowNode) {
        let id = node.getId();
        this.svg.findOne(`g[data-id="${id}"]`).remove();
    }

    deleteLine(line: FlowLine) {
        let id = line.getId();
        this.svg.findOne(`path[data-id="${id}"]`).remove();
    }

    drawLineStart(fromNode: FlowNode) {
        this.fromNode = fromNode;
    }

    drawLineEnd(toNode: FlowNode): FlowLineDto {
        let dto = new FlowLineDto();
        dto.Id = this.newLineId;
        dto.FromNodeId = this.fromNode!.getId();
        dto.ToNodeId = toNode.getId();

        new FlowLine(this, dto, this.fromNode!, toNode);
        this.fromNode = null;
        return dto;
    }

    idToNode?(id: StrNum): FlowNode {
        return this.nodes.find(node => node.getId() == id);
    }

    hasStartNode(): boolean {
        return this.nodes.some(node => node.getNodeType() == NodeTypeEstr.Start);
    }
}
window.FlowView = FlowView;