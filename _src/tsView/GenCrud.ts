$(function () {
    _me.init();
});
class GenCrudVo {
    TableId = 'TableId';    //column name of TableId for many forms
    Active = 'active';      //active class

    //maintain tables:
    //this.edit0: new EditOne(),
    mQitem = new EditMany('Id', 'tbodyQitem', 'tplQitem', '.xu-tr');
    mRitem = new EditMany('Id', 'tbodyRitem', 'tplRitem', '.xu-tr');
    mEtable = new EditMany('Id', null, 'tplTabEtable', '.x-form');
    mEitem = new EditMany('Id', null, 'tplEitem', '.xu-tr');

    //edit2: initial edit one/many, rowsBox(參數2) 使用 eform
    mUiItem = new EditMany('Id', 'eformUiItem', 'tplUiItem', '.xu-tr');

    //不同編輯畫面共用查詢畫面
    divEdit1 = $('#divEdit1');
    //new CrudR(config, [_m2.edit0, _m2.mQitem, _m2.mRitem, _m2.mEtable]),

    //this.ritemChdIdx: 0,    //child index of Ritem
    etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
    eitemChdIdx = 0;    //child index of Eitem

    //Qitem(Q)
    tplQitem = $('#tplQitem').html();
    tbodyQitem = $('#tbodyQitem');

    //Ritem(R)
    tplRitem = $('#tplRitem').html();
    tbodyRitem = $('#tbodyRitem');

    //CrudEdit table(use nav)
    navEtable = $('#navEtable');
    tabEtable = $('#tabEtable');
    tplNavEtable = $('#tplNavEtable').html();
    tplTabEtable = $('#tplTabEtable').html();

    //Eitem(E)
    tplEitem = $('#tplEitem').html();

    //Item modal(for Q,R,E)
    modalItems = $('#modalItems');    //modal for select items
    divItemsBody: JQuery = null;
    tplModalItem = $('#tplModalItem').html();   //tpl of modal item row

    //variables
    ritemTableId = '';  //now ritem table Id
    tables = [];        //for table dropdownlist
    etableLen = 0;      //edit table count(累加)
    etableIdx = 0;      //now edit nav selected index
    nowItemType = '';   //modal item type: R,E,S

    //#region *** for edit2 ***
    modalImport = $('#modalUiImport');

    //initial uiMany
    uiMany: UiMany = null;

    constructor() {
        this.divItemsBody = this.modalItems.find('tbody');

        //maintain tables:
        this.mEtable.setChilds([this.mEitem]);

        //custom function
        this.mEtable.fnLoadRows = this.mEtable_loadRows;
        this.mEtable.fnGetUpdJson = this.mEtable_getUpdJson;
        this.mEtable.fnValid = this.mEtable_valid;

        //custom function
        this.mUiItem.fnLoadRows = this.mUiItem_loadRows;
        this.mUiItem.fnGetUpdJson = this.mUiItem_getUpdJson;
        this.mUiItem.fnValid = this.mUiItem_valid;

        //initial uiMany
        this.uiMany = new UiMany('.xu-ui-area', this.mUiItem);

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
        return _iSelect.get('ProjectId', _me.eform0);
    }

