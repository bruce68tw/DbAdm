/**
 * multiple edit forms
 * notice:
 *   1.set data-fkeyFid when save
 *   
 * param kid {string} (required) pkey field id(single key)
 * param eformId {string} (optional) edit form id
 *   if not empty, system will load UI & prepare save rows
 *     and rows container tag is fixed to 'tbody'
 *   if empty, you could write below custom functions:
 *     1.void fnLoadJson(json): necessary, show form
 *     2.json fnGetUpdJson(upKey): necessary
 *     3.bool fnValid(): (optional) validate check
 * param tplRowId {string} (optional) row template id for load row & render row.
 * param rowFilter {string} (optional) filter for find row object
 *   1.inside element -> row(onDeleteRow), 2.rowsBox -> row(getUpdRows)
 * param sortFid {string} (optional) sort fid for sorting function
 * return {EditMany}
 */
function EditMany(kid, eformId, tplRowId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid

        this.kid = kid;
        this.hasTplRow = !_str.isEmpty(tplRowId);
        this.hasRowFilter = !_str.isEmpty(rowFilter);
        this.rowFilter = rowFilter;
        this.sortFid = sortFid;

        if (this.hasTplRow) {
            this.tplRow = $('#' + tplRowId).html();
            var rowObj = $(this.tplRow);
            _edit.setFidTypeVars(this, rowObj);
            _edit.setFileVars(this, rowObj);
        }

        //has edit form or not
        this.hasEform = !_str.isEmpty(eformId);
        if (this.hasEform) {
            this.eform = $('#' + eformId);     //edit form object
            this.rowsBox = this.eform.find('tbody'); //use tbody(in table)
        }

        this.deletedRows = [];  //deleted key string array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * check is a new row or not
     * param row {json} 
     * return {bool}
     */
    this.isNewRow = function (row) {
        //return _str.isEmpty(row[this.kid]);
        return _edit.isNewKey(row[this.kid]);
    };

    /**
     * reset edit form
     * param rowsBox {object} optional
     */
    this.reset = function (rowsBox) {
        rowsBox = this.getRowsBox(rowsBox);
        if (rowsBox != null)
            rowsBox.empty();   //empty rows ui first

        //reset variables
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
     * load this json rows into UI
     * param json {json} 
     */
    this.loadJson = function (json) {
        if (this.hasEform) {
            var rows = (json == null || json[_crud.Rows] == null)
                ? null : json[_crud.Rows];
            this.loadRows(this.rowsBox, rows);
        } else {
            //raise error if no function
            this.fnLoadJson(json);
        }
    };

    /**
     * load json rows into UI by UserRole Mode(urm)
     * param json {json} 
     */
    this.urmLoadJson = function (json, rowsBox, fids) {
        //reset form first
        var objs = rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');

        //check
        var rows = _crud.getJsonRows(json);
        if (rows == null)
            return;

        //set checked sign & old value
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = rowsBox.find(_fun.fidFilter(row[fids[1]]));   //fid map to dataFid
            _icheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    };

    /**
     * get upd json by UserRole mode(urm)
     * param upKey {string} up key
     * param rowsBox {object} rows box
     * param keyFid {string} key fid, ex: UserId
     * param dataFid {string} data fid, ex: RoleId
     * return {json} modified columns only
     */
    this.urmGetUpdJson = function (upKey, rowsBox, fids) {
        var json = {};
        var rows = [];
        var me = this;
        var newIdx = 0;
        this.resetDeleted();    //reset first
        rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_str.isEmpty(key)) {
                if (_icheck.checkedO(obj)) {
                    //new row
                    var row = {};
                    row[fids[0]] = ++newIdx;
                    row[fids[1]] = _icheck.getO(obj);
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
            json[_crud.Rows] = rows;
        json[_crud.Deletes] = this.getDeletedStr();
        return json;
    },

    /**
     * load row by row box(container), also set old value
     * param rowBox {object}
     * param row {json}
     * param index {int}
     */
    this.loadRow = function (rowBox, row, index) {
        if (!this.checkTplRow())
            return;

        var form = $(Mustache.render(this.tplRow, { Index: index }));
        _form.loadJson(form, row);   //use name field

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, form);
            obj.data(_edit.DataOld, row[fid]);
        }

        rowBox.append(form);
    };

    /**
     * load rows to form UI, also set old values !!
     * param rowsBox {object} rows box object
     * param rows {jsons}
     */ 
    this.loadRows = function (rowsBox, rows, reset) {
        if (!this.checkTplRow())
            return;

        //reset if need
        if (reset === undefined)
            reset = true;
        if (reset)
            this.reset(rowsBox);

        //var rows = json._rows;
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen === 0)
            return;

        //render rows
        for (var i = 0; i < rowLen; i++) {
            var row = rows[i];
            var box = $(Mustache.render(this.tplRow, row));
            //box.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j = j + 2) {
                fid = this.fidTypes[j];
                var obj2 = _obj.get(fid, box);
                _edit.setOld(obj2, row[fid]);
            }

            //one row into UI
            _form.loadJson(box, row);

            //into rows box
            box.appendTo(rowsBox);
        }        
    };

    /**
     * validate form
     */
    this.valid = function () {
        return (this.hasEform) ? this.eform.validTable(this.validator) :
            (this.fnValid == null) ? true : this.fnValid();
    };

    /**
     * get row key
     * param box {object} row box
     * return {string} key value
     */
    this.getKey = function (box) {
        return _input.get(this.kid, box);
    };

    /**
      * get row(json) by tr object
      * trObj {object} tr object
      * fidTypes {string array} field info array
      * return {json} one row
      */
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
     * get updated json, called by crud.js only !!
     * param upKey {string}
     * return {json} modified columns only
     */
    this.getUpdJsonByCrud = function (upKey) {
        return (this.hasEform)
            ? this.getUpdJson(upKey, this.rowsBox)
            : this.fnGetUpdJson(upKey);
    };

    /**
     * get updated json, called by crud.js only
     * param upKey {string}
     * param rowsBox {object}
     * return {json} modified columns only
     */
    this.getUpdJson = function (upKey, rowsBox) {
        rowsBox = this.getRowsBox(rowsBox);
        var json = {};
        json[_crud.Rows] = this.getUpdRows(upKey, rowsBox);
        json[_crud.Deletes] = this.getDeletedStr();
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
     * (need this.rowFilter !!) get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} (optional) rows container
     * return {jsons} null if empty
     */ 
    this.getUpdRows = function (upKey, rowsBox) {
        if (!this.checkRowFilter())
            return;

        //set sort field
        rowsBox = this.getRowsBox(rowsBox);
        this.setSort(rowsBox);

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //this is not work inside each() !!
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            //add new row if empty key
            var tr = $(item);
            var key = _input.get(me.kid, tr);
            if (_edit.isNewKey(key)) {
                var row2 = me.getRow(tr);
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
        this.addRow();
    };

    /**
     * add one row into UI
     * param {object} row(optional)
     * return {object} row jquery object(with UI)
     */
    this.addRow = function (rowsBox, row) {
        row = row || {};
        rowsBox = this.getRowsBox(rowsBox);
        var obj = this.renderRow(rowsBox, row);
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
     * param rowBox {object} (optional) row box object
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
    this.renderRow = function (rowsBox, row) {
        if (!this.checkTplRow())
            return;

        rowsBox = this.getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.tplRow, row));
        _form.loadJson(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    };

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data, rowsBox) {
        if (!this.hasFile)
            return null;

        if (!this.checkRowFilter())
            return null;

        rowsBox = this.getRowsBox(rowsBox);
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
        return this.newIndex;
    };

    /**
     * set sort field if need
     * param rowsBox {object}
     */
    this.setSort = function (rowsBox) {
        var sortFid = this.sortFid;
        if (_str.isEmpty(sortFid))
            return;

        var me = this;
        rowsBox = this.getRowsBox(rowsBox);
        rowsBox.find(_fun.fidFilter(sortFid)).each(function (i, item) {
            //this did not work in this loop !!
            _itext.set(sortFid, i, $(item).closest(me.rowFilter));
        });
    };

    /**
     * get rows box
     * param rowsBox {object} optional, return this.rowsBox if null
     * return {object}
     */
    this.getRowsBox = function (rowsBox) {
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

    //?? -> _crud.js
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