var _me = {
    init: function () {
		//datatable config
		var config = {
			columns: [
                { data: '_F1' },
                { data: 'ProjectCode' },
				{ data: 'ProgCode' },
                { data: 'ProgName' },
                { data: 'IsUi' },
                { data: 'Created' },
                { data: '_CrudFun' },
                { data: 'Status' },
			],
			columnDefs: [
				{ targets: [0], render: function (data, type, full, meta) {
                    return _me.crudR.dtCheck0(full.Id);
				}},
				{ targets: [4], render: function (data, type, full, meta) {
                    return _me.crudR.dtYesEmpty(data);
				}},
                { targets: [6], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
				{ targets: [7], render: function (data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
				}},
			],
        };

        //constant
        _me.TableId = 'TableId';    //column name of TableId for many forms
        _me.Active = 'active';      //active class

        //maintain tables:
        _me.edit0 = new EditOne();
        _me.mQitem = new EditMany('Id', 'tbodyQitem', 'tplQitem', '.xu-tr');
        _me.mRitem = new EditMany('Id', 'tbodyRitem', 'tplRitem', '.xu-tr');
        _me.mEtable = new EditMany('Id', null, 'tplTabEtable', '.x-form');
        _me.mEitem = new EditMany('Id', null, 'tplEitemTr', '.xu-tr');
        _me.mEtable._childs = [_me.mEitem];

        new CrudR(config, [_me.edit0, _me.mQitem, _me.mRitem, _me.mEtable]);

        //_me.ritemChdIdx = 0;    //child index of Ritem
        _me.etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
        _me.eitemChdIdx = 0;    //child index of Eitem

        //custom function
        //_me.edit0.fnAfterLoadJson = _me.edit0_afterLoadJson;
        //_me.edit0.fnAfterOpenEdit = _me.edit0_afterOpenEdit;        
        _me.edit0.fnWhenSave = _me.edit0_whenSave;
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
        _me.tplEitemTr = $('#tplEitemTr').html();
        //_me.divEitemBody = $('#divEitemBody');

        //Item modal(for Q,R,E)
        _me.modalItems = $('#modalItems');    //modal for select items
        _me.divItemsBody = _me.modalItems.find('tbody');
        _me.tplItemTr = $('#tplItemTr').html();   //tpl of modal item row

        //variables
        _me.ritemTableId = '';  //now ritem table Id
        _me.tables = [];        //for table dropdownlist
        _me.etableLen = 0;      //edit table count(累加)
        _me.etableIdx = 0;      //now edit nav selected index
        _me.nowItemType = '';   //modal item type: R,E,S

        //_me.swapEitemCols();
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
        return _iselect.get('ProjectId', _me.crudE.getEform0());
    },

    //auto called !!
    //set etable TableId(dropdown)
    //edit0_afterLoadJson: function (json) {
    fnAfterOpenEdit: async function (fun, json) {
        if (fun == EstrFun.Create)
            return;

        //set tables list, async call, send function parameter 
        if (!await _me.onChangeProject())
            return;

        //set form0 tableId select 欄位
        //var form = _me.crudE.getEform0();
        //_iselect.set(_me.TableId, json[_me.TableId], form);

        //set tabEtable(s) tableId select 欄位
        var navRows = _me.crudE.getChildRows(json, _me.etableChdIdx);
        var navLen = (navRows == null) ? 0 : navRows.length;
        for (var i = 0; i < navLen; i++) {
            //set dropdown source
            //debugger;
            var tabObj = _me.getEtableTab(i);
            _iselect.setItems(_me.TableId, _me.tables, tabObj);

            //set value
            _iselect.set(_me.TableId, navRows[i][_me.TableId], tabObj);

            //show edit table name
            _me.showEtableName(i);
        }
    },

    //set sort
    edit0_whenSave: function () {

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
        _me.getEtableForms().each(function (i, item) {
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

        //_me.etableNavRemoveAct();

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
            if (i === 0) {
                newNav.find('a')[0].click();
            }

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
            _me.showEtableName((i===0), i);
        }
        */
    },

    //GetUpdJson
    mEtable_getUpdJson: function (upKey) {
        //var upKey = _itext.get('Id', _me.crudE.getEform0());
        var rows = [];
        var eitems = [];
        _me.getEtableForms().each(function (i, item) {
            //etable
            var form = $(item);
            rows[i] = _me.crudE.getUpdRow(_me.mEtable.kid, _me.mEtable.fidTypes, form); //edit table
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
        _me.getEtableForms().each(function (i, item) {
            //focus nav first, or will not work !!
            var form = $(item);
            //var nav = _me.getEtableNav(form.data('index'));
            //_me.focusEtableNav(nav);

            //validate etable
            status = form.valid();

            //validate eitem
            if (status)
                status = _me.getEitemForm(form).valid();

            if (!status) {
                //status = false;
                //_me.etableIdx = i;
                var idx = form.data('index');
                _me.focusEtableNav(_me.getEtableNav(idx));
                return false;   //break;
            }
        });
        return status;
    },

    /**
     * onclick generate crud
     * (如果在VS下產生DbAdm的CRUD會reload !!)
     */ 
    onGenCrud: async function () {
        var keys = _me.getCheckedTables();
        if (keys.length === 0)
            return;

        await _ajax.getStrA('GenCrud', { keys: keys.join(',') }, function (error) {
            _tool.msg(_str.isEmpty(error) ? '執行成功' : error);
        });
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
    onChangeProject: async function (fnCallback) {
        //var form = _me.crudE.getEform0();
        //var pid = _iselect.get('ProjectId', form);
        var pid = _me.getProjectId();
        if (_str.isEmpty(pid))
            return false;

        return await _ajax.getJsonA('/XpCode/Tables', { projectId: pid }, function (rows) {
            _me.tables = rows;
            //_iselect.setItems(_me.TableId, rows, form);
            //if (_str.notEmpty(tableId))
            //    _iselect.set(_me.TableId, tableId, form);

            //set item modal tables
            //debugger;
            var obj = _obj.get(_me.TableId, _me.modalItems);
            _iselect.setItemsO(obj, _me.tables);
            _iselect.setO(obj, '');
    
            //if (fnCallback !== undefined)
            //    fnCallback();
        });
    },

    //on open item modal
    //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
    onOpenItem: function (type) {
        //如果為主table, 則不必重新讀取
        //_me.initRitemDt();

        /*
        //get tableId
        var form = _me.crudE.getEform0();
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
        _modal.showO(_me.modalItems);
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
                _me.divItemsBody.append($(Mustache.render(_me.tplItemTr, rows[i])));
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
                //!!
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
            body = _me.getEtableTab().find('tbody');
            tplItem = _me.tplEitemTr;
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
        _modal.hideO(_me.modalItems);
    },

    //onclick add on (edit)nav
    //must set id=new index
    onEtableAdd: function () {
        
        _me.etableNavRemoveAct();

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
        _me.focusEtableNav(newNav);

        //show edit table name(after nav added tab)
        _me.showEtableName(index);

        //reset
        //_me.swapEitemCols();
    },

    onEtableDelete: function () {
        //check
        if (_me.etableLen == 0)
            return;

        //confirm
        _tool.ans('是否移除畫面資料?', function () {
            var nav = _me.getEtableNav();
            var tab = _me.getEtableTab();

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
            var form = _me.getEtableForm(tab);
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
            _me.etableNavRemoveAct();
            tab.remove();
            nav.remove();
            _me.etableLen--;
            etableIdx = index;

            //focus new tab
            if (index >= 0)
                _me.focusEtableNav(nav2);
        });
    },

    onEtableLeft: function () {
        _nav.moveLeft(_me.getEtableNav());
        _tab.moveLeft(_me.getEtableTab());

        //reset
        //_me.swapEitemCols();
    },
    onEtableRight: function () {
        _nav.moveRight(_me.getEtableNav());
        _tab.moveRight(_me.getEtableTab());

        //reset
        //_me.swapEitemCols();
    },

    focusEtableNav: function (navObj) {
        //debugger;
        //navObj.focus();
        navObj.find('a').click();    
        //navObj.click();    
        //_me.getEtableNav(0).find('a').toggle(true);
        //obj.tab('show');
    },

    /*
    getEtableObject: function (index) {
        return _me.tabEtable.find('#divEtable' + index);
    },
    */

    //set(show) tableName at edit edit page
    //param {bool} reset: reset table list or not 
    showEtableName: function (index) {
        var name = _iselect.getText(_me.TableId, _me.getEtableTab(index));
        if (name === '')
            name = '(Empty)';
        _me.navEtable.find('li[data-index=' + index + '] a').text(name);
    },

    onChangeNowTable: function (index) {
        _me.showEtableName(index);
    },

    //set child not active
    etableNavRemoveAct: function () {
        var nav = _me.getEtableNav();
        nav.removeClass(_me.Active);
        _me.tabEtable.find('.tab-pane.' + _me.Active).removeClass(_me.Active);
    }, 

    //onclick etable nav
    onEtableNav: function (index) {
        //_me.etableNavRemoveAct();
        _me.etableIdx = index;
    },

    //get edit edit active nav
    //return nav object
    getEtableNav: function (index) {
        index = index || _me.etableIdx;
        var find = '[data-index=' + index + ']';
        return _me.navEtable.find('li' + find);
    },

    //get edit edit active tab
    //return tab object
    getEtableTab: function (index) {
        index = index || _me.etableIdx;
        return _me.tabEtable.find('#divEtable' + index);
    },

    getEtableForms: function () {
        return _me.tabEtable.find('.x-form');
    },
    getEtableForm: function (tabObj) {
        return tabObj.find('.x-form');
    },

    /*
     * get eitem form by etable form
     */ 
    getEitemForm: function (etableForm) {
        return etableForm.parent().find('.xu-form2');
    },

}; //class