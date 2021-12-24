var _me = {

    init: function () {        
        //set Datatables config
        var config = {
            columns: [
                { data: 'ProjectCode' },
                { data: 'TableCode' },
                { data: 'Code' },
                { data: 'Name' },
                { data: 'DataType' },
                { data: '_Fun' },
                { data: 'Status' },
            ],
            columnDefs: [
                { targets: [5], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
                { targets: [6], render: function (data, type, full, meta) {
                    return _crud.dtStatusName(data);
                }},
            ],
        };

        //init crud
        _crud.init(config); 
    },

}; //class