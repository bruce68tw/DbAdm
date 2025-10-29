/**
 * 許多函數在初始化執行, 所以無法放在CrudE.js
 * only for CrudE.js, EditOne.js, EditMany.js !!
 * 內容為: 
 *   1.靜態 constant
 *   2.初始化函數
 *   3.get/set old value
 *   4.判斷是否為新資料 & 處理
 */ 
var _edit = {

    //constant with underline
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    //前後端欄位: isNew, new row flag
    IsNew: '_IsNew',

    //edit form mode
    ModeBase: 'Base',
    ModeUR: 'UR',   //user role mode


    /**
     * 初始化變數
     * setFidTypeVars + setFileVars -> initVars
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    initVars: function (me, box) {
        //set fid-type variables: fidTypes, fidTypeLen
        var fidTypes = [];
        box.find(_input.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _input.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;

        //set file related variables: fileFids, fileLen, hasFile
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string}
     */ 
    getOld: function (obj) {
        return obj.data(_edit.DataOld);
    },

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
     */ 
    setOld: function (obj, value) {
        obj.data(_edit.DataOld, value);
    },

    /**
     * check a new row or not, parseInt(ABC123) will get int, cannot use it!!
     * param row {json}
     * param key {string}
     * return {bool}
     */
    isNewRow: function (row, kid) {
        return _edit.isNewKey(row[kid]);
    },

    /**
     * check a new jquery object or not
     * param box {object} jquery object
     * param key {string}
     * return {bool}
     */
    isNewBox: function (box, kid) {
        return _edit.isNewKey(_itext.get(kid, box));
    },

    /**
     * check is new key or not
     * param key {string}
     * return {bool}
     */
    isNewKey: function (key) {
        const num = Number(key);
        return !isNaN(num) && num < 0;
    },

    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} jquery object
     */
    /*
    addIsNew: function (box) {
        var fid = _edit.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val('1');
    },
    */

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} jquery object
     */
    /*
    removeIsNew: function (box) {
        var fid = _edit.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    },
    */

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
    getFileSid: function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    },
     */

};