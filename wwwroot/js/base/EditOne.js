/**
 * 單筆編輯畫面
 * single edit form, called by _me.crudE.js
 * json row for both EditOne/EditMany has fields:
 *   _rows {json array}: updated rows include upload files
 *   _deletes {strings}: deleted key strings, seperate with ','
 *   _childs {json array}: child json array
 * 
 * 屬性
 *   kid:
 *   eform:
 *   fidTypes:
 *   systemError:
 *   dataJson: 載入資料後(update/view)自動設定
 *   hasFile、fileLen、fileFids: 在 _me.crudE.js setFileVars() 設定
 *   validator: jquery vallidation object (EditMany同), 在 _me.crudE.js _initForm() 設定
 * 
 * 自定函數 called by _me.crudE.js
 *   //void fnAfterLoadJson(json)
 *   //void fnAfterOpenEdit(fun, json): called after open edit form
 *   //void fnAfterSwap(readMode): called after _me.crudR.swap()
 *   error fnWhenSave() ??
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

    //fileFids, fileLen, hasFile 屬性在外部設定(_me.crudE.js setFileVars())

    /**
     * initial & and instance variables (this.validator is by _valid.init())
     * called by this(at last)
     */
    this.init = function () {
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
        return _edit.isNewBox(this.eform, this.kid);
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
        return _me.crudE.getUpdRow(this.kid, this.fidTypes, this.eform);
    };

    /**
     * reset UI and edited variables
     */
    this.reset = function () {
        _form.reset(this.eform);
    };

    /**
     * reset key, for update/view -> create
     */
    this.resetKey = function () {
        _itext.set(this.kid, '', this.eform);
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
            var serverFid = _me.crudE.getFileSid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_me.crudE.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * onViewFile -> viewFile
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    this.viewFile = function (table, fid, elm) {
        var key = this.getKey();
        _me.crudE.viewFile(table, fid, elm, key);
    };

    //call last
    this.init();

}//class