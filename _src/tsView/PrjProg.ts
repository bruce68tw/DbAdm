$(function () {
    _me.init();
});

_me = {
    init() {
        //datatable config
        var config = {
            columns: [
                { data: 'ProjectName' },
                { data: 'Name' },
                { data: 'Sort' },
                { data: 'Status' },
                { data: 'CreatorName' },
                { data: '_Crud' },
            ],
            columnDefs: [
                { targets: [3], render(data) {
                    return _me.crudR.dtStatusName(data);
                }},
                { targets: [5], render(data, type, full) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, '*');
                }},
            ],
        };

        //initial
        new CrudR(config);
    },
}; //class
