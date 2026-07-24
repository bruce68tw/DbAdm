$(function () {
    _me.init();
});

_me = {
    init() {
        var config = {
            //修改:查詢結果欄位,與後端read service對應, 這是 Datatables config
            columns: [
                { data: 'Id' },
                { data: 'Title' },
                { data: 'Q5' },
                { data: 'Created' },
                { data: '_Crud' },
            ],

            //修改:如果查詢結果欄位有特殊的顯示規則就寫在這裡
            columnDefs: [
                { targets: [4], render(data, type, full, meta) {
                        return _me.crudR.dtCrudFun(full.Id, full.Name, false, false, true);
                }},
            ],
        };

        //init crud
        new CrudR(config);
    },
}; //class
