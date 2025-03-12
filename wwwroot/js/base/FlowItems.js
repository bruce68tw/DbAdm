
class FlowBox {	
	/**
	 boxElm: box element
	 svg: svg
	 nodes: nodes
	 lines: lines
	 startNode: start node
	 onMoveNode: event onMoveNode(node)
	*/
    constructor(boxId, onMoveNode) {
		this.boxElm = document.getElementById(boxId);
		this.svg = SVG().addTo(this.boxElm).size('100%', '100%');
		this.onMoveNode = onMoveNode;
		this.reset(false);		
    }

	//清除全部UI元件
	//hasUI: default true(會同時清除UI元素)
	reset(hasUI) {
		this.nodes = [];
		this.lines = [];
		this.startNode = null;

		//todo: 只刪除 svg、text元素(flow box裡面有其他input欄位)
		if (hasUI || hasUI == null) {
			this.boxElm.querySelectorAll('svg,text').forEach(elm => elm.remove());
		}
	}

	//載入nodes & lines
	loadNodes(rows) {
		for (var i = 0; i < rows.length; i++)
			this.addNode(rows[i]);
	}

	loadLines(rows) {
		for (var i = 0; i < rows.length; i++)
			this.addLine(rows[i]);
	}

	addNode(json) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.nodes.length + 1) * (-1);
		let node = new FlowNode(this, json);
		this.nodes.push(node);
		return node;
	}
	
	//addLine(fromNode, toNode, id, lineType) {
	addLine(json) {
		//this.lineCount++;
		//if (id == null)
		//	id = (this.lines.length + 1) * (-1);
		let fromNode = this.findNode(json.StartNode);
		let toNode = this.findNode(json.EndNode);
		return new FlowLine(this, fromNode, toNode, json.Id, 'A');
	}
	
	drawLineStart(startNode) {
		this.startNode = startNode;
	}
	
	drawLineEnd(endNode) {
		new FlowLine(this, this.startNode, endNode);
		this.startNode = null;
	}
	
	findNode(id) {
		//elm2.node 指向dom
		return this.nodes.find(node => node.getId() == id);
	}
}

class FlowNode {
	/**
	 self: this
	 flowBox: FlowBox object
	 svg: svg
	 json: node json, 欄位與後端XgFlowE相同: Id, FlowId, NodeType, Name, PosX, PosY, Width, Height
	 elm2: svg element 與 html element不同
	 textElm: node text element
	 lines: 進入/離開此節點的流程線
	 width: width
	 height: height
	*/

	//靜態屬性 node type enum
    static TypeStart = 'S';
	static TypeEnd = 'E';
	static TypeNode = 'N';
    //TypeAuto = 'A';	//??

	//drag evnet
	DragMove = 'dragmove';
	DragStart = 'dragstart';
	DragEnd = 'dragend';

	//start/end node
	MinRadius = 20;

	//node
	MinWidth = 100;
	MinHeight = 50;
	Padding = 15;

    constructor(flowBox, json) {
		this.self = this;
		this.flowBox = flowBox;
        this.svg = flowBox.svg;
        this.json = Object.assign({
			Name: 'Node',
            NodeType: this.TypeNode,
            PosX: 50,
            PosY: 50,
            Width: 100,	//??
            Height: 50,	//??
        }, json);

        this._init();
    }

    _init() {
		//set instance variables
		this.lines = [];
		
        this._drawNode();	//draw node first
        this._setNodeDrag();
        this._setJointDrag(); // 讓connector可拖拉
    }

	getId() {
		return this._getIdByElm2(this.elm2);
	}

	_getIdByElm2(elm2) {
		return elm2.node.dataset.id;
	}

	_setId(id) {
		this.elm2.node.dataset.id = id;
	}

	addLine(line) {
		this.lines.push(line);
	}
	
	deleteLine(line) {
		let index = this.lines.findIndex(item => item.Id == line.Id);
		this.lines.splice(index, 1);
	}
	
