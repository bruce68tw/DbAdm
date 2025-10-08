import _Edit from "./_Edit";
import _Form from "./_Form";
import _Fun from "./_Fun";
import _ICheck from "./_ICheck";
import _IDate from "./_IDate";
import _IFile from "./_IFile";
import _Input from "./_Input";
import _IText from "./_IText";
import _Log from "./_Log";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Var from "./_Var";

// Assume the following are globally available or defined elsewhere:
// And that DataTables and jQuery/Mustache are available.
declare const Mustache: { render: (template: string, view: any) => string };

// Define a minimal interface for the validator object, assuming it's part of jQuery validation or similar
interface Validator {
    // Methods and properties on the validator instance
}

// Global variables, assuming they are imported or globally defined elsewhere
declare const _me: {
    divRoles: JQuery;
    mUserRoleFids: string[];
    crudE: {
        viewFile: (table: string, fid: string, elm: JQuery<HTMLElement> | HTMLElement, key: string) => void;
        getFileSid: (levelStr: string, fid: string) => string;
        // dataSetFileJson: (data: FormData, fileJson: any) => void;
    };
};

/**
 * 多筆編輯畫面
 * multiple edit forms
 * 資料儲存在 html input
 *
 * notice:
 * set data-fkeyFid when save
 * 函數名稱後面ByRsb(表示by RowsBox)為擴充原本函數, 參數rowsBox空白則為this.RowsBox
 *
 * 屬性: 參考 init()
 *
 * 自定函數:
 * void fnLoadRows(rows)(old: fnLoadJson(json))：show json to form, use loadJson instead of loadRows for more situation !!
 * json fnGetUpdJson(upKey)：get updated json by form
 * bool fnValid()：validate check
 * void fnReset()：reset
 *
 * param-1 kid {string} pkey field id(single key)
 * //param-2 eformId {string} (optional) edit form id
 * param-2 rowsBoxId {string} (optional) rows box id
 * if empty, you must write functions: fnLoadRows、fnGetUpdJson、fnValid、fnReset，
 * 新增一筆時設定newId
 * param-3 tplRowId {string} (optional) row template id
 * //tplRowId -> rowTplId
 * 1.if empty, it will log error when call related function.
 * 2.system get fid-type from this variables
 * 3.called by singleFormLoadRow、loadRowsByRsb、_renderRow
 * param-4 rowFilter {string} (optional) jQuery filter for find row object
 * 1.if empty, it will log error when call related function.
 * 2.inside element -> row(onDeleteRow),
 * 3.rowsBox -> row(getUpdRows)
 * param-5 sortFid {string} (optional) sort fid for front-side sorting function
 *
 * return {EditMany}
 */
export default class EditMany {

    // constant
    public readonly DataFkeyFid: string = '_fkeyfid';  //data field for fkey fid, lowercase

    // variables
    public mode: string = _Edit.ModeBase;    //default value
    public modeData: any = '';             //for different mode (e.g., fids array for URM)
    public isUrm: boolean = false;             //is urm or not

    public kid: string;
    public rowFilter?: string;
    public sortFid?: string;
    public systemError: string = '';
    public hasRowTpl: boolean;
    public hasRowFilter: boolean;
    public dataJson: any = null;

    public rowTpl?: string;
    public fidTypes?: string[]; // Array of [fid, ftype, fid, ftype, ...]
    public fidTypeLen: number = 0;
    public hasFile: boolean = false;
    public fileFids?: string[]; // Array of fids that are files
    public fileLen: number = 0;

    public hasEform: boolean = false;
    public rowsBox?: JQuery<HTMLElement>;
    public eform?: JQuery<HTMLElement>;     //edit form object
    public validator?: Validator;

    public deletedRows: string[] = [];  //deleted key string array
    public newIndex: number = 0;      //new row serial no, 使用負數來表示新資料

    // Custom functions, users can assign these
    public fnLoadRows?: (rows: any[]) => void;
    public fnGetUpdJson?: (upKey: string) => any;
    public fnValid?: () => boolean;
    public fnReset?: () => void;

    constructor(
        kid: string,
        rowsBoxId?: string,
        rowTplId?: string,
        rowFilter?: string,
        sortFid?: string
    ) {
        this.kid = kid;
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;
        this.hasRowTpl = _Str.notEmpty(rowTplId);
        this.hasRowFilter = _Str.notEmpty(rowFilter);

        //call last
        this.init(rowTplId, rowsBoxId);
    }

