_me = {
    init: function () {
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
                { targets: [4], render: function (data, type, full, meta) {
                    return _me.crudR.dtYesEmpty(data);
                }},
                { targets: [7], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Code, full.Name, true, true, true);
                }},
            ],
        };

        //init crud
        new CrudR(config, [new EditOne('Code')]);
    },
};
