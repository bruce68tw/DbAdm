/**
 * 多筆編輯畫面
 * multiple edit forms
 *   資料儲存在 html input
 * 
 * notice:
 *   set data-fkeyFid when save
 *   函數名稱後面ByRsb(表示by RowsBox)為擴充原本函數, 參數rowsBox空白則為this.RowsBox
 * 
 * 屬性: 參考 init()
 * 
 * 自定函數:
 *   void fnLoadJson(json) -> fnLoadRows(rows)：show json to form, use loadJson instead of loadRows for more situation !!
 *   json fnGetUpdJson(upKey)：get updated json by form
 *   bool fnValid()：validate check
 *   void fnReset()：reset
 *   
 * param-1 kid {string} pkey field id(single key)
 * //param-2 eformId {string} (optional) edit form id
 * param-2 rowsBoxId {string} (optional) rows box id
 *   if empty, you must write functions: fnLoadRows、fnGetUpdJson、fnValid
 * param-3 tplRowId {string} (optional) row template id
 *   tplRowId -> rowTplId
 *   1.if empty, it will log error when call related function.
 *   2.system get fid-type from this variables
 *   3.called by singleFormLoadRow、loadRowsByRsb、_renderRow
 * param-4 rowFilter {string} (optional) jQuery filter for find row object
 *   1.if empty, it will log error when call related function.
 *   2.inside element -> row(onDeleteRow),
 *   3.rowsBox -> row(getUpdRows)
 * param-5 sortFid {string} (optional) sort fid for front-side sorting function
 * 
 * return {EditMany}
 */
