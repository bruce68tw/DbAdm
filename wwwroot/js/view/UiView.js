//ui item type
var EstrItemType = {
	Input: 'I',
	Group: 'G',		
	Row: 'R',		//只有2欄位, 只能放 group, col
	Table: 'TA',	//只能放 col
	TabPage: 'TP',	//只能放 box, group, col
};

//結構用途, 記錄item drag/drop 狀態資訊
class StItem {
	constructor(item, itemType, boxType) {
		this.item = item;
		this.itemType = itemType;
		this.boxType = boxType;		//上層box item, 無則為null
		//this.isBox = isBox;		//本身是否為box, need??
	}
}

/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 * ItemType Input欄位和Group由後端傳入, Row、Table、TabPage由前端產生
 */
class UiView {

	//建構子不能執行非同步
	constructor(ftWorkArea) {
		//內容不會變, 使用大camel
		//使用Fid, Title這2個欄位值傳到後端建立元件, 傳到前端後再取代成實際屬性
		this.Area = $(ftWorkArea);
		this.Fid = '_fid_';
		this.Title = '_title_';
		this.ClsItem = 'xu-item';	//item class
		this.ClsRowCol = 'xu-row-col';		//row col 
		this.ClsDragging = 'xu-dragging';	//加在 Area
		//this.DragBox = $('.xu-drag-box');		//拖拉時顯示的示意方框
		this.DropLine = $('.xu-drop-line');		//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.FtLabel = '.x-label';	//item label
		this.FtInput = '.x-input';	//item input
		this.ItemType = 'itemtype';	//data item type
		//
		this.NameInput = '[輸入欄位]';
		this.NameGroup = '[分群文字]';
		this.NameRow = '[欄位容器]';
		this.NameTable = '[多筆表格]';
		this.NameTabPage = '[多頁容器]';

		this.isEdit = true;		//是否可編輯, temp to true	
		//this.items = [];		//包含欄位:ItemType, Item, Childs		
		this.newItemId = 0;		//新node/line Id, 自動累加		
		this.inputJson = {};		//儲存各種輸入欄位模版, 減少後端傳回		
		this.groupHtml = '';	//儲存group html, 後端傳回

		//drag/drop相關, Box表示外層Item
		this.dragItem = new StItem();
		this.dropItem = new StItem();		
		//
		this.dragging = false;
		this.dropElm = null;	//drop參照的element, 與 item 不是同一個
		this.dropArea = null;	//實際drop的container object, 不一定是item類型, null表示workArea
		this.dropError = '';	//drop error message
		//this.dropInBox = false;	//drop in box

		//this.fnMoveItem = null;
		//this.fnAfterAddLine = null;
		//this.fnShowMenu = null;

		//work area註冊全域事件
		//右鍵選單事件
		var me = this;
		this.Area.on(EstrMouse.RightMenu, ".xu-item", function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			//e.stopPropagation(); // 阻止冒泡，避免先被 document 的 mousedown 處理

			if (me.fnShowMenu) {
				me.fnShowMenu(e, true, me);
			}
		});

