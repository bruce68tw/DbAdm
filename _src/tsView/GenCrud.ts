//import Mustache from "mustache";
import UiMany from "./UiMany.js";
import { CrudR, EditDto, EditMany, EditOne, FunEstr, MouseEstr, _Ajax,
    _Array, _Edit, _Form, _Fun, _Json, _Modal, _Nav, _Obj, _Prog, _Str,
    _Tab, _Tool, _Valid, _iCheck, _iSelect, _iText
} from "@baseJs";

_m2 = {
    init: function () {
        //constant
        _m2.TableId = 'TableId';    //column name of TableId for many forms
        _m2.Active = 'active';      //active class

        //maintain tables:
        //_m2.edit0 = new EditOne();
        _m2.mQitem = new EditMany('Id', 'tbodyQitem', 'tplQitem', '.xu-tr');
        _m2.mRitem = new EditMany('Id', 'tbodyRitem', 'tplRitem', '.xu-tr');
        _m2.mEtable = new EditMany('Id', null, 'tplTabEtable', '.x-form');
        _m2.mEitem = new EditMany('Id', null, 'tplEitem', '.xu-tr');
        _m2.mEtable.setChilds([_m2.mEitem]);

        //edit2: initial edit one/many, rowsBox(參數2) 使用 eform
        _m2.mUiItem = new EditMany('Id', 'eformUiItem', 'tplUiItem', '.xu-tr');

        //不同編輯畫面共用查詢畫面
        _m2.divEdit1 = $('#divEdit1');
        //new CrudR(config, [_m2.edit0, _m2.mQitem, _m2.mRitem, _m2.mEtable]);

        //_m2.ritemChdIdx = 0;    //child index of Ritem
        _m2.etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
        _m2.eitemChdIdx = 0;    //child index of Eitem

        //custom function
        //_m2.edit0.fnAfterLoadJson = _m2.edit0_afterLoadJson;
        //_m2.edit0.fnAfterOpenEdit = _m2.edit0_afterOpenEdit;        
        //_m2.edit0.fnWhenSave = _m2.edit0_whenSave;
        //
        _m2.mEtable.fnLoadRows = _m2.mEtable_loadRows;
        _m2.mEtable.fnGetUpdJson = _m2.mEtable_getUpdJson;
        _m2.mEtable.fnValid = _m2.mEtable_valid;

        //Qitem(Q)
        _m2.tplQitem = $('#tplQitem').html();
        _m2.tbodyQitem = $('#tbodyQitem');

        //Ritem(R)
        _m2.tplRitem = $('#tplRitem').html();
        _m2.tbodyRitem = $('#tbodyRitem');

        //CrudEdit table(use nav)
        _m2.navEtable = $('#navEtable');
        _m2.tabEtable = $('#tabEtable');
        _m2.tplNavEtable = $('#tplNavEtable').html();
        _m2.tplTabEtable = $('#tplTabEtable').html();

        //Eitem(E)
        _m2.tplEitem = $('#tplEitem').html();
        //_m2.divEitemBody = $('#divEitemBody');

        //Item modal(for Q,R,E)
        _m2.modalItems = $('#modalItems');    //modal for select items
        _m2.divItemsBody = _m2.modalItems.find('tbody');
        _m2.tplModalItem = $('#tplModalItem').html();   //tpl of modal item row

        //variables
        _m2.ritemTableId = '';  //now ritem table Id
        _m2.tables = [];        //for table dropdownlist
        _m2.etableLen = 0;      //edit table count(累加)
        _m2.etableIdx = 0;      //now edit nav selected index
        _m2.nowItemType = '';   //modal item type: R,E,S

        //_m2.swapEitemCols();

        //#region *** for edit2 ***
        _m2.modalImport = $('#modalUiImport');

        //custom function
        _m2.mUiItem.fnLoadRows = _m2.mUiItem_loadRows;
        _m2.mUiItem.fnGetUpdJson = _m2.mUiItem_getUpdJson;
        _m2.mUiItem.fnValid = _m2.mUiItem_valid;

        //initial uiMany
        _m2.uiMany = new UiMany('.xu-ui-area', _m2.mUiItem);

        //註刪button dragstart事件
        _m2.divEdit1.on(MouseEstr.DragStart, '.xu-btn', function (e) {
            let itemType = $(e.target).data('type');
            _m2.uiMany.startDragBtn(true, itemType);
        }).on(MouseEstr.DragEnd, function (e) {
            //不會觸發工作區的 dragEnd, 這裡必須寫
            _m2.uiMany.onDragEnd(e);
        });
        //#endregion

        /*
        //reset eitem columns: re show/hide eitem layoutcols, width property
        swapEitemCols: function () {
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
    },

    getProjectId: function () {
        return _iSelect.get('ProjectId', _me.eform0);
    },

    //auto called !!
    fnAfterOpenEdit: async function (fun: FunEstr, json:Json) {
        var isEdit1 = _m2.isEdit1();    //拖拉編輯
        _Prog.setBorder(!isEdit1);
        if (isEdit1)
            _m2.fnAfterOpenEdit1(fun, json);
        else
            _m2.fnAfterOpenEdit0(fun, json);
    },

    //set etable TableId(dropdown)
    //edit0_afterLoadJson: function (json) {
    fnAfterOpenEdit0: async function (fun: FunEstr, json: Json) {
        //edit2會隱藏 prog border, 這裡打開        
        if (fun == FunEstr.Create) return;

        //set tables list, async call, send function parameter 
        if (!await _m2.onChangeProject()) return;

        //set form0 tableId select 欄位
        //var form = _me.crudE.getEform0();
        //_iSelect.set(_m2.TableId, json[_m2.TableId], form);

        //set tabEtable(s) tableId select 欄位
        var navRows = _Edit.getChildRows(json, _m2.etableChdIdx);
        var navLen = (navRows == null) ? 0 : navRows.length;
        for (var i = 0; i < navLen; i++) {
            //set dropdown source
            var tabObj = _m2.etGetTab(i);
            _iSelect.setItems(_m2.TableId, _m2.tables, tabObj);

            //set value
            _iSelect.set(_m2.TableId, navRows[i][_m2.TableId], tabObj);

            //show edit table name
            _m2.etShowName(i);
        }
    },

    //reset when create
    fnAfterOpenEdit1: function (fun: FunEstr, json: Json) {
        _m2.uiMany.reset();
        var isAdd = (fun == FunEstr.Create);
        _m2.uiMany.setEdit(isAdd || (fun == FunEstr.Update));
        //_btn.setEdit($('.xd-btns').find('button'), true);
    },

    //拖拉編輯
    isEdit1: function () {
        return (_me.crudE.mEditGetEditNo() == 1);
    },

    fnWhenSave: function (fun: FunEstr) {
        return _m2.isEdit1()
            ? _m2.fnWhenSave1(fun)
            : _m2.fnWhenSave0(fun);
    },

    //set sort
    fnWhenSave0: function (fun: FunEstr) {

        //qitem set sort
        _m2.tbodyQitem.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i, $(item));
        });

        //ritem set sort
        _m2.tbodyRitem.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i, $(item)); 
        });

        //etable/eitem set sort
        var error = '';
        var tableIds = [];
        _m2.etGetForms().each(function (i:number, item:Elm) {
            //Etable不可重複
            var form = $(item);
            var tableId = _iText.get(_m2.TableId, form);
            if (_Array.find(tableIds, tableId) >= 0) {
                error = '維護的資料表(Etable)不可重複。';
                return false;   //break
            }

            //add tableIds[]
            tableIds[i] = tableId;

            //etable sort
            _iText.set('Sort', i, form);

            //eitem sort
            //var tbody = form.parent().find('tbody');
            _m2.getEitemForm(form).find('.xu-tr').each(function (j, item2) {
                _iText.set('Sort', j, $(item2));    //set sort 
            });
        });
        return error;
    },

    //load etable
    mEtable_loadRows: function (rows:Json[]) {
        //empty first
        _m2.navEtable.empty();
        _m2.tabEtable.empty();

        //null表示沒資料
        if (rows == null || rows.length == 0)
            return;

        //_m2.etNavRemoveAct();

        //render etables & eitems
        //var eitemRows = _Edit.getChildRows(json, 0);   //已改為傳入rows, 不是json
        var eitemRows = _Edit.getChildRows(_m2.mEtable.dataJson, 0);   //從dataJson讀取 !!
        for (var i = 0; i < rows.length; i++) {
            //add tab (only)
            var row = rows[i];
            _m2.mEtable.loadRowByBox(_m2.tabEtable, row, i);

            //add nav
            //on click必須add/remove active class, 所以改用javascript !!
            var newNav = $(Mustache.render(_m2.tplNavEtable, { Index: i }));
            _m2.navEtable.append(newNav);
            _m2.etableLen++;

            //focus first tab, [0] is need !!
            if (i === 0)
                newNav.find('a')[0].click();

            //validate etable form
            var forms = _m2.tabEtable.find('#divEtable' + i + ' form');
            var form = forms.first();
            _Valid.init(form);

            //load Eitems & validate
            var form2 = forms.last();
            var rows2 = _Json.filterRows(eitemRows, 'EtableId', _iText.get('Id', form));
            _m2.mEitem.loadRowsByRsb(rows2, true, form2.find('tbody'));
            _Valid.init(form2);
        }

        /*
        //最後再執行(因為裡面有非同步呼叫)
        //show edit table name(after nav added tab)
        for (var i = 0; i < navLen; i++) {
            _m2.etShowName((i===0), i);
        }
        */
    },

    //GetUpdJson
    mEtable_getUpdJson: function (upKey:StrNum) {
        //var upKey = _iText.get('Id', _m2.crudE.getEform0());
        var rows = [];
        var eitems = [];
        _m2.etGetForms().each(function (i, item) {
            //etable
            var form = $(item);
            rows[i] = _m2.mEtable.getUpdRow(form); //edit table
            _m2.mEtable.rowSetFkey(rows[i], upKey);

            //eitems
            var upKey2 = _iText.get('Id', form);
            var form2 = _m2.getEitemForm(form);
            var rows2 = _m2.mEitem.getUpdRows(upKey2, form2.find('tbody'));
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
            _deletes: _m2.mEtable.getDeletes(),
            _childs: [{ _rows: eitems, _deletes: _m2.mEitem.getDeletes()}],
        };
    },

    /**
     * error時顯示對應的table page
     * return boolean
     */ 
    mEtable_valid: function () {
        var status = true;
        _m2.etGetForms().each(function (i:number, item:Elm) {
            //focus nav first, or will not work !!
            var form = $(item);
            //var nav = _m2.etGetNav(form.data('index'));
            //_m2.etFocusNav(nav);

            //validate etable
            status = form.valid();

            //validate eitem
            if (status)
                status = _m2.getEitemForm(form).valid();

            if (!status) {
                //status = false;
                //_m2.etableIdx = i;
                var idx = form.data('index');
                _m2.etFocusNav(_m2.etGetNav(idx));
                return false;   //break;
            }
        });
        return status;
    },

    /**
     * onclick generate crud
     * (如果在VS下產生DbAdm的CRUD會reload !!)
     */ 
    onGenCrud: async function (id:StrNum) {
        /*
        var keys = _m2.getCheckedTables();
        if (keys.length === 0)
            return;
        */
        if (await _Tool.ansA('是否確定產生這個功能的CRUD程式?')) {
            await _Ajax.getStrA('GenCrud', { id: id }, function (error) {
                _Tool.msg(_Str.isEmpty(error) ? '執行成功' : error);
            });
        }
    },

    //get checked table id array
	getCheckedTables: function () {
        var values = _iCheck.getCheck0Values(_me.crudR.divRead);
		if (values.length === 0)
			_Tool.msg('請選取資料。');
		return values;
	},

    resetEdits: function () {
        _m2.navEtable.empty();
        _m2.tabEtable.empty();
        _m2.etableLen = 0;
    },

    //onclick Create(table)
    onCreate: function () {
        _me.crudR.onCreate();

        //init master edit
        _m2.resetEdits();
        //_m2.addEdit();
    },

    onQitemAdd: function () {
        var box = $(Mustache.render(_m2.tplQitem, {}));
        _Form.loadRow(box, {});
        _m2.mQitem.setNewIdByBox(box);
        _m2.tbodyQitem.append(box);
    },

    onRitemAdd: function () {
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
    onChangeProject: async function () {
        var pid = _m2.getProjectId();
        if (_Str.isEmpty(pid)) return false;

        var rows = await _Ajax.getJsonsA('/XpCode/Tables', { projectId: pid });
        if (_Array.isEmpty(rows)) return false;

        //case of ok
        _m2.tables = rows;

        //set item modal tables
        var obj = _Obj.get(_m2.TableId, _m2.modalItems);
        _iSelect.setItemsO(obj, _m2.tables);
        _iSelect.setO(obj, '');
    
        //if (fnCallback !== undefined)
        //    fnCallback();
        return true;
    },

    //on open item modal
    //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
    onOpenItem: function (type:string) {
        //如果為主table, 則不必重新讀取
        //_m2.initRitemDt();

        /*
        //get tableId
        var form = _m2.eform0;
        var tableId = _iSelect.get(_m2.TableId, form);

        //get編輯畫面tableId
        if (tableId === '') {
            _Tool.msg('請先選取資料表。');
            return;
        }
        */

        //set nowItemType
        _m2.nowItemType = type;

        /*
        //set modal tableId if need
        var obj = _obj.get(_m2.TableId, _m2.modalItems);
        var modalTableId = _iSelect.getO(obj);
        if (modalTableId === '')
            _iSelect.setItemsO(obj, _m2.tables);

        //set modal tableId dropdown list if need
        if (tableId !== modalTableId) {
            _iSelect.setO(obj, tableId);
            _m2.changeItemTable(tableId);
        }
        */

        //show modal
        _Modal.show(_m2.modalItems);
    },   

    //on change tableId at ritem modal
    onChangeItemTable: async function () {
        await _m2.changeItemTableA(_iSelect.getO(_Fun.getMe()));
    },

    //called by 2 places
    changeItemTableA: async function (tableId:string) {
        await _Ajax.getJsonA('GetColumns', { tableId: tableId }, function (rows) {
            _m2.divItemsBody.empty();
            for (var i = 0; i < rows.length; i++) {
                _m2.divItemsBody.append($(Mustache.render(_m2.tplModalItem, rows[i])));
            }
        });
    },

    //?? delegate: item modal 過濾查詢結果
    fnItemDtGetRows: function (result) {
        //result.data

        return result.data;
    },

    //onclick ok at Item(R/Q/E) modal
    onItemModalOk: function () {
        //get checked columns list
        //var crudId = _iText.get('Id', _m2.crudE.getEform0());
        var rows = [];
        _m2.divItemsBody.find(':checkbox:checked').each(function (idx) {
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
        var type = _m2.nowItemType;
        var body, tplItem;
        var mItem = null;   //editMany 
        if (type === 'Q') {
            //qitem
            body = _m2.tbodyQitem;
            tplItem = _m2.tplQitem;
            mItem = _m2.mQitem;
        } else if (type === 'R') {
            //ritem
            body = _m2.tbodyRitem;
            tplItem = _m2.tplRitem;
            mItem = _m2.mRitem;
        } else {
            //eitem
            body = _m2.etGetTab().find('tbody');
            tplItem = _m2.tplEitem;
            mItem = _m2.mEitem;
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
        _Modal.hide(_m2.modalItems);
    },

    //onclick add on (edit)nav
    //must set id=new index
    onEtAdd: function () {
        
        _m2.etNavRemoveAct();

        //add tab
        var index = _m2.etableLen;
        var json = { Index: index };
        var newTab = $(Mustache.render(_m2.tplTabEtable, json));
        //debugger;
        _m2.mEtable.setNewIdByBox(newTab);    //set new row key !!
        _iSelect.setItems(_m2.TableId, _m2.tables, newTab); //set dropdown source
        _m2.tabEtable.append(newTab);

        //add nav
        //on click必須add/remove active class, 所以改用javascript !!
        var newNav = $(Mustache.render(_m2.tplNavEtable, json));
        _m2.navEtable.append(newNav);
        _m2.etableLen++;

        //focus new nav
        _m2.etFocusNav(newNav);

        //show edit table name(after nav added tab)
        _m2.etShowName(index);

        //reset
        //_m2.swapEitemCols();
    },

    onEtDelete: function () {
        //check
        if (_m2.etableLen == 0)
            return;

        //confirm
        _Tool.ans('是否移除畫面資料?', function () {
            var nav = _m2.etGetNav();
            var tab = _m2.etGetTab();

            //get left/right one
            var nav2;
            var index = (_m2.etableIdx == _m2.etableLen - 1)
                ? _m2.etableIdx - 1 : _m2.etableIdx;
            if (index >= 0) {
                nav2 = (index === _m2.etableIdx)
                    ? nav.next() : nav.prev();
            }

            //=== delete rows ===
            //delete etable row
            var form = _m2.etGetForm(tab);
            var key = _m2.mEtable.getKey(form);
            _m2.mEtable.deleteRow(key);

            //delete eitem rows
            var form2 = _m2.getEitemForm(form);
            form2.find('.xu-tr').each(function () {
                key = _m2.mEitem.getKey($(this));
                _m2.mEitem.deleteRow(key);
            });
            //===

            //delete objects
            _m2.etNavRemoveAct();
            tab.remove();
            nav.remove();
            _m2.etableLen--;
            _m2.etableIdx = index;

            //focus new tab
            if (index >= 0)
                _m2.etFocusNav(nav2);
        });
    },

    onEtLeft: function () {
        _Nav.moveLeft(_m2.etGetNav());
        _Tab.moveLeft(_m2.etGetTab());

        //reset
        //_m2.swapEitemCols();
    },
    onEtRight: function () {
        _Nav.moveRight(_m2.etGetNav());
        _Tab.moveRight(_m2.etGetTab());

        //reset
        //_me.swapEitemCols();
    },

    etFocusNav: function (navObj: JQuery) {
        //debugger;
        //navObj.focus();
        navObj.find('a').click();    
        //navObj.click();    
        //_m2.etGetNav(0).find('a').toggle(true);
        //obj.tab('show');
    },

    /*
    etGetObject: function (index) {
        return _m2.tabEtable.find('#divEtable' + index);
    },
    */

    //set(show) tableName at edit edit page
    //param {bool} reset: reset table list or not 
    etShowName: function (index:number) {
        var name = _iSelect.getText(_m2.TableId, _m2.etGetTab(index));
        if (name === '')
            name = '(Empty)';
        _m2.navEtable.find('li[data-index=' + index + '] a').text(name);
    },

    onChangeNowTable: function (index: number) {
        _m2.etShowName(index);
    },

    //set child not active
    etNavRemoveAct: function () {
        var nav = _m2.etGetNav();
        nav.removeClass(_m2.Active);
        _m2.tabEtable.find('.tab-pane.' + _m2.Active).removeClass(_m2.Active);
    }, 

    //onclick etable nav
    onEtNav: function (index: number) {
        //_m2.etNavRemoveAct();
        _m2.etableIdx = index;
    },

    //get edit edit active nav
    //return nav object
    etGetNav: function (index: number) {
        index = index || _m2.etableIdx;
        var find = '[data-index=' + index + ']';
        return _m2.navEtable.find('li' + find);
    },

    //get edit edit active tab
    //return tab object
    etGetTab: function (index: number) {
        index = index || _m2.etableIdx;
        return _m2.tabEtable.find('#divEtable' + index);
    },

    etGetForms: function () {
        return _m2.tabEtable.find('.x-form');
    },
    etGetForm: function (tabObj) {
        return tabObj.find('.x-form');
    },

    /*
     * get eitem form by etable form
     */
    getEitemForm: function (etableForm: JQuery) {
        return etableForm.parent().find('.xu-form2');
    },
    //#endregion


    //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
    onOpenEdit1: async function (id:StrNum) {
        _me.crudE.mEditSetEditNo(1);
        await _me.crudE.onUpdateA(id);
    },

    //下載 table sql
    onDownTableSql: async function (id: StrNum) {
        if (await _Tool.ansA('是否確定下載這個功能的 Table SQL ?')) {
            await _Ajax.getStrA('DownTableSql', { id: id }, function (result) {
                _Str.saveFile(result, 'table.txt');
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
    onDownCrud: function () {

    },

    //#endregion

    //#region edit form function
    //on click open import modal
    onOpenImport: function () {
        //clear first
        _iText.set('Import', '', _m2.modalImport);

        //open modal
        _Modal.show(_m2.modalImport);
    },

    //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
    //called by modalImprot
    onImport: async function () {
        var value = _iText.get('Import', _m2.modalImport).trim();
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

        await _m2.uiMany.loadJsonsA(jsons);
        _Modal.hide(_m2.modalImport);
    },

    //export 前端 edit form to json
    onExport: async function () {
        //get jsons
        let jsons = _m2.uiMany.getJsons();
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
    fnAfterSwap: function (toRead:boolean) {
        var tbar = $('.xd-prog-tbar');
        if (toRead) {
            _Obj.hide(tbar);
            //_m2.isEdit2 = false;    //還原
        } else {
            _Obj.show(tbar);
            //_obj.showByStatus($('.xd-export'), _m2.isEdit2);
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
    zz_fnUpdateOrViewA: async function (fun: FunEstr, key:StrNum) {
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
    },

    /**
     * auto called
     * 重設 uiItem的 BoxId、ChildNo、Sort
     * return {string} error msg if any
     */
    fnWhenSave1: function (fun: FunEstr) {
        //get changed box ids
        let uiView = _m2.uiMany.uiView;
        let boxJsons = uiView.getChgBoxJsons();
        let boxLen = boxJsons.length;
        if (boxLen == 0) return '';

        //reset BoxId, ChildNo, Sort
        let mUiItem = _m2.mUiItem;
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
                    _iText.set('Sort', k + 1, rb);
                }
            }
        }
        return '';
    },
    //#endregion 

    //#region mUiItem custom function
    //load items
    mUiItem_loadRows: async function (rows:Json[]) {
        await _m2.uiMany.loadRowsA(rows);
    },

    //getUpdJson
    mUiItem_getUpdJson: function (upKey:StrNum) {
        return _m2.mUiItem.getUpdJsonByRsb(upKey);
    },

    //return boolean
    mUiItem_valid: function () {
        return true;
    },

    /*
    //return boolean
    mLine_valid: function () {
        return true;
    },
    */
    //#endregion

    //#endregion
}; //class

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

        _m2.init();

        var ary0 = new EditDto([null, _m2.mQitem, _m2.mRitem, _m2.mEtable], $('#divEdit'));
        var ary1 = new EditDto([new EditOne(null, 'eform1'), _m2.mUiItem], _m2.divEdit1, '拖拉編輯');
        new CrudR(config, [ary0, ary1]);
	},
};