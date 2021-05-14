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
				{ data: 'TranLog' },
                { data: '_CrudFun' },
				{ data: 'Status' },
			],
			columnDefs: [
                _crud.dtColConfig,
				{ targets: [0], render: function (data, type, full, meta) {
					return _crud.dtCheck0(full.Id);
				}},
				{ targets: [5], render: function (data, type, full, meta) {
					return _crud.dtYesEmpty(data);
				}},
                { targets: [6], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
				{ targets: [7], render: function (data, type, full, meta) {
					return _crud.dtStatusName(data);
				}},
			],
        };

        //ªì©l¤Æ crud
        _me.mCol = new EditMany('Id', 'eformCol', 'tplCol', 'tr');   //¦hµ§
        _crud.init(config, [ null, _me.mCol ]);
	},
    
    //generate Word document
	onGenWord: function () {
		var values = _icheck.getCheckeds(_me.divRead);
		if (values.length > 0)
			window.location = 'GenWord?keys=' + values.join(',');
		else
			_tool.msg(R.selectRow);
    },

}; //class