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
class _Edit {
    /**
     * 初始化變數
     * setFidTypeVars + setFileVars -> initVars
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container (jQuery object)
     * return void
     */
    static initVars(me, box) {
        //set fid-type variables: fidTypes, fidTypeLen
        const fidTypes = [];
        box.find(_Input.fidFilter()).each(function (i, item) {
            const obj = $(item);
            const j = i * 2;
            fidTypes[j] = _Input.getFid(obj);
            fidTypes[j + 1] = _Input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
        //set file related variables: fileFids, fileLen, hasFile
        me.fileFids = []; //upload file fid array
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
    static getOld(obj) {
        return obj.data(_Edit.DataOld);
    }
    /**
     * set old value
     * param obj {object} input jquery object
     * param value {number | string}
     */
    static setOld(obj, value) {
        obj.data(_Edit.DataOld, value);
    }
    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param row {object}
     * return {boolean}
     */
    static isNewRow(row) {
        const fid = _Edit.IsNew;
        // Check if the value is not null AND is not '0' (assuming '0' or null means false/old, and '1' or presence means true/new)
        return (row[fid] != null && row[fid] != '0');
    }
    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param box {JQuery} jquery object
     */
    static addIsNew(box) {
        const fid = _Edit.IsNew;
        let field = box.find(_Input.fidFilter(fid));
        if (field.length === 0) {
            // TypeScript/jQuery note: append returns the box object, not the appended element.
            box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
            // We need to re-find the element if we want to work with 'field' after appending
            field = box.find(_Input.fidFilter(fid));
        }
        else {
            field.val('1');
        }
    }
    /**
     * 刪除隱藏欄位 _IsNew
     * param box {JQuery} jquery object
     */
    static removeIsNew(box) {
        const fid = _Edit.IsNew;
        const field = box.find(_Input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    }
} //class
//constant with underline
_Edit.Rows = '_rows';
_Edit.Childs = '_childs';
_Edit.Deletes = '_deletes';
//server side fid for file input collection, must pre '_'
//key-value of file serverFid vs row key
_Edit.FileJson = '_fileJson';
//data property name for keep old value
_Edit.DataOld = '_old';
//前後端欄位: isNew, new row flag
_Edit.IsNew = '_IsNew';
//edit form mode
_Edit.ModeBase = 'Base';
_Edit.ModeUR = 'UR'; //user role mode
export default _Edit;
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Edit.js.map