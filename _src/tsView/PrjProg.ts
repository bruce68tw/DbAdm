import { CrudR } from "@baseJs";

_me = {

    init: function () {
        //datatable config
        var config = {
            columns: [
                { data: 'ProjectName' },
                { data: 'Name' },
                { data: 'Sort' },
                { data: 'Status' },
                { data: 'CreatorName' },
                { data: '_fun' },
            ],
            columnDefs: [
                { targets: [3], render: function (data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
                { targets: [5], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        new CrudR(config);
    },
}; //class
