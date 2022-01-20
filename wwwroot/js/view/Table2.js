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
                    return _crud.dtYesEmpty(data);
                }},
				{ targets: [5], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
				{ targets: [6], render: function (data, type, full, meta) {
                    return _crud.dtStatusName(data);
                }},
            ],
        };

        //initial
        _me.mColumn = new EditMany('Id', 'eformColumn', 'tplColumn', 'tr');
		_crud.init(config, [null, _me.mColumn]);
    },

}; //class