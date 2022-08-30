var _me = {

    init: function () {        
        //datatable config
        var config = {
            columns: [
                { data: 'ProjectCode' },
                { data: 'DbName' },
                { data: 'Code' },
                { data: 'Name' },
                { data: 'TranLog' },
                { data: '_Fun' },
                { data: 'Status' },
            ],
            columnDefs: [
				{ targets: [4], render: function (data, type, full, meta) {
                    return _crudR.dtYesEmpty(data);
                }},
				{ targets: [5], render: function (data, type, full, meta) {
                    return _crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
				{ targets: [6], render: function (data, type, full, meta) {
                    return _crudR.dtStatusName(data);
                }},
            ],
        };

        //initial
        _me.mColumn = new EditMany('Id', 'eformColumn', 'tplColumn', 'tr');
		_crudR.init(config, [null, _me.mColumn]);
    },

}; //class