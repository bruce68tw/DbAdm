import MouseEstr from '../enum/MouseEstr';
import FlowView from './FlowView';
import FlowNode from './FlowNode';

export default class FlowLine {
    private readonly MaxCntCnt1 = 6;
    private readonly MinSideCnt2 = 16;
    private readonly MinCntCnt3 = 20;
    private readonly MinSideSide13 = 12;
    private readonly ArrowLen = 10;
    private readonly ArrowWidth = 5;

    private readonly FromTypeAuto = 'A';
    private readonly FromTypeV = 'V';
    private readonly FromTypeH = 'H';

    public flowView: FlowView;
    public json: Json;
    public svg: any;
    public fromNode: FlowNode;
    public toNode: FlowNode;
    public path: any;
    public path2: any;
    public labelElm: any;
    public arrow: any;
    
    public fromType!: string;
    public isFromTypeV!: boolean;
    public isFromTypeH!: boolean;

    constructor(flowView: FlowView, json: Json, fromNode?: FlowNode, toNode?: FlowNode) {
        json = json || {};
        json.FromType = json.FromType || this.FromTypeAuto;
        json.Label = json.Label || '';
        json.Id = json.Id || flowView.getNewLineId();

        this.flowView = flowView;
        this.json = json;
        this.svg = flowView.svg;
        this.fromNode = fromNode || this.flowView.idToNode(json.FromNodeId);
        this.toNode = toNode || this.flowView.idToNode(json.ToNodeId);

        this.path = this.svg.path('')
            .attr('data-id', json.Id)
            .addClass('xf-line');
            
        this.path2 = this.svg.path('')
            .attr('data-id', json.Id)
            .fill('none')
            .stroke({ width: 10, color: 'transparent' })
            .attr({ 'pointer-events': 'stroke', 'cursor': 'pointer' });

        this.labelElm = this.svg.text(json.Label)
            .addClass('xf-line-text')
            .font({ anchor: 'middle' });

        this.arrow = this.svg.path('').addClass('xf-arrow');

        this._setFromTypeVars(json.FromType);

        this.fromNode.addLine(this);
        this.toNode.addLine(this);
        this._setEvent();
        this.render();
    }

    private _setFromTypeVars(fromType: string): void {
        fromType = fromType || this.FromTypeAuto;
        this.fromType = fromType;
        this.isFromTypeV = (fromType === this.FromTypeV);
        this.isFromTypeH = (fromType === this.FromTypeH);
        
        const dom = this.path.node as Elm;
        if (fromType === this.FromTypeAuto) {
            dom.classList.remove('xf-way');
        } else {
            dom.classList.add('xf-way');
        }
    }

    private _setEvent(): void {
        this.path2.node.addEventListener(MouseEstr.RightMenu, (event: MouseEvent) => {
            event.preventDefault();
            if (this.flowView.fnShowMenu) {
                this.flowView.fnShowMenu(event, false, this);
            }
        });
    }

    public setLabel(label: string): void {
        this.labelElm.text(label);
    }

