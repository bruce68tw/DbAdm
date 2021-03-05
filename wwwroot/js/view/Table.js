var _me = {

    init: function () {
		//datatable config
		var config = {
			dom: _crud.dtDom,
			columns: [
                { data: '_F1' },
				{ data: 'ProjectCode' },
				{ data: 'DbName' },
				{ data: 'Code' },
				{ data: 'Name' },
                { data: '_CrudFun' },
				{ data: 'Status' },
			],
			columnDefs: [
                _crud.dtColConfig,
				{ targets: [0], render: function (data, type, full, meta) {
					return _crud.dtCheck0(full.Id);
				}},
                { targets: [5], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
				{ targets: [6], render: function (data, type, full, meta) {
					return _crud.dtStatusName(data);
				}},
			],
        };

        //init crud
        _me.mCol = new EditMany('Id', 'eformCol', 'tplCol', 'tr');   //多筆
        _crud.init(config, [ null, _me.mCol ]);
	},
    
    //generate Word document
    onGenWord: function () {
		var keys = _me.getCheckeds();
        if (keys.length >= 0)
            window.location = 'GenWord?keys=' + keys.join(',');
    },

    //傳回選取的多筆 checkbox value 字串陣列
	getCheckeds: function () {
		var values = _icheck.getCheckeds(_me.divRead);
		if (values.length == 0)
			_tool.msg(R.selectRow);
		return values;
	},

    /*	
    //see _crud.js onUpdate()    
	onUpdate: function (id) {
        _crud.setUpdateMode(id);
		_ajax.getJson('GetRows', { key: id }, function (data) {
			//show row
			//_form.swap(_me.divEdit);
			_form.loadJson(_me.eform, data[0]);

			//show rows
			_me.divCols.empty();
			var rows = data[1];
			if (rows != null && rows.length > 0) {
				var rowCount = rows.length;
				_editMany.setRowNo(_me.mCol, rowCount);
				for (var i = 0; i < rowCount; i++) {
					_editMany.addRow(_me.mCol, _me.getColRow('', i, rows[i]));
				}
			}

			//reset multi validate
			_valid.init(_me.eform2);
		});
	},

	onAddRow: function () {
		_editMany.addRow(_me.mCol, _me.getColRow('A'));
	},
    */

    /* ??
	//generate Crud
	onGenCrud: function () {
		var keys = _me.getCheckeds();
		if (keys.length == 0)
			return;

		var box = _me.divRead;
		var multis = [];
		for (var i = 0; i < keys.length; i++)
			multis[i] = box.find('[value=' + keys[i] + '][data-id=isMulti]:checked').length > 0;

		_ajax.getStr('GenCrud', { ids: keys, multis: multis }, function (data) {
			//data: list of 1(tableId),2(status:1/0)
			if (data != null && data.length > 0) {
				var items = data.split(',');
				for (var i = 0; i < items.length; i = i + 2) {
					var obj = box.find('[data-id=t' + items[i] + ']');
					if (obj.length > 0) {
						if (items[i + 1] == '1') {
							obj.text(' (OK)').css('color', 'green');
						} else {
							obj.text(' (Fail)').css('color', 'red');
						}
					}
				}

				_tool.msg('@R.GenCrudOk');  //??
			}
		});
	},
    */

}; //class