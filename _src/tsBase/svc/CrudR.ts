/**
 * 控制 CRUD 查詢(含編輯)畫面
 * 說明:
 *   允許不同編輯畫面共用查詢畫面, 參考 Crud/Read.cshtml
 *   前端使用固定 filter: #divRead、#formRead、#formRead2、#tableRead
 *   後端固定呼叫 GetPage action
 * 寫入 _me 屬性:
 *   crudR
 *   divRead
 *   hasRead
 *   rform
 *   rform2
 * 自動呼叫 _me 函數:
 *   fnAfterFind(result):
 *   void fnAfterSwap(toRead):
 * 公用屬性:
 *   rform
 *   rform2
 *   dt
 */
class CrudR {
    //global
    temp: Json;
    divRead: JQuery;
    dt: Datatable;
    hasDraft: boolean;  //是否有草稿功能

    private _updName: string;

    constructor(dtConfig: Json, edits?: OneMany[] | EditDto[], updName?: string) {
        //save middle variables
        this.temp = {};

        //1.set instance variables
        this.divRead = $('#divRead');
        var rform: any = null;
        var rform2: any = null;
        var hasRead: boolean = this.divRead.length > 0;
        if (hasRead) {
            rform = $('#formRead');
            if (rform.length === 0) rform = null;
            rform2 = $('#formRead2');
            if (rform2.length === 0) rform2 = null;
            if (rform != null) _iDate.init(rform);
            if (rform2 != null) _iDate.init(rform2);

            //4.Create Datatable object
            //傳入 _me.fnAfterFind if any !!
            if (_Var.notEmpty(dtConfig)) {
                this.dt = new Datatable(
                    '#tableRead',
                    'GetPage',
                    dtConfig,
                    this._getFindCond(),
                    null,
                    null,
                    _me.fnAfterFind || null
                );
            }
        }

        //this._Edits = edits;
        this._updName = updName;

        //是否有草稿功能
        this.hasDraft = $('#btnDraft').length > 0;

        //2.init edit
        new CrudE(edits);

        //3.set prog path
        _Prog.init();

        //set _me
        _me.crudR = this;
        _me.rform = rform;
        _me.rform2 = rform2;
        _me.hasRead = hasRead;
        _me.divRead = this.divRead;
    }

    /**
     * onclick viewFile
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    viewFile(table: string, fid: string, key: StrNum, fileName: string): void {
        var ext: string = _File.getFileExt(fileName);
        if (_File.isImageExt(ext))
            _Tool.showImage(
                fileName,
                _Str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext)
            );
    }

    /**
     * button html string
     * @param key {StrNum}
     * @param label {string}
     * @param fnOnclick {string}
     * @param fnArgs {string} 多個時逗號分隔
     * @returns button html string
     */
    dtBtn(key: StrNum, label: string, fnOnclick: string): string {
        return `<button type="button" class="btn btn-sm x-btn-other" data-onclick="${fnOnclick}" data-args="${key}">${label}</button>`;
    }

    /**
     * checkbox for multiple select
     * @param value {string} [1] checkbox value
     * @param editable {bool} [true]
     */
    dtCheck0(value: StrNum, editable?: boolean): string {
        if (_Str.isEmpty(value as string)) value = 1;

        //attr
        var attr: string = "data-fid='" + _iCheck.fidCheck0 + "'" + " data-value='" + value + "'";
        if (editable === false) attr += ' readonly';
        //if (checked)
        //    attr += ' checked';

        //x-no-label for checked sign position
        return (
            '' +
            "<label class='xi-check x-no-label'>" +
            '   <input ' +
            attr +
            " type='checkbox'>" +
            "   <span class='xi-cspan'></span>" +
            '</label>'
        );
    }

    //??
    dtRadio1(value: StrNum, editable?: boolean): string {
        if (editable === undefined) editable = true;
        return _iRadio.render(_iCheck.fidCheck0, '', false, value, editable);
    }

    /**
     * set status column(checkbox)
     * @param value {string} checkbox value, will translate to bool
     * @param fnOnClick {string} onclick function, default to this.onSetStatusA
     */
    dtSetStatus(kid: string, value: StrNum, fnOnClick?: string): string {
        //TODO: pending
        return '';

        /*
        //debugger;
        var checked = _Str.toBool(value);
        if (_Str.isEmpty(fnOnClick)) {
            fnOnClick = `_me.crudR.onSetStatusA(this,\'{0}\')`, key);
        }
        //??
        return _iCheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
        */
    }

