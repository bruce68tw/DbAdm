import {
  InputTypeEstr,
  MouseEstr,
  UiItemTypeEstr,
  _Ajax,
  _Array,
  _Input,
  _Json,
  _Obj,
  _Str,
  _Tool,
  _Var,
  DragItemDto
} from "@baseJs";
class UiView {
  //建構子不能執行非同步
  constructor(uiMany, ftWorkArea) {
    this.uiMany = uiMany;
    this.Area = $(ftWorkArea);
    this.BoxId0 = "0";
    this.ClsItem = "xu-item";
    this.ClsChild = "xu-child";
    this.ClsRowCol = "xu-row-col";
    this.ClsDragging = "xu-dragging";
    this.DataId = "id";
    this.DataItemType = "itemtype";
    this.DefaultCols = "2,3";
    this.DropLine = $(".xu-drop-line");
    this.FtItem = "." + this.ClsItem;
    this.FtLabel = ".x-label";
    this.FtInput = ".x-input";
    this.FtReq = ".x-required";
    this.FtTipIcon = ".ico-info";
    this.FtInputNote = ".x-input-note";
    this.FtChild = "." + this.ClsChild;
    this.FtGroupTitle = ".x-group-title";
    this.FtTable = ".x-table";
    this.FtTableTitle = ".x-span-label";
    this.NameInput = "[\u8F38\u5165\u6B04\u4F4D]";
    this.NameGroup = "[\u5206\u7FA4\u6587\u5B57]";
    this.NameChecks = "[\u591A\u9078\u6B04\u4F4D]";
    this.NameRB = "[\u591A\u6B04\u5BB9\u5668]";
    this.NameTable = "[\u591A\u7B46\u8868\u683C]";
    this.NameTabPage = "[\u591A\u9801\u5BB9\u5668]";
    this.isEdit = true;
    this.newItemId = 0;
    this.chgBoxJsons = [];
    this.inputMap = {};
    this.groupHtml = "";
    this.dragItem = new DragItemDto();
    this.dropItem = new DragItemDto();
    this.dragIsNew = false;
    this.dragging = false;
    this.dropElm = null;
    this.dropArea = null;
    this.dropError = "";
    let me = this;
    this.Area.on(MouseEstr.RightMenu, this.FtItem, function(e) {
      e.preventDefault();
      let item = me._elmToItem(e.target);
      me.uiMany.showMenu(e, item);
    });
    this.Area.on(MouseEstr.DragStart, function(e) {
      if (me.isEdit)
        me._onDragStart(e);
    }).on(MouseEstr.DragOver, function(e) {
      if (me.dragging)
        me._onDragOver(e);
    }).on(MouseEstr.DragEnd, function(e) {
      me.onDragEnd(e);
    });
  }
  //#region drag/drop 事件相關
  _onDragStart(e) {
    this._setDragging(true);
    let drag = this.dragItem;
    drag.item = $(e.target);
    drag.itemType = this.itemGetType(drag.item);
    let box = this._getBox(drag.item);
    drag.boxType = this.itemGetType(box);
    drag.boxId = box == null ? this.BoxId0 : this.itemGetId(box);
  }
  _onDragOver(e) {
    e.preventDefault();
    let dropElm = e.target;
    if (this.dropElm == dropElm) return;
    let dropObj = $(dropElm);
    let dropItem = dropObj.closest(this.FtItem);
    let hasDropItem = _Obj.notEmpty(dropItem);
    this.dropElm = dropElm;
    let drag = this.dragItem;
    let drop = this.dropItem;
    drop.item = dropItem;
    drop.itemType = this.itemGetType(dropItem);
    let dropInBox = false;
    let boxAppendItem = false;
    if (hasDropItem) {
      if (this.isBox(drop.itemType) && dropObj.hasClass(this.ClsChild)) {
        boxAppendItem = true;
        drop.boxType = drop.itemType;
        drop.boxId = this.itemGetId(dropItem);
        dropInBox = true;
      } else {
        var box = this._getBox(dropItem);
        drop.boxType = this.itemGetType(box);
        drop.boxId = box == null ? this.BoxId0 : this.itemGetId(box);
        dropInBox = this.isBox(drop.boxType);
      }
      console.log(`dragType=${drag.itemType}, dropType=${drop.itemType}, drop.boxType=${drop.boxType}, 
				up css=${dropObj.attr("class")}, up item boxId=${dropObj.find(this.FtItem).length}, 
				dropInBox=${dropInBox}`);
    } else {
      dropObj = this.Area;
      boxAppendItem = true;
    }
    //!dropInBox 則都可以 drop
    let error = "";
    let dragName = "";
    if (hasDropItem && drop.boxType != null) {
      switch (drag.itemType) {
        case UiItemTypeEstr.Input:
          if (drop.boxType == UiItemTypeEstr.Table) {
            if (dropObj.find(this.FtItem).length > 0)
              error = `${this.NameTable}\u53EA\u80FD\u653E\u4E00\u500B${this.NameInput}\u3002`;
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
              error = `${dragName}\u4E0D\u80FD\u653E\u5728${this.NameTable}\u88E1\u9762\u3002`;
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
              error = `${dragName}\u4E0D\u80FD\u653E\u5728${this.NameTable}\u88E1\u9762\u3002`;
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
              error = `${dragName}\u4E0D\u80FD\u653E\u5728${this.NameRB}\u88E1\u9762\u3002`;
              break;
            case UiItemTypeEstr.Table:
              error = `${dragName}\u4E0D\u80FD\u653E\u5728${this.NameTable}\u88E1\u9762\u3002`;
              break;
          }
          break;
        case UiItemTypeEstr.Table:
        case UiItemTypeEstr.TabPage:
          dragName = drag.itemType == UiItemTypeEstr.Table ? this.NameTable : this.NameTabPage;
          let dropIsBox = this.isBox(drop.itemType);
          if (dropIsBox) {
            error = `${dragName}\u4E0D\u80FD\u653E\u5728${this._typeToName(drop.itemType)}\u88E1\u9762\u3002`;
          } else {
            error = `${dragName}\u4E0D\u80FD\u653E\u5728${this._typeToName(drop.boxType)}\u88E1\u9762\u3002`;
          }
          break;
      }
    }
    this.dropError = error;
    let dropLine = this._getDropLine();
    _Obj.show(dropLine);
    if (boxAppendItem) {
      dropObj.append(dropLine);
    } else {
      let dropRect = drop.item[0].getBoundingClientRect();
      let mouseY = e.clientY;
      let isUpPos = mouseY < dropRect.top + dropRect.height / 2;
      if (isUpPos) {
        dropLine.insertBefore(drop.item);
      } else {
        dropLine.insertAfter(drop.item);
      }
    }
  }
  //會改變Item的BoxId、ChildNo
  //also called by uiMany drag/drop button
  async onDragEnd(e) {
    if (!this.dragging) return;
    const rect = this.Area[0].getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const inArea = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    if (this.dropError != "") {
      _Tool.msg(this.dropError);
    } else if (inArea) {
      let drag = this.dragItem;
      let drop = this.dropItem;
      let dragType = this.dragItem.itemType;
      let dropLine = this._getDropLine();
      let boxId = _Var.isEmpty(drop.boxId) ? this.BoxId0 : drop.boxId;
      let childNo = $(this.dropElm).closest(this.FtChild).index();
      this._setChgBoxJsons(boxId, childNo);
      let info, itemId;
      if (this.dragIsNew) {
        let row = this.uiMany.addItemRow(dragType);
        itemId = row.Id;
        info = _Str.toJson(row.Info);
        let item = await this._newItemA(dragType, itemId, info);
        drag.item = item;
      } else {
        itemId = this.itemGetId(drag.item);
        info = this.itemGetInfo(drag.item);
      }
      if (dragType == UiItemTypeEstr.Input || dragType == UiItemTypeEstr.Checks) {
        let checkType = UiItemTypeEstr.RowBox;
        if (this._isBoxTypeXor(checkType)) {
          let inTable = drop.boxType == checkType;
          let gridNum = inTable ? this._getUpGridNum(dropLine) : 0;
          let prop = { Cols: this._resizeItemByRB(drag.item, inTable, gridNum) };
          this._setInfoProp(itemId, prop);
        }
        checkType = UiItemTypeEstr.Table;
        if (this._isBoxTypeXor(checkType))
          this._setInputForTable(drag.item, drop.boxType == checkType);
      }
      drag.item.insertAfter(dropLine);
    }
    this._setDragging(false);
  }
  //只找第一層item
  boxGetChildIds(boxId, childNo) {
    let box = boxId == this.BoxId0 ? this.Area : this._findItem(boxId).find(this.FtChild).eq(childNo);
    if (_Obj.isEmpty(box)) return null;
    let me = this;
    return box.children(this.FtItem).map(function() {
      return _Obj.getData($(this), me.DataId);
    }).get();
  }
  _findItem(itemId) {
    return $(`[data-${this.DataId}="${itemId}"]`);
  }
  getChgBoxJsons() {
    return this.chgBoxJsons;
  }
  //add chgBoxJsons
  _setChgBoxJsons(boxId, childNo) {
    if (childNo < 0) childNo = 0;
    let row = this.chgBoxJsons.find((a) => a.BoxId === boxId);
    if (!row) {
      this.chgBoxJsons.push({ BoxId: boxId, ChildNos: [childNo] });
    } else {
      if (!row.ChildNos.includes(childNo))
        row.ChildNos.push(childNo);
    }
  }
  _getDropLine() {
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
  startDragBtn(status, itemType) {
    this._setDragging(status);
    this.dragIsNew = status;
    this.dragItem.itemType = itemType;
  }
  _setDragging(status) {
    if (status) {
      this.dragging = true;
      this.dragItem = new DragItemDto();
      this.dropItem = new DragItemDto();
      this.dropElm = null;
      this.Area.addClass(this.ClsDragging);
    } else {
      this.dragging = false;
      this.dragIsNew = false;
      this.Area.removeClass(this.ClsDragging);
      _Obj.hide(this._getDropLine());
    }
  }
  //#endregion
  //#region 判斷 & 轉換
  //item type to item show name
  _typeToName(itemType) {
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
  _isBoxTypeXor(checkType) {
    let dragBoxYes = this.dragItem.boxType === checkType;
    let dropBoxYes = this.dropItem.boxType === checkType;
    return dragBoxYes !== dropBoxYes;
  }
  //called by: this, uiMany
  isBox(type) {
    return (
      /*type == UiItemTypeEstr.Span ||*/
      type == UiItemTypeEstr.RowBox || type == UiItemTypeEstr.Table || type == UiItemTypeEstr.TabPage
    );
  }
  //#endregion
  //#region 新增 item
  //產生新item
  //called: onDragEnd、loadJsonsA 
  //param {json} info: item info 資訊
  async _newItemA(itemType, itemId, info) {
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
  async _newInputA(id, info) {
    const Fid = "_fid_";
    const Title = "_title_";
    const TitleTip = "_titleTip_";
    const InputNote = "_inputNote_";
    let map = this.inputMap;
    let inputType = info.InputType;
    if (map[inputType] == null) {
      let data = {
        inputType,
        title: Title,
        titleTip: TitleTip,
        fid: Fid,
        //前端重設以下欄位
        required: true,
        //後端先傳回req mark, 前端若無則hide
        cols: this.DefaultCols,
        inputNote: InputNote
      };
      let tpl = await _Ajax.getStrA("GetInputHtml", data);
      map[inputType] = tpl;
    }
    let html = map[inputType];
    html = _Str.replaceAll(html, Fid, info.Fid).replace(Title, info.Title).replace(TitleTip, info.TitleTip || "").replace(InputNote, info.InputNote || "");
    let item = $(html);
    this._itemAddProp(id, item, UiItemTypeEstr.Input);
    await this._infoToInputA(info, item);
    return item;
  }
  async _newGroupA(id, info) {
    const Title = "_title_";
    if (_Str.isEmpty(this.groupHtml))
      this.groupHtml = await _Ajax.getStrA("GetGroupHtml", { title: Title });
    let html = this.groupHtml;
    html = html.replace(Title, info.Title);
    let item = $(html);
    this._itemAddProp(id, item, UiItemTypeEstr.Group);
    return item;
  }
  _newChecks(id, info) {
    let html = `<div class='row py-2'>${this._htmlChecks(id, info)}</div>`;
    let item = $(html);
    this._itemAddProp(id, item, UiItemTypeEstr.Checks);
    return item;
  }
  //get checks 內部 html only
  //called by _newChecks, onModalOk
  _htmlChecks(id, info) {
    let fids = info.LabelFids.split(",");
    let html = "";
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
    let cols = info.Cols.split(",");
    let cls = _Var.toBool(info.IsHori) ? "x-hbox" : "x-vbox";
    html = `
<div class='col-md-${cols[0]} x-label'>${info.Title}</div>
<div class='col-md-${cols[1]} x-input ${cls}'>
	${html}
</div>
`;
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
  _newRB(id, info) {
    let cols = info.RowType.split(",");
    let html = "";
    for (let i = 0; i < cols.length; i++) {
      html += `<div class='col-md-${cols[i]} ${this.ClsRowCol} ${this.ClsChild}'></div>`;
    }
    html = `<div class='row py-2'>${html}</div>`;
    let item = $(html);
    this._itemAddProp(id, item, UiItemTypeEstr.RowBox);
    return item;
  }
  async _newTableA(id, info) {
    let html = `
<div class='py-2'>
	<div class='x-btns-box'>
		<span class='x-span-label'>\u591A\u7B46\u8868\u683C</span>
		<button type='button' data-onclick='_me.mRoleProg.onAddRow' class='btn btn-success'>\u65B0\u589E\u4E00\u5217
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
    let item = $(html);
    await this._infoToTableA(info, item);
    this._itemAddProp(id, item, UiItemTypeEstr.Table);
    return item;
  }
  //todo
  _newTabPage(id, info) {
    return null;
  }
  //item 加入共用屬性, 不儲存 info
  _itemAddProp(id, item, itemType) {
    item.addClass(this.ClsItem);
    item.attr("draggable", "true");
    _Obj.setData(item, this.DataId, id);
    _Obj.setData(item, this.DataItemType, itemType);
  }
  //#endregion
  _noteSetStatus(note) {
    _Obj.showByStatus(note, note.text().trim() != "");
  }
  //#region 更新 item 外觀
  //移除/增加 label & inputNote, 直接搬到table, 因為內容有變
  //called by mouseUp
  //param {bool} inBox: drop位置是否在Table裡面
  _setInputForTable(item, inBox) {
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
  _resizeItemByRB(item, inBox, contGridNum) {
    let label = item.find(this.FtLabel);
    let input = item.find(this.FtInput);
    let note = item.find(this.FtInputNote);
    let cols = !inBox ? this.DefaultCols : contGridNum == 6 ? "4,6" : note.text().trim() != "" ? "3,6" : "6,6";
    let values = cols.split(",");
    this._objSetGrid(label, values[0]);
    this._objSetGrid(input, values[1]);
    return cols;
  }
  //啟動/停用 css RWD
  //param {bool} status
  _objShowGrid(obj, status) {
    const tail = "h";
    let css = this._getGridCss(obj);
    if (!css) return;
    let findTail = css.endsWith(tail);
    if (status && findTail) {
      _Obj.renameCss(obj, css, css.slice(0, -1));
    } else if (!status && !findTail) {
      _Obj.renameCss(obj, css, css + tail);
    }
  }
  //設定css grid
  //param {int} colNum 新的 col-md- 數字
  _objSetGrid(obj, colNum) {
    let css = this._getGridCss(obj);
    if (css) {
      _Obj.renameCss(obj, css, "col-md-" + colNum);
    }
  }
  /**
   * called by UiMany onModalOk(修改item內容)
   * 更新畫面上的Item(含外觀、不含Info欄位)
   * param {json} info
   * param {object} item
   * return {status:bool, itemIds:string[]}如果box有刪減欄位, 則傳回要刪除的itemId 字串陣列
   */
  async infoToItemA(info, item) {
    let id = info.Id;
    let defResult = { status: true, itemIds: null };
    switch (this.itemGetType(item)) {
      case UiItemTypeEstr.Input:
        let oldType = this._getInputType(item);
        await this._infoToInputA(info, item);
        if (oldType != info.InputType) {
          let newItem = await this._newInputA(info.Id, info);
          let inputHtml = newItem.find(this.FtInput).html();
          item.find(this.FtInput).html(inputHtml);
        }
        break;
      case UiItemTypeEstr.Group:
        item.find(this.FtGroupTitle).text(info.Title || "");
        break;
      case UiItemTypeEstr.Checks:
        info.LabelFids = _Str.replaceAll(info.LabelFids, "\n", ",");
        item.html(this._htmlChecks(id, info));
        break;
      /*
      case UiItemTypeEstr.Span:
      	//do nothing
      	break;
      */
      case UiItemTypeEstr.RowBox:
        break;
      case UiItemTypeEstr.Table:
        return await this._infoToTableA(info, item);
      //break;
      case UiItemTypeEstr.TabPage:
        break;
    }
    return defResult;
  }
  /**
   * info json write to input item UI
   * called: _newInputA, InfoToItemA
   * param {json} info 
   * param {jquery object} item 
   */
  async _infoToInputA(info, item) {
    let label = item.find(this.FtLabel);
    let input = item.find(this.FtInput);
    let cols = (info.Cols || this.DefaultCols).split(",");
    this._objSetGrid(label, cols[0]);
    this._objSetGrid(input, cols[1]);
    label.html(`<span class="x-required">*</span>${info.Title}`);
    let inputType = info.InputType;
    if (inputType != InputTypeEstr.Check && inputType != InputTypeEstr.Radio && inputType != InputTypeEstr.File) {
      input.find("input").attr("placeholder", info.Fid);
    }
    _Obj.showByStatus(item.find(this.FtReq), info.Required);
    _Obj.showByStatus(item.find(this.FtTipIcon), _Str.notEmpty(info.TitleTip));
    this._noteSetStatus(item.find(this.FtInputNote));
    if (inputType == InputTypeEstr.Radio && _Str.notEmpty(info.ExtInfo)) {
      let html = "";
      let fid = info.Fid;
      let values = info.ExtInfo.split(",");
      for (let i = 0; i < values.length; i++) {
        html += `
<label class='xi-check'>
	<input type='radio' data-fid='${fid}' name='${fid}' data-edit data-value='${i + 1}' data-type='radio'>${values[i]}
	<span class='xi-rspan'></span>
</label>
`;
      }
      item.find(".xi-box").html(html);
    }
  }
  //讀取上層 col-md- 後面的"文數字"
  _getUpGridNum(obj) {
    let col = obj.closest("[class*='col-md-']");
    let css = this._getGridCss(col);
    return css ? parseInt(css.split("-")[2], 10) : 0;
  }
  //get col css class
  _getGridCss(obj) {
    let className = obj.attr("class");
    if (!className) return "";
    return className.split(/\s+/).find((a) => a.startsWith("col-md-")) || "";
  }
  /**
   * info to table item ui
   * called by: 1.新增, 2.改變欄位數
   * //param {function} fnCallback 可為空
   * return {string[]} 要刪除的 itemId 字串陣列
   */
  async _infoToTableA(info, item) {
    let oldLen = item.find("th").length;
    let heads = info.Heads.split(",");
    if (oldLen > heads.length && !await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u6E1B\u5C11\u6B04\u4F4D\u6578\u76EE\uFF0C\u5C3E\u7AEF\u6B04\u4F4D\u5C07\u6703\u88AB\u79FB\u9664?"))
      return { status: false };
    let newLen = heads.length;
    let headBox = item.find("thead tr");
    let bodyBox = item.find("tbody tr");
    let addLen = newLen - oldLen;
    let ids = [];
    if (addLen > 0) {
      for (let i = oldLen; i < newLen; i++) {
        headBox.append("<th></th>");
        bodyBox.append(`<td class="${this.ClsChild}"></td>`);
      }
    } else if (addLen < 0) {
      let tdList = bodyBox.find("td").slice(addLen);
      ids = tdList.find("[data-id]").map(function() {
        return $(this).data("id");
      }).get();
      headBox.find("th").slice(addLen).remove();
      tdList.remove();
    }
    item.find(this.FtTableTitle).text(info.Name || "");
    headBox.find("th").each(function(i) {
      $(this).text(heads[i] || "");
    });
    return { status: true, itemIds: ids };
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
  async loadJsonsA(jsons, cont) {
    if (_Array.isEmpty(jsons)) return;
    let targetCont = cont || this.Area;
    let me = this;
    for (let i = 0; i < jsons.length; i++) {
      let json = jsons[i];
      if (_Json.isEmpty(json)) continue;
      if (_Var.isStr(json.Info))
        json.Info = _Str.toJson(json.Info);
      let item = await this._newItemA(json.ItemType, json.Id, json.Info);
      if (json.ItemType == UiItemTypeEstr.Input && this.itemGetType(targetCont.closest(this.FtItem)) == UiItemTypeEstr.Table)
        this._setInputForTable(item, true);
      targetCont.append(item);
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
    function _item2Json(item) {
      let itemType = me.itemGetType(item);
      let json = {
        ItemType: itemType,
        Info: me.itemGetInfo(item)
        //data-info取出來為json型態!!
      };
      if (me.isBox(itemType)) {
        json.Childs2 = [];
        item.find(me.FtChild).each(function(idx) {
          let childs = [];
          $(this).children(me.FtItem).each(function(idx2) {
            childs[idx2] = _item2Json($(this));
          });
          json.Childs2[idx] = childs;
        });
      }
      return json;
    }
    let jsons = [];
    this.Area.children(this.FtItem).each(function() {
      jsons.push(_item2Json($(this)));
    });
    return jsons;
  }
  //刪除item, 包含子item
  deleteItem(item) {
    item.remove();
  }
  //#endregion
  //#region 讀取 item
  //get item inputType for UiItemTypeEstr.Input
  _getInputType(item) {
    return _Input.getType(item.find(this.FtInput));
  }
  //also called by UiMany
  itemGetId(item) {
    return _Obj.getData(item, this.DataId);
  }
  //get item type, also called outside
  itemGetType(item) {
    return _Obj.isEmpty(item) ? null : _Obj.getData(item, this.DataItemType);
  }
  itemGetInfo(item) {
    return this._getInfo(this.itemGetId(item));
  }
  /**
   * item get info 
   * param {object} item
   * returns {json}
   */
  _getInfo(itemId) {
    return this.uiMany.getInfo(itemId);
  }
  _setInfo(itemId, info) {
    return this.uiMany.setInfo(itemId, info);
  }
  _setInfoProp(itemId, prop) {
    return this.uiMany.setInfoProp(itemId, prop);
  }
  /*
  itemSetInfo(item, info) {
  	//_Obj.setData(item, this.DataInfo, _Json.toStr(info));
  	this._setInfo(this.itemGetId(item), info);
  }
  */
  //內部element to Item object
  _elmToItem(elm) {
    return $(elm).closest(this.FtItem);
  }
  //傳回上一層item, 沒有則傳回null
  _getBox(item) {
    let box = item.parents(this.FtItem).first();
    return _Obj.isEmpty(box) ? null : box;
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
export {
  UiView as default
};
//# sourceMappingURL=UiView.js.map
