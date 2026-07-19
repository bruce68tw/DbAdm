import UiMany from "./UiMany.js";
import {
  CrudR,
  EditDto,
  EditMany,
  EditOne,
  FunEstr,
  MouseEstr,
  _Ajax,
  _Array,
  _Edit,
  _Form,
  _Fun,
  _Json,
  _Modal,
  _Nav,
  _Obj,
  _Prog,
  _Str,
  _Tab,
  _Tool,
  _Valid,
  _iCheck,
  _iSelect,
  _iText
} from "@baseJs";
_m2 = {
  init: function() {
    _m2.TableId = "TableId";
    _m2.Active = "active";
    _m2.mQitem = new EditMany("Id", "tbodyQitem", "tplQitem", ".xu-tr");
    _m2.mRitem = new EditMany("Id", "tbodyRitem", "tplRitem", ".xu-tr");
    _m2.mEtable = new EditMany("Id", null, "tplTabEtable", ".x-form");
    _m2.mEitem = new EditMany("Id", null, "tplEitem", ".xu-tr");
    _m2.mEtable.setChilds([_m2.mEitem]);
    _m2.mUiItem = new EditMany("Id", "eformUiItem", "tplUiItem", ".xu-tr");
    _m2.divEdit1 = $("#divEdit1");
    _m2.etableChdIdx = 2;
    _m2.eitemChdIdx = 0;
    _m2.mEtable.fnLoadRows = _m2.mEtable_loadRows;
    _m2.mEtable.fnGetUpdJson = _m2.mEtable_getUpdJson;
    _m2.mEtable.fnValid = _m2.mEtable_valid;
    _m2.tplQitem = $("#tplQitem").html();
    _m2.tbodyQitem = $("#tbodyQitem");
    _m2.tplRitem = $("#tplRitem").html();
    _m2.tbodyRitem = $("#tbodyRitem");
    _m2.navEtable = $("#navEtable");
    _m2.tabEtable = $("#tabEtable");
    _m2.tplNavEtable = $("#tplNavEtable").html();
    _m2.tplTabEtable = $("#tplTabEtable").html();
    _m2.tplEitem = $("#tplEitem").html();
    _m2.modalItems = $("#modalItems");
    _m2.divItemsBody = _m2.modalItems.find("tbody");
    _m2.tplModalItem = $("#tplModalItem").html();
    _m2.ritemTableId = "";
    _m2.tables = [];
    _m2.etableLen = 0;
    _m2.etableIdx = 0;
    _m2.nowItemType = "";
    _m2.modalImport = $("#modalUiImport");
    _m2.mUiItem.fnLoadRows = _m2.mUiItem_loadRows;
    _m2.mUiItem.fnGetUpdJson = _m2.mUiItem_getUpdJson;
    _m2.mUiItem.fnValid = _m2.mUiItem_valid;
    _m2.uiMany = new UiMany(".xu-ui-area", _m2.mUiItem);
    _m2.divEdit1.on(MouseEstr.DragStart, ".xu-btn", function(e) {
      let itemType = $(e.target).data("type");
      _m2.uiMany.startDragBtn(true, itemType);
    }).on(MouseEstr.DragEnd, function(e) {
      _m2.uiMany.onDragEnd(e);
    });
  },
  getProjectId: function() {
    return _iSelect.get("ProjectId", _me.eform0);
  },
  //auto called !!
  fnAfterOpenEdit: async function(fun, json) {
    var isEdit1 = _m2.isEdit1();
    _Prog.setBorder(!isEdit1);
    if (isEdit1)
      _m2.fnAfterOpenEdit1(fun, json);
    else
      _m2.fnAfterOpenEdit0(fun, json);
  },
  //set etable TableId(dropdown)
  //edit0_afterLoadJson: function (json) {
  fnAfterOpenEdit0: async function(fun, json) {
    if (fun == FunEstr.Create) return;
    if (!await _m2.onChangeProject()) return;
    var navRows = _Edit.getChildRows(json, _m2.etableChdIdx);
    var navLen = navRows == null ? 0 : navRows.length;
    for (var i = 0; i < navLen; i++) {
      var tabObj = _m2.etGetTab(i);
      _iSelect.setItems(_m2.TableId, _m2.tables, tabObj);
      _iSelect.set(_m2.TableId, navRows[i][_m2.TableId], tabObj);
      _m2.etShowName(i);
    }
  },
  //reset when create
  fnAfterOpenEdit1: function(fun, json) {
    _m2.uiMany.reset();
    var isAdd = fun == FunEstr.Create;
    _m2.uiMany.setEdit(isAdd || fun == FunEstr.Update);
  },
  //拖拉編輯
  isEdit1: function() {
    return _me.crudE.mEditGetEditNo() == 1;
  },
  fnWhenSave: function(fun) {
    return _m2.isEdit1() ? _m2.fnWhenSave1(fun) : _m2.fnWhenSave0(fun);
  },
  //set sort
  fnWhenSave0: function(fun) {
    _m2.tbodyQitem.find(".xu-tr").each(function(i, item) {
      _iText.set("Sort", i, $(item));
    });
    _m2.tbodyRitem.find(".xu-tr").each(function(i, item) {
      _iText.set("Sort", i, $(item));
    });
    var error = "";
    var tableIds = [];
    _m2.etGetForms().each(function(i, item) {
      var form = $(item);
      var tableId = _iText.get(_m2.TableId, form);
      if (_Array.find(tableIds, tableId) >= 0) {
        error = "\u7DAD\u8B77\u7684\u8CC7\u6599\u8868(Etable)\u4E0D\u53EF\u91CD\u8907\u3002";
        return false;
      }
      tableIds[i] = tableId;
      _iText.set("Sort", i, form);
      _m2.getEitemForm(form).find(".xu-tr").each(function(j, item2) {
        _iText.set("Sort", j, $(item2));
      });
    });
    return error;
  },
  //load etable
  mEtable_loadRows: function(rows) {
    _m2.navEtable.empty();
    _m2.tabEtable.empty();
    if (rows == null || rows.length == 0)
      return;
    var eitemRows = _Edit.getChildRows(_m2.mEtable.dataJson, 0);
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      _m2.mEtable.loadRowByBox(_m2.tabEtable, row, i);
      var newNav = $(Mustache.render(_m2.tplNavEtable, { Index: i }));
      _m2.navEtable.append(newNav);
      _m2.etableLen++;
      if (i === 0)
        newNav.find("a")[0].click();
      var forms = _m2.tabEtable.find("#divEtable" + i + " form");
      var form = forms.first();
      _Valid.init(form);
      var form2 = forms.last();
      var rows2 = _Json.filterRows(eitemRows, "EtableId", _iText.get("Id", form));
      _m2.mEitem.loadRowsByRsb(rows2, true, form2.find("tbody"));
      _Valid.init(form2);
    }
  },
  //GetUpdJson
  mEtable_getUpdJson: function(upKey) {
    var rows = [];
    var eitems = [];
    _m2.etGetForms().each(function(i, item) {
      var form = $(item);
      rows[i] = _m2.mEtable.getUpdRow(form);
      _m2.mEtable.rowSetFkey(rows[i], upKey);
      var upKey2 = _iText.get("Id", form);
      var form2 = _m2.getEitemForm(form);
      var rows2 = _m2.mEitem.getUpdRows(upKey2, form2.find("tbody"));
      _Json.appendRows(rows2, eitems);
    });
    return {
      _rows: rows,
      _deletes: _m2.mEtable.getDeletes(),
      _childs: [{ _rows: eitems, _deletes: _m2.mEitem.getDeletes() }]
    };
  },
  /**
   * error時顯示對應的table page
   * return boolean
   */
  mEtable_valid: function() {
    var status = true;
    _m2.etGetForms().each(function(i, item) {
      var form = $(item);
      status = form.valid();
      if (status)
        status = _m2.getEitemForm(form).valid();
      if (!status) {
        var idx = form.data("index");
        _m2.etFocusNav(_m2.etGetNav(idx));
        return false;
      }
    });
    return status;
  },
  /**
   * onclick generate crud
   * (如果在VS下產生DbAdm的CRUD會reload !!)
   */
  onGenCrud: async function(id) {
    if (await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u7522\u751F\u9019\u500B\u529F\u80FD\u7684CRUD\u7A0B\u5F0F?")) {
      await _Ajax.getStrA("GenCrud", { id }, function(error) {
        _Tool.msg(_Str.isEmpty(error) ? "\u57F7\u884C\u6210\u529F" : error);
      });
    }
  },
  //get checked table id array
  getCheckedTables: function() {
    var values = _iCheck.getCheck0Values(_me.crudR.divRead);
    if (values.length === 0)
      _Tool.msg("\u8ACB\u9078\u53D6\u8CC7\u6599\u3002");
    return values;
  },
  resetEdits: function() {
    _m2.navEtable.empty();
    _m2.tabEtable.empty();
    _m2.etableLen = 0;
  },
  //onclick Create(table)
  onCreate: function() {
    _me.crudR.onCreate();
    _m2.resetEdits();
  },
  onQitemAdd: function() {
    var box = $(Mustache.render(_m2.tplQitem, {}));
    _Form.loadRow(box, {});
    _m2.mQitem.setNewIdByBox(box);
    _m2.tbodyQitem.append(box);
  },
  onRitemAdd: function() {
    var box = $(Mustache.render(_m2.tplRitem, {}));
    _Form.loadRow(box, {});
    _m2.mRitem.setNewIdByBox(box);
    _m2.tbodyRitem.append(box);
  },
  //on change project id
  //多個地方呼叫
  ////fnCallback: (optional) callback function
  //return {bool}
  //onChangeProject: async function (fnCallback) {
  onChangeProject: async function() {
    var pid = _m2.getProjectId();
    if (_Str.isEmpty(pid)) return false;
    var rows = await _Ajax.getJsonsA("/XpCode/Tables", { projectId: pid });
    if (_Array.isEmpty(rows)) return false;
    _m2.tables = rows;
    var obj = _Obj.get(_m2.TableId, _m2.modalItems);
    _iSelect.setItemsO(obj, _m2.tables);
    _iSelect.setO(obj, "");
    return true;
  },
  //on open item modal
  //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
  onOpenItem: function(type) {
    _m2.nowItemType = type;
    _Modal.show(_m2.modalItems);
  },
  //on change tableId at ritem modal
  onChangeItemTable: async function() {
    await _m2.changeItemTableA(_iSelect.getO(_Fun.getMe()));
  },
  //called by 2 places
  changeItemTableA: async function(tableId) {
    await _Ajax.getJsonA("GetColumns", { tableId }, function(rows) {
      _m2.divItemsBody.empty();
      for (var i = 0; i < rows.length; i++) {
        _m2.divItemsBody.append($(Mustache.render(_m2.tplModalItem, rows[i])));
      }
    });
  },
  //?? delegate: item modal 過濾查詢結果
  fnItemDtGetRows: function(result) {
    return result.data;
  },
  //onclick ok at Item(R/Q/E) modal
  onItemModalOk: function() {
    var rows = [];
    _m2.divItemsBody.find(":checkbox:checked").each(function(idx) {
      var obj = $(this);
      var tr = obj.closest("tr");
      rows[idx] = {
        //CrudId: crudId, //mapId
        ColumnId: tr.data("id"),
        Fid: tr.data("fid"),
        //for Ritem
        //Code: tr.data('code'),
        Name: tr.data("name"),
        DataType: tr.data("datatype")
        //inputType ??
      };
    });
    var rowLen = rows.length;
    if (rowLen === 0) {
      _Tool.msg("\u8ACB\u5148\u9078\u53D6\u8CC7\u6599\u3002");
      return;
    }
    var type = _m2.nowItemType;
    var body, tplItem;
    var mItem = null;
    if (type === "Q") {
      body = _m2.tbodyQitem;
      tplItem = _m2.tplQitem;
      mItem = _m2.mQitem;
    } else if (type === "R") {
      body = _m2.tbodyRitem;
      tplItem = _m2.tplRitem;
      mItem = _m2.mRitem;
    } else {
      body = _m2.etGetTab().find("tbody");
      tplItem = _m2.tplEitem;
      mItem = _m2.mEitem;
    }
    for (var i = 0; i < rowLen; i++) {
      var box = $(Mustache.render(tplItem, rows[i]));
      _Form.loadRow(box, rows[i]);
      mItem.setNewIdByBox(box);
      body.append(box);
    }
    _Modal.hide(_m2.modalItems);
  },
  //onclick add on (edit)nav
  //must set id=new index
  onEtAdd: function() {
    _m2.etNavRemoveAct();
    var index = _m2.etableLen;
    var json = { Index: index };
    var newTab = $(Mustache.render(_m2.tplTabEtable, json));
    _m2.mEtable.setNewIdByBox(newTab);
    _iSelect.setItems(_m2.TableId, _m2.tables, newTab);
    _m2.tabEtable.append(newTab);
    var newNav = $(Mustache.render(_m2.tplNavEtable, json));
    _m2.navEtable.append(newNav);
    _m2.etableLen++;
    _m2.etFocusNav(newNav);
    _m2.etShowName(index);
  },
  onEtDelete: function() {
    if (_m2.etableLen == 0)
      return;
    _Tool.ans("\u662F\u5426\u79FB\u9664\u756B\u9762\u8CC7\u6599?", function() {
      var nav = _m2.etGetNav();
      var tab = _m2.etGetTab();
      var nav2;
      var index = _m2.etableIdx == _m2.etableLen - 1 ? _m2.etableIdx - 1 : _m2.etableIdx;
      if (index >= 0) {
        nav2 = index === _m2.etableIdx ? nav.next() : nav.prev();
      }
      var form = _m2.etGetForm(tab);
      var key = _m2.mEtable.getKey(form);
      _m2.mEtable.deleteRow(key);
      var form2 = _m2.getEitemForm(form);
      form2.find(".xu-tr").each(function() {
        key = _m2.mEitem.getKey($(this));
        _m2.mEitem.deleteRow(key);
      });
      _m2.etNavRemoveAct();
      tab.remove();
      nav.remove();
      _m2.etableLen--;
      _m2.etableIdx = index;
      if (index >= 0)
        _m2.etFocusNav(nav2);
    });
  },
  onEtLeft: function() {
    _Nav.moveLeft(_m2.etGetNav());
    _Tab.moveLeft(_m2.etGetTab());
  },
  onEtRight: function() {
    _Nav.moveRight(_m2.etGetNav());
    _Tab.moveRight(_m2.etGetTab());
  },
  etFocusNav: function(navObj) {
    navObj.find("a").click();
  },
  /*
  etGetObject: function (index) {
      return _m2.tabEtable.find('#divEtable' + index);
  },
  */
  //set(show) tableName at edit edit page
  //param {bool} reset: reset table list or not 
  etShowName: function(index) {
    var name = _iSelect.getText(_m2.TableId, _m2.etGetTab(index));
    if (name === "")
      name = "(Empty)";
    _m2.navEtable.find("li[data-index=" + index + "] a").text(name);
  },
  onChangeNowTable: function(index) {
    _m2.etShowName(index);
  },
  //set child not active
  etNavRemoveAct: function() {
    var nav = _m2.etGetNav();
    nav.removeClass(_m2.Active);
    _m2.tabEtable.find(".tab-pane." + _m2.Active).removeClass(_m2.Active);
  },
  //onclick etable nav
  onEtNav: function(index) {
    _m2.etableIdx = index;
  },
  //get edit edit active nav
  //return nav object
  etGetNav: function(index) {
    index = index || _m2.etableIdx;
    var find = "[data-index=" + index + "]";
    return _m2.navEtable.find("li" + find);
  },
  //get edit edit active tab
  //return tab object
  etGetTab: function(index) {
    index = index || _m2.etableIdx;
    return _m2.tabEtable.find("#divEtable" + index);
  },
  etGetForms: function() {
    return _m2.tabEtable.find(".x-form");
  },
  etGetForm: function(tabObj) {
    return tabObj.find(".x-form");
  },
  /*
   * get eitem form by etable form
   */
  getEitemForm: function(etableForm) {
    return etableForm.parent().find(".xu-form2");
  },
  //#endregion
  //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
  onOpenEdit1: async function(id) {
    _me.crudE.mEditSetEditNo(1);
    await _me.crudE.onUpdateA(id);
  },
  //下載 table sql
  onDownTableSql: async function(id) {
    if (await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u4E0B\u8F09\u9019\u500B\u529F\u80FD\u7684 Table SQL ?")) {
      await _Ajax.getStrA("DownTableSql", { id }, function(result) {
        _Str.saveFile(result, "table.txt");
      });
    }
  },
  //#region read form function
  //onclick generate crud(產生在主機)
  /*
  onGenCrud: function (id) {
      await _Ajax.getStrA('GenCrud', { id: id }, function (error) {
          _Tool.msg(_Str.isEmpty(error) ? '執行成功' : error);
      });
  },
  */
  //onclick download crud
  onDownCrud: function() {
  },
  //#endregion
  //#region edit form function
  //on click open import modal
  onOpenImport: function() {
    _iText.set("Import", "", _m2.modalImport);
    _Modal.show(_m2.modalImport);
  },
  //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
  //called by modalImprot
  onImport: async function() {
    var value = _iText.get("Import", _m2.modalImport).trim();
    if (_Str.isEmpty(value)) {
      _Tool.msg("\u532F\u5165\u8CC7\u6599\u4E0D\u53EF\u7A7A\u767D\u3002");
      return;
    }
    var jsons = _Str.toJson(value);
    if (jsons == null) {
      _Tool.msg("\u532F\u5165\u8CC7\u6599\u5FC5\u9808\u662FJson\u683C\u5F0F\u3002");
      return;
    }
    await _m2.uiMany.loadJsonsA(jsons);
    _Modal.hide(_m2.modalImport);
  },
  //export 前端 edit form to json
  onExport: async function() {
    let jsons = _m2.uiMany.getJsons();
    if (_Json.isEmpty(jsons)) {
      _Tool.msg("\u76EE\u524D\u756B\u9762\u7121\u4EFB\u4F55\u8CC7\u6599\u3002");
      return;
    }
    const blob = new Blob([JSON.stringify(jsons, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  },
  //#endregion
  /*
  //generate json
  onGenJson: function () {
      var values = _icheck.getCheck0Values(_m2.crudR.divRead);
      if (values.length > 0)
          window.location = 'GenJson?key=' + values.join(',');
      else
          _Tool.msg('請先選取資料。');
  },
  */
  //#region auto called function
  fnAfterSwap: function(toRead) {
    var tbar = $(".xd-prog-tbar");
    if (toRead) {
      _Obj.hide(tbar);
    } else {
      _Obj.show(tbar);
    }
  },
  /**
   * ?? auto called
   * jsPlumb line container must visible when rendering
   * see _m2.crudE.js _updateOrViewA()
   * param {string} fun
   * param {string} key
   * returns {bool}
   */
  zz_fnUpdateOrViewA: async function(fun, key) {
    var act = fun == FunEstr.Update ? "GetUpdJson" : "GetViewJson";
    return await _Ajax.getJsonA(act, { key }, function(json) {
      _me.crudR.toEditMode(fun, () => {
        _me.crudE.loadJson(json);
        _me.crudE.setEditStatus(fun);
        _me.crudE.afterOpen(fun, json);
      });
    });
  },
  /**
   * auto called
   * 重設 uiItem的 BoxId、ChildNo、Sort
   * return {string} error msg if any
   */
  fnWhenSave1: function(fun) {
    let uiView = _m2.uiMany.uiView;
    let boxJsons = uiView.getChgBoxJsons();
    let boxLen = boxJsons.length;
    if (boxLen == 0) return "";
    let mUiItem = _m2.mUiItem;
    for (let i = 0; i < boxLen; i++) {
      let boxJson = boxJsons[i];
      let boxId = boxJson.BoxId;
      for (let j = 0; j < boxJson.ChildNos.length; j++) {
        let childNo = boxJson.ChildNos[j];
        let itemIds = uiView.boxGetChildIds(boxId, childNo);
        for (let k = 0; k < (itemIds || []).length; k++) {
          let rb = mUiItem.idToRowBox(itemIds[k]);
          _iText.set("BoxId", boxId, rb);
          _iText.set("ChildNo", childNo, rb);
          _iText.set("Sort", k + 1, rb);
        }
      }
    }
    return "";
  },
  //#endregion 
  //#region mUiItem custom function
  //load items
  mUiItem_loadRows: async function(rows) {
    await _m2.uiMany.loadRowsA(rows);
  },
  //getUpdJson
  mUiItem_getUpdJson: function(upKey) {
    return _m2.mUiItem.getUpdJsonByRsb(upKey);
  },
  //return boolean
  mUiItem_valid: function() {
    return true;
  }
  /*
  //return boolean
  mLine_valid: function () {
      return true;
  },
  */
  //#endregion
  //#endregion
};
_me = {
  //#region for Crud
  init: function() {
    var config = {
      columns: [
        //{ data: '_F1' },
        { data: "ProjectCode" },
        { data: "ProjectName" },
        { data: "ProgCode" },
        { data: "ProgName" },
        { data: "IsUi" },
        { data: "_Fun" },
        { data: "Created" },
        { data: "_CrudFun" },
        { data: "Status" }
      ],
      columnDefs: [
        /*
        { targets: [0], render: function (data, type, full, meta) {
                        return _me.crudR.dtCheck0(full.Id);
        }},
                    */
        { targets: [4], render: function(data, type, full, meta) {
          return data == 1 ? `<button type="button" class="btn btn-link" data-onclick="_me.onOpenEdit1" data-args="${full.Id}">\u62D6\u62C9\u7DE8\u8F2F</button> | <button type="button" class="btn btn-link" data-onclick="_me.onDownTableSql" data-args="${full.Id}">\u4E0B\u8F09Table SQL</button>` : "";
        } },
        { targets: [5], render: function(data, type, full, meta) {
          var dis = full.Status == 1 ? "" : "disabled";
          return `<button type="button" ${dis} class="btn btn-outline-secondary btn-sm" data-onclick="_me.onGenCrud" data-args="${full.Id}">\u7522\u751FCRUD</button>`;
        } },
        { targets: [7], render: function(data, type, full, meta) {
          return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, false, true);
        } },
        { targets: [8], render: function(data, type, full, meta) {
          return _me.crudR.dtStatusName(data);
        } }
      ]
    };
    _m2.init();
    var ary0 = new EditDto([null, _m2.mQitem, _m2.mRitem, _m2.mEtable], $("#divEdit"));
    var ary1 = new EditDto([new EditOne(null, "eform1"), _m2.mUiItem], _m2.divEdit1, "\u62D6\u62C9\u7DE8\u8F2F");
    new CrudR(config, [ary0, ary1]);
  }
};
//# sourceMappingURL=GenCrud.js.map
