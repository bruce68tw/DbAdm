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
export default class FlowView {
    isEdit: boolean;
    newNodeId: number;
    newLineId: number;
    svg: any;
    nodes: FlowNode[];
    lines: FlowLine[];
    fromNode: FlowNode | null;
    fnMoveNode: ((node: FlowNode, x: number, y: number) => void) | null;
    fnAfterAddLine: ((json: any) => void) | null;
    fnShowMenu: ((event: Event, isNode: boolean, item: FlowNode | FlowLine) => void) | null;
    constructor(boxId: string);
    getNewNodeId(): number;
    getNewLineId(): number;
    setEdit(status: boolean): void;
    reset(): void;
    loadNodes(rows: Json[]): void;
    loadLines(rows?: Json[]): void;
    addNode(json: Json): FlowNode;
    addLine(json: Json): FlowLine;
    deleteNode(node: FlowNode): void;
    deleteLine(line: FlowLine): void;
    drawLineStart(fromNode: FlowNode): void;
    drawLineEnd(toNode: FlowNode): any;
    idToNode?(id: StrNum): FlowNode;
    hasStartNode(): boolean;
}
