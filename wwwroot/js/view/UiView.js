//ui item type
var EstrItemType = {
	Input: 'I',
	Group: 'G',		
	Row: 'R',		//只有2欄位, 只能放 group, col
	Table: 'TA',	//只能放 col
	TabPage: 'TP',	//只能放 box, group, col
};

/*
//drop position
var EstrDropPos = {
	In: 'I',	//inside
	Up: 'U',	//up
	Down: 'D',	//down
};
*/

//結構用途, 記錄item drag/drop 狀態資訊
class StItem {
	constructor(item, itemType, isBox, boxType) {
		this.item = item;
		this.itemType = itemType;
		this.isBox = isBox;			//本身是否為box
		this.boxType = boxType;		//上層box item, 無則為null
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
		this.DragBox = $('.xu-drag-box');		//拖拉時顯示的示意方框
		this.DropLine = $('.xu-drop-line');		//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.FtLabel = '.x-label';	//item label
		this.FtInput = '.x-input';	//item input
		this.ItemType = 'itemtype';	//data item type

		this.isEdit = true;		//是否可編輯, temp to true	
		//this.items = [];		//包含欄位:ItemType, Item, Childs		
		this.newItemId = 0;		//新node/line Id, 自動累加		
		this.colJson = {};		//儲存各種輸入欄位模版, 減少後端傳回		
		this.groupHtml = '';	//儲存group html, 後端傳回

		//drag/drop相關, Box表示外層Item
		this.dragItem = new StItem();
		this.dropItem = new StItem();		
		//
		this.dragging = false;
		this.dropElm = null;	//drop參照的element, 與 item 不是同一個
		this.dropArea = null;	//實際drop的container object, 不一定是item類型, null表示workArea
		this.dropError = '';	//drop error message
		this.dropBoxMultiItem = false;	//drop box has multiple item or not

		//this.fnMoveItem = null;
		//this.fnAfterAddLine = null;
		//this.fnShowMenu = null;

		//work area註冊全域事件
		//右鍵選單事件
		var me = this;
		this.Area.on(EstrMouse.RightMenu, ".xu-item", function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			if (me.fnShowMenu)
				me.fnShowMenu(e, true, me);
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
		drag.isBox = this._itemIsBox(drag.itemType);
		drag.boxType = this._getItemType(this._getBox(drag.item));

		//move & show drag box
		this._moveDragBox(e);
		_obj.show(this.DragBox);
	}

	_setDragging(status) {
		this.dragging = status;
		if (status)
			this.Area.addClass(this.ClsDragging);
		else
			this.Area.removeClass(this.ClsDragging);
	}

	_onDragOver(e) {		
		e.preventDefault();		//允許drop, 不會顯示禁止icon
		this._moveDragBox(e);	//移動 drag box 到 mouse 位置 first

		//console.log('_onDragOver-1');
		
		//#region 不能drop的情形, 不顯示訊息
		var dropElm = e.target;		//e.target 為目前經過的 element
		if (this.dropElm == dropElm) return;	//相同 element 不處理

		//drop 必須是 item
		var dropObj = $(dropElm);
		var dropItem = dropObj.closest(this.FtItem);
		if (_obj.isEmpty(dropItem)) return;
		//#endregion

		//console.log('_onMouseMove-2');

		//set instance variables
		this.dropElm = dropElm;

		//set this.dropItem
		var dropIsItem = dropObj.hasClass(this.ClsItem);
		var dropTagName = _obj.tagName(dropObj);
		var drop = this.dropItem;
		drop.item = dropItem;
		drop.itemType = this._getItemType(dropItem);
		drop.isBox = !dropObj.hasClass(this.ClsItem);
		drop.boxType = this._getItemType(this._getBox(dropItem));
		/*
		if (drop.isBox) {
			switch (drop.itemType) {
				case EstrItemType.Table:
					//只能放一個input在td, 
					//this.dropArea = $(this.dropElm);	//table td
					drop.boxType = this._getItemType(this._getBox(dropItem));
					break;
				case EstrItemType.TabPage:
					//只能input、Row
					//this.dropArea = $(this.dropElm);	//row col
					drop.boxType = this._getItemType(this._getBox(dropItem));
					break;
				default:	//Row
					//只能放input
					drop.boxType = this._getItemType(this.dropArea);
			}

			this.dropArea = $(dropElm);
			drop.boxType = this._getItemType(this._getBox(dropItem));
		} else {
			this.dropArea = this._getBox(dropItem);	//上一層item
			drop.boxType = this._getItemType(this.dropArea);
		}
		*/

		/*
		//調整, todo: 其他 itemtype
		switch (drop.itemType) {
			case EstrItemType.Row:
				//this.dropArea = $(this.dropElm);	//row col
				drop.isBox = true;
				drop.boxType = this._getItemType(this._getBox(dropItem));
				break;
			case EstrItemType.Table:
				//this.dropArea = $(this.dropElm);	//table td
				drop.isBox = true;
				drop.boxType = this._getItemType(this._getBox(dropItem));
				break;
			default:
				//this.dropArea = this._getBox(dropItem);	//上一層item
				drop.isBox = false;	//todo: 加入其他判斷
				drop.boxType = this._getItemType(this.dropArea);
		}

		//set this.dropArea
		this.dropArea = drop.isBox
			? $(this.dropElm)
			: this._getBox(dropItem);	//上一層item
		*/

		if ($(dropElm).closest(".x-table th").length > 0) return;

		//不能drop時, 記錄error message, 後面顯示
		this.dropError = '';	//reset first
		var drag = this.dragItem;
		if (drop.boxType != null) {
			if (drop.boxType == EstrItemType.Table) {
				//table內不能放group
				if (drag.itemType == EstrItemType.Group) {
					this._stopDrop('[群組文字]不能放在Table裡面。');
					return;
				}
			} else {
				//row, tabPage 內不能放 box
				if (drag.isBox) {
					this._stopDrop('[容器]類不能放在[欄位容器]、[多頁]裡面。');
					return;
				}
			}
		}
		//console.log('_onMouseMove-4');

		// 判斷 A 是否在 B 上方
		const isAbove = (nodeA, nodeB) => {
			const rectA = nodeA.getBoundingClientRect();
			const rectB = nodeB.getBoundingClientRect();
			return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
		};

		if (isAbove(draggingEle, target)) {
			list.insertBefore(placeholder, target);
		} else {
			list.insertBefore(placeholder, target.nextSibling);
		}

		//顯示 target drop line
		_obj.show(this.DropLine);

		//判斷顯示target在上或下
		//todo: 如果target元素 sort=1, 須判斷移到上方或下方, 否則為下方
		if (drop.isBox)
			this.dropArea.append(this.DropLine);
		else
			this.DropLine.insertAfter(drop.item);

		//console.log('_onMouseMove-5');
	}

	_onDragEnd(e) {
		if (this.dropError != '') {
			_tool.msg(this.dropError);
		} else {
			var drag = this.dragItem;
			var drop = this.dropItem;

			//移入/移出 Table 必須刪除/增加label
			var checkType = EstrItemType.Table;
			var tableData = this._isItemTypeXor(checkType, drag.boxType);
			if (tableData.isXor)
				this._resetItemByTable(drag.item, tableData.dropInBox);

			//移入/移出 Row時必須調整大小 only for 互斥(a ^ b 或是 a !== b)
			checkType = EstrItemType.Row;
			var data = this._isItemTypeXor(checkType, drag.boxType);
			if (data.isXor)
				this._resetItemByRow(drag.item, data.dropInBox);

			//move item, tableData.isXor 的情形已經在前面處理!!
			/*
			if (tableData.isXor) {
				//do nothing !!
			} else if (drop.isBox) {
			*/
			if (drop.isBox)
				this.dropArea.append(drag.item);
			else
				drag.item.insertAfter(drop.item);
		}

		//reset
		_obj.hide(this.DragBox);
		_obj.hide(this.DropLine);
		this._setDragging(false);
		this._stopDrop('');
		this.dragItem = new StItem();
		this.dropItem = new StItem();
	}

	_stopDrop(error) {
		this.dropError = error;
		//this.canDrop = false;
	}

	//互斥檢查 for 移入/移出 的itemType
	//param {string} checkType: 要檢查的 itemType
	//param {string} dropType: drop itemType
	//return {json} 有2個欄位:isXor(是否互斥), dropInBox(drop item 在指定類型的Box裡面)
	_isItemTypeXor(checkType, dragBoxType) {
		var dragBoxYes = (dragBoxType === checkType);
		var dropBoxYes = (this.dropItem.boxType === checkType);
		var dropItemYes = (this.dropItem.itemType === checkType);
		var dropInBox = (dropBoxYes || dropItemYes);
		return { 
			isXor: dragBoxYes !== dropInBox,
			dropInBox: dropInBox
		};
	}

	//傳回上一層item, 沒有則傳回null
	_getBox(item) {
		var box = item.parents(this.FtItem).first();
		return _obj.isEmpty(box) ? null : box;
	}

	_itemIsBox(type) {
		return (type == EstrItemType.Row ||
			type == EstrItemType.Group ||
			type == EstrItemType.TabPage);
	}

	/**
	 * add col
	 * param {string} inputType
	 * param {json} json 包含欄位: Fid, Title, Required
	 * returns
	 */
	async addInputA(inputType, json) {
		//get set colJson
		var colJson = this.colJson;
		if (colJson[inputType] == null) {
			var data = {
				inputType: inputType,
				fid: this.Fid,		//前端重設以下4欄位
				title: this.Title,
				cols: '2,3',
				required: 1,
			};
			var tpl = await _ajax.getStrA('GetInputHtml', data);
			colJson[inputType] = tpl;
		}

		//render ui
		//設定實際fid, title
		var html = colJson[inputType];
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
		//get set colJson
		if (_str.isEmpty(this.groupHtml))
			this.groupHtml = await _ajax.getStrA('GetGroupHtml', { label: label });

		//render item
		var item = $(this.groupHtml);
		this._renderItem(item, EstrItemType.Group, true);
	}

	addRow() {
		//加上my-2上下空間, 才能drop !!
		var html = `
<div class='row my-2'>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
</div>
`;
		//render item
		var item = $(html);
		this._renderItem(item, EstrItemType.Row, true);
	}

	addTable() {
		//加上my-2上下空間, 才能drop !!
		var html = `
<div>
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
