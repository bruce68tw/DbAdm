import _Input from './_Input';
import _Form from './_Form';
import _Date from './_Date';
import _Var from './_Var';
import _Obj from './_Obj';
import _File from './_File';
import _Ajax from './_Ajax';
import EditOne from './EditOne';
import EditMany from './EditMany';

/**
 * 做為 EditOne/EditMany 的延伸函數庫, 可以在這裡存取其 instance 變數!!
 * 許多函數在初始化執行, 所以無法放在CrudE.js
 * 主要called by CrudE.js, EditOne.js, EditMany.js, 但其它程式也可呼叫 !!
 * 內容為: 
 * 1.靜態 constant
 * 2.初始化函數
 * 3.get/set old value
 * 4.判斷是否為新資料 & 處理
 */ 
export default class _Edit {

    //constant with underline
    static readonly Rows = '_rows';
    static readonly Childs = '_childs';      //注意: 同時用在json資料、EditOne/EditMany(表達下層物件)
    static readonly Deletes = '_deletes';

    static readonly DataFkeyFid = '_fkeyfid';  //data field for fkey fid, lowercase

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    static readonly FileJson = '_fileJson';

    //data property name for keep old value
    static readonly DataOld = '_old';

    //前後端欄位: isNew, new row flag
    //IsNew: '_IsNew',

    //edit form mode
    //ModeBase: 'Base',
    //ModeUR: 'UR',   //user role mode

    /**
     * setFidTypeVars + setFileVars -> initVars
     * 設定: fidTypes, fidTypeLen, fileFids, fileLen, hasFile
     * param edit {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    static initVars(edit: OneMany, box: JQuery): void {
        const fidTypes: string[] = [];
        const fidRadios: string[] = [];
        box.find(_Input.fidFilter()).each((i: number, item: Elm) => {
            const obj = $(item);
            const j = i * 2;
            const fid = _Input.getFid(obj);
            const ftype = _Input.getType(obj);
            fidTypes[j] = fid;
            fidTypes[j + 1] = ftype;
            if (ftype == 'radio')
                fidRadios[fidRadios.length] = fid;
        });
        edit.fidTypes = fidTypes;
        edit.fidTypeLen = edit.fidTypes.length;
        edit.fidRadios = [...new Set(fidRadios)];   //移除重複元素, ES6語法 !!

        edit.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each((index: number, item: Elm) => {
            edit.fileFids[index] = _Input.getFid($(item));
        });
        edit.fileLen = edit.fileFids.length;
        edit.hasFile = edit.fileFids.length > 0; //has input file or not
    }

    /**
     * get rows of json 
     * @param {any} json
     * @returns
     */
    static jsonGetRows(json: any): any[] | null {
        return (json == null || json[_Edit.Rows] == null)
            ? null
            : json[_Edit.Rows];
    }

    static jsonGetRows0(json: any): any | null {
        const rows = _Edit.jsonGetRows(json);
        return (rows == null || rows.length == 0)
            ? null
            : rows[0];
    }

    //upJson get child json
    //_getChildJson -> getChildJson
    static getChildJson(upJson: any, childIdx: number): any | null {
        const childs = _Edit.Childs;
        return (upJson == null || upJson[childs] == null || upJson[childs].length <= childIdx)
            ? null
            : upJson[childs][childIdx];
    }

    //upJson get child rows
    static getChildRows(upJson: any, childIdx: number): any[] | null {
        const child = _Edit.getChildJson(upJson, childIdx);
        return _Edit.jsonGetRows(child);
    }

    static getChildRows0(upJson: any, childIdx: number): any | null {
        const rows = _Edit.getChildRows(upJson, childIdx);
        return (rows == null || rows.length == 0)
            ? null : rows[0];
    }

    /**
     * upJson set child rows
     * @param upJson {json}
     * @param childIdx {int}
     * @param rows {jsons}
     * @returns {json} child object
     */
    static setChildRows(upJson: Json, childIdx: number, rows: Json[]): Json {
        const fid = _Edit.Childs;
        if (upJson == null)
            upJson = {};
        if (upJson[fid] == null)
            upJson[fid] = [];
        if (upJson[fid].length <= childIdx)
            upJson[fid][childIdx] = {};

        const child = upJson[fid][childIdx];
        child[_Edit.Rows] = rows;
        return child;
    }

    static isEditOne(edit: any): boolean {
        return (edit instanceof EditOne);
    }

    /**
     * get old value 
     * param obj {object} input JQuery object
     * return {string}
     */ 
    static getOld(obj: JQuery): any {
        return obj.data(_Edit.DataOld);
    }

    /**
     * set old value
     * param obj {object} input JQuery object
     * param value {int/string}
     */ 
    static setOld(obj: JQuery, value: any): void {
        obj.data(_Edit.DataOld, value);
    }

    /**
     * check a new row or not, parseInt(ABC123) will get int, cannot use it!!
     * param row {json}
     * param key {string}
     * return {bool}
     */
    static isNewRow(row: any, kid: string): boolean {
        return _Edit.isNewKey(row[kid]);
    }

