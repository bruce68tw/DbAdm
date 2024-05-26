/**
 * single edit form, called by _crudE.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 
 * custom function called by _crudE.js
 *   //void fnAfterLoadJson(json)
 *   //void fnAfterOpenEdit(fun, json): called after open edit form
 *   //void fnAfterSwap(readMode): called after _crudR.swap()
 *   error fnWhenSave()
 *   void fnAfterSave()
 *   
 * param kid {string} (default 'Id') pkey field id for getKey value & getUpdRow,
 *   must existed or will set systemError variables !!
 * param eformId {string} (default 'eform') must existed or will set systemError variables !!
 * note!! if these two parameters not Id/eform, must new EditOne() and set them !!
 * 
 * return {EditOne}
 */ 
function EditOne(kid, eformId) {

    //fileFids, fileLen, hasFile 屬性在外部設定(_edit.js setFileVars())

    /**
     * initial & and instance variables (this.validator is by _valid.init())
     * called by this(at last)
     */
    this.init = function () {
        this.kid = kid || 'Id';
        eformId = eformId || 'eform';
        this.eform = $('#' + eformId);     //multiple rows container object

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
        _form.loadRow(this.eform, row);

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