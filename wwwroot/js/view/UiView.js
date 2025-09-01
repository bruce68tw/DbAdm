//ui item type
var EstrUiType = {
	Col: 'C',
	Box: 'B',		//只能放 group, col
	Group: 'G',		
	Table: 'TA',	//只能放 col
	TabPage: 'TP',	//只能放 box, group, col
};

//input type, 對應 XpCode.Type=InputType、QEitemTypeEstr.cs
var EstrInputType = {
	Check: 'C',
	Date: 'D',
	DateTime: 'DT',
	Decimal: 'DEC',
	File: 'F',
	//Hide: 'H',
	Html: 'HTML',
	Integer: 'INT',
	Modal: 'MO',
	//Password: 'PWD',
	Radio: 'R',
	Read: 'RO',
	Select: 'S',
	//Sort: 'SO',
	Text: 'T',
	Textarea: 'TA',
};

/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 */
class UiView {

	constructor(boxId) {
		this.box = $('#' + boxId);

		//let boxDom = document.getElementById(boxId);
		//this.svg = SVG().addTo(boxDom).size('100%', '100%');

		//constant
		//使用這2個欄位傳到後端建立元件, 傳到前端後再取代成實際屬性
		this.Fid = '_fid_';
		this.Title = '_title_';

		//包含欄位:ItemType, Item, Childs
		this.items = [];

		//新node/line Id, 自動累加
		this.newItemId = 0;

		//儲存各種輸入欄位模版, 減少後端傳回
		this.colJson = {};

		this.nowBoxElm = null;

		//this.fnMoveItem = null;
		//this.fnAfterAddLine = null;
		//this.fnShowMenu = null;

		//是否可編輯
		this.isEdit = false;

	}

	getUiType(item) {
		//get id
		var id = this.getItemId(item);

		this.newItemId++;
		return this.newItemId;
	}

	getItemId(item) {
		//get id

		this.newItemId++;
		return this.newItemId;
	}

	/**
	 * add col
	 * param {string} inputType
	 * param {json} json 包含欄位: Fid, Title, Required
	 * returns
	 */
	async addCol(inputType, json) {
		var col = new UiCol(this);
		/*
		if (item == null) {
			console.log(`json.ItemType is wrong.(${json.ItemType})`);
			return null;
		}
		*/

		//get set colJson
		var colJson = this.uiView.colJson;
		if (colJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: this.Fid,		//前端重設
				title: this.Title,	//前端重設
				//Cols: '2,3',		//前端重設
				//Required: 1,		//前端重設
			};
			var tpl = await _ajax.getStrA('GetColHtml', data);
			colJson[inputType] = tpl;
		}

		//render ui
		//設定實際fid, title
		var html = colJson[inputType];
		html = _str.replaceAll(html, this.Fid, fid);	//多個取代
		html = _str.replaceAll(html, this.Title, title);

		//如果上層為box, 則cols改為4,6, 單個取代
		if (this.upIsBox()) {
			html = html.replace('col-md-2', 'col-md-4')
				.replace('col-md-3', 'col-md-6');
		}

		//如果required=false, 則加上class d-none
		var obj = $(html);
		if (!json.Required) {
			obj.find('.x-required').addClass('d-none');
		}

		//註冊事件

		box.append(obj);

