import { CrudR, EditMany } from "@baseJs";

_me = {
    crudR: null,
    mUserRole: null,

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
				{ targets: [3], render: function(data) {
                    return _me.crudR.dtStatusName(data);
                }},
				{ targets: [4], render: (data, type, full) => {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        this.mUserRole = new EditMany('Id', 'divRoles');
        this.mUserRole.initUrm(['Id', 'RoleId']);    //for urm
        new CrudR(config, [null, this.mUserRole]);
    },

}; //class
