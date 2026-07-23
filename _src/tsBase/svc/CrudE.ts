/**
 * 控制 CRUD 編輯畫面, 可以有多個編輯區域
 * 說明:
 *   前端使用固定 filter: #divEdit
 *   可以單獨使用CrudE(必要時執行CrudE.setGlobal()), 例如:簽核
 * 寫入 _me 屬性:
 *   crudE
 *   divEdit
 *   hasEdit
 *   edit0 {EditOne}
 *   eform0 
 * 自動呼叫 _me 函數:
 *   void fnAfterOpenEdit(fun, json):
 *   fnUpdateOrViewA(fun, key) -> fnGetJsonAndEditA(fun, key)
 *   bool fnGetJsonAndEditA(fun, key): 自訂 GetUpdJson/GetViewJson 函數, see _getJsonAndEditA
 *   string fnWhenSave(fun): 此時還沒有產生 updated json, return error msg
 *   void fnWhenSave2(fun, json): 此時已經產生 updated json
 * 公用屬性: 無
 */
class CrudE {
    private _nowFun: FunEstr;
    private _edits: OneMany[] | EditDto[];
    private _multiEdit: boolean;
    private _nowEditNo: number;
    private _edit0: EditOne;

    /**
     * @param edits {object Array} for edit form
     *   1.null: means one table, get eform
     *   2.many edit object, if ary0 is null, then call new EditOne(), 表示多個編輯"區域"
     *   3.如果是 DtoEdit list, 表示多個編輯"畫面"
     */
    constructor(edits: OneMany[] | EditDto[]) {
        this._nowFun = '';
        this._edits = edits;
        this._multiEdit = false;
        this._nowEditNo = 0;

        _me.crudE = this;

        if (edits && edits[0] instanceof EditDto) {
            this._multiEdit = true;
            _me.hasEdit = true;
            for (let i = 0; i < edits.length; i++) {
                const dto = edits[i] as EditDto;
                this._initEdit0(dto.edits);
            }
            this.mEditSetEditNo(0);
        } else {
            const divEdit = $('#divEdit');
            _me.hasEdit = (divEdit.length > 0 && divEdit.find('form').length > 0);
            _me.divEdit = divEdit;
            if (_me.hasEdit) {
                if (edits == null || edits.length == 0) {
                    edits = [new EditOne()];
                }
                this._initEdit0(edits as OneMany[]);
                _me.edit0 = edits[0] as EditOne;
                _me.eform0 = _me.edit0.eform;

                for (let i = 1; i < edits.length; i++) {
                    if (edits[i] instanceof EditOne) {
                        (edits[i] as EditOne).setIs1to1();
                    }
                }
            }
        }

        this._edit0 = _me.edit0;
    }

    getEditByNo(editNo: number): OneMany {
        return this._edits[editNo] as OneMany;
    }

    viewFileByEditNo(editNo: number, table: string, fid: string): void {
        (this._edits[editNo] as OneMany).onViewFile(table, fid);
    }

    setGlobal(): void {
        _me.crudE = this;
        _me.edit0 = this._edit0;
        _me.eform0 = _me.edit0.eform;
    }

    private _initEdit0(edits: OneMany[]): void {
        let edit0 = edits[0] as EditOne;
        if (edit0 == null) {
            edit0 = new EditOne();
            edits[0] = edit0;
        }

        //const childs = _Edit.Childs;
        edit0._childs = [];
        for (let i = 1; i < edits.length; i++) {
            edit0._childs[i - 1] = edits[i];
        }

        this._initForm(edit0);
    }