    dtStatusName(value: StrNum): string {
        return value == '1'
            ? '<span>' + _BR.StatusYes + '</span>'
            : '<span class="text-danger">' + _BR.StatusNo + '</span>';
    }

    dtYesEmpty(value: StrNum): string {
        return value == '1' ? _BR.Yes : '';
    }

    //顯示紅色文字 by status
    dtRed(text: string, status: boolean): string {
        return status
            ? '<span class="text-danger">' + text + '</span>'
            : '<span>' + text + '</span>';
    }

    /**
     * !! change link to button
     * 取消參數 fnOnUpdate, fnOnDelete, fnOnView
     * crud functions: update,delete,view
     * @param key {string} row key
     * @param rowName {string} for show row name before delete
     * @param hasUpdate {bool} has update icon or not
     * @param hasDelete {bool} has delete icon or not
     * @param hasView {bool} has view icon or not
     */
    //dtCrudFun(key, rowName, hasUpdate, hasDelete, hasView, fnOnUpdate, fnOnDelete, fnOnView) {
    dtCrudFun(
        key: string,
        rowName: string,
        hasUpdate: boolean = false,
        hasDelete: boolean = false,
        hasView: boolean = false,
        hasCopy: boolean = false
    ): string {
        const preStr: string = `button type="button" class="btn btn-link"`;
        var funs: string = '';
        if (hasUpdate)
            funs += `<${preStr} data-onclick="_me.crudE.onUpdateA" data-args="${key}"><i class="ico-pen" title="${_BR.TipUpdate}"></i></button>`;
        if (hasDelete)
            funs += `<${preStr} data-onclick="_me.crudR.onDeleteA" data-args="${key},${rowName}"><i class="ico-delete x-delete" title="${_BR.TipDelete}"></i></button>`;
        if (hasView)
            funs += `<${preStr} data-onclick="_me.crudE.onViewA" data-args="${key}"><i class="ico-eye" title="${_BR.TipView}"></i></button>`;
        if (hasCopy)
            funs += `<${preStr} data-onclick="_me.crudE.onCopyA" data-args="${key}"><i class="ico-copy" title="${_BR.TipCopy}"></i></button>`;
        return funs;
    }

    /**
     * get Find condition
     */
    private _getFindCond(): Json {
        if (_me.rform == null) return null;

        var row: Json = _Form.toRow(_me.rform);
        var find2: JQuery = _me.rform2;
        if (find2 !== null && _Obj.isShow(find2))
            _Json.copy(_Form.toRow(find2), row);
        return row;
    }

    /**
     * 移除參數 nowDiv, fnCallback
     * change newDiv to active
     * @param toRead {bool} show divRead or not
     * //param nowDiv {object} (default _me.divEdit) now div to show
     * //param fnCallback {function} (optional) callback function
     */
    swap(toRead: boolean, fnCallback?: () => void): void {
        //同時有read, edit才執行
        if (!_me.hasRead || !_me.hasEdit) return;

        //考慮多個編輯畫面
        var divEdit: any = _me.crudE.getDivEdit();
        var oldDiv: any, newDiv: any;
        if (toRead) {
            oldDiv = divEdit;
            newDiv = this.divRead;
        } else {
            oldDiv = this.divRead;
            newDiv = divEdit;
        }

        oldDiv.addClass('x-off');
        setTimeout(() => {
            oldDiv.addClass('d-none').removeClass('x-off');
            newDiv.removeClass('d-none').addClass('x-on');

            setTimeout(() => {
                newDiv.removeClass('x-on');

                if (fnCallback) {
                    fnCallback();

                    if (_me.fnAfterSwap) _me.fnAfterSwap(toRead);
                    if (toRead) _me.crudE.mEditSetEditNo(0);
                }
            }, 500);
        }, 200);

        if (_me.fnAfterSwap) _me.fnAfterSwap(toRead);

        //還原 nowEditNo
        if (toRead) _me.crudE.mEditSetEditNo(0);
    }

    /**
     * to edit mode
     * XpFlowSign Read.cshtml 待處理!! 
     * param fun {string} U/V
     * param fnCallback {function} 如果進入編輯畫面後要處理畫面, 必須以非同步方式處理
     */
    //toEditMode = function(fun, data) {
    toEditMode(fun: FunEstr, fnCallback?: () => void): void {
        this.swap(false, fnCallback); //call first
        _Prog.showPath(fun, this._updName);
    }

