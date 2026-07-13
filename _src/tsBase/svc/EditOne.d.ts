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
export default class EditOne {
    private kid;
    private eform;
    private is1to1;
    private dataJson;
    private systemError;
    private validator;
    private fnValid;
    _childs: OneMany[];
    fidTypes: string[];
    fidTypeLen: number;
    fidRadios: string[];
    hasFile: boolean;
    fileLen: number;
    fileFids: string[];
    constructor(kid?: string, eformId?: string, childs?: OneMany[]);
    private showErrors;
    private setIs1to1;
    private _resetAndNew;
    private valid;
    private getKey;
    private getValue;
    private isNewRow;
    private loadRow;
    private getUpdRow;
    private reset;
    private resetKey;
    private setEdit;
    private dataAddFiles;
    private onViewFile;
}
