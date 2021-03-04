var _me = {

    init: function () {
		//datatable config
		var config = {
			dom: _crud.dtDom,
			columns: [
                { data: '_F1' },
				{ data: 'ProjectName' },
				{ data: 'TableName' },
                { data: '_CrudFun' },
				{ data: 'Status' },
                { data: 'Created' },
			],
			columnDefs: [
                _crud.dtColConfig,
				{ targets: [0], render: function (data, type, full, meta) {
					return _iCheck.dtCheck0(full.Id);
				}},
                { targets: [3], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
				{ targets: [4], render: function (data, type, full, meta) {
					return _crud.dtSetStatus(full.Id, data);
				}},
			],
        };

        //constant
        _me.TableId = 'TableId';    //column name of TableId
        _me.Active = 'active';      //active class

        //維護4個tables: crud,Ritem,Etable,Eitem
        /*
        _crud.init(config, new EditOne('Id', 'formEdit', [
            new EditMany('Id', 'tplRitem', 'formEditRitem'),
            new EditMany('Id', 'tplTabEtable', null, [
                new EditMany('Id', 'tplEitemTr'),
            ]),
        ]));
        */
        _me.edit0 = new EditOne();
        _me.mQitem = new EditMany('Id', 'formEditQitem', 'tplQitem');
        _me.mRitem = new EditMany('Id', 'formEditRitem', 'tplRitem');
        _me.mEtable = new EditMany('Id', null, 'tplTabEtable');
        _me.mEitem = new EditMany('Id', null, 'tplEitemTr');
        _me.mEtable._childs = [_me.mEitem];

        _crud.init(config, [_me.edit0, _me.mQitem, _me.mRitem, _me.mEtable]);

        //_me.ritemChdIdx = 0;    //child index of Ritem
        _me.etableChdIdx = 2;   //child index of Etable nav(CrudEdit)
        _me.eitemChdIdx = 0;    //child index of Eitem

        //custom function
        _me.edit0.ufAfterLoadJson = _me.edit0_AfterLoadJson;
        _me.edit0.ufWhenSave = _me.edit0_WhenSave;
        //
        _me.mEtable.ufLoadJson = _me.mEtable_LoadJson;
        _me.mEtable.ufValid = _me.mEtable_Valid;
        _me.mEtable.ufGetUpdJson = _me.mEtable_GetUpdJson;
        //
        //_me.mEitem.ufLoadRows = _me.mEitem_LoadRows;
        //_me.mEitem.ufValid = _me.mEitem_Valid;
        //_me.mEitem.ufGetUpdRows = _me.mEitem_GetUpdRows;

        //Qitem(Q)
        _me.tplQitem = $('#tplQitem').html();
        _me.divQitemBody = $('#divQitemBody');

        //Ritem(R)
        _me.tplRitem = $('#tplRitem').html();
        _me.divRitemBody = $('#divRitemBody');

        //CrudEdit table(用nav表示)
        _me.navEtable = $('#navEtable');
        _me.tabEtable = $('#tabEtable');
        _me.tplNavEtable = $('#tplNavEtable').html();
        _me.tplTabEtable = $('#tplTabEtable').html();

        //Eitem(E)
        _me.tplEitemTr = $('#tplEitemTr').html();
        _me.divEitemBody = $('#divEitemBody');

        //Item modal(Q,R,E共用)
        _me.modalItems = $('#modalItems');    //modal for select items
        _me.divItemsBody = _me.modalItems.find('tbody');
        _me.tplItemTr = $('#tplItemTr').html();   //tpl of modal item row

        //變數
        _me.ritemTableId = '';  //now ritem table Id
        _me.tables = [];        //for table dropdownlist
        _me.etableLen = 0;      //edit table count(累加)
        _me.nowItemType = '';   //R,E,S
        _me.nowEtableIdx = 0;   //now edit nav selected index

        _me.swapEitemCols();
	},

    //reset eitem columns: 重新show/hide eitem layoutcols, width 欄位
    swapEitemCols: function () {
        $('.xu-edit').each(function (idx, item) {
            var me = $(item);
            if (idx == 0) {
                me.find('.xu-layout').show();
                me.find('.xu-width').hide();
            } else {
                me.find('.xu-layout').hide();
                me.find('.xu-width').show();
            }
        });
    },

    getProjectId: function () {
        return _iSelect.get('ProjectId', _crud.getForm0());
    },

    //設定 etable TableId(dropdown)
    edit0_AfterLoadJson: function (json) {
        //設定 tables list, 非同步, 傳入 function parameter 
        _me.onChangeProject(_me.getProjectId(), function () {
            _me.edit0_AfterLoadJson2(json);
        });

        //reset
        _me.swapEitemCols();
    },

    //called by edit0_AfterLoadRow()
    edit0_AfterLoadJson2: function (json) {
        //設定 form0 tableId select 欄位
        var form = _crud.getForm0();
        _iSelect.set(_me.TableId, json[_me.TableId], form);

        //設定 tabEtable(s) tableId select 欄位
        var navRows = _crud.getChildRows(json, _me.etableChdIdx);
        var navLen = (navRows == null) ? 0 : navRows.length;
        for (var i = 0; i < navLen; i++) {
            //set dropdown source
            var tabObj = _me.getEtableTab(i);
            _iSelect.setItems(_me.TableId, _me.tables, tabObj);

            //set value
            _iSelect.set(_me.TableId, navRows[i][_me.TableId], tabObj);

            //show edit table name
            _me.showEtableName(i);
        }
    },

    //設定sort
    edit0_WhenSave: function () {

        //qitem set sort
        _me.divQitemBody.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i, $(item));
        });

        //ritem set sort
        _me.divRitemBody.find('.xu-tr').each(function (i, item) {
            _iText.set('Sort', i, $(item)); 
        });

        //etable/eitem set sort
        var error = '';
        var tableIds = [];
        _me.getEtableForms().each(function (i, item) {
            //Etable不可重複
            var form = $(item);
            var tableId = _iText.get(_me.TableId, form);
            if (_array.find(tableIds, tableId) >= 0) {
                error = '維護的資料表(Etable)不可重複。';
                return false;   //break
            }

            //add tableIds[]
            tableIds[i] = tableId;

            //etable sort
            _iText.set('Sort', i, form);

            //eitem sort
            //var tbody = form.parent().find('tbody');
            _me.getEitemForm(form).find('.xu-tr').each(function (j, item2) {
                _iText.set('Sort', j, $(item2));    //set sort 
            });
        });
        return error;
    },

    //load etable
    mEtable_LoadJson: function (json) {
        //empty first
        _me.navEtable.empty();
        _me.tabEtable.empty();

        //null表示沒資料
        //var rows = rowJson._rows;
        var rows = json[_crud.Rows];
        if (rows == null || rows.length === 0)
            return;

        //_me.etableNavRemoveAct();

        //render etables & eitems
        var eitemRows = _crud.getChildRows(json, 0);
        for (var i = 0; i < rows.length; i++) {
            //add tab (only)
            var row = rows[i];
            _me.mEtable.loadRow(_me.tabEtable, row, i);

            //add nav
            //on click必須add/remove active class, 所以改用javascript !!
            var newNav = $(Mustache.render(_me.tplNavEtable, { Index: i }));
            _me.navEtable.append(newNav);
            _me.etableLen++;

            //focus first tab
            if (i === 0)
                newNav.find('a').click();

            //validate etable form
            var forms = _me.tabEtable.find('#divEtable' + i + ' form');
            var form = forms.first();
            _valid.init(form);

            //load Eitems & validate
            var form2 = forms.last();
            //var rows2 = _crud.getJsonRows(row, 0);
            var rows2 = _json.filterRows(eitemRows, 'EtableId', _iText.get('Id', form));
            _me.mEitem.loadRows(form2.find('tbody'), rows2);
            _valid.init(form2);
            /*
            var form = _me.tabEtable.find('#divEtable' + i + ' form');
            _me.mEitem.loadRows(form.find('tbody'), rows2);
            _valid.init(form);
            */
        }

        /*
        //最後再執行(因為裡面有非同步呼叫)
        //show edit table name(after nav added tab)
        for (var i = 0; i < navLen; i++) {
            _me.showEtableName((i===0), i);
        }
        */
    },

    /*
    //load eitem
    mEitem_LoadRows: function (rows) {
        //null表示沒資料
        //var rows = rowJson._rows;
        if (rows == null || rows.length == 0)
            return;

        //_me.etableNavRemoveAct();
        _me.tabEtable.find('form').each(function () {
            //filter rows and render
            var form = $(this);
            var ftRows = _json.filterRows(rows, 'EtableId', _iText.get('Id', form));
            _me.mEitem.loadRows(form.find('tbody'), ftRows);

            _valid.init(form);
        });
    },
    */

    //return boolean
    mEtable_Valid: function () {
        var status = true;
        _me.getEtableForms().each(function (i, item) {
            //focus nav first, or will not work !!
            var form = $(item);
            //var nav = _me.getEtableNav(form.data('index'));
            //_me.focusEtableNav(nav);

            //validate etable
            var status = form.valid();

            //validate eitem
            if (status)
                status = _me.getEitemForm(form).valid();

            if (!status) {
                //status = false;
                //_me.nowEtableIdx = i;
                var idx = form.data('index');
                _me.focusEtableNav(_me.getEtableNav(idx));
                return false;   //break;
            }
        });
        return status;
    },

    /*
    //return boolean
    mEitem_Valid: function () {
        return true;
    },
    */

    //GetUpdJson
    mEtable_GetUpdJson: function () {
        var upKey = _iText.get('Id', _crud.getForm0());
        var rows = [];
        var eitems = [];
        _me.getEtableForms().each(function (i, item) {
            //etable
            var form = $(item);
            rows[i] = _edit.getUpdRow(_me.mEtable.kid, _me.mEtable.fidTypes, form); //edit table
            _me.mEtable.rowSetFkeyFid(rows[i], upKey);

            //eitems
            var upKey2 = _iSelect.get('Id', form);
            var form2 = _me.getEitemForm(form);
            var rows2 = _me.mEitem.getUpdRowsByArg(upKey2, form2.find('tbody'), '.xu-tr');
            _json.appendRows(rows2, eitems);
            /*
            if (rows2 != null) {
                if (rows[i] == null)
                    rows[i] = {};
                _crud.setChildRows(rows[i], 0, rows2);
            }
            */
        });
        return {
            _rows: rows,
            _deletes: _me.mEtable.getDeletedRows(),
            _childs: [{ _rows: eitems, _deletes: _me.mEitem.getDeletedRows()}],
        };
    },

    /*
    //here!! 改到 mEtable_GetUpdRows() 處理
    //set mapId
    mEitem_GetUpdRows: function () {
        var rows = [];
        _me.getEtableForms().each(function (i, item) {
            var form = $(item);
            var upKey = _iSelect.get(_me.TableId, form);
            var rows2 = _me.mEitem.getUpdRowsByArg(upKey, form.find('tbody'), '.xu-tr');

            //set data mapId !!
            //if (rows2 != null)
            //    _me.mEitem.rowsSetFkeyFid(rows2, _iText.get('Id', form));

            _json.appendRows(rows2, rows);
        });

        return rows;
    },
    */

    //onclick generate crud
    onGenCrud: function () {
        var keys = _me.getCheckedTables();
        if (keys.length === 0)
            return;

        _ajax.getStr('GenCrud', { keys: keys.join(',') }, function (status) {
            _tool.msg(status === '1' ? '執行成功' : '執行失敗');
        });
    },

    //get checked table id array
	getCheckedTables: function () {
		var values = _iCheck.getCheckedValues(_me.divRead);
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
        _crud.onCreate();

        //初始化 master edit
        _me.resetEdits();
        //_me.addEdit();
    },

    onRitemAdd: function () {
        var box = $(Mustache.render(_me.tplRitem, {}));
        _form.loadRow(box, {});
        _me.mRitem.boxSetNewId(box);
        _me.divRitemBody.append(box);
    },

    //on change project id
    //多個地方呼叫
    //tableId: 如果有值, 則設定tableId欄位
    //fnCallback: (optional) callback function
    onChangeProject: function (tableId, fnCallback) {
        var form = _crud.getForm0();
        //var pid = _iSelect.get('ProjectId', form);
        var pid = _me.getProjectId();
        if (pid !== '') {
            _ajax.getJson('/Xp/GetTables', { projectId: pid }, function (rows) {
                _me.tables = rows;
                _iSelect.setItems(_me.TableId, rows, form);
                if (!_str.isEmpty(tableId))
                    _iSelect.set(_me.TableId, tableId, form);
                if (fnCallback !== undefined)
                    fnCallback();
            });
        }
    },

    //on open item modal
    //type: Q(qitem), R(ritem), E(eitem), S(edit eitem)
    onOpenItem: function (type) {
        //如果為主table, 則不必重新讀取
        //_me.initRitemDt();

        //get tableId
        var form = _crud.getForm0();
        var tableId = _iSelect.get(_me.TableId, form);

        //get編輯畫面tableId
        if (tableId === '') {
            _tool.msg('請先選取資料表。');
            return;
        }

        //set nowItemType
        _me.nowItemType = type;
        
        //set modal tableId if need
        var obj = _obj.get(_me.TableId, _me.modalItems);
        var modalTableId = _iSelect.getO(obj);
        if (modalTableId === '')
            _iSelect.setItemsO(obj, _me.tables);

        //set modal tableId dropdown list if need
        if (tableId !== modalTableId) {
            _iSelect.setO(obj, tableId);
            _me.changeItemTable(tableId);
        }

        //show modal
        _modal.showO(_me.modalItems);
    },   

    //on change tableId at ritem modal
    onChangeItemTable: function (me) {
        _me.changeItemTable(_iSelect.getO($(me)));
    },

    //called by 2 places
    changeItemTable: function (tableId) {
        _ajax.getJson('GetColumns', { tableId: tableId }, function (rows) {
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
        var crudId = _iText.get('Id', _crud.getForm0());
        var rows = [];
        _me.divItemsBody.find(':checkbox:checked').each(function (idx) {
            var obj = $(this);
            var tr = obj.closest('tr');
            //data 屬性不區分大小寫 !!
            rows[idx] = {
                //TableName: tr.data('tablename'),
                //CrudId: crudId, //mapId
                ColumnId: tr.data('id'),
                ColumnName: tr.data('name'),    //for Ritem
                Name: tr.data('name'),
                Cname: tr.data('cname'),
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
            body = _me.divQitemBody;
            tplItem = _me.tplQitem;
            mItem = _me.mQitem;
        } else if (type === 'R') {
            //ritem
            body = _me.divRitemBody;
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
            mItem.boxSetNewId(box);
            body.append(box);
        }

        //show
        _modal.hideO(_me.modalItems);
    },

    //onclick add on (edit)nav
    //必須設定 id=new index
    onEtableAdd: function () {
        
        _me.etableNavRemoveAct();

        //add tab
        //debugger;
        var index = _me.etableLen;
        var json = { Index: index };
        var newTab = $(Mustache.render(_me.tplTabEtable, json));
        _me.mEtable.boxSetNewId(newTab);
        _iSelect.setItems(_me.TableId, _me.tables, newTab); //set dropdown source
        _me.tabEtable.append(newTab);

        //add nav
        //on click必須add/remove active class, 所以改用javascript !!
        var newNav = $(Mustache.render(_me.tplNavEtable, json));
        _me.navEtable.append(newNav);
        _me.etableLen++;

        //focus first tab
        //newNav.find('a').click();
        _me.focusEtableNav(newNav);

        //show edit table name(after nav added tab)
        _me.showEtableName(index);

        //reset
        _me.swapEitemCols();
    },

    onEtableLeft: function () {
        _nav.moveLeft(_me.getEtableNav());
        _tab.moveLeft(_me.getEtableTab());

        //reset
        _me.swapEitemCols();
    },
    onEtableRight: function () {
        _nav.moveRight(_me.getEtableNav());
        _tab.moveRight(_me.getEtableTab());

        //reset
        _me.swapEitemCols();
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
        var name = _iSelect.getText(_me.TableId, _me.getEtableTab(index));
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

    /*
    //edit edit set active
    navSetAct: function (index) {
        var find = _me.getNowEtableIdx(index);
        _me.navEtable.find('li' + find).addClass(_me.Active);
        _me.tabEtable.find('.tab-pane' + find).addClass(_me.Active);
    }, 
    */

    //onclick etable nav
    onEtableNav: function (index) {
        //_me.etableNavRemoveAct();
        _me.nowEtableIdx = index;
    },

    /*
    //get edit edit active nav
    getNowEtableIdx: function (index) {
        return '[data-index=' + index + ']';
    },
    */

    //get edit edit active nav
    //return nav object
    getEtableNav: function (index) {
        index = index || _me.nowEtableIdx;
        var find = '[data-index=' + index + ']';
        return _me.navEtable.find('li' + find);
    },

    //get edit edit active tab
    //return tab object
    getEtableTab: function (index) {
        index = index || _me.nowEtableIdx;
        return _me.tabEtable.find('#divEtable' + index);
    },

    getEtableForms: function () {
        return _me.tabEtable.find('.xg-form');
    },

    /*
     * get eitem form by etable form
     */ 
    getEitemForm: function (etableForm) {
        return etableForm.parent().find('.xu-form2');
    },

}; //class