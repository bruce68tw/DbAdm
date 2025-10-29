/// <reference path="UiMany.js" />

var _me = {
    init: function () {
        var config = {
            columns: [
                { data: 'ProjectName', orderable: true },
                { data: 'ProgCode', orderable: true },
                { data: 'ProgName', orderable: true },
                { data: '_Fun' },
                { data: '_Crud' },
            ],
            columnDefs: [
                { targets: [3], render: function (data, type, full, meta) {
                    var html = '' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onGenCrud" data-args="{0}">{1}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onDownCrud" data-args="{0}">{2}</button> | ' +
                        '<button type="button" class="btn btn-link" data-onclick="_me.onDownTableSql" data-args="{0}">{3}</button>';
                    return _str.format(html, full.Id, '產生CRUD', '下載CRUD', '下載Table SQL');
                }},
                { targets: [4], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //instance variables
        _me.modalMain = $('#modalMain');
        _me.modalImport = $('#modalImport');
        _me.modalExport = $('#modalExport');

        //save, back button
        //_me.divEditTbar = $('#divEditTbar');

        //initial edit one/many, rowsBox(參數2) 使用 eform
        _me.mItem = new EditMany('Id', 'eformItems', 'tplItem', '.xd-tr');
        new CrudR(config, [null, _me.mItem]);

        //custom function
        _me.mItem.fnLoadRows = _me.mItem_loadRows;
        _me.mItem.fnGetUpdJson = _me.mItem_getUpdJson;
        _me.mItem.fnValid = _me.mItem_valid;

        //initial uiMany
        _me.uiMany = new UiMany('.xu-area', _me.mItem);


        //註刪button dragstart事件
        _me.divEdit.on(EstrMouse.DragStart, '.xu-btn', function (e) {
            let itemType = $(e.target).data('type');
            _me.uiMany.startDragBtn(true, itemType);
        }).on(EstrMouse.DragEnd, function (e) {
            //不會觸發工作區的 dragEnd, 這裡必須寫
            _me.uiMany.onDragEnd(e);
        });

    }, //init

    //open main form
    onMainOpen: function () {
        var modal = _me.modalMain;
        var row = _form.toRow(_me.eform0);
        _form.loadRow(modal, row);
        _modal.showO(modal);
    },

    onMainOk: function () {
        var modal = _me.modalMain;
        var row = _form.toRow(modal);
        _form.loadRow(_me.eform0, row);
        _modal.hideO(modal);
    },

    //#region read form function
    //onclick generate crud(產生在主機)
    /*
    onGenCrud: function (id) {
        await _ajax.getStrA('GenCrud', { id: id }, function (error) {
            _tool.msg(_str.isEmpty(error) ? '執行成功' : error);
        });
    },
    */

    //onclick download crud
    onDownCrud: function () {

    },

    //onclick download table sql()
    onDownTableSql: function () {

    },
    //#endregion

    //#region edit form function
    //on click open import modal
    onOpenImport: function () {
        //clear first
        _itext.set('Import', '', _me.modalImport);

        //open modal
        _modal.showO(_me.modalImport);
    },

    //匯入json(巢狀格式) to edit form
    //called by modalImprot
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

    //export edit form to json
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
    //#endregion

    /*
    //generate json
    onGenJson: function () {
        var values = _icheck.getCheckeds(_me.crudR.divRead);
        if (values.length > 0)
            window.location = 'GenJson?key=' + values.join(',');
        else
            _tool.msg('請先選取資料。');
    },
    */

    //#region auto called function
    fnAfterSwap: function (toRead) {
        _obj.showByStatus($('.xu-tbar'), !toRead);
    },

    //auto called !!
    //reset when create
    fnAfterOpenEdit: function (fun, json) {
        _me.uiMany.reset();
        var isAdd = (fun === EstrFun.Create);
        _me.uiMany.setEdit(isAdd || (fun === EstrFun.Update));
    },

    /**
     * auto called
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

    /**
     * auto called
     * 重設 uiItem的 BoxId、ChildNo、Sort
     * return {string} error msg if any
     */ 
    fnWhenSave: function(fun) {
        //get changed box ids
        let uiView = this.uiMany.uiView;
        let boxJsons = uiView.getChgBoxJsons();
        boxLen = boxJsons.length;
        if (boxLen == 0) return '';

        //reset BoxId, ChildNo, Sort
        let mItem = this.mItem;
        //box list
        for (let i = 0; i < boxLen; i++) {
            let boxJson = boxJsons[i];
            let boxId = boxJson.BoxId;
            //child list
            for (let j = 0; j < boxJson.ChildNos.length; j++) {
                let childNo = boxJson.ChildNos[j];
                let itemIds = uiView.boxGetChildIds(boxId, childNo);
                //item list
                for (let k = 0; k < (itemIds || []).length; k++) {
                    let rb = mItem.idToRowBox(itemIds[k]); //get row box
                    _itext.set('BoxId', boxId, rb);
                    _itext.set('ChildNo', childNo, rb);
                    _itext.set('Sort', k + 1, rb);
                }
            }
        }
        return '';
    },
    //#endregion 

    //#region mItem custom function
    //load items
    mItem_loadRows: async function (rows) {
        await _me.uiMany.loadRowsA(rows);
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
    //return boolean
    mLine_valid: function () {
        return true;
    },
    */
    //#endregion

}; //class
