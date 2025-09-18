//ui item type
let EstrItemType = {
	Input: 'I',
	Group: 'G',		
	Row: 'R',		//只有2欄位, 只能放 group, col
	Table: 'TA',	//只能放 col
	TabPage: 'TP',	//只能放 box, group, col
};

//結構用途, 記錄item drag/drop 狀態資訊
class StItem {
	constructor(item, itemType, boxType, boxId) {
		this.item = item;
		this.itemType = itemType;
		this.boxType = boxType;		//上層box item, 無則為null
		this.boxId = boxId;			//fnMoveBox 時傳入
		//this.isBox = isBox;		//本身是否為box, need??
	}
}

/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 * ItemType Input欄位和Group由後端傳入, Row、Table、TabPage由前端產生
 * 以下情形要寫回 mItem:
 *   1.item 改變 boxId (fnMoveBox)
 *   2.在modal修改item內容 (fnShowMenu)
 *   3.delete item (fnShowMenu)
 */
class UiView {

	//建構子不能執行非同步
	constructor(ftWorkArea) {
		//內容不會變, 使用大camel
		//使用Fid, Title這2個欄位值傳到後端建立元件, 傳到前端後再取代成實際屬性
		this.Area = $(ftWorkArea);
		this.ClsItem = 'xu-item';			//item class
		this.ClsRowCol = 'xu-row-col';		//row col 
		this.ClsDragging = 'xu-dragging';	//加在 Area
		this.DataId = 'id';					//for data-id
		this.DataItemType = 'itemtype';		//for data-itemtype
		this.DropLine = $('.xu-drop-line');	//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.FtLabel = '.x-label';			//item label
		this.FtInput = '.x-input';			//item input
		this.FtReq = '.x-required';			//required
		this.FtTipIcon = '.ico-info';		//label tip icon
		this.FtInputNote = '.x-input-note';	//input note
		this.FtGroupTitle = '.x-group-title';	//group title
		//
		this.NameInput = '[輸入欄位]';
		this.NameGroup = '[分群文字]';
		this.NameRow = '[欄位容器]';
		this.NameTable = '[多筆表格]';
		this.NameTabPage = '[多頁容器]';

		this.isEdit = true;		//是否可編輯, temp to true	
		this.newItemId = 0;		//新item Id, 自動累減, 使用負數!!		
		this.inputJson = {};	//儲存各種輸入欄位模版, 減少後端傳回		
		this.groupHtml = '';	//儲存group html, 後端傳回

		//drag/drop相關, Box表示外層Item
		this.dragItem = new StItem();
		this.dropItem = new StItem();		
		//
		this.dragging = false;
		this.dropElm = null;	//drop參照的element, 與 item 不是同一個
		this.dropArea = null;	//實際drop的container object, 不一定是item類型, null表示workArea
		this.dropError = '';	//drop error message

		this.fnMoveBox = null;
		//this.fnAfterAddLine = null;
		this.fnShowMenu = null;

		//work area註冊全域事件
		//右鍵選單事件
		let me = this;
		this.Area.on(EstrMouse.RightMenu, this.FtItem, function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			//e.stopPropagation(); // 阻止冒泡，避免先被 document 的 mousedown 處理

			if (me.fnShowMenu) {
				let item = me._elmToItem(e.target);
				me.fnShowMenu(e, item);
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

	//#region drag/drop 事件相關
	_onDragStart(e) {
		//e.preventDefault();		//阻止文字被選取
		this._setDragging(true);	//設定dragging狀態 & 變數

		//記錄目前移動的Item element
		let drag = this.dragItem;
		drag.item = $(e.target);
		drag.itemType = this.getItemType(drag.item);
		let box = this._getBox(drag.item);
		drag.boxType = this.getItemType(box);
		drag.boxId = (box == null) ? '0' : this.getItemId(box);
		//drag.isBox = this._isBox(drag.itemType);
	}

	_onDragOver(e) {		
		e.preventDefault();		//允許drop, 不會顯示禁止icon
		
		//#region 不能drop的情形, 不顯示訊息
		let dropElm = e.target;		//e.target 為目前經過的 element
		if (this.dropElm == dropElm) return;	//相同 element 不處理

		//drop 必須是 item
		let dropObj = $(dropElm);
		let dropItem = dropObj.closest(this.FtItem);
		if (_obj.isEmpty(dropItem)) return;
		//#endregion

		//console.log('_onDragOver-2');

		//set instance variables
		this.dropElm = dropElm;

		//set this.dropItem
		let drag = this.dragItem;
		let drop = this.dropItem;
		drop.item = dropItem;
		drop.itemType = this.getItemType(dropItem);

		//判斷 drag item 是否 drop into box 裡面
		let dropInBox = 
			(drop.itemType == EstrItemType.Row && !dropObj.hasClass(this.ClsItem)) ||
			(drop.itemType == EstrItemType.Table && _obj.tagName(dropObj) == 'td') ||
			(drop.itemType == EstrItemType.TabPage && dropObj.hasClass('tab-pane'));
		//drop boxType表示 "drag item" drop進去的box item, 沒有則為null
		if (dropInBox) {
			drop.boxType = drop.itemType;
			drop.boxId = this.getItemId(dropItem);
		} else {
			var box = this._getBox(dropItem);
			drop.boxType = this.getItemType(box);
			drop.boxId = (box == null) ? '0' : this.getItemId(box);
		}		

		//debug
		//console.log(`dragType=${drag.itemType}, dropType=${drop.itemType}, drop.boxType=${drop.boxType}, dropInBox=${dropInBox}`);

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
		let error = '';
		let dragName = '';
		let dropIsBox = this._isBox(drop.itemType);
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
		this.dropError = error;

		//always 顯示 target drop line
		_obj.show(this.DropLine);

		if (dropInBox) {
			dropObj.append(this.DropLine);
		} else {
			//判斷drop位置在item的上或下方
			let dropRect = drop.item[0].getBoundingClientRect();
			// 滑鼠在 drop.item 的相對位置
			let mouseY = e.clientY;
			let isUp = (mouseY < dropRect.top + (dropRect.height / 2));
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
			//this.dropError = '';
		} else {
			let drag = this.dragItem;
			let drop = this.dropItem;

			//移入/移出 Table 必須刪除/增加label first(only for 互斥, a^b 或是 a !== b)
			let checkType = EstrItemType.Table;
			if (this._isBoxTypeXor(checkType))
				this._resetItemByTable(drag.item, (drop.boxType == checkType));

			//移入/移出 Row時必須調整大小(互斥同上)
			checkType = EstrItemType.Row;
			if (this._isBoxTypeXor(checkType))
				this._resetItemByRow(drag.item, (drop.boxType == checkType));

			//item移到 drog line的位置
			drag.item.insertAfter(this.DropLine);

			//如果drag, drop的boxId改變, 觸發 fnMoveBox
			if (drag.boxId != drop.boxId)
				this.fnMoveBox(this.getItemId(drag.item), drop.boxId);
		}

		//reset
		_obj.hide(this.DropLine);
		this._setDragging(false);
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

	//#endregion

	//#region 判斷 & 轉換
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

	//互斥檢查 for 移入/移出 的boxType
	//param {string} checkType: 要檢查的 itemType
	//return {bool} 是否互斥
	_isBoxTypeXor(checkType) {
		let dragBoxYes = (this.dragItem.boxType === checkType);
		let dropBoxYes = (this.dropItem.boxType === checkType);
		return (dragBoxYes !== dropBoxYes);
	}

	_isBox(type) {
		return (type == EstrItemType.Row ||
			type == EstrItemType.Table ||
			type == EstrItemType.TabPage);
	}
	//#endregion

	//#region 新增 item
	/**
	 * 傳回 input item 
	 * param {json} json 包含欄位: Fid, Title, Required
	 */ 
	async _getInputA(json) {
		const Fid = '_fid_';
		const Title = '_title_';
		const Cols = '2,3';					//default input cols
		const TitleTip = '_titleTip_';
		const InputNote = '_inputNote_';

		//讀取後端欄位 if need
		let inputJson = this.inputJson;
		let inputType = json.InputType;
		if (inputJson[inputType] == null) {
			let data = {
				inputType: inputType,
				title: Title,
				titleTip: TitleTip,
				fid: Fid,		//前端重設以下欄位
				cols: Cols,
				required: true,		//後端先傳回req mark, 前端若無則hide
				inputNote: InputNote,
			};
			let tpl = await _ajax.getStrA('GetInputHtml', data);
			inputJson[inputType] = tpl;
		}

		//換成實際的 fid, title
		//html = _str.replaceAll(html, Fid, json.Fid);	//多個取代
		//html = _str.replaceAll(html, Title, json.Title);

		let item = $(inputJson[inputType]);
		await this._rowToInputA(json, item);
		return item;
	}

	/**
	 * add col
	 * param {string} id
	 * param {json} json 包含欄位: Fid, Title, Required
	 * returns
	 */
	async addInputA(id, json) {
		//get item
		let item = await this._getInputA(json);

		//如果上層為box, 則cols修改2,3 -> 4,6, 單個取代
		if (this._boxIsRow())
			this._resetItemByRow(item, true);

		//最後寫入item的data-info
		//this.objSetInfo(item, json);

		//render item
		this._renderItem(id, item, EstrItemType.Input, true);
	}

	//?? 上層是否為box
	_boxIsRow() {
		return (this.dropBox != null && this.getItemType(this.dropBox) == EstrItemType.Row);
	}

	async addGroupA(id, json) {
		if (_str.isEmpty(this.groupHtml))
			this.groupHtml = await _ajax.getStrA('GetGroupHtml', { title: json.Title });

		//render item
		let item = $(this.groupHtml);
		this._renderItem(id, item, EstrItemType.Group, true);
	}

	addRow(id) {
		//加上py-2上下空間, 才能drop, dragOver時e.target為本身item !!
		let html = `
<div class='row py-2'>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
</div>
`;
		//render item
		let item = $(html);
		this._renderItem(id, item, EstrItemType.Row, true);
	}

	addTable(id) {
		let html = `
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
		let item = $(html);
		this._renderItem(id, item, EstrItemType.Table, true);
	}

	_renderItem(id, item, itemType, append) {
		//加入item屬性: .xu-item, data-itemtype
		item.addClass(this.ClsItem);
		item.attr("draggable", true);
		_obj.setData(item, this.DataId, id);	//jquery data() 只寫入暫存, 使用 _obj(設定屬性) !!
		_obj.setData(item, this.DataItemType, itemType);

		//append 整個item
		if (append) {
			let box = _obj.isEmpty(this.dropArea) ? this.Area : this.dropArea;
			box.append(item);
		}
	}
	//#endregion

	//#region 更新 item 外觀
	//重設item寬度
	//param {bool} inBox: in box or not
	_resetItemByRow(item, inBox) {
		if (inBox) {
			this._labelSetCol(item, 2, 4);
			this._inputSetCol(item, 3, 6);
		} else {
			this._labelSetCol(item, 4, 2);
			this._inputSetCol(item, 6, 3);
		}
	}

	_labelSetCol(item, oldCls, newCls) {
		this._itemSetCol(item, true, oldCls, newCls);
	}
	_inputSetCol(item, oldCls, newCls) {
		this._itemSetCol(item, false, oldCls, newCls);
	}
	_itemSetCol(item, isLabel, oldCls, newCls) {
		let cls = `col-md-${oldCls}`;
		let obj = item.find(isLabel ? this.FtLabel : this.FtInput);
		if (obj.hasClass(cls))
			obj.removeClass(cls).addClass(`col-md-${newCls}`);
	}

	//只更新畫面上看的到的部分即可
	//called by UiMany only !!
	async rowToItemA(row, item) {
		switch (this.getItemType(item)) {
			case EstrItemType.Input:
				await this._rowToInputA(row, item);
				break;
			case EstrItemType.Group:
				item.find(this.FtGroupTitle).text(row.Title);
				break;
			case EstrItemType.Row:
				//do nothing
				break;
			case EstrItemType.Table:
				break;
			case EstrItemType.TabPage:
				break;
		}
	}

	//row to input item ui
	async _rowToInputA(row, item) {
		//label
		//jQuery會移除子節點required, 改用DOM(label順序:req、title、tip)
		item.find(this.FtLabel)[0].childNodes[1].nodeValue = row.Title;

		//required show/hide
		_obj.showByStatus(item.find(this.FtReq), row.Required);

		//labelTip show/hide, update text
		_obj.showByStatus(item.find(this.FtTipIcon), _str.notEmpty(row.TitleTip));
		item.find(this.FtLabel).attr('title', row.TitleTip);	//設定label的 title屬性

		//inputNote show/hide, update text
		let note = item.find(this.FtInputNote);
		_obj.showByStatus(note, _str.notEmpty(row.InputNote));
		note.text(row.InputNote);

		/* todo: temp remark
		//如果改變 inputType, 必須更新item 的x-input內容
		if (this._getInputType(item) != row.InputType) {
			let newItem = await this._getInputA(row);
			let inputHtml = newItem.find(this.FtInput).html();
			item.find(this.FtInput).html(inputHtml);
		}
		*/
	}

	//移除/增加 label, 直接搬到item, 因為內容有變
	//called by mouseUp
	_resetItemByTable(item, inBox) {
		if (inBox) {
			_obj.hide(item.find(this.FtLabel));
			_obj.hide(item.find(this.FtInputNote));
			this._inputSetCol(item, 3, '3a');	//讓RWD失效
			this._inputSetCol(item, 6, '6a');
		} else {
			_obj.show(item.find(this.FtLabel));
			_obj.show(item.find(this.FtInputNote));
			this._inputSetCol(item, '3a', 3);
			this._inputSetCol(item, '6a', 6);
		}
	}

	//清空工作區
	reset() {
		this.Area.empty();
	}

	//載入items
	loadItems(rows) {
		this.reset();
		for (let i = 0; i < rows.length; i++)
			this.addItem(rows[i]);
	}

	//刪除item, 包含子item
	deleteItem(item) {
		item.remove();
	}
	//#endregion

	//#region 讀取 item
	//get item inputType for EstrItemType.Input
	_getInputType(item) {
		return _input.getType(item.find(this.FtInput));
	}

	//get item type, also called outside
	getItemType(item) {
		return _obj.isEmpty(item)
			? null : item.data(this.DataItemType);
	}

	//also called by UiMany
	getItemId(item) {
		return item.data(this.DataId);
	}

	//內部element to Item object
	_elmToItem(elm) {
		return $(elm).closest(this.FtItem);
	}

	//傳回上一層item, 沒有則傳回null
	_getBox(item) {
		let box = item.parents(this.FtItem).first();
		return _obj.isEmpty(box) ? null : box;
	}
	//#endregion

	//#region 其他
	setEdit(status) {
		this.isEdit = status;
	}

	//??
	async addItem(json, box) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.items.length + 1) * (-1);
		let itemType = json.ItemType;
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
		let html = await item.newHtml(json);
		box.append(html);

		this.newItemId++;
		this.items.push(item);
		return item;
	}
	//#endregion

	/*
	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.items.some(node => node.getNodeType() == EstrNodeType.Start);
	};
	*/

} //class UiView
