/**
 * 提供語法提示
 * @typedef {Object} Me
 * @property {CrudR} crudR
 * @property {CrudE} crudE
 * @property {EditOne} edit0
 * @property {EditMany} mQitem
 * @property {EditMany} mRitem
 * @property {EditMany} mEtable
 * @property {EditMany} mEitem
 * @property {EditMany} mUiItem
 * @property {UiMany} uiMany
 * @property {UiView} uiView
 */

/** @type {Me} */
var _me = {
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

        //constant
        _me.TableId = 'TableId';    //column name of TableId for many forms
        _me.Active = 'active';      //active class

        //maintain tables:
        //_me.edit0 = new EditOne();
        _me.mQitem = new EditMany('Id', 'tbodyQitem', 'tplQitem', '.xu-tr');
        _me.mRitem = new EditMany('Id', 'tbodyRitem', 'tplRitem', '.xu-tr');
        _me.mEtable = new EditMany('Id', null, 'tplTabEtable', '.x-form');
        _me.mEitem = new EditMany('Id', null, 'tplEitem', '.xu-tr');
        _me.mEtable.setChilds([_me.mEitem]);

        //edit2: initial edit one/many, rowsBox(參數2) 使用 eform
        _me.mUiItem = new EditMany('Id', 'eformUiItem', 'tplUiItem', '.xu-tr');

        //不同編輯畫面共用查詢畫面
        _me.divEdit1 = $('#divEdit1');
        var ary0 = new DtoEdit([null, _me.mQitem, _me.mRitem, _me.mEtable]);
        var ary1 = new DtoEdit([new EditOne(null, 'eform1'), _me.mUiItem], _me.divEdit1, '拖拉編輯');
        new CrudR(config, [ary0, ary1]);
        //new CrudR(config, [_me.edit0, _me.mQitem, _me.mRitem, _me.mEtable]);

        //_me.ritemChdIdx = 0;    //child index of Ritem
        _me.etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
        _me.eitemChdIdx = 0;    //child index of Eitem

        //custom function
        //_me.edit0.fnAfterLoadJson = _me.edit0_afterLoadJson;
        //_me.edit0.fnAfterOpenEdit = _me.edit0_afterOpenEdit;        
        //_me.edit0.fnWhenSave = _me.edit0_whenSave;
        //
        _me.mEtable.fnLoadRows = _me.mEtable_loadRows;
        _me.mEtable.fnGetUpdJson = _me.mEtable_getUpdJson;
        _me.mEtable.fnValid = _me.mEtable_valid;

        //Qitem(Q)
        _me.tplQitem = $('#tplQitem').html();
        _me.tbodyQitem = $('#tbodyQitem');

        //Ritem(R)
        _me.tplRitem = $('#tplRitem').html();
        _me.tbodyRitem = $('#tbodyRitem');

        //CrudEdit table(use nav)
        _me.navEtable = $('#navEtable');
        _me.tabEtable = $('#tabEtable');
        _me.tplNavEtable = $('#tplNavEtable').html();
        _me.tplTabEtable = $('#tplTabEtable').html();

        //Eitem(E)
        _me.tplEitem = $('#tplEitem').html();
        //_me.divEitemBody = $('#divEitemBody');

        //Item modal(for Q,R,E)
        _me.modalItems = $('#modalItems');    //modal for select items
        _me.divItemsBody = _me.modalItems.find('tbody');
        _me.tplModalItem = $('#tplModalItem').html();   //tpl of modal item row

        //variables
        _me.ritemTableId = '';  //now ritem table Id
        _me.tables = [];        //for table dropdownlist
        _me.etableLen = 0;      //edit table count(累加)
        _me.etableIdx = 0;      //now edit nav selected index
        _me.nowItemType = '';   //modal item type: R,E,S

        //_me.swapEitemCols();

        //#region *** for edit2 ***
        _me.modalImport = $('#modalUiImport');

        //custom function
        _me.mUiItem.fnLoadRows = _me.mUiItem_loadRows;
        _me.mUiItem.fnGetUpdJson = _me.mUiItem_getUpdJson;
        _me.mUiItem.fnValid = _me.mUiItem_valid;

        //initial uiMany
        _me.uiMany = new UiMany('.xu-ui-area', _me.mUiItem);

        //註刪button dragstart事件
        _me.divEdit1.on(EstrMouse.DragStart, '.xu-btn', function (e) {
            let itemType = $(e.target).data('type');
            _me.uiMany.startDragBtn(true, itemType);
        }).on(EstrMouse.DragEnd, function (e) {
            //不會觸發工作區的 dragEnd, 這裡必須寫
            _me.uiMany.onDragEnd(e);
        });
        //#endregion
	},

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

    getProjectId: function () {
        return _iselect.get('ProjectId', _me.eform0);
    },

    //auto called !!
    fnAfterOpenEdit: async function (fun, json) {
        var isEdit1 = _me.isEdit1();
        _prog.setBorder(!isEdit1);
        if (isEdit1)
            _me.fnAfterOpenEdit1(fun, json);
        else
            _me.fnAfterOpenEdit0(fun, json);
    },

    //set etable TableId(dropdown)
    //edit0_afterLoadJson: function (json) {
    fnAfterOpenEdit0: async function (fun, json) {
        //edit2會隱藏 prog border, 這裡打開        
        if (fun == EstrFun.Create) return;

        //set tables list, async call, send function parameter 
        if (!await _me.onChangeProject()) return;

        //set form0 tableId select 欄位
        //var form = _me.crudE.getEform0();
        //_iselect.set(_me.TableId, json[_me.TableId], form);

        //set tabEtable(s) tableId select 欄位
        var navRows = _me.crudE.getChildRows(json, _me.etableChdIdx);
        var navLen = (navRows == null) ? 0 : navRows.length;
        for (var i = 0; i < navLen; i++) {
            //set dropdown source
            var tabObj = _me.etGetTab(i);
            _iselect.setItems(_me.TableId, _me.tables, tabObj);

            //set value
            _iselect.set(_me.TableId, navRows[i][_me.TableId], tabObj);

            //show edit table name
            _me.etShowName(i);
        }
    },

    isEdit1: function () {
        return (_me.crudE.getEditNo() == 1);
    },

    fnWhenSave: function (fun) {
        return _me.isEdit1()
            ? _me.fnWhenSave1(fun)
            : _me.fnWhenSave0(fun);
    },

    //set sort
    fnWhenSave0: function (fun) {

        //qitem set sort
        _me.tbodyQitem.find('.xu-tr').each(function (i, item) {
            _itext.set('Sort', i, $(item));
        });

        //ritem set sort
        _me.tbodyRitem.find('.xu-tr').each(function (i, item) {
            _itext.set('Sort', i, $(item)); 
        });

        //etable/eitem set sort
        var error = '';
        var tableIds = [];
        _me.etGetForms().each(function (i, item) {
            //Etable不可重複
            var form = $(item);
            var tableId = _itext.get(_me.TableId, form);
            if (_array.find(tableIds, tableId) >= 0) {
                error = '維護的資料表(Etable)不可重複。';
                return false;   //break
            }

            //add tableIds[]
            tableIds[i] = tableId;

            //etable sort
            _itext.set('Sort', i, form);

            //eitem sort
            //var tbody = form.parent().find('tbody');
            _me.getEitemForm(form).find('.xu-tr').each(function (j, item2) {
                _itext.set('Sort', j, $(item2));    //set sort 
            });
        });
        return error;
    },

    //load etable
    mEtable_loadRows: function (rows) {
        //empty first
        _me.navEtable.empty();
        _me.tabEtable.empty();

        //null表示沒資料
        if (rows == null || rows.length == 0)
            return;

        //_me.etNavRemoveAct();

        //render etables & eitems
        //var eitemRows = _me.crudE.getChildRows(json, 0);   //已改為傳入rows, 不是json
        var eitemRows = _me.crudE.getChildRows(_me.mEtable.dataJson, 0);   //從dataJson讀取 !!
        for (var i = 0; i < rows.length; i++) {
            //add tab (only)
            var row = rows[i];
            _me.mEtable.loadRowByBox(_me.tabEtable, row, i);

            //add nav
            //on click必須add/remove active class, 所以改用javascript !!
            var newNav = $(Mustache.render(_me.tplNavEtable, { Index: i }));
            _me.navEtable.append(newNav);
            _me.etableLen++;

            //focus first tab, [0] is need !!
            if (i === 0)
                newNav.find('a')[0].click();

            //validate etable form
            var forms = _me.tabEtable.find('#divEtable' + i + ' form');
            var form = forms.first();
            _valid.init(form);

            //load Eitems & validate
            var form2 = forms.last();
            var rows2 = _json.filterRows(eitemRows, 'EtableId', _itext.get('Id', form));
            _me.mEitem.loadRowsByRsb(rows2, true, form2.find('tbody'));
            _valid.init(form2);
        }

        /*
        //最後再執行(因為裡面有非同步呼叫)
        //show edit table name(after nav added tab)
        for (var i = 0; i < navLen; i++) {
            _me.etShowName((i===0), i);
        }
        */
    },

    //GetUpdJson
    mEtable_getUpdJson: function (upKey) {
        //var upKey = _itext.get('Id', _me.crudE.getEform0());
        var rows = [];
        var eitems = [];
        _me.etGetForms().each(function (i, item) {
            //etable
            var form = $(item);
            rows[i] = _me.mEtable.getUpdRow(form); //edit table
            _me.mEtable.rowSetFkey(rows[i], upKey);

            //eitems
            var upKey2 = _itext.get('Id', form);
            var form2 = _me.getEitemForm(form);
            var rows2 = _me.mEitem.getUpdRows(upKey2, form2.find('tbody'));
            _json.appendRows(rows2, eitems);
            /*
            if (rows2 != null) {
                if (rows[i] == null)
                    rows[i] = {};
                _me.crudE.setChildRows(rows[i], 0, rows2);
            }
            */
        });
        return {
            _rows: rows,
            _deletes: _me.mEtable.getDeletes(),
            _childs: [{ _rows: eitems, _deletes: _me.mEitem.getDeletes()}],
        };
    },

    //return boolean
    mEtable_valid: function () {
        var status = true;
        _me.etGetForms().each(function (i, item) {
            //focus nav first, or will not work !!
            var form = $(item);
            //var nav = _me.etGetNav(form.data('index'));
            //_me.etFocusNav(nav);

            //validate etable
            status = form.valid();

            //validate eitem
            if (status)
                status = _me.getEitemForm(form).valid();

            if (!status) {
                //status = false;
                //_me.etableIdx = i;
                var idx = form.data('index');
                _me.etFocusNav(_me.etGetNav(idx));
                return false;   //break;
            }
        });
        return status;
    },

    /**
     * onclick generate crud
     * (如果在VS下產生DbAdm的CRUD會reload !!)
     */ 
    onGenCrud: async function (id) {
        /*
        var keys = _me.getCheckedTables();
        if (keys.length === 0)
            return;
        */
        if (await _tool.ansA('是否確定產生這個功能的CRUD程式?')) {
            await _ajax.getStrA('GenCrud', { id: id }, function (error) {
                _tool.msg(_str.isEmpty(error) ? '執行成功' : error);
            });
        }
    },

    //get checked table id array
	getCheckedTables: function () {
        var values = _icheck.getCheckeds(_me.crudR.divRead);
		if (values.length === 0)
			_tool.msg('請選取資料。');
		return values;
	},

    resetEdits: function () {
        _me.navEtable.empty();
        _me.tabEtable.empty();
        _me.etableLen = 0;
    },

    //onclick Create(table)
    onCreate: function () {
        _me.crudR.onCreate();

        //init master edit
        _me.resetEdits();
        //_me.addEdit();
    },

    onQitemAdd: function () {
        var box = $(Mustache.render(_me.tplQitem, {}));
        _form.loadRow(box, {});
        _me.mQitem.setNewIdByBox(box);
        _me.tbodyQitem.append(box);
    },

    onRitemAdd: function () {
        var box = $(Mustache.render(_me.tplRitem, {}));
        _form.loadRow(box, {});
        _me.mRitem.setNewIdByBox(box);
        _me.tbodyRitem.append(box);
    },

    //on change project id
    //多個地方呼叫
    ////fnCallback: (optional) callback function
    //return {bool}
    //onChangeProject: async function (fnCallback) {
    onChangeProject: async function () {
        var pid = _me.getProjectId();
        if (_str.isEmpty(pid)) return false;

        var rows = await _ajax.getJsonA('/XpCode/Tables', { projectId: pid });
        if (_array.isEmpty(rows)) return false;

        //case of ok
        _me.tables = rows;

        //set item modal tables
        var obj = _obj.get(_me.TableId, _me.modalItems);
        _iselect.setItemsO(obj, _me.tables);
        _iselect.setO(obj, '');
    
        //if (fnCallback !== undefined)
        //    fnCallback();
        return true;
    },

    //on open item modal
    //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
    onOpenItem: function (type) {
        //如果為主table, 則不必重新讀取
        //_me.initRitemDt();

        /*
        //get tableId
        var form = _me.eform0;
        var tableId = _iselect.get(_me.TableId, form);

        //get編輯畫面tableId
        if (tableId === '') {
            _tool.msg('請先選取資料表。');
            return;
        }
        */

        //set nowItemType
        _me.nowItemType = type;

        /*
        //set modal tableId if need
        var obj = _obj.get(_me.TableId, _me.modalItems);
        var modalTableId = _iselect.getO(obj);
        if (modalTableId === '')
            _iselect.setItemsO(obj, _me.tables);

        //set modal tableId dropdown list if need
        if (tableId !== modalTableId) {
            _iselect.setO(obj, tableId);
            _me.changeItemTable(tableId);
        }
        */

        //show modal
        _modal.show(_me.modalItems);
    },   

    //on change tableId at ritem modal
    onChangeItemTable: async function () {
        await _me.changeItemTableA(_iselect.getO(_fun.getMe(true)));
    },

    //called by 2 places
    changeItemTableA: async function (tableId) {
        await _ajax.getJsonA('GetColumns', { tableId: tableId }, function (rows) {
            _me.divItemsBody.empty();
            for (var i = 0; i < rows.length; i++) {
                _me.divItemsBody.append($(Mustache.render(_me.tplModalItem, rows[i])));
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
        //var crudId = _itext.get('Id', _me.crudE.getEform0());
        var rows = [];
        _me.divItemsBody.find(':checkbox:checked').each(function (idx) {
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
            _tool.msg('請先選取資料。');
            return;
        }

        //debugger;
        var type = _me.nowItemType;
        var body, tplItem;
        var mItem = null;   //editMany 
        if (type === 'Q') {
            //qitem
            body = _me.tbodyQitem;
            tplItem = _me.tplQitem;
            mItem = _me.mQitem;
        } else if (type === 'R') {
            //ritem
            body = _me.tbodyRitem;
            tplItem = _me.tplRitem;
            mItem = _me.mRitem;
        } else {
            //eitem
            body = _me.etGetTab().find('tbody');
            tplItem = _me.tplEitem;
            mItem = _me.mEitem;
        }

        //append query rows
        for (var i = 0; i < rowLen; i++) {
            var box = $(Mustache.render(tplItem, rows[i]));
            _form.loadRow(box, rows[i]);
            //if (mItem != null)
            //    mItem.boxSetMapId(box, crudId);
            mItem.setNewIdByBox(box);
            body.append(box);
        }

        //show
        _modal.hide(_me.modalItems);
    },

    //onclick add on (edit)nav
    //must set id=new index
    onEtAdd: function () {
        
        _me.etNavRemoveAct();

        //add tab
        var index = _me.etableLen;
        var json = { Index: index };
        var newTab = $(Mustache.render(_me.tplTabEtable, json));
        debugger;
        _me.mEtable.setNewIdByBox(newTab);    //set new row key !!
        _iselect.setItems(_me.TableId, _me.tables, newTab); //set dropdown source
        _me.tabEtable.append(newTab);

        //add nav
        //on click必須add/remove active class, 所以改用javascript !!
        var newNav = $(Mustache.render(_me.tplNavEtable, json));
        _me.navEtable.append(newNav);
        _me.etableLen++;

        //focus new nav
        _me.etFocusNav(newNav);

        //show edit table name(after nav added tab)
        _me.etShowName(index);

        //reset
        //_me.swapEitemCols();
    },

    onEtDelete: function () {
        //check
        if (_me.etableLen == 0)
            return;

        //confirm
        _tool.ans('是否移除畫面資料?', function () {
            var nav = _me.etGetNav();
            var tab = _me.etGetTab();

            //get left/right one
            var nav2;
            var index = (_me.etableIdx == _me.etableLen - 1)
                ? _me.etableIdx - 1 : _me.etableIdx;
            if (index >= 0) {
                nav2 = (index === _me.etableIdx)
                    ? nav.next() : nav.prev();
            }

            //=== delete rows ===
            //delete etable row
            var form = _me.etGetForm(tab);
            var key = _me.mEtable.getKey(form);
            _me.mEtable.deleteRow(key);

            //delete eitem rows
            var form2 = _me.getEitemForm(form);
            form2.find('.xu-tr').each(function () {
                key = _me.mEitem.getKey($(this));
                _me.mEitem.deleteRow(key);
            });
            //===

            //delete objects
            _me.etNavRemoveAct();
            tab.remove();
            nav.remove();
            _me.etableLen--;
            etableIdx = index;

            //focus new tab
            if (index >= 0)
                _me.etFocusNav(nav2);
        });
    },

    onEtLeft: function () {
        _nav.moveLeft(_me.etGetNav());
        _tab.moveLeft(_me.etGetTab());

        //reset
        //_me.swapEitemCols();
    },
    onEtRight: function () {
        _nav.moveRight(_me.etGetNav());
        _tab.moveRight(_me.etGetTab());

        //reset
        //_me.swapEitemCols();
    },

    etFocusNav: function (navObj) {
        //debugger;
        //navObj.focus();
        navObj.find('a').click();    
        //navObj.click();    
        //_me.etGetNav(0).find('a').toggle(true);
        //obj.tab('show');
    },

    /*
    etGetObject: function (index) {
        return _me.tabEtable.find('#divEtable' + index);
    },
    */

    //set(show) tableName at edit edit page
    //param {bool} reset: reset table list or not 
    etShowName: function (index) {
        var name = _iselect.getText(_me.TableId, _me.etGetTab(index));
        if (name === '')
            name = '(Empty)';
        _me.navEtable.find('li[data-index=' + index + '] a').text(name);
    },

    onChangeNowTable: function (index) {
        _me.etShowName(index);
    },

    //set child not active
    etNavRemoveAct: function () {
        var nav = _me.etGetNav();
        nav.removeClass(_me.Active);
        _me.tabEtable.find('.tab-pane.' + _me.Active).removeClass(_me.Active);
    }, 

    //onclick etable nav
    onEtNav: function (index) {
        //_me.etNavRemoveAct();
        _me.etableIdx = index;
    },

    //get edit edit active nav
    //return nav object
    etGetNav: function (index) {
        index = index || _me.etableIdx;
        var find = '[data-index=' + index + ']';
        return _me.navEtable.find('li' + find);
    },

    //get edit edit active tab
    //return tab object
    etGetTab: function (index) {
        index = index || _me.etableIdx;
        return _me.tabEtable.find('#divEtable' + index);
    },

    etGetForms: function () {
        return _me.tabEtable.find('.x-form');
    },
    etGetForm: function (tabObj) {
        return tabObj.find('.x-form');
    },

    /*
     * get eitem form by etable form
     */ 
    getEitemForm: function (etableForm) {
        return etableForm.parent().find('.xu-form2');
    },
    //#endregion


    //#region for 拖拉編輯(分離檔案無法使用 IntelliSense)
    onOpenEdit1: async function (id) {
        _me.crudE.setEditNo(1);
        await _me.crudE.onUpdateA(id);
    },

    //下載 table sql
    onDownTableSql: async function (id) {
        if (await _tool.ansA('是否確定下載這個功能的 Table SQL ?')) {
            await _ajax.getStrA('DownTableSql', { id: id }, function (result) {
                _str.saveFile(result, 'table.txt');
            });
        }
    },

    //#region read form function
    //onclick generate crud(產生在主機)
    /*
    onGenCrud: function (id) {
        await _ajax.getStrA('GenCrud', { id: id }, function (error) {
            _tool.msg(_str.isEmpty(error) ? '執行成功' : error);
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
        _itext.set('Import', '', _me.modalImport);

        //open modal
        _modal.show(_me.modalImport);
    },

    //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
    //called by modalImprot
    onImport: async function () {
        var value = _itext.get('Import', _me.modalImport).trim();
        if (_str.isEmpty(value)) {
            _tool.msg('匯入資料不可空白。');
            return;
        }

        //加入大括號 for json 格式
        //if (value.substring(0, 1) != '{')
        //    value = '{' + value + '}';

        //string to json
        var jsons = _str.toJson(value);
        if (jsons == null) {
            _tool.msg('匯入資料必須是Json格式。');
            return;
        }

        await _me.uiMany.loadJsonsA(jsons);
        _modal.hide(_me.modalImport);
    },

    //export 前端 edit form to json
    onExport: async function () {
        //get jsons
        let jsons = _me.uiMany.getJsons();
        if (_json.isEmpty(jsons)) {
            _tool.msg('目前畫面無任何資料。');
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
        var values = _icheck.getCheckeds(_me.crudR.divRead);
        if (values.length > 0)
            window.location = 'GenJson?key=' + values.join(',');
        else
            _tool.msg('請先選取資料。');
    },
    */

    //#region auto called function
    fnAfterSwap: function (toRead) {
        var tbar = $('.xd-prog-tbar');
        if (toRead) {
            _obj.hide(tbar);
            //_me.isEdit2 = false;    //還原
        } else {
            _obj.show(tbar);
            //_obj.showByStatus($('.xd-export'), _me.isEdit2);
        }
    },

    //reset when create
    fnAfterOpenEdit1: function (fun, json) {
        _me.uiMany.reset();
        var isAdd = (fun == EstrFun.Create);
        _me.uiMany.setEdit(isAdd || (fun == EstrFun.Update));
    },

    /**
     * ?? auto called
     * jsPlumb line container must visible when rendering
     * see _me.crudE.js _updateOrViewA()
     * param {string} fun
     * param {string} key
     * returns {bool}
     */
    zz_fnUpdateOrViewA: async function (fun, key) {
        var act = (fun == EstrFun.Update)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _ajax.getJsonA(act, { key: key }, function (json) {
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
    fnWhenSave1: function (fun) {
        //get changed box ids
        let uiView = _me.uiMany.uiView;
        let boxJsons = uiView.getChgBoxJsons();
        boxLen = boxJsons.length;
        if (boxLen == 0) return '';

        //reset BoxId, ChildNo, Sort
        let mUiItem = _me.mUiItem;
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
                    _itext.set('BoxId', boxId, rb);
                    _itext.set('ChildNo', childNo, rb);
                    _itext.set('Sort', k + 1, rb);
                }
            }
        }
        return '';
    },
    //#endregion 

    //#region mUiItem custom function
    //load items
    mUiItem_loadRows: async function (rows) {
        await _me.uiMany.loadRowsA(rows);
    },

    //getUpdJson
    mUiItem_getUpdJson: function (upKey) {
        return _me.mUiItem.getUpdJsonByRsb(upKey);
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