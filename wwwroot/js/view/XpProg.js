﻿var _me = {

    init: function () {        
        //datatable config
        var config = {
            columns: [
                { data: 'Code' },
                { data: 'Name' },
                { data: 'Url' },
                { data: 'AuthRow' },
                { data: 'Sort' },
                { data: '_Fun' },
            ],
            columnDefs: [
				{ targets: [3], render: function (data, type, full, meta) {
                    return _crudR.dtYesEmpty(data);
                }},
				{ targets: [5], render: function (data, type, full, meta) {
                    return _crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mRoleProg = new EditMany('Id', 'eformRoleProg', 'tplRoleProg', 'tr');
		_crudR.init(config, [null, _me.mRoleProg]);
    },

}; //class