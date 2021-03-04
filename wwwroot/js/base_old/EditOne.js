
/**
 * 注意:
 *   保留的自訂函數: 
 *     void ufAfterLoadJson(rowJson)
 *     error ufWhenSave():
 *     void ufAfterSave(): 在 _crud.js呼叫
 * 
 */

/**
 * 單筆維護, 包含以下保留欄位:
 *   _edit:
 *   _childs:
 * called by _crud.js
 * param kid {string} (optional 'Id') key field id
 * param formId {string} (optional 'eform')
 * return {EditOne}
 */ 
function EditOne(kid, formId) {

    //constant 
    //this.DataOld = '_old';      //    //舊資料存在 data 屬性, 內容必須與 _editMany.DataOld 相同

    this.init = function () {
        this.kid = kid || 'Id';
        this.form = $('#' + (formId || 'eform'));     //multiple rows container object

        _edit.setFidTypeVars(this, this.form);
        _edit.setFileVars(this, this.form);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.getKey = function () {
        return _input.get(this.kid, this.form);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.isNewRow = function () {
        return _str.isEmpty(this.getKey());
    };

    this.loadRow = function (row) {
        _form.loadRow(this.form, row);

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, this.form);
            obj.data(_edit.DataOld, row[fid]);
        }
    };

    /**
     * get updated row, 包含 _childs
     * return {json} different column only
     */
    this.getUpdRow = function () {
        return _edit.getUpdRow(this.kid, this.fidTypes, this.form);
    };

    this.reset = function () {
        _form.reset(this.form);
    };

    /**
     * set form to editable or not
     * status {bool} editable or not
     */
    this.setEdit = function (status) {
        _form.setEdit(this.form, status);
    };

    /**
     * formData add files
     * param {string} levelStr
     * param {FormData} data
     * return {json} file json
     */
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        var fileJson = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _edit.getServerFid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.form)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    //=== file event start ===
    //file field be triggered
    this.onFile = function (me) {        
    };

    this.onOpenFile = function (me) {
    };

    this.onViewFile = function (me) {
    };

    this.onDeleteFile = function (me) {
    };
    //=== file event end ===

    //最後呼叫
    this.init();

}//class