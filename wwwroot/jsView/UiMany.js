import UiView from "./UiView";
import {
  MouseEstr,
  UiItemTypeEstr,
  InputTypeEstr,
  _Array,
  _Form,
  _Fun,
  _iSelect,
  _iText,
  _Json,
  _Modal,
  _Obj,
  _Str,
  _Tool
} from "@base";
class UiMany {
  /**
   * @param {string} ftWorkArea
   * @param {EditMany} mItem
   */
  constructor(ftWorkArea, mItem) {
    this.FtMenu = ".xf-menu";
    this.ModalInput = $("#modalUiInput");
    this.ModalGroup = $("#modalUiGroup");
    this.ModalTable = $("#modalUiTable");
    this.ModalTabPage = $("#modalUiTabPage");
    this.ModalChecks = $("#modalUiChecks");
    this.Id2 = "_Id2";
    this.isEdit = false;
    this.modalItem = null;
    this.modalItemId = "";
    this.modalItemType = "";
    this.mItem = mItem;
    this.newInputNo = 0;
    this.eformItems = $("#eformItems");
    this.uiView = new UiView(this, ftWorkArea);
    var me = this;
    $(document).on(MouseEstr.MouseDown, function(e) {
      if (e.which != 3) {
        let filter = me.FtMenu;
        if ($(e.target).parents(filter).length == 0)
          _Obj.hide($(filter));
      }
    });
  }
  /*
  //#region callback 函數 called by uiView
  //item 改變 box 
  fnMoveBox(itemId, newBoxId) {
      let rowBox = this.mItem.idToRowBox(itemId);
      _Form.loadRow(rowBox, { BoxId: newBoxId });
  }
  */
  /**
   * (by AI)
   * 將樹狀結構 jsons 轉換回 扁平 rows 陣列。
   * 規則：
   * 1. 每個元素都有 Id、BoxId、ChildNo、Sort 欄位。
   * 2. jsons 的層級結構為 Childs2 (子代二維陣列)。
   * 3. 轉換後結果以 BoxId, ChildNo, Sort 排序。
   * param {json array} jsons
   * return {json array} flat rows array
   */
  _newJsonsToRows(jsons) {
    if (!jsons || jsons.length === 0) return [];
    var rows = [];
    var idx = 0;
    var me = this;
    function flatten(items, boxId = "0") {
      if (!items) return;
      if (boxId == "0") {
        for (let sort = 0; sort < items.length; sort++) {
          idx--;
          var item = items[sort];
          item.Id = idx;
          item[me.Id2] = idx;
          const row = { ...item };
          row.BoxId = boxId;
          row.ChildNo = 0;
          row.Info = _Json.toStr(item.Info);
          row.Sort = sort;
          delete row.Childs2;
          rows.push(row);
          if (item.Childs2 && item.Childs2.length > 0)
            flatten(item.Childs2, item.Id);
        }
        return;
      }
      for (let childNo = 0; childNo < items.length; childNo++) {
        const groups = items[childNo];
        if (!groups) continue;
        for (let sort = 0; sort < groups.length; sort++) {
          idx--;
          var group = groups[sort];
          if (group == null) continue;
          group.Id = idx;
          group[me.Id2] = idx;
          const row = { ...group };
          row.BoxId = boxId;
          row.ChildNo = childNo;
          row.Info = _Json.toStr(group.Info);
          row.Sort = sort;
          delete row.Childs2;
          rows.push(row);
          if (group.Childs2 && group.Childs2.length > 0)
            flatten(group.Childs2, group.Id);
        }
      }
    }
    flatten(jsons, "0");
    return rows;
  }
  /**
   * (by AI) 
   * 將扁平 rows 陣列 轉換成 樹狀結構 jsons, 例如: 讀取DB並顯示UI到畫面, 規則:
   * 1.rows 元素包含欄位: Id(資料Id)、BoxId(上層Id)、ChildNo(在上層的子代序號)、Sort, 
   * 並且事先以 BoxId, ChildNo, Sort 排序
   * 2.jsons 包含 Childs2(子代2維陣列) 欄位
   * param {json array} rows
   * return {json array} nested json array
   */
  _dbRowsToJsons(rows) {
    if (!rows || rows.length === 0) return [];
    const boxMap = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const boxId = row.BoxId;
      if (!boxMap.has(boxId)) boxMap.set(boxId, []);
      boxMap.get(boxId).push(row);
    }
    function buildTree(boxId) {
      const childs = boxMap.get(boxId);
      if (!childs) return null;
      const items2 = [];
      for (const child of childs) {
        const childNo = parseInt(child.ChildNo);
        if (!items2[childNo])
          items2[childNo] = [];
        items2[childNo].push(child);
      }
      for (const items of items2) {
        if (!items) continue;
        for (const item of items) {
          const subs2 = buildTree(item.Id);
          if (subs2 && subs2.length > 0)
            item.Childs2 = subs2;
        }
      }
      return boxId == "0" ? items2[0] : items2;
    }
    return buildTree("0") || [];
  }
  _hideMenu() {
    _Obj.hide($(this.FtMenu));
  }
  //on show right menu
  showMenu(event, item) {
    this.modalItem = item;
    this.modalItemId = this.uiView.itemGetId(item);
    this.modalItemType = this.uiView.itemGetType(item);
    let canEdit = true;
    let css = "off";
    let menu = $(this.FtMenu);
    _Obj.show(menu);
    if (canEdit) {
      menu.find(".xd-edit").removeClass(css);
      menu.find(".xd-delete").removeClass(css);
    } else {
      menu.find(".xd-edit").addClass(css);
      menu.find(".xd-delete").addClass(css);
    }
    menu.css({
      top: event.pageY,
      left: event.pageX
    }).show();
  }
  //return row
  addItemRow(itemType) {
    switch (itemType) {
      case UiItemTypeEstr.Input:
        return this._addInput();
      case UiItemTypeEstr.Group:
        return this._addGroup();
      case UiItemTypeEstr.Checks:
        return this._addChecks();
      //case UiItemTypeEstr.Span:
      //    return this._addSpan();
      case UiItemTypeEstr.RowBox:
        return this._addRB();
      case UiItemTypeEstr.Table:
        return this._addTable();
      case UiItemTypeEstr.TabPage:
        return this._addTabPage();
    }
  }
  //#endregion
  //#region Read.cshtml -> uiView
  //drag by button
  startDragBtn(status, itemType) {
    this.uiView.startDragBtn(status, itemType);
  }
  //called by view drop event
  async onDragEnd(e) {
    await this.uiView.onDragEnd(e);
  }
  //#endregion
  _idToRB(itemId) {
    return this.mItem.idToRowBox(itemId);
  }
  getInfo(itemId) {
    return this._getInfoByRB(this._idToRB(itemId));
  }
  setInfo(itemId, info) {
    this._setInfoByRB(this._idToRB(itemId), info);
  }
  /*
  //update mItem Info 欄位
  setInfo(itemId, info) {
      let rowBox = this.mItem.idToRowBox(itemId);
      _Form.loadRow(rowBox, { Info: _Json.toStr(info) });
  }
  */
  //set info property
  setInfoProp(itemId, prop) {
    let rb = this.mItem.idToRowBox(itemId);
    let info = _Json.copy(prop, this._getInfoByRB(rb));
    this._setInfoByRB(rb, info);
  }
  _getInfoByRB(rb) {
    return _Str.toJson(_iText.get("Info", rb));
  }
  _setInfoByRB(rb, info) {
    _iText.set("Info", _Json.toStr(info), rb);
  }
  //#region 功能按鈕相關
  //return row
  _mItemAddRow(itemType, info) {
    let itemJson = {
      ItemType: itemType,
      Info: info == null ? "" : _Json.toStr(info)
      //Sort: 儲存前設定,
    };
    let mItem = this.mItem;
    let row = mItem.addRow(itemJson);
    _iText.set(this.Id2, row.Id, mItem.idToRowBox(row.Id));
    return row;
  }
  _addInput() {
    this.newInputNo++;
    let info = {
      //Id: row.Id,
      InputType: InputTypeEstr.Text,
      Fid: "_fid" + this.newInputNo,
      //前面加底線for註記為需要調整
      Title: "\u6B04\u4F4D" + this.newInputNo,
      Required: true,
      Cols: this.uiView.DefaultCols
      //TitleTip: 'label tip 測試',
      //InputNote: 'input note 測試',
    };
    return this._mItemAddRow(UiItemTypeEstr.Input, info);
  }
  _addGroup() {
    let info = {
      Title: "\u5206\u7FA4\u6587\u5B57"
    };
    return this._mItemAddRow(UiItemTypeEstr.Group, info);
  }
  _addChecks() {
    let info = {
      Title: "\u591A\u9078\u6B04\u4F4D",
      Cols: this.uiView.DefaultCols,
      LabelFids: "\u6B04\u4F4D1,Check1,\u6B04\u4F4D2,Check2",
      IsHori: 0
      //1=水平, 0=垂直
    };
    return this._mItemAddRow(UiItemTypeEstr.Checks, info);
  }
  /*
      _addSpan() {
          let info = {
              //Title: '分群文字',
          };
  
          //add to mItem
          return this._mItemAddRow(UiItemTypeEstr.Span, info);
      }
      */
  _addRB() {
    let info = {
      RowType: _iSelect.get("_RowType", window._me.eform0)
    };
    return this._mItemAddRow(UiItemTypeEstr.RowBox, info);
  }
  _addTable() {
    let info = {
      Code: "_table",
      Name: "\u8CC7\u6599\u540D\u7A31",
      Heads: "\u6B04\u4F4D1,\u6B04\u4F4D2,\u6B04\u4F4D3,\u6B04\u4F4D4,\u6B04\u4F4D5"
    };
    return this._mItemAddRow(UiItemTypeEstr.Table, info);
  }
  //todo
  _addTabPage() {
  }
  //#endregion
  //#region menu 事件相關
  _deleteItem() {
    this.mItem.deleteRow(this.modalItemId);
    this.uiView.deleteItem(this.modalItem);
  }
  //check menu item status
  _menuStatus() {
    let me = _Fun.getMeElm();
    return !me.classList.contains("off");
  }
  //context menu event
  onMenuEdit() {
    if (!this._menuStatus())
      return;
    let info = this.getInfo(this.modalItemId);
    let modal;
    switch (this.modalItemType) {
      case UiItemTypeEstr.Input:
        modal = this.ModalInput;
        break;
      case UiItemTypeEstr.Group:
        modal = this.ModalGroup;
        break;
      case UiItemTypeEstr.Checks:
        modal = this.ModalChecks;
        let result = "";
        let fids = info.LabelFids.split(",");
        for (let i = 0; i < fids.length; i += 2) {
          result += `${fids[i]},${fids[i + 1]}
`;
        }
        info.LabelFids = result.trimEnd();
        break;
      case UiItemTypeEstr.Table:
        modal = this.ModalTable;
        break;
      case UiItemTypeEstr.TabPage:
        modal = this.ModalTabPage;
        break;
      default:
        return;
    }
    _Form.loadRow(modal, info);
    _Modal.show(modal);
  }
  async onMenuDelete() {
    if (!this._menuStatus())
      return;
    if (this.uiView.isBox(this.modalItemType)) {
      if (await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u522A\u9664\u9019\u500B\u5BB9\u5668?")) {
        this._deleteItem();
        this._hideMenu();
      }
    } else {
      this._deleteItem();
      this._hideMenu();
    }
  }
  onMenuView() {
  }
  //#endregion
  //#region modal 相關
  //onclick modal ok
  async onModalOk() {
    let modal;
    switch (this.modalItemType) {
      case UiItemTypeEstr.Input:
        modal = this.ModalInput;
        break;
      case UiItemTypeEstr.Group:
        modal = this.ModalGroup;
        break;
      case UiItemTypeEstr.Checks:
        modal = this.ModalChecks;
        break;
      case UiItemTypeEstr.Table:
        modal = this.ModalTable;
        break;
      case UiItemTypeEstr.TabPage:
        modal = this.ModalTabPage;
        break;
    }
    let info = _Form.toRow(modal);
    let result = await this.uiView.infoToItemA(info, this.modalItem);
    if (result.status) {
      this.setInfo(this.modalItemId, info);
      let itemIds = result.itemIds;
      if (_Array.notEmpty(itemIds)) {
        for (let i = 0; i < itemIds.length; i++)
          this.mItem.deleteRow(itemIds[i], this.mItem.idToRowBox(itemIds[i]));
      }
    }
    _Modal.hide(modal);
  }
  //#endregion
  //#region 其他
  //清除UI & flow元件
  reset() {
    this.uiView.reset();
  }
  /*
      deleteAll() {
          //reset ui
          this.uiView.reset();
  
          //reset mItem
          this.mItem.deleteAll();
      }
      */
  //set editable or not
  setEdit(status) {
    this.isEdit = status;
    this.uiView.setEdit(status);
  }
  getJsons() {
    return this.uiView.getJsons();
  }
  //called by mUiItem_loadRows
  async loadRowsA(rows) {
    this.mItem.loadRowsByRsb(rows, true);
    let jsons = this._dbRowsToJsons(rows);
    await this.uiView.loadJsonsA(jsons);
  }
  /**
   * json array to new items
   * called by onImport()
   * param {json array} jsons: 巢狀資料
   */
  async loadJsonsA(jsons) {
    let rows = this._newJsonsToRows(jsons);
    var mItem = this.mItem;
    mItem.deleteAll();
    mItem.loadRowsByRsb(rows, false);
    mItem.setNewIndex(rows.length);
    this.uiView.reset();
    await this.uiView.loadJsonsA(jsons);
  }
  /**
   * (by AI) jsons(tree) to rows(陣列), 同時設定2邊的Id欄位
   * 固定的相關欄位: //Id(資料Id)、BoxId(上層Id)、//ChildNo, Childs2(子代2維陣列)
   * param {json array} jsons nested json array
   * return {json array} json array
   */
  _jsonsToRows(jsons) {
    const rows = [];
    function flatten(jsons2, upId) {
      for (const json of jsons2) {
        const { ChildNo, ...row } = json;
        row.BoxId = upId;
        rows.push(row);
        if (ChildNo && Array.isArray(json[ChildNo]) && json[ChildNo].length > 0) {
          flatten(json[ChildNo], row.Id);
        }
      }
    }
    flatten(jsons, "0");
    return rows;
  }
  /*
      //??
      addItem(json) {
          //add mLine
  
          this.uiView.addItem(json);
      }
      */
  //#endregion
}
export {
  UiMany as default
};
//# sourceMappingURL=UiMany.js.map