    //set etable TableId(dropdown)
    //edit0_afterLoadJson (json) {
    async fnAfterOpenEdit0(fun: FunEstr, json: Json) {
        //edit2會隱藏 prog border, 這裡打開        
        if (fun == FunEstr.Create) return;

        //set tables list, async call, send function parameter 
        if (!await this.onChangeProject()) return;

        //set form0 tableId select 欄位
        //var form = _me.crudE.getEform0();
        //_iSelect.set(this.TableId, json[this.TableId], form);

        //set tabEtable(s) tableId select 欄位
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
    fnAfterOpenEdit1(fun: FunEstr, json: Json) {
        this.uiMany.reset();
        var isAdd = (fun == FunEstr.Create);
        this.uiMany.setEdit(isAdd || (fun == FunEstr.Update));
        //_btn.setEdit($('.xd-btns').find('button'), true);
    }

    //拖拉編輯
    isEdit1() {
        return (_me.crudE.mEditGetEditNo() == 1);
    }

    //set sort
    fnWhenSave0(fun: FunEstr) {

        //qitem set sort
        this.tbodyQitem.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i.toString(), $(item));
        });

        //ritem set sort
        this.tbodyRitem.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i.toString(), $(item));
        });

        //etable/eitem set sort
        var error = '';
        var tableIds = [];
        const me = this;
        this.etGetForms().each(function (i: number, item: Elm) {
            //Etable不可重複
            var form = $(item);
            var tableId = _iText.get(me.TableId, form);
            if (_Array.find(tableIds, tableId) >= 0) {
                error = '維護的資料表(Etable)不可重複。';
                return false;   //break
            }

            //add tableIds[]
            tableIds[i] = tableId;

            //etable sort
            _iText.set('Sort', i.toString(), form);

            //eitem sort
            //var tbody = form.parent().find('tbody');
            me.getEitemForm(form).find('.xu-tr').each(function (j, item2) {
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
        vo.navEtable.empty();
        vo.tabEtable.empty();

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
            vo.mEtable.loadRowByBox(vo.tabEtable, row, i);

            //add nav
            //on click必須add/remove active class, 所以改用javascript !!
            var newNav = $(Mustache.render(vo.tplNavEtable, { Index: i }));
            vo.navEtable.append(newNav);
            vo.etableLen++;

            //focus first tab, [0] is need !!
            if (i === 0)
                newNav.find('a')[0].click();

            //validate etable form
            var forms = vo.tabEtable.find('#divEtable' + i + ' form');
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
        vo.etGetForms().each(function (i, item) {
            //etable
            var form = $(item);
            rows[i] = vo.mEtable.getUpdRow(form); //edit table
            vo.mEtable.rowSetFkey(rows[i], upKey);

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
        vo.etGetForms().each(function (i: number, item: Elm) {
            //focus nav first, or will not work !!
            var form = $(item);
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
        this.navEtable.empty();
        this.tabEtable.empty();
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
        await _Ajax.getJsonsA('GetColumns', { tableId: tableId }, function (rows) {
            this.divItemsBody.empty();
            for (var i = 0; i < rows.length; i++) {
                this.divItemsBody.append($(Mustache.render(this.tplModalItem, rows[i])));
            }
        });
    }

    //?? delegate: item modal 過濾查詢結果
    fnItemDtGetRows(result) {
        //result.data

        return result.data;
    }

    //onclick ok at Item(R/Q/E) modal
    onItemModalOk() {
        //get checked columns list
        //var crudId = _iText.get('Id', this.crudE.getEform0());
        var rows = [];
        //const me = this;
        this.divItemsBody.find(':checkbox:checked').each(function (idx) {
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
            body = this.tbodyQitem;
            tplItem = this.tplQitem;
            mItem = this.mQitem;
        } else if (type === 'R') {
            //ritem
            body = this.tbodyRitem;
            tplItem = this.tplRitem;
            mItem = this.mRitem;
        } else {
            //eitem
            body = this.etGetTab().find('tbody');
            tplItem = this.tplEitem;
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

    //onclick add on (edit)nav
    //must set id=new index
    onEtAdd() {

        this.etNavRemoveAct();

        //add tab
        var index = this.etableLen;
        var json = { Index: index };
        var newTab = $(Mustache.render(this.tplTabEtable, json));
        //debugger;
        this.mEtable.setNewIdByBox(newTab);    //set new row key !!
        _iSelect.setItems(this.TableId, this.tables, newTab); //set dropdown source
        this.tabEtable.append(newTab);

        //add nav
        //on click必須add/remove active class, 所以改用javascript !!
        var newNav = $(Mustache.render(this.tplNavEtable, json));
        this.navEtable.append(newNav);
        this.etableLen++;

        //focus new nav
        this.etFocusNav(newNav);

        //show edit table name(after nav added tab)
        this.etShowName(index);

        //reset
        //this.swapEitemCols();
    }

    async onEtDelete() {
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
            form2.find('.xu-tr').each(function () {
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

    onEtLeft() {
        _Nav.moveLeft(this.etGetNav());
        _Tab.moveLeft(this.etGetTab());

        //reset
        //this.swapEitemCols();
    }
    onEtRight() {
        _Nav.moveRight(this.etGetNav());
        _Tab.moveRight(this.etGetTab());

        //reset
        //_me.swapEitemCols();
    }

    etFocusNav(navObj: JQuery) {
        //debugger;
        //navObj.focus();
        navObj.find('a').click();
        //navObj.click();    
        //this.etGetNav(0).find('a').toggle(true);
        //obj.tab('show');
    }

    /*
    etGetObject (index) {
        return this.tabEtable.find('#divEtable' + index);
    }
    */

    //set(show) tableName at edit edit page
    //param {bool} reset: reset table list or not 
    etShowName(index: number) {
        var name = _iSelect.getText(this.TableId, this.etGetTab(index));
        if (name === '')
            name = '(Empty)';
        this.navEtable.find('li[data-index=' + index + '] a').text(name);
    }

    onChangeNowTable(index: number) {
        this.etShowName(index);
    }

    //set child not active
    etNavRemoveAct() {
        var nav = this.etGetNav();
        nav.removeClass(this.Active);
        this.tabEtable.find('.tab-pane.' + this.Active).removeClass(this.Active);
    }

    //onclick etable nav
    onEtNav(index: number) {
        //this.etNavRemoveAct();
        this.etableIdx = index;
    }

    //get edit edit active nav
    //return nav object
    etGetNav(index ?: number) {
        index = index || this.etableIdx;
        var find = '[data-index=' + index + ']';
        return this.navEtable.find('li' + find);
    }

    //get edit edit active tab
    //return tab object
    etGetTab(index ?: number) {
        index = index || this.etableIdx;
        return this.tabEtable.find('#divEtable' + index);
    }

    etGetForms() {
        return this.tabEtable.find('.x-form');
    }
    etGetForm(tabObj: JQuery) {
        return tabObj.find('.x-form');
    }

    /*
     * get eitem form by etable form
     */
    getEitemForm(etableForm: JQuery) {
        return etableForm.parent().find('.xu-form2');
    }
    //#endregion


    //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
    async onOpenEdit1(id: StrNum) {
        _me.crudE.mEditSetEditNo(1);
        await _me.crudE.onUpdateA(id);
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
    init: function () {
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
                { data: '_CrudFun' },
                { data: 'Status' },
			],
            columnDefs: [
                /*
				{ targets: [0], render: function (data, type, full, meta) {
                    return _me.crudR.dtCheck0(full.Id);
				}},
                */
				{ targets: [4], render: function (data, type, full, meta) {
                    return (data == 1)
                        ? `<button type="button" class="btn btn-link" data-onclick="_me.onOpenEdit1" data-args="${full.Id}">拖拉編輯</button> | ` +
                          `<button type="button" class="btn btn-link" data-onclick="_me.onDownTableSql" data-args="${full.Id}">下載Table SQL</button>`
                        : '';
				}},
				{ targets: [5], render: function (data, type, full, meta) {
                    var dis = (full.Status == 1) ? '' : 'disabled';
                    return `<button type="button" ${dis} class="btn btn-outline-secondary btn-sm" data-onclick="_me.onGenCrud" data-args="${full.Id}">產生CRUD</button>`;
				}},
                { targets: [7], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, false, true);
                }},
				{ targets: [8], render: function (data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
				}},
			],
        };

        const vo = _vo as GenCrudVo;
        var ary0 = new EditDto([null, vo.mQitem, vo.mRitem, vo.mEtable], $('#divEdit'));
        var ary1 = new EditDto([new EditOne(null, 'eform1'), vo.mUiItem], vo.divEdit1, '拖拉編輯');
        new CrudR(config, [ary0, ary1]);
	},

    //auto called !!
    fnAfterOpenEdit: async function (fun: FunEstr, json: Json) {
        const vo = _vo as GenCrudVo;
        var isEdit1 = vo.isEdit1();    //拖拉編輯
        _Prog.setBorder(!isEdit1);
        if (isEdit1)
            vo.fnAfterOpenEdit1(fun, json);
        else
            vo.fnAfterOpenEdit0(fun, json);
    },

    fnWhenSave: function (fun: FunEstr) {
        const vo = _vo as GenCrudVo;
        return vo.isEdit1()
            ? vo.fnWhenSave1(fun)
            : vo.fnWhenSave0(fun);
    },

    //#region auto called function
    fnAfterSwap: function (toRead: boolean) {
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