import NodeTypeEstr from '../enum/NodeTypeEstr';
import MouseEstr from '../enum/MouseEstr';
import _Str from './_Str';
export default class FlowNode {
    constructor(flowView, json) {
        this.MinWidth = 80;
        this.MinHeight = 42;
        this.LineHeight = 18;
        this.PadTop = 8;
        this.PadLeft = 15;
        this.PinWidth = 12;
        this.PinGap = 3;
        this.NodeRadius = 20;
        this.NodeRx = 5;
        this.self = this;
        this.flowView = flowView;
        this.svg = flowView.svg;
        this.json = Object.assign({
            Name: 'Node',
            NodeType: NodeTypeEstr.Node,
            PosX: json.PosX || 100,
            PosY: json.PosY || 100,
        }, json);
        this.lines = [];
        let nodeType = this.json.NodeType;
        let cssClass = '';
        let nodeText = '';
        this.elm = this.svg
            .group()
            .attr('data-id', json.Id);
        let startEnd = this._isStartEnd();
        if (startEnd) {
            if (nodeType == NodeTypeEstr.Start) {
                cssClass = 'xf-start';
                nodeText = NodeTypeEstr.Start;
            }
            else {
                cssClass = 'xf-end';
                nodeText = NodeTypeEstr.End;
            }
            this.boxElm = this.elm.circle()
                .addClass(cssClass);
            this.boxElm.attr('r', this.NodeRadius);
            this.nameElm = this.elm.text(nodeText)
                .addClass(cssClass + '-text')
                .attr({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
        }
        else {
            nodeText = this.json.Name;
            cssClass = 'xf-node';
            this.boxElm = this.elm.rect()
                .addClass(cssClass)
                .attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'rx': this.NodeRx,
                'ry': this.NodeRx,
            });
            this.nameElm = this.elm.text('')
                .addClass(cssClass + '-text');
            this.setName(nodeText, false);
        }
        this.elm.move(this.json.PosX, this.json.PosY);
        if (nodeType != NodeTypeEstr.End) {
            this.pinElm = this.elm
                .rect(this.PinWidth, this.PinWidth)
                .addClass('xf-pin');
            this._setPinPos();
        }
        this._setEvent();
    }
    getLines() {
        return this.lines;
    }
    _isStartEnd() {
        return (this.json.NodeType == NodeTypeEstr.Start || this.json.NodeType == NodeTypeEstr.End);
    }
    getNodeType() {
        return this.json.NodeType;
    }
    getPos() {
        let elm = this.elm;
        return { x: elm.x(), y: elm.y() };
    }
    getSize() {
        let elm = this.boxElm;
        return { w: elm.width(), h: elm.height() };
    }
    getCenter() {
        let elm = this.boxElm;
        return { x: elm.cx(), y: elm.cy() };
    }
    _setPinPos() {
        if (!this.pinElm)
            return;
        let bbox = this.nameElm.bbox();
        let center = this.getCenter();
        this.pinElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
    }
    _setEvent() {
        let me = this;
        let flowView = this.flowView;
        this.elm.node.addEventListener(MouseEstr.RightMenu, function (e) {
            e.preventDefault();
            if (flowView.fnShowMenu)
                flowView.fnShowMenu(e, true, me);
        });
        this.elm.draggable().on(MouseEstr.DragMove, function (e) {
            if (!flowView.isEdit)
                return;
            me._drawLines();
        }).on(MouseEstr.DragEnd, function (e) {
            if (!flowView.isEdit)
                return;
            let { x, y } = e.detail.box;
            if (me.flowView.fnMoveNode)
                me.flowView.fnMoveNode(me, x, y);
        });
        this._setEventPin();
    }
    _drawLines() {
        this.lines.forEach(line => line.render());
    }
    _setEventPin() {
        if (!this.pinElm)
            return;
        let fromDom, startX, startY;
        let tempLine;
        let toElm = null;
        let me = this;
        let flowView = this.flowView;
        this.pinElm.draggable().on(MouseEstr.DragStart, (event) => {
            if (!flowView.isEdit)
                return;
            let { x, y } = me.pinElm.rbox(me.svg);
            startX = x;
            startY = y;
            fromDom = me.self.elm.node;
            tempLine = me.svg.line(startX, startY, startX, startY)
                .addClass('xf-line off');
            flowView.drawLineStart(me.self);
        }).on(MouseEstr.DragMove, (event) => {
            if (!flowView.isEdit)
                return;
            event.preventDefault();
            let { x, y } = event.detail.box;
            let endX = x;
            let endY = y;
            tempLine.plot(startX, startY, endX, endY);
            if (isFinite(endX) && isFinite(endY)) {
                let svgRect = me.svg.node.getBoundingClientRect();
                let viewPortX = endX + svgRect.x;
                let viewPortY = endY + svgRect.y;
                let overDom = document.elementsFromPoint(viewPortX, viewPortY)
                    .find((dom) => dom != fromDom && (dom.classList.contains('xf-node') || dom.classList.contains('xf-end')));
                if (overDom) {
                    let overElm = overDom.instance;
                    if (toElm !== overElm) {
                        if (toElm)
                            me._markNode(toElm, false);
                        toElm = overElm;
                        me._markNode(toElm, true);
                    }
                }
                else if (toElm) {
                    me._markNode(toElm, false);
                    toElm = null;
                }
            }
        }).on(MouseEstr.DragEnd, (event) => {
            if (!flowView.isEdit)
                return;
            if (toElm) {
                me._markNode(toElm, false);
                let id = toElm.parent().node.dataset.id;
                let json = flowView.drawLineEnd(flowView.idToNode(id));
                toElm = null;
                if (flowView.fnAfterAddLine)
                    flowView.fnAfterAddLine(json);
            }
            tempLine.remove();
        });
    }
    _markNode(elm, status) {
        if (status) {
            elm.node.classList.add('on');
        }
        else {
            elm.node.classList.remove('on');
        }
    }
    getId() {
        return this.json.Id;
    }
    addLine(line) {
        this.lines.push(line);
    }
    deleteLine(line) {
        let index = this.lines.findIndex((item) => item.Id == line.Id);
        this.lines.splice(index, 1);
    }
    getName() {
        return this.nameElm.text();
    }
    setName(name, drawLine) {
        let lines = _Str.replaceAll(name, '\\n', '\n').split('\n');
        this.nameElm.clear().text((add) => {
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
