/// <reference path="UiMany.js" />
var _me = {
    init: function () {
        var config = {
            columns: [
                { data: 'ProjectName', orderable: true },
                { data: 'Code', orderable: true },
                { data: 'Name', orderable: true },
                { data: '_Fun' },
                { data: '_Crud' },
            ],
            columnDefs: [
                { targets: [3], render: function (data, type, full, meta) {
                    return '';
                }},
                { targets: [4], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //instance variables
        _me.modalImport = $('#modalImport');
        _me.modalExport = $('#modalExport');

        //save, back button
        //_me.divEditTbar = $('#divEditTbar');

        //initial edit one/many, rowsBox(參數2) 使用 eform
        _me.mItem = new EditMany('Id', 'eformItems', 'tplItem', '.xd-tr', 'Sort');
        //_me.mCol = new EditMany('Id', 'eformCols', 'tplCol', '.xd-tr', 'Sort');
        //_me.mLine = new EditMany('Id', 'eformLines', 'tplLine', '.xd-tr', 'Sort');
        new CrudR(config, [null, _me.mItem]);

        //custom function
        _me.mItem.fnLoadRows = _me.mItem_loadRows;
        _me.mItem.fnGetUpdJson = _me.mItem_getUpdJson;
        _me.mItem.fnValid = _me.mItem_valid;

        //initial uiMany
        _me.uiMany = new UiMany('.xu-ui-area', _me.mItem);
    },

    //on open import modal
    onOpenImport: function () {
        //clear first
        _itext.set('Import', '', _me.modalImport);

        //open modal
        _modal.showO(_me.modalImport);
    },

    //匯入json(巢狀格式)
    onImport: async function () {
        var value = _itext.get('Import', _me.modalImport).trim();
        if (_str.isEmpty(value)) {
            _tool.msg('匯入資料不可空白。');
            return;
        }

        //加入大括號 for json 格式
        //if (value.substring(0, 1) != '{')
        //    value = '{' + value + '}';

        //string to json
        var jsons = _str.toJson(value);
        if (jsons == null) {
            _tool.msg('匯入資料必須是Json格式。');
            return;
        }

        await this.uiMany.loadJsonsA(jsons);
        _modal.hideO(_me.modalImport);
    },

    onExport: async function () {
        //get jsons
        let jsons = this.uiMany.getJsons();
        if (_json.isEmpty(jsons)) {
            _tool.msg('目前畫面無任何資料。');
            return;
        }

        //jsons to blob
        const blob = new Blob([JSON.stringify(jsons, null, 2)], { type: "application/json" });

        //create link & trigger click
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";
        link.click();
    },

    //generate json
    onGenJson: function () {
        var values = _icheck.getCheckeds(_me.crudR.divRead);
        if (values.length > 0)
            window.location = 'GenJson?key=' + values.join(',');
        else
            _tool.msg('請先選取資料。');
    },

    //auto called
    fnAfterSwap: function (toRead) {
        _obj.showByStatus($('.xu-tbar'), !toRead);
    },

    //auto called !!
    //reset when create
    fnAfterOpenEdit: function (fun, json) {
        var isAdd = (fun === EstrFun.Create);
        if (isAdd) {
            _me.uiMany.reset();
        }
        _me.uiMany.setEdit(isAdd || (fun === EstrFun.Update));
    },

    /**
     * auto called !!
     * jsPlumb line container must visible when rendering
     * see _me.crudE.js _updateOrViewA()
     * param {string} fun
     * param {string} key
     * returns {bool}
     */
    fnUpdateOrViewA: async function (fun, key) {
        var act = (fun == EstrFun.Update)
            ? 'GetUpdJson' : 'GetViewJson';
        return await _ajax.getJsonA(act, { key: key }, function (json) {
            //show container first
            _me.crudR.toEditMode(fun, () => {
                _me.crudE.loadJson(json);
                _me.crudE.setEditStatus(fun);
                _me.crudE.afterOpen(fun, json);
            });
        });
    },

    //#region mItem/mLine custom function
    //load items
    mItem_loadRows: function (rows) {
        _me.uiMany.loadRows(rows);
    },

    //getUpdJson
    mItem_getUpdJson: function (upKey) {
        return _me.mItem.getUpdJsonByRsb(upKey);
    },

    //return boolean
    mItem_valid: function () {
        return true;
    },

    /*
    mLine_loadRows: function (rows) {
        _me.uiMany.loadLines(rows);
    },

    //getUpdJson
    mLine_getUpdJson: function (upKey) {
        return _me.mLine.getUpdJsonByRsb(upKey);
    },

    //return boolean
    mLine_valid: function () {
        return true;
    },
    */
    //#endregion

    /*
    //測試流程
    onOpenTest: function (code) {
        //read old row if need
        _me.nowFlowCode = code;

        //show div
        _me.testToRead(false)
    },

    onSaveTestA: async function () {
        //check & save
        var data = {
            code: _me.nowFlowCode,
            data: _itextarea.get('Data', _me.divFlowTest),
        };
        await _ajax.getStrA('SaveTest', data, function (error) {
            if (_str.isEmpty(error)) {
                _tool.msg('作業完成。');
                _me.testToRead(true);
            } else {
                _tool.msg(error);
            }
        });
    },

    //show Read form or not
    testToRead: function (toRead) {
        _me.crudR.swap(toRead, _me.divFlowTest);
    },
    */

}; //class