	//init時呼叫
    _drawNode() {
        let nodeType = this.json.NodeType;
        let cssClass = '';
        let nodeName = '';

		let startEnd = this._isStartEnd();
		if (startEnd) {
            if (nodeType == FlowNode.TypeStart) {
                cssClass = 'xf-start';
				nodeName = FlowNode.TypeStart;
            } else {
                cssClass = 'xf-end';
				nodeName = FlowNode.TypeEnd;
            }

			//circle大小不填, 由css設定, 這時radius還沒確定, 不能move(因為會用到radius)
            this.elm2 = this.svg.circle()
                .addClass(cssClass);
				
			//移動circle時會參考radius, 所以先更新, 從css讀取radius, 而不是從circle建立的屬性 !!
            let style = window.getComputedStyle(this.elm2.node);	//不能直接讀取circle屬性
            let radius = parseFloat(style.getPropertyValue("r"));	//轉浮點
            this.elm2.attr("r", radius);
            this.elm2.move(this.json.PosX, this.json.PosY);
			
			let width = radius * 2;
            this.width = width;		//寫入width, 供後面計算位置
            this.height = width;	//畫流程線時會用到
		} else {
            nodeName = this.json.Name;
            cssClass = 'xf-node';
			this.elm2 = this.svg.rect()
				.addClass(cssClass)
				.move(this.json.PosX, this.json.PosY);
        }

		//set data-id = node id
		this._setId(this.json.Id);

		//add 節點文字
        this.textElm = this.svg.text(nodeName)
            .addClass(cssClass + '-text')
            .font({ anchor: 'middle' });

		this._setSize(startEnd);

		//add 連接點 connector(在文字右側), 小方塊, data-nodeElm 記錄節點元素
		if (nodeType != this.TypeEnd){
			this.connectorElm = this.svg.rect(12, 12).addClass('xf-connector');
			this.connectorElm.node.dataset.nodeElm = this.elm2;
		}
		
		this._render(startEnd);
    }

	//是否為起迄節點
    _isStartEnd() {
		return (this.json.NodeType == FlowNode.TypeStart || this.json.NodeType == FlowNode.TypeEnd);
    }

	//繪製, 移動子元件
	_setSize(startEnd) {
		if (!startEnd) {
			let bbox = this.textElm.bbox();
			this.width = Math.max(this.MinWidth, bbox.width + this.Padding * 2);
			this.height = Math.max(this.MinHeight, bbox.height + this.Padding * 2);
		}
		this.elm2.size(this.width, this.height);
	}

	//繪製, 移動子元件
	//param startEnd: 如果不是起迄節點要考慮最小寬高
    _render(startEnd) {
		//文字
		let bbox = this.textElm.bbox();
		let centerX = this.elm2.x() + this.width / 2;
		let centerY = this.elm2.y() + this.height / 2;
        this.textElm.move(centerX - bbox.width / 2, centerY - bbox.height / 2);

        //連接點
		if (this.connectorElm)
			this.connectorElm.move(centerX + bbox.width / 2 + 3, centerY - 5);
    }

