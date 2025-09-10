//ui item type
var EstrItemType = {
	Col: 'C',
	Group: 'G',		
	Row: 'R',		//只有2欄位, 只能放 group, col
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
 * ItemType Col欄位和Group由後端傳入, Row、Table、TabPage由前端產生
 */
class UiView {

	//建構子不能執行非同步
	constructor(ftWorkArea) {
		//內容不會變, 使用大camel
		this.Area = $(ftWorkArea);
		//this.AreaElm = this.Area[0];
		
		//constant
		//使用Fid, Title這2個欄位值傳到後端建立元件, 傳到前端後再取代成實際屬性
		this.Fid = '_fid_';
		this.Title = '_title_';
		this.ItemType = 'itemtype';	//data item type
		this.ClsItem = 'xu-item';	//item class
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.ClsRowCol = 'xu-row-col';		//row col 
		this.ClsDragArea = 'xu-drag-area';	//加在 Area
		this.ClsDragIcon = 'xu-drag-ico';
		this.DragIconHtml = `<i class='ico-arrow4 ${this.ClsDragIcon}'></i>`;
		this.DragBox = $('.xu-drag-box');		//拖拉時顯示的示意方框
		this.DropLine = $('.xu-drop-line');		//drop時顯示的位置線

		//包含欄位:ItemType, Item, Childs
		this.items = [];

		//新node/line Id, 自動累加
		this.newItemId = 0;

		//儲存各種輸入欄位模版, 減少後端傳回
		this.colJson = {};

		//儲存group html, 後端傳回
		this.groupHtml = '';

		//this.nowBox = null;

		//移動中item element
		this.canDrop = false;		//target正確才會true
		this.dragging = false;
		this.dragItem = null;
		//this.dragItemElm = null;
		this.dragItemType = '';
		this.dragIsBox = false;		//drag item is box
		this.dragIcon = null;
		//this.dragIconElm = null;

		//moving target item element
		this.dropItem = null;		//moving target Item object
		this.dropItemType = null;	//moving target Item type
		this.dropBox = null;		//moving target Box object, null表示workArea
		this.dropBoxType = null;	//moving target Box ItemType, null表示workArea

		//this.fnMoveItem = null;
		//this.fnAfterAddLine = null;
		//this.fnShowMenu = null;

		//是否可編輯
		this.isEdit = true;	//temp to true

		//註冊area事件
		var me = this;
		this.Area.on(EstrMouse.MouseMove, function (e) {
			if (me.isEdit)
				me._onMouseMove(e);
		}).on(EstrMouse.MouseUp, function (e) {
			if (me.isEdit)
				me._onMouseUp(e);
		});
	}

	_onMouseMove(e) {
		//判斷顯示target在上或下
		if (this.dragItem == null) return;
		//if (e.target == this.AreaElm) return;

		//e.target 為目前經過的 element
		var dropItem = $(e.target).closest(this.FtItem);
		if (_obj.isEmpty(dropItem)) return;

		//set instance variables
		if (this.dropItem == dropItem) return;

		this.dropItem = dropItem;
		this.dropItemType = this._getItemType(dropItem);

		//調整, todo: 其他 itemtype
		if (this.dropItemType == EstrItemType.Row) {
			this.dropBox = dropItem;
			this.dropBoxType = this.dropItemType;
		} else {
			this.dropBox = dropItem.parent(this.FtItem).first();
			this.dropBoxType = _obj.isEmpty(this.dropBox)
				? null : this.dropBox.data(this.ItemType);
		}
		console.log(`dropItemType=${this.dropItemType}`);

		//禁止移動的情形
		if (this.dropBoxType != null) {
			if (this.dropBoxType == EstrItemType.Table) {
				//table內不能放group
				if (this.dragItemType == EstrItemType.Group) {
					this._stopDrop();
					return;
				}
			} else {
				//row, tabPage 內不能放 box
				if (this.dragIsBox) {
					this._stopDrop();
					return;
				}
			}
		}

		//set instance
		this.canDrop = true;

		//顯示 target drop line
		_obj.show(this.DropLine);

		//todo: 如果target元素 sort=1, 須判斷移到上方或下方, 否則為下方
		if (this.dropBox != null) {
			this.dropBox.append(this.DropLine);
		} else {
			this.DropLine.insertAfter(this.dropItem);
		}

		//移動 drag box 到 mouse 位置
		this._moveDragBox(e);
	}

	_onMouseUp(e) {
		//console.log('_mouseUp');
		if (!this.dragging) return;

		//move item
		this.dragItem.insertAfter(this.dropItem);

		//reset
		this.Area.removeClass(this.ClsDragArea);
		//this.dragItem.removeClass(this.ClsDragItem);
		this.dragging = false;
		this.dragItem = null;
		//this.dragItemElm = null;
		_obj.hide(this.DragBox);
		this._stopDrop();
	}

	//item事件
	_setEventItem(item) {
		//set drag icon event
		var me = this;	//UiItem
		var icon = item.find('.' + me.ClsDragIcon);
		icon.on(EstrMouse.MouseDown, function (e) {
			if (!me.isEdit) return;

			e.preventDefault();   //阻止文字被選取

			//記錄目前移動的Item element
			me.dragging = true;
			me.Area.addClass(me.ClsDragArea);
			me.dragItem = me._elmToItem(this);
			//me.dragItem.addClass(me.ClsDragItem);
			//me.dragItemElm = me.dragItem[0];
			me.dragItemType = me._getItemType(me.dragItem);
			me.dragIsBox = (me.dragItemType != EstrItemType.Col && me.dragItemType != EstrItemType.Group);

			//move & show drag box
			me._moveDragBox(e);
			_obj.show(me.DragBox);
		});

		//右鍵選單
		item.on(EstrMouse.RightMenu, function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			if (me.fnShowMenu)
				me.fnShowMenu(e, true, me);
		});
	}

	/**
	 * add col
	 * param {string} inputType
	 * param {json} json 包含欄位: Fid, Title, Required
	 * returns
	 */
	async addColA(inputType, json) {
		//get set colJson
		var colJson = this.colJson;
		if (colJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: this.Fid,		//前端重設
				title: this.Title,	//前端重設
				cols: '2,3',		//前端重設
				required: 1,		//前端重設
			};
			var tpl = await _ajax.getStrA('GetColHtml', data);
			colJson[inputType] = tpl;
		}

		//render ui
		//設定實際fid, title
		var html = colJson[inputType];
		html = _str.replaceAll(html, this.Fid, json.Fid);	//多個取代
		html = _str.replaceAll(html, this.Title, json.Title);

		//如果上層為box, 則cols修改2,3 -> 4,6, 單個取代
		if (this._upIsRow()) {
			html = html.replace('col-md-2', 'col-md-4')
				.replace('col-md-3', 'col-md-6');
		}

		//如果required=false, 則hide
		var item = $(html);
		//this._setItemProp(item, EstrItemType.Col);
		if (!json.Required) {
			_obj.hide(item.find('.x-required'));
		}

		//label左邊加上drag icon
		item.find('.x-label').prepend(this.DragIconHtml);

		//render item
		this._renderItem(EstrItemType.Col, item);
	}

	async addGroupA(label) {
		//get set colJson
		if (_str.isEmpty(this.groupHtml))
			this.groupHtml = await _ajax.getStrA('GetGroupHtml', { label: label });

		//label左邊加上drag icon
		var item = $(this.groupHtml);
		//item.find('.x-group-label').prepend(this.DragIconHtml);
		item.prepend(this.DragIconHtml);

		//render item
		this._renderItem(EstrItemType.Group, item);
	}

	addRow() {
		var html = `
<div class='row'>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
</div>
        `;
		//label左邊加上drag icon
		var item = $(html);
		//item.find('div').first().prepend(this.DragIconHtml);
		item.prepend(this.DragIconHtml);

		//render item
		this._renderItem(EstrItemType.Row, item);
	}

	_renderItem(itemType, item) {
		//加入item屬性: .xu-item, data-itemtype
		item.addClass(this.ClsItem);
		item.data(this.ItemType, itemType);

		//註冊事件
		this._setEventItem(item);

		//append item
		var box = _obj.isEmpty(this.dropBox) ? this.Area : this.dropBox;
		box.append(item);
	}

	/*
	//加入item屬性: .xu-item, data-itemtype
	_setItemProp(item, itemType) {
		item.addClass(this.ClsItem);
		item.data(this.ItemType, itemType);

		//label左邊加上drag icon
		item.find('.x-label').prepend(`<i class='ico-arrow4 ${this.ClsDragIcon}'></i>`);
	}
	*/

	_moveDragBox(e) {
		this.DragBox.css({
			left: e.pageX + 2,
			top: e.pageY - 2,
		});
	}

	_stopDrop() {
		this.canDrop = false;
		_obj.hide(this.DropLine);
	}

	//get item type
	_getItemType(item) {
		return item.data(this.ItemType);
	}

	getItemId(item) {
		//get id

		this.newItemId++;
		return this.newItemId;
	}

	setEdit(status) {
		this.isEdit = status;
	}

	//上層是否為box
	_upIsRow() {
		return (this.dropBox != null && this._getItemType(this.dropBox) == EstrItemType.Row);
	}

	//內部element to Item object
	_elmToItem(elm) {
		return $(elm).closest(this.FtItem);
	}

	idToItem(id) {
		//elm.node 指向dom
		return this.items.find(a => a.getId() == id);
	}

	//??
	async addItem(json, box) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.items.length + 1) * (-1);
		var itemType = json.ItemType;
		let item = (itemType == EstrItemType.Col) ? new UiCol(this, json) :
			(itemType == EstrItemType.Row) ? new UiBox(this, json) :
			(itemType == EstrItemType.Group) ? new UiGroup(this, json) :
			(itemType == EstrItemType.Table) ? new UiTable(this, json) :
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

	//get new node id
	getNewItemId() {
		this.newItemId++;
		return this.newItemId;
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
