import { CrudR, _Ajax, _Date, _Modal, _Str, _Tool, _iFile } from "@base";

_me = {
    init: function () {        
        //datatable config
        var config = {
            columns: [
                { data: 'OkCount' },
                { data: 'FailCount' },
                { data: 'TotalCount' },
                { data: 'FileName' },
                { data: 'CreatorName' },
                { data: 'Created' },
            ],
            columnDefs: [
				{ targets: [1], render: function (data, type, full, meta) {
                    return (data > 0)
                        ? _Str.format('<a href="GetFail?id={0}&name={1}">{2}</a>', full.Id, full.FileName, data)
                        : data;
                }},
				{ targets: [3], render: function (data, type, full, meta) {
                    return _Str.format('<a href="GetSource?id={0}&name={1}">{2}</a>', full.Id, full.FileName, data);
                }},
				{ targets: [5], render: function (data, type, full, meta) {
                    return _Date.dtsToUiDt(data);
                }},
            ],
        };

        //initial
        new CrudR(config);
        _me.modalImport = $('#modalImport');
    },

    //on open import modal
    onOpenImport: function () {
        _Modal.show(_me.modalImport);
    },

    //on run import
    onImport: async function () {
        var modal = _me.modalImport;
        var fileObj = modal.find(':file');
        var file = _iFile.getUploadFile(fileObj);
        if (file == null) {
            _Tool.msg('請先選取匯入檔案。');
            return;
        }

        var formData = new FormData();
        formData.append('file', file);
        await _Ajax.getJsonByFdA('Import', formData, function (data) {
            _Modal.hide(modal);
            _Tool.msg(_Str.format('匯入完成。', data.OkCount, data.FailCount));
            _me.dt.reload();
        });
    },

}; //class

$(function () {
    _me.init();
});