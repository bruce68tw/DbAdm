/**
 * 做為 EditOne/EditMany 的延伸函數庫, 可以在這裡存取private變數!!
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
    Childs: '_childs',      //同時用在資料、EditOne/EditMany(表達下層物件)
    Deletes: '_deletes',

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    //前後端欄位: isNew, new row flag
    //IsNew: '_IsNew',

    //edit form mode
    //ModeBase: 'Base',
    //ModeUR: 'UR',   //user role mode


    /**
     * setFidTypeVars + setFileVars -> initVars
     * 設定: fidTypes, fidTypeLen, fileFids, fileLen, hasFile
     * param me {object} EditOne/EditMany object
     * param box {object} container
     * return void
     */
    initVars: function (me, box) {
        var fidTypes = [];
        box.find(_input.fidFilter()).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = _input.getFid(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;

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
        return _edit.isNewKey(_input.get(kid, box));
    },

    /**
     * check is new key or not
     * param key {string}
     * return {bool}
     */
    isNewKey: function (key) {
        if (key == null) return true;

        const num = Number(key);
        return (!isNaN(num) && num <= 0);   //0也是new key
    },

    /**
     * load row into 單筆UI
     * called by EditOne, EditMany(mode=one)
     * @param row {json}
     */
    loadRow: function(me, row) {
        _form.loadRow(me.eform, row);

        //set old value for each field
        for (var i = 0; i < me.fidTypeLen; i = i + 2) {
            var fid = me.fidTypes[i];
            var obj = _obj.get(fid, me.eform);
            obj.data(_edit.DataOld, row[fid]);
        }
    },

    /**
     * get one updated row for New/Updated
     * 只讀取有異動的欄位
     * @param me {EditOne/EditMany}
     * @param box {object} form object
     * @returns json row
     */
    getUpdRow: function(me, box) {
        //case new return row
        var result = {};
        var fid, ftype, value, obj;
        var row = _form.toRow(box);     //內容只包含需要儲存的欄位, PKey如何為唯讀可能不會寫入!!

        //無條件加入PKey欄位, 才能判斷是否新增
        row[me.kid] = _input.get(me.kid, box);

        //case of New row
        if (_edit.isNewRow(row, me.kid)) {
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                fid = me.fidTypes[j];
                ftype = me.fidTypes[j + 1];
                obj = _input.getObj(fid, box, ftype);
                value = row[fid];
                if (_var.notEmpty(value)) {
                    if ((ftype === 'date' || ftype === 'dt') &&
                        _date.dtsToValue(value) === _date.dtsToValue(old))
                        continue;

                    result[fid] = value;
                }
            }
            return result;
        }

        /*
        var key = _input.get(me.kid, box);
        if (_str.isEmpty(key))
            return row;
        */

        //case update: 讀取有異動的欄位
        var diff = false;
        var old;
        for (var j = 0; j < me.fidTypes.length; j = j + 2) {
            //skip read only type
            fid = me.fidTypes[j];
            ftype = me.fidTypes[j + 1];
            //if (ftype === 'link' || ftype === 'read')
            //    continue;

            //obj = (ftype === 'radio') ? _iradio.getObj(fid, box) : _obj.get(fid, box);
            obj = _input.getObj(fid, box, ftype);
            //value = _input.getO(obj, box, ftype);
            value = row[fid];
            old = obj.data(_edit.DataOld);
            //if fully compare, string will not equal numeric !!
            if (value != old) {
                //date/dt old value has more length
                if ((ftype === 'date' || ftype === 'dt') &&
                    _date.dtsToValue(value) === _date.dtsToValue(old))
                    continue;

                result[fid] = value;
                diff = true;
            }
        }
        if (!diff)
            return null;

        //無條件加入PKey, 後端才能判是否新增
        result[me.kid] = _input.get(me.kid, box);
        return result;
    },

    /**
     * onclick viewFile
     * @param table {string} table name
     * @param fid {string}
     * @param elm {element} link element
     * @param key {string} row key
     */
    viewFile: function(table, fid, elm, key) {
        /*
        if (this.isNewKey(key)) {
            _tool.msg(_BR.NewFileNotView);
        } else {
        */
        var ext = _file.getFileExt(elm.innerText);
        if (_file.isImageExt(ext))
            _tool.showImage(elm.innerHTML, _str.format('ViewFile?table={0}&fid={1}&key={2}&ext={3}', table, fid, key, ext));
    },

    /**
     * getServerFid -> getFileSid
     * get server side variables name for file field
     * @param levelStr {string} 
     * @param fid {string} ui file id
     * @returns {string} format: Table_Fid
     */
    getFileSid: function(levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    }


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

};