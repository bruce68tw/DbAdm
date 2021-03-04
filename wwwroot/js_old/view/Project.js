var _me = {

    init: function () {
        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'Name' },
                { data: 'DbName' },
                { data: '_Fun' },
                { data: '_CrudFun' },
                { data: 'Status' },
            ],
            columnDefs: [
                _crud.dtColConfig,
                { targets: [2], render: function (data, type, full, meta) {
                    var html = '' +
                        '<a href="javascript:_me.onImport(\'{0}\');">{1}</a> | ' +
                        '<a href="javascript:_me.onGenWord(\'{0}\');">{2}</a>'; 
                    return _str.format(html, full.Id, "匯入DB", "產生Word文件");
                }},
                { targets: [3], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, false);
                }},
                { targets: [4], render: function (data, type, full, meta) {
                    return _crud.dtSetStatus(full.Id, data);
                }},
            ],
        };

        //initial
        _crud.init(config);  
    },    

    //import excel into Db
    onImport: function (id) {
        _me.prjId = id;
        _tool.ans("是否確定匯入DB", function () {
            _ajax.getJson('Import', { id: _me.prjId }, function (data) {
                _tool.msg(RB.Done);
            });
        });
    },

    //import excel into Db
    onGenWord: function (id) {
        _tool.ans("是否產生Word文件?", function () {
            window.location = 'GenWord?id=' + id;
        });
    },

}; //class

