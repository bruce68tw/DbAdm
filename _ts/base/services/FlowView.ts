import _Str from "./_Str";
import EstrMouse from "./EstrMouse";
import EstrNodeType from "./EstrNodeType";

/**
 * FlowBase -> FlowView
 * 建立 FlowView 簡化外部程式, 考慮模組化, 所以不使用jQuery
 * 自定函數如下(由flow內部觸發):
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAfterAddLine(json): when add line
 * void fnShowMenu(isNode, flowItem, event);
 * void fnAfterMoveLineEnd(oldNode, newNode): after drop line end point
 */
//控制 FlowNode、FlowLine for 外部程式
export default class FlowView {	

	/**
	 屬性:
	 //boxElm: box element
	 svg: any; // SVG.js instance
	 nodes: FlowNode[];
	 lines: FlowLine[];
	 fromNode: FlowNode | null; // drap start node
	 onMoveNode: ((node: FlowNode, x: number, y: number) => void) | null; // event onMoveNode(node)
	*/

	// 新node/line Id, 自動累加
	private newNodeId: number = 0;		// for node type
	private newLineId: number = 0;

	// 是否可編輯
	public isEdit: boolean = false;

	// SVG.js instance
	public svg: any; 
	// The node where a line drag starts
	public fromNode: FlowNode | null;
	// Array of all nodes
	public nodes: FlowNode[] = [];
	// Array of all lines
	public lines: FlowLine[] = [];

	// Custom functions (provided by external program)
	public fnMoveNode: ((node: FlowNode, x: number, y: number) => void) | null;
	public fnAfterAddLine: ((json: any) => void) | null;
	public fnShowMenu: ((event: Event, isNode: boolean, flowItem: FlowNode | FlowLine) => void) | null;
	public fnAfterMoveLineEnd: ((oldNode: FlowNode, newNode: FlowNode) => void) | null;

	constructor(boxId: string) {
		let boxDom = document.getElementById(boxId);
		if (!boxDom) {
			throw new Error(`Element with id ${boxId} not found.`);
		}
		// Assuming SVG() is a global function from the SVG.js library
		// @ts-ignore
		this.svg = SVG().addTo(boxDom).size('100%', '100%');
		//this.svg.node.style.zIndex = 100;	//在eform上面!! 無效 !!

		this.fnMoveNode = null;
		this.fnAfterAddLine = null;
		this.fnShowMenu = null;
		this.fromNode = null;
		//this._reset();
	}

	/*
	newNodeId() {
		this.newNodeId++;
		return this.newNodeId;
	}
	*/

	//get new node id
	public getNewNodeId(): number {
		this.newNodeId++;
		return this.newNodeId;
	}

	//由元件內部發動, 所以必須提供此功能
	public getNewLineId(): number {
		this.newLineId++;
		return this.newLineId;
	}

	public setEdit(status: boolean): void {
		this.isEdit = status;
	}

	//清除全部UI元件
	public reset(): void {
		this.nodes = [];
		this.lines = [];
		this.fromNode = null;

		//刪除 svg 裡面的全部子元素
		Array.from(this.svg.node.childNodes).forEach((node: ChildNode) => {
			node.remove();
		});
	}

	//載入nodes & lines
	public loadNodes(rows: any[]): void {
		this.reset();
		for (let i = 0; i < rows.length; i++)
			this.addNode(rows[i]);
	}

	public loadLines(rows: any[] | null): void {
		if (rows != null) {
			for (let i = 0; i < rows.length; i++)
				this.addLine(rows[i]);
		}
	}

