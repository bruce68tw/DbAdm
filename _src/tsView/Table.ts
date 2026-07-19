//import { CrudR, EditMany, _iCheck, _Tool } from "@baseJs";

_me = {
    init: function () {
        var config = {
            columns: [
                { data: '_F1' },
                { data: 'ProjectCode', orderable: true },
                { data: 'DbName' },
                { data: 'Code', orderable: true },
                { data: 'Name', orderable: true },
                { data: 'CreatorName' },
                { data: 'TranLog' },
                { data: '_Fun' },
                { data: 'Status', orderable: true },
            ],
            columnDefs: [
                { targets: [0], render: function (data, type, full, meta) {
                    return _me.crudR.dtCheck0(full.Id);
                }},
                { targets: [6], render: function (data, type, full, meta) {
                    return _me.crudR.dtYesEmpty(data);
                }},
                { targets: [7], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
                { targets: [8], render: function (data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
            ],
        };

        //init crud
        _me.mCol = new EditMany('Id', 'tbodyCol', 'tplCol', 'tr');
        new CrudR(config, [null, _me.mCol]);
    },

    //generate Word document
    onGenWord: function () {
        var values = _iCheck.getCheck0Values(_me.crudR.divRead);
        if (values.length > 0)
            window.location.href = 'GenWord?keys=' + values.join(',');
        else
            _Tool.msg(_BR.PlsSelectRows);
    },

}; //class