    /**
     * initial & set instance variables (this.validator by _valid.init())
     * call by this
     */
    private init(rowTplId?: string, rowsBoxId?: string): void {

        if (this.hasRowTpl) {
            this.rowTpl = $('#' + rowTplId!).html();
            const rowObj = $(this.rowTpl);

            //check input & alert error if wrong
            if (_Obj.get(this.kid, rowObj) == null) {
                this.systemError = `EditMany.js input kid is wrong (${this.kid})`;
                alert(this.systemError);
            }

            // Note: _edit.initVars sets this.fidTypes, this.fidTypeLen, this.hasFile, etc.
            _Edit.initVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = _Str.notEmpty(rowsBoxId);
        if (this.hasEform) {
            this.rowsBox = $('#' + rowsBoxId!);
            this.eform = this.rowsBox.closest('form');     //edit form object
            if (this.rowsBox.length === 0) {
                this.systemError = `EditMany.js rowsBoxId is wrong (${rowsBoxId})`;
                alert(this.systemError);
            }
        }

        this._resetVar();
    }

    /**
     * initial urm, 參考 XpUser Read.cshmtl
     * param fids: 要傳到後端的欄位id array
     */
    public initUrm(fids: string[]): void {
        this.mode = _Edit.ModeUR;
        this.modeData = fids;
        this.isUrm = true;
    }

    /**
     * isNewTr -> _isNewBox
     * check is a new tr or not
     * param box {object}
     * return {bool}
     */
    private _isNewBox(box: JQuery<HTMLElement>): boolean {
        return (_IText.get(_Edit.IsNew, box) == '1');
    }

    /**
     * reset edit form
     * param rowsBox {object} optional
     */
    public reset(): void {
        if (this.fnReset) {
            this.fnReset();
        } else if (this.isUrm) {
            this._urmReset();
        } else if (this.hasEform) {
            this.rowsBox!.empty();   //empty rows ui first
            this._resetVar();
        }
    }

    //reset variables
    private _resetVar(): void {
        this.newIndex = 0;
        this._resetDeletes();
    }

    /**
     * resetDeleted -> _resetDeletes
     * reset deleted rows
     */
    private _resetDeletes(): void {
        this.deletedRows = [];
    }

    /**
     * urmLoadJson -> urmLoadRows
     * (urm: UserRole Mode), load json rows into UI by urm
     * param rows {json[]}
     */
    private _urmLoadRows(rows: any[]): void {
        this._urmReset();

        //check
        if (rows == null || !this.rowsBox)
            return;

        //set checked sign & old value
        const fids: string[] = this.modeData;
        for (const row of rows) {
            // fid map to dataFid (fids[1])
            const obj = this.rowsBox.find(_Input.fidFilter(row[fids[1]]));
            _ICheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    }

    /**
     * get upd json by UserRole mode(urm), Role欄位使用checkbox
     * called by User.js、XpRole.js
     * param upKey {string} up key
     * return {json} modified columns only
     */
    private _urmGetUpdJson(upKey: string): any {
        const json: any = {};
        const rows: any[] = [];
        const fids: string[] = this.modeData;   //string array
        let newIdx = 0;
        this._resetDeletes();    //reset first

        if (!this.rowsBox) return json;

        this.rowsBox.find(':checkbox').each((_index, element) => {
            const obj = $(element);
            const key = obj.data('key');
            if (_Str.isEmpty(key)) {
                if (_ICheck.checkedO(obj)) {
                    //new row
                    const row: any = {};
                    row[_Edit.IsNew] = '1';     //new row flag
                    row[fids[0]] = ++newIdx;            //Id, base 1 !!
                    row[fids[1]] = _ICheck.getO(obj);   //RoleId
                    this.rowSetFkey(row, upKey);  //set foreign key value
                    rows.push(row);
                }
            } else {
                if (!_ICheck.checkedO(obj)) {
                    //delete row
                    this.deleteRow(key);
                }
            }
        });

        if (rows.length > 0)
            json[_Edit.Rows] = rows;
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }

    private _urmReset(): void {
        this._resetVar();

        if (this.rowsBox) {
            const objs = this.rowsBox.find(':checkbox');
            _ICheck.setO(objs, 0);
            objs.data('key', '');
        }
    }

    /**
     * loadJson(json) -> loadRows(rows)
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * load this json rows into UI, also set old values !!
     * param rows {json[]}
     */
    public loadRows(rows: any[]): void {
        if (this.fnLoadRows) {
            this.fnLoadRows(rows);
        } else if (this.isUrm) {
            this._urmLoadRows(rows);
        } else {
            this.loadRowsByRsb(rows, true);
        }
    }

    /**
     * singleFormLoadRow -> loadRowByBox
     * box 與 rsb(rowsBox) 有些不同, 所以用不同名 !!
     * load one row, also set field old value,
     * ex: DbAdm/MyCrud.js Etable is a single form but has multiple rows property !!
     * param rowBox {object}
     * param row {json}
     * param index {int} 資料序號 base 0
     */
    public loadRowByBox(rowBox: JQuery<HTMLElement>, row: any, index: number): void {
        if (!this.rowTpl || !this.fidTypes)
            return;

        row.Index = index;
        const box = $(Mustache.render(this.rowTpl, row)); //for 顯示欄位

        //set old value for each field
        for (let i = 0; i < this.fidTypeLen; i = i + 2) {
            const fid = this.fidTypes[i];
            _Edit.setOld(_Obj.get(fid, box)!, row[fid]);
        }

        //set date input
        _IDate.init(box);

        //one row into UI for 輸入欄位
        _Form.loadRow(box, row);

        //rowBox.append(box);
        box.appendTo(rowBox);
    }

    /**
     * loadRowsByBox(rowsBox, rows, reset) -> loadRowsByRsb(rows, reset, rowsBox)
     * load rows by rowsBox also set old value
     * param rows {jsons}
     * param reset {bool} (true) reset rowsBox first.
     * param rowsBox {object} (this.rowsBox) rows box object
     */
    public loadRowsByRsb(rows: any[], reset: boolean, rowsBox?: JQuery<HTMLElement>): void {
        if (!this._checkRowTpl())
            return;

        //reset if need
        //use "reset || true"" will cause wrong result !!
        const box = this._getRowsBox(rowsBox);
        if (_Var.isEmpty(reset) || reset)
            this.reset(); // Assuming reset without param is sufficient for rowsBox reset

        //check
        const rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen === 0)
            return;

        //render rows
        for (let i = 0; i < rowLen; i++) {
            this.loadRowByBox(box!, rows[i], i);
        }
    }

    /**
     * validate form
     */
    public valid(): boolean {
        return this.fnValid ? this.fnValid() :
            (this.hasEform && this.eform && this.validator) ? (this.eform as any).validTable(this.validator) : // Assuming validTable is an extension on JQuery
            true;
    }

    /**
     * get row key
     * param rowBox {object} row box
     * return {string} key value
     */
    public getKey(rowBox: JQuery<HTMLElement>): string {
        return _Input.get(this.kid, rowBox);
    }

    private _checkRowFilter(): boolean {
        if (this.hasRowFilter)
            return true;

        _Log.error('EditMany.js this.rowFilter is empty.');
        return false;
    }

    //checkTplRow -> _checkRowTpl
    private _checkRowTpl(): boolean {
        if (this.hasRowTpl)
            return true;

        _Log.error('EditMany.js this.rowTpl is empty.');
        return false;
    }

    /**
     * get row box by inside element/object
     * param elm {element/object}
     * return {object}
     */
    private _elmToRowBox(elm: JQuery<HTMLElement> | HTMLElement): JQuery<HTMLElement> | null {
        return this._checkRowFilter() && this.rowFilter
            ? $(elm).closest(this.rowFilter)
            : null;
    }

    /**
     * get row box by id
     * called Flow.js
     * param id {string} row id
     * return {object} row box
     */
    public idToRowBox(id: string): JQuery<HTMLElement> | undefined {
        if (!this.eform) return undefined;
        const filter = _Input.fidFilter(this.kid) + `[value='${id}']`;
        return this.eform.find(filter).parent();
    }

    /**
     * getUpdJsonByCrud -> getUpdJson
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * get updated json, called by crudE.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    public getUpdJson(upKey: string): any {
        return this.fnGetUpdJson ? this.fnGetUpdJson(upKey) :
            this.isUrm ? this._urmGetUpdJson(upKey) :
            this.getUpdJsonByRsb(upKey, this.rowsBox);
    }

    /**
     * getUpdJson -> getUpdJsonByRsb
     * get updated json by rowsBox, called by crud.js only
     * param upKey {string}
     * param rowsBox {object}
     * return {json} modified columns only
     */
    public getUpdJsonByRsb(upKey: string, rowsBox?: JQuery<HTMLElement>): any {
        const json: any = {};
        json[_Edit.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }

    /**
     * public for myCrud.js
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows box, default this.rowsBox
     * return {jsons} null if empty
     */
    public getUpdRows(upKey: string, rowsBox?: JQuery<HTMLElement>): any[] | null {
        if (!this._checkRowFilter() || !this.rowFilter || !this.fidTypes)
            return null;

        //set sort field
        rowsBox = this._getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        const rows: any[] = [];  //return rows
        const rowFilter = this.rowFilter;
        const me = this;  //capture this for use inside each()

        if (!rowsBox) return null;

        rowsBox.find(rowFilter).each(function (_idx, item) {
            //add new row if empty key
            const box = $(item);
            const key = _Input.get(me.kid, box);
            if (me._isNewBox(box)) {
                const row2 = _Form.toRow(box);
                row2[me.DataFkeyFid] = upKey;   //write anyway !!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            const diffRow: any = {};
            let diff = false;
            let fid: string, ftype: string, value: any, obj: JQuery;
            for (let j = 0; j < me.fidTypeLen; j = j + 2) {
                //skip read only input !!
                ftype = me.fidTypes![j + 1];
                if (ftype === 'read')
                    continue;

                fid = me.fidTypes![j];
                obj = _Obj.get(fid, box)!;
                value = _Input.getO(obj, box, ftype);
                //if totally compare, string is not equal to numeric !!
                if (value != _Edit.getOld(obj)) {
                    diffRow[fid] = value;
                    diff = true;
                }
            }

            if (diff) {
                /* ??
                //diffRow[me.DataIsNew] = 0;
                //diffRow[_fun.DataKey] = key;
                for (var j = 0; j < me.extFidLen; j++) {
                    diffRow[me.extFids[j]] = oldRow[me.extFids[j]];
                }
                */
                diffRow[me.kid] = key;    //set key value
                //diffRow[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    }

    /**
     * getDeletedStr -> getDeletes
     * get deleted rows key list字串 for 傳回後端
     * public for MyCrud.js
     * return {string} null for empty.
     */
    public getDeletes(): string | null {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    }

    /**
     * onclick addRow button
     */
    public onAddRow(): void {
        this.addRow();
    }

    /**
     * add one row(or empty) into UI, 同時設定新id
     * param {object} (optional) row
     * param {object} (optional) rowsBox, default this.rowsBox
     * param {int} (optional) newId 新id
     * return {object} row
     */
    public addRow(row?: any, rowsBox?: JQuery<HTMLElement>, newId?: number): any {
        row = row || {};
        const box = this._getRowsBox(rowsBox);
        const obj = this._renderRow(row, box);
        if (!obj) return row; // Handle error case from _renderRow
        newId = this.setNewIdByBox(obj, newId);
        row[this.kid] = newId;  //寫入新Id for 外面程式 if need
        return row;
    }

    /**
     * onclick deleteRow
     * param btn {element}
     */
    public onDeleteRow(): void {
        const box = this._elmToRowBox(_Fun.getElm()); // Assuming _Fun.getMe() returns the clicked element
        if (!box) return;

        this.deleteRow(_IText.get(this.kid, box)!, box);
    }

    /**
     * add deleted row & remove UI row
     * param key {string} row key
     * param rowBox {object} (optional) rows box, default this.rowsBox
     */
    public deleteRow(key: string, rowBox?: JQuery<HTMLElement>): void {
        const deletes = this.deletedRows;
        let found = false;
        const rowLen = deletes.length;

        // Check if key is already marked for deletion
        for (let i = 0; i < rowLen; i++) {
            //do nothing if existed
            // Note: The original JS had deletes[i][this.kid] === key, which assumes deletes stores objects, but it's initialized as a string array and assigned string keys. Assuming the intent is to store string keys directly.
            if (deletes[i] === key) {
                found = true;
                break;
            }
        }

        //add deleted[]
        if (!found)
            deletes[rowLen] = key;

        //remove UI row if need
        //rowBox = rowBox || this.rowsBox;
        if (_Obj.notEmpty(rowBox))
            rowBox!.remove();
    }

    /**
     * onViewFile -> viewFile
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    public viewFile(table: string, fid: string, elm: JQuery<HTMLElement> | HTMLElement): void {
        const rowBox = this._elmToRowBox(elm);
        if (!rowBox) return;

        const key = this.getKey(rowBox);
        _me.crudE.viewFile(table, fid, elm, key);   //非初始階段可以讀取_me.crudE
    }

    /**
     * render row by UI template, called by addRow()
     * param rowsBox {object}
     * param row {json}
     * return {object} row object
     */
    private _renderRow(row: any, rowsBox?: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        if (!this._checkRowTpl() || !this.rowTpl)
            return null;

        rowsBox = this._getRowsBox(rowsBox);
        if (!rowsBox) return null;

        const obj = $(Mustache.render(this.rowTpl, row));
        _Form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    }

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * param rowsBox {object} (optional) default this.rowsBox
     * return {json} file json
     */
    public dataAddFiles(levelStr: string, data: FormData, rowsBox?: JQuery<HTMLElement>): any | null {
        if (!this.hasFile || !this.fileFids) return null;
        if (!this._checkRowFilter() || !this.rowFilter) return null;

        rowsBox = this._getRowsBox(rowsBox);
        if (!rowsBox) return null;

        const me = this;
        const fileJson: any = {};
        const fileIdx: { [key: string]: number } = {};   //fileFid map index

        rowsBox.find(me.rowFilter).each(function (_index, item) {
            const tr = $(item);
            for (let i = 0; i < me.fileLen; i++) {
                const fid = me.fileFids![i];
                const serverFid = _me.crudE.getFileSid(levelStr, fid);
                if (_IFile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_me.crudE.dataSetFileJson(data, fileJson);
        return fileJson;
    }

    /**
     * row set fkey value
     * param row {json}
     * param fkeyFid {string}
     */
    public rowSetFkey(row: any, fkey: string): void {
        if (row != null && _Edit.isNewRow(row))
            row[this.DataFkeyFid] = fkey;
    }

    /**
     * rows set fkey value
     * param rows {jsons}
     * param fkeyFid {string} fkey value
     */
    public rowsSetFkey(rows: any[], fkey: string): void {
        if (rows != null) {
            for (const row of rows) {
                if (row != null && _Edit.isNewRow(row))
                    row[this.DataFkeyFid] = fkey;
            }
        }
    }

    /**
     * set this.newId、PKey、_IsNew by row box
     * boxSetNewId -> setNewIdByBox
     * public for MyCrud.js, Flow.js
     * param box {object} row box
     * param newId {int} 外部傳入newId if any, 如果有值則不會累加 this.newId
     * return {int} new key index
     */
    public setNewIdByBox(box: JQuery<HTMLElement>, newId?: number): number {
        if (newId == null) {
            this.newIndex--;    //使用負數
            newId = this.newIndex;
        }

        //kid和IsNew必須放在同一層 !!
        const box2 = _Obj.get(this.kid, box).parent();
        _IText.set(this.kid, newId.toString(), box2);
        _Edit.addIsNew(box2);    //增加_IsNew隱藏欄位
        return newId;
    }

    /**
     * set sort field if need
     * param rowsBox {object} default this.rowsBox
     */
    public setSort(rowsBox?: JQuery<HTMLElement>): void {
        const sortFid = this.sortFid;
        if (_Str.isEmpty(sortFid) || !this.rowFilter)
            return;

        const me = this;
        rowsBox = this._getRowsBox(rowsBox);
        if (!rowsBox) return;

        rowsBox.find(_Input.fidFilter(sortFid)).each(function (i, item) {
            //this did not work in this loop !!
            _IText.set(sortFid!, i.toString(), $(item).closest(me.rowFilter!));
        });
    }

    /**
     * getRowsBox -> getTrs
     * get rows box
     * param rowsBox {object} optional, return this.rowsBox if null
     * return {object}
     */
    private _getRowsBox(rowsBox?: JQuery<HTMLElement>): JQuery<HTMLElement> | undefined {
        return rowsBox || this.rowsBox;
    }

    /*
    //??
    //src: 來源資料
    //return: true/false
    public onClickDeleteRows = function (src) {
        var find = false;
        if (src.deletedRows == null)
            src.deletedRows = [];
        src.box.find('[data-id=' + src.checkFid + ']:checked').each(function (index, item) {
            find = true;
            var check = $(item);
            var tr = check.closest('tr');
            var key = tr.data('key');
            if (key !== '')
                src.deletedRows[src.deletedRows.length] = key;
            //刪除資料
            tr.remove();
        });
        return find;
        //_tool.msg('請先選取資料。')
    };

    //選取所有checkbox
    //onClickCheckAll: function (tableId, dataFid, status) {
    public onClickCheckAll = function (me, dataFid) {
        dataFid = dataFid || '_check0';
        var status = me.checked;
        $(me).closest('table').find('[data-id=' + dataFid + ']:not(:disabled)').prop('checked', status);
    };

    //??
    //get field by rowNo and dataId ??
    public getField = function (tbody, rowNo, dataId) {
        return tbody.find('tr').eq(rowNo).find('[data-id=' + dataId + ']');
    };

    //keys is two dimension
    public keysToStr = function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    };
    */

} //class