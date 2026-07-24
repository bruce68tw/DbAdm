$(function () {
    _me.init();
});
class ProjectVo {
    prjId = '';

    //import excel into Db
    async onImport(id: string) {
        _Array.isEmpty();
        this.prjId = id;
        if (await _Tool.ansA('是否確定匯入資料庫結構?')) {
            await _Ajax.getJsonA('Import', { id: _vo.prjId }, function (json) {
                _Tool.msg(_BR.Done);
            });
        }
    }

    //generate docx file
    async onGenWord(id: string) {
        if (await _Tool.ansA('是否確定產生資料庫文件?')) {
            window.location.href = 'GenWord?id=' + id;
        }
    }

    /*
    //generate txt file for table relationship
    onGenRelat(id) {
        _Tool.ans('是否確定產生資料表產生關聯?', function () {
            window.location = 'GenRelat?id=' + id;
        });
    }
    */

    //generate tranlog sql file
    async onGenLogSql(id: string) {
        if (await _Tool.ansA('是否確定產生異動SQL檔案?')) {
            window.location.href = 'GenLogSql?id=' + id;
        }
    }
}
_vo = new ProjectVo();

_me = {
    init() {
        //datatable config
        var config = {
            columns: [
                { data: 'Name', orderable: true },
                { data: 'Code', orderable: true },
                { data: 'DbName' },
                { data: 'CreatorName', orderable: true },
                { data: '_Fun' },
                { data: 'Status', orderable: true },
                { data: '_Crud' },
            ],
            columnDefs: [
                { targets: [4], render(data, type, full, meta) {
                    const crudR = _me.crudR;
                    return '' +
                        crudR.dtLinkBtn(full.Id, '匯入結構', '_vo.onImport') + ' | ' +
                        crudR.dtLinkBtn(full.Id, '產生文件', '_vo.onGenWord') + ' | ' +
                        crudR.dtLinkBtn(full.Id, '產生異動SQL', '_vo.onGenLogSql');
                        /*
                        '<button type="button" class="btn btn-link" data-onclick="_vo.onImport" data-args="{0}">{1}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_vo.onGenWord" data-args="{0}">{2}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_vo.onGenLogSql" data-args="{0}">{3}</button>';
                    return _Str.format(html, full.Id, '匯入結構', '產生文件', '產生異動SQL');
                        */
                }},
                { targets: [5], render(data, type, full, meta) {
                    return _me.crudR.dtStatusName(data);
                }},
                { targets: [6], render(data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        new CrudR(config);
    },

}; //class
