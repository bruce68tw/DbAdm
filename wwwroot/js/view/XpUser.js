var _me = {

    init: function () {        
        //datatable config
        var config = {
            columns: [
                { data: 'Account', sortable: true },
                { data: 'Name', sortable: true },
                { data: 'DeptName' },
                { data: 'Status', sortable: true },
                { data: '_Fun' },
            ],
            columnDefs: [
				{ targets: [3], render: function (data, type, full, meta) {
                    return _crudR.dtStatusName(data);
                }},
				{ targets: [4], render: function (data, type, full, meta) {
                    return _crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mUserRole = new EditMany('Id', 'divRoles');
        _me.mUserRole.initUrm(['Id', 'RoleId']);    //for urm
        _crudR.init(config, [null, _me.mUserRole]);
    },

}; //class