    /**
     * check a new JQuery object or not
     * param box {object} JQuery object
     * param key {string}
     * return {bool}
     */
    static isNewBox(box: JQuery, kid: string): boolean {
        return _Edit.isNewKey(_Input.get(kid, box));
    }

    /**
     * check is new key or not, key為空值或是小於0都視為new key
     * param key {string}
     * return {bool}
     */
    static isNewKey(key: any): boolean {
        if (key == null) return true;

        const num = Number(key);
        return (!isNaN(num) && num <= 0);   //0也是new key
    }

    /**
     * load row into 單筆UI
     * called by EditOne, EditMany(mode=one)
     * @param edit {EditOne/EditMany}
     * @param box {JQuery}
     * @param row {json}
     */
    static loadRow(edit: any, box: JQuery, row: any): void {
        _Form.loadRow(box, row);

        //set old value for each field
        for (let i = 0; i < edit.fidTypeLen; i = i + 2) {
            const fid = edit.fidTypes[i];
            const obj = _Obj.get(fid, box);
            obj.data(_Edit.DataOld, row[fid]);
        }
    }

    /**
     * get one updated row for New/Updated
     * 只讀取有異動的欄位
     * @param edit {EditOne/EditMany}
     * @param box {object} form object
     * @returns json row
     */
    static getUpdRow(edit: any, box: JQuery): any | null {
        //case new return row
        const result: any = {};
        let fid: string, ftype: string, value: any, obj: JQuery | null;
        const row = _Form.toRow(box);     //內容只包含需要儲存的欄位, PKey如何為唯讀可能不會寫入!!

        //無條件加入PKey欄位, 才能判斷是否新增
        row[edit.kid] = _Input.get(edit.kid, box);

        //case of New row
        if (_Edit.isNewRow(row, edit.kid)) {
            for (let j = 0; j < edit.fidTypes.length; j = j + 2) {
                fid = edit.fidTypes[j];
                ftype = edit.fidTypes[j + 1];
                obj = _Input.getObj(fid, box, ftype);
                value = row[fid];
                if (_Var.notEmpty(value)) {
                    if ((ftype === 'date' || ftype === 'dt') &&
                        _Date.dtsToValue(value) === _Date.dtsToValue(undefined))
                        continue;

                    result[fid] = value;
                }
            }
            return result;
        }

        /*
        var key = _Input.get(edit.kid, box);
        if (_Str.isEmpty(key))
            return row;
        */

        //case update: 讀取有異動的欄位
        let diff = false;
        let old: any;
        for (let j = 0; j < edit.fidTypes.length; j = j + 2) {
            //skip read only type
            fid = edit.fidTypes[j];
            ftype = edit.fidTypes[j + 1];
            //if (ftype === 'link' || ftype === 'read')
            //    continue;

            //radio如果沒有選取會傳回null !!
            obj = _Input.getObj(fid, box, ftype);
            old = obj ? _Obj.getData(obj, _Edit.DataOld) : '';
            value = row[fid];
            //if fully compare, string will not equal numeric !!
            if (value != old) {
                //date/dt old value has more length
                if ((ftype === 'date' || ftype === 'dt') &&
                    _Date.dtsToValue(value) === _Date.dtsToValue(old))
                    continue;

                result[fid] = value;
                diff = true;
            }
        }
        if (!diff)
            return null;

        //無條件加入PKey, 後端才能判是否新增
        result[edit.kid] = _Input.get(edit.kid, box);
        return result;
    }

    /**
     * onclick viewFile
     * 雖然直接開啟(pdf,docx...)比較方便, 但是各瀏覽器行為不同, 最後只有圖檔直接開啟, 其他則下載
     * window.open(url, "_blank") 會出現小方塊, 故不採用
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    static async viewFileA(table: string, fid: string, elm: Elm, key: string): Promise<void> {
        /*
        if (this.isNewKey(key)) {
            _Tool.msg(_BR.NewFileNotView);
        } else {
        */
        const data = {
            table: table,
            fid: fid,
            key: key,
            ext: _File.getFileExt(elm.innerText),
        };
        await _Ajax.getFileA('ViewFile', data, elm);

        /*
        //var url = _Str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext);
        if (_File.isImageExt(ext))
            _Tool.showImage(elm.innerHTML, url);
        else
            window.location = url;
        */
    }

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * @param levelStr {string} 
     * @param fid {string} ui file id
     * @returns {string} format: Table_Fid
     */
    static getFileSid(levelStr: string, fid: string): string {
        return 't' + levelStr + '_' + fid;
    }


    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} JQuery object
     */
    /*
    static addIsNew(box: JQuery): void {
        var fid = _Edit.IsNew;
        var field = box.find(_Input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val('1');
    }
    */

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} JQuery object
     */
    /*
    static removeIsNew(box: JQuery): void {
        var fid = _Edit.IsNew;
        var field = box.find(_Input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    }
    */

}