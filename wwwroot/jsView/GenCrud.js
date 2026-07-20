class GenCrudVo {
  constructor() {
    this.TableId = "TableId";
    //column name of TableId for many forms
    this.Active = "active";
    //active class
    //maintain tables:
    //this.edit0: new EditOne(),
    this.mQitem = new EditMany("Id", "tbodyQitem", "tplQitem", ".xu-tr");
    this.mRitem = new EditMany("Id", "tbodyRitem", "tplRitem", ".xu-tr");
    this.mEtable = new EditMany("Id", null, "tplTabEtable", ".x-form");
    this.mEitem = new EditMany("Id", null, "tplEitem", ".xu-tr");
    //edit2: initial edit one/many, rowsBox(參數2) 使用 eform
    this.mUiItem = new EditMany("Id", "eformUiItem", "tplUiItem", ".xu-tr");
    //不同編輯畫面共用查詢畫面
    this.divEdit1 = $("#divEdit1");
    //new CrudR(config, [_m2.edit0, _m2.mQitem, _m2.mRitem, _m2.mEtable]),
    //this.ritemChdIdx: 0,    //child index of Ritem
    this.etableChdIdx = 2;
    //child index of Etable nav(CrudEdit)
    this.eitemChdIdx = 0;
    //child index of Eitem
    //Qitem(Q)
    this.tplQitem = $("#tplQitem").html();
    this.tbodyQitem = $("#tbodyQitem");
    //Ritem(R)
    this.tplRitem = $("#tplRitem").html();
    this.tbodyRitem = $("#tbodyRitem");
    //CrudEdit table(use nav)
    this.navEtable = $("#navEtable");
    this.tabEtable = $("#tabEtable");
    this.tplNavEtable = $("#tplNavEtable").html();
    this.tplTabEtable = $("#tplTabEtable").html();
    //Eitem(E)
    this.tplEitem = $("#tplEitem").html();
    //Item modal(for Q,R,E)
    this.modalItems = $("#modalItems");
    //modal for select items
    this.divItemsBody = null;
    this.tplModalItem = $("#tplModalItem").html();
    //tpl of modal item row
    //variables
    this.ritemTableId = "";
    //now ritem table Id
    this.tables = [];
    //for table dropdownlist
    this.etableLen = 0;
    //edit table count(累加)
    this.etableIdx = 0;
    //now edit nav selected index
    this.nowItemType = "";
    //modal item type: R,E,S
    //#region *** for edit2 ***
    this.modalImport = $("#modalUiImport");
    //initial uiMany
    this.uiMany = null;
    this.divItemsBody = this.modalItems.find("tbody");
    this.mEtable.setChilds([this.mEitem]);
    this.mEtable.fnLoadRows = this.mEtable_loadRows;
    this.mEtable.fnGetUpdJson = this.mEtable_getUpdJson;
    this.mEtable.fnValid = this.mEtable_valid;
    this.mUiItem.fnLoadRows = this.mUiItem_loadRows;
    this.mUiItem.fnGetUpdJson = this.mUiItem_getUpdJson;
    this.mUiItem.fnValid = this.mUiItem_valid;
    this.uiMany = new UiMany(".xu-ui-area", this.mUiItem);
    const me = this;
    this.divEdit1.on(MouseEstr.DragStart, ".xu-btn", function(e) {
      let itemType = $(e.target).data("type");
      this.uiMany.startDragBtn(true, itemType);
    }).on(MouseEstr.DragEnd, function(e) {
      me.uiMany.onDragEnd(e);
    });
  }
  /*
  //reset eitem columns: re show/hide eitem layoutcols, width property
  swapEitemCols () {
      $('.xu-edit').each(function (idx, item) {
          var me = $(item);
          if (idx == 0) {
              //me.find('.xu-layout').show();
              //me.find('.xu-width').hide();
          } else {
              //me.find('.xu-layout').hide();
              //me.find('.xu-width').show();
          }
      });
  },
  */
  getProjectId() {
    return _iSelect.get("ProjectId", _me.eform0);
  }
  //set etable TableId(dropdown)
  //edit0_afterLoadJson (json) {
  async fnAfterOpenEdit0(fun, json) {
    if (fun == FunEstr.Create) return;
    if (!await this.onChangeProject()) return;
    var navRows = _Edit.getChildRows(json, this.etableChdIdx);
    var navLen = navRows == null ? 0 : navRows.length;
    for (var i = 0; i < navLen; i++) {
      var tabObj = this.etGetTab(i);
      _iSelect.setItems(this.TableId, this.tables, tabObj);
      _iSelect.set(this.TableId, navRows[i][this.TableId], tabObj);
      this.etShowName(i);
    }
  }
  //reset when create
  fnAfterOpenEdit1(fun, json) {
    this.uiMany.reset();
    var isAdd = fun == FunEstr.Create;
    this.uiMany.setEdit(isAdd || fun == FunEstr.Update);
  }
  //拖拉編輯
  isEdit1() {
    return _me.crudE.mEditGetEditNo() == 1;
  }
  //set sort
  fnWhenSave0(fun) {
    this.tbodyQitem.find(".xu-tr").each(function(i, item) {
      _iText.set("Sort", i, $(item));
    });
    this.tbodyRitem.find(".xu-tr").each(function(i, item) {
      _iText.set("Sort", i, $(item));
    });
    var error = "";
    var tableIds = [];
    const me = this;
    this.etGetForms().each(function(i, item) {
      var form = $(item);
      var tableId = _iText.get(me.TableId, form);
      if (_Array.find(tableIds, tableId) >= 0) {
        error = "\u7DAD\u8B77\u7684\u8CC7\u6599\u8868(Etable)\u4E0D\u53EF\u91CD\u8907\u3002";
        return false;
      }
      tableIds[i] = tableId;
      _iText.set("Sort", i, form);
      me.getEitemForm(form).find(".xu-tr").each(function(j, item2) {
        _iText.set("Sort", j, $(item2));
      });
    });
    return error;
  }
  //load etable
  mEtable_loadRows(rows) {
    const vo = _vo;
    vo.navEtable.empty();
    vo.tabEtable.empty();
    if (rows == null || rows.length == 0)
      return;
    var eitemRows = _Edit.getChildRows(vo.mEtable.dataJson, 0);
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      vo.mEtable.loadRowByBox(vo.tabEtable, row, i);
      var newNav = $(Mustache.render(vo.tplNavEtable, { Index: i }));
      vo.navEtable.append(newNav);
      vo.etableLen++;
      if (i === 0)
        newNav.find("a")[0].click();
      var forms = vo.tabEtable.find("#divEtable" + i + " form");
      var form = forms.first();
      _Valid.init(form);
      var form2 = forms.last();
      var rows2 = _Json.filterRows(eitemRows, "EtableId", _iText.get("Id", form));
      vo.mEitem.loadRowsByRsb(rows2, true, form2.find("tbody"));
      _Valid.init(form2);
    }
  }
  //GetUpdJson
  mEtable_getUpdJson(upKey) {
    var rows = [];
    var eitems = [];
    const vo = _vo;
    vo.etGetForms().each(function(i, item) {
      var form = $(item);
      rows[i] = vo.mEtable.getUpdRow(form);
      vo.mEtable.rowSetFkey(rows[i], upKey);
      var upKey2 = _iText.get("Id", form);
      var form2 = vo.getEitemForm(form);
      var rows2 = vo.mEitem.getUpdRows(upKey2, form2.find("tbody"));
      _Json.appendRows(rows2, eitems);
    });
    return {
      _rows: rows,
      _deletes: vo.mEtable.getDeletes(),
      _childs: [{ _rows: eitems, _deletes: vo.mEitem.getDeletes() }]
    };
  }
  /**
   * error時顯示對應的table page
   * return boolean
   */
  mEtable_valid() {
    var status = true;
    const vo = _vo;
    vo.etGetForms().each(function(i, item) {
      var form = $(item);
      status = form.valid();
      if (status)
        status = vo.getEitemForm(form).valid();
      if (!status) {
        var idx = form.data("index");
        vo.etFocusNav(vo.etGetNav(idx));
        return false;
      }
    });
    return status;
  }
  /**
   * onclick generate crud
   * (如果在VS下產生DbAdm的CRUD會reload !!)
   */
  async onGenCrud(id) {
    if (await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u7522\u751F\u9019\u500B\u529F\u80FD\u7684CRUD\u7A0B\u5F0F?")) {
      await _Ajax.getStrA("GenCrud", { id }, function(error) {
        _Tool.msg(_Str.isEmpty(error) ? "\u57F7\u884C\u6210\u529F" : error);
      });
    }
  }
  //get checked table id array
  getCheckedTables() {
    var values = _iCheck.getCheck0Values(_me.crudR.divRead);
    if (values.length === 0)
      _Tool.msg("\u8ACB\u9078\u53D6\u8CC7\u6599\u3002");
    return values;
  }
  resetEdits() {
    this.navEtable.empty();
    this.tabEtable.empty();
    this.etableLen = 0;
  }
  //onclick Create(table)
  onCreate() {
    _me.crudR.onCreate();
    this.resetEdits();
  }
  onQitemAdd() {
    var box = $(Mustache.render(this.tplQitem, {}));
    _Form.loadRow(box, {});
    this.mQitem.setNewIdByBox(box);
    this.tbodyQitem.append(box);
  }
  onRitemAdd() {
    var box = $(Mustache.render(this.tplRitem, {}));
    _Form.loadRow(box, {});
    this.mRitem.setNewIdByBox(box);
    this.tbodyRitem.append(box);
  }
  //on change project id
  //多個地方呼叫
  ////fnCallback: (optional) callback function
  //return {bool}
  //onChangeProject: async function (fnCallback) {
  async onChangeProject() {
    var pid = this.getProjectId();
    if (_Str.isEmpty(pid)) return false;
    var rows = await _Ajax.getJsonsA("/XpCode/Tables", { projectId: pid });
    if (_Array.isEmpty(rows)) return false;
    this.tables = rows;
    var obj = _Obj.get(this.TableId, this.modalItems);
    _iSelect.setItemsO(obj, this.tables);
    _iSelect.setO(obj, "");
    return true;
  }
  //on open item modal
  //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
  onOpenItem(type) {
    this.nowItemType = type;
    _Modal.show(this.modalItems);
  }
  //on change tableId at ritem modal
  async onChangeItemTable() {
    await this.changeItemTableA(_iSelect.getO(_Fun.getMe()));
  }
  //called by 2 places
  async changeItemTableA(tableId) {
    await _Ajax.getJsonA("GetColumns", { tableId }, function(rows) {
      this.divItemsBody.empty();
      for (var i = 0; i < rows.length; i++) {
        this.divItemsBody.append($(Mustache.render(this.tplModalItem, rows[i])));
      }
    });
  }
  //?? delegate: item modal 過濾查詢結果
  fnItemDtGetRows(result) {
    return result.data;
  }
  //onclick ok at Item(R/Q/E) modal
  onItemModalOk() {
    var rows = [];
    this.divItemsBody.find(":checkbox:checked").each(function(idx) {
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
    var type = this.nowItemType;
    var body, tplItem;
    var mItem = null;
    if (type === "Q") {
      body = this.tbodyQitem;
      tplItem = this.tplQitem;
      mItem = this.mQitem;
    } else if (type === "R") {
      body = this.tbodyRitem;
      tplItem = this.tplRitem;
      mItem = this.mRitem;
    } else {
      body = this.etGetTab().find("tbody");
      tplItem = this.tplEitem;
      mItem = this.mEitem;
    }
    for (var i = 0; i < rowLen; i++) {
      var box = $(Mustache.render(tplItem, rows[i]));
      _Form.loadRow(box, rows[i]);
      mItem.setNewIdByBox(box);
      body.append(box);
    }
    _Modal.hide(this.modalItems);
  }
  //onclick add on (edit)nav
  //must set id=new index
  onEtAdd() {
    this.etNavRemoveAct();
    var index = this.etableLen;
    var json = { Index: index };
    var newTab = $(Mustache.render(this.tplTabEtable, json));
    this.mEtable.setNewIdByBox(newTab);
    _iSelect.setItems(this.TableId, this.tables, newTab);
    this.tabEtable.append(newTab);
    var newNav = $(Mustache.render(this.tplNavEtable, json));
    this.navEtable.append(newNav);
    this.etableLen++;
    this.etFocusNav(newNav);
    this.etShowName(index);
  }
  onEtDelete() {
    if (this.etableLen == 0)
      return;
    _Tool.ans("\u662F\u5426\u79FB\u9664\u756B\u9762\u8CC7\u6599?", function() {
      var nav = this.etGetNav();
      var tab = this.etGetTab();
      var nav2;
      var index = this.etableIdx == this.etableLen - 1 ? this.etableIdx - 1 : this.etableIdx;
      if (index >= 0) {
        nav2 = index === this.etableIdx ? nav.next() : nav.prev();
      }
      var form = this.etGetForm(tab);
      var key = this.mEtable.getKey(form);
      this.mEtable.deleteRow(key);
      var form2 = this.getEitemForm(form);
      form2.find(".xu-tr").each(function() {
        key = this.mEitem.getKey($(this));
        this.mEitem.deleteRow(key);
      });
      this.etNavRemoveAct();
      tab.remove();
      nav.remove();
      this.etableLen--;
      this.etableIdx = index;
      if (index >= 0)
        this.etFocusNav(nav2);
    });
  }
  onEtLeft() {
    _Nav.moveLeft(this.etGetNav());
    _Tab.moveLeft(this.etGetTab());
  }
  onEtRight() {
    _Nav.moveRight(this.etGetNav());
    _Tab.moveRight(this.etGetTab());
  }
  etFocusNav(navObj) {
    navObj.find("a").click();
  }
  /*
  etGetObject (index) {
      return this.tabEtable.find('#divEtable' + index);
  }
  */
  //set(show) tableName at edit edit page
  //param {bool} reset: reset table list or not 
  etShowName(index) {
    var name = _iSelect.getText(this.TableId, this.etGetTab(index));
    if (name === "")
      name = "(Empty)";
    this.navEtable.find("li[data-index=" + index + "] a").text(name);
  }
  onChangeNowTable(index) {
    this.etShowName(index);
  }
  //set child not active
  etNavRemoveAct() {
    var nav = this.etGetNav();
    nav.removeClass(this.Active);
    this.tabEtable.find(".tab-pane." + this.Active).removeClass(this.Active);
  }
  //onclick etable nav
  onEtNav(index) {
    this.etableIdx = index;
  }
  //get edit edit active nav
  //return nav object
  etGetNav(index) {
    index = index || this.etableIdx;
    var find = "[data-index=" + index + "]";
    return this.navEtable.find("li" + find);
  }
  //get edit edit active tab
  //return tab object
  etGetTab(index) {
    index = index || this.etableIdx;
    return this.tabEtable.find("#divEtable" + index);
  }
  etGetForms() {
    return this.tabEtable.find(".x-form");
  }
  etGetForm(tabObj) {
    return tabObj.find(".x-form");
  }
  /*
   * get eitem form by etable form
   */
  getEitemForm(etableForm) {
    return etableForm.parent().find(".xu-form2");
  }
  //#endregion
  //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
  async onOpenEdit1(id) {
    _me.crudE.mEditSetEditNo(1);
    await _me.crudE.onUpdateA(id);
  }
  //下載 table sql
  async onDownTableSql(id) {
    if (await _Tool.ansA("\u662F\u5426\u78BA\u5B9A\u4E0B\u8F09\u9019\u500B\u529F\u80FD\u7684 Table SQL ?")) {
      await _Ajax.getStrA("DownTableSql", { id }, function(result) {
        _Str.saveFile(result, "table.txt");
      });
    }
  }
  //#region read form function
  //onclick generate crud(產生在主機)
  /*
  onGenCrud (id) {
      await _Ajax.getStrA('GenCrud', { id: id }, function (error) {
          _Tool.msg(_Str.isEmpty(error) ? '執行成功' : error);
      });
  }
  */
  //onclick download crud
  onDownCrud() {
  }
  //#endregion
  //#region edit form function
  //on click open import modal
  onOpenImport() {
    _iText.set("Import", "", this.modalImport);
    _Modal.show(this.modalImport);
  }
  //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
  //called by modalImprot
  async onImport() {
    var value = _iText.get("Import", this.modalImport).trim();
    if (_Str.isEmpty(value)) {
      _Tool.msg("\u532F\u5165\u8CC7\u6599\u4E0D\u53EF\u7A7A\u767D\u3002");
      return;
    }
    var jsons = _Str.toJson(value);
    if (jsons == null) {
      _Tool.msg("\u532F\u5165\u8CC7\u6599\u5FC5\u9808\u662FJson\u683C\u5F0F\u3002");
      return;
    }
    await this.uiMany.loadJsonsA(jsons);
    _Modal.hide(this.modalImport);
  }
  //export 前端 edit form to json
  async onExport() {
    let jsons = this.uiMany.getJsons();
    if (_Json.isEmpty(jsons)) {
      _Tool.msg("\u76EE\u524D\u756B\u9762\u7121\u4EFB\u4F55\u8CC7\u6599\u3002");
      return;
    }
    const blob = new Blob([JSON.stringify(jsons, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  }
  //#endregion
  /*
  //generate json
  onGenJson () {
      var values = _icheck.getCheck0Values(this.crudR.divRead);
      if (values.length > 0)
          window.location = 'GenJson?key=' + values.join(',');
      else
          _Tool.msg('請先選取資料。');
  },
  */
  /**
   * ?? auto called
   * jsPlumb line container must visible when rendering
   * see _m2.crudE.js _updateOrViewA()
   * param {string} fun
   * param {string} key
   * returns {bool}
   */
  async zz_fnUpdateOrViewA(fun, key) {
    var act = fun == FunEstr.Update ? "GetUpdJson" : "GetViewJson";
    return await _Ajax.getJsonA(act, { key }, function(json) {
      _me.crudR.toEditMode(fun, () => {
        _me.crudE.loadJson(json);
        _me.crudE.setEditStatus(fun);
        _me.crudE.afterOpen(fun, json);
      });
    });
  }
  /**
   * auto called
   * 重設 uiItem的 BoxId、ChildNo、Sort
   * return {string} error msg if any
   */
  fnWhenSave1(fun) {
    let uiView = this.uiMany.uiView;
    let boxJsons = uiView.getChgBoxJsons();
    let boxLen = boxJsons.length;
    if (boxLen == 0) return "";
    let mUiItem = this.mUiItem;
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
  }
  //#endregion
  //#region mUiItem custom function
  //load items
  async mUiItem_loadRows(rows) {
    await _vo.uiMany.loadRowsA(rows);
  }
  //getUpdJson
  mUiItem_getUpdJson(upKey) {
    return _vo.mUiItem.getUpdJsonByRsb(upKey);
  }
  //return boolean
  mUiItem_valid() {
    return true;
  }
  /*
  //return boolean
  mLine_valid () {
      return true;
  }
  */
  //#endregion
  //#region
}
_vo = new GenCrudVo();
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
    const vo = _vo;
    var ary0 = new EditDto([null, vo.mQitem, vo.mRitem, vo.mEtable], $("#divEdit"));
    var ary1 = new EditDto([new EditOne(null, "eform1"), vo.mUiItem], vo.divEdit1, "\u62D6\u62C9\u7DE8\u8F2F");
    new CrudR(config, [ary0, ary1]);
  },
  //auto called !!
  fnAfterOpenEdit: async function(fun, json) {
    const vo = _vo;
    var isEdit1 = vo.isEdit1();
    _Prog.setBorder(!isEdit1);
    if (isEdit1)
      vo.fnAfterOpenEdit1(fun, json);
    else
      vo.fnAfterOpenEdit0(fun, json);
  },
  fnWhenSave: function(fun) {
    const vo = _vo;
    return vo.isEdit1() ? vo.fnWhenSave1(fun) : vo.fnWhenSave0(fun);
  },
  //#region auto called function
  fnAfterSwap: function(toRead) {
    var tbar = $(".xd-prog-tbar");
    if (toRead) {
      _Obj.hide(tbar);
    } else {
      _Obj.show(tbar);
    }
  }
};
//# sourceMappingURL=GenCrud.js.map
