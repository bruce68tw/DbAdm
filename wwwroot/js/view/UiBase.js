
//靜態類別 for UiBase.js only
var _uiType = {
	Col: 'C',
	Box: 'B',
	Group: 'G',
	Table: 'T',
};

/**
 * 自定函數(由flow內部觸發):
 * void fnMoveNode(node, x, y): after move node to (x,y)
 * void fnAfterAddLine(json): when add line
 * void fnShowMenu(isNode, flowItem, event);
 * void fnAfterMoveLineEnd(oldNode, newNode): after drop line end point
 */
//控制 UiItem、FlowLine for 外部程式
/**
 屬性:
 //boxElm: box element
 //svg: svg
 items: items
 lines: lines
 fromNode: drap start node
 onMoveNode: event onMoveNode(node)
*/
class UiBase {

	constructor(boxId) {
		this.boxId = boxId;

		let boxDom = document.getElementById(boxId);
		//this.svg = SVG().addTo(boxDom).size('100%', '100%');

		this.fnMoveItem = null;
		this.fnAfterAddLine = null;
		this.fnShowMenu = null;
		//this._reset();
	}


	//是否可編輯
	isEdit = false;

	//新node/line Id, 自動累加
	newItemId = 0;		//for node type
	//this.newLineId = 0;

	/*
	_init(boxId) {
		let boxDom = document.getElementById(boxId);
		//this.svg = SVG().addTo(boxDom).size('100%', '100%');

		this.fnMoveItem = null;
		this.fnAfterAddLine = null;
		this.fnShowMenu = null;
		//this._reset();
	}
	*/

	/*
	this.newItemId = function () {
		this.newItemId++;
		return this.newItemId;
	};
	*/

	//get new node id
	getNewItemId() {
		this.newItemId++;
		return this.newItemId;
	}

	/*
	//由元件內部發動, 所以必須提供此功能
	this.getNewLineId = function () {
		this.newLineId++;
		return this.newLineId;
	};
	*/

	setEdit(status) {
		this.isEdit = status;
	}

	//清除全部UI元件
	reset() {
		this.items = [];
		//this.lines = [];
		this.fromNode = null;

		/*
		//刪除 svg 裡面的全部子元素
		Array.from(this.svg.node.childNodes).forEach(node => {
			node.remove();
		});
		*/
	}

	//載入items & lines
	loadItems(rows) {
		this.reset();
		for (var i = 0; i < rows.length; i++)
			this.addItem(rows[i]);
	}

	/*
	this.loadLines = function (rows) {
		if (rows != null) {
			for (var i = 0; i < rows.length; i++)
				this.addLine(rows[i]);
		}
	};
	*/

	addItem(json) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.items.length + 1) * (-1);
		var itemType = json.ItemType;
		let item = (itemType == _uiType.Col) ? new UiCol(this, json) :
			(itemType == _uiType.Box) ? new UiBox(this, json) :
			(itemType == _uiType.Group) ? new UiGroup(this, json) :
			(itemType == _uiType.Table) ? new UiTable(this, json) :
			null;

		if (item == null) {
			console.log(`json.ItemType is wrong.(${json.ItemType})`);
			return null;
		}

		this.items.push(item);
		return item;
	}

	/*
	this.addLine = function (json) {
		return new FlowLine(this, json);
	};
	*/

	deleteItem(item) {
		let id = item.getId();
		//this.svg.findOne(`g[data-id="${id}"]`).remove();

		//todo remove items[] element
	}

	/*
	this.deleteLine = function (line) {
		let id = line.getId();
		this.svg.find(`path[data-id="${id}"]`).remove();	//含path2(data-id相同)
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
	*/

	idToItem(id) {
		//elm.node 指向dom
		return this.items.find(a => a.getId() == id);
	}

	/*
	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.items.some(node => node.getNodeType() == _flow.TypeStart);
	};
	*/

	//call last
	//this._init(boxId);

} //class FlowBase

/**
  流程節點
  屬性:
    self: this
    uiBase: FlowBase object
    svg: uiBase.svg
    json: node json, 欄位與後端XgFlowE相同: Id(不變), NodeType(不變), Name, PosX, PosY, Width, Height
    elm: svg group element(與 html element不同)
    boxElm: border element
    textElm: text element
    lines: 進入/離開此節點的流程線
    width: width
    height: height
  param uiBase {object} FlowBase
  param json {json} 流程節點資料
 */ 
class UiItem {

	constructor(uiBase, json) {
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

		this._init(uiBase, json);
	}

