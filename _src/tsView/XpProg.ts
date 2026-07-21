$(function () {
    _me.init();
});

_vo = {
    mRoleProg: new EditMany('Id', 'tbodyRoleProg', 'tplRoleProg', 'tr'),
}

_me = {
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
        new CrudR(config, [null, _vo.mRoleProg]);
    },

}; //class
