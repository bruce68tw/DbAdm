import _Edit from "./_Edit";
import _Form from "./_Form";
import _IFile from "./_IFile";
import _Input from "./_Input";
import _IText from "./_IText";
import _Obj from "./_Obj";
/**
 * 單筆編輯畫面
 * single edit form, called by _me.crudE.js
 * json row for both EditOne/EditMany has fields:
 * _rows {json array}: updated rows include upload files
 * _deletes {strings}: deleted key strings, seperate with ','
 * _childs {json array}: child json array
 *
 * 屬性
 * kid:
 * eform:
 * fidTypes:
 * systemError:
 * dataJson: 載入資料後(update/view)自動設定
 * hasFile、fileLen、fileFids: 在 _me.crudE.js setFileVars() 設定
 * validator: jquery vallidation object (EditMany同), 在 _me.crudE.js _initForm() 設定
 *
 * 自定函數 called by _me.crudE.js
 * //void fnAfterLoadJson(json)
 * //void fnAfterOpenEdit(fun, json): called after open edit form
 * //void fnAfterSwap(readMode): called after _me.crudR.swap()
 * error fnWhenSave() ??
 * void fnAfterSave()
 *
 * param kid {string} (default 'Id') pkey field id for getKey value & getUpdRow,
 * must existed or will set systemError variables !!
 * param eformId {string} (default 'eform') must existed or will set systemError variables !!
 * note!! if these two parameters not Id/eform, must new EditOne() and set them !!
 *
 * return {EditOne}
 */
export default class EditOne {
    /**
     * @param kid pkey field id (default 'Id')
     * @param eformId edit form id (default 'eform')
     */
    constructor(kid = null, eformId = null) {
        this.dataJson = null;
        this.systemError = '';
        this.fidTypes = []; // fidTypes array of [fid, ftype, fid, ftype, ...]
        this.fidTypeLen = 0;
        this.hasFile = false;
        this.fileFids = []; // file fids array
        this.fileLen = 0;
        // 自定函數 (Custom functions)
        this.fnAfterLoadJson = null;
        this.fnAfterOpenEdit = null;
        this.fnAfterSwap = null;
        this.fnWhenSave = null; // return error message or null
        this.fnAfterSave = null;
        this.kid = kid || 'Id';
        eformId || (eformId = 'eform');
        this.eform = $('#' + eformId); //multiple rows container object
        this.dataJson = null;
        //check input & alert error if wrong
        this.systemError = '';
        let error = (this.eform.length !== 1)
            ? 'EditOne.js input eformId is wrong. (' + eformId + ')'
            : (_Obj.get(this.kid, this.eform) == null)
                ? 'EditOne.js input kid is wrong. (' + this.kid + ')'
                : '';
        if (error !== '') {
            this.systemError = error;
            alert(error);
            //return;   //not return
        }
        _Edit.initVars(this, this.eform);
    }
    /**
     * get key value
     * return {string}
     */
    getKey() {
        return _Input.get(this.kid, this.eform);
    }
    /**
     * get field value
     * @param fid field id
     * return {string}
     */
    getValue(fid) {
        return _Input.get(fid, this.eform);
    }
    /**
     * is a new row or not
     * return {bool}
     */
    isNewRow() {
        return (_IText.get(_Edit.IsNew, this.eform) === '1');
    }
    /**
     * load row into UI, also save into old variables
     * @param row {json}
     */
    loadRow(row) {
        _Form.loadRow(this.eform, row);
        //set old value for each field
        if (this.fidTypes) {
            for (let i = 0; i < this.fidTypeLen; i = i + 2) {
                const fid = this.fidTypes[i];
                const obj = _Obj.get(fid, this.eform);
                obj.data(_Edit.DataOld, row[fid]);
            }
        }
    }
    /**
     * get updated row, 包含 _childs
     * return {json} different column only
     */
    getUpdRow() {
        if (!this.fidTypes)
            return null; // Safety check
        return _me.crudE.getUpdRow(this.kid, this.fidTypes, this.eform);
    }
    /**
     * reset UI and edited variables
     */
    reset() {
        _Form.reset(this.eform);
    }
    /**
     * reset key, for update/view -> create
     */
    resetKey() {
        _IText.set(this.kid, '', this.eform);
    }
    /**
     * set form edit status
     * @param status {bool} edit status
     */
    setEdit(status) {
        _Form.setEdit(this.eform, status);
    }
    /**
     * formData add files
     * @param levelStr {string}
     * @param data {FormData}
     * return {json} file json
     */
    dataAddFiles(levelStr, data) {
        if (!this.hasFile || !this.fileFids)
            return null;
        const fileJson = {};
        for (let i = 0; i < this.fileLen; i++) {
            const fid = this.fileFids[i];
            const serverFid = _me.crudE.getFileSid(levelStr, fid);
            if (_IFile.dataAddFile(data, fid, serverFid, this.eform)) {
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
        const key = this.getKey();
        _me.crudE.viewFile(table, fid, elm, key);
    }
}
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/EditOne.js.map