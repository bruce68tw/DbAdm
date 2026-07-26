/**
 * 多筆編輯畫面(包含1對1), 全部屬性皆為 private !!
 * 注意:
 *   如果有radio, 系統會自動name後面增"_x", 才能正常設定checkec狀態
 *   set data-fkeyFid when save
 *   函數名稱後面ByRsb(表示by RowsBox)為擴充原本函數, 參數rowsBox空白則為this.RowsBox
 * 公用屬性:(同EditOne)
 * 自定函數:
 *   void fnLoadRows(rows)(old: fnLoadJson(json))：show json to form, use loadJson instead of loadRows for more situation !!
 *   json fnGetUpdJson(upKey)：get updated json by form
 *   bool fnValid()：validate check
 *   void fnReset()：reset
 * @class EditMany
 */
class EditMany {
    //private [_Edit.Childs]: any = null;

    private _hasRowTpl: boolean;
    private _hasRowFilter: boolean;
    private _hasEform: boolean;
    private _mode = EditModeEstr.Base;
    private _modeData: any = '';
    private _sortFid: string;
    private _rowTpl = '';
    private _rowFilter: string;
    private _rowsBox: JQuery;
    private _deletedRows: StrNum[] = [];
    private _newIndex = 0;

    //global
    _childs: EditMany[];
    kid: string;
    eform: JQuery;
    validator: any;
    dataJson: Json; //主要用於EditOne存原始資料, GenCrud屬特殊情形mTable會使用 
    systemError = '';
    fnReset: () => void;
    fnLoadRows: (rows: Json[]) => void;
    fnValid: () => boolean;
    fnGetUpdJson: (upKey: StrNum) => Json;

    //global & set by _Edit
    hasFile: boolean;
    fidTypes: string[];
    fidTypeLen: number;
    fidRadios: string[];
    fileLen: number;
    fileFids: string[];

    /**
     * @constructor
     * initial & set instance variables (this.validator by _valid.init())
     * @param kid {string} pkey field id(single key)
     * @param rowsBoxId {string} (optional) rows box id,
     *   if empty, you must write functions: fnLoadRows、fnGetUpdJson、fnValid、fnReset，
     *     新增一筆時設定newId
     * @param rowTplId {string} (need for base mode) row template id, one mode 不可空白, 
     *   1.if empty, it will log error when call related function.
     *   2.system get fid-type from this variables
     *   3.called by singleFormLoadRow、loadRowsByRsb、_renderRow
     * @param rowFilter {string} (need for base mode) jQuery filter for find row object
     *   1.if empty, it will log error when call related function.
     *   2.inside element -> row(onDeleteRow),
     *   3.rowsBox -> row(getUpdRows)
     * @param sortFid {string} (optional) sort fid for front-side sorting function
     */
    constructor(kid: string, rowsBoxId?: string, rowTplId?: string, rowFilter?: string, sortFid?: string) {
        this.kid = kid;
        this._rowFilter = rowFilter || '';
        this._sortFid = sortFid || '';
        this._hasRowTpl = _Str.notEmpty(rowTplId);
        this._hasRowFilter = _Str.notEmpty(rowFilter);

        if (this._hasRowTpl) {
            this._rowTpl = $('#' + rowTplId).html();
            var rowObj = $(this._rowTpl);

            if (_Obj.get(kid, rowObj) == null) {
                this.systemError = `EditMany.js input kid is wrong (${kid})`;
                alert(this.systemError);
            }

            _Edit.initVars(this, rowObj);
        }

        this._hasEform = _Str.notEmpty(rowsBoxId);
        if (this._hasEform) {
            this._rowsBox = $('#' + rowsBoxId);
            this.eform = this._rowsBox.closest('form');
            if (this._rowsBox.length == 0) {
                this.systemError = `EditMany.js rowsBoxId is wrong (${rowsBoxId})`;
                alert(this.systemError);
            }
        }

        this._deletedRows = [];
        this._newIndex = 0;
    }

