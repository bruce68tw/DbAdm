/// <reference path="UiMany.js" />

//擴充 _me
Object.assign(_me, {
    //是否拖拉編輯模式
    //isEdit2: false,

    onOpenEdit2: async function (id) {

        _prog.setBorder(false);
        //_me.isEdit2 = true;
        _me.crudE.setEditNo(1);
        await _me.crudE.onUpdateA(id);
        //_me.crudR.swap(false);

        /*
        _me.uiMany.reset();
        var isAdd = (fun === EstrFun.Create);
        _me.uiMany.setEdit(isAdd || (fun === EstrFun.Update));
        */
    },

    /*
    //open main form
    onMainOpen: function () {
        var modal = _me.modalMain;
        var row = _form.toRow(_me.eform0);
        _form.loadRow(modal, row);
        _modal.show(modal);
    },

    onMainOk: function () {
        var modal = _me.modalMain;
        var row = _form.toRow(modal);
        _form.loadRow(_me.eform0, row);
        _modal.hideO(modal);
    },
    */

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
        _modal.show(_me.modalImport);
    },

    //匯入json(巢狀格式) to edit(查詢條件、結果only)/edit2 form
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
        var tbar = $('.xd-prog-tbar');
        if (toRead) {
            _obj.hide(tbar);
            //_me.isEdit2 = false;    //還原
        } else {
            _obj.show(tbar);
            //_obj.showByStatus($('.xd-export'), _me.isEdit2);
        }
    },

    //reset when create
    afterOpenEdit2: function (fun, json) {
        _me.uiMany.reset();
        var isAdd = (fun == EstrFun.Create);
        _me.uiMany.setEdit(isAdd || (fun == EstrFun.Update));
    },

    /**
     * ?? auto called
     * jsPlumb line container must visible when rendering
     * see _me.crudE.js _updateOrViewA()
     * param {string} fun
     * param {string} key
     * returns {bool}
     */
    zz_fnUpdateOrViewA: async function (fun, key) {
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
        let mUiItem = this.mUiItem;
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
                    let rb = mUiItem.idToRowBox(itemIds[k]); //get row box
                    _itext.set('BoxId', boxId, rb);
                    _itext.set('ChildNo', childNo, rb);
                    _itext.set('Sort', k + 1, rb);
                }
            }
        }
        return '';
    },
    //#endregion 

    //#region mUiItem custom function
    //load items
    mUiItem_loadRows: async function (rows) {
        await _me.uiMany.loadRowsA(rows);
    },

    //getUpdJson
    mUiItem_getUpdJson: function (upKey) {
        return _me.mUiItem.getUpdJsonByRsb(upKey);
    },

    //return boolean
    mUiItem_valid: function () {
        return true;
    },

    /*
    //return boolean
    mLine_valid: function () {
        return true;
    },
    */
    //#endregion

}); //class
