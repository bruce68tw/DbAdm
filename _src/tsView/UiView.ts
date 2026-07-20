/**
 * 處理畫面操作, 包含基本元件, 使用jQuery
 * ItemType Input欄位和Group由後端傳入, RowBox、Table、TabPage由前端產生
 * 注意:
 * 1.新增、修改內容、刪除要寫回 mItem:
 * 2.whenSave 重新設定新增或位置有改變的Item的 BoxId, ChildNo, Sort欄位
 * 3.Info 儲存在 uiMany
 */
class UiView {
	DefaultCols: string;

	private uiMany: UiMany;
	private Area: JQuery;
	private BoxId0: string;
	private ClsItem: string;
	private ClsChild: string;
	private ClsRowCol: string;
	private ClsDragging: string;
	private DataId: string;
	private DataItemType: string;
	private DropLine: JQuery;
	private FtItem: string;
	private FtLabel: string;
	private FtInput: string;
	private FtReq: string;
	private FtTipIcon: string;
	private FtInputNote: string;
	private FtChild: string;
	private FtGroupTitle: string;
	private FtTable: string;
	private FtTableTitle: string;
	private NameInput: string;
	private NameGroup: string;
	private NameChecks: string;
	private NameRB: string;
	private NameTable: string;
	private NameTabPage: string;
	private isEdit: boolean;
	private newItemId: number;
	private chgBoxJsons: any[];
	private inputMap: Record<string, string>;
	private groupHtml: string;
	private dragItem: DragItemDto;
	private dropItem: DragItemDto;
	private dragIsNew: boolean;
	private dragging: boolean;
	private dropElm: ElmN;
	private dropArea: any;
	private dropError: string;

	//建構子不能執行非同步
	constructor(uiMany: UiMany, ftWorkArea: string) {
		//內容不會變, 使用大camel
		//使用Fid, Title這2個欄位值傳到後端建立元件, 傳到前端後再取代成實際屬性
		this.uiMany = uiMany;
		this.Area = $(ftWorkArea);
		this.BoxId0 = '0';					//表示 box 為 Area
		this.ClsItem = 'xu-item';			//item class
		//this.ClsSpan = 'xu-span';			//span
		this.ClsChild = 'xu-child';			//box container of child for contain item
		this.ClsRowCol = 'xu-row-col';		//row col, 輸入欄位外層的 col-md-xxx 這一層, for 改變 Cols 判斷 
		this.ClsDragging = 'xu-dragging';	//加在 Area 表示 dragging
		//this.ClsTableCont = 'td';			//table for item container
		//this.ClsTabPageCont = 'tab-pane';	//tabPage panel for item container
		this.DataId = 'id';					//for data-id
		this.DataItemType = 'itemtype';		//for data-itemtype
		//this.DataInfo = 'info';				//for data-info
		this.DefaultCols = '2,3';			//default input Cols
		this.DropLine = $('.xu-drop-line');	//drop時顯示的位置線
		//this.DropVline = $('.xu-drop-vline');	//drop時顯示的位置線
		this.FtItem = '.' + this.ClsItem;	//item filter
		this.FtLabel = '.x-label';			//item label
		this.FtInput = '.x-input';			//item input
		this.FtReq = '.x-required';			//required
		this.FtTipIcon = '.ico-info';		//label tip icon
		this.FtInputNote = '.x-input-note';	//input note
		this.FtChild = '.' + this.ClsChild;	//child container filter
		this.FtGroupTitle = '.x-group-title';	//group title
		this.FtTable = '.x-table';				//table
		this.FtTableTitle = '.x-span-label';	//table title, todo: ??		
		//this.FtTableCont = '.' + this.ClsTableCont;	//table container
		//this.FtRowCol = '.' + this.ClsRowCol;	//row col
		//this.FtTabPageCont = '.' + this.ClsTabPageCont;	//tabPage panel
		//
		this.NameInput = '[輸入欄位]';
		this.NameGroup = '[分群文字]';
		this.NameChecks = '[多選欄位]';
		//this.NameSpan = '[並排容器]';
		this.NameRB = '[多欄容器]';
		this.NameTable = '[多筆表格]';
		this.NameTabPage = '[多頁容器]';

		this.isEdit = true;			//是否可編輯, temp to true	
		this.newItemId = 0;			//新item Id, 自動累減, 使用負數!!		
		this.chgBoxJsons = [];		//childs2 有"新增"的 boxId, '0'表示work area, 欄位BoxId,ChildNos(數字陣列)

		this.inputMap = {};			//模版: 各種輸入欄位, 減少後端傳回		
		this.groupHtml = '';		//模版: group item html, 後端傳回
		//this.isDropVline = false;	//在UiItemTypeEstr.Span時顯示垂直線

		//drag/drop相關, Box表示外層Item
		this.dragItem = new DragItemDto();
		this.dropItem = new DragItemDto();
		//
		this.dragIsNew = false;		//true表示從button drag
		this.dragging = false;
		this.dropElm = null;		//drop參照的element, 與 item 不是同一個
		this.dropArea = null;		//實際drop的container object, 不一定是item類型, null表示workArea
		this.dropError = '';		//drop error message

		//this.fnShowMenu = null;		//顯示右鍵選單, function(e, item)
		//this.fnAddItem = null;		//add new item, function(boxId, itemType), return new row
		//this.fnSaveInfo = null;		//onDragEnd時會呼叫 mItem 這個函數

		//work area註冊全域事件
		//右鍵選單事件
		let me = this;
		this.Area.on(MouseEstr.RightMenu, this.FtItem, function (e) {
			e.preventDefault();  // 取消瀏覽器預設右鍵選單
			//e.stopPropagation(); // 阻止冒泡，避免先被 document 的 mousedown 處理

			let item = me._elmToItem(e.target);
			me.uiMany.showMenu(e, item);
		});

		//drag/drop 事件
		this.Area.on(MouseEstr.DragStart, function (e) {
			if (me.isEdit)
				me._onDragStart(e);
		}).on(MouseEstr.DragOver, function (e) {
			if (me.dragging)
				me._onDragOver(e);
		}).on(MouseEstr.DragEnd, function (e) {
			//drop成功或失敗都會觸發, dragging在函數裡面判斷
			me.onDragEnd(e);
		});
	}

