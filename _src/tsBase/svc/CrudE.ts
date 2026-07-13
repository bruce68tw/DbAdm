import _Edit from './_Edit';
import _iDate from './_iDate';
import _Valid from './_Valid';
import _Obj from './_Obj';
import _iHtml from './_iHtml';
import _Array from './_Array';
import _Str from './_Str';
import _Tool from './_Tool';
import _Fun from './_Fun';
import _Json from './_Json';
import _Ajax from './_Ajax';
import _Prog from './_Prog';
import _iText from './_iText';
import FunEstr from '../enum/FunEstr';
import EditDto from '../dto/EditDto';
import EditOne from './EditOne';
import EditMany from './EditMany';

export default class CrudE {
  private _nowFun: string;
  private _Edits: any;
  private _multiEdit: boolean;
  private _nowEditNo: number;
  private _Edit0: any;

  constructor(edits: any) {
    this._nowFun = '';
    this._Edits = edits;
    this._multiEdit = false;
    this._nowEditNo = 0;

    _me.crudE = this;

    if (edits && edits[0] instanceof EditDto) {
      this._multiEdit = true;
      _me.hasEdit = true;
      for (let i = 0; i < edits.length; i++) {
        const dto = edits[i];
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
        this._initEdit0(edits);
        _me.edit0 = edits[0];
        _me.eform0 = _me.edit0.eform;

        for (let i = 1; i < edits.length; i++) {
          if (edits[i] instanceof EditOne) {
            edits[i].setIs1to1();
          }
        }
      }
    }

    this._Edit0 = _me.edit0;
  }

  public getEditByNo(editNo: number): EditOne|EditMany {
    return this._Edits[editNo];
  }

  public viewFileByEditNo(editNo: number, table: string, fid: string): void {
    this._Edits[editNo].onViewFile(table, fid);
  }

  public setGlobal(): void {
    _me.crudE = this;
    _me.edit0 = this._Edit0;
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

  private _initForm(edit: any): void {
    if (edit.eform == null) return;

    _iDate.init(edit.eform);
    edit.validator = _Valid.init(edit.eform);
    const childLen = this._EditGetChildLen(edit);
    for (let i = 0; i < childLen; i++) {
      this._initForm(this._EditGetChild(edit, i));
    }
  }

  public mEditGetDivEdit(): any {
    return this._multiEdit
      ? this._Edits[this._nowEditNo].divEdit
      : _me.divEdit;
  }

  public mEditSetEditNo(editNo: number): void {
    if (this._multiEdit) {
      this._nowEditNo = editNo;

      const dto = this._Edits[editNo];
      _me.divEdit = dto.divEdit;
      _me.edit0 = dto.edits[0];
      _me.eform0 = _me.edit0.eform;
    }
  }

  public mEditGetEditNo(): number {
    return this._nowEditNo;
  }

  public loadJson(json: any): void {
    this._loadJson2(_me.edit0, json);
  }

  private _loadJson2(edit: any, json: any): void {
    const rows = _Edit.jsonGetRows(json);
    if (_Edit.isEditOne(edit)) {
      edit.loadRow(_Array.isEmpty(rows) ? null : rows[0]);
      edit.dataJson = json;
    } else {
      edit.loadRowsBySys(rows);
    }

    const childLen = this._EditGetChildLen(edit);
    for (let i = 0; i < childLen; i++) {
      const edit2 = this._EditGetChild(edit, i);
      const json2 = _Edit.getChildJson(json, i);
      this._loadJson2(edit2, json2);
    }
  }

  public afterOpen(fun: string, json: any): void {
    if (_me.fnAfterOpenEdit) {
      _me.fnAfterOpenEdit(fun, json);
    }
  }

  public setEditStatus(fun: string): void {
    this._nowFun = fun;

    const box = this.mEditGetDivEdit();
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

  private _getUpdJson2(edit: any, key: any, levelStr: string, formData: FormData, fileJson: any, dataJson: any): boolean {
    if (edit.hasFile) {
      const fileJson2 = edit.dataAddFiles(levelStr, formData);
      _Json.copy(fileJson2, fileJson);
    }

    const isOne = _Edit.isEditOne(edit);
    const json = isOne
      ? edit.getUpdRow(key)
      : edit.getUpdJsonBySys(key);
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

  public validAll(): boolean {
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

  public afterSave(data: any): void {
    if (_Fun.hasValue(_me.edit0.fnAfterSave)) {
      _me.edit0.fnAfterSave();
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

  public isEditMode(): boolean {
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
    await _Ajax.getJsonA(act, data, function (json: any) {
      me.loadJsonAndEdit(json, fun);
    });
    return true;
  }

  public loadJsonAndEdit(json: any, fun: string): void {
    this.loadJson(json);
    this.setEditStatus(fun);
    this.afterOpen(fun, json);
    _me.crudR.toEditMode(fun);
  }

  private _EditGetChild(edit: EditOne, childIdx: number): any {
    return edit._childs[childIdx];
  }

  private _EditGetChildLen(edit: EditOne): number {
    //const fid = _Edit.Childs;
    return (edit._childs == null) ? 0 : edit._childs.length;
  }

  public editToNew(): void {
    const fun = FunEstr.Create;
    _Prog.setPath(fun);
    this.setEditStatus(fun);

    const edit = _me.edit0;
    edit.resetKey();

    const childLen = this._EditGetChildLen(edit);
    for (let i = 0; i < childLen; i++) {
      const edit2 = this._EditGetChild(edit, i);
      edit2.rowsToNew();
    }
  }

  public dataSetFileJson(data: any, fileJson: any): void {
    if (_Json.isEmpty(fileJson)) return;

    const fid = _Edit.FileJson;
    if (data.has(fid)) {
      const json = data.get(fid);
      fileJson = _Json.copy(fileJson, json);
    }
    data.set(fid, fileJson);
  }

  public onCreate(): void {
    const fun = FunEstr.Create;
    this._resetForm(_me.edit0, true);
    this.setEditStatus(fun);
    this.afterOpen(fun, null);
  }

  public async onUpdateA(key: any): Promise<boolean> {
    return await this._getJsonAndEditA(FunEstr.Update, key);
  }

  public async onViewA(key: any): Promise<boolean> {
    return await this._getJsonAndEditA(FunEstr.View, key);
  }

  public async onSignA(key: any): Promise<boolean> {
    return await this._getJsonAndEditA(FunEstr.Create, key);
  }

  public async onCopyA(key: any): Promise<void> {
    if (await this._getJsonAndEditA(FunEstr.View, key)) {
      this.editToNew();
    }
  }

  public onOpenModal(title: string, fid: string, required: boolean, maxLen: number): void {
    const tr = _Fun.getMe().closest('tr');
    _Tool.showArea(title, _iText.get(fid, tr), this.isEditMode(), function (result: any) {
      _iText.set(fid, result, tr);
    });
  }

  public async onSaveA(): Promise<void> {
    if (!this.validAll()) {
      _Tool.alert(_BR.InputWrong);
      return;
    }

    if (_Fun.hasValue(_me.fnWhenSave)) {
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

    if (_Fun.hasValue(_me.fnWhenSave2)) {
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

      await _Ajax.getJsonA(action, data, function (result: any) {
        me.afterSave(result);
      });
    }
  }

  public async onDraftA(): Promise<void> {
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

      await _Ajax.getJsonA(action, data, function (result: any) {
        me._afterSaveDraft(result);
      });
    }
  }
}