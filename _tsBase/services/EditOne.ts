import _Edit from "./_Edit";
import _Form from "./_Form";
import _IFile from "./_IFile";
import _Input from "./_Input";
import _IText from "./_IText";
import _Obj from "./_Obj";

// 假設這些全域變數或類型已在其他地方定義
declare const _me: {
    crudE: {
        getUpdRow: (kid: string, fidTypes: string[], eform: JQuery) => any;
        getFileSid: (levelStr: string, fid: string) => string;
        viewFile: (table: string, fid: string, elm: JQuery<HTMLElement> | HTMLElement, key: string) => void;
        // dataSetFileJson: (data: FormData, fileJson: any) => void;
    };
};

// 假設 Validator 是來自 jQuery Validation 的類型
interface Validator {
    // ...
}

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

    // fileFids, fileLen, hasFile 屬性在外部設定(_me.crudE.js setFileVars())
    public kid: string;
    public eform: JQuery;
    public dataJson: any = null;
    public systemError: string = '';
    public fidTypes?: string[];         // fidTypes array of [fid, ftype, fid, ftype, ...]
    public fidTypeLen: number = 0;
    public hasFile: boolean = false;
    public fileFids?: string[];         // file fids array
    public fileLen: number = 0;
    public validator?: Validator;

    // 自定函數 (Custom functions)
    // public fnAfterLoadJson?: (json: any) => void;
    // public fnAfterOpenEdit?: (fun: any, json: any) => void;
    // public fnAfterSwap?: (readMode: boolean) => void;
    // public fnWhenSave?: () => string | null; // return error message or null
    // public fnAfterSave?: () => void;

    /**
     * @param kid pkey field id (default 'Id')
     * @param eformId edit form id (default 'eform')
     */
    constructor(kid?: string, eformId?: string) {
        // call last
        this.init(kid, eformId);
    }

    /**
     * initial & and instance variables (this.validator is by _valid.init())
     * called by this(at last)
     */
    private init(kid?: string, eformId?: string): void {
        this.kid = kid || 'Id';
        let _eformId = eformId || 'eform';
        this.eform = $('#' + _eformId) as JQuery<HTMLElement>;     //multiple rows container object
        this.dataJson = null;

        //check input & alert error if wrong
        this.systemError = '';
        let error: string = (this.eform.length !== 1)
            ? 'EditOne.js input eformId is wrong. (' + _eformId + ')'
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
    public getKey(): string {
        return _Input.get(this.kid, this.eform);
    }

    /**
     * get field value
     * @param fid field id
     * return {string}
     */
    public getValue(fid: string): string {
        return _Input.get(fid, this.eform);
    }

    /**
     * is a new row or not
     * return {bool}
     */
    public isNewRow(): boolean {
        return (_IText.get(_Edit.IsNew, this.eform) === '1');
    }

    /**
     * load row into UI, also save into old variables
     * @param row {json}
     */
    public loadRow(row: any): void {
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
    public getUpdRow(): any {
        if (!this.fidTypes) return null; // Safety check
        return _me.crudE.getUpdRow(this.kid, this.fidTypes, this.eform);
    }

    /**
     * reset UI and edited variables
     */
    public reset(): void {
        _Form.reset(this.eform);
    }

    /**
     * reset key, for update/view -> create
     */
    public resetKey(): void {
        _IText.set(this.kid, '', this.eform);
    }

    /**
     * set form edit status
     * @param status {bool} edit status
     */
    public setEdit(status: boolean): void {
        _Form.setEdit(this.eform, status);
    }

    /**
     * formData add files
     * @param levelStr {string}
     * @param data {FormData}
     * return {json} file json
     */
    public dataAddFiles(levelStr: string, data: FormData): any | null {
        if (!this.hasFile || !this.fileFids)
            return null;

        const fileJson: any = {};
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
    public viewFile(table: string, fid: string, elm: JQuery<HTMLElement> | HTMLElement): void {
        const key = this.getKey();
        _me.crudE.viewFile(table, fid, elm, key);
    }
}