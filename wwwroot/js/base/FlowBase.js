
//靜態類別 for FlowBase.js only
var _flow = {

	//靜態屬性 node type enum
	TypeStart: 'S',		//startNode
	TypeEnd: 'E',		//endNode
	TypeNode: 'N',		//normal node
	//TypeAuto: 'A',	//auto
};

/**
 * 自定函數(由flow內部觸發):
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAfterAddLine(json): when add line
 * void fnShowMenu(isNode, flowItem, event);
 * void fnAfterMoveLineEnd(oldNode, newNode): after drop line end point
 */
//控制 FlowNode、FlowLine for 外部程式
function FlowBase(boxId) {	

	/**
	 屬性:
	 //boxElm: box element
	 svg: svg
	 nodes: nodes
	 lines: lines
	 fromNode: drap start node
	 onMoveNode: event onMoveNode(node)
	*/

	//是否可編輯
	this.isEdit = false;

	//新node/line Id, 自動累加
	//this.newNodeId = 0;
	this.newLineId = 0;

	this._init = function (boxId) {
		let boxDom = document.getElementById(boxId);
		this.svg = SVG().addTo(boxDom).size('100%', '100%');
		//this.svg.node.style.zIndex = 100;	//在eform上面!! 無效 !!

		this.fnMoveNode = null;
		this.fnAfterAddLine = null;
		this.fnShowMenu = null;
		//this._reset();
	};

	/*
	this.newNodeId = function () {
		this.newNodeId++;
		return this.newNodeId;
	};
	*/
	//由元件內部發動, 所以必須提供此功能
	this.getNewLineId = function () {
		this.newLineId++;
		return this.newLineId;
	};

	this.setEdit = function (status) {
		this.isEdit = status;
	};

	//清除全部UI元件
	this._reset = function () {
		this.nodes = [];
		this.lines = [];
		this.fromNode = null;

		//刪除 svg 裡面的全部子元素
		Array.from(this.svg.node.childNodes).forEach(node => {
			node.remove();
		});
	};

	//載入nodes & lines
	this.loadNodes = function (rows) {
		this._reset();
		for (var i = 0; i < rows.length; i++)
			this.addNode(rows[i]);
	};

	this.loadLines = function (rows) {
		if (rows != null) {
			for (var i = 0; i < rows.length; i++)
				this.addLine(rows[i]);
		}
	};

	this.addNode = function (json) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.nodes.length + 1) * (-1);
		let node = new FlowNode(this, json);
		this.nodes.push(node);
		return node;
	};
	
	this.addLine = function (json) {
		return new FlowLine(this, json);
	};
	
	this.deleteNode = function (node) {
		let id = node.getId();
		this.svg.findOne(`g[data-id="${id}"]`);
	};
	
	this.deleteLine = function (line) {
		let id = line.getId();
		this.svg.find(`path[data-id="${id}"]`);	//含path2(data-id相同)
	};
	
	this.drawLineStart = function (fromNode) {
		this.fromNode = fromNode;
	};

	//return new line json
	this.drawLineEnd = function (toNode) {
		var json = {
			Id: this.newLineId,
			FromNodeId: this.fromNode.getId(),
			ToNodeId: toNode.getId(),
		};
		new FlowLine(this, json, this.fromNode, toNode);
		this.fromNode = null;
		return json;
	};
	
	this.idToNode = function (id) {
		//elm.node 指向dom
		return this.nodes.find(node => node.getId() == id);
	};

	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.nodes.some(node => node.getNodeType() == _flow.TypeStart);
	};

	//call last
	this._init(boxId);

} //class FlowBase

/**
  流程節點
  屬性:
    self: this
    flowBase: FlowBase object
    svg: flowBase.svg
    json: node json, 欄位與後端XgFlowE相同: Id(不變), NodeType(不變), Name, PosX, PosY, Width, Height
    elm: svg group element(與 html element不同)
    boxElm: border element
    textElm: text element
    lines: 進入/離開此節點的流程線
    width: width
    height: height
  param flowBase {object} FlowBase
  param json {json} 流程節點資料
 */ 
