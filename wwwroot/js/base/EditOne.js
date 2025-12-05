/**
 * 單筆編輯畫面, 全部屬性皆為 private !!
 * single edit form, called by _me.crudE.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 公用屬性
 *   kid:
 *   eform:
 *   systemError:
 *   dataJson: 載入資料後(update/view)在CrudE.js自動設定
 *   hasFile
 *   validator: jquery vallidation object (EditMany同), 在 _me.crudE.js _initForm() 設定
 * 自定函數 called by _me.crudE.js
 *   //void fnAfterLoadJson(json)
 *   //void fnAfterOpenEdit(fun, json): called after open edit form
 *   //void fnAfterSwap(readMode): called after _me.crudR.swap()
 *   //error fnWhenSave() ??
 *   //void fnAfterSave()
 */ 
class EditOne {

    //fileFids, fileLen, hasFile 屬性在外部設定(_me.crudE.js setFileVars())

    /**
     * @constructor
     * initial & and instance variables (this.validator is by _valid.init())
     * @param kid {string} (default 'Id') pkey field id for getKey value & getUpdRow,
     *   must existed or will set systemError variables !!
     * @param eformId {string} (default 'eform') must existed or will set systemError variables !!
     * note!! if these two parameters not Id/eform, must new EditOne() and set them !!
     */
    constructor(kid, eformId) {
        //private
        this[_edit.Childs] = null;

        this.kid = kid || 'Id';
        eformId = eformId || 'eform';
        this.eform = $('#' + eformId);     //multiple rows container object
        this.dataJson = null;

        //check input & alert error if wrong
        this.systemError = '';
        var error = (this.eform.length != 1) ? 'EditOne.js input eformId is wrong. (' + eformId + ')' :
            (_obj.get(this.kid, this.eform) == null) ? 'EditOne.js input kid is wrong. (' + this.kid + ')' :
            '';
        if (error != '') {
            this.systemError = error;
            alert(error);
            //return;   //not return
        }

        _edit.initVars(this, this.eform);
    }

    /**
     * is a new row or not
     * @returns {bool}
     */
    getKey() {
        return _input.get(this.kid, this.eform);
    }

    /**
     * get field value
     * @returns {string}
     */
    getValue(fid) {
        return _input.get(fid, this.eform);
    }

    /**
     * is a new row or not
     * @returns {bool}
     */
    isNewRow() {
        return _edit.isNewBox(this.eform, this.kid);
    }

    /**
     * load row into UI, also save into old variables
     * @param row {json}
     */
    loadRow(row) {
        _edit.loadRow(this, row);
    }

    /**
     * get updated row, 包含 _childs
     * @returns {json} different column only
     */
    getUpdRow() {
        return _edit.getUpdRow(this, this.eform);
    }

    /**
     * reset UI and edited variables
     */
    reset() {
        _form.reset(this.eform);
    }

    /**
     * reset key, for update/view -> create
     */
    resetKey() {
        _input.set(this.kid, '', this.eform);
    }

    /**
     * set form edit status
     * @param status {bool} edit status
     */
    setEdit(status) {
        _form.setEdit(this.eform, status);
    }

    /**
     * formData add files
     * @param levelStr {string}
     * @param data {FormData}
     * @returns {json} file json
     */
    dataAddFiles(levelStr, data) {
        if (!this.hasFile) return null;

        var fileJson = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _edit.getFileSid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_me.crudE.dataSetFileJson(data, fileJson);
        return fileJson;
    }

    /**
     * onViewFile -> viewFile
     * onclick viewFile
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     */
    viewFile(table, fid, elm) {
        var key = this.getKey();
        _edit.viewFile(table, fid, elm, key);
    }

}//class