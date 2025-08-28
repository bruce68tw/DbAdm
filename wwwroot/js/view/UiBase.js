//ui item type
var EstrUiType = {
	Col: 'C',
	Box: 'B',
	Group: 'G',
	Table: 'T',
};

//input type, 對應 XpCode.Type=InputType、QEitemTypeEstr.cs
var EstrInputType = {
	Hide: 'H',
	Text: 'T',
	TextArea: 'TA',
	Integer: 'INT',
	Decimal: 'DEC',
	Select: 'S',
	CheckBox: 'C',
	Radio: 'R',
	Date: 'D',
	DateTime: 'DT',
	File: 'F',
	Html: 'HTML',
	Sort: 'SO',
	Modal: 'MO',
	Password: 'PWD',
	ReadOnly: 'RO',
};

class UiBase {

	constructor(boxId) {
		this.boxId = boxId;

		let boxDom = document.getElementById(boxId);
		//this.svg = SVG().addTo(boxDom).size('100%', '100%');

		//constant
		this.Fid = '_fid_';
		this.Title = '_title_';

		//記錄各種輸入欄位模版, 減少後端傳回
		this.inputJson = {};

		this.fnMoveItem = null;
		this.fnAfterAddLine = null;
		this.fnShowMenu = null;

		//是否可編輯
		this.isEdit = false;

		//新node/line Id, 自動累加
		this.newItemId = 0;		//for node type

	}

	//get new node id
	getNewItemId() {
		this.newItemId++;
		return this.newItemId;
	}

	setEdit(status) {
		this.isEdit = status;
	}

	//清除全部UI元件
	reset() {
		this.items = [];
		//this.lines = [];
		//this.fromNode = null;

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

	async addCol(box, inputType, fid, title, layout) {
		var item = new UiCol(this);
		/*
		if (item == null) {
			console.log(`json.ItemType is wrong.(${json.ItemType})`);
			return null;
		}
		*/

		//產生UI元件
		//, inputType, fid, title, layout
		var html = await item.newHtml(inputType, this.Fid, this.Title, layout);
		html = _str.replaceAll(html, this.Fid, fid);
		html = _str.replaceAll(html, this.Title, title);
		box.append(html);

		this.newItemId++;
		this.items.push(item);
		return item;
	}

	async addItem(json, box) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.items.length + 1) * (-1);
		var itemType = json.ItemType;
		let item = (itemType == EstrUiType.Col) ? new UiCol(this, json) :
			(itemType == EstrUiType.Box) ? new UiBox(this, json) :
			(itemType == EstrUiType.Group) ? new UiGroup(this, json) :
			(itemType == EstrUiType.Table) ? new UiTable(this, json) :
			null;

		if (item == null) {
			console.log(`json.ItemType is wrong.(${json.ItemType})`);
			return null;
		}

		//產生UI元件
		var html = await item.newHtml(json);
		box.append(html);

		this.newItemId++;
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
		return this.items.some(node => node.getNodeType() == EstrNodeType.Start);
	};
	*/

	//call last
	//this._init(boxId);

} //class UiBase


class UiItem {

	constructor(uiBase) {

		//start/end node radius
		//this.MinRadius = 20;

		/*
		//normal node size
		this.MinWidth = 80;
		this.MinHeight = 42;
		this.LineHeight = 18;	//文字行高
		this.PadTop = 8;
		this.PadLeft = 15;

		this.PinWidth = 12;
		this.PinGap = 3;
		*/

		this.self = this;
		this.uiBase = uiBase;

		//this._setEvent();
	}

	//(子代覆寫)傳回html內容
	newHtml(json) {
		return '';
	}

	/*
	this.getLines = function () {
		return this.lines;
	};

	//是否為起迄節點
	this._isStartEnd = function () {
		return (this.json.NodeType == EstrNodeType.Start || this.json.NodeType == EstrNodeType.End);
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
		this.pinElm.draggable().on(EstrMouse.DragStart, (event) => {
			if (!uiBase.isEdit) return;

		}).on(EstrMouse.DragMove, (event) => {
			if (!uiBase.isEdit) return;

			//阻止 connector 移動
			event.preventDefault();

		}).on(EstrMouse.DragEnd, (event) => {
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
	/*
	constructor(json) {
	}
	*/

	//(子代覆寫)傳回html內容
	async newHtml(inputType, fid, title, cols) {
		/*
		var inputType = json.InputType;
		if (_str.isEmpty(inputType))
			return '';
		*/

		var inputJson = this.uiBase.inputJson;
		if (inputJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: fid,
				title: title,
				cols: cols,
			};
			var html = await _ajax.getStrA('GetInputHtml', data);
			inputJson[inputType] = html;
		}
		return inputJson[inputType];
	}

}

class UiBox extends UiItem {

}

class UiGroup extends UiItem {

}

class UiTable extends UiItem {

}