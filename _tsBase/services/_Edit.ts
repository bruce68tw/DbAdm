import _Input from "./_Input";

/**
 * 許多函數在初始化執行, 所以無法放在CrudE.js
 * only for CrudE.js, EditOne.js, EditMany.js !!
 * 內容為: 
 * 1.靜態 constant
 * 2.初始化函數
 * 3.get/set old value
 * 4.判斷是否為新資料 & 處理
 */ 
export default class _Edit {

    //constant with underline
    public static readonly Rows: string = '_rows';
    public static readonly Childs: string = '_childs';
    public static readonly Deletes: string = '_deletes';

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    public static readonly FileJson: string = '_fileJson';

    //data property name for keep old value
    public static readonly DataOld: string = '_old';

    //前後端欄位: isNew, new row flag
    public static readonly IsNew: string = '_IsNew';

    //edit form mode
    public static readonly ModeBase: string = 'Base';
    public static readonly ModeUR: string = 'UR';   //user role mode


    /**
     * 初始化變數
     * setFidTypeVars + setFileVars -> initVars
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container (jQuery object)
     * return void
     */
    public static initVars(me: any, box: JQuery): void {
        //set fid-type variables: fidTypes, fidTypeLen
        const fidTypes: (string | undefined)[] = [];
        box.find(_Input.fidFilter()).each(function (i, item) {
            const obj = $(item);
            const j = i * 2;
            fidTypes[j] = _Input.getFid(obj);
            fidTypes[j + 1] = _Input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;

        //set file related variables: fileFids, fileLen, hasFile
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _Input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    }

    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string | undefined}
     */ 
    public static getOld(obj: JQuery): string | undefined {
        return obj.data(_Edit.DataOld);
    }

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {number | string}
     */ 
    public static setOld(obj: JQuery, value: number | string): void {
        obj.data(_Edit.DataOld, value);
    }

    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param row {object}
     * return {boolean}
     */
    public static isNewRow(row: any): boolean {
        const fid = _Edit.IsNew;
        // Check if the value is not null AND is not '0' (assuming '0' or null means false/old, and '1' or presence means true/new)
        return (row[fid] != null && row[fid] != '0');
    }

    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param box {JQuery} jquery object
     */
    public static addIsNew(box: JQuery): void {
        const fid = _Edit.IsNew;
        let field = box.find(_Input.fidFilter(fid));
        
        if (field.length === 0) {
            // TypeScript/jQuery note: append returns the box object, not the appended element.
            box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
            // We need to re-find the element if we want to work with 'field' after appending
            field = box.find(_Input.fidFilter(fid));
        } else {
            field.val('1');
        }
    }

    /**
     * 刪除隱藏欄位 _IsNew
     * param box {JQuery} jquery object
     */
    public static removeIsNew(box: JQuery): void {
        const fid = _Edit.IsNew;
        const field = box.find(_Input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    }

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param levelStr {string} 
     * param fid {string} ui file id
     * return {string} format: t[levelStr]_[fid]
    public static getFileSid(levelStr: string, fid: string): string {
        return 't' + levelStr + '_' + fid;
    }
     */

} //class