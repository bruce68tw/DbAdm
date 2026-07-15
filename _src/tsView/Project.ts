import { CrudR, _Ajax, _Str, _Tool } from "@baseJs";

_me = {
    init: function () {
        //datatable config
        var config = {
            columns: [
                { data: 'Name', orderable: true },
                { data: 'Code', orderable: true },
                { data: 'DbName' },
                { data: 'CreatorName', orderable: true },
                { data: '_Fun' },
                { data: '_Crud' },
                { data: 'Status', orderable: true },
            ],
            columnDefs: [
                { targets: [4], render: function (data, type, full, meta) {
                    var html = '' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onImport" data-args="{0}">{1}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onGenWord" data-args="{0}">{2}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onGenLogSql" data-args="{0}">{3}</button>';
                        return _Str.format(html, full.Id, '匯入結構', '產生文件', '產生異動SQL');
                }},
                { targets: [5], render: function (data, type, full, meta) {
                        return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
                { targets: [6], render: function (data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
            ],
        };

        //initial
        new CrudR(config);
    },

    //import excel into Db
    onImport: async function (id) {
        _me.prjId = id;
        _Tool.ans('是否確定匯入資料庫結構?', async function () {
            await _Ajax.getJsonA('Import', { id: _me.prjId }, function (data) {
                _Tool.msg(_BR.Done);
            });
        });
    },

    //generate docx file
    onGenWord: function (id) {
        _Tool.ans('是否確定產生資料庫文件?', function () {
            window.location.href = 'GenWord?id=' + id;
        });
    },

    /*
    //generate txt file for table relationship
    onGenRelat: function (id) {
        _tool.ans('是否確定產生資料表產生關聯?', function () {
            window.location = 'GenRelat?id=' + id;
        });
    },
    */

    //generate tranlog sql file
    onGenLogSql: function (id) {
        _Tool.ans('是否確定產生異動SQL檔案?', function () {
            window.location.href = 'GenLogSql?id=' + id;
        });
    },

}; //class
