/**
 * multiple edit forms
 *   資料儲存在 html input
 * notice:
 *   set data-fkeyFid when save
 *   函數名稱後面ByRsb(表示by RowsBox)為擴充原本函數, 參數rowsBox空白則為this.RowsBox
 * 自定函數:
 *   void fnLoadJson(json)：show json to form, use loadJson instead of loadRows for more situation !!
 *   json fnGetUpdJson(upKey)：get updated json by form
 *   bool fnValid()：validate check
 *   void fnReset()：reset
 *   
 * param-1 kid {string} pkey field id(single key)
 * //param-2 eformId {string} (optional) edit form id
 * param-2 rowsBoxId {string} (optional) rows box id
 *   if empty, you must write functions: fnLoadJson、fnGetUpdJson、fnValid
 *   if not empty, system will load UI & prepare saving rows,
 *     and rows container tag is fixed to 'tbody'
 * param-3 tplRowId {string} (optional) row template id
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
//function EditMany(kid, eformId, tplRowId, rowFilter, sortFid) {
function EditMany(kid, rowsBoxId, tplRowId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid, lowercase

        //variables
        this.mode = _crudE.ModeBase;    //default value
        this.modeData = '';             //for different mode
        this.isUrm = false;             //is urm or not

        this.kid = kid;
        this.hasRowFilter = _str.notEmpty(rowFilter);
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;
        this.systemError = '';
        this.hasTplRow = _str.notEmpty(tplRowId);

        if (this.hasTplRow) {
            this.tplRow = $('#' + tplRowId).html();
            var rowObj = $(this.tplRow);

            //check input & alert error if wrong
            if (_obj.get(kid, rowObj) == null) {
                this.systemError = 'EditMany.js input kid is wrong (' + kid + ')';
                alert(this.systemError);
            }

            _edit.setFidTypeVars(this, rowObj);
            _edit.setFileVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = _str.notEmpty(rowsBoxId);
        if (this.hasEform) {
            //this.rowsBox = this.eform.find('tbody');    //use tbody(in table)
            this.rowsBox = $('#' + rowsBoxId);
            this.eform = this.rowsBox.closest('form');     //edit form object
            //if (this.rowsBox.length == 0)
            //    this.rowsBox = this.eform; 
        }

        this.deletedRows = [];  //deleted key string array
        this.newIndex = 0;      //new row serial no
    };

    //fids: 要傳到後端的欄位id array
    this.initUrm = function (fids) {
        this.mode = _crudE.ModeUR;
        this.modeData = fids;
        this.isUrm = true;
    };

    /**
     * check is a new row or not
     * param row {json} 
     * return {bool}
     */
    this.isNewRow = function (row) {
        return _edit.isNewRow(row);
    };

    /**
     * check is a new tr or not
     * param tr {object} 
     * return {bool}
     */
    this.isNewTr = function (tr) {
        return (_itext.get(_edit.IsNew, tr) == '1');
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
        } else {
            this.rowsBox.empty();   //empty rows ui first
            this._resetVar();
        }
    };

    //reset variables
    this._resetVar = function () {
        this.newIndex = 0;
        this.resetDeleted();
    };

    /**
     * reset deleted rows
     */
    this.resetDeleted = function () {
        this.deletedRows = [];
    };

    /**
     * (urm: UserRole Mode), load json rows into UI by urm
     * param json {json} 
     * param rowsBox {object} 
     * param fids {string[]} 
     */
    this._urmLoadJson = function (json) {
        this._urmReset();

        //check
        var rows = _crudE.getRowsByJson(json);
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
        this.resetDeleted();    //reset first
        this.rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_str.isEmpty(key)) {
                if (_icheck.checkedO(obj)) {
                    //new row
                    var row = {};
                    row[_edit.IsNew] = '1';     //new row flag
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
            json[_crudE.Rows] = rows;
        json[_crudE.Deletes] = this.getDeletedStr();
        return json;
    };

    this._urmReset = function () {
        this._resetVar();

        var objs = this.rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');
    };


    /**
     * single form load one row, also set field old value,
     * ex: DbAdm/MyCrud.js Etable is a single form but has multiple rows property !!
     * param rowBox {object}
     * param row {json}
     * param index {int}
     */
    this.singleFormLoadRow = function (rowBox, row, index) {
        if (!this.checkTplRow())
            return;

        var form = $(Mustache.render(this.tplRow, { Index: index }));
        _form.loadRow(form, row);   //use name field

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, form);
            obj.data(_edit.DataOld, row[fid]);
        }

        rowBox.append(form);
    };

    /**
     * 系統自動呼叫, PG不可呼叫, 否則會產生無窮迴圈 !!
     * load this json rows into UI, also set old values !!
     * param json {json} 
     */
    this.loadJson = function (json) {
        if (this.fnLoadJson) {
            this.fnLoadJson(json);
        } else if (this.isUrm) {
            this._urmLoadJson(json, _me.divRoles, _me.mUserRoleFids);
        } else {
            var rows = (json == null || json[_crudE.Rows] == null)
                ? null : json[_crudE.Rows];
            this.loadRowsByRsb(rows, true);
        }
    };

    /**
     * loadRowsByBox(rowsBox, rows, reset) -> loadRowsByRsb(rows, reset, rowsBox)
     * load rows with rowsBox
     * param rows {jsons}
     * param reset {bool} (default true) reset rowsBox first.
     * param rowsBox {object} (optional) rows box object, default this.rowsBox
     */ 
    this.loadRowsByRsb = function (rows, reset, rowsBox) {
        if (!this.checkTplRow())
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
            var row = rows[i];
            var box = $(Mustache.render(this.tplRow, row));
            //box.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j += 2) {
                fid = this.fidTypes[j];
                _edit.setOld(_obj.get(fid, box), row[fid]);
            }

            //set date input
            _idate.init(box);

            //one row into UI
            _form.loadRow(box, row);

            //into rows box
            box.appendTo(rowsBox);
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
     * param tr {object} row box
     * return {string} key value
     */
    this.getKey = function (tr) {
        return _input.get(this.kid, tr);
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

    this.checkRowFilter = function () {
        if (this.hasRowFilter)
            return true;

        _log.error('EditMany.js this.rowFilter is empty.');
        return false;
    };

    this.checkTplRow = function () {
        if (this.hasTplRow)
            return true;

        _log.error('EditMany.js this.tplRow is empty.');
        return false;
    };

    /**
     * get row box by inside element/object
     * param elm {element/object}
     * return {object}
     */
    this.elmToRowBox = function (elm) {
        return this.checkRowFilter()
            ? $(elm).closest(this.rowFilter)
            : null;
    };

    /**
     * get row box by id
     * param id {string} row id
     * return {object} row box
     */
    this.idToRowBox = function (value) {
        var filter = _input.fidFilter(this.kid) + `[value='${value}']`;
        return this.eform.find(filter).parent();
    };

    /**
     * getUpdJsonByCrud -> getUpdJson
     * 系統自動呼叫, PG不可呼叫, 否則會產生無窮迴圈 !!
     * get updated json, called by crudE.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    this.getUpdJson = function (upKey) {
        return this.fnGetUpdJson ? this.fnGetUpdJson(json) :
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
        json[_crudE.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_crudE.Deletes] = this.getDeletedStr();
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
     * public: myCrud.js 會用到
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows box, default this.rowsBox
     * return {jsons} null if empty
     */ 
    this.getUpdRows = function (upKey, rowsBox) {
        if (!this.checkRowFilter())
            return;

        //set sort field
        rowsBox = this._getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //this is not work inside each() !!
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            //add new row if empty key
            var tr = $(item);
            var key = _input.get(me.kid, tr);
            //if (_edit.isNewKey(key)) {
            if (me.isNewTr(tr)) {
                var row2 = _form.toRow(tr);
                row2[me.DataFkeyFid] = upKey;   //write anyway !!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            //var key = tr.data(_fun.DataKey);
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
                obj = _obj.get(fid, tr);
                value = _input.getO(obj, tr, ftype);
                //if totally compare, string is not equal to numeric !!
                if (value != _edit.getOld(obj)) {
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
     * get deleted rows(key array "string" !!)
     * return {string} null for empty.
     */ 
    this.getDeletedStr = function () {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    };    

    /**
     * onclick addRow button
     */
    this.onAddRow = function () {
        var row = this.addRow();
        _edit.addIsNew(row);    //增加_IsNew隱藏欄位
    };

    /**
     * add one row(or empty) into UI
     * param {object} (optional) row
     * param {object} (optional) rowsBox
     * return {object} rows box, default this.rowsBox
     */
    this.addRow = function (row, rowsBox) {
        row = row || {};
        rowsBox = this._getRowsBox(rowsBox);
        var obj = this._renderRow(row, rowsBox);
        this.boxSetNewId(obj);
        return obj;
    };

    /**
     * onclick deleteRow
     * param btn {element}
     */
    this.onDeleteRow = function (btn) {        
        var box = this.elmToRowBox(btn);
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
        var key = this.getKey(this.elmToRowBox(elm));
        _edit.viewFile(table, fid, elm, key);
    };

    /**
     * render row by UI template, called by addRow()
     * param rowsBox {object}
     * param row {json}
     * return {object} row object
     */ 
    this._renderRow = function (row, rowsBox) {
        if (!this.checkTplRow())
            return null;

        rowsBox = this._getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.tplRow, row));
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
        if (!this.checkRowFilter()) return null;

        rowsBox = this._getRowsBox(rowsBox);
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        rowsBox.find(me.rowFilter).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _edit.getServerFid(levelStr, fid);
                if (_ifile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    /**
     * row set fkey value
     * param row {json}
     * param fkeyFid {string}
     */
    this.rowSetFkey = function (row, fkey) {
        if (row != null && this.isNewRow(row))
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
                if (row != null && this.isNewRow(row))
                    row[this.DataFkeyFid] = fkey;
            }
        }
    };

    /**
     * set new id by row box
     * param box {object} row box
     * return {int} new key index
     */
    this.boxSetNewId = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
        _edit.addIsNew(box);    //增加_IsNew隱藏欄位
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