	_init(uiBase, json) {
		this.self = this;
		this.uiBase = uiBase;
		//this.svg = uiBase.svg;
		this.json = Object.assign({
			Name: 'Node',
			NodeType: _flow.TypeNode,
			PosX: json.PosX || 100,
			PosY: json.PosY || 100,
			//Width: 100,	//??
			//Height: 50,	//??
		}, json);

		//set instance variables
		//this.lines = [];

		let nodeType = this.json.NodeType;
		let cssClass = '';
		let nodeText = '';

		// 建立一個 group(有x,y, 沒有大小, 含文字的節點框線), 才能控制文字拖拉
		//??
		/*
		this.elm = this.svg
			.group()
			.attr('data-id', json.Id)
		*/

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
		if (nodeType != _flow.TypeEnd) {
			this.pinElm = this.elm
				.rect(this.PinWidth, this.PinWidth)
				.addClass('xf-pin');
			this._setPinPos();
		}

		this._setEvent();
	}

	/*
	this.getLines = function () {
		return this.lines;
	};

	//是否為起迄節點
	this._isStartEnd = function () {
		return (this.json.NodeType == _flow.TypeStart || this.json.NodeType == _flow.TypeEnd);
	};
	*/

	getItemType() {
		return this.json.ItemType;
	}

	/*
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

	//set pin position
	_setPinPos() {
		//連接點 右移3px
		if (!this.pinElm) return;

		let bbox = this.nameElm.bbox();
		let center = this.getCenter();
		this.pinElm.move(center.x + bbox.width / 2 + 3, center.y - 5);
	}
	*/

	_setEvent() {
		//enable right click menu
		let me = this;	//UiItem
		let uiBase = this.uiBase;

		this.elm.node.addEventListener('contextmenu', function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (uiBase.fnShowMenu)
				uiBase.fnShowMenu(event, true, me);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		this.elm.draggable().on(this.DragMove, () => {
			if (!uiBase.isEdit) return;

			this._drawLines();
		}).on(this.DragEnd, (event) => {
			if (!uiBase.isEdit) return;

			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (this.uiBase.fnMoveItem)
				this.uiBase.fnMoveItem(this, x, y);
		});

		//set connector draggable
		//this._setEventPin();
	}

	/*
	this._drawLines = function () {
		this.lines.forEach(line => line.render());
	};
	*/

	/*
	//set event of node connector
	//pin表示起始節點內的連接點
	_setEventPin() {
		if (!this.pinElm)
			return;

		let fromDom, startX, startY;
		let tempLine;
		let toElm = null;
		let me = this;	//flowNode
		let uiBase = this.uiBase;

		// 啟用 pinElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pinElm !!
		this.pinElm.draggable().on(this.DragStart, (event) => {
			if (!uiBase.isEdit) return;

		}).on(this.DragMove, (event) => {
			if (!uiBase.isEdit) return;

			//阻止 connector 移動
			event.preventDefault();

		}).on(this.DragEnd, (event) => {
			if (!uiBase.isEdit) return;

			// 檢查座標值是否有效
			if (toElm) {
				me._markItem(toElm, false);
				var id = toElm.parent().node.dataset.id;
				var json = uiBase.drawLineEnd(uiBase.idToItem(id));
				toElm = null;

				//trigger event
				if (uiBase.fnAfterAddLine)
					uiBase.fnAfterAddLine(json);
			}
			tempLine.remove();
		});
	}
	*/

	//high light node
	_markItem(elm, status) {
		if (status) {
			elm.node.classList.add('on');
		} else {
			elm.node.classList.remove('on');
		}
	}

	//id記錄在 group elm !!
	getId() {
		return this.json.Id;
	}

	/*
	this.addLine = function (line) {
		this.lines.push(line);
	};

	this.deleteLine = function (line) {
		let index = this.lines.findIndex(item => item.Id == line.Id);
		this.lines.splice(index, 1);
	};
	*/

	getName() {
		return this.nameElm.text();
	}

	/**
	 * set node name only for TypeNode, 考慮多行
	 * called by initial, 前端改變node name
	 * param name {string} 
	 * param drawLine {bool} re-draw line or not
	 */ 
	setName(name, drawLine) {
		// 更新文字內容, 後端傳回會加上跳脫字元, js 2021才有 replaceAll, 所以自製
		var lines = _str.replaceAll(name, '\\n', '\n').split('\n');
		this.nameElm.clear().text(function (add) {
			lines.forEach((line, i) => {
				if (i > 0)
					add.tspan(line).newLine().dy(this.LineHeight);
				else
					add.tspan(line);
			});
		});

		// 獲取新文字尺寸
		const bbox = this.nameElm.bbox();

		// 更新矩形尺寸
		var width = Math.max(this.MinWidth, bbox.width + this.PadLeft * 2 + this.PinWidth + this.PinGap * 2);
		var height = Math.max(this.MinHeight, bbox.height + this.PadTop * 2);
		this.boxElm.size(Math.round(width), Math.round(height));

		// 重新居中文字
		this.nameElm.center(this.boxElm.cx(), this.boxElm.cy());

		if (drawLine)
			this._drawLines();
	}

	//call last
	//this._init(uiBase, json);

}//class UiItem


//輸入欄位
class UiCol extends UiItem {

}
class UiBox extends UiItem {

}

class UiGroup extends UiItem {

}

class UiTable extends UiItem {

}