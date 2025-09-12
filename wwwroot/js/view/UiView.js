//ui item type
var EstrItemType = {
	Col: 'C',
	Group: 'G',		
	Row: 'R',		//只有2欄位, 只能放 group, col
	Table: 'TA',	//只能放 col
	TabPage: 'TP',	//只能放 box, group, col
};

/*
//??允許的input type, 對應 XpCode.Type=InputType、QEitemTypeEstr.cs
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
*/

//結構用途, 記錄item drag/drop 狀態資訊
class StItem {
	constructor(item, itemType, isBox, boxType) {
		this.item = item;
		this.itemType = itemType;
		this.isBox = isBox;
		this.boxType = boxType;
	}
}

/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 * ItemType Col欄位和Group由後端傳入, Row、Table、TabPage由前端產生
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
		this.ClsDragIcon = 'xu-drag-ico';
		this.DragIconHtml = `<i class='ico-arrow4 ${this.ClsDragIcon}'></i>`;
		this.DragBox = $('.xu-drag-box');		//拖拉時顯示的示意方框
		this.DropLine = $('.xu-drop-line');		//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.ItemType = 'itemtype';	//data item type

		this.isEdit = true;		//是否可編輯, temp to true	
		this.nowArea = null;	//新增item時的放置位置, null表示workArea		
		this.items = [];		//包含欄位:ItemType, Item, Childs		
		this.newItemId = 0;		//新node/line Id, 自動累加		
		this.colJson = {};		//儲存各種輸入欄位模版, 減少後端傳回		
		this.groupHtml = '';	//儲存group html, 後端傳回

		//drag/drop相關, Box表示外層Item
		this.dragItem = new StItem();
		this.dropItem = new StItem();		
		//
		this.dragging = false;
		this.dropElm = null;	//elm 與 item 不是同一個
		this.dropCont = null;	//實際放入的container object, 不一定是item類型
		this.dropError = '';	//drop error message

		/*
		this.dragItem = null;
		//this.dragItemElm = null;
		this.dragItemType = '';
		this.dragIsBox = false;		//drag item is box
		//this.dragIcon = null;
		//this.dragIconElm = null;

		//moving target item element
		this.dropItem = null;		//moving target Item object
		this.dropItemType = null;	//moving target Item type
		this.dropIsBox = false;		//drop item is box
		this.dropBoxType = null;	//drop item上一層的itemType, null表示workArea
		*/

		//this.fnMoveItem = null;
		//this.fnAfterAddLine = null;
		//this.fnShowMenu = null;

		//註冊全域事件
		//work area
		var me = this;
		this.Area.on(EstrMouse.MouseMove, function (e) {
			if (me.isEdit)
				me._onMouseMove(e);
		}).on(EstrMouse.MouseUp, function (e) {
			if (me.isEdit)
				me._onMouseUp(e);
		});

		/*
		//table th 不可drop
		this.Area.on("dragover drop", ".x-table th", function (e) {
			e.preventDefault();   // 阻止預設行為
			e.stopPropagation();  // 阻止冒泡
			return false;         // 明確禁止 drop
		});
		*/
	}

	//註冊item事件
	_setEventItem(item) {
		//set drag icon event
		var me = this;	//UiItem
		var icon = item.find('.' + me.ClsDragIcon);
		icon.on(EstrMouse.MouseDown, function (e) {
			if (!me.isEdit) return;

			e.preventDefault();		//阻止文字被選取
			me._setDragging(true);	//設定dragging狀態 & 變數

			//記錄目前移動的Item element
			var drag = me.dragItem;
			drag.item = me._elmToItem(this);
			drag.itemType = me._getItemType(drag.item);
			drag.isBox = me._itemIsBox(drag.itemType);
			drag.boxType = me._getItemType(me._getBox(drag.item));

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

	_setDragging(status) {
		this.dragging = status;
		if (status)
			this.Area.addClass(this.ClsDragging);
		else
			this.Area.removeClass(this.ClsDragging);
	}

	_onMouseMove(e) {
		//判斷顯示target在上或下
		if (!this.dragging) return;

		//移動 drag box 到 mouse 位置 first
		this._moveDragBox(e);

		//console.log('_onMouseMove-1');

		//e.target 為目前經過的 element, 同一個 element 不處理
		//不能drop的情形
		var dropElm = e.target;
		if (this.dropElm == dropElm) return;
		if ($(dropElm).closest(".x-table th").length > 0) return;


		//只處理 item
		var dropItem = $(dropElm).closest(this.FtItem);
		if (_obj.isEmpty(dropItem)) return;

		//console.log('_onMouseMove-2');

		//set instance variables
		this.dropElm = dropElm;

		//set drop
		var drop = this.dropItem;
		drop.item = dropItem;
		drop.itemType = this._getItemType(dropItem);

		//調整, todo: 其他 itemtype
		switch (drop.itemType) {
			case EstrItemType.Row:
				//this.dropCont = $(this.dropElm);	//row col
				drop.isBox = true;
				drop.boxType = this._getItemType(this._getBox(dropItem));
				break;
			case EstrItemType.Table:
				//this.dropCont = $(this.dropElm);	//table td
				drop.isBox = true;
				drop.boxType = this._getItemType(this._getBox(dropItem));
				break;
			default:
				//this.dropCont = this._getBox(dropItem);	//上一層item
				drop.isBox = false;	//todo: 加入其他判斷
				drop.boxType = this._getItemType(this.dropCont);
		}

		//set this.dropCont
		this.dropCont = drop.isBox
			? $(this.dropElm)
			: this._getBox(dropItem);	//上一層item

		//禁止drop的情形, 記錄error message
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

		//顯示 target drop line
		_obj.show(this.DropLine);

		//todo: 如果target元素 sort=1, 須判斷移到上方或下方, 否則為下方
		if (drop.isBox)
			this.dropCont.append(this.DropLine);
		else
			this.DropLine.insertAfter(drop.item);

		//console.log('_onMouseMove-5');
	}

	_onMouseUp(e) {
		//console.log('_mouseUp');
		if (!this.dragging) return;

		if (this.dropError != '') {
			_tool.msg(this.dropError);
		} else {
			var drag = this.dragItem;
			var drop = this.dropItem;
			//var dragBox = this._getBox(this.dragItem);
			//var dragBoxType = this._getItemType(dragBox);

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
			if (tableData.isXor) {
				//do nothing !!
			} else if (drop.isBox) {
				this.dropCont.append(drag.item);
			} else {
				drag.item.insertAfter(drop.item);
			}
		}

		//reset
		_obj.hide(this.DragBox);
		_obj.hide(this.DropLine);
		this._setDragging(false);
		this._stopDrop('');
		//this.dragItem = null;
		//this.dropIsBox = false;
		//this.dropCont = null;
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
		return (type == EstrItemType.Row || type == EstrItemType.Group || type == EstrItemType.TabPage);
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

		//label左邊加上drag icon
		item.find('.x-label').prepend(this.DragIconHtml);

		//render item
		this._renderItem(item, EstrItemType.Col);
	}

	//重設item寬度
	//param {bool} inBox: in box or not
	_resetItemByRow(item, inBox) {
		var labelF, labelT, inputF, inputT;
		if (inBox) {
			labelF = 'col-md-2';
			labelT = 'col-md-4';
			inputF = 'col-md-3';
			inputT = 'col-md-6';
		} else {
			labelF = 'col-md-4';
			labelT = 'col-md-2';
			inputF = 'col-md-6';
			inputT = 'col-md-3';
		}
		item.find('.x-label').removeClass(labelF).addClass(labelT);
		item.find('.x-input').removeClass(inputF).addClass(inputT);
	}

	//移除/增加 label, 直接搬到item, 因為內容有變
	//called by mouseUp
	_resetItemByTable(item, inBox) {
		if (inBox) {
			//移除 label, input使用clone, item remove後才不會有殘留的 x-label !!
			//var input = item.find('.x-input').children().first().clone();
			var input = $(item.find('.x-input').html());
			input.addClass(this.ClsItem);
			//return input;
			//item.replaceWith(input);
			this.dropCont.append(input);	//append new
			item.remove();	//remove old
		} else {
			//增加 label
			//get input type
			var inputType = '';
			var input = $(this.colJson[inputType]);
			input.addClass(this.ClsItem);

			//取代 x-input

			//todo: this.dropCont.append(input);	//append new
			item.remove();	//remove old

		}
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
		this._renderItem(item, EstrItemType.Group);
	}

	addRow() {
		//加上my-2上下空間, 才能drop !!
		var html = `
<div class='row my-2'>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
	<div class='col-md-6 ${this.ClsRowCol}'></div>
</div>
`;
		//label左邊加上drag icon
		var item = $(html);
		//item.find('div').first().prepend(this.DragIconHtml);
		item.prepend(this.DragIconHtml);

		//render item
		this._renderItem(item, EstrItemType.Row);
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

	<form id="eformRoleProg" class="x-form border-0" novalidate="novalidate">
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
	</form>
</div>
`;
		//label左邊加上drag icon
		var item = $(html);
		//item.find('div').first().prepend(this.DragIconHtml);
		item.prepend(this.DragIconHtml);

		//render item
		this._renderItem(item, EstrItemType.Table);
	}

	_renderItem(item, itemType) {
		//加入item屬性: .xu-item, data-itemtype
		item.addClass(this.ClsItem);
		_obj.setData(item, this.ItemType, itemType);	//jquery data() 只寫入暫存!!

		//註冊事件
		this._setEventItem(item);

		//append item
		var box = _obj.isEmpty(this.dropCont) ? this.Area : this.dropCont;
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