    private _initForm(edit: OneMany): void {
        if (edit.eform == null) return;

        _iDate.init(edit.eform);
        edit.validator = _Valid.init(edit.eform);
        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            this._initForm(this._EditGetChild(edit, i));
        }
    }

    //mEditGetDivEdit -> getDivEdit
    getDivEdit(): JQuery {
        return this._multiEdit
            ? (this._edits[this._nowEditNo] as EditDto).divEdit
            : _me.divEdit;
    }

    mEditSetEditNo(editNo: number): void {
        if (this._multiEdit) {
            this._nowEditNo = editNo;

            const dto = this._edits[editNo] as EditDto;
            _me.divEdit = dto.divEdit;
            _me.edit0 = dto.edits[0] as EditOne;
            _me.eform0 = _me.edit0.eform;
        }
    }

    mEditGetEditNo(): number {
        return this._nowEditNo;
    }

    loadJson(json: Json): void {
        this._loadJson2(_me.edit0, json);
    }

    private _loadJson2(edit: OneMany, json: Json): void {
        const rows = _Edit.jsonGetRows(json);
        if (_Edit.isEditOne(edit)) {
            const edit1 = edit as EditOne;
            edit1.loadRow(_Array.isEmpty(rows) ? null : rows[0]);
            edit1.dataJson = json;
        } else {
            (edit as EditMany).loadRowsBySys(rows);
        }

        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            const json2 = _Edit.getChildJson(json, i);
            this._loadJson2(edit2, json2);
        }
    }

    afterOpen(fun: FunEstr, json: Json): void {
        if (_me.fnAfterOpenEdit) {
            _me.fnAfterOpenEdit(fun, json);
        }
    }

    setEditStatus(fun: FunEstr): void {
        this._nowFun = fun;

        const box = this.getDivEdit();
        const items = box.find('[data-edit]');
        _Obj.setEdit(items, false);
        if (fun == FunEstr.View) {
            _Obj.setEdit(box.find('#btnToRead'), true);
            _iHtml.setEdits(box, '', false);
        } else if (fun == FunEstr.Create) {
            _Obj.setEdit(items.filter('button'), true);
            const dataEdit = '[data-edit=""],[data-edit*=C]';
            _Obj.setEdit(items.filter(dataEdit), true);
            _iHtml.setEdits(box, '', true);
            _iHtml.setEdits(box, dataEdit, false);
        } else if (fun == FunEstr.Update) {
            _Obj.setEdit(items.filter('button'), true);
            const dataEdit = '[data-edit=""],[data-edit*=U]';
            _Obj.setEdit(items.filter(dataEdit), true);
            _iHtml.setEdits(box, '', true);
            _iHtml.setEdits(box, dataEdit, false);
        }

        box.find('span.error').remove();
    }

    private _hasFile(): boolean {
        const edit = _me.edit0;
        if (edit.hasFile) return true;

        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (edit2.hasFile) return true;
        }

        return false;
    }

    private _getUpdJson(formData: FormData): any {
        const edit0 = _me.edit0;
        const key = edit0.getKey();

        let fileJson: any = {};
        const dataJson: any = {};
        const levelStr = '0';
        if (edit0.hasFile) {
            fileJson = edit0.dataAddFiles(levelStr, formData);
        }

        this._getUpdJson2(edit0, key, levelStr, formData, fileJson, dataJson);

        let hasData = (!_Json.isEmpty(dataJson));
        if (!_Json.isEmpty(fileJson)) {
            hasData = true;
            dataJson[_Edit.FileJson] = fileJson;
        }

        if (!hasData) return null;

        _Json.removeNull(dataJson);
        return dataJson;
    }

    private _getUpdJson2(edit: OneMany, key: StrNum, levelStr: string, formData: FormData, fileJson: Json, dataJson: Json): boolean {
        if (edit.hasFile) {
            const fileJson2 = edit.dataAddFiles(levelStr, formData);
            _Json.copy(fileJson2, fileJson);
        }

        const isOne = _Edit.isEditOne(edit);
        const json = isOne
            ? (edit as EditOne).getUpdRow(key)
            : (edit as EditMany).getUpdJsonBySys(key);
        if (_Json.isEmpty(json)) return false;

        if (isOne) {
            dataJson[_Edit.Rows] = [json];
        } else {
            _Json.copy(json, dataJson);
        }

        const childLen = this._EditGetChildLen(edit);
        if (childLen == 0) return false;

        dataJson[_Edit.Childs] = [];
        const childs = dataJson[_Edit.Childs];

        let hasChild = false;

        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            const key2 = (_Edit.isEditOne(edit2)) ? edit2.getKey() : key;

            childs[i] = {};
            if (this._getUpdJson2(edit2, key2, levelStr + i, formData, fileJson, childs[i])) {
                hasChild = true;
            }
        }
        return hasChild;
    }

    validAll(): boolean {
        const edit = _me.edit0;
        if (_Str.notEmpty(edit.systemError)) {
            _Tool.msg(edit.systemError);
            return false;
        }

        if (!edit.eform.valid()) return false;

        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (_Str.notEmpty(edit2.systemError)) {
                _Tool.msg(edit2.systemError);
                return false;
            }

            if (!edit2.valid()) return false;
        }

        return true;
    }

    afterSave(data: Json): void {
        if (_me.fnAfterSave) {
            _me.fnAfterSave();
        }

        if (data.Value === '0') {
            _Tool.msg(_BR.SaveNone);
            return;
        }

        _Tool.alert(_BR.SaveOk + '(' + data.Value + ')');

        if (_me.crudR) {
            _me.crudR.dt.reload();
            _me.crudR.toReadMode();
        }
    }

    private _afterSaveDraft(data: any): void {
        if (data.Value === '0') {
            _Tool.msg(_BR.SaveNone);
            return;
        }

        _Tool.alert(_BR.SaveOk);

        if (_me.crudR) {
            _me.crudR.toReadMode();
        }
    }

    private _resetForm(edit: any, init: boolean): void {
        edit.reset(init);

        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            if (_Edit.isEditOne(edit2)) {
                edit2.reset(init);
            } else {
                edit2.reset();
            }
        }
    }

    isEditMode(): boolean {
        return this._nowFun !== FunEstr.View;
    }

    private async _getJsonAndEditA(fun: string, key: StrNum): Promise<boolean> {
        if (_me.fnGetJsonAndEditA) {
            return await _me.fnGetJsonAndEditA(fun, key);
        }

        const me = this;
        const data: any = { key: key };
        if (this._multiEdit) {
            data.editNo = this._nowEditNo;
        }
        const act = (fun == FunEstr.Update) ? 'GetUpdJson' :
            (fun == FunEstr.Create) ? 'GetSignJson' :
                'GetViewJson';
        await _Ajax.getJsonA(act, data, function (json) {
            me.loadJsonAndEdit(json, fun);
        });
        return true;
    }

    loadJsonAndEdit(json: Json, fun: string): void {
        this.loadJson(json);
        this.setEditStatus(fun);
        this.afterOpen(fun, json);
        _me.crudR.toEditMode(fun);
    }

    private _EditGetChild(edit: OneMany, childIdx: number): any {
        return edit._childs[childIdx];
    }

    private _EditGetChildLen(edit: OneMany): number {
        //const fid = _Edit.Childs;
        return (edit._childs == null) ? 0 : edit._childs.length;
    }

    editToNew(): void {
        const fun = FunEstr.Create;
        _Prog.showPath(fun);
        this.setEditStatus(fun);

        const edit = _me.edit0;
        edit.resetKey();

        const childLen = this._EditGetChildLen(edit);
        for (let i = 0; i < childLen; i++) {
            const edit2 = this._EditGetChild(edit, i);
            edit2.rowsToNew();
        }
    }

    dataSetFileJson(data: any, fileJson: any): void {
        if (_Json.isEmpty(fileJson)) return;

        const fid = _Edit.FileJson;
        if (data.has(fid)) {
            const json = data.get(fid);
            fileJson = _Json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    }

    onCreate(): void {
        const fun = FunEstr.Create;
        this._resetForm(_me.edit0, true);
        this.setEditStatus(fun);
        this.afterOpen(fun, null);
    }

    async onUpdateA(key: any): Promise<boolean> {
        return await this._getJsonAndEditA(FunEstr.Update, key);
    }

    async onViewA(key: any): Promise<boolean> {
        return await this._getJsonAndEditA(FunEstr.View, key);
    }

    async onSignA(key: any): Promise<boolean> {
        return await this._getJsonAndEditA(FunEstr.Create, key);
    }

    async onCopyA(key: any): Promise<void> {
        if (await this._getJsonAndEditA(FunEstr.View, key)) {
            this.editToNew();
        }
    }

    onOpenModal(title: string, fid: string, required: boolean, maxLen: number): void {
        const tr = _Fun.getMe().closest('tr');
        _Tool.showArea(title, _iText.get(fid, tr), this.isEditMode(), function (result: any) {
            _iText.set(fid, result, tr);
        });
    }

    async onSaveA(): Promise<void> {
        if (!this.validAll()) {
            _Tool.alert(_BR.InputWrong);
            return;
        }

        if (_me.fnWhenSave) {
            const error = _me.fnWhenSave(this._nowFun);
            if (_Str.notEmpty(error)) {
                _Tool.msg(error);
                return;
            }
        }

        const formData = new FormData();
        const json = this._getUpdJson(formData);
        if (_Json.isEmpty(json)) {
            _Tool.msg(_BR.SaveNone);
            return;
        }

        if (_me.fnWhenSave2) {
            const error = _me.fnWhenSave2(this._nowFun, json);
            if (_Str.notEmpty(error)) {
                _Tool.msg(error);
                return;
            }
        }

        const edit0 = _me.edit0;
        const isNew = (this._nowFun == FunEstr.Create);
        const action = isNew ? 'Create' : 'Update';
        let data: any = null;
        const me = this;
        if (this._hasFile()) {
            data = formData;
            data.append('json', _Json.toStr(json));
            if (!isNew) {
                data.append('key', edit0.getKey());
            }
            if (this._multiEdit) {
                data.append('editNo', this._nowEditNo);
            }

            await _Ajax.getJsonByFdA(action, data, function (result: any) {
                me.afterSave(result);
            });
        } else {
            data = { json: _Json.toStr(json) };
            if (!isNew) {
                data.key = edit0.getKey();
            }
            if (this._multiEdit) {
                data.editNo = this._nowEditNo;
            }

            await _Ajax.getJsonA(action, data, function (result) {
                me.afterSave(result);
            });
        }
    }

    async onDraftA(): Promise<void> {
        const formData = new FormData();
        const json = this._getUpdJson(formData);
        if (_Json.isEmpty(json)) {
            _Tool.msg(_BR.SaveNone);
            return;
        }

        const edit0 = _me.edit0;
        const action = 'Draft';
        let data: any = null;
        const me = this;
        if (this._hasFile()) {
            data = formData;
            data.append('json', _Json.toStr(json));
            data.append('key', edit0.getKey());

            if (this._multiEdit) {
                data.append('editNo', this._nowEditNo);
            }

            await _Ajax.getJsonByFdA(action, data, function (result: any) {
                me._afterSaveDraft(result);
            });
        } else {
            data = { json: _Json.toStr(json) };
            data.key = edit0.getKey();

            if (this._multiEdit) {
                data.editNo = this._nowEditNo;
            }

            await _Ajax.getJsonA(action, data, function (result) {
                me._afterSaveDraft(result);
            });
        }
    }
}
window.CrudE = CrudE;