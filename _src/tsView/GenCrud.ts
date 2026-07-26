$(function () {
    _me.init();
});
class GenCrudVo {
    //const
    TableId = 'TableId';    //column name of TableId for many forms
    Active = 'active';      //active class
    FtTr = '.xu-tr';        //row css class

    //maintain tables:
    //this.edit0: new EditOne(),
    mQitem = new EditMany('Id', 'qitemBody', 'qitemTpl', this.FtTr);
    mRitem = new EditMany('Id', 'ritemBody', 'ritemTpl', this.FtTr);
    mEtable = new EditMany('Id', null, 'etableTabTpl', '.x-form');
    mEitem = new EditMany('Id', null, 'eitemTpl', this.FtTr);

    //edit2: initial edit one/many, rowsBox(參數2) 使用 eform
    mUiItem = new EditMany('Id', 'eformUiItem', 'tplUiItem', this.FtTr);

    //不同編輯畫面共用查詢畫面
    divEdit1 = $('#divEdit1');
    //new CrudR(config, [_m2.edit0, _m2.mQitem, _m2.mRitem, _m2.mEtable]),

    //this.ritemChdIdx: 0,    //child index of Ritem
    etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
    eitemChdIdx = 0;    //child index of Eitem

    //Qitem(Q)
    qitemTpl = $('#qitemTpl').html();
    qitemBody = $('#qitemBody');

    //Ritem(R)
    ritemTpl = $('#ritemTpl').html();
    ritemBody = $('#ritemBody');

    //etable container
    etableBox = $('#etableBox');

    //CrudEdit table(use nav)
    etableNav = $('#etableNav');
    etableTab = $('#etableTab');
    etableNavTpl = $('#etableNavTpl').html();
    etableTabTpl = $('#etableTabTpl').html();

    //Eitem(E)
    eitemTpl = $('#eitemTpl').html();

    //Item modal(for Q,R,E)
    modalItems = $('#modalItems');    //modal for select items
    //modaltemsBody: JQuery = null;        //modalItems body
    modaltemsBody = this.modalItems.find('tbody');
    modalItemTpl = $('#modalItemTpl').html();   //tpl of modal item row

    //variables
    ritemTableId = '';  //now ritem table Id
    tables = [];        //for table dropdownlist
    etableLen = 0;      //edit table count(累加)
    etableIdx = 0;      //now edit nav selected index
    nowItemType = '';   //modal item type: R,E,S

    //#region *** for edit2 ***
    modalImport = $('#modalUiImport');

    //initial uiMany
    //uiMany: UiMany = null;
    uiMany = new UiMany('.xu-ui-area', this.mUiItem);

    constructor() {
        //this.modaltemsBody = this.modalItems.find('tbody');

        //maintain tables:
        this.mEtable.setChilds([this.mEitem]);

        //custom function-etable
        this.mEtable.fnLoadRows = this.mEtable_loadRows;
        this.mEtable.fnGetUpdJson = this.mEtable_getUpdJson;
        this.mEtable.fnValid = this.mEtable_valid;

        //custom function-uiItem
        this.mUiItem.fnLoadRows = this.mUiItem_loadRows;
        this.mUiItem.fnGetUpdJson = this.mUiItem_getUpdJson;
        this.mUiItem.fnValid = this.mUiItem_valid;

        //initial uiMany
        //this.uiMany = new UiMany('.xu-ui-area', this.mUiItem);

        //註刪button dragstart事件
        const me = this;
        this.divEdit1.on(MouseEstr.DragStart, '.xu-btn', function (e) {
            let itemType = $(e.target).data('type');
            this.uiMany.startDragBtn(true, itemType);
        }).on(MouseEstr.DragEnd, function (e) {
            //不會觸發工作區的 dragEnd, 這裡必須寫
            me.uiMany.onDragEnd(e);
        });
        //#endregion
    }

    //onchange IsUi
    onChangeIsUi() {
        const isUi = (_iCheck.get('IsUi', _me.eform0) == '1');
        _Obj.showByStatus(this.etableBox, !isUi);
    }