    /**
     * back to list form
     */
    toReadMode(): void {
        //_Obj.show(this.divReadTool);
        _Prog.resetPath();
        this.swap(true);
    }

    /**
     * call fnAfterSwap if existed
     * @param toRead {bool} to read mode or not
     */
    /*
    _afterSwap(toRead) {
        if (_me.fnAfterSwap)
            _me.fnAfterSwap(toRead);
    }
    */

    //=== event start ===
    /**
     * onclick find rows
     */
    onFind(): void {
        var cond: any = this._getFindCond();
        this.dt.find(cond);
    }

    /**
     * onclick find2 button for show/hide find2 form
     */
    onFind2(): void {
        var find2: any = _me.rform2;
        if (find2 == null) return;
        else if (_Obj.isShow(find2)) _Form.hideShow([find2]);
        else _Form.hideShow(null, [find2]);
    }

    /**
     * onclick reset find form
     */
    onResetFind(): void {
        _Form.reset(_me.rform);
        if (_me.rform2 != null) _Form.reset(_me.rform2);
    }

    /**
     * onClick export excel button
     */
    onExport(): void {
        var find: any = this._getFindCond();
        window.location.href = 'Export?find=' + _Json.toStr(find);
    }

    /**
     * onclick toRead button
     */
    onToRead(): void {
        this.toReadMode();
    }

    /**
     * onclick Create button
     * 字尾暫不加上A(非同步)
     */
    async onCreate(): Promise<void> {
        //var fun = FunEstr.Create;
        //this.swap(false);  //call first
        //_Prog.setPath(fun);

        var me: this = this;
        if (this.hasDraft) {
            //讀取草稿 if any
            await _Ajax.getJsonA('GetDraftJson', { key: '' }, function (json: any) {
                if (_Json.isEmpty(json)) me.createAndEdit();
                else _me.crudE.loadJsonAndEdit(json, FunEstr.Create);
            });
        } else {
            this.createAndEdit();
            /*
            _me.crudE.onCreate();
            this.toEditMode(FunEstr.Create);
            */
        }
    }

    createAndEdit(): void {
        _me.crudE.onCreate();
        this.toEditMode(FunEstr.Create);
    }

    /**
     * call _me.crudE
     * onclick Update button
     * @param key {string} row key
     */
    /*
    async onUpdateA(key) {
        //_me.crudE._getJsonAndSetMode(key, FunEstr.Update);
        //this.toEditMode(FunEstr.Update);
        await _me.crudE.onUpdateA(key);
    }
    */

    /**
     * call _me.crudE
     * onclick View button
     * @param key {string} row key
     */
    /*
    async onViewA(key) {
        //_me.crudE._getJsonAndSetMode(key, FunEstr.View);
        await _me.crudE.onViewA(key);
        //this.toEditMode(FunEstr.View);
    }
    */

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    async onSetStatusA(elm: Elm, key: string): Promise<void> {
        var status: boolean = _iCheck.isCheckedO($(elm));
        await _Ajax.getStrA('SetStatus', { key: key, status: status }, function (msg: string) {
            _Tool.alert(_BR.UpdateOk);
        });
    }

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * @param elm {string} row key
     * @param box {string} row key
     * @param fid {string} fid
     */
    //onCheckAll(me, box, fid) {
    onCheckAll(elm: Elm, box: JQuery): void {
        _iCheck.setF(_iCheck.fltCheckeds + ':not(:disabled)', _iCheck.isCheckedO($(elm)), box);
    }

    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    async onDeleteA(key: StrNum, rowName: string): Promise<void> {
        //_temp.data = { key: key }
        const me = this;
        _Tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', async function () {
            await _Ajax.getJsonA('Delete', { key: key }, function (msg: any) {
                _Tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    }

    /**
     * TODO: need test
     * 移除參數 fid
     * no called
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string} 
     */
    //async onDeleteRowsA(box, fid) {
    async onDeleteRowsA(box: JQuery): Promise<void> {
        //get selected keys
        var keys: StrNum[] = _iCheck.getCheck0Values(box);
        if (keys.length === 0) {
            _Tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        //_temp.data = { keys: keys }
        var me = this;
        _Tool.ans(_BR.SureDeleteSelected, async function () {
            await _Ajax.getStrA('DeleteByKeys', { keys: keys }, function (msg: string) {
                _Tool.alert(_BR.DeleteOk);
                me.dt.reload();
            });
        });
    }
    //=== event end ===
}
window.CrudR = CrudR;