function FlowNode(flowBase, json) {
	//drag evnet
	this.DragStart = 'dragstart';
	this.DragMove = 'dragmove';
	this.DragEnd = 'dragend';

	//start/end node radius
	//this.MinRadius = 20;

	//normal node size
	this.MinWidth = 80;
	this.MinHeight = 42;
	this.LineHeight = 18;	//文字行高
	this.PadTop = 8;
	this.PadLeft = 15;

	this.PinWidth = 12;
	this.PinGap = 3;

	this._init = function (flowBase, json) {
		this.self = this;
		this.flowBase = flowBase;
		this.svg = flowBase.svg;
		this.json = Object.assign({
			Name: 'Node',
			NodeType: _flow.TypeNode,
			PosX: json.PosX || 100,
			PosY: json.PosY || 100,
			//Width: 100,	//??
			//Height: 50,	//??
		}, json);

		//set instance variables
		this.lines = [];

        let nodeType = this.json.NodeType;
        let cssClass = '';
        let nodeText = '';

		// 建立一個 group(有x,y, 沒有大小, 含文字的節點框線), 才能控制文字拖拉
		this.elm = this.svg
			.group()
			.attr('data-id', json.Id)

		let startEnd = this._isStartEnd();
		if (startEnd) {
            if (nodeType == _flow.TypeStart) {
                cssClass = 'xf-start';
				nodeText = _flow.TypeStart;
            } else {
                cssClass = 'xf-end';
				nodeText = _flow.TypeEnd;
            }

			//circle大小不填, 由css設定, 這時radius還沒確定, 不能move(因為會用到radius)
			this.boxElm = this.elm.circle()
                .addClass(cssClass);
				
			//移動circle時會參考radius, 所以先更新, 從css讀取radius, 而不是從circle建立的屬性 !!
			let style = window.getComputedStyle(this.boxElm.node);	//不能直接讀取circle屬性
            let radius = parseFloat(style.getPropertyValue('r'));	//轉浮點
			this.boxElm.attr('r', radius);	//reset radius

			//起迄節點不會改變文字和大小, 直接設定
			this.textElm = this.elm.text(nodeText)
				.addClass(cssClass + '-text')
				.attr({ 'text-anchor': 'middle', 'dominant-baseline': 'middle' }); //水平垂直置中

			//this.textElm.center(radius, radius);

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

			this.textElm = this.elm.text('')
				.addClass(cssClass + '-text');
				//.font({ anchor: 'middle' })
				//.attr({ 'text-anchor': 'middle' }); // 確保對齊生效

			//一般節點依文字內容自動調整大小
			this.setName(nodeText, false);
        }

		this.elm.move(this.json.PosX, this.json.PosY);

		//add 連接點小方塊(pin) if need(在文字右側)
		if (nodeType != _flow.TypeEnd){
			this.pinElm = this.elm
				.rect(this.PinWidth, this.PinWidth)
				.addClass('xf-pin');
			this._setPinPos();
		}
		
		this._setEvent();
	};

	this.getLines = function () {
		return this.lines;
	};

	//是否為起迄節點
	this._isStartEnd = function () {
		return (this.json.NodeType == _flow.TypeStart || this.json.NodeType == _flow.TypeEnd);
	};

	this.getNodeType = function () {
		return this.json.NodeType;
	};

	this.getPos = function () {
		let elm = this.elm;
		return { x: elm.x(), y: elm.y() };
	};

	this.getSize = function () {
		let elm = this.boxElm;
		return { w: elm.width(), h: elm.height() };
	};

	this.getCenter = function () {
		let elm = this.boxElm;
		return { x: elm.cx(), y: elm.cy() };
	};

	//set pin position
	this._setPinPos = function () {
		//連接點 右移3px
		if (!this.pinElm) return;

		let bbox = this.textElm.bbox();
		let center = this.getCenter();
		this.pinElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
	}

	this._setEvent = function () {
		//enable right click menu
		let me = this;	//FlowNode
		let flowBase = this.flowBase;

		this.elm.node.addEventListener('contextmenu', function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (flowBase.fnShowMenu)
				flowBase.fnShowMenu(event, true, me);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		this.elm.draggable().on(this.DragMove, () => {
			if (!flowBase.isEdit) return;

			this._drawLines();
		}).on(this.DragEnd, (event) => {
			if (!flowBase.isEdit) return;

			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (this.flowBase.fnMoveNode)
				this.flowBase.fnMoveNode(this, x, y);
		});

		//set connector draggable
		this._setEventPin();
	};

	this._drawLines = function () {
		this.lines.forEach(line => line.render());
	};

	//set event of node connector
	//pin表示起始節點內的連接點
	this._setEventPin = function () {
		if (!this.pinElm)
			return;
		
		let fromDom, startX, startY;
		let tempLine;
		let toElm = null;
		let me = this;	//flowNode
		let flowBase = this.flowBase;

		// 啟用 pinElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pinElm !!
		this.pinElm.draggable().on(this.DragStart, (event) => {
			if (!flowBase.isEdit) return;

			// 初始化線條
			let { x, y } = me.pinElm.rbox(me.svg); // 使用SVG畫布的座標系
			startX = x;
			startY = y;
			fromDom = me.self.elm.node;	//this.self指向這個FlowNode

			tempLine = me.svg.line(startX, startY, startX, startY)
				.addClass('xf-line off');
				
			flowBase.drawLineStart(me.self);
				
		}).on(this.DragMove, (event) => {
			if (!flowBase.isEdit) return;

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
				let svgRect = me.svg.node.getBoundingClientRect();
				let viewPortX = endX + svgRect.x;
				let viewPortY = endY + svgRect.y;

				// 檢查是否懸停在節點上
				let overDom = document.elementsFromPoint(viewPortX, viewPortY)
					.find(dom => dom != fromDom && (dom.classList.contains('xf-node') || dom.classList.contains('xf-end')));
				if (overDom) {
					let overElm = overDom.instance;	//svg element
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
			
		}).on(this.DragEnd, (event) => {
			if (!flowBase.isEdit) return;

			// 檢查座標值是否有效
			if (toElm) {
				me._markNode(toElm, false);
				var id = toElm.parent().node.dataset.id;
				var json = flowBase.drawLineEnd(flowBase.idToNode(id));
				toElm = null;

				//trigger event
				if (flowBase.fnAfterAddLine)
					flowBase.fnAfterAddLine(json);
			}
			tempLine.remove();
		});
	};

	//high light node
	this._markNode = function (elm, status){
		if (status){
			elm.node.classList.add('on');
		} else {
			elm.node.classList.remove('on');
		}
	};

	//id記錄在 group elm !!
	this.getId = function () {
		return this.json.Id;
	};

	this.addLine = function (line) {
		this.lines.push(line);
	};

	this.deleteLine = function (line) {
		let index = this.lines.findIndex(item => item.Id == line.Id);
		this.lines.splice(index, 1);
	};

	this.getName = function () {
		return this.textElm.text();
	};

	//set node name only for TypeNode, 考慮多行
	//called by initial, 前端改變node name
	this.setName = function (name, drawLine) {
		// 更新文字內容, 後端傳回會加上跳脫字元, js 2021才有 replaceAll, 所以自製
		var lines = _str.replaceAll(name, '\\n', '\n').split('\n');
		this.textElm.clear().text(function (add) {
			lines.forEach((line, i) => {
				if (i > 0)
					add.tspan(line).newLine().dy(this.LineHeight);
				else
					add.tspan(line);
			});
		});

		// 獲取新文字尺寸
		const bbox = this.textElm.bbox();

		// 更新矩形尺寸
		var width = Math.max(this.MinWidth, bbox.width + this.PadLeft * 2 + this.PinWidth + this.PinGap * 2);
		var height = Math.max(this.MinHeight, bbox.height + this.PadTop * 2);
		this.boxElm.size(Math.round(width), Math.round(height));

		// 重新居中文字
		this.textElm.center(this.boxElm.cx(), this.boxElm.cy());

		if (drawLine)
			this._drawLines();
	};

	//call last
	this._init(flowBase, json);

}//class FlowNode

//相關名詞使用 fromNode/toNode 比較合理
/**
  屬性:
    flowBase: FlowBase object
    json: flowLine json, 欄位與後端XgFlowE相同: Id(不變), FromNodeId, ToNodeId, FromType(不變), Label
    svg: svg
    path: line path
    path2: for right menu
	arrow: 末端箭頭
	textElm: 顯示label
    fromNode: from node
    toNode: to node
    //fromType: 起點位置, A(auto),V(上下),H(左右)
    //label: 流程線上的文字, 一般是執行條件
    //isFromTypeAuto:
    isFromTypeV:
    isFromTypeH:
  param flowBase {FlowBase}
  param json {Json} flowLine 組態 for initial
  param fromNode {FlowNode?} 如果有值則使用此節點
  param toNode {FlowNode?} 同 fromNode
*/
function FlowLine(flowBase, json, fromNode, toNode) {
	//Cnt:中心點, Side:節點邊界, 數值20大約1公分
	/** (起點)中心到(迄點)中心的最大距離 for 建立1線段(表示在同一水平/垂直位置), 同時用於折線圓角半徑 */
	this.MaxCntCnt1 = 6;
	/** (起點)邊到(迄點)中心的最小距離 for 建立2線段 */
	this.MinSideCnt2 = 16;	
	/** (起點)中心到(迄點)中心的最小距離 for 建立3線段,  2節點的最小距離, 大於此值可建立line(1,3線段) */
	this.MinCntCnt3 = 20;	
	/** (起點)邊到(迄點)邊的最小距離 for 建立1,3線段(3線段以2倍距離判斷) */
	this.MinSideSide13 = 12;	

	//末端箭頭
	this.ArrowLen = 10; 	//長度
	this.ArrowWidth = 5; 	//寬度	

	//line type, 起點位置
	this.FromTypeAuto = 'A';	//自動
	this.FromTypeV = 'V';	//垂直(上下)
	this.FromTypeH = 'H';	//水平(左右)

	//Id 記錄在 json.Id
	this._init = function (flowBase, json, fromNode, toNode) {
		json = json || {};
		json.FromType = json.FromType || this.FromTypeAuto;
		json.Label = json.Label || '';

		json.Id = json.Id || flowBase.getNewLineId();
		this.flowBase = flowBase;
		this.json = json;
		this.svg = flowBase.svg;
		this.fromNode = fromNode || this.flowBase.idToNode(json.FromNodeId);
		this.toNode = toNode || this.flowBase.idToNode(json.ToNodeId);
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
		this.textElm = this.svg.text(json.Label)
			.addClass('xf-line-text')
			.font({ anchor: 'middle' });

		// 用來儲存箭頭的路徑
		this.arrow = this.svg.path('').addClass('xf-arrow');
		//this.arrow2 = this.svg.path('').addClass('xf-arrow');

		//add line to from/to node
		this.fromNode.addLine(this);
		this.toNode.addLine(this);
		this._setEvent();
		this._setFromTypeVars(json.FromType);
		this.render();
	};

	this._setEvent = function () {
		var me = this;	//FlowLine
		this.path2.node.addEventListener('contextmenu', function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (me.flowBase.fnShowMenu)
				me.flowBase.fnShowMenu(event, false, me);
		});
	}

	this._setFromTypeVars = function (fromType) {
		fromType = fromType || this.FromTypeAuto;
		this.fromType = fromType;
		this.isFromTypeV = (fromType == this.FromTypeV);
		this.isFromTypeH = (fromType == this.FromTypeH);
		//this.isFromTypeAuto = (!this.isFromTypeV && !this.isFromTypeH) || (fromType == this.FromTypeAuto);
		var dom = this.path.node;
		if (fromType == this.FromTypeAuto)
			dom.classList.remove('xf-way');
		else
			dom.classList.add('xf-way');			
	};

	//?? from text element
	this.getLabel = function () {
		return this.label;
	};
	
	this.setLabel = function (label) {
		this.label = label;
	};

	/**
	 * 依次考慮使用1線段、2線段、3線段
	 * public for FlowBase.js
	 */
	this.render = function () {

		//=== from Node ===
		// 位置和尺寸, x/y為左上方座標
		const fromPos = this.fromNode.getPos();
		const fromSize = this.fromNode.getSize();
		const fromCnt = {x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h / 2};
		// 四個邊的中間點
		const fromUp = { x: fromPos.x + fromSize.w / 2, y: fromPos.y }; // 上邊中點
		const fromDown = { x: fromPos.x + fromSize.w / 2, y: fromPos.y + fromSize.h };
		const fromLeft = { x: fromPos.x, y: fromPos.y + fromSize.h / 2 };
		const fromRight = { x: fromPos.x + fromSize.w, y: fromPos.y + fromSize.h / 2 };

		//=== to Node ===
		const toPos = this.toNode.getPos();
		const toSize = this.toNode.getSize();
		const toCnt = {x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h / 2};
		// 四個邊的中間點
		const toUp = { x: toPos.x + toSize.w / 2, y: toPos.y };
		const toDown = { x: toPos.x + toSize.w / 2, y: toPos.y + toSize.h };
		const toLeft = { x: toPos.x, y: toPos.y + toSize.h / 2 };
		const toRight = { x: toPos.x + toSize.w, y: toPos.y + toSize.h / 2 };

		/** ToNode 在右邊 */
		const isToRight = toCnt.x > fromCnt.x; 	// toNode 在 fromNode 的右側
		/** ToNode 在下面 */
		const isToDown = toCnt.y > fromCnt.y; 	// toNode 在 fromNode 的下方

		//計算2個中心點距離
		const cntCntSize = { w: Math.abs(fromCnt.x - toCnt.x), h: Math.abs(fromCnt.y - toCnt.y) };

		/** 是否符合2中心點之間最小(水平)距離 for 1線段 */
		const isMaxCntCnt1H = cntCntSize.w <= this.MaxCntCnt1;
		/** 是否符合2中心點之間最小(垂直)距離 for 1線段 */
		const isMaxCntCnt1V = cntCntSize.h <= this.MaxCntCnt1;

		/** 是否符合起迄點邊線-中心點之間最小距離(水平方向) for 2線段 */
		const isMinSideCnt2H = cntCntSize.w - fromSize.w / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點邊線-中心點之間最小距離(垂直方向) for 2線段 */
		const isMinSideCnt2V = cntCntSize.h - toSize.h / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點中心點-邊線之間最小距離(水平方向) for 2線段 */
		const isMinCntSide2H = cntCntSize.w - toSize.w / 2 >= this.MinSideCnt2;
		/** 是否符合起迄點中心點-邊線之間最小距離(垂直方向) for 2線段 */
		const isMinCntSide2V = cntCntSize.h - fromSize.h / 2 >= this.MinSideCnt2;

		/** 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向 */
		const isMinCntCnt3H = (isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x) >= this.MinCntCnt3;
		/** 是否符合垂直/水平最小距離, 字尾H/V表示距離量測方向 */
		const isMinCntCnt3V = (isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y) >= this.MinCntCnt3;

		//for 計算
		const sideSideH = (isToRight ? toLeft.x - fromRight.x : fromLeft.x - toRight.x);
		const sideSideV = (isToDown ? toUp.y - fromDown.y : fromUp.y - toDown.y);

		/** 是否符合邉-邊(水平)最小距離, for 1線段 */
		const isMinSideSide1H = sideSideH >= this.MinSideSide13;
		/** 是否符合邉-邊(垂直)最小距離, for 1線段 */
		const isMinSideSide1V = sideSideV >= this.MinSideSide13;		

		/** 是否符合邉-邊(水平)最小距離, for 3線段 */
		const isMinSideSide3H = sideSideH >= this.MinSideSide13 * 2;
		/** 是否符合邉-邊(垂直)最小距離, for 3線段 */
		const isMinSideSide3V = sideSideV >= this.MinSideSide13 * 2;

		//判斷線段數目(1,2,3), 有4個象限, 先考慮上下再左右
		let fromPnt, toPnt;
		let points;
		let textStartAry = 0;	//label start array in points
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
			points = [fromPnt, { x: fromPnt.x, y: toPnt.y }];
		} else if (!this.isFromTypeV && isMaxCntCnt1V && isMinSideSide1H) {
			//1線段-水平
			if (isToRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}
			points = [fromPnt, { x: toPnt.x, y: fromPnt.y }];
			//isMinCntSide2H
		} else if (!this.isFromTypeV && isMinSideCnt2H && isMinCntSide2V) {
			//2線段-水平(先考慮)
			fromPnt = isToRight ? fromRight : fromLeft;
			toPnt = isToDown ? toUp : toDown;
			points = [fromPnt, { x: toPnt.x, y: fromPnt.y }, toPnt];
			textStartAry = 1;
		} else if (!this.isFromTypeH && isMinSideCnt2V && isMinCntSide2H) {
			//2線段-垂直
			fromPnt = isToDown ? fromDown : fromUp;
			toPnt = isToRight ? toLeft : toRight;
			points = [fromPnt, { x: fromPnt.x, y: toPnt.y }, toPnt];
		} else if (!this.isFromTypeH && isMinSideSide3V && isMinCntCnt3V) {
			//3線段-垂直(直線型)
			if (isToDown) {
				fromPnt = fromDown;
				toPnt = toUp;
			} else {
				fromPnt = fromUp;
				toPnt = toDown;
			}

			let midY = (fromPnt.y + toPnt.y) / 2;
			points = [fromPnt, { x: fromPnt.x, y: midY }, { x: toPnt.x, y: midY }, toPnt];
		} else if (!this.isFromTypeV && isMinSideSide3H && isMinCntCnt3H) {
			//3線段-水平(直線型)
			if (isToRight) {
				fromPnt = fromRight;
				toPnt = toLeft;
			} else {
				fromPnt = fromLeft;
				toPnt = toRight;
			}

			let midX = (fromPnt.x + toPnt.x) / 2;
			points = [fromPnt, { x: midX, y: fromPnt.y }, { x: midX, y: toPnt.y }, toPnt];
			textStartAry = 1;
		} else if (!this.isFromTypeH && isMinCntCnt3H ) {
			//3線段-垂直(ㄇ字型)
			let midY;
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
		} else if (!this.isFromTypeV && isMinCntCnt3V) {
			//3線段-水平(ㄇ字型)
			let midX;
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
			textStartAry = 1;
		} else {
			//其他狀況: 用直線(非折線)連接起迄點
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
		}

		// 繪製流程線
		this._drawLine(points);

		//move label
		this.textElm.center((points[textStartAry].x + points[textStartAry + 1].x) / 2,
			(points[textStartAry].y + points[textStartAry + 1].y) / 2);
	};

	/**
	 * 繪製流程線部分
	 */
	this._drawLine = function (points) {
		// 生成帶有圓角的折線路徑
		let pathStr = `M ${points[0].x} ${points[0].y}`; // 移動到起點
		let pntLen = points.length;
		let radius = this.MaxCntCnt1;

		for (let i = 1; i < pntLen; i++) {
			const prevPnt = points[i - 1];
			const nowPnt = points[i];

			// 計算圓角的路徑
			if (i < pntLen - 1) {
				const nextPnt = points[i + 1];

				// 計算方向向量
				const vec1 = {
					x: nowPnt.x - prevPnt.x,
					y: nowPnt.y - prevPnt.y
				};
				const vec2 = {
					x: nextPnt.x - nowPnt.x,
					y: nextPnt.y - nowPnt.y
				};

				// 單位化向量
				//const len1 = Math.sqrt(vec1.x ** 2 + vec1.y ** 2);
				//const len2 = Math.sqrt(vec2.x ** 2 + vec2.y ** 2);
				const len1 = Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2));
				const len2 = Math.sqrt(Math.pow(vec2.x, 2) + Math.pow(vec2.y, 2));

				const unitVec1 = { x: vec1.x / len1, y: vec1.y / len1 };
				const unitVec2 = { x: vec2.x / len2, y: vec2.y / len2 };

				// 計算圓角的起始點和結束點
				const arcStartX = nowPnt.x - unitVec1.x * radius;
				const arcStartY = nowPnt.y - unitVec1.y * radius;
				const arcEndX = nowPnt.x + unitVec2.x * radius;
				const arcEndY = nowPnt.y + unitVec2.y * radius;

				// 添加直線到圓角的起始點
				pathStr += ` L ${arcStartX} ${arcStartY}`;

				// 判斷圓弧的方向（順時針或逆時針）：使用叉積判斷
				const cross = unitVec1.x * unitVec2.y - unitVec1.y * unitVec2.x;
				const sweepFlag = cross < 0 ? 0 : 1;

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
	};

	/**
	 * 繪製末端箭頭部分, 利用2個傳入端點計算斜率
	 */
	this._drawArrow = function (fromPnt, toPnt) {
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
		this.arrow.plot(`M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
		//this.arrow2.plot(`M ${fromPnt.x} ${fromPnt.y} L ${toPnt.x} ${toPnt.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt1.x} ${arrowPnt1.y} M ${toPnt.x} ${toPnt.y} L ${arrowPnt2.x} ${arrowPnt2.y}`);
	};

	//id記錄在 path !!
	this.getId = function () {
		return this.json.Id;
	};

	this.getFromType = function () {
		return this.json.FromType;
	};

	this.setFromType = function (fromType) {
		if (fromType == this.json.FromType)
			return;

		this._setFromTypeVars(fromType);
		this.render();
	};

	//call last
	this._init(flowBase, json, fromNode, toNode);

}//class FlowLine