    public render(): void {
        const fromPos = this.fromNode.getPos();
        const fromSize = this.fromNode.getSize();
        const fromCnt = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h / 2 };
        const fromUp = { x: fromPos.x + fromSize.w / 2, y: fromPos.y };
        const fromDown = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h };
        const fromLeft = { x: fromPos.x, y: fromPos.y + fromSize.h / 2 };
        const fromRight = { x: fromPos.x + fromSize.w, y: fromPos.y + fromSize.h / 2 };

        const toPos = this.toNode.getPos();
        const toSize = this.toNode.getSize();
        const toCnt = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h / 2 };
        const toUp = { x: toPos.x + toSize.w / 2, y: toPos.y };
        const toDown = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h };
        const toLeft = { x: toPos.x, y: toPos.y + toSize.h / 2 };
        const toRight = { x: toPos.x + toSize.w, y: toPos.y + toSize.h / 2 };

        const isToRight = toCnt.x > fromCnt.x;
        const isToDown = toCnt.y > fromCnt.y;

        const cntCntSize = { w: Math.abs(fromCnt.x - toCnt.x), h: Math.abs(fromCnt.y - toCnt.y) };

        const isMaxCntCnt1H = cntCntSize.w <= this.MaxCntCnt1;
        const isMaxCntCnt1V = cntCntSize.h <= this.MaxCntCnt1;

        const isMinSideCnt2H = cntCntSize.w - fromSize.w / 2 >= this.MinSideCnt2;
        const isMinSideCnt2V = cntCntSize.h - toSize.h / 2 >= this.MinSideCnt2;
        const isMinCntSide2H = cntCntSize.w - toSize.w / 2 >= this.MinSideCnt2;
        const isMinCntSide2V = cntCntSize.h - fromSize.h / 2 >= this.MinSideCnt2;

        const sideSideH = (isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x);
        const sideSideV = (isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y);

        const isMinSideSide1H = sideSideH >= this.MinSideSide13;
        const isMinSideSide1V = sideSideV >= this.MinSideSide13;
        const isMinSideSide3H = sideSideH >= this.MinSideSide13 * 2;
        const isMinSideSide3V = sideSideV >= this.MinSideSide13 * 2;
        const isMinCntCnt3H = (isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x) >= this.MinCntCnt3;
        const isMinCntCnt3V = (isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y) >= this.MinCntCnt3;

        let fromPnt, toPnt;
        let points: any[];
        let textStartAry = 0;

        if (!this.isFromTypeH && isMaxCntCnt1H && isMinSideSide1V) {
            fromPnt = isToDown ? fromDown : fromUp;
            toPnt = isToDown ? toUp : toDown;
            points = [fromPnt, { x: fromPnt.x, y: toPnt.y }];
        } else if (!this.isFromTypeV && isMaxCntCnt1V && isMinSideSide1H) {
            fromPnt = isToRight ? fromRight : fromLeft;
            toPnt = isToRight ? toLeft : toRight;
            points = [fromPnt, { x: toPnt.x, y: fromPnt.y }];
        } else if (!this.isFromTypeV && isMinSideCnt2H && isMinCntSide2V) {
            fromPnt = isToRight ? fromRight : fromLeft;
            toPnt = isToDown ? toUp : toDown;
            points = [fromPnt, { x: toPnt.x, y: fromPnt.y }, toPnt];
            textStartAry = 1;
        } else if (!this.isFromTypeH && isMinSideCnt2V && isMinCntSide2H) {
            fromPnt = isToDown ? fromDown : fromUp;
            toPnt = isToRight ? toLeft : toRight;
            points = [fromPnt, { x: fromPnt.x, y: toPnt.y }, toPnt];
        } else if (!this.isFromTypeH && isMinSideSide3V && isMinCntCnt3V) {
            fromPnt = isToDown ? fromDown : fromUp;
            toPnt = isToDown ? toUp : toDown;
            let midY = (fromPnt.y + toPnt.y) / 2;
            points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
        } else if (!this.isFromTypeV && isMinSideSide3H && isMinCntCnt3H) {
            fromPnt = isToRight ? fromRight : fromLeft;
            toPnt = isToRight ? toLeft : toRight;
            let midX = (fromPnt.x + toPnt.x) / 2;
            points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
            textStartAry = 1;
        } else if (!this.isFromTypeH && isMinCntCnt3H) {
            let midY = isToDown ? Math.max(fromDown.y, toDown.y) + this.MinSideSide13 : Math.min(fromUp.y, toUp.y) - this.MinSideSide13;
            fromPnt = isToDown ? fromDown : fromUp;
            toPnt = isToDown ? toDown : toUp;
            points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
        } else if (!this.isFromTypeV && isMinCntCnt3V) {
            let midX = isToRight ? Math.max(fromRight.x, toRight.x) + this.MinSideSide13 : Math.min(fromLeft.x, toLeft.x) - this.MinSideSide13;
            fromPnt = isToRight ? fromRight : fromLeft;
            toPnt = isToRight ? toRight : toLeft;
            points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
            textStartAry = 1;
        } else {
            if (isToDown) {
                fromPnt = !this.isFromTypeH ? fromDown : (isToRight ? fromRight : fromLeft);
                toPnt = isToRight ? toLeft : toRight;
            } else {
                fromPnt = !this.isFromTypeH ? fromUp : (isToRight ? fromRight : fromLeft);
                toPnt = isToRight ? toLeft : toRight;
            }
            points = [fromPnt, toPnt];
        }

        this._drawLine(points);
        this.labelElm.center((points[textStartAry].x + points[textStartAry + 1].x) / 2,
            (points[textStartAry].y + points[textStartAry + 1].y) / 2);
    }

    private _drawLine(points: any[]): void {
        let pathStr = `M ${points[0].x} ${points[0].y}`;
        const pntLen = points.length;
        const radius = this.MaxCntCnt1;

        for (let i = 1; i < pntLen; i++) {
            const prevPnt = points[i - 1];
            const nowPnt = points[i];

            if (i < pntLen - 1) {
                const nextPnt = points[i + 1];
                const vec1 = { x: nowPnt.x - prevPnt.x, y: nowPnt.y - prevPnt.y };
                const vec2 = { x: nextPnt.x - nowPnt.x, y: nextPnt.y - nowPnt.y };
                const len1 = Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2));
                const len2 = Math.sqrt(Math.pow(vec2.x, 2) + Math.pow(vec2.y, 2));
                const unitVec1 = { x: vec1.x / len1, y: vec1.y / len1 };
                const unitVec2 = { x: vec2.x / len2, y: vec2.y / len2 };

                const arcStartX = nowPnt.x - unitVec1.x * radius;
                const arcStartY = nowPnt.y - unitVec1.y * radius;
                const arcEndX = nowPnt.x + unitVec2.x * radius;
                const arcEndY = nowPnt.y + unitVec2.y * radius;

                pathStr += ` L ${arcStartX} ${arcStartY}`;
                const cross = unitVec1.x * unitVec2.y - unitVec1.y * unitVec2.x;
                const sweepFlag = cross < 0 ? 0 : 1;
                pathStr += ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`;
            } else {
                pathStr += ` L ${nowPnt.x} ${nowPnt.y}`;
            }
        }

        this.path.plot(pathStr);
        this.path2.plot(pathStr);
        this._drawArrow(points[pntLen - 2], points[pntLen - 1]);
    }

    private _drawArrow(fromPnt: any, toPnt: any): void {
        const angle = Math.atan2(toPnt.y - fromPnt.y, toPnt.x - fromPnt.x);
        const arrowPnt1 = {
            x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle - Math.PI / 2),
            y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle - Math.PI / 2)
        };
        const arrowPnt2 = {
            x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle + Math.PI / 2),
            y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle + Math.PI / 2)
        };

        this.arrow.plot(`M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
    }

    public getId(): string {
        return this.json.Id;
    }

    public getFromType(): string {
        return this.json.FromType;
    }

    public setFromType(fromType: string): void {
        if (fromType === this.json.FromType) return;
        this._setFromTypeVars(fromType);
        this.render();
    }
}