//function EditMany(kid, eformId, rowTplId, rowFilter, sortFid) {
function EditMany(kid, rowsBoxId, rowTplId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid, lowercase

        //variables
        this.mode = _me.crudE.ModeBase;    //default value
        this.modeData = '';             //for different mode
        this.isUrm = false;             //is urm or not

        this.kid = kid;
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;
        this.systemError = '';
        this.hasRowTpl = _str.notEmpty(rowTplId);
        this.hasRowFilter = _str.notEmpty(rowFilter);
        this.dataJson = null;

        if (this.hasRowTpl) {
            this.rowTpl = $('#' + rowTplId).html();
            var rowObj = $(this.rowTpl);

            //check input & alert error if wrong
            if (_obj.get(kid, rowObj) == null) {
                this.systemError = `EditMany.js input kid is wrong (${kid})`;
                alert(this.systemError);
            }

            _me.crudE.setFidTypes(this, rowObj);
            _me.crudE.setFileVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = _str.notEmpty(rowsBoxId);
        if (this.hasEform) {
            this.rowsBox = $('#' + rowsBoxId);
            this.eform = this.rowsBox.closest('form');     //edit form object
            if (this.rowsBox.length == 0) {
                this.systemError = `EditMany.js rowsBoxId is wrong (${rowsBoxId})`;
                alert(this.systemError);
            }
        }

        this.deletedRows = [];  //deleted key string array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * initial urm, 參考 XpUser Read.cshmtl
     * param fids: 要傳到後端的欄位id array
     */ 
    this.initUrm = function (fids) {
        this.mode = _me.crudE.ModeUR;
        this.modeData = fids;
        this.isUrm = true;
    };

    /**
     * isNewTr -> _isNewBox
     * check is a new tr or not
     * param tr {object} 
     * return {bool}
     */
    this._isNewBox = function (box) {
        return (_itext.get(_me.crudE.IsNew, box) == '1');
    };

    /**
     * reset edit form
     * param rowsBox {object} optional
     */
    this.reset = function () {
        if (this.fnReset) {
            this.fnReset();
        } else if (this.isUrm) {
            this._urmReset();
        } else if (this.hasEform) {
            this.rowsBox.empty();   //empty rows ui first
            this._resetVar();
        }
    };

    //reset variables
    this._resetVar = function () {
        this.newIndex = 0;
        this._resetDeletes();
    };

    /**
     * resetDeleted -> _resetDeletes
     * reset deleted rows
     */
    this._resetDeletes = function () {
        this.deletedRows = [];
    };

    /**
     * urmLoadJson -> urmLoadRows
     * (urm: UserRole Mode), load json rows into UI by urm
     * param json {json} 
     * param rowsBox {object} 
     * param fids {string[]} 
     */
    this._urmLoadRows = function (rows) {
        this._urmReset();

        //check
        //var rows = _me.crudE.jsonGetRows(json);
        if (rows == null)
            return;

        //set checked sign & old value
        var fids = this.modeData;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = this.rowsBox.find(_input.fidFilter(row[fids[1]]));   //fid map to dataFid
            _icheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    };

    /**
     * get upd json by UserRole mode(urm), Role欄位使用checkbox
     * called by User.js、XpRole.js
     * param upKey {string} up key
     * param rowsBox {object} rows box
     * param keyFid {string} key fid, ex: UserId
     * param dataFid {string} data fid, ex: RoleId
     * return {json} modified columns only
     */
    this._urmGetUpdJson = function (upKey) {
        var json = {};
        var rows = [];
        var me = this;
        var newIdx = 0;
        var fids = this.modeData;   //string array
        this._resetDeletes();    //reset first
        this.rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_str.isEmpty(key)) {
                if (_icheck.checkedO(obj)) {
                    //new row
                    var row = {};
                    row[_me.crudE.IsNew] = '1';     //new row flag
                    row[fids[0]] = ++newIdx;            //Id, base 1 !!
                    row[fids[1]] = _icheck.getO(obj);   //RoleId
                    me.rowSetFkey(row, upKey);  //set foreign key value
                    rows[rows.length] = row;
                }
            } else {
                if (!_icheck.checkedO(obj)) {
                    //delete row
                    me.deleteRow(key);
                }
            }
        });

        if (rows.length > 0)
            json[_me.crudE.Rows] = rows;
        json[_me.crudE.Deletes] = this.getDeletes();
        return json;
    };

    this._urmReset = function () {
        this._resetVar();

        var objs = this.rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');
    };

    /**
     * loadJson(json) -> loadRows(rows)
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * load this json rows into UI, also set old values !!
     * param json {json} 
     */
    this.loadRows = function (rows) {
        if (this.fnLoadRows) {
            this.fnLoadRows(rows);
        } else if (this.isUrm) {
            this._urmLoadRows(rows, _me.divRoles, _me.mUserRoleFids);
        } else {
            //var rows = (json == null || json[_me.crudE.Rows] == null)
            //    ? null : json[_me.crudE.Rows];
            this.loadRowsByRsb(rows, true);
        }
    };

    /**
     * singleFormLoadRow -> loadRowByBox
     * box 與 rsb(rowsBox) 有些不同, 所以用不同名 !!
     * load one row, also set field old value,
     * ex: DbAdm/MyCrud.js Etable is a single form but has multiple rows property !!
     * param rowBox {object}
     * param row {json}
     * param index {int} 資料序號 base 0
     */
    this.loadRowByBox = function (rowBox, row, index) {
        //if (!this._checkRowTpl())
        //    return;

        row.Index = index;
        var box = $(Mustache.render(this.rowTpl, row)); //for 顯示欄位

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            _me.crudE.setOld(_obj.get(fid, box), row[fid]);
        }

        //set date input
        _idate.init(box);

        //one row into UI for 輸入欄位
        _form.loadRow(box, row);    

        //rowBox.append(box);
        box.appendTo(rowBox);
    };

    /**
     * loadRowsByBox(rowsBox, rows, reset) -> loadRowsByRsb(rows, reset, rowsBox)
     * load rows by rowsBox also set old value
     * param rowsBox {object} rows box object
     * param rows {jsons}
     * param reset {bool} (default true) reset rowsBox first.
     * param rowsBox {object} (optional) rows box object, default this.rowsBox
     */ 
    this.loadRowsByRsb = function (rows, reset, rowsBox) {
        if (!this._checkRowTpl())
            return;

        //reset if need
        //use "reset || true"" will cause wrong result !!
        rowsBox = this._getRowsBox(rowsBox);
        if (_var.isEmpty(reset) || reset)
            this.reset(rowsBox);

        //check
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen == 0)
            return;

        //render rows
        for (var i = 0; i < rowLen; i++) {
            this.loadRowByBox(rowsBox, rows[i], i);
            /*
            var row = rows[i];
            var box = $(Mustache.render(this.rowTpl, row));
            //box.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j += 2) {
                fid = this.fidTypes[j];
                _me.crudE.setOld(_obj.get(fid, box), row[fid]);
            }

            //set date input
            _idate.init(box);

            //one row into UI
            _form.loadRow(box, row);

            //into rows box
            box.appendTo(rowsBox);
            */
        }        
    };

    /**
     * validate form
     */
    this.valid = function () {
        return this.fnValid ? this.fnValid() :
            this.hasEform ? this.eform.validTable(this.validator) :
            true;
    };

    /**
     * get row key
     * param rowBox {object} row box
     * return {string} key value
     */
    this.getKey = function (rowBox) {
        return _input.get(this.kid, rowBox);
    };

    /**
      * get row(json) by tr object, 不包含 xi-unsave 欄位
      * trObj {object} tr object
      * fidTypes {string array} field info array
      * return {json} one row
      */
    /*
    this.getRow = function (trObj) {
        //var fidTypes = this.fidTypes;
        var row = {};
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            obj = _obj.get(fid, trObj);
            row[fid] = _input.getO(obj, trObj, this.fidTypes[i + 1]);
        }
        return row;
    };
    */
    
    this._checkRowFilter = function () {
        if (this.hasRowFilter)
            return true;

        _log.error('EditMany.js this.rowFilter is empty.');
        return false;
    };

    //checkTplRow -> _checkRowTpl
    this._checkRowTpl = function () {
        if (this.hasRowTpl)
            return true;

        _log.error('EditMany.js this.rowTpl is empty.');
        return false;
    };

    /**
     * get row box by inside element/object
     * param elm {element/object}
     * return {object}
     */
    this._elmToRowBox = function (elm) {
        return this._checkRowFilter()
            ? $(elm).closest(this.rowFilter)
            : null;
    };

    /**
     * get row box by id
     * called Flow.js
     * param id {string} row id
     * return {object} row box
     */
    this.idToRowBox = function (value) {
        var filter = _input.fidFilter(this.kid) + `[value='${value}']`;
        return this.eform.find(filter).parent();
    };

    /**
     * getUpdJsonByCrud -> getUpdJson
     * 系統自動呼叫, 不可在 fnXXX 呼叫, 否則會產生無窮迴圈 !!
     * get updated json, called by crudE.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    this.getUpdJson = function (upKey) {
        return this.fnGetUpdJson ? this.fnGetUpdJson(upKey) :
            this.isUrm ? this._urmGetUpdJson(upKey) :
            this.getUpdJsonByRsb(upKey, this.rowsBox);
    };

    /**
     * getUpdJson -> getUpdJsonByRsb
     * get updated json by rowsBox, called by crud.js only
     * param upKey {string}
     * param rowsBox {object}
     * return {json} modified columns only
     */
    this.getUpdJsonByRsb = function (upKey, rowsBox) {
        var json = {};
        json[_me.crudE.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_me.crudE.Deletes] = this.getDeletes();
        return json;
    };

    /**
     * check a new key or not, parseInt(ABC123) will get int, cannot use it!!
     * param key {string}
    this.isNewKey = function (key) {
        return (key.length <= 3);
    };
     */

    /**
     * public for myCrud.js
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows box, default this.rowsBox
     * return {jsons} null if empty
     */ 
    this.getUpdRows = function (upKey, rowsBox) {
        if (!this._checkRowFilter())
            return;

        //set sort field
        rowsBox = this._getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //this is not work inside each() !!
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            //add new row if empty key
            var box = $(item);
            var key = _input.get(me.kid, box);
            //if (_me.crudE.isNewKey(key)) {
            if (me._isNewBox(box)) {
                var row2 = _form.toRow(box);
                row2[me.DataFkeyFid] = upKey;   //write anyway !!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            //var key = box.data(_fun.DataKey);
            //var oldRow = me.getOldRow(key);
            var diffRow = {};
            var diff = false;
            var fid, ftype, value, obj;
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                //skip read only input !!
                ftype = me.fidTypes[j + 1];
                if (ftype === 'read')
                    continue;

                fid = me.fidTypes[j];
                obj = _obj.get(fid, box);
                value = _input.getO(obj, box, ftype);
                //if totally compare, string is not equal to numeric !!
                if (value != _me.crudE.getOld(obj)) {
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
                diffRow[kid] = key;    //set key value
                //diffRow[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    };

    /** 
     * getDeletedStr -> getDeletes
     * get deleted rows key list字串 for 傳回後端
     * public for MyCrud.js
     * return {string} null for empty.
     */ 
    this.getDeletes = function () {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    };    

    /**
     * onclick addRow button
     */
    this.onAddRow = function () {
        this.addRow();
    };

    /**
     * add one row(or empty) into UI
     * param {object} (optional) row
     * param {object} (optional) rowsBox, default this.rowsBox
     * return {object} row
     */
    this.addRow = function (row, rowsBox) {
        row = row || {};
        rowsBox = this._getRowsBox(rowsBox);
        var obj = this._renderRow(row, rowsBox);
        this.setNewIdByBox(obj);
        return obj;
    };

    /**
     * onclick deleteRow
     * param btn {element}
     */
    this.onDeleteRow = function (btn) {        
        var box = this._elmToRowBox(btn);
        this.deleteRow(_itext.get(this.kid, box), box);
    };

    /**
     * add deleted row & remove UI row
     * param key {string} row key
     * param rowBox {object} (optional) rows box, default this.rowsBox
     */ 
    this.deleteRow = function (key, rowBox) {
        var deletes = this.deletedRows;
        var found = false;
        var rowLen = deletes.length;
        for (var i = 0; i < rowLen; i++) {
            //do nothing if existed
            if (deletes[i][this.kid] === key) {
                found = true;
                break;
            }
        }

        //add deleted[]
        if (!found)
            deletes[rowLen] = key;

        //remove UI row if need
        if (_obj.isExist(rowBox))
            rowBox.remove();
    };

    /**
     * onclick viewFile
     * param table {string} table name
     * param fid {string}
     * param elm {element} link element
     */
    this.onViewFile = function (table, fid, elm) {
        var key = this.getKey(this._elmToRowBox(elm));
        _me.crudE.viewFile(table, fid, elm, key);
    };

    /**
     * render row by UI template, called by addRow()
     * param rowsBox {object}
     * param row {json}
     * return {object} row object
     */ 
    this._renderRow = function (row, rowsBox) {
        if (!this._checkRowTpl())
            return null;

        rowsBox = this._getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.rowTpl, row));
        _form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    };

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * param rowsBox {object} (optional) default this.rowsBox
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data, rowsBox) {
        if (!this.hasFile) return null;
        if (!this._checkRowFilter()) return null;

        rowsBox = this._getRowsBox(rowsBox);
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        rowsBox.find(me.rowFilter).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _me.crudE.getFileSid(levelStr, fid);
                if (_ifile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_me.crudE.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * row set fkey value
     * param row {json}
     * param fkeyFid {string}
     */
    this.rowSetFkey = function (row, fkey) {
        if (row != null && _me.crudE.isNewRow(row))
            row[this.DataFkeyFid] = fkey;
    };

    /**
     * rows set fkey value
     * param rows {jsons}
     * param fkeyFid {string} fkey value
     */
    this.rowsSetFkey = function (rows, fkey) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && _me.crudE.isNewRow(row))
                    row[this.DataFkeyFid] = fkey;
            }
        }
    };

    /**
     * boxSetNewId -> setNewIdByBox
     * set new id by row box
     * public for MyCrud.js, Flow.js
     * param box {object} row box
     * return {int} new key index
     */
    this.setNewIdByBox = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
        _me.crudE.addIsNew(box);    //增加_IsNew隱藏欄位
        return this.newIndex;
    };

    /**
     * set sort field if need
     * param rowsBox {object} default this.rowsBox
     */
    this.setSort = function (rowsBox) {
        var sortFid = this.sortFid;
        if (_str.isEmpty(sortFid))
            return;

        var me = this;
        rowsBox = this._getRowsBox(rowsBox);
        rowsBox.find(_input.fidFilter(sortFid)).each(function (i, item) {
            //this did not work in this loop !!
            _itext.set(sortFid, i, $(item).closest(me.rowFilter));
        });
    };

    /**
     * getRowsBox -> getTrs
     * get rows box
     * param rowsBox {object} optional, return this.rowsBox if null
     * return {object}
     */
    this._getRowsBox = function (rowsBox) {
        return rowsBox || this.rowsBox;
    };

    //call last
    this.init();

    /*
    //??
    //src: 來源資料
    //return: true/false
    this.onClickDeleteRows = function (src) {
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
    onClickCheckAll: function (me, dataFid) {
        dataFid = dataFid || '_check0';
        var status = me.checked;
        $(me).closest('table').find('[data-id=' + dataFid + ']:not(:disabled)').prop('checked', status);
    };

    //??
    //get field by rowNo and dataId ??
    this.getField = function (tbody, rowNo, dataId) {
        return tbody.find('tr').eq(rowNo).find('[data-id=' + dataId + ']');
    };

    //keys is two dimension
    this.keysToStr = function (keys) {
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