		//drag/drop 事件
		this.Area.on(EstrMouse.DragStart, function (e) {
			if (me.isEdit)
				me._onDragStart(e);
		}).on(EstrMouse.DragOver, function (e) {
			if (me.dragging)
				me._onDragOver(e);
		}).on(EstrMouse.DragEnd, function (e) {
			//drop成功或失敗都會觸發
			if (me.dragging)
				me._onDragEnd(e);
		});
	}

	_onDragStart(e) {
		//e.preventDefault();		//阻止文字被選取
		this._setDragging(true);	//設定dragging狀態 & 變數

		//記錄目前移動的Item element
		var drag = this.dragItem;
		drag.item = $(e.target);
		drag.itemType = this._getItemType(drag.item);
		drag.boxType = this._getItemType(this._getBox(drag.item));
		//drag.isBox = this._isBox(drag.itemType);
	}

	_onDragOver(e) {		
		e.preventDefault();		//允許drop, 不會顯示禁止icon
		
		//#region 不能drop的情形, 不顯示訊息
		var dropElm = e.target;		//e.target 為目前經過的 element
		if (this.dropElm == dropElm) return;	//相同 element 不處理

		//drop 必須是 item
		var dropObj = $(dropElm);
		var dropItem = dropObj.closest(this.FtItem);
		if (_obj.isEmpty(dropItem)) return;
		//#endregion

		//console.log('_onDragOver-2');

		//set instance variables
		this.dropElm = dropElm;

		//set this.dropItem
		var drag = this.dragItem;
		var drop = this.dropItem;
		drop.item = dropItem;
		drop.itemType = this._getItemType(dropItem);
		//drop.isBox = this._isBox(drop.itemType);
		//drop.boxType = drop.isBox
		//	? drop.itemType : this._getItemType(this._getBox(dropItem));

		//判斷 drag item 是否 drop into box 裡面
		var dropInBox = 
			(drop.itemType == EstrItemType.Row && !dropObj.hasClass(this.ClsItem)) ||
			(drop.itemType == EstrItemType.Table && _obj.tagName(dropObj) == 'td') ||
			(drop.itemType == EstrItemType.TabPage && dropObj.hasClass('tab-pane'));
		//drop boxType表示 "drag item" drop進去的box item, 沒有則為null
		drop.boxType = dropInBox
			? drop.itemType
			: this._getItemType(this._getBox(dropItem));
		//console.log(`dragType=${drag.itemType}, dropType=${drop.itemType}, boxType=${drop.boxType}, dropInBox=${dropInBox}`);

		/*
		 x軸: drop, y軸: drag 
		 Input 和 Group drag/drop 的情形相同(!isBox), 但訊息有些不同
		 drop.boxType == null 則全部item都可以 drop到任何位置
		 I-R-T-TP: drop到Input外面-input在Row裡面-input在Table裡面-input在TabPage裡面
					I-R-T-TP	R-In	T-In	TP-In
		 ---------------------------------------------
		 I/G		O-O-x-O		O-O		O-O		O-O
		 Row		O-x-x-O		O-x		O-x		O-O
		 Table		O-x-x-x		O-x		O-x		O-x
		 TabPage	O-x-x-x		O-x		O-x		O-x
		*/

		//(只考慮)不能drop時, 記錄error message, 在後面顯示
		//!dropInBox 則都可以 drop
		//this.dropError = '';	//reset first
		var error = '';
		var dragName = '';
		var dropIsBox = this._isBox(drop.itemType);
		if (drop.boxType != null) {
			switch (drag.itemType) {
				/*
				case EstrItemType.Input:
					if (drop.itemType == EstrItemType.Table && !dropContIsEmpty)
						error = `${this.NameTable}只能放一個${this.NameInput}。`;
					break;
				*/
				case EstrItemType.Group:
					if (drop.boxType == EstrItemType.Table)
						error = `${this.NameGroup}不能放在${this.NameTable}裡面。`;
					break;
				case EstrItemType.Row:
					dragName = this.NameRow;
					switch (drop.itemType) {
						case EstrItemType.Row:
							error = `${dragName}不能放在${this.NameRow}裡面。`;
							break;
						case EstrItemType.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
						case EstrItemType.Input:
						case EstrItemType.Group:
							if (drop.boxType == EstrItemType.Row) {
								error = `${dragName}不能放在${this.NameRow}裡面。`;
							} else if (drop.boxType == EstrItemType.Table) {
								error = `${dragName}不能放在${this.NameTable}裡面。`;
							}
							break;
					}
					break;
				case EstrItemType.Table:
				case EstrItemType.TabPage:
					dragName = (drag.itemType == EstrItemType.Table)
						? this.NameTable : this.NameTabPage;
					if (dropIsBox) {
						error = `${dragName}不能放在${this._typeToName(drop.itemType)}裡面。`;
					} else {
						error = `${dragName}不能放在${this._typeToName(drop.boxType)}裡面。`;
					}
					break;
			}
		}

		//記錄 dropError 在 onDragEnd 顯示
		if (error != '')
			this.dropError = error;

		//always 顯示 target drop line
		_obj.show(this.DropLine);

		if (dropInBox) {
			dropObj.append(this.DropLine);
		} else {
			//判斷drop位置在item的上或下方
			var dropRect = drop.item[0].getBoundingClientRect();
			// 滑鼠在 drop.item 的相對位置
			var mouseY = e.clientY;
			var isUp = (mouseY < dropRect.top + (dropRect.height / 2));
			//console.log(`dragRect.top=${dragRect.top}, drop pos=${dropRect.top + dropRect.height / 2}`);
			if (isUp) {
				this.DropLine.insertBefore(drop.item);
			} else {
				this.DropLine.insertAfter(drop.item);
			}
		}
	}

	_onDragEnd(e) {
		if (this.dropError != '') {
			_tool.msg(this.dropError);
			this.dropError = '';
		} else {
			var drag = this.dragItem;
			var drop = this.dropItem;

			//移入/移出 Table 必須刪除/增加label first(only for 互斥, a ^ b 或是 a !== b)
			var checkType = EstrItemType.Table;
			if (this._isBoxTypeXor(checkType))
				this._resetItemByTable(drag.item, (drop.boxType == checkType));

			//移入/移出 Row時必須調整大小(互斥同上)
			checkType = EstrItemType.Row;
			if (this._isBoxTypeXor(checkType))
				this._resetItemByRow(drag.item, (drop.boxType == checkType));

			drag.item.insertAfter(this.DropLine);
		}

		//reset
		//_obj.hide(this.DragBox);
		_obj.hide(this.DropLine);
		this._setDragging(false);
		//this._stopDrop('');
		this.dragItem = new StItem();
		this.dropItem = new StItem();
	}

	_setDragging(status) {
		this.dragging = status;
		if (status)
			this.Area.addClass(this.ClsDragging);
		else
			this.Area.removeClass(this.ClsDragging);
	}

	//item type to name
	_typeToName(itemType) {
		switch (itemType) {
			case EstrItemType.Input:
				return this.NameInput;
			case EstrItemType.Group:
				return this.NameGroup;
			case EstrItemType.Row:
				return this.NameRow;
			case EstrItemType.Table:
				return this.NameTable;
			case EstrItemType.TabPage:
				return this.NameTabPage;
		}
	}

	/*
	_stopDrop(error) {
		this.dropError = error;
		//this.canDrop = false;
	}
	*/

	//互斥檢查 for 移入/移出 的boxType
	//param {string} checkType: 要檢查的 itemType
	//return {bool} 是否互斥
	_isBoxTypeXor(checkType) {
		var dragBoxYes = (this.dragItem.boxType === checkType);
		var dropBoxYes = (this.dropItem.boxType === checkType);
		return (dragBoxYes !== dropBoxYes);
	}

	//傳回上一層item, 沒有則傳回null
	_getBox(item) {
		var box = item.parents(this.FtItem).first();
		return _obj.isEmpty(box) ? null : box;
	}

	_isBox(type) {
		return (type == EstrItemType.Row ||
			type == EstrItemType.Table ||
			type == EstrItemType.TabPage);
	}

	/**
	 * add col
	 * param {string} inputType
	 * param {json} json 包含欄位: Fid, Title, Required
	 * returns
	 */
	async addInputA(inputType, json) {
		//get set inputJson
		var inputJson = this.inputJson;
		if (inputJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: this.Fid,		//前端重設以下4欄位
				title: this.Title,
				cols: '2,3',
				required: 1,
			};
			var tpl = await _ajax.getStrA('GetInputHtml', data);
			inputJson[inputType] = tpl;
		}

		//render ui
		//設定實際fid, title
		var html = inputJson[inputType];
		html = _str.replaceAll(html, this.Fid, json.Fid);	//多個取代
		html = _str.replaceAll(html, this.Title, json.Title);

		//如果上層為box, 則cols修改2,3 -> 4,6, 單個取代
		var item = $(html);
		if (this._boxIsRow())
			this._resetItemByRow(item, true);

		//如果required=false, 則hide
		if (!json.Required)
			_obj.hide(item.find('.x-required'));

		//render item
		this._renderItem(item, EstrItemType.Input, true);
	}

	//重設item寬度
	//param {bool} inBox: in box or not
	_resetItemByRow(item, inBox) {
		if (inBox) {
			this._labelResetRwd(item, 2, 4);
			this._inputResetRwd(item, 3, 6);
		} else {
			this._labelResetRwd(item, 4, 2);
			this._inputResetRwd(item, 6, 3);
		}
	}

	_labelResetRwd(item, oldCls, newCls) {
		this._itemResetRwd(item, true, oldCls, newCls);
	}
	_inputResetRwd(item, oldCls, newCls) {
		this._itemResetRwd(item, false, oldCls, newCls);
	}
	_itemResetRwd(item, isLabel, oldCls, newCls) {
		var cls = `col-md-${oldCls}`;
		var obj = item.find(isLabel ? this.FtLabel : this.FtInput);
		if (obj.hasClass(cls))
			obj.removeClass(cls).addClass(`col-md-${newCls}`);
	}

	//移除/增加 label, 直接搬到item, 因為內容有變
	//called by mouseUp
	_resetItemByTable(item, inBox) {
		if (inBox) {
			_obj.hide(item.find(this.FtLabel));
			this._inputResetRwd(item, 3, '3a');	//讓RWD失效
			this._inputResetRwd(item, 6, '6a');
		} else {
			_obj.show(item.find(this.FtLabel));
			this._inputResetRwd(item, '3a', 3);
			this._inputResetRwd(item, '6a', 6);
		}
	}

	async addGroupA(label) {
		if (_str.isEmpty(this.groupHtml))
			this.groupHtml = await _ajax.getStrA('GetGroupHtml', { label: label });

		//render item
		var item = $(this.groupHtml);
		this._renderItem(item, EstrItemType.Group, true);
	}

	addRow() {
		//加上py-2上下空間, 才能drop, dragOver時e.target為本身item !!
		var html = `
<div class='row py-2'>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
</div>
`;
		//render item
		var item = $(html);
		this._renderItem(item, EstrItemType.Row, true);
	}

	addTable() {
		var html = `
<div class='py-2'>
	<div class="x-btns-box">
		<span class="x-span-label">角色功能</span>
		<button type="button" data-onclick="_me.mRoleProg.onAddRow" class="btn btn-success">新增一列
			<i class="ico-plus"></i>
		</button>
	</div>

	<table class="table x-table x-no-hline" cellspacing="0">
		<thead>
			<tr>
				<th>欄位1</th>
				<th>欄位2</th>
				<th>欄位3</th>
				<th>欄位4</th>
				<th>欄位5</th>
			</tr>
		</thead>
		<tbody id="tbodyRoleProg">
			<tr>
				<td class="xu-td"></td>
				<td class="xu-td"></td>
				<td class="xu-td"></td>
				<td class="xu-td"></td>
				<td class="xu-td"></td>
			</tr>
		</tbody>
	</table>
</div>
`;
		//render item
		var item = $(html);
		this._renderItem(item, EstrItemType.Table, true);
	}

	_renderItem(item, itemType, append) {
		//加入item屬性: .xu-item, data-itemtype
		//table有上方addRow, 下方table(才是xu-item)
		//var item2 = (itemType == EstrItemType.Table) ? item.find('.x-table') : item;
		item.addClass(this.ClsItem);
		item.attr("draggable", true);
		_obj.setData(item, this.ItemType, itemType);	//jquery data() 只寫入暫存, 使用 _obj !!

		//append 整個item, 不是item2 !!
		if (append) {
			var box = _obj.isEmpty(this.dropArea) ? this.Area : this.dropArea;
			box.append(item);
		}
	}

	_moveDragBox(e) {
		this.DragBox.css({
			left: e.pageX + 2,
			top: e.pageY - 2,
		});
	}

	//get item type
	_getItemType(item) {
		return _obj.isEmpty(item)
			? null : item.data(this.ItemType);
	}

	//??
	getItemId(item) {
		//get id

		this.newItemId++;
		return this.newItemId;
	}

	setEdit(status) {
		this.isEdit = status;
	}

	//?? 上層是否為box
	_boxIsRow() {
		return (this.dropBox != null && this._getItemType(this.dropBox) == EstrItemType.Row);
	}

	//內部element to Item object
	_elmToItem(elm) {
		return $(elm).closest(this.FtItem);
	}

	//??
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
		let item = (itemType == EstrItemType.Input) ? new UiInput(this, json) :
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

	//??清除全部UI元件
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

	//??
	deleteItem(item) {
		let id = item.getId();
		//this.svg.findOne(`g[data-id="${id}"]`).remove();

		//todo remove items[] element
	}

	/*
	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.items.some(node => node.getNodeType() == EstrNodeType.Start);
	};
	*/

} //class UiView
