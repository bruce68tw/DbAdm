//import { CrudR, EditMany } from "@baseJs";

/*
class XpUserVo {
    mUserRole = new EditMany('Id', 'divRoles');
}
*/
//export { }
_vo = {
    mUserRole: new EditMany('Id', 'divRoles'),
};
//const _vo = globalThis._vo as XpUserVo;
//_vo = new XpUserVo() as XpUserVo;

_me = {
    init() {        
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
        //_me.vo = new XpUserVo() as XpUserVo;
        //_vo.mUserRole.initUrm(['Id', 'RoleId']);    //for urm
        new CrudR(config, [null, _vo.mUserRole]);
    },

}; //class