	public addNode(json: any): FlowNode {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.nodes.length + 1) * (-1);
		let node: FlowNode = new FlowNode(this, json);
		this.nodes.push(node);
		return node;
	}
	
	public addLine(json: any): FlowLine {
		return new FlowLine(this, json);
	}
	
	public deleteNode(node: FlowNode): void {
		let id: string | number = node.getId();
		// Find the group element with the data-id attribute and remove it
		this.svg.findOne(`g[data-id="${id}"]`).remove();
	}
	
	public deleteLine(line: FlowLine): void {
		let id: string | number = line.getId();
		// Remove path and path2 (they share the same data-id)
		this.svg.find(`path[data-id="${id}"]`).remove();	//含path2(data-id相同)
	}
	
	public drawLineStart(fromNode: FlowNode): void {
		this.fromNode = fromNode;
	}

	//return new line json
	public drawLineEnd(toNode: FlowNode): any {
		if (!this.fromNode) {
			throw new Error("drawLineStart must be called before drawLineEnd");
		}
		let json: any = {
			Id: this.newLineId,
			FromNodeId: this.fromNode.getId(),
			ToNodeId: toNode.getId(),
		};
		new FlowLine(this, json, this.fromNode, toNode);
		this.fromNode = null;
		return json;
	}
	
	public idToNode(id: string | number): FlowNode | undefined {
		//elm.node 指向dom
		return this.nodes.find(node => node.getId() == id);
	}

	//check has startNode or not
	public hasStartNode(): boolean {
		//some 用法類似 c# any()
		return this.nodes.some(node => node.getNodeType() == EstrNodeType.Start);
	}
} //class FlowView

// Helper type for coordinates
type Point = { x: number, y: number };

/**
  流程節點
  屬性:
    self: this
    flowView: FlowView object
    svg: flowView.svg
    json: node json, 欄位與後端XgFlowE相同: Id(不變), NodeType(不變), Name, PosX, PosY, Width, Height
    elm: svg group element(與 html element不同)
    boxElm: border element (circle or rect)
    nameElm: text element
    pinElm: pin element (rect)
    lines: 進入/離開此節點的流程線
    width: width
    height: height
  param flowView {FlowView} FlowView
  param json {any} 流程節點資料
 */ 
export class FlowNode {

	// normal node size constants
	private readonly MinWidth: number = 80;
	private readonly MinHeight: number = 42;
	private readonly LineHeight: number = 18;	//文字行高
	private readonly PadTop: number = 8;
	private readonly PadLeft: number = 15;
	private readonly PinWidth: number = 12;
	private readonly PinGap: number = 3;

	private self: FlowNode;
	private flowView: FlowView;
	private svg: any;
	public json: any;
	public elm: any; // svg group element
	private boxElm: any; // border element (rect or circle)
	private nameElm: any; // text element
	private pinElm: any; // pin element (rect)
	public lines: FlowLine[]; // 進入/離開此節點的流程線

	/**
	 * @param flowView FlowView
	 * @param json 流程節點資料
	 */ 
	constructor(flowView: FlowView, json: any) {
		this.self = this;
		this.flowView = flowView;
		this.svg = flowView.svg;
		this.json = Object.assign({
			Name: 'Node',
			NodeType: EstrNodeType.Node,
			PosX: json.PosX || 100,
			PosY: json.PosY || 100,
			//Width: 100,	//??
			//Height: 50,	//??
		}, json);

		//set instance variables
		this.lines = [];

		const nodeType: EstrNodeType = this.json.NodeType;
		let cssClass: string = '';
		let nodeText: string = '';

		// 建立一個 group(有x,y, 沒有大小, 含文字的節點框線), 才能控制文字拖拉
		this.elm = this.svg
			.group()
			.attr('data-id', json.Id)

		const startEnd: boolean = this._isStartEnd();
		if (startEnd) {
			if (nodeType == EstrNodeType.Start) {
				cssClass = 'xf-start';
				nodeText = EstrNodeType.Start;
			} else {
				cssClass = 'xf-end';
				nodeText = EstrNodeType.End;
			}

			//circle大小不填, 由css設定, 這時radius還沒確定, 不能move(因為會用到radius)
			this.boxElm = this.elm.circle()
				.addClass(cssClass);

			//移動circle時會參考radius, 所以先更新, 從css讀取radius, 而不是從circle建立的屬性 !!
			let style: CSSStyleDeclaration = window.getComputedStyle(this.boxElm.node);	//不能直接讀取circle屬性
			let radius: number = parseFloat(style.getPropertyValue('r'));	//轉浮點
			this.boxElm.attr('r', radius);	//reset radius

			//起迄節點不會改變文字和大小, 直接設定
			this.nameElm = this.elm.text(nodeText)
				.addClass(cssClass + '-text')
				.attr({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }); //水平垂直置中

			//this.nameElm.center(radius, radius);

			//let width = radius * 2;
			//this.boxElm.size(width, width);
			//this.width = width;		//寫入width, 供後面計算位置
			//this.height = width;	//畫流程線時會用到
		} else {
			nodeText = this.json.Name;
			cssClass = 'xf-node';
			this.boxElm = this.elm.rect()
				.addClass(cssClass)
				.attr({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }); //水平垂直置中
			//.move(this.json.PosX, this.json.PosY);

			this.nameElm = this.elm.text('')
				.addClass(cssClass + '-text');
			//.font({ anchor: 'middle' })
			//.attr({ 'text-anchor': 'middle' }); // 確保對齊生效

			//一般節點依文字內容自動調整大小
			this.setName(nodeText, false);
		}

		this.elm.move(this.json.PosX, this.json.PosY);

		//add 連接點小方塊(pin) if need(在文字右側)
		if (nodeType != EstrNodeType.End) {
			this.pinElm = this.elm
				.rect(this.PinWidth, this.PinWidth)
				.addClass('xf-pin');
			this._setPinPos();
		}

		this._setEvent();
	}

