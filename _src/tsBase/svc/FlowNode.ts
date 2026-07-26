/**
  流程節點
  屬性:
    self: this
    flowView: FlowView object
    svg: flowView.svg
    json: node json, 欄位與後端XgFlowE相同: Id(不變), NodeType(不變), Name, PosX, PosY, Width, Height
    elm: svg group element(與 html element不同)
    boxElm: border element
    textElm: text element
    lines: 進入/離開此節點的流程線
    width: width
    height: height
  param flowView {object} FlowView
  param json {json} 流程節點資料
 */
class FlowNode {
    /**
     * 定義:
     * Element: 基本 Element
     * Elm: HTMLElement
     * SVGGElement 就是瀏覽器看到的 SVG <g> 標籤，不要把它想成 SVG.js 的東西。
     * SvgElm: svg 基本 Element
    */

    private readonly MinWidth: number = 80;
    private readonly MinHeight: number = 42;
    private readonly LineHeight: number = 18;
    private readonly PadTop: number = 8;
    private readonly PadLeft: number = 15;
    private readonly PinWidth: number = 12;
    private readonly PinGap: number = 3;
    private readonly NodeRadius: number = 20;
    private readonly NodeRx: number = 5;

    self: FlowNode;
    flowView: FlowView;
    svg: Svg;
    dto: FlowNodeDto;
    groupElm: SvgGroup;
    boxElm: SvgCircle | SvgRect;  //border
    nameElm: SvgText;   //text
    pinElm: SvgRect;       //連結點
    lines: FlowLine[];

    constructor(flowView: FlowView, dto: FlowNodeDto) {
        this.self = this;
        this.flowView = flowView;
        this.svg = flowView.svg;
        this.dto = Object.assign({
            Name: 'Node',
            NodeType: NodeTypeEstr.Node,
            PosX: dto.PosX || 100,
            PosY: dto.PosY || 100,
        }, dto);

        this.lines = [];

        let nodeType = this.dto.NodeType;
        let cssClass = '';
        let nodeText = '';

        this.groupElm = this.svg
            .group()
            .attr('data-id', dto.Id);

        let startEnd = this._isStartEnd();
        if (startEnd) {
            if (nodeType == NodeTypeEstr.Start) {
                cssClass = 'xf-start';
                nodeText = NodeTypeEstr.Start;
            } else {
                cssClass = 'xf-end';
                nodeText = NodeTypeEstr.End;
            }

            this.boxElm = this.groupElm.circle()
                .addClass(cssClass);

            this.boxElm.attr('r', this.NodeRadius);

            this.nameElm = this.groupElm.text(nodeText)
                .addClass(cssClass + '-text')
                .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
        } else {
            nodeText = this.dto.Name;
            cssClass = 'xf-node';
            this.boxElm = this.groupElm.rect()
                .addClass(cssClass)
                .attr({
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle',
                    'rx': this.NodeRx,
                    'ry': this.NodeRx,
                });

            this.nameElm = this.groupElm.text('')
                .addClass(cssClass + '-text');

            this.setName(nodeText, false);
        }

        this.groupElm.move(this.dto.PosX, this.dto.PosY);

        if (nodeType != NodeTypeEstr.End) {
            this.pinElm = this.groupElm
                .rect(this.PinWidth, this.PinWidth)
                .addClass('xf-pin');
            this._setPinPos();
        }

        this._setEvent();
    }

    getLines(): FlowLine[] {
        return this.lines;
    }

    private _isStartEnd(): boolean {
        return (this.dto.NodeType == NodeTypeEstr.Start || this.dto.NodeType == NodeTypeEstr.End);
    }

    getNodeType(): string {
        return this.dto.NodeType;
    }

    getPos(): { x: number, y: number } {
        let box = this.groupElm.bbox();
        return { x: box.x, y: box.y };
    }

    getSize(): { w: number, h: number } {
        let box = this.boxElm.bbox();
        return { w: box.width, h: box.height };
    }

    getCenter(): { x: number, y: number } {
        let box = this.boxElm.bbox();
        return { x: box.cx, y: box.cy };
    }

    private _setPinPos() {
        if (!this.pinElm) return;

        let bbox = this.nameElm.bbox();
        let center = this.getCenter();
        this.pinElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
    }