		/*
		//add into EditMany mItem
		//加到 items
		this.newItemId++;
		this.items.push(item);
		return item;
		*/
	}

	//上層是否為box
	upIsBox() {
		return (_itext.get('ItemType', $(this.nowBoxElm)) == EstrUiType.Box);
	}

	elmToItem(elm) {
		//elm.node 指向dom
		return this.items.find(a => a.getId() == id);
	}

	idToItem(id) {
		//elm.node 指向dom
		return this.items.find(a => a.getId() == id);
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

	//定義通用事件
	_setEvent(obj) {
		//點擊右鍵顯示menu(for col, table, group only)
		//mouse over 顯示拖拉圖示
		//drag over 顯示拖放位置
		//drag end 移動位置

		//enable right click menu
		var me = this;	//UiItem
		var uiView = this.uiView;
		var elm = obj[0];

		obj.on(EstrMouse.RightMenu, function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			if (uiView.fnShowMenu)
				uiView.fnShowMenu(e, true, me);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		elm.draggable().on(EstrMouse.DragMove, () => {
			if (!uiView.isEdit) return;

			this._drawLines();
		}).on(EstrMouse.DragEnd, (event) => {
			if (!uiView.isEdit) return;

			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (uiView.fnMoveItem)
				uiView.fnMoveItem(this, x, y);
		});

		//set connector draggable
		//this._setEventPin();
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

	/*
	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.items.some(node => node.getNodeType() == EstrNodeType.Start);
	};
	*/

	//call last
	//this._init(boxId);

} //class UiView


class UiItem {

	constructor(uiView) {

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

		//set variables
		this.self = this;
		this.uiView = uiView;

		//render元件

		//set event
		this._setEvent();
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

	//定義通用事件
	_setEvent() {
		//點擊右鍵顯示menu(for col, table, group only)
		//mouse over 顯示拖拉圖示
		//drag over 顯示拖放位置
		//drag end 移動位置

		//enable right click menu
		let me = this;	//UiItem
		let uiView = this.uiView;

		this.elm.node.addEventListener(EstrMouse.RightMenu, function (event) {
			event.preventDefault(); // 阻止瀏覽器的右鍵功能表
			if (uiView.fnShowMenu)
				uiView.fnShowMenu(event, true, me);
		});

		//set node draggable, drag/drop 為 boxElm, 不是 elm(group) !!
		this.elm.draggable().on(EstrMouse.DragMove, () => {
			if (!uiView.isEdit) return;

			this._drawLines();
		}).on(EstrMouse.DragEnd, (event) => {
			if (!uiView.isEdit) return;

			let { x, y } = event.detail.box;
			//console.log(`x=${x}, y=${y}`);

			//trigger event
			if (this.uiView.fnMoveItem)
				this.uiView.fnMoveItem(this, x, y);
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
		let uiView = this.uiView;

		// 啟用 pinElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pinElm !!
		this.pinElm.draggable().on(EstrMouse.DragStart, (event) => {
			if (!uiView.isEdit) return;

		}).on(EstrMouse.DragMove, (event) => {
			if (!uiView.isEdit) return;

			//阻止 connector 移動
			event.preventDefault();

		}).on(EstrMouse.DragEnd, (event) => {
			if (!uiView.isEdit) return;

			// 檢查座標值是否有效
			if (toElm) {
				me._markItem(toElm, false);
				var id = toElm.parent().node.dataset.id;
				var json = uiView.drawLineEnd(uiView.idToItem(id));
				toElm = null;

				//trigger event
				if (uiView.fnAfterAddLine)
					uiView.fnAfterAddLine(json);
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
	//this._init(uiView, json);

}//class UiItem


//輸入欄位
class UiCol extends UiItem {
	constructor(uiView) {

		//註冊事件
		// 啟用 pinElm 的拖拽功能, 使用箭頭函數時 this 會指向類別實例 !!, 使用 function則會指向 pinElm !!
		this.pinElm.draggable().on(EstrMouse.DragStart, (event) => {
			if (!uiView.isEdit) return;

		}).on(EstrMouse.DragMove, (event) => {
			if (!uiView.isEdit) return;

			//阻止 connector 移動
			event.preventDefault();

		}).on(EstrMouse.DragEnd, (event) => {
			if (!uiView.isEdit) return;

			// 檢查座標值是否有效
			if (toElm) {
				me._markItem(toElm, false);
				var id = toElm.parent().node.dataset.id;
				var json = uiView.drawLineEnd(uiView.idToItem(id));
				toElm = null;

				//trigger event
				if (uiView.fnAfterAddLine)
					uiView.fnAfterAddLine(json);
			}
			tempLine.remove();
		});
	}

	//(子代覆寫)傳回html內容
	async newHtml(inputType, fid, title, cols) {
		/*
		var inputType = json.InputType;
		if (_str.isEmpty(inputType))
			return '';
		*/

		var colJson = this.uiView.colJson;
		if (colJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: fid,
				title: title,
				cols: cols,
			};
			var html = await _ajax.getStrA('GetColHtml', data);
			colJson[inputType] = html;
		}
		return colJson[inputType];
	}

}

class UiBox extends UiItem {

}

class UiGroup extends UiItem {

}

class UiTable extends UiItem {

}