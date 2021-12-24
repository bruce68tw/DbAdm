/**
 * single edit form, called by _crud.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 
 * custom function called by _crud.js
 *   //void fnAfterLoadJson(json)
 *   void fnAfterOpenEdit(fun, json): called after open edit form
 *   void fnAfterSwap(readMode): called after _crud.swap()
 *   error fnWhenSave()
 *   void fnAfterSave()
 *   
 * param kid {string} (optional 'Id') key field id
 * param eformId {string} (optional 'eform')
 * return {EditOne}
 */ 
function EditOne(kid, eformId) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     */
    this.init = function () {
        this.kid = kid || 'Id';
        this.eform = $('#' + (eformId || 'eform'));     //multiple rows container object

        _edit.setFidTypeVars(this, this.eform);
        _edit.setFileVars(this, this.eform);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.getKey = function () {
        return _input.get(this.kid, this.eform);
    };

    /**
     * get field value
     * return {string}
     */
    this.getValue = function (fid) {
        return _input.get(fid, this.eform);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.isNewRow = function () {
        return _str.isEmpty(this.getKey());
    };

    /**
     * load row into UI, also save into old variables
     * param row {json}
     */
    this.loadRow = function (row) {
        _form.loadJson(this.eform, row);

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, this.eform);
            obj.data(_edit.DataOld, row[fid]);
        }
    };

    /**
     * get updated row, 包含 _childs
     * return {json} different column only
     */
    this.getUpdRow = function () {
        return _edit.getUpdRow(this.kid, this.fidTypes, this.eform);
    };

    /**
     * reset UI and edited variables
     */
    this.reset = function () {
        _form.reset(this.eform);
    };

    /**
     * set form edit status
     * param status {bool} edit status
     */
    this.setEdit = function (status) {
        _form.setEdit(this.eform, status);
    };

    /**
     * formData add files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        var fileJson = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _edit.getServerFid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    this.onViewFile = function (table, fid, elm) {
        var key = this.getKey();
        _edit.viewFile(table, fid, elm, key);
    };

    //call last
    this.init();

}//class