	_setNodeDrag() {
		this.elm2.draggable().on(this.DragMove, () => {
			this._render(this._isStartEnd());
			this.lines.forEach(line => line.render());
		}).on(this.DragEnd, (event) => {	
			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);
			this.flowBox.onMoveNode(this.getId(), x, y);	//trigger
		});
	}

	_setJointDrag() {
		if (!this.connectorElm)
			return;
		
		let startElm2, startX, startY;
		let tempLine;
		let endElm2 = null;

		// 啟用 connectorElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 connectorElm !!
		this.connectorElm.draggable().on(this.DragStart, (event) => {
			// 初始化線條
			let { x, y } = this.connectorElm.rbox(this.svg); // 使用SVG畫布的座標系
			startX = x;
			startY = y;
			startElm2 = this.self.elm2;

			tempLine = this.svg.line(startX, startY, startX, startY)
				.addClass('xf-line off');
				
			this.flowBox.drawLineStart(this.self);
				
		}).on(this.DragMove, (event) => {
			//阻止 connector 移動
			event.preventDefault();
			
			// 獲取拖拽的目標座標（相對於 SVG 畫布）
			let { x, y } = event.detail.box;
			let endX = x;
			let endY = y;

			// 更新線條的終點
			tempLine.plot(startX, startY, endX, endY);

			// 檢查座標值是否有效
			if (isFinite(endX) && isFinite(endY)) {
				// 將 SVG 座標轉換為檢視座標
				let svgRect = this.svg.node.getBoundingClientRect();
				let viewPortX = endX + svgRect.x;
				let viewPortY = endY + svgRect.y;

				// 檢查是否懸停在節點上
				let overNode = document.elementsFromPoint(viewPortX, viewPortY)
					.find(elm => elm != startElm2 && (elm.classList.contains('xf-node') || elm.classList.contains('xf-end')));
				if (overNode) {
					if (endElm2 !== overNode) {
						if (endElm2) 
							this._highlightNode(endElm2, false);
						endElm2 = overNode;
						this._highlightNode(endElm2, true);
					}
				} else if (endElm2) {
					this._highlightNode(endElm2, false);
					endElm2 = null;
				}
			}
			
		}).on(this.DragEnd, (event) => {
			// 檢查座標值是否有效
			if (endElm2) {
				this._highlightNode(endElm2, false);					
				//this.flowBox.drawLineEnd(this.flowBox.findNode(endElm2.node.dataset.id));
				this.flowBox.drawLineEnd(this.flowBox.findNode(this._getIdByElm2(endElm2)));
				endElm2 = null;
			}
			tempLine.remove();
		});
	}
	
	_highlightNode(node, status){
		if (status){
			node.classList.add('on');
		} else {
			node.classList.remove('on');
		}
	}
	
}//class FlowNode


class FlowLine {
	//Cnt:中心點, Side:節點邊界, 數值20大約1公分
	Max1SegDist = 6;	//2中心點的最大距離, 小於此值可建立1線段(表示在同一水平/垂直位置), 同時用於折線圓角半徑
	Min2NodeDist = 25;	//2節點的最小距離, 大於此值可建立line(1,3線段)
	Min2SegDist = 20;	//建立2線段的最小距離, 中心點和邊

	//末端箭頭
	ArrowLen = 10; 	//長度
	ArrowWidth = 5; 	//寬度	

 	//line type, 起點位置
    TypeAuto = 'A';	//自動
    TypeV = 'V';	//垂直(上下)
    TypeH = 'H';	//水平(左右)

	/**
	 flowBox: FlowBox object
	 svg: svg
	 path: line path
	 fromNode: from node
	 toNode: to node
	 lineType: 起點位置, A(auto),U(上下),L(左右)
	 isTypeAuto:
	 isTypeV:
	 isTypeH:
	*/
	constructor(flowBox, fromNode, toNode, lineType) {
		this.flowBox = flowBox;
        this.svg = flowBox.svg;
        this.fromNode = fromNode;
        this.toNode = toNode;
		this.path = this.svg.path('').addClass('xf-line');
		
		// 用來儲存箭頭的路徑
		this.arrowPath = this.svg.path('').addClass('xf-arrow');
		//this.arrowPath2 = this.svg.path('').addClass('xf-arrow');
		
		//add line to from/to node
		fromNode.addLine(this);
		toNode.addLine(this);
		this.setType(lineType);
		this.render();
    }

	setType(lineType){
		lineType = lineType || this.TypeAuto;
		this.lineType = lineType;
		this.isTypeV = (lineType == this.TypeV);
		this.isTypeH = (lineType == this.TypeH);
		//this.isTypeAuto = (!this.isTypeV && !this.isTypeH) || (lineType == this.TypeAuto);
	}
	
