$(function () {
    _me.init();
});

_me = {
    init() {
        var config = {
            columns: [
                { data: 'TableTypeName', orderable: true },
                { data: 'Code', orderable: true },
                { data: 'Name' },
                { data: 'DataType' },
                { data: 'Nullable' },
                { data: 'DefaultValue' },
                { data: 'Note' },
                { data: '_Fun' },
            ],
            columnDefs: [
                { targets: [4], render(data) {
                    return _me.crudR.dtYesEmpty(data);
                }},
                { targets: [7], render(data, type, full) {
                    return _me.crudR.dtCrudFun(full.Code, full.Name, '*');
                }},
            ],
        };

        //init crud
        new CrudR(config, [new EditOne('Code')]);
    },
};