    private _setEvent() {
        let me = this;
        let flowView = this.flowView;
        this.groupElm.node.addEventListener(MouseEstr.RightMenu, (evt: MouseEvent) => {
            evt.preventDefault();
            if (flowView.fnShowMenu)
                flowView.fnShowMenu(evt, true, me);
        });

        //dragMove 沒有對應event, 只能用 JQuery.Event
        this.groupElm.draggable().on(MouseEstr.DragMove, (evt: MouseEvent) => {
            if (!flowView.isEdit) return;
            me._drawLines();
        }).on(MouseEstr.DragEnd, function (evt: CustomEvent) {
            //CustomEvent 為 DOM event for evt.detail.box
            if (!flowView.isEdit) return;
            let { x, y } = evt.detail.box;
            if (me.flowView.fnMoveNode)
                me.flowView.fnMoveNode(me, x, y);
        });

        this._setEventPin();
    }

    private _drawLines() {
        this.lines.forEach(line => line.render());
    }

    private _setEventPin() {
        if (!this.pinElm) return;

        let fromElm: Element;
        let toElm: Element = null;
        let startX: number, startY: number;
        let tempLine: SvgLine;
        let flowView = this.flowView;
        let me = this;

        this.pinElm.draggable().on(MouseEstr.DragStart, (evt: MouseEvent) => {
            if (!flowView.isEdit) return;

            let { x, y } = me.pinElm.rbox(me.svg);
            startX = x;
            startY = y;
            fromElm = me.self.groupElm.node;    //取node得到 dom element

            tempLine = me.svg.line(startX, startY, startX, startY)
                .addClass('xf-line off');

            flowView.drawLineStart(me.self);
        }).on(MouseEstr.DragMove, (evt: CustomEvent) => {
            if (!flowView.isEdit) return;
            evt.preventDefault();

            let { x, y } = evt.detail.box;
            let endX = x;
            let endY = y;

            tempLine.plot(startX, startY, endX, endY);

            if (isFinite(endX) && isFinite(endY)) {
                let svgRect = me.svg.node.getBoundingClientRect();
                let viewPortX = endX + svgRect.x;
                let viewPortY = endY + svgRect.y;

                let overElm:Element = document.elementsFromPoint(viewPortX, viewPortY)
                    .find((dom: Element) => dom != fromElm && (dom.classList.contains('xf-node') || dom.classList.contains('xf-end')));
                if (overElm) {
                    let elm: Element = (overElm as any).instance;    //SVG 綁定在 DOM 上的物件
                    if (toElm !== elm) {
                        if (toElm) me._markNode(toElm, false);
                        toElm = elm;
                        me._markNode(toElm, true);
                    }
                } else if (toElm) {
                    me._markNode(toElm, false);
                    toElm = null;
                }
            }
        }).on(MouseEstr.DragEnd, (evt: MouseEvent) => {
            if (!flowView.isEdit) return;

            if (toElm) {
                me._markNode(toElm, false);
                //let id = toElm.parent().node.dataset.id;
                const id = toElm.parentElement.getAttribute('data-id');
                let json = flowView.drawLineEnd(flowView.idToNode(id));
                toElm = null;

                if (flowView.fnAfterAddLine)
                    flowView.fnAfterAddLine(json);
            }
            tempLine.remove();
        });
    }

    private _markNode(elm: any, status: boolean) {
        if (status) {
            elm.node.classList.add('on');
        } else {
            elm.node.classList.remove('on');
        }
    }

    getId(): StrNum {
        return this.dto.Id;
    }

    addLine(line: FlowLine) {
        this.lines.push(line);
    }

    deleteLine(line: FlowLine) {
        let index = this.lines.findIndex((item: FlowLine) => item.dto.Id == line.dto.Id);
        this.lines.splice(index, 1);
    }

    getName(): string {
        return this.nameElm.text();
    }

    setName(name: string, drawLine: boolean) {
        let lines = _Str.replaceAll(name, '\\n', '\n').split('\n');
        this.nameElm.clear().text((add: any) => {
            lines.forEach((line, i) => {
                if (i > 0)
                    add.tspan(line).newLine().dy(this.LineHeight);
                else
                    add.tspan(line);
            });
        });

        const bbox = this.nameElm.bbox();
        let width = Math.max(this.MinWidth, bbox.width + this.PadLeft * 2 + this.PinWidth + this.PinGap * 2);
        let height = Math.max(this.MinHeight, bbox.height + this.PadTop * 2);
        this.boxElm.size(Math.round(width), Math.round(height));

        this.nameElm.center(this.boxElm.cx(), this.boxElm.cy());

        if (drawLine)
            this._drawLines();
    }
}
window.FlowNode = FlowNode;