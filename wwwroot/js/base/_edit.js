
//許多函數無法放在CrudE.js
//for EditOne.js, EditMany.js only !!
var _edit = {

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
     * get old value 
     * param obj {object} input jquery object
     * return {string}
     */ 
    getOld: function (obj) {
        return obj.data(this.DataOld);
    },

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
     */ 
    setOld: function (obj, value) {
        obj.data(this.DataOld, value);
    },

    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} jquery object
     */
    addIsNew: function (box) {
        var fid = this.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val('1');
    },

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} jquery object
     */
    removeIsNew: function (box) {
        var fid = this.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    },

    /**
     * setFidTypeVars -> setFidTypes
     * set fid-type variables: fidTypes, fidTypeLen
     * param me {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    setFidTypes: function (me, box) {
        var fidTypes = [];
        box.find(_input.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _input.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
    },

    /**
     * set file related variables: fileFids, fileLen, hasFile
     * called by EditOne/EditMany init()
     * param me {edit} EditOne/EditMany variables
     * param box {object} form or row object
     * return void
     */
    setFileVars: function (me, box) {
        //var me = this;  //use outside .each()
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _input.getFid($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    getFileSid: function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    },

    /**
     * isNewKey(key) -> isNewRow(row)
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
     */
    isNewRow: function (row) {
        var fid = this.IsNew;
        return (row[fid] != null || row[fid] == '1');
    },

    /**
     * 增加隱藏欄位 _IsNew, 同時設為1
     * param obj {box} jquery object
     */
    addIsNew: function (box) {
        var fid = this.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length == 0)
            field = box.append(`<input type="hidden" data-fid="${fid}" name="${fid}" value="1" >`);
        else
            field.val('1');
    },

    /**
     * 刪除隱藏欄位 _IsNew
     * param obj {box} jquery object
     */
    removeIsNew: function (box) {
        var fid = this.IsNew;
        var field = box.find(_input.fidFilter(fid));
        if (field.length > 0)
            field.remove();
    },

};