	/**
	 依次考慮使用1線段、2線段、3線段
	 */
	render() {

		//=== from Node ===
		// 位置和尺寸, x/y為左上方座標
		const fromX = this.fromNode.elm2.x();	
		const fromY = this.fromNode.elm2.y();
		const fromWidth = this.fromNode.width;
		const fromHeight = this.fromNode.height;
		const fromCntX = fromX + fromWidth / 2;		//中心點
		const fromCntY = fromY + fromHeight / 2;
		// 四個邊的中間點
		const fromUp = { x: fromX + fromWidth / 2, y: fromY }; // 上邊中點
		const fromDown = { x: fromX + fromWidth / 2, y: fromY + fromHeight };
		const fromLeft = { x: fromX, y: fromY + fromHeight / 2 };
		const fromRight = { x: fromX + fromWidth, y: fromY + fromHeight / 2 };

		//=== to Node ===
		const toX = this.toNode.elm2.x();
		const toY = this.toNode.elm2.y();
		const toWidth = this.toNode.width;
		const toHeight = this.toNode.height;
		const toCntX = toX + toWidth / 2;
		const toCntY = toY + toHeight / 2;
		// 四個邊的中間點
		const toUp = { x: toX + toWidth / 2, y: toY };
		const toDown = { x: toX + toWidth / 2, y: toY + toHeight };
		const toLeft = { x: toX, y: toY + toHeight / 2 };
		const toRight = { x: toX + toWidth, y: toY + toHeight / 2 };
		
		// 判斷 fromNode 和 toNode 的相對位置
		const isToRight = toCntX > fromCntX; 	// toNode 在 fromNode 的右側
		const isToDown = toCntY > fromCntY; 	// toNode 在 fromNode 的下方

		// 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向
		const match2NodeDistH = (isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x) >= this.Min2NodeDist;
		const match2NodeDistV = (isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y) >= this.Min2NodeDist;
		
		// 是否符合2中心點之間最小距離 for 1線段(否則為3線段)
		const match1SegDistH = Math.abs(fromCntX - toCntX) <= this.Max1SegDist;
		const match1SegDistV = Math.abs(fromCntY - toCntY) <= this.Max1SegDist;
		
		// 是否符合中心點-邊線之間最小距離 for 2線段
		const match2SegDistIn = Math.abs(fromCntX - toCntX) - toWidth/2 >= this.Min2SegDist;
		const match2SegDistOut = Math.abs(fromCntY - toCntY) - fromHeight/2 >= this.Min2SegDist;
		
		//判斷線段數目(1,2,3), 有4個象限, 先考慮上下再左右
		let fromPnt, toPnt;
		let points;
		//let pathStr;
		if (!this.isTypeH && match1SegDistH && match2NodeDistV){
			//1線段-垂直
			if (isToDown){
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${toPnt.y}`;	//取垂直線
			points = [fromPnt, {x:fromPnt.x, y:toPnt.y}];
		} else if(!this.isTypeV && match1SegDistV && match2NodeDistH){
			//1線段-水平
			if (isToRight){
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${toPnt.x}`;	//取水平線
			points = [fromPnt, {x:toPnt.x, y:fromPnt.y}];
		} else if(!this.isTypeV && match2NodeDistH && match2SegDistOut){
			//2線段-水平
			fromPnt = isToRight ? fromRight : fromLeft;
			toPnt = isToDown ? toUp : toDown;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${toPnt.x} V ${toPnt.y}`;
			points = [fromPnt, {x:toPnt.x, y:fromPnt.y}, toPnt];
		} else if(!this.isTypeH && match2NodeDistV && match2SegDistIn){
			//2線段-垂直
			fromPnt = isToDown ? fromDown : fromUp;
			toPnt = isToRight ? toLeft : toRight;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, {x:fromPnt.x, y:toPnt.y}, toPnt];
		} else if(!this.isTypeH && match2NodeDistV){
			//3線段-垂直(2節點內側)
			if (isToDown){
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}
			
			let midY = (fromPnt.y + toPnt.y)/2;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} V ${midY} H ${toPnt.x} V ${toPnt.y}`;
			points = [fromPnt, {x:fromPnt.x, y:midY}, {x:toPnt.x, y:midY}, toPnt];
		} else if(!this.isTypeV && match2NodeDistH){
			//3線段-水平(2節點內側)
			if (isToRight){
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}
			
			let midX = (fromPnt.x + toPnt.x)/2;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${midX} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, {x:midX, y:fromPnt.y}, {x:midX, y:toPnt.y}, toPnt];
		} else if(!this.isTypeV){
			//3線段-水平(2節點外側)
			if (isToRight){
				fromPnt = fromRight;
				toPnt = toRight;
			} else {
				fromPnt = fromLeft;
				toPnt = toLeft;
			}
			let midX = isToRight ? Math.max(fromPnt.x, toPnt.x) + this.Min2NodeDist : Math.min(fromPnt.x, toPnt.x) - this.MinSideSide;
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} H ${midX} V ${toPnt.y} H ${toPnt.x}`;
			points = [fromPnt, {x:midX, y:fromPnt.y}, {x:midX, y:toPnt.y}, toPnt];
		} else {
			//其他狀況: 用直線(非折線)連接起迄點
			if (isToDown){
				if (isToRight){
					fromPnt = !this.isTypeH ? fromDown : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isTypeH ? fromDown : fromLeft;
					toPnt = toRight;
				}
			} else {
				if (isToRight){
					fromPnt = !this.isTypeH ? fromUp : fromRight;
					toPnt = toLeft;
				} else {
					fromPnt = !this.isTypeH ? fromUp : fromLeft;
					toPnt = toRight;
				}
			}
			//pathStr = `M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y}`;
			points = [fromPnt, toPnt];
		}
		
		// 繪製流程線
		this._drawLine(points);
		//this.path.plot(pathStr);
	}
	
	/**
	 畫流程線
	 */
	_drawLine(points) {
		// 生成帶有圓角的折線路徑
		let pathStr = `M ${points[0].x} ${points[0].y}`; // 移動到起點
		let pntLen = points.length;
		let radius = this.Max1SegDist;
		for (let i = 1; i < pntLen; i++) {
		  const prevPnt = points[i - 1];
		  const nowPnt = points[i];

		  // 計算圓角的路徑
		  if (i < pntLen - 1) {
			const nextPnt = points[i + 1];

			// 計算圓角的起始點和結束點
			const fromAngle = Math.atan2(nowPnt.y - prevPnt.y, nowPnt.x - prevPnt.x);
			const toAngle = Math.atan2(nextPnt.y - nowPnt.y, nextPnt.x - nowPnt.x);

			const fromOffsetX = radius * Math.cos(fromAngle);
			const fromOffsetY = radius * Math.sin(fromAngle);
			const toOffsetX = radius * Math.cos(toAngle);
			const toOffsetY = radius * Math.sin(toAngle);

			const arcStartX = nowPnt.x - fromOffsetX;
			const arcStartY = nowPnt.y - fromOffsetY;
			const arcEndX = nowPnt.x + toOffsetX;
			const arcEndY = nowPnt.y + toOffsetY;

			// 添加直線到圓角的起始點
			pathStr += ` L ${arcStartX} ${arcStartY}`;

			// 判斷圓弧的方向（順時針或逆時針）
			const angleDiff = toAngle - fromAngle;
			const sweepFlag = angleDiff > 0 ? 1 : 0; // 根據角度差決定 sweep-flag

			// 添加圓角（A 指令）
			pathStr += ` A ${radius} ${radius} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`;
		  } else {
			// 最後一段直線
			pathStr += ` L ${nowPnt.x} ${nowPnt.y}`;
		  }
		}

		// 繪製流程線
		this.path.plot(pathStr);
		
		//畫末端箭頭
		this._arrow(points[pntLen - 2], points[pntLen - 1]);
		/*
		// 繪製帶有圓角的折線
		const path = svg.path(pathStr)
		  .stroke({ width: 2, color: '#000', linecap: 'round', linejoin: 'round' })
		  .fill('none');
		*/
	  
	}
	
	/**
	 畫末端箭頭, 利用2個傳入端點計算斜率
	 */
	_arrow(fromPnt, toPnt) {
		// 計算箭頭的方向
		const angle = Math.atan2(toPnt.y - fromPnt.y, toPnt.x - fromPnt.x); // 計算角度

		// 計算箭頭的2個點
		const arrowPnt1 = {
		  x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle - Math.PI / 2),
		  y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle - Math.PI / 2)
		};
		const arrowPnt2 = {
		  x: toPnt.x - this.ArrowLen * Math.cos(angle) + this.ArrowWidth * Math.cos(angle + Math.PI / 2),
		  y: toPnt.y - this.ArrowLen * Math.sin(angle) + this.ArrowWidth * Math.sin(angle + Math.PI / 2)
		};

		// 更新箭頭路徑
		this.arrowPath.plot(`M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
		//this.arrowPath1.plot(`M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
	}
	
}//class FlowLine