    showErrors(rows: Json[] | null) {
        if (rows == null) return;

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var item = _Obj.get(row.fid, this.idToRowBox(row.id));
            this.validator.showLabel(item[0], row.msg);
            item.addClass('error');
        }
    }

    setChilds(childs: EditMany[]) {
        this._childs = childs;
    }

    initUrm(fids: string[]) {
        this._mode = EditModeEstr.UR;
        this._modeData = fids;
    }

    private _isNewBox(box: JQuery): boolean {
        return _Edit.isNewBox(box, this.kid);
    }

    reset(rowsBox?: JQuery, forNew?: boolean) {
        if (forNew == null) forNew = false;

        rowsBox = this._getRowsBox(rowsBox);

        if (this.fnReset) {
            this.fnReset();
        } else if (this._mode == EditModeEstr.UR) {
            this._urmReset();
        } else if (this._hasEform) {
            rowsBox.empty();
            this._resetVar();
        }
    }

    private _resetVar() {
        this._newIndex = 0;
        this._resetDeletes();
    }

    private _resetDeletes() {
        this._deletedRows = [];
    }

    private _urmLoadRows(rows: Json[] | null) {
        this._urmReset();

        if (rows == null)
            return;

        var fids = this._modeData;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = this._rowsBox.find(_Input.fidFilter(row[fids[1]]));
            _iCheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    }

    //todo: upKey: key or fKid?
    private _urmGetUpdJson(upKey: StrNum): Json {
        var json: Json = {};
        var rows: Json[] = [];
        var me = this;
        var newIdx = 0;
        var fids = this._modeData;
        this._resetDeletes();
        this._rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_Str.isEmpty(key)) {
                if (_iCheck.isCheckedO(obj)) {
                    var row: Json = {};
                    row[fids[0]] = --newIdx;
                    row[fids[1]] = _iCheck.getO(obj);
                    me.rowSetFkey(row, upKey);
                    rows[rows.length] = row;
                }
            } else {
                if (!_iCheck.isCheckedO(obj)) {
                    me.deleteRow(key);
                }
            }
        });

        if (rows.length > 0)
            json[_Edit.Rows] = rows;
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }

    private _urmReset() {
        this._resetVar();

        var objs = this._rowsBox.find(':checkbox');
        _iCheck.setO(objs, 0);
        objs.data('key', '');
    }

    loadRowsBySys(rows: Json[]) {
        if (this.fnLoadRows) {
            this.fnLoadRows(rows);
        } else if (this._mode == EditModeEstr.UR) {
            this._urmLoadRows(rows);
        } else {
            this.loadRowsByRsb(rows, true);
        }
    }

    loadRowByBox(rowBox: JQuery, row: Json, index: number) {
        row.Index = index;
        var tr = $(Mustache.render(this._rowTpl, row));

        var fid: string;
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            _Edit.setOld(_Obj.get(fid, tr), row[fid]);
        }

        for (var i = 0; i < this.fidRadios.length; i++) {
            fid = this.fidRadios[i];
            tr.find(`[name='${fid}']`).attr('name', `${fid}_${index}`);
        }

        _iDate.init(tr);

        _Form.loadRow(tr, row);

        tr.appendTo(rowBox);
    }

    loadRowsByRsb(rows: Json[] | null, reset?: boolean, rowsBox?: JQuery) {
        if (!this._checkRowTpl())
            return;

        rowsBox = this._getRowsBox(rowsBox);
        if (_Var.isEmpty(reset) || reset)
            this.reset(rowsBox);

        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen == 0)
            return;

        for (var i = 0; i < rowLen; i++) {
            this.loadRowByBox(rowsBox, rows[i], i);
        }
    }

    valid(): boolean {
        return this.fnValid ? this.fnValid() :
            this._hasEform ? (this.eform as any).validTable(this.validator) :
            true;
    }

    getKey(rowBox: JQuery): StrNum {
        return _Input.get(this.kid, rowBox);
    }

    private _checkRowFilter(): boolean {
        if (this._hasRowFilter)
            return true;

        _Log.error('EditMany.js this.rowFilter is empty.');
        return false;
    }

    private _checkRowTpl(): boolean {
        if (this._hasRowTpl)
            return true;

        _Log.error('EditMany.js this.rowTpl is empty.');
        return false;
    }

    private _elmToRowBox(elm: Elm | JQuery): JQuery | null {
        return this._checkRowFilter()
            ? $(elm).closest(this._rowFilter)
            : null;
    }

    idToRowBox(id: StrNum): JQuery {
        var filter = _Input.fidFilter(this.kid) + `[value='${id}']`;
        return this.eform.find(filter).closest(this._rowFilter);
    }

    getUpdJsonBySys(upKey: StrNum): Json {
        if (this.fnGetUpdJson)
            return this.fnGetUpdJson(upKey);
        else if (this._mode == EditModeEstr.UR)
            return this._urmGetUpdJson(upKey);
        else
            return this.getUpdJsonByRsb(upKey, this._rowsBox);
    }

    getUpdJsonByRsb(upKey: StrNum, rowsBox?: JQuery): Json {
        var json: Json = {};
        json[_Edit.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }

    getUpdRow(box: JQuery): Json {
        return _Edit.getUpdRow(this, box);
    }

    getUpdRows(upKey: StrNum, rowsBox?: JQuery): Json[] | null {
        if (!this._checkRowFilter()) return null;

        rowsBox = this._getRowsBox(rowsBox);
        if (_Obj.isEmpty(rowsBox)) return null;

        this.setSort(rowsBox);

        var rows: Json[] = [];
        var me = this;
        rowsBox.find(me._rowFilter).each(function (idx: number) {
            var box = $(this);
            var key = _Input.get(me.kid, box);
            if (me._isNewBox(box)) {
                var row2 = _Form.toRow(box);
                row2[_Edit.DataFkeyFid] = upKey;
                rows.push(row2);
                return;
            }

            var diffRow: Json = {};
            var diff = false;
            var fid: string, ftype: string, value: StrNum, obj: JQuery;
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                fid = me.fidTypes[j];
                obj = _Obj.get(fid, box);
                if (obj.hasClass('xi-unsave'))
                    continue;

                ftype = me.fidTypes[j + 1];
                value = _Input.getO(obj, box, ftype);
                if (value != _Edit.getOld(obj)) {
                    diffRow[fid] = value;
                    diff = true;
                }
            }

            if (diff) {
                diffRow[me.kid] = key;
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    }

    getDeletes(): StrN {
        return (this._deletedRows.length === 0)
            ? null : this._deletedRows.join();
    }

    onAddRow() {
        this.addRow();
    }

    addRow(row?: Json, rowsBox?: JQuery, newId?: number): Json {
        row = row || {};
        rowsBox = this._getRowsBox(rowsBox);
        var obj = this._renderRow(row, rowsBox);
        newId = this.setNewIdByBox(obj!, newId);
        row[this.kid] = newId;
        return row;
    }

    onDeleteRow() {
        var box = this._elmToRowBox(_Fun.getMe());
        if (box) {
            this.deleteRow(_iText.get(this.kid, box), box);
        }
    }

    deleteRow(key: StrNum, rowBox?: JQuery) {
        var deletes = this._deletedRows;
        var found = false;
        var rowLen = deletes.length;
        for (var i = 0; i < rowLen; i++) {
            if (deletes[i] === key) {
                found = true;
                break;
            }
        }

        if (!found)
            deletes[rowLen] = key;

        if (_Obj.notEmpty(rowBox))
            rowBox!.remove();
    }

    deleteAll() {
        var me = this;
        this._rowsBox.find(this._rowFilter).each(function () {
            var box = $(this);
            var key = _Input.get(me.kid, box);
            me.deleteRow(key, box);
        });
    }

    async onViewFile(table: string, fid: string) {
        var elm = _Fun.getMeElm();
        var box = this._elmToRowBox(elm);
        if (box) {
            var key = this.getKey(box);
            await _Edit.viewFileA(table, fid, elm, key as string);
        }
    }

    private _renderRow(row: Json, rowsBox?: JQuery): JQueryN {
        if (!this._checkRowTpl())
            return null;

        rowsBox = this._getRowsBox(rowsBox);
        var obj = $(Mustache.render(this._rowTpl, row));
        _Form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    }

    dataAddFiles(levelStr: string, data: FormData, rowsBox?: JQuery): Json {
        if (!this.hasFile) return null;
        if (!this._checkRowFilter()) return null;

        rowsBox = this._getRowsBox(rowsBox);
        var me = this;
        var fileJson: Json = {};
        var fileIdx: Json = {};
        rowsBox.find(me._rowFilter).each(function () {
            var tr = $(this);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _Edit.getFileSid(levelStr, fid);
                if (_iFile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        return fileJson;
    }

    rowSetFkey(row: Json, fKey: StrNum) {
        if (row != null && _Edit.isNewKey(fKey))
            row[_Edit.DataFkeyFid] = fKey;
    }

    rowsSetFkey(rows: Json[] | null, fkey: string) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && _Edit.isNewRow(row, this.kid))
                    row[_Edit.DataFkeyFid] = fkey;
            }
        }
    }

    rowsToNew() {
        if (this._rowsBox == null || this._rowsBox.length == 0) return;

        var me = this;
        me._newIndex = 0;
        me._rowsBox.find(me._rowFilter).each(function () {
            me._newIndex--;
            _iText.set(me.kid, me._newIndex.toString(), $(this));
        });
    }

    setNewIndex(index: number) {
        this._newIndex = Math.abs(index) * -1;
    }

    setNewIdByBox(box: JQuery, newId?: number): number {
        if (newId == null) {
            this._newIndex--;
            newId = this._newIndex;
        }

        var box2 = _Obj.get(this.kid, box).closest(this._rowFilter);
        _iText.set(this.kid, newId.toString(), box2);
        return newId;
    }

    setSort(rowsBox?: JQuery) {
        var sortFid = this._sortFid;
        if (_Str.isEmpty(sortFid))
            return;

        var me = this;
        rowsBox = this._getRowsBox(rowsBox);
        rowsBox.find(_Input.fidFilter(sortFid!)).each(function (idx: number) {
            _iText.set(sortFid!, idx.toString(), $(this).closest(me._rowFilter));
        });
    }

    private _getRowsBox(rowsBox?: JQuery): JQuery {
        return rowsBox || this._rowsBox;
    }
}
window.EditMany = EditMany;