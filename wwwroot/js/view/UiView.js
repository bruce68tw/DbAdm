//ui item type
let EstrItemType = {
	Input: 'I',
	Group: 'G',		
	Checks: 'CS',	//check list, 不是容器
	Row: 'R',		//只有2欄位, 只能放 group, input, checks
	Table: 'T',		//只能放 input
	TabPage: 'TP',	//(暫不使用)只能放 box, group, input, checks
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
		this.ClsTabPane = 'tab-pane';		//tabPage panel
		this.DataId = 'id';					//for data-id
		this.DataItemType = 'itemtype';		//for data-itemtype
		this.DataInfo = 'info';				//for data-info
		this.DefaultCols = '2,3';			//default input Cols
		this.DropLine = $('.xu-drop-line');	//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.FtLabel = '.x-label';			//item label
		this.FtInput = '.x-input';			//item input
		this.FtReq = '.x-required';			//required
		this.FtTipIcon = '.ico-info';		//label tip icon
		this.FtInputNote = '.x-input-note';	//input note
		this.FtGroupTitle = '.x-group-title';	//group title
		this.FtTable = '.x-table';				//table
		this.FtTableTitle = '.x-span-label';	//table title, todo: ??		
		this.FtRowCol = "." + this.ClsRowCol;	//row col
		this.FtTabPane = "." + this.ClsTabPane;	//tabPage panel
		//
		this.NameInput = '[輸入欄位]';
		this.NameGroup = '[分群文字]';
		this.NameRow = '[欄位容器]';
		this.NameTable = '[多筆表格]';
		this.NameTabPage = '[多頁容器]';
		this.NameChecks = '[多選欄位]';

		this.isEdit = true;		//是否可編輯, temp to true	
		this.newItemId = 0;		//新item Id, 自動累減, 使用負數!!		
		this.inputMap = {};		//儲存各種輸入欄位模版, 減少後端傳回		
		this.groupHtml = '';	//儲存group html, 後端傳回

		//drag/drop相關, Box表示外層Item
		this.dragItem = new StItem();
		this.dropItem = new StItem();		
		//
		this.dragIsNew = false;	//true表示從button drag
		this.dragging = false;
		this.dropElm = null;	//drop參照的element, 與 item 不是同一個
		this.dropArea = null;	//實際drop的container object, 不一定是item類型, null表示workArea
		this.dropError = '';	//drop error message

		this.fnMoveBox = null;	//item 移動到不同box時觸發, function(itemId, newBoxId)
		this.fnShowMenu = null;	//顯示右鍵選單, function(e, item)
		this.fnAddItem = null;	//add new item, function(itemType), return new row

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
			//drop成功或失敗都會觸發, dragging在函數裡面判斷
			me.onDragEnd(e);
		});
	}

	//#region drag/drop 事件相關
	_onDragStart(e) {
		//e.preventDefault();		//阻止文字被選取
		this._setDragging(true);	//設定dragging狀態 & 變數

		//記錄目前移動的Item element
		let drag = this.dragItem;
		drag.item = $(e.target);
		drag.itemType = this.itemGetType(drag.item);
		let box = this._getBox(drag.item);
		drag.boxType = this.itemGetType(box);
		drag.boxId = (box == null) ? '0' : this.itemGetId(box);
		//drag.isBox = this._isBox(drag.itemType);
	}

	_onDragOver(e) {		
		e.preventDefault();		//允許drop, 不會顯示禁止icon

		//相同 element 不處理
		let dropElm = e.target;		//e.target 為目前經過的最內層的 element
		if (this.dropElm == dropElm) return;	

		//get drop item, 空值表示 box 為 work area
		let dropObj = $(dropElm);
		let dropItem = dropObj.closest(this.FtItem);
		let hasDropItem = _obj.notEmpty(dropItem);	//是否有參照的 drop item

		//set instance variables
		this.dropElm = dropElm;

		//set this.dropItem
		let drag = this.dragItem;
		let drop = this.dropItem;
		drop.item = dropItem;
		drop.itemType = this.itemGetType(dropItem);

		//設定 dropInBox & 檢查 drop 位置是否合理
		//判斷是否 drop 到 box 裡面
		let dropInBox = false;
		if (hasDropItem) {
			dropInBox =
				//Row: 沒有 ClsItem 表示在內部
				(drop.itemType == EstrItemType.Row && !dropObj.hasClass(this.ClsItem)) ||
				//Table: 在 td 裡面
				(drop.itemType == EstrItemType.Table && _obj.tagName(dropObj) == 'td') ||
				//TabPage: 在 ClsTabPane 裡面
				(drop.itemType == EstrItemType.TabPage && dropObj.hasClass(this.ClsTabPane));

			//drop.boxType表示 "drag item" drop進去的box item, 沒有則為null
			if (dropInBox) {
				drop.boxType = drop.itemType;
				drop.boxId = this.itemGetId(dropItem);
			} else {
				//找外層 item
				var box = this._getBox(dropItem);
				drop.boxType = this.itemGetType(box);
				drop.boxId = (box == null) ? '0' : this.itemGetId(box);
			}
		}

		//for debug
		console.log(`dragType=${drag.itemType}, dropType=${drop.itemType}, drop.boxType=${drop.boxType}, 
			up css=${dropObj.attr('class')}, up item count=${dropObj.find(this.FtItem).length}, 
			dropInBox=${dropInBox}`);

		/*
		 x軸: drop, y軸: drag 
		 如果 drop.boxType == null, 則 drop 位置無限制
		   (inside)Row	Table TabPage
		 ------------------------------
		 Input		O	  ?		O
		 Group		O	  x		O
		 Checks		O	  x		O
		 Row		x	  x		O
		 Table		x	  x		x
		 TabPage	x	  x		x
		*/

		//(只考慮)不能drop時, 記錄error message, 在後面顯示
		//!dropInBox 則都可以 drop
		let error = '';
		let dragName = '';
		if (hasDropItem && drop.boxType != null) {
			switch (drag.itemType) {
				case EstrItemType.Input:
					if (drop.boxType == EstrItemType.Table) {
						if (dropObj.find(this.FtItem).length > 0)
							error = `${this.NameTable}只能放一個${this.NameInput}。`;
					}
					break;
				case EstrItemType.Group:
					if (drop.boxType == EstrItemType.Table)
						error = `${this.NameGroup}不能放在${this.NameTable}裡面。`;
					break;
				case EstrItemType.Checks:
					if (drop.boxType == EstrItemType.Table)
						error = `${this.NameChecks}不能放在${this.NameTable}裡面。`;
					break;
				case EstrItemType.Row:
					dragName = this.NameRow;
					switch (drop.boxType) {
						case EstrItemType.Row:
							error = `${dragName}不能放在${this.NameRow}裡面。`;
							break;
						case EstrItemType.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
					}
					/*
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
					*/
					break;
				case EstrItemType.Table:
				case EstrItemType.TabPage:
					dragName = (drag.itemType == EstrItemType.Table)
						? this.NameTable : this.NameTabPage;
					let dropIsBox = this._isBox(drop.itemType);
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

		if (dropInBox || !hasDropItem) {
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

	//also called by uiMany drag/drop button
	async onDragEnd(e) {
		if (!this.dragging) return;

		//工作區內外都可以觸發 DragEnd, 利用mouse座標來判斷
		const rect = this.Area[0].getBoundingClientRect();
		const x = e.clientX;
		const y = e.clientY;
		const inArea = (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);

		if (this.dropError != '') {
			_tool.msg(this.dropError);
		} else if (inArea) {
			let drag = this.dragItem;
			let drop = this.dropItem;
			let dragType = this.dragItem.itemType;	//drag button時會設定this.dragItem.itemType

			//create new item if need
			if (this.dragIsNew) {
				let row = this.fnAddItem(dragType);
				let item = await this._newItemA(dragType, row.Id, _str.toJson(row.Info));
				drag.item = item;
			}

			//調整 item 大小或外觀
			if (dragType == EstrItemType.Input || dragType == EstrItemType.Checks) {
				//移入/移出 Row 時調整大小(互斥判斷: a^b 或是 a !== b)
				let checkType = EstrItemType.Row;
				if (this._isBoxTypeXor(checkType)) {
					let inTable = (drop.boxType == checkType);
					let gridNum = inTable
						? this._getUpGridNum(this.DropLine)	//利用dropLine讀取上層grid num
						: 0;
					this._resizeItemByRow(drag.item, inTable, gridNum);
				}

				//移入/移出 Table時 show/hide label、note(互斥判斷同上) input only
				checkType = EstrItemType.Table;
				if (this._isBoxTypeXor(checkType))
					this._resizeItemByTable(drag.item, (drop.boxType == checkType));
			}

			//item移到 drog line的位置
			drag.item.insertAfter(this.DropLine);

			//如果drag, drop的boxId改變, 觸發 fnMoveBox
			if (drag.boxId != drop.boxId)
				this.fnMoveBox(this.itemGetId(drag.item), drop.boxId);
		}

		//reset variables
		this._setDragging(false);
	}

	/**
	 * box item add child item 
	 * param {object} box
	 * param {string} boxType, null 表示工作區
	 * param {int} childNo
	 * param {object} item
	 */
	_boxAddItem(box, boxType, childNo, item) {
		let upElm;	//container element
		switch (boxType) {
			case null:
				upElm = this.Area;
				break;
			case EstrItemType.Row:
				//col位置
				upElm = box.children().eq(childNo);
				break;
			case EstrItemType.Table:
				//hide label, inputNote
				this._resizeItemByTable(item, true);

				//td位置: tr第0列
				upElm = box.find("tbody tr").eq(0).find("td").eq(childNo);
				break;
			case EstrItemType.TabPage:
				//todo
				//page位置
				break;
			default:
				return;
		}

		upElm.append(item);
	}

	//drag by button
	//also called by uiMany
	startDragBtn(status, itemType) {
		this._setDragging(status);	//call first !!
		this.dragIsNew = status;
		this.dragItem.itemType = itemType;
	}

	_setDragging(status) {
		if (status) {
			this.dragging = true;
			this.dragItem = new StItem();
			this.dropItem = new StItem();
			this.dropElm = null;
			this.Area.addClass(this.ClsDragging);
		} else {
			this.dragging = false;
			this.dragIsNew = false;	//reset
			this.Area.removeClass(this.ClsDragging);
			_obj.hide(this.DropLine);
		}
	}

	//#endregion

	//#region 判斷 & 轉換
	//item type to item show name
	_typeToName(itemType) {
		switch (itemType) {
			case EstrItemType.Input:
				return this.NameInput;
			case EstrItemType.Group:
				return this.NameGroup;
			case EstrItemType.Checks:
				return this.NameChecks;
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
	//產生新item
	//called: onDragEnd、loadJsonsA 
	//param {json} info: item info 資訊
	async _newItemA(itemType, itemId, info) {
		switch (itemType) {
			case EstrItemType.Input:
				return await this._newInputA(itemId, info);
			case EstrItemType.Group:
				return await this._newGroupA(itemId, info);
			case EstrItemType.Checks:
				return this._newChecks(itemId, info);
			case EstrItemType.Row:
				return this._newRow(itemId, info);
			case EstrItemType.Table:
				return this._newTable(itemId, info);
			case EstrItemType.TabPage:
				return this._newTabPage(itemId, info);
		}
	}

	/**
	 * add input
	 * called _newItemA
	 * param {string} id
	 * param {json} info 包含欄位: Fid, Title, Required
	 * returns item
	 */
	async _newInputA(id, info) {
		//constant
		const Fid = '_fid_';
		const Title = '_title_';
		const TitleTip = '_titleTip_';
		const InputNote = '_inputNote_';

		//讀取後端輸入欄位template if need
		let map = this.inputMap;
		let inputType = info.InputType;
		if (map[inputType] == null) {
			let data = {
				inputType: inputType,
				title: Title,
				titleTip: TitleTip,
				fid: Fid,			//前端重設以下欄位
				required: true,		//後端先傳回req mark, 前端若無則hide
				cols: this.DefaultCols,
				inputNote: InputNote,
			};
			let tpl = await _ajax.getStrA('GetInputHtml', data);
			map[inputType] = tpl;
		}

		//replace fid, title, titleTip, inputNote
		let html = map[inputType];
		html = _str.replaceAll(html, Fid, info.Fid)
			.replace(Title, info.Title)
			.replace(TitleTip, info.TitleTip || '')
			.replace(InputNote, info.InputNote || '');

		let item = $(html);
		await this._infoToInputA(info, item);

		//render item
		this._itemAddProp(id, item, EstrItemType.Input, info);
		return item;
	}

	async _newGroupA(id, info) {
		if (_str.isEmpty(this.groupHtml))
			this.groupHtml = await _ajax.getStrA('GetGroupHtml', { title: info.Title });

		//render item
		let item = $(this.groupHtml);
		this._itemAddProp(id, item, EstrItemType.Group, info);
		return item;
	}

	_newChecks(id, info) {
		let clsCol = this.ClsRowCol;
		let cols = info.Cols.split(',');
		//here
		let fids = info.LabelFids.split(',');
		let html = '';
		for (let i = 0; i < fids.length; i += 2) {
			let fid = fids[i + 1];
			html += `
<label class="xi-check">
    <input data-fid="${fid}" name="${fid}" data-edit="*" checked="" type="checkbox" data-type="check" data-value="1">${fids[i]}
    <span class="xi-cspan"></span>
</label>
`;
		}

		html = `
<div class="row py-2">
	<div class="col-md-${cols[0]} x-label">${info.Title}</div>
	<div class="col-md-${cols[1]} x-input">
		${html}
</div>
`;
		//render item
		let item = $(html);
		this._itemAddProp(id, item, EstrItemType.Checks, info);
		return item;
	}

	_newRow(id, info) {
		//加上py-2上下空間, 才能drop, dragOver時e.target為本身item !!
		let clsCol = this.ClsRowCol;
		let cols = info.RowType.split(',');
		let html = '';
		for (let i=0; i<cols.length; i++) {
			html += `<div class='col-md-${cols[i]} ${clsCol}'></div>`;
		}
		html = `<div class='row py-2'>${html}</div>`;

		//render item
		let item = $(html);
		this._itemAddProp(id, item, EstrItemType.Row, info);
		return item;
	}

	_newTable(id, info) {
		let html = `
<div class='py-2'>
	<div class="x-btns-box">
		<span class="x-span-label">多筆表格</span>
		<button type="button" data-onclick="_me.mRoleProg.onAddRow" class="btn btn-success">新增一列
			<i class="ico-plus"></i>
		</button>
	</div>
	<table class="table x-table x-no-hline" cellspacing="0">
		<thead>
			<tr>
			</tr>
		</thead>
		<tbody>
			<tr>
			</tr>
		</tbody>
	</table>
</div>
`;
		//render item
		let item = $(html);
		this._infoToTable(info, item);	//info to table
		this._itemAddProp(id, item, EstrItemType.Table, info);
		return item;
	}

	//todo
	_newTabPage(id, info) {
		//return item;
	}

	//item 加入共用屬性
	_itemAddProp(id, item, itemType, info) {
		//加入item屬性: .xu-item, data-itemtype
		item.addClass(this.ClsItem);
		item.attr("draggable", true);
		//_obj.setData(item, this.DataId, id);	//jquery data() 只寫入暫存, 使用 _obj(設定屬性) !!
		_obj.setData(item, this.DataItemType, itemType);
		this.itemSetInfo(item, info);
	}
	//#endregion

	_noteSetStatus(note) {
		_obj.showByStatus(note, (note.text().trim() != ''));
	}

	//#region 更新 item 外觀
	//移除/增加 label & inputNote, 直接搬到table, 因為內容有變
	//called by mouseUp
	//param {bool} inBox: drop位置是否在Table裡面
	_resizeItemByTable(item, inBox) {
		let label = item.find(this.FtLabel);
		let note = item.find(this.FtInputNote);
		this._objShowGrid(item.find(this.FtInput), !inBox);
		if (inBox) {
			_obj.hide(label);
			_obj.hide(note);
		} else {
			_obj.show(label);
			this._noteSetStatus(note);
		}
	}

	//重設item寬度, 不處理show/hide
	//param {bool} inBox: in box or not
	//param {int} contGridNum: inBox=true時必須傳入, drop container object(row col)
	_resizeItemByRow(item, inBox, contGridNum) {
		//是否有inputNote
		let label = item.find(this.FtLabel);
		let input = item.find(this.FtInput);
		let note = item.find(this.FtInputNote);
		let list = !inBox ? this.DefaultCols :
			(contGridNum == 6) ? '4,6' :
			(note.text().trim() != '') ? '3,6' : '6,6';
		let cols = list.split(',');
		this._objSetGrid(label, cols[0]);
		this._objSetGrid(input, cols[1]);
	}

	//啟動/停用 css RWD
	//param {bool} status
	_objShowGrid(obj, status) {
		const tail = 'h';
		let css = this._getGridCss(obj);
		let findTail = css.endsWith(tail);
		if (status && findTail) {
			//啟動
			_obj.renameCss(obj, css, css.slice(0, -1));	//移除最後一個字元
		} else if (!status && !findTail) {
			//停用
			_obj.renameCss(obj, css, css + tail);	//讓RWD失效
        }
	}

	//設定css grid
	//param {int} colNum 新的 col-md- 數字
	_objSetGrid(obj, colNum) {
		_obj.renameCss(obj, this._getGridCss(obj), 'col-md-' + colNum);
	}

	//更新畫面上的可視部分
	//called by UiMany onModalOk(修改item內容)
	async InfoToItemA(info, item, fnCallback) {
		let callback = true;
		switch (this.itemGetType(item)) {
			case EstrItemType.Input:
				//此時欄位寬度不會改變, 傳入0
				await this._infoToInputA(info, item);
				break;
			case EstrItemType.Group:
				item.find(this.FtGroupTitle).text(info.Title || '');
				break;
			case EstrItemType.Checks:
				//todo
				callback = false;	//必須先判斷
				this._infoToTable(info, item, fnCallback);
				break;
			case EstrItemType.Row:
				//do nothing
				break;
			case EstrItemType.Table:
				callback = false;	//必須先判斷
				this._infoToTable(info, item, fnCallback);
				break;
			case EstrItemType.TabPage:
				break;
		}

		//set data-info
		this.itemSetInfo(item, info);

		if (callback)
			fnCallback();
	}

	/**
	 * info to input item
	 * called: _getNewInputA, InfoToItemA
	 * //param {int} boxColNum Box 欄位格子數 0,4,6,8,12(0表示不會改變)
	 */ 
	async _infoToInputA(info, item) {
		//resize input item
		let label = item.find(this.FtLabel);
		let input = item.find(this.FtInput);
		let cols = (info.Cols || this.DefaultCols).split(',');
		this._objSetGrid(label, cols[0]);
		this._objSetGrid(input, cols[1]);

		//fid -> placeholder
		_input.getObj(info.Fid, input, info.InputType)
			.attr('placeholder', info.Fid);

		//show/hide required
		_obj.showByStatus(item.find(this.FtReq), info.Required);

		//show/hide labelTip
		_obj.showByStatus(item.find(this.FtTipIcon), _str.notEmpty(info.TitleTip));

		//show/hide inputNote
		this._noteSetStatus(item.find(this.FtInputNote));

		/* todo: temp remark
		//如果改變 inputType, 必須更新item 的x-input內容
		if (this._getInputType(item) != info.InputType) {
			let newItem = await this._getInputA(info);
			let inputHtml = newItem.find(this.FtInput).html();
			item.find(this.FtInput).html(inputHtml);
		}
		*/
	}

	//讀取上層 col-md- 後面的"文數字"
	_getUpGridNum(obj) {
		let col = obj.closest("[class*='col-md-']"); 
		return this._getGridCss(col).split('-')[2];
	}

	//get col css class
	_getGridCss(obj) {
		return obj.attr('class')
			.split(/\s+/)
			.find(a => a.startsWith('col-md-'));
	}

	//info to input item ui
	//called by: 1.新增, 2.改變欄位數
	//param fnCallback 可為空
	_infoToTable(info, item, fnCallback) {
		//update Header		
		let oldLen = item.find('th').length;		//old th list
		let heads = info.Heads.split(',');	//new list
		if (oldLen > heads.length) {
			_tool.ans('是否確定減少欄位數目，尾端欄位將會被移除?', () => this._infoToTable2(info, item, oldLen, heads, fnCallback));
		} else {
			this._infoToTable2(info, item, oldLen, heads, fnCallback);
		}
	}
	//called by _infoToTable
	_infoToTable2(info, item, oldLen, heads, fnCallback) {
		let newLen = heads.length;
		let headBox = item.find('thead tr');
		let bodyBox = item.find('tbody tr');
		let addLen = newLen - oldLen;	//增加的欄位數
		let ids = [];
		if (addLen > 0) {
			//append th
			for (let i = oldLen; i < newLen; i++) {
				headBox.append('<th></th>');
				bodyBox.append('<td class="xu-td"></td>');
			}
		} else if (addLen < 0) {
			//找右側n個td裡面的data-id, 包含子item
			let tdList = bodyBox.find('td').slice(addLen);
			ids = tdList.find('[data-id]').map(function () {
				return $(this).data('id');
			}).get();

			//remove th & td
			headBox.find('th').slice(addLen).remove();
			tdList.remove();
		}

		//update table title
		item.find(this.FtTableTitle).text(info.Title || '');

		//update table heads, 如果使用箭頭函數則this會指向 UiView本身!!
		headBox.find('th').each(function(i){
			$(this).text(heads[i] || '');
		});

		//傳回deleted id list
		if (fnCallback)
			fnCallback(ids);
	}

	//清空工作區
	reset() {
		this.Area.empty();
	}

	//載入item list(非巢狀資料)
	async loadRowsA(rows) {
		//todo: 轉成巢狀
		let jsons = null;

		await this.loadJsonsA(jsons);
	}

	//載入items(巢狀格式), recursive, 此時Info欄位內容為Json, 不是Json字串 !!
	//param {json array} jsons: 內含Id
	async loadJsonsA(jsons, level, box, childNo) {
		//this.reset();	//reset first
		if (jsons == null || jsons.length == 0)
			return;

		level ||= 0;
		if (level > 5) {
			console.log('UiView.js loadItems() level > 5 !!');
			return;
		}

		let boxType = (box == null) ? null : this.itemGetType(box);
		for (let i = 0; i < jsons.length; i++) {
			let json = jsons[i];
			if (_json.isEmpty(json))
				continue;

			//json.Info 為 Json 型態, 不是字串
			let item = await this._newItemA(json.ItemType, json.Id, json.Info);
			this._boxAddItem(box, boxType, childNo, item);

			//load childs(1維陣列, ex: Table) or childArray(2維陣列, ex: Row, TabPage)
			if (_json.notEmpty(json.Childs)) {
				//load childs(1維), 直接add item, 不使用recursive
				let childs = json.Childs;
				for (let j = 0; j < childs.length; j++) {
					let json2 = childs[j];
					if (_json.notEmpty(json2)) {
						let item2 = await this._newItemA(json2.ItemType, json2.Id, json2.Info);
						this._boxAddItem(item, json.ItemType, j, item2);
					}
				}
			} else if (_json.notEmpty(json.ChildArray)) {
				//recursive load childArray(2維)
				let childArray = json.ChildArray;
				for (let j = 0; j < childArray.length; j++) {
					let childs = childArray[j];
					if (childs != null && childs.length > 0)
						await this.loadJsonsA(childs, level + 1, item, j);
				}
			}
		}
	}

	//ui to jsons
	getJsons() {
		let me = this;;
		function buildJson(item) {
			//初始化 json
			let itemType = me.itemGetType(item);
			let json = {
				ItemType: itemType,
				Info: me.itemGetInfo(item),		//data-info取出來為json型態!!
			};

			//get child field name
			switch (itemType) {
				case EstrItemType.Checks:
					//todo
					// table 的 xu-item 在 tbody > tr > td 裡
					json.Childs = [];
					item.find("tbody td").each(function () {
						let item2 = $(this).children(me.FtItem).first();
						json.Childs.push(item2.length > 0 ? buildJson(item2) : null);	//使用Childs
					});
					break;
				case EstrItemType.Row:
				case EstrItemType.TabPage:
					let ftCont = (itemType == EstrItemType.Row)
						? me.FtRowCol : me.FtTabPane;
					json.ChildArray = [];
					item.find(ftCont).each(function (idx) {
						let childs = [];
						$(this).children(me.FtItem).each(function (idx2) {
							childs[idx2] = buildJson($(this));
						});
						json.ChildArray[idx] = childs;	//使用ChildArray
					});
					break;
				case EstrItemType.Table:
					// table 的 xu-item 在 tbody > tr > td 裡
					json.Childs = [];
					item.find("tbody td").each(function () {
						let item2 = $(this).children(me.FtItem).first();
						json.Childs.push(item2.length > 0 ? buildJson(item2) : null);	//使用Childs
					});
					break;
			}
			return json;
		}

		//children為xu-item
		let jsons = [];
		this.Area.children(this.FtItem).each(function () {
			jsons.push(buildJson($(this)));
		});
		return jsons;
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
	itemGetType(item) {
		return _obj.isEmpty(item)
			? null : item.data(this.DataItemType);
	}

	//also called by UiMany
	itemGetId(item) {
		return item.data(this.DataId);
	}

	itemGetInfo(item) {
		return item.data(this.DataInfo);
	}

	itemSetInfo(item, info) {
		_obj.setData(item, this.DataInfo, _json.toStr(info));
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

	/*
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
	*/
	//#endregion

	/*
	//check has startNode or not
	this.hasStartNode = function () {
		//some 用法類似 c# any()
		return this.items.some(node => node.getNodeType() == EstrNodeType.Start);
	};
	*/

} //class UiView
