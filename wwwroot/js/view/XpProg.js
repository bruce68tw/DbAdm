var _me = {

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
                    return _me.crudR.dtYesEmpty(data);
                }},
				{ targets: [5], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mRoleProg = new EditMany('Id', 'tbodyRoleProg', 'tplRoleProg', 'tr');
		new CrudR(config, [null, _me.mRoleProg]);
    },

}; //class