    /*
    //reset eitem columns: re show/hide eitem layoutcols, width property
    swapEitemCols () {
        $('.xu-edit').each(function (idx) {
            var me = $(this);
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
        return _iSelect.get('ProjectId', _me.eform0);
    }

    //set etable TableId(dropdown)
    //called by fnAfterOpenEdit
    //edit0_afterLoadJson (json) {
    async fnAfterOpenEdit0(fun: FunEstr, json: Json) {
        //show/hide etable box
        this.onChangeIsUi();

        //edit2會隱藏 prog border, 這裡打開        
        if (fun == FunEstr.Create) return;

        //set tables list, async call, send function parameter 
        if (!await this.onChangeProject()) return;

        //set form0 tableId select 欄位
        //var form = _me.crudE.getEform0();
        //_iSelect.set(this.TableId, json[this.TableId], form);

        //set etableTab(s) tableId select 欄位
        var navRows = _Edit.getChildRows(json, this.etableChdIdx);
        var navLen = (navRows == null) ? 0 : navRows.length;
        for (var i = 0; i < navLen; i++) {
            //set dropdown source
            var tabObj = this.etGetTab(i);
            _iSelect.setItems(this.TableId, this.tables, tabObj);

            //set value
            _iSelect.set(this.TableId, navRows[i][this.TableId], tabObj);

            //show edit table name
            this.etShowName(i);
        }
    }

    //reset when create
    //called by fnAfterOpenEdit
    fnAfterOpenEdit1(fun: FunEstr, json: Json) {
        this.uiMany.reset();
        var isAdd = (fun == FunEstr.Create);
        this.uiMany.setEdit(isAdd || (fun == FunEstr.Update));
        //_btn.setEdit($('.xd-btns').find('button'), true);
    }

    //判斷是否為拖拉編輯
    isDragEdit() {
        return (_me.crudE.mEditGetEditNo() == 1);
    }

    //set sort
    fnWhenSave0(fun: FunEstr) {

        //qitem set sort
        this.qitemBody.find(this.FtTr).each(function (idx,) {
            _iText.set('Sort', idx.toString(), $(this));
        });

        //ritem set sort
        this.ritemBody.find(this.FtTr).each(function (idx) {
            _iText.set('Sort', idx.toString(), $(this));
        });

        //etable/eitem set sort
        var error = '';
        var tableIds = [];
        const me = this;
        this.etGetForms().each(function (idx: number) {
            //Etable不可重複
            var form = $(this);
            var tableId = _iText.get(me.TableId, form);
            if (_Array.find(tableIds, tableId) >= 0) {
                error = '維護的資料表(Etable)不可重複。';
                return false;   //break
            }

            //add tableIds[]
            tableIds[idx] = tableId;

            //etable sort
            _iText.set('Sort', idx.toString(), form);

            //eitem sort
            //var tbody = form.parent().find('tbody');
            me.getEitemForm(form).find(me.FtTr).each(function (j, item2) {
                _iText.set('Sort', j.toString(), $(item2));    //set sort 
            });
        });
        return error;
    }

    //load etable
    mEtable_loadRows(rows: Json[]) {
        //注意, 這裡的 this 是 EditMany, 所以必須用 _vo
        const vo = _vo as GenCrudVo;
        //empty first
        vo.etableNav.empty();
        vo.etableTab.empty();

        //null表示沒資料
        if (rows == null || rows.length == 0)
            return;

        //vo.etNavRemoveAct();

        //render etables & eitems
        //var eitemRows = _Edit.getChildRows(json, 0);   //已改為傳入rows, 不是json
        var eitemRows = _Edit.getChildRows(vo.mEtable.dataJson, 0);   //從dataJson讀取 !!
        for (var i = 0; i < rows.length; i++) {
            //add tab (only)
            var row = rows[i];
            vo.mEtable.loadRowByBox(vo.etableTab, row, i);

            //add nav
            //on click必須add/remove active class, 所以改用javascript !!
            var newNav = $(Mustache.render(vo.etableNavTpl, { Index: i }));
            vo.etableNav.append(newNav);
            vo.etableLen++;

            //focus first tab, [0] is need !!
            if (i === 0)
                newNav.find('a')[0].click();

            //validate etable form
            var forms = vo.etableTab.find('#divEtable' + i + ' form');
            var form = forms.first();
            _Valid.init(form);

            //load Eitems & validate
            var form2 = forms.last();
            var rows2 = _Json.filterRows(eitemRows, 'EtableId', _iText.get('Id', form));
            vo.mEitem.loadRowsByRsb(rows2, true, form2.find('tbody'));
            _Valid.init(form2);
        }

        /*
        //最後再執行(因為裡面有非同步呼叫)
        //show edit table name(after nav added tab)
        for (var i = 0; i < navLen; i++) {
            vo.etShowName((i===0), i);
        }
        */
    }

    //GetUpdJson
    mEtable_getUpdJson(upKey: StrNum) {
        //var upKey = _iText.get('Id', this.crudE.getEform0());
        var rows = [];
        var eitems = [];
        const vo = _vo as GenCrudVo;
        vo.etGetForms().each(function (idx) {
            //etable
            var form = $(this);
            rows[idx] = vo.mEtable.getUpdRow(form); //edit table
            vo.mEtable.rowSetFkey(rows[idx], upKey);

            //eitems
            var upKey2 = _iText.get('Id', form);
            var form2 = vo.getEitemForm(form);
            var rows2 = vo.mEitem.getUpdRows(upKey2, form2.find('tbody'));
            _Json.appendRows(rows2, eitems);
            /*
            if (rows2 != null) {
                if (rows[i] == null)
                    rows[i] = {};
                _Edit.setChildRows(rows[i], 0, rows2);
            }
            */
        });
        return {
            _rows: rows,
            _deletes: vo.mEtable.getDeletes(),
            _childs: [{ _rows: eitems, _deletes: vo.mEitem.getDeletes() }],
        };
    }

    /**
     * error時顯示對應的table page
     * return boolean
     */
    mEtable_valid() {
        var status = true;
        const vo = _vo as GenCrudVo;
        vo.etGetForms().each(function () {
            //focus nav first, or will not work !!
            var form = $(this);
            //var nav = vo.etGetNav(form.data('index'));
            //vo.etFocusNav(nav);

            //validate etable
            status = form.valid();

            //validate eitem
            if (status)
                status = vo.getEitemForm(form).valid();

            if (!status) {
                //status = false;
                //vo.etableIdx = i;
                var idx = form.data('index');
                vo.etFocusNav(vo.etGetNav(idx));
                return false;   //break;
            }
        });
        return status;
    }

    /**
     * onclick generate crud
     * (如果在VS下產生DbAdm的CRUD會reload !!)
     */
    async onGenCrud(id: StrNum) {
        /*
        var keys = this.getCheckedTables();
        if (keys.length === 0)
            return;
        */
        if (await _Tool.ansA('是否確定產生這個功能的CRUD程式?')) {
            await _Ajax.getStrA('GenCrud', { id: id }, function (error) {
                _Tool.msg(_Str.isEmpty(error) ? '執行成功' : error);
            });
        }
    }

    //get checked table id array
    getCheckedTables() {
        var values = _iCheck.getCheck0Values(_me.crudR.divRead);
        if (values.length === 0)
            _Tool.msg('請選取資料。');
        return values;
    }

    resetEdits() {
        this.etableNav.empty();
        this.etableTab.empty();
        this.etableLen = 0;
    }

    //onclick Create(table)
    onCreate() {
        _me.crudR.onCreate();

        //init master edit
        this.resetEdits();
        //this.addEdit();
    }

    onQitemAdd() {
        var box = $(Mustache.render(this.qitemTpl, {}));
        _Form.loadRow(box, {});
        this.mQitem.setNewIdByBox(box);
        this.qitemBody.append(box);
    }

    onRitemAdd() {
        var box = $(Mustache.render(this.ritemTpl, {}));
        _Form.loadRow(box, {});
        this.mRitem.setNewIdByBox(box);
        this.ritemBody.append(box);
    }

    //on change project id
    //多個地方呼叫
    ////fnCallback: (optional) callback function
    //return {bool}
    //onChangeProject: async function (fnCallback) {
    async onChangeProject() {
        var pid = this.getProjectId();
        if (_Str.isEmpty(pid)) return false;

        var rows = await _Ajax.getJsonsA('/XpCode/Tables', { projectId: pid });
        if (_Array.isEmpty(rows)) return false;

        //case of ok
        this.tables = rows;

        //set item modal tables
        var obj = _Obj.get(this.TableId, this.modalItems);
        _iSelect.setItemsO(obj, this.tables);
        _iSelect.setO(obj, '');

        //if (fnCallback !== undefined)
        //    fnCallback();
        return true;
    }

    //on open item modal
    //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
    onOpenItem(type: string) {
        //如果為主table, 則不必重新讀取
        //this.initRitemDt();

        /*
        //get tableId
        var form = this.eform0;
        var tableId = _iSelect.get(this.TableId, form);

        //get編輯畫面tableId
        if (tableId === '') {
            _Tool.msg('請先選取資料表。');
            return;
        }
        */

        //set nowItemType
        this.nowItemType = type;

        /*
        //set modal tableId if need
        var obj = _obj.get(this.TableId, this.modalItems);
        var modalTableId = _iSelect.getO(obj);
        if (modalTableId === '')
            _iSelect.setItemsO(obj, this.tables);

        //set modal tableId dropdown list if need
        if (tableId !== modalTableId) {
            _iSelect.setO(obj, tableId);
            this.changeItemTable(tableId);
        }
        */

        //show modal
        _Modal.show(this.modalItems);
    }

    //on change tableId at ritem modal
    async onChangeItemTable() {
        await this.changeItemTableA(_iSelect.getO(_Fun.getMe()) as string);
    }

    //called by 2 places
    async changeItemTableA(tableId: string) {
        const me = this;
        await _Ajax.getJsonsA('GetColumns', { tableId: tableId }, function (rows) {
            me.modaltemsBody.empty();
            for (var i = 0; i < rows.length; i++) {
                me.modaltemsBody.append($(Mustache.render(me.modalItemTpl, rows[i])));
            }
        });
    }

    //?? delegate: item modal 過濾查詢結果
    fnItemDtGetRows(result:Json) {
        //result.data

        return result.data;
    }

    //onclick ok at Item(R/Q/E) modal
    onItemModalOk() {
        //get checked columns list
        //var crudId = _iText.get('Id', this.crudE.getEform0());
        var rows = [];
        //const me = this;
        this.modaltemsBody.find(_iCheck.ftChecked).each(function (idx: number) {
            var obj = $(this);
            var tr = obj.closest('tr');
            //data 屬性不區分大小寫 !!
            rows[idx] = {
                //CrudId: crudId, //mapId
                ColumnId: tr.data('id'),
                Fid: tr.data('fid'),    //for Ritem
                //Code: tr.data('code'),
                Name: tr.data('name'),
                DataType: tr.data('datatype'),
                //inputType ??
            };
        });
        var rowLen = rows.length;
        if (rowLen === 0) {
            _Tool.msg('請先選取資料。');
            return;
        }

        //debugger;
        var type = this.nowItemType;
        var body, tplItem;
        var mItem = null;   //editMany 
        if (type === 'Q') {
            //qitem
            body = this.qitemBody;
            tplItem = this.qitemTpl;
            mItem = this.mQitem;
        } else if (type === 'R') {
            //ritem
            body = this.ritemBody;
            tplItem = this.ritemTpl;
            mItem = this.mRitem;
        } else {
            //eitem
            body = this.etGetTab().find('tbody');
            tplItem = this.eitemTpl;
            mItem = this.mEitem;
        }

        //append query rows
        for (var i = 0; i < rowLen; i++) {
            var box = $(Mustache.render(tplItem, rows[i]));
            _Form.loadRow(box, rows[i]);
            //if (mItem != null)
            //    mItem.boxSetMapId(box, crudId);
            mItem.setNewIdByBox(box);
            body.append(box);
        }

        //show
        _Modal.hide(this.modalItems);
    }

    //#region Etable event handler
    /**
     * onclick add on (edit)nav
     * must set id=new index
     */
    onEtableAdd() {

        this.etNavRemoveAct();

        //add tab
        var index = this.etableLen;
        var json = { Index: index };
        var newTab = $(Mustache.render(this.etableTabTpl, json));
        //debugger;
        this.mEtable.setNewIdByBox(newTab);    //set new row key !!
        _iSelect.setItems(this.TableId, this.tables, newTab); //set dropdown source
        this.etableTab.append(newTab);

        //add nav
        //on click必須add/remove active class, 所以改用javascript !!
        var newNav = $(Mustache.render(this.etableNavTpl, json));
        this.etableNav.append(newNav);
        this.etableLen++;

        //focus new nav
        this.etFocusNav(newNav);

        //show edit table name(after nav added tab)
        this.etShowName(index);

        //reset
        //this.swapEitemCols();
    }

    async onEtableDelete() {
        //check
        if (this.etableLen == 0)
            return;

        //confirm
        if (await _Tool.ansA('是否移除畫面資料?')) {
            var nav = this.etGetNav();
            var tab = this.etGetTab();

            //get left/right one
            var nav2;
            var index = (this.etableIdx == this.etableLen - 1)
                ? this.etableIdx - 1 : this.etableIdx;
            if (index >= 0) {
                nav2 = (index === this.etableIdx)
                    ? nav.next() : nav.prev();
            }

            //=== delete rows ===
            //delete etable row
            var form = this.etGetForm(tab);
            var key = this.mEtable.getKey(form);
            this.mEtable.deleteRow(key);

            //delete eitem rows
            var form2 = this.getEitemForm(form);
            var me = this;
            form2.find(this.FtTr).each(function () {
                key = me.mEitem.getKey($(this));
                me.mEitem.deleteRow(key);
            });
            //===

            //delete objects
            this.etNavRemoveAct();
            tab.remove();
            nav.remove();
            this.etableLen--;
            this.etableIdx = index;

            //focus new tab
            if (index >= 0)
                this.etFocusNav(nav2);
        }
    }

    onEtableLeft() {
        _Nav.moveLeft(this.etGetNav());
        _Tab.moveLeft(this.etGetTab());

        //reset
        //this.swapEitemCols();
    }
    onEtableRight() {
        _Nav.moveRight(this.etGetNav());
        _Tab.moveRight(this.etGetTab());

        //reset
        //_me.swapEitemCols();
    }

    //onclick etable nav
    onEtableNav(index: number) {
        //this.etNavRemoveAct();
        this.etableIdx = index;
    }
    //#endregion

    etFocusNav(navObj: JQuery) {
        //debugger;
        //navObj.focus();
        //navObj.find('a').click();
        navObj.find('a').trigger('click');
        //navObj.click();    
        //this.etGetNav(0).find('a').toggle(true);
        //obj.tab('show');
    }

    /*
    etGetObject (index) {
        return this.etableTab.find('#divEtable' + index);
    }
    */

    //set(show) tableName at edit edit page
    //param {bool} reset: reset table list or not 
    etShowName(idx: number) {
        var name = _iSelect.getText(this.TableId, this.etGetTab(idx));
        if (name === '')
            name = '(Empty)';
        this.etableNav.find('li[data-index=' + idx + '] a').text(name);
    }

    onChangeNowTable(idx: number) {
        this.etShowName(idx);
    }

    //set child not active
    etNavRemoveAct() {
        var nav = this.etGetNav();
        nav.removeClass(this.Active);
        this.etableTab.find('.tab-pane.' + this.Active).removeClass(this.Active);
    }

    //get edit edit active nav
    //return nav object
    etGetNav(idx?: number) {
        idx = idx || this.etableIdx;
        var find = '[data-index=' + idx + ']';
        return this.etableNav.find('li' + find);
    }

    //get edit edit active tab
    //return tab object
    etGetTab(idx?: number) {
        idx = idx || this.etableIdx;
        return this.etableTab.find('#divEtable' + idx);
    }

    etGetForms() {
        return this.etableTab.find('.x-form');
    }
    etGetForm(tabObj: JQuery) {
        return tabObj.find('.x-form');
    }

    /*
     * get eitem form by etable form
     */
    getEitemForm(etForm: JQuery) {
        return etForm.parent().find('.xu-form2');
    }
    //#endregion


    //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
    async onOpenEdit1(id: StrNum) {
        _me.crudE.mEditSetEditNo(1);
        await _me.crudE.onUpdate(id);
    }

    //下載 table sql
    async onDownTableSql(id: StrNum) {
        if (await _Tool.ansA('是否確定下載這個功能的 Table SQL ?')) {
            await _Ajax.getStrA('DownTableSql', { id: id }, function (result) {
                _Str.saveFile(result, 'table.txt');
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
        //clear first
        _iText.set('Import', '', this.modalImport);

        //open modal
        _Modal.show(this.modalImport);
    }

    //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
    //called by modalImprot
    async onImport() {
        var value = _iText.get('Import', this.modalImport).trim();
        if (_Str.isEmpty(value)) {
            _Tool.msg('匯入資料不可空白。');
            return;
        }

        //加入大括號 for json 格式
        //if (value.substring(0, 1) != '{')
        //    value = '{' + value + '}';

        //string to json
        var jsons = _Str.toJson(value);
        if (jsons == null) {
            _Tool.msg('匯入資料必須是Json格式。');
            return;
        }

        await this.uiMany.loadJsonsA(jsons);
        _Modal.hide(this.modalImport);
    }

    //export 前端 edit form to json
    async onExport() {
        //get jsons
        let jsons = this.uiMany.getJsons();
        if (_Json.isEmpty(jsons)) {
            _Tool.msg('目前畫面無任何資料。');
            return;
        }

        //jsons to blob
        const blob = new Blob([JSON.stringify(jsons, null, 2)], { type: "application/json" });

        //create link & trigger click
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";    //下載的檔名
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
    async zz_fnUpdateOrViewA(fun: FunEstr, key: StrNum) {
        var act = (fun == FunEstr.Update)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _Ajax.getJsonA(act, { key: key }, function (json) {
            //show container first
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
    fnWhenSave1(fun: FunEstr) {
        //get changed box ids
        let uiView = this.uiMany.uiView;
        let boxJsons = uiView.getChgBoxJsons();
        let boxLen = boxJsons.length;
        if (boxLen == 0) return '';

        //reset BoxId, ChildNo, Sort
        let mUiItem = this.mUiItem;
        //box list
        for (let i = 0; i < boxLen; i++) {
            let boxJson = boxJsons[i];
            let boxId = boxJson.BoxId;
            //child list
            for (let j = 0; j < boxJson.ChildNos.length; j++) {
                let childNo = boxJson.ChildNos[j];
                let itemIds = uiView.boxGetChildIds(boxId, childNo);
                //item list
                for (let k = 0; k < (itemIds || []).length; k++) {
                    let rb = mUiItem.idToRowBox(itemIds[k]); //get row box
                    _iText.set('BoxId', boxId, rb);
                    _iText.set('ChildNo', childNo, rb);
                    _iText.set('Sort', (k + 1).toString(), rb);
                }
            }
        }
        return '';
    }
    //#endregion

    //#region mUiItem custom function
    //load items
    async mUiItem_loadRows(rows: Json[]) {
        await _vo.uiMany.loadRowsA(rows);
    }

    //getUpdJson
    mUiItem_getUpdJson(upKey: StrNum) {
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
//const vo = _vo as GenCrudVo;

_me = {
    //#region for Crud
    init() {
		//datatable config
		var config = {
			columns: [
                //{ data: '_F1' },
                { data: 'ProjectCode' },
                { data: 'ProjectName' },
				{ data: 'ProgCode' },
                { data: 'ProgName' },
                { data: 'IsUi' },
                { data: '_Fun' },
                { data: 'Created' },
                { data: 'Status' },
                { data: '_Crud' },
			],
            columnDefs: [
				{ targets: [4], render(data, type, full) {
                    return (data == 1)
                        ? _me.crudR.dtLinkBtn(full.Id, '拖拉編輯', '_vo.onOpenEdit1') + ' | ' +
                          _me.crudR.dtLinkBtn(full.Id, '下載Table SQL', '_vo.onDownTableSql')
                        : '';
				}},
				{ targets: [5], render(data, type, full) {
                    var dis = (full.Status == 1) ? '' : 'disabled';
                    return `<button type="button" ${dis} class="btn btn-outline-secondary btn-sm" data-onclick="_vo.onGenCrud" data-args="${full.Id}">產生CRUD</button>`;
				}},
				{ targets: [7], render(data) {
                    return _me.crudR.dtStatusName(data);
				}},
                { targets: [8], render(data, type, full) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, '*', 'C');
                }},
			],
        };

        const vo = _vo as GenCrudVo;
        var ary0 = new EditDto([null, vo.mQitem, vo.mRitem, vo.mEtable], $('#divEdit'));
        var ary1 = new EditDto([new EditOne(null, 'eform1'), vo.mUiItem], vo.divEdit1, '拖拉編輯');
        new CrudR(config, [ary0, ary1]);
	},

    async fnAfterOpenEdit(fun: FunEstr, json: Json) {
        const vo = _vo as GenCrudVo;
        var isDrag = vo.isDragEdit();    //拖拉編輯
        _Prog.setBorder(!isDrag);
        if (isDrag)
            vo.fnAfterOpenEdit1(fun, json);
        else
            vo.fnAfterOpenEdit0(fun, json);
    },

    fnWhenSave(fun: FunEstr) {
        const vo = _vo as GenCrudVo;
        return vo.isDragEdit()
            ? vo.fnWhenSave1(fun)
            : vo.fnWhenSave0(fun);
    },

    fnAfterSwap(toRead: boolean) {
        var tbar = $('.xd-prog-tbar');
        if (toRead) {
            _Obj.hide(tbar);
            //_vo.isEdit2 = false;    //還原
        } else {
            _Obj.show(tbar);
            //_obj.showByStatus($('.xd-export'), _vo.isEdit2);
        }
    },

};