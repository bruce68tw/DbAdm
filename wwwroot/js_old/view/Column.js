var _me = {

    init: function () {        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'ProjectName' },
                { data: 'TableName' },
                { data: 'Name' },
                { data: 'Cname' },
                { data: 'DataType' },
                { data: '_CrudFun' },
                { data: 'Status' },
            ],
            columnDefs: [
                _crud.dtColConfig,
                { targets: [5], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
                { targets: [6], render: function (data, type, full, meta) {
                    return _crud.dtSetStatus(full.Id, data);
                }},
            ],
        };

        //init crud
        _crud.init(config); 
    },

}; //class