	public getLines(): FlowLine[] {
		return this.lines;
	}

	//是否為起迄節點
	private _isStartEnd(): boolean {
		return (this.json.NodeType == EstrNodeType.Start || this.json.NodeType == EstrNodeType.End);
	}

	public getNodeType(): EstrNodeType {
		return this.json.NodeType;
	}

	public getPos(): Point {
		let elm: any = this.elm;
		return { x: elm.x(), y: elm.y() };
	}

	public getSize(): { w: number, h: number } {
		let elm: any = this.boxElm;
		return { w: elm.width(), h: elm.height() };
	}

	public getCenter(): Point {
		let elm: any = this.boxElm;
		return { x: elm.cx(), y: elm.cy() };
	}

	//set pin position
	private _setPinPos(): void {
		//連接點 右移3px
		if (!this.pinElm) return;

		let bbox: any = this.nameElm.bbox();
		let center: Point = this.getCenter();
		// pin move to the right side of the text bounding box, offset by 3px
		this.pinElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
	}

	//node event
	private _setEvent(): void {
		//enable right click menu
		let me: FlowNode = this;	//FlowNode
		let flowView: FlowView = this.flowView;

		this.elm.node.addEventListener('contextmenu', function (e: Event) {
			e.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (flowView.fnShowMenu)
				flowView.fnShowMenu(e, true, me);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		//draggable 來自 svg.draggable.js
		this.elm.draggable().on(EstrMouse.DragMove, function (e: CustomEvent) {
			if (!flowView.isEdit) return;

			me._drawLines();
		}).on(EstrMouse.DragEnd, function (e: CustomEvent) {
			if (!flowView.isEdit) return;

			let { x, y } = e.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (me.flowView.fnMoveNode)
				me.flowView.fnMoveNode(me, x, y);
		});

		//set connector draggable
		this._setEventPin();
	}

	private _drawLines(): void {
		this.lines.forEach(line => line.render());
	}

	//set event of node connector
	//pin表示起始節點內的連接點
	private _setEventPin(): void {
		if (!this.pinElm)
			return;

		let fromDom: HTMLElement;
		let startX: number, startY: number;
		let tempLine: any;
		let toElm: any = null;
		let me: FlowNode = this;	//flowNode
		let flowView: FlowView = this.flowView;

		// 啟用 pinElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pinElm !!
		this.pinElm.draggable().on(EstrMouse.DragStart, (event: CustomEvent) => {
			if (!flowView.isEdit) return;

			// 初始化線條
			// @ts-ignore
			let { x, y } = me.pinElm.rbox(me.svg); // 使用SVG畫布的座標系
			startX = x;
			startY = y;
			fromDom = me.self.elm.node;	//this.self指向這個FlowNode

			tempLine = me.svg.line(startX, startY, startX, startY)
				.addClass('xf-line off');

			flowView.drawLineStart(me.self);

		}).on(EstrMouse.DragMove, (event: CustomEvent) => {
			if (!flowView.isEdit) return;

			//阻止 connector 移動
			event.preventDefault();

			// 獲取拖拽的目標座標（相對於 SVG 畫布）
			let { x, y } = event.detail.box;
			let endX: number = x;
			let endY: number = y;

			// 更新線條的終點
			tempLine.plot(startX, startY, endX, endY);

			// 檢查座標值是否有效
			if (isFinite(endX) && isFinite(endY)) {
				// 將 SVG 座標轉換為檢視座標
				let svgRect: DOMRect = me.svg.node.getBoundingClientRect();
				let viewPortX: number = endX + svgRect.x;
				let viewPortY: number = endY + svgRect.y;

				// 檢查是否懸停在節點上
				let overDom: Element | undefined = document.elementsFromPoint(viewPortX, viewPortY)
					.find(dom => dom != fromDom && (dom.classList.contains('xf-node') || dom.classList.contains('xf-end')));
				if (overDom) {
					// @ts-ignore
					let overElm: any = overDom.instance;	//svg element
					if (toElm !== overElm) {
						if (toElm)
							me._markNode(toElm, false);
						toElm = overElm;
						me._markNode(toElm, true);
					}
				} else if (toElm) {
					me._markNode(toElm, false);
					toElm = null;
				}
			}

		}).on(EstrMouse.DragEnd, (event: CustomEvent) => {
			if (!flowView.isEdit) return;

			// 檢查座標值是否有效
			if (toElm) {
				me._markNode(toElm, false);
				// @ts-ignore
				let id: string = toElm.parent().node.dataset.id;
				let json: any = flowView.drawLineEnd(flowView.idToNode(id) as FlowNode);
				toElm = null;

				//trigger event
				if (flowView.fnAfterAddLine)
					flowView.fnAfterAddLine(json);
			}
			tempLine.remove();
		});
	}

	//high light node
	private _markNode(elm: any, status: boolean): void {
		if (status) {
			elm.node.classList.add('on');
		} else {
			elm.node.classList.remove('on');
		}
	}

	//id記錄在 group elm !!
	public getId(): string | number {
		return this.json.Id;
	}

	public addLine(line: FlowLine): void {
		this.lines.push(line);
	}

	public deleteLine(line: FlowLine): void {
		let index: number = this.lines.findIndex(item => item.json.Id == line.json.Id);
		if (index > -1) {
			this.lines.splice(index, 1);
		}
	}

	public getName(): string {
		return this.nameElm.text();
	}

	/**
	 * set node name only for TypeNode, 考慮多行
	 * called by initial, 前端改變node name
	 * @param name {string} 
	 * @param drawLine {boolean} re-draw line or not
	 */ 
	public setName(name: string, drawLine: boolean): void {
		// 更新文字內容, 後端傳回會加上跳脫字元, js 2021才有 replaceAll, 所以自製
		// @ts-ignore
		let lines: string[] = _Str.replaceAll(name, '\\n', '\n').split('\n');
		this.nameElm.clear().text(function (add: any) {
			lines.forEach((line, i) => {
				if (i > 0)
					add.tspan(line).newLine().dy(this.LineHeight);
				else
					add.tspan(line);
			});
		});

		// 獲取新文字尺寸
		const bbox: any = this.nameElm.bbox();

		// 更新矩形尺寸
		let width: number = Math.max(this.MinWidth, bbox.width + this.PadLeft * 2 + this.PinWidth + this.PinGap * 2);
		let height: number = Math.max(this.MinHeight, bbox.height + this.PadTop * 2);
		this.boxElm.size(Math.round(width), Math.round(height));

		// 重新居中文字
		this.nameElm.center(this.boxElm.cx(), this.boxElm.cy());
		
		// Re-set pin position since node size and center might have changed
		this._setPinPos();

		if (drawLine)
			this._drawLines();
	}
}//class FlowNode

//相關名詞使用 fromNode/toNode 比較合理
/**
  屬性:
    flowView: FlowView object
    json: flowLine json, 欄位與後端XgFlowE相同: Id(不變), FromNodeId, ToNodeId, FromType(不變), Label
    svg: svg
    path: line path
    path2: for right menu
	arrow: 末端箭頭
	labelElm: 顯示label
    fromNode: from node
    toNode: to node
    //fromType: 起點位置, A(auto),V(上下),H(左右)
    //label: 流程線上的文字, 一般是執行條件
    //isFromTypeAuto:
    isFromTypeV: boolean
    isFromTypeH: boolean
  @param flowView {FlowView}
  @param json {any} flowLine 組態 for initial
  @param fromNode {FlowNode?} 如果有值則使用此節點
  @param toNode {FlowNode?} 同 fromNode
*/

export class FlowLine {

	// Cnt:中心點, Side:節點邊界, 數值20大約1公分
	// MaxCntCnt1: 中心點到中心點的最大距離 for 1線段 (表示在同一水平/垂直位置), 同時用於折線圓角半徑
	private readonly MaxCntCnt1: number = 6;
	// MinSideCnt2: 邊到中心的最小距離 for 2線段
	private readonly MinSideCnt2: number = 16;
	// MinCntCnt3: 中心點到中心點的最小距離 for 3線段 (2節點的最小距離, 大於此值可建立line(1,3線段))
	private readonly MinCntCnt3: number = 20;
	// MinSideSide13: 邊到邊的最小距離 for 1,3線段 (3線段以2倍距離判斷)
	private readonly MinSideSide13: number = 12;

	// 末端箭頭
	private readonly ArrowLen: number = 10; 	// 長度
	private readonly ArrowWidth: number = 5; 	// 寬度	

	// line type, 起點位置
	private readonly FromTypeAuto: string = 'A';	// 自動
	private readonly FromTypeV: string = 'V';	// 垂直(上下)
	private readonly FromTypeH: string = 'H';	// 水平(左右)
	
	private flowView: FlowView;
	public json: any;
	private svg: any;
	private path: any; // line path
	private path2: any; // for right menu click area
	private arrow: any; // 末端箭頭
	private labelElm: any; // 顯示label
	private fromNode: FlowNode;
	private toNode: FlowNode;
	public fromType: string;
	public isFromTypeV: boolean;
	public isFromTypeH: boolean;

	constructor(flowView: FlowView, json: any, fromNode?: FlowNode, toNode?: FlowNode) {
		
		json = json || {};
		json.FromType = json.FromType || this.FromTypeAuto;
		json.Label = json.Label || '';
		json.Id = json.Id || flowView.getNewLineId();

		//#region set instance variables
		this.flowView = flowView;
		this.json = json;
		this.svg = flowView.svg;
		this.fromNode = fromNode || this.flowView.idToNode(json.FromNodeId) as FlowNode;
		this.toNode = toNode || this.flowView.idToNode(json.ToNodeId) as FlowNode;
		//this.label = label || '';

		//path
		this.path = this.svg.path('')
			.attr('data-id', json.Id)
			.addClass('xf-line');
		// 透明的寬線作為觸發區域（放在下面）
		this.path2 = this.svg.path('')
			.attr('data-id', json.Id)
			.fill('none')
			.stroke({ width: 10, color: 'transparent' }) // 注意：透明但可接收事件
			.attr({ 'pointer-events': 'stroke', 'cursor': 'pointer' });       // 只針對 stroke 有事件

		//label
		this.labelElm = this.svg.text(json.Label)
			.addClass('xf-line-text')
			.font({ anchor: 'middle' });

		// 用來儲存箭頭的路徑
		this.arrow = this.svg.path('').addClass('xf-arrow');
		//this.arrow2 = this.svg.path('').addClass('xf-arrow');

		this.fromType = ''; // Initialized in _setFromTypeVars
		this.isFromTypeV = false; // Initialized in _setFromTypeVars
		this.isFromTypeH = false; // Initialized in _setFromTypeVars

		this._setFromTypeVars(json.FromType);
		//#endregion

		//add line to from/to node
		this.fromNode.addLine(this);
		this.toNode.addLine(this);
		this._setEvent();
		this.render();
	}

	private _setFromTypeVars(fromType: string): void {
		fromType = fromType || this.FromTypeAuto;
		this.json.FromType = fromType; // Update json too
		this.fromType = fromType;
		this.isFromTypeV = (fromType == this.FromTypeV);
		this.isFromTypeH = (fromType == this.FromTypeH);
		//this.isFromTypeAuto = (!this.isFromTypeV && !this.isFromTypeH) || (fromType == this.FromTypeAuto);
		let dom: HTMLElement = this.path.node;
		if (fromType == this.FromTypeAuto)
			dom.classList.remove('xf-way');
		else
			dom.classList.add('xf-way');
	}

	private _setEvent(): void {
		let me: FlowLine = this;	//FlowLine
		this.path2.node.addEventListener('contextmenu', function (event: Event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (me.flowView.fnShowMenu)
				me.flowView.fnShowMenu(event, false, me);
		});
	}

	/*
	//?? from text element
	getLabel() {
		return this.label;
	}
	*/

	public setLabel(label: string): void {
		this.labelElm.text(label);
	}

	/**
	 * 依次考慮使用1線段、2線段、3線段
	 * public for FlowView.js
	 */
	public render(): void {

		//#region 計算流程線render位置
		//=== from Node ===
		// 位置和尺寸, x/y為左上方座標
		const fromPos: Point = this.fromNode.getPos();
		const fromSize: { w: number, h: number } = this.fromNode.getSize();
		const fromCnt: Point = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h / 2 };
		// 四個邊的中間點
		const fromUp: Point = { x: fromPos.x + fromSize.w / 2, y: fromPos.y }; // 上邊中點
		const fromDown: Point = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h };
		const fromLeft: Point = { x: fromPos.x, y: fromPos.y + fromSize.h / 2 };
		const fromRight: Point = { x: fromPos.x + fromSize.w, y: fromPos.y + fromSize.h / 2 };

		//=== to Node ===
		const toPos: Point = this.toNode.getPos();
		const toSize: { w: number, h: number } = this.toNode.getSize();
		const toCnt: Point = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h / 2 };
		// 四個邊的中間點
		const toUp: Point = { x: toPos.x + toSize.w / 2, y: toPos.y };
		const toDown: Point = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h };
		const toLeft: Point = { x: toPos.x, y: toPos.y + toSize.h / 2 };
		const toRight: Point = { x: toPos.x + toSize.w, y: toPos.y + toSize.h / 2 };

		/** ToNode 在右邊 */
		const isToRight: boolean = toCnt.x > fromCnt.x; 	// toNode 在 fromNode 的右側
		/** ToNode 在下面 */
		const isToDown: boolean = toCnt.y > fromCnt.y; 	// toNode 在 fromNode 的下方

		//計算2個中心點距離
		const cntCntSize: { w: number, h: number } = { w: Math.abs(fromCnt.x - toCnt.x), h: Math.abs(fromCnt.y - toCnt.y) };

		/** 是否符合2中心點之間最小(水平)距離 for 1線段 */
		const isMaxCntCnt1H: boolean = cntCntSize.w <= this.MaxCntCnt1;
		/** 是否符合2中心點之間最小(垂直)距離 for 1線段 */
		const isMaxCntCnt1V: boolean = cntCntSize.h <= this.MaxCntCnt1;

		/** 是否符合起迄點邊線-中心點之間最小距離(水平方向) for 2線段 */
		// (abs distance) - (half from node width) >= MinSideCnt2
		const isMinSideCnt2H: boolean = cntCntSize.w - fromSize.w / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點邊線-中心點之間最小距離(垂直方向) for 2線段 */
		// (abs distance) - (half to node height) >= MinSideCnt2
		const isMinSideCnt2V: boolean = cntCntSize.h - toSize.h / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點中心點-邊線之間最小距離(水平方向) for 2線段 */
		// (abs distance) - (half to node width) >= MinSideCnt2
		const isMinCntSide2H: boolean = cntCntSize.w - toSize.w / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點中心點-邊線之間最小距離(垂直方向) for 2線段 */
		// (abs distance) - (half from node height) >= MinSideCnt2
		const isMinCntSide2V: boolean = cntCntSize.h - fromSize.h / 2 >= this.MinSideCnt2;

		// Side to Side distance (actual gap between nodes)
		const sideSideH: number = isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x;
		const sideSideV: number = isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y;

		/** 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向 */
		const isMinCntCnt3H: boolean = sideSideH >= this.MinCntCnt3;
		/** 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向 */
		const isMinCntCnt3V: boolean = sideSideV >= this.MinCntCnt3;

		/** 是否符合邉-邊(水平)最小距離, for 1線段 */
		const isMinSideSide1H: boolean = sideSideH >= this.MinSideSide13;
		/** 是否符合邉-邊(垂直)最小距離, for 1線段 */
		const isMinSideSide1V: boolean = sideSideV >= this.MinSideSide13;

		/** 是否符合邉-邊(水平)最小距離, for 3線段 */
		const isMinSideSide3H: boolean = sideSideH >= this.MinSideSide13 * 2;
		/** 是否符合邉-邊(垂直)最小距離, for 3線段 */
		const isMinSideSide3V: boolean = sideSideV >= this.MinSideSide13 * 2;

		//判斷線段數目(1,2,3), 有4個象限, 先考慮上下再左右
		let fromPnt: Point;
		let toPnt: Point;
		let points: Point[];
		let textStartAry: number = 0;	//label start array index in points
		//let pathStr;
		if (!this.isFromTypeH && isMaxCntCnt1H && isMinSideSide1V) {
			//1線段-垂直
			if (isToDown) {
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}
			// Points: [fromPnt, toPnt's X, fromPnt's Y] -> This is for a direct vertical line
			// Corrected to: [fromPnt, toPnt]
			points = [fromPnt, toPnt];
			textStartAry = 0;
		} else if (!this.isFromTypeV && isMaxCntCnt1V && isMinSideSide1H) {
			//1線段-水平
			if (isToRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}
			// Corrected to: [fromPnt, toPnt]
			points = [fromPnt, toPnt];
			textStartAry = 0;
			//isMinCntSide2H
		} else if (!this.isFromTypeV && isMinSideCnt2H && isMinCntSide2V) {
			//2線段-水平(先考慮) - L-shape, start H then V
			fromPnt = isToRight ? fromRight : fromLeft;
			toPnt = isToDown ? toUp : toDown;
			points = [fromPnt, { x: toPnt.x, y: fromPnt.y }, toPnt];
			textStartAry = 0; // Text is usually on the second segment for 2-segment lines in this code's logic, but here it's on the first segment (fromPnt to the corner) which is horizontal. The logic below sets it to the first non-corner segment. Let's stick to the original code's intention.
		} else if (!this.isFromTypeH && isMinSideCnt2V && isMinCntSide2H) {
			//2線段-垂直 - L-shape, start V then H
			fromPnt = isToDown ? fromDown : fromUp;
			toPnt = isToRight ? toLeft : toRight;
			points = [fromPnt, { x: fromPnt.x, y: toPnt.y }, toPnt];
			textStartAry = 0;
		} else if (!this.isFromTypeH && isMinSideSide3V && isMinCntCnt3V) {
			//3線段-垂直(直線型) - Z-shape, V-H-V
			if (isToDown) {
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}

			let midY: number = (fromPnt.y + toPnt.y) / 2;
			points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
			textStartAry = 1; // Middle segment (Horizontal)
		} else if (!this.isFromTypeV && isMinSideSide3H && isMinCntCnt3H) {
			//3線段-水平(直線型) - Z-shape, H-V-H
			if (isToRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}

			let midX: number = (fromPnt.x + toPnt.x) / 2;
			points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
			textStartAry = 1; // Middle segment (Vertical)
		} else if (!this.isFromTypeH && isMinCntCnt3H) {
			//3線段-垂直(ㄇ字型) - U-shape, V-H-V (wrap around)
			let midY: number;
			if (isToDown) {
				fromPnt = fromDown;
				toPnt = toDown;
				midY = Math.max(fromPnt.y, toPnt.y) + this.MinSideSide13;
			} else {
				fromPnt = fromUp;
				toPnt = toUp;
				midY = Math.min(fromPnt.y, toPnt.y) - this.MinSideSide13;
			}

			points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
			textStartAry = 1; // Middle segment (Horizontal)
		} else if (!this.isFromTypeV && isMinCntCnt3V) {
			//3線段-水平(ㄇ字型) - U-shape, H-V-H (wrap around)
			let midX: number;
			if (isToRight) {
				fromPnt = fromRight;
				toPnt = toRight;
				midX = Math.max(fromPnt.x, toPnt.x) + this.MinSideSide13;
			} else {
				fromPnt = fromLeft;
				toPnt = toLeft;
				midX = Math.min(fromPnt.x, toPnt.x) - this.MinSideSide13;
			}
			//let midX = isToRight ? Math.max(fromPnt.x, toPnt.x) + this.MinCntCnt3 : Math.min(fromPnt.x, toPnt.x) - this.MinSideSide;
			points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
			textStartAry = 1; // Middle segment (Vertical)
		} else {
			//其他狀況: 用直線(非折線)連接起迄點 (Direct line)
			if (isToDown) {
				if (isToRight) {
					fromPnt = !this.isFromTypeH ? fromDown : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isFromTypeH ? fromDown : fromLeft;
					toPnt = toRight;
				}
			} else {
				if (isToRight) {
					fromPnt = !this.isFromTypeH ? fromUp : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isFromTypeH ? fromUp : fromLeft;
					toPnt = toRight;
				}
			}
			points = [fromPnt, toPnt];
			textStartAry = 0;
		}
		//#endregion

		// 繪製流程線
		this._drawLine(points);

		//move label - center of the segment pointed by textStartAry
		const p1: Point = points[textStartAry];
		const p2: Point = points[textStartAry + 1];
		this.labelElm.center((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
	}

	/**
	 * 繪製流程線部分
	 */
	private _drawLine(points: Point[]): void {
		// 生成帶有圓角的折線路徑
		let pathStr: string = `M ${points[0].x} ${points[0].y}`; // 移動到起點
		const pntLen: number = points.length;
		const radius: number = this.MaxCntCnt1;

		for (let i = 1; i < pntLen; i++) {
			const prevPnt: Point = points[i - 1];
			const nowPnt: Point = points[i];

			// 計算圓角的路徑
			if (i < pntLen - 1) {
				const nextPnt: Point = points[i + 1];

				// 計算方向向量
				const vec1: Point = {
					x: nowPnt.x - prevPnt.x,
					y: nowPnt.y - prevPnt.y
				};
				const vec2: Point = {
					x: nextPnt.x - nowPnt.x,
					y: nextPnt.y - nowPnt.y
				};

				// 單位化向量
				//const len1 = Math.sqrt(vec1.x ** 2 + vec1.y ** 2);
				//const len2 = Math.sqrt(vec2.x ** 2 + vec2.y ** 2);
				const len1: number = Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2));
				const len2: number = Math.sqrt(Math.pow(vec2.x, 2) + Math.pow(vec2.y, 2));

				const unitVec1: Point = { x: vec1.x / len1, y: vec1.y / len1 };
				const unitVec2: Point = { x: vec2.x / len2, y: vec2.y / len2 };

				// 計算圓角的起始點和結束點
				const arcStartX: number = nowPnt.x - unitVec1.x * radius;
				const arcStartY: number = nowPnt.y - unitVec1.y * radius;
				const arcEndX: number = nowPnt.x + unitVec2.x * radius;
				const arcEndY: number = nowPnt.y + unitVec2.y * radius;

				// 添加直線到圓角的起始點
				pathStr += ` L ${arcStartX} ${arcStartY}`;

				// 判斷圓弧的方向（順時針或逆時針）：使用叉積判斷
				const cross: number = unitVec1.x * unitVec2.y - unitVec1.y * unitVec2.x;
				const sweepFlag: number = cross < 0 ? 0 : 1;

				// 添加圓角（A 指令）
				pathStr += ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`;
			} else {
				// 最後一段直線
				pathStr += ` L ${nowPnt.x} ${nowPnt.y}`;
			}
		}

		// 繪製流程線, path2 for 增加右鍵功能表點擊區域
		this.path.plot(pathStr);
		this.path2.plot(pathStr);

		//畫末端箭頭
		this._drawArrow(points[pntLen - 2], points[pntLen - 1]);
	}

	/**
	 * 繪製末端箭頭部分, 利用2個傳入端點計算斜率
	 */
	private _drawArrow(fromPnt: Point, toPnt: Point): void {
		// 計算箭頭的方向
		const angle: number = Math.atan2(toPnt.y - fromPnt.y, toPnt.x - fromPnt.x); // 計算角度

		// 計算箭頭的2個點
		const arrowPnt1: Point = {
			x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle - Math.PI / 2),
			y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle - Math.PI / 2)
		};
		const arrowPnt2: Point = {
			x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle + Math.PI / 2),
			y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle + Math.PI / 2)
		};

		// 更新箭頭路徑
		this.arrow.plot(`M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
		//this.arrow2.plot(`M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
	}

	//id記錄在 path !!
	public getId(): string | number {
		return this.json.Id;
	}

	public getFromType(): string {
		return this.json.FromType;
	}

	public setFromType(fromType: string): void {
		if (fromType == this.json.FromType)
			return;

		this._setFromTypeVars(fromType);
		this.render();
	}

}//class FlowLine