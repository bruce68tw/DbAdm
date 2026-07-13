export default class FlowNode {
    private readonly MinWidth;
    private readonly MinHeight;
    private readonly LineHeight;
    private readonly PadTop;
    private readonly PadLeft;
    private readonly PinWidth;
    private readonly PinGap;
    private readonly NodeRadius;
    private readonly NodeRx;
    self: FlowNode;
    flowView: any;
    svg: any;
    json: any;
    elm: any;
    boxElm: any;
    nameElm: any;
    pinElm: any;
    lines: any[];
    constructor(flowView: any, json: any);
    getLines(): any[];
    private _isStartEnd;
    getNodeType(): any;
    getPos(): {
        x: number;
        y: number;
    };
    getSize(): {
        w: number;
        h: number;
    };
    getCenter(): {
        x: number;
        y: number;
    };
    private _setPinPos;
    private _setEvent;
    private _drawLines;
    private _setEventPin;
    private _markNode;
    getId(): string;
    addLine(line: any): void;
    deleteLine(line: any): void;
    getName(): string;
    setName(name: string, drawLine: boolean): void;
}
