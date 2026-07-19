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
 *   is1to1: default false, true表示1對1, 利用 setIs1to1()設定 
 *   systemError:
 *   dataJson: (只記在edit0)載入資料後(update/view)在CrudE.js自動設定, 個別程式可以自行使用, 例如: DbAdm GenCrud.js
 *   hasFile
 *   validator: jquery vallidation object (EditMany同), 在 _me.crudE.js _initForm() 設定
 *   fidTypes: 在 _edit.initVar() 設定
 *   fidRadios: 在 _edit.initVar() 設定, 目前用於 EditMany
 * 自定函數 called by _me.crudE.js
 *   //void fnAfterLoadJson(json)
 *   //void fnAfterOpenEdit(fun, json): called after open edit form
 *   //void fnAfterSwap(readMode): called after _me.crudR.swap()
 *   //error fnWhenSave() ??
 *   //void fnAfterSave()
 */ 
class EditOne {
    //private [_Edit.Childs]: any;

    private kid: string;
    private is1to1: boolean;
    private dataJson: Json;

    //global
    _childs: OneMany[];
    fnValid: any;
    eform: JQuery;
    systemError: string;
    validator: any;

    //global& set by _Edit
    fidTypes: string[];
    fidTypeLen: number;
    fidRadios: string[];
    hasFile: boolean;
    fileLen: number;
    fileFids: string[];

    constructor(kid?: string, eformId?: string, childs?: OneMany[]) {
        this._childs = childs;

        this.kid = kid || 'Id';
        eformId = eformId || 'eform';
        this.eform = $('#' + eformId);
        this.is1to1 = false;
        this.dataJson = null;

        this.systemError = '';
        var error = (this.eform.length != 1) ? 'EditOne.js input eformId is wrong. (' + eformId + ')' :
            (_Obj.get(this.kid, this.eform) == null) ? 'EditOne.js input kid is wrong. (' + this.kid + ')' :
            '';
        if (error != '') {
            this.systemError = error;
            alert(error);
        }

        _Edit.initVars(this, this.eform);
    }

    showErrors(json: any): void {
        this.validator.showErrors(json);
    }

    setIs1to1(): void {
        this.is1to1 = true;
    }

    private _resetAndNew(init?: boolean): void {
        _Form.reset(this.eform, init);
        _iText.set(this.kid, -1, this.eform);
    }

    valid(): boolean {
        if (_Str.notEmpty(this.systemError)) {
            _Tool.msg(this.systemError);
            return false;
        }

        if (!this.eform.valid()) return false;

        return (this.fnValid) ? this.fnValid() : true;
    }

    getKey(): string {
        return _Input.get(this.kid, this.eform);
    }

    getValue(fid: string): string {
        return _Input.get(fid, this.eform);
    }

    isNewRow(): boolean {
        return _Edit.isNewBox(this.eform, this.kid);
    }

    loadRow(row: any): void {
        if (this.is1to1 && _Json.isEmpty(row))
            this._resetAndNew();
        else
            _Edit.loadRow(this, this.eform, row);
    }

    getUpdRow(upKey: string): any {
        var row = _Edit.getUpdRow(this, this.eform);
        if (this.is1to1 && row != null) {
            row[_Edit.DataFkeyFid] = upKey;
            return row;
        } else {
            return row;
        }
    }

    reset(init?: boolean): void {
        if (this.is1to1)
            this._resetAndNew(init);
        else
            _Form.reset(this.eform, init);
    }

    resetKey(): void {
        _Input.set(this.kid, '', this.eform);
    }

    setEdit(status: boolean): void {
        _Form.setEdit(this.eform, status);
    }

    dataAddFiles(levelStr: string, data: FormData): any {
        if (!this.hasFile) return null;

        var fileJson: any = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _Edit.getFileSid(levelStr, fid);
            if (_iFile.dataAddFile(data, fid, serverFid, this.eform)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        return fileJson;
    }

    async onViewFile(table: string, fid: string): Promise<void> {
        var elm = _Fun.getMeElm();
        var key = this.getKey();
        await _Edit.viewFileA(table, fid, elm, key);
    }
}
window.EditOne = EditOne;