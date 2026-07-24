$(function () {
    _me.init();
});

_me = {
    init() {
        var config = {
            //修改:查詢結果欄位,與後端read service對應, 這是 Datatables config
            columns: [
                { data: 'ProjectCode', orderable: true },
                { data: 'TableCode', orderable: true },
                { data: 'Fid', orderable: true },
                { data: 'Name' },
                { data: 'DataType', orderable: true },
                { data: 'CreatorName' },
                { data: 'Status', orderable: true },
                { data: '_Fun' },
            ],

            //修改:如果查詢結果欄位有特殊的顯示規則就寫在這裡
            columnDefs: [
                { targets: [6], render(data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
                { targets: [7], render(data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //init crud
        new CrudR(config);
    },

    /*
    fnOnViewFile(table:string, fid:string) {
        _me.edit0.onViewFile(table, fid);
    },
    */

}; //class
