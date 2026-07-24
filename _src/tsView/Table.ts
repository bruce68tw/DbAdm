$(function () {
    _me.init();
});

_vo = {
    mCol: new EditMany('Id', 'tbodyCol', 'tplCol', 'tr'),

    //generate Word document
    onGenWord() {
        var values = _iCheck.getCheck0Values(_me.crudR.divRead);
        if (values.length > 0)
            window.location.href = 'GenWord?keys=' + values.join(',');
        else
            _Tool.msg(_BR.PlsSelectRows);
    },
}

_me = {
    init () {
        var config = {
            columns: [
                { data: '_F1' },
                { data: 'ProjectCode', orderable: true },
                { data: 'DbName' },
                { data: 'Code', orderable: true },
                { data: 'Name', orderable: true },
                { data: 'CreatorName' },
                { data: 'TranLog' },
                { data: 'Status', orderable: true },
                { data: '_Crud' },
            ],
            columnDefs: [
                { targets: [0], render(data, type, full, meta) {
                    return _me.crudR.dtCheck0(full.Id);
                }},
                { targets: [6], render(data, type, full, meta) {
                    return _me.crudR.dtYesEmpty(data);
                }},
                { targets: [7], render(data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
                { targets: [8], render(data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //init crud
        new CrudR(config, [null, _vo.mCol]);
    },

}; //class