	//#region drag/drop 事件相關
	private _onDragStart(e: any) {
		//e.preventDefault();		//阻止文字被選取
		this._setDragging(true);	//設定dragging狀態 & 變數

		//記錄目前移動的Item element
		let drag = this.dragItem;
		drag.item = $(e.target);
		drag.itemType = this.itemGetType(drag.item);
		let box = this._getBox(drag.item);
		drag.boxType = this.itemGetType(box);
		drag.boxId = (box == null) ? this.BoxId0 : this.itemGetId(box);
		//drag.isBox = this.isBox(drag.itemType);
	}

	private _onDragOver(e: any) {
		e.preventDefault();		//允許drop, 不會顯示禁止icon

		//相同 element 不處理
		let dropElm = e.target;		//e.target 為目前經過的最內層的 element
		if (this.dropElm == dropElm) return;

		//get drop item, 空值表示 box 為 work area
		let dropObj = $(dropElm);
		let dropItem = dropObj.closest(this.FtItem);
		let hasDropItem = _Obj.notEmpty(dropItem);	//是否有參照的 drop item

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
		//let boxHasItem = false;
		let boxAppendItem = false;
		if (hasDropItem) {
			/*
			dropInBox =
				//Span: 在 span 裡面
				//(drop.itemType == UiItemTypeEstr.Span && dropObj.hasClass(this.ClsSpan)) ||
				//RowBox: 沒有 ClsItem 表示在內部
				(drop.itemType == UiItemTypeEstr.RowBox && !dropObj.hasClass(this.ClsItem)) ||
				//Table: 在 td 裡面
				(drop.itemType == UiItemTypeEstr.Table && _Obj.tagName(dropObj) == this.ClsTableCont) ||
				//TabPage: 在 ClsTabPageCont 裡面
				(drop.itemType == UiItemTypeEstr.TabPage && dropObj.hasClass(this.ClsTabPageCont));
			*/

			//drop.boxType表示 "drag item" drop進去的box item, 沒有則為null
			if (this.isBox(drop.itemType) && dropObj.hasClass(this.ClsChild)) {
				//box child 內容為空的情況
				boxAppendItem = true;
				drop.boxType = drop.itemType;
				drop.boxId = this.itemGetId(dropItem);
				dropInBox = true
			} else {
				//其他狀況(box child不為空)但 dropInBox 可能為 true
				//找外層 item
				var box = this._getBox(dropItem);
				drop.boxType = this.itemGetType(box);
				drop.boxId = (box == null) ? this.BoxId0 : this.itemGetId(box);
				dropInBox = this.isBox(drop.boxType);
				//boxHasItem = true;
			}

			//set instances
			//this.isDropVline = (drop.boxType == UiItemTypeEstr.Span);

			//for debug
			console.log(`dragType=${drag.itemType}, dropType=${drop.itemType}, drop.boxType=${drop.boxType}, 
				up css=${dropObj.attr('class')}, up item boxId=${dropObj.find(this.FtItem).length}, 
				dropInBox=${dropInBox}`);
		} else {
			dropObj = this.Area;
			boxAppendItem = true;
		}

		/*
		 x軸: drop, y軸: drag 
		 如果 drop.boxType == null, 則 drop 位置無限制
		   (inside)RB	Table TabPage
		 ------------------------------
		 Input		O	  ?		O
		 Group		O	  x		O
		 Checks		O	  x		O
		 RB	   		x	  x		O
		 Table		x	  x		x
		 TabPage	x	  x		x
		*/

		//(只考慮)不能drop時, 記錄error message, 在後面顯示
		//!dropInBox 則都可以 drop
		let error = '';
		let dragName = '';
		if (hasDropItem && drop.boxType != null) {
			switch (drag.itemType) {
				case UiItemTypeEstr.Input:
					if (drop.boxType == UiItemTypeEstr.Table) {
						if (dropObj.find(this.FtItem).length > 0)
							error = `${this.NameTable}只能放一個${this.NameInput}。`;
					}
					break;
				case UiItemTypeEstr.Group:
					dragName = this.NameGroup;
					switch (drop.boxType) {
						/*
						case UiItemTypeEstr.Span:
							error = `${dragName}不能放在${this.NameSpan}裡面。`;
							break;
						*/
						case UiItemTypeEstr.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
					}
					break;
				case UiItemTypeEstr.Checks:
					dragName = this.NameChecks;
					switch (drop.boxType) {
						/*
						case UiItemTypeEstr.Span:
							error = `${dragName}不能放在${this.NameSpan}裡面。`;
							break;
						*/
						case UiItemTypeEstr.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
					}
					break;
				/*
				case UiItemTypeEstr.Span:
					dragName = this.NameSpan;
					switch (drop.boxType) {
						case UiItemTypeEstr.Span:
							error = `${dragName}不能放在${this.NameSpan}裡面。`;
							break;
						case UiItemTypeEstr.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
					}
					break;
				*/
				case UiItemTypeEstr.RowBox:
					dragName = this.NameRB;
					switch (drop.boxType) {
						case UiItemTypeEstr.RowBox:
							error = `${dragName}不能放在${this.NameRB}裡面。`;
							break;
						case UiItemTypeEstr.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
					}
					/*
					switch (drop.itemType) {
						case UiItemTypeEstr.RowBox:
							error = `${dragName}不能放在${this.NameRB}裡面。`;
							break;
						case UiItemTypeEstr.Table:
							error = `${dragName}不能放在${this.NameTable}裡面。`;
							break;
						case UiItemTypeEstr.Input:
						case UiItemTypeEstr.Group:
							if (drop.boxType == UiItemTypeEstr.RowBox) {
								error = `${dragName}不能放在${this.NameRB}裡面。`;
							} else if (drop.boxType == UiItemTypeEstr.Table) {
								error = `${dragName}不能放在${this.NameTable}裡面。`;
							}
							break;
					}
					*/
					break;
				case UiItemTypeEstr.Table:
				case UiItemTypeEstr.TabPage:
					dragName = (drag.itemType == UiItemTypeEstr.Table)
						? this.NameTable : this.NameTabPage;
					let dropIsBox = this.isBox(drop.itemType);
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
		let dropLine = this._getDropLine();
		_Obj.show(dropLine);

		//if (dropInBox || !hasDropItem) {
		if (boxAppendItem) {
			dropObj.append(dropLine);
		} else {
			//判斷drop位置在item的上或下方
			let dropRect = drop.item[0].getBoundingClientRect();
			// 滑鼠在 drop.item 的相對位置
			let mouseY = e.clientY;
			let isUpPos = (mouseY < dropRect.top + (dropRect.height / 2));
			//console.log(`dragRect.top=${dragRect.top}, drop pos=${dropRect.top + dropRect.height / 2}`);
			if (isUpPos) {
				dropLine.insertBefore(drop.item);
			} else {
				dropLine.insertAfter(drop.item);
			}
		}
	}

	//會改變Item的BoxId、ChildNo
	//also called by uiMany drag/drop button
	async onDragEnd(e: any) {
		if (!this.dragging) return;

		//工作區內外都可以觸發 DragEnd, 利用mouse座標來判斷
		const rect = this.Area[0].getBoundingClientRect();
		const x = e.clientX;
		const y = e.clientY;
		const inArea = (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);

		if (this.dropError != '') {
			_Tool.msg(this.dropError);
		} else if (inArea) {
			let drag = this.dragItem;
			let drop = this.dropItem;
			let dragType = this.dragItem.itemType;	//drag button時會設定this.dragItem.itemType
			let dropLine = this._getDropLine();

			//set chgBoxJsons, whenSave會重設 childs2的 BoxId、ChildNo、Sort
			let boxId = _Var.isEmpty(drop.boxId) ? this.BoxId0 : drop.boxId!;
			let childNo = $(this.dropElm!).closest(this.FtChild).index();
			this._setChgBoxJsons(boxId, childNo);

			//create new item if need
			//get info
			let info, itemId;
			if (this.dragIsNew) {
				let row = this.uiMany.addItemRow(dragType);
				itemId = row.Id;
				info = _Str.toJson(row.Info);
				let item = await this._newItemA(dragType!, itemId, info);
				drag.item = item;
			} else {
				itemId = this.itemGetId(drag.item!);
				info = this.itemGetInfo(drag.item!);
			}

			//調整 item 大小或外觀
			if (dragType == UiItemTypeEstr.Input || dragType == UiItemTypeEstr.Checks) {
				//移入/移出 RowBox 時調整大小(互斥判斷: a^b 或是 a !== b)
				let checkType = UiItemTypeEstr.RowBox;
				if (this._isBoxTypeXor(checkType)) {
					let inTable = (drop.boxType == checkType);
					let gridNum = inTable
						? this._getUpGridNum(dropLine)	//利用dropLine讀取上層grid num
						: 0;
					//let info = this.itemGetInfo(drag.item);
					let prop = { Cols: this._resizeItemByRB(drag.item!, inTable, gridNum) };
					this._setInfoProp(itemId, prop);

					//update mItem info
					//this.uiMany.setInfo(this.itemGetId(drag.item), info);
				}

				/*
				//移入/移出 Span時 show/hide label、note(互斥判斷同上) input only
				checkType = UiItemTypeEstr.Span;
				if (this._isBoxTypeXor(checkType))
					this._setInputForTable(drag.item, (drop.boxType == checkType));
				*/

				//移入/移出 Table時 show/hide label、note(互斥判斷同上) input only
				checkType = UiItemTypeEstr.Table;
				if (this._isBoxTypeXor(checkType))
					this._setInputForTable(drag.item!, (drop.boxType == checkType));
			}

			//item移到 drog line的位置
			drag.item!.insertAfter(dropLine);
		}

		//reset variables
		this._setDragging(false);
	}

	//只找第一層item
	boxGetChildIds(boxId: string, childNo: number) {
		let box = (boxId == this.BoxId0)
			? this.Area
			: this._findItem(boxId).find(this.FtChild).eq(childNo);
		if (_Obj.isEmpty(box)) return null;

		let me = this;
		return box.children(this.FtItem).map(function () {
			return _Obj.getData($(this), me.DataId);
		}).get();  // .get() 把 jQuery 物件轉成一般陣列
	}

	private _findItem(itemId: string) {
		return $(`[data-${this.DataId}="${itemId}"]`);
	}

	getChgBoxJsons() {
		return this.chgBoxJsons;
	}

	//add chgBoxJsons
	private _setChgBoxJsons(boxId: string, childNo: number) {
		if (childNo < 0) childNo = 0;

		let row = this.chgBoxJsons.find(a => a.BoxId === boxId);
		if (!row) {
			// 未找到：新增一筆
			this.chgBoxJsons.push({ BoxId: boxId, ChildNos: [childNo] });
		} else {
			// 已存在：若 ChildNos 不包含此 childNo，則加入
			if (!row.ChildNos.includes(childNo))
				row.ChildNos.push(childNo);
		}
	}

	private _getDropLine() {
		//return this.isDropVline ? this.DropVline : this.DropLine;
		return this.DropLine;
	}

	/**
	 * box item add child item 
	 * param {object} box
	 * param {string} boxType, null 表示工作區
	 * param {int} childNo child 位置, base 0
	 * param {object} item
	 */
	/*
	_boxAddItem(box, boxType, childNo, item) {
		let upElm;	//container element
		switch (boxType) {
			case null:
				upElm = this.Area;
				break;
			case UiItemTypeEstr.RowBox:
				//找col位置
				upElm = box.children().eq(childNo);
				break;
			case UiItemTypeEstr.Table:
				//hide label, inputNote
				this._setInputForTable(item, true);

				//找td位置: tr第0列
				upElm = box.find('tbody tr').eq(0).find('td').eq(childNo);
				break;
			case UiItemTypeEstr.TabPage:
				//todo
				//page位置
				break;
			default:
				return;
		}

		upElm.append(item);
	}
	*/

	//drag by button
	//also called by uiMany
	startDragBtn(status: boolean, itemType: any) {
		this._setDragging(status);	//call first !!
		this.dragIsNew = status;
		this.dragItem.itemType = itemType;
	}

	private _setDragging(status: boolean) {
		if (status) {
			this.dragging = true;
			this.dragItem = new DragItemDto();
			this.dropItem = new DragItemDto();
			this.dropElm = null;
			this.Area.addClass(this.ClsDragging);
		} else {
			this.dragging = false;
			this.dragIsNew = false;	//reset
			this.Area.removeClass(this.ClsDragging);
			_Obj.hide(this._getDropLine());
		}
	}

	//#endregion

	//#region 判斷 & 轉換
	//item type to item show name
	private _typeToName(itemType: any) {
		switch (itemType) {
			case UiItemTypeEstr.Input:
				return this.NameInput;
			case UiItemTypeEstr.Group:
				return this.NameGroup;
			case UiItemTypeEstr.Checks:
				return this.NameChecks;
			//case UiItemTypeEstr.Span:
			//	return this.NameSpan;
			case UiItemTypeEstr.RowBox:
				return this.NameRB;
			case UiItemTypeEstr.Table:
				return this.NameTable;
			case UiItemTypeEstr.TabPage:
				return this.NameTabPage;
		}
	}

	//互斥檢查 for 移入/移出 的boxType
	//param {string} checkType: 要檢查的 itemType
	//return {bool} 是否互斥
	private _isBoxTypeXor(checkType: any) {
		let dragBoxYes = (this.dragItem.boxType === checkType);
		let dropBoxYes = (this.dropItem.boxType === checkType);
		return (dragBoxYes !== dropBoxYes);
	}

	//called by: this, uiMany
	isBox(type: any) {
		return (/*type == UiItemTypeEstr.Span ||*/
			type == UiItemTypeEstr.RowBox ||
			type == UiItemTypeEstr.Table ||
			type == UiItemTypeEstr.TabPage);
	}
	//#endregion

	//#region 新增 item
	//產生新item
	//called: onDragEnd、loadJsonsA 
	//param {json} info: item info 資訊
	private async _newItemA(itemType: any, itemId: string, info: any): Promise<JQuery> {
		switch (itemType) {
			case UiItemTypeEstr.Input:
				return await this._newInputA(itemId, info);
			case UiItemTypeEstr.Group:
				return await this._newGroupA(itemId, info);
			case UiItemTypeEstr.Checks:
				return this._newChecks(itemId, info);
			//case UiItemTypeEstr.Span:
			//	return this._newSpan(itemId, info);
			case UiItemTypeEstr.RowBox:
				return this._newRB(itemId, info);
			case UiItemTypeEstr.Table:
				return await this._newTableA(itemId, info);
			case UiItemTypeEstr.TabPage:
				return this._newTabPage(itemId, info);
		}
	}

	/**
	 * add input
	 * called _newItemA, onModalOk
	 * param {string} id
	 * param {json} info 包含欄位: Fid, Title, Required
	 * returns item
	 */
	private async _newInputA(id: string, info: any): Promise<JQuery> {
		//constant for 後端產生input html
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
			let tpl = await _Ajax.getStrA('GetInputHtml', data);
			map[inputType] = tpl;
		}

		//replace fid, title, titleTip, inputNote
		let html = map[inputType];
		html = _Str
			.replaceAll(html, Fid, info.Fid)
			.replace(Title, info.Title)
			.replace(TitleTip, info.TitleTip || '')
			.replace(InputNote, info.InputNote || '');

		//create item & add property
		let item = $(html);
		this._itemAddProp(id, item, UiItemTypeEstr.Input);

		await this._infoToInputA(info, item);
		return item;
	}

	private async _newGroupA(id: string, info: any) {
		const Title = '_title_';
		if (_Str.isEmpty(this.groupHtml))
			this.groupHtml = await _Ajax.getStrA('GetGroupHtml', { title: Title });

		//replace title
		let html = this.groupHtml;
		html = html.replace(Title, info.Title);

		//render item
		let item = $(html);
		this._itemAddProp(id, item, UiItemTypeEstr.Group);
		return item;
	}

	private _newChecks(id: string, info: any) {
		let html = `<div class='row py-2'>${this._htmlChecks(id, info)}</div>`;
		let item = $(html);
		this._itemAddProp(id, item, UiItemTypeEstr.Checks);
		return item;
	}

	//get checks 內部 html only
	//called by _newChecks, onModalOk
	private _htmlChecks(id: string, info: any) {
		//寫入 label, fid list
		let fids = info.LabelFids.split(',');
		let html = '';
		for (let i = 0; i < fids.length; i += 2) {
			let fid = fids[i + 1];
			html += `
<label class='xi-check'>
    <input data-fid='${fid}' name='${fid}' data-edit checked='' type='checkbox' data-type='check' data-value=''>${fids[i]}
    <span class='xi-cspan'></span>
</label>
`;
		}

		let clsCol = this.ClsRowCol;
		let cols = info.Cols.split(',');
		let cls = _Var.toBool(info.IsHori) ? 'x-hbox' : 'x-vbox';
		html = `
<div class='col-md-${cols[0]} x-label'>${info.Title}</div>
<div class='col-md-${cols[1]} x-input ${cls}'>
	${html}
</div>
`;
		//render item
		return html;
	}

	/*
	_newSpan(id, info) {
		//加上py-2上下空間, 才能drop, dragOver時e.target為本身item !!
		let html = '<div class="d-flex w-100 xu-span"></div>';
		let item = $(html);
		this._itemAddProp(id, item, UiItemTypeEstr.Span);
		return item;
	}
	*/

	//add new RowBox
	private _newRB(id: string, info: any) {
		//加上py-2上下空間, 才能drop, dragOver時e.target為本身item !!
		//let clsCol = this.ClsRowCol;
		let cols = info.RowType.split(',');
		let html = '';
		for (let i = 0; i < cols.length; i++) {
			html += `<div class='col-md-${cols[i]} ${this.ClsRowCol} ${this.ClsChild}'></div>`;
		}
		html = `<div class='row py-2'>${html}</div>`;

		//render item
		let item = $(html);
		this._itemAddProp(id, item, UiItemTypeEstr.RowBox);
		return item;
	}

	private async _newTableA(id: string, info: any) {
		let html = `
<div class='py-2'>
	<div class='x-btns-box'>
		<span class='x-span-label'>多筆表格</span>
		<button type='button' data-onclick='_me.mRoleProg.onAddRow' class='btn btn-success'>新增一列
			<i class='ico-plus'></i>
		</button>
	</div>
	<table class='table x-table x-no-hline' cellspacing='0'>
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
		await this._infoToTableA(info, item);	//info to table
		this._itemAddProp(id, item, UiItemTypeEstr.Table);
		return item;
	}

	//todo
	private _newTabPage(id: string, info: any):JQuery {
		//return item;
		return null;
	}

	//item 加入共用屬性, 不儲存 info
	private _itemAddProp(id: string, item: JQuery, itemType: any) {
		//加入item屬性: .xu-item, data-itemtype
		item.addClass(this.ClsItem);
		item.attr('draggable', 'true');
		_Obj.setData(item, this.DataId, id);	//jquery data() 只寫入暫存, 使用 _Obj(設定屬性) !!
		_Obj.setData(item, this.DataItemType, itemType);
		//this.itemSetInfo(item, info);
	}
	//#endregion

	private _noteSetStatus(note: JQuery) {
		_Obj.showByStatus(note, (note.text().trim() != ''));
	}

	//#region 更新 item 外觀
	//移除/增加 label & inputNote, 直接搬到table, 因為內容有變
	//called by mouseUp
	//param {bool} inBox: drop位置是否在Table裡面
	private _setInputForTable(item: JQuery, inBox: boolean) {
		let label = item.find(this.FtLabel);
		let note = item.find(this.FtInputNote);
		this._objShowGrid(item.find(this.FtInput), !inBox);
		if (inBox) {
			_Obj.hide(label);
			_Obj.hide(note);
		} else {
			_Obj.show(label);
			this._noteSetStatus(note);
		}
	}

	/**
	 * 重設item寬度, 不處理show/hide
	 * param {bool} inBox: in box or not
	 * param {int} contGridNum: inBox=true時必須傳入, drop container object(row col)
	 * return {string} cols
	 */
	private _resizeItemByRB(item: JQuery, inBox: boolean, contGridNum: number) {
		//是否有inputNote
		let label = item.find(this.FtLabel);
		let input = item.find(this.FtInput);
		let note = item.find(this.FtInputNote);
		let cols = !inBox ? this.DefaultCols :
			(contGridNum == 6) ? '4,6' :
				(note.text().trim() != '') ? '3,6' : '6,6';
		let values = cols.split(',');
		this._objSetGrid(label, values[0]);
		this._objSetGrid(input, values[1]);
		return cols;
	}

	//啟動/停用 css RWD
	//param {bool} status
	private _objShowGrid(obj: JQuery, status: boolean) {
		const tail = 'h';
		let css = this._getGridCss(obj);
		if (!css) return;
		let findTail = css.endsWith(tail);
		if (status && findTail) {
			//啟動
			_Obj.renameCss(obj, css, css.slice(0, -1));	//移除最後一個字元
		} else if (!status && !findTail) {
			//停用
			_Obj.renameCss(obj, css, css + tail);	//讓RWD失效
		}
	}

	//設定css grid
	//param {int} colNum 新的 col-md- 數字
	private _objSetGrid(obj: JQuery, colNum: string) {
		let css = this._getGridCss(obj);
		if (css) {
			_Obj.renameCss(obj, css, 'col-md-' + colNum);
		}
	}

	/**
	 * called by UiMany onModalOk(修改item內容)
	 * 更新畫面上的Item(含外觀、不含Info欄位)
	 * param {json} info
	 * param {object} item
	 * return {status:bool, itemIds:string[]}如果box有刪減欄位, 則傳回要刪除的itemId 字串陣列
	 */
	async infoToItemA(info: any, item: JQuery) {
		let id = info.Id;
		//let itemIds = [];
		let defResult = { status: true, itemIds: null as string[] | null };	//default result
		//let callback = true;
		switch (this.itemGetType(item)) {
			case UiItemTypeEstr.Input:
				//get old inputType first
				let oldType = this._getInputType(item);

				//info to input UI
				await this._infoToInputA(info, item);

				// todo: temp remark
				//如果改變 inputType, 必須更新item 的x-input內容
				if (oldType != info.InputType) {
					let newItem = await this._newInputA(info.Id, info);
					//let newItem = await this._getInputA(info);
					let inputHtml = newItem.find(this.FtInput).html();
					item.find(this.FtInput).html(inputHtml);
				}

				break;
			case UiItemTypeEstr.Group:
				item.find(this.FtGroupTitle).text(info.Title || '');
				//return result;
				break;
			case UiItemTypeEstr.Checks:
				info.LabelFids = _Str.replaceAll(info.LabelFids, '\n', ',');	//斷行改回逗號
				item.html(this._htmlChecks(id, info));	//改變內部 html(重新產生html)
				//return result;
				break;
			/*
			case UiItemTypeEstr.Span:
				//do nothing
				break;
			*/
			case UiItemTypeEstr.RowBox:
				//todo
				break;
			case UiItemTypeEstr.Table:
				//callback = false;	//必須先判斷
				return await this._infoToTableA(info, item);
			//break;
			case UiItemTypeEstr.TabPage:
				//todo
				break;
		}

		//if (callback)
		//	fnCallback();
		return defResult;
	}

	/**
	 * info json write to input item UI
	 * called: _newInputA, InfoToItemA
	 * param {json} info 
	 * param {jquery object} item 
	 */
	private async _infoToInputA(info: any, item: JQuery) {
		//resize input item
		let label = item.find(this.FtLabel);
		let input = item.find(this.FtInput);
		let cols = (info.Cols || this.DefaultCols).split(',');
		this._objSetGrid(label, cols[0]);
		this._objSetGrid(input, cols[1]);

		//set title
		label.html(`<span class="x-required">*</span>${info.Title}`);

		//fid -> placeholder if need
		let inputType = info.InputType;
		if (inputType != InputTypeEstr.Check && inputType != InputTypeEstr.Radio && inputType != InputTypeEstr.File) {
			input.find('input').attr('placeholder', info.Fid);
		}

		//show/hide required
		_Obj.showByStatus(item.find(this.FtReq), info.Required);

		//show/hide labelTip
		_Obj.showByStatus(item.find(this.FtTipIcon), _Str.notEmpty(info.TitleTip));

		//show/hide inputNote
		this._noteSetStatus(item.find(this.FtInputNote));

		//case of radio 欄位: 設定label by info.ExtInfo
		if (inputType == InputTypeEstr.Radio && _Str.notEmpty(info.ExtInfo)) {
			let html = '';
			let fid = info.Fid;
			let values = info.ExtInfo.split(',');
			for (let i = 0; i < values.length; i++) {
				html += `
<label class='xi-check'>
	<input type='radio' data-fid='${fid}' name='${fid}' data-edit data-value='${i + 1}' data-type='radio'>${values[i]}
	<span class='xi-rspan'></span>
</label>
`;
			}
			item.find('.xi-box').html(html);
		}
	}

	//讀取上層 col-md- 後面的"文數字"
	private _getUpGridNum(obj: JQuery) {
		let col = obj.closest("[class*='col-md-']");
		let css = this._getGridCss(col);
		return css ? parseInt(css.split('-')[2], 10) : 0;
	}

	//get col css class
	private _getGridCss(obj: JQuery) {
		let className = obj.attr('class');
		if (!className) return '';
		return className
			.split(/\s+/)
			.find(a => a.startsWith('col-md-')) || '';
	}

	/**
	 * info to table item ui
	 * called by: 1.新增, 2.改變欄位數
	 * //param {function} fnCallback 可為空
	 * return {string[]} 要刪除的 itemId 字串陣列
	 */
	private async _infoToTableA(info: any, item: JQuery) {
		//update Header		
		let oldLen = item.find('th').length;	//old th list
		let heads = info.Heads.split(',');		//new list
		if (oldLen > heads.length && !await _Tool.ansA('是否確定減少欄位數目，尾端欄位將會被移除?'))
			return { status: false };

		let newLen = heads.length;
		let headBox = item.find('thead tr');
		let bodyBox = item.find('tbody tr');
		let addLen = newLen - oldLen;	//增加的欄位數
		let ids: string[] = [];
		if (addLen > 0) {
			//append th
			for (let i = oldLen; i < newLen; i++) {
				headBox.append('<th></th>');
				bodyBox.append(`<td class="${this.ClsChild}"></td>`);
			}
		} else if (addLen < 0) {
			//找右側n個td裡面的data-id, 包含子item
			let tdList = bodyBox.find('td').slice(addLen);
			ids = tdList.find('[data-id]').map(function () {
				return $(this).data('id');	//todo
			}).get();

			//remove th & td
			headBox.find('th').slice(addLen).remove();
			tdList.remove();
		}

		//update table title
		item.find(this.FtTableTitle).text(info.Name || '');

		//update table heads, 如果使用箭頭函數則this會指向 UiView本身!!
		headBox.find('th').each(function (i) {
			$(this).text(heads[i] || '');
		});

		return { status: true, itemIds: ids };
		//傳回deleted id list
		//if (fnCallback)
		//	fnCallback(ids);
	}

	//清空工作區
	reset() {
		this.Area.empty();
		this.chgBoxJsons = [];
	}

	/**
	 * (recursive)載入items(巢狀格式), 此時Info欄位可能為Json或字串 !!
	 * called by uiMany loadRowsA、loadJsonsA
	 * param {json array} jsons: 內含Id
	 * param {object} (this.Area) cont child container
	 */
	async loadJsonsA(jsons: any[], cont?: JQuery) {
		//this.reset();	//reset first
		if (_Array.isEmpty(jsons)) return;

		//render UI
		let targetCont = cont || this.Area;
		let me = this;
		for (let i = 0; i < jsons.length; i++) {
			let json = jsons[i];
			if (_Json.isEmpty(json)) continue;

			//json.Info 為 Json 型態(by loadJsonsA), 或是字串(by loadRowsA)
			if (_Var.isStr(json.Info))
				json.Info = _Str.toJson(json.Info);

			//如果 input 在 table 裡面, hide label、note
			let item = await this._newItemA(json.ItemType, json.Id, json.Info);
			if (json.ItemType == UiItemTypeEstr.Input && this.itemGetType(targetCont.closest(this.FtItem)) == UiItemTypeEstr.Table)
				this._setInputForTable(item, true);
			targetCont.append(item);
			//this._boxAddItem(box, boxType, childNo, item);

			//childs2(2維陣列)
			let childs2 = json.Childs2;
			if (_Array.isEmpty(childs2)) continue;

			let childLen = childs2.length;
			const children = item.find(this.FtChild);
			for (let idx = 0; idx < children.length && idx < childLen; idx++) {
				if (_Array.isEmpty(childs2[idx]))
					continue;

				await me.loadJsonsA(childs2[idx], $(children[idx]));
			}
		}
	}

	//ui to jsons
	getJsons() {
		let me = this;

		//recursive
		function _item2Json(item: JQuery) {
			//初始化 json
			let itemType = me.itemGetType(item);
			let json: any = {
				ItemType: itemType,
				Info: me.itemGetInfo(item),		//data-info取出來為json型態!!
			};

			if (me.isBox(itemType)) {
				json.Childs2 = [];
				item.find(me.FtChild).each(function (idx) {
					let childs: any[] = [];
					$(this).children(me.FtItem).each(function (idx2) {
						childs[idx2] = _item2Json($(this));
					});
					json.Childs2[idx] = childs;	//使用Childs2
				});
			}
			return json;

			/*
			//get child field name
			switch (itemType) {
				case UiItemTypeEstr.RowBox:
				case UiItemTypeEstr.TabPage:
					let ftCont = (itemType == UiItemTypeEstr.RowBox)
						? me.FtRowCol : me.FtTabPageCont;
					json.Childs2 = [];
					item.find(ftCont).each(function (idx) {
						let childs = [];
						$(this).children(me.FtItem).each(function (idx2) {
							childs[idx2] = _item2Json($(this));
						});
						json.Childs2[idx] = childs;	//使用Childs2
					});
					break;
				case UiItemTypeEstr.Table:
					//Childs2 為2維 !!
					//table 的 xu-item 在 tbody > tr > td 裡
					json.Childs2 = [];
					item.find('tbody td').each(function (idx) {
						let childs = [];
						let item2 = $(this).children(me.FtItem).first();
						//json.Childs.push(item2.length > 0 ? _item2Json(item2) : null);	//使用Childs
						json.Childs2[idx] = (item2.length > 0) ? _item2Json(item2) : null;
					});
					break;
			}
			return json;
			*/
		}

		//children為xu-item
		let jsons: any[] = [];
		this.Area.children(this.FtItem).each(function () {
			jsons.push(_item2Json($(this)));
		});
		return jsons;
	}

	//刪除item, 包含子item
	deleteItem(item: JQuery) {
		item.remove();
	}
	//#endregion

	//#region 讀取 item
	//get item inputType for UiItemTypeEstr.Input
	private _getInputType(item: JQuery) {
		return _Input.getType(item.find(this.FtInput));
	}

	//also called by UiMany
	itemGetId(item: JQuery) {
		//return item.data(this.DataId);
		return _Obj.getData(item, this.DataId);
	}

	//get item type, also called outside
	itemGetType(item: JQuery) {
		return _Obj.isEmpty(item)
			? null : _Obj.getData(item, this.DataItemType);
	}

	itemGetInfo(item: JQuery) {
		return this._getInfo(this.itemGetId(item));
	}

	/**
	 * item get info 
	 * param {object} item
	 * returns {json}
	 */
	private _getInfo(itemId: string) {
		return this.uiMany.getInfo(itemId);
	}
	private _setInfo(itemId: string, info: any) {
		return this.uiMany.setInfo(itemId, info);
	}
	private _setInfoProp(itemId: string, prop: any) {
		return this.uiMany.setInfoProp(itemId, prop);
	}

	/*
	itemSetInfo(item, info) {
		//_Obj.setData(item, this.DataInfo, _Json.toStr(info));
		this._setInfo(this.itemGetId(item), info);
	}
	*/

	//內部element to Item object
	private _elmToItem(elm: HTMLElement) {
		return $(elm).closest(this.FtItem);
	}

	//傳回上一層item, 沒有則傳回null
	private _getBox(item: JQuery) {
		let box = item.parents(this.FtItem).first();
		return _Obj.isEmpty(box) ? null : box;
	}
	//#endregion

	//#region 其他
	setEdit(status: boolean) {
		this.isEdit = status;
	}

	/*
	//??
	async addItem(json, box) {
		//this.nodeCount++;
		//if (json.id == null)
		//	json.id = (this.items.length + 1) * (-1);
		let itemType = json.ItemType;
		let item = (itemType == UiItemTypeEstr.Input) ? new UiInput(this, json) :
			(itemType == UiItemTypeEstr.RowBox) ? new UiBox(this, json) :
			(itemType == UiItemTypeEstr.Group) ? new UiGroup(this, json) :
			(itemType == UiItemTypeEstr.Table) ? new UiTable(this, json) :
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
}
window.UiView = UiView;