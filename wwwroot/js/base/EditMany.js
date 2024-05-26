/**
 * multiple edit forms
 * notice:
 *   1.set data-fkeyFid when save
 *   
 * param-1 kid {string} pkey field id(single key)
 * param-2 eformId {string} (optional) edit form id
 *   if empty, you must write below functions:
 *     1.void fnLoadJson(json): show json to form, use loadJson instead of loadRows for more situation !!
 *     2.json fnGetUpdJson(upKey): get updated json by form
 *     3.bool fnValid(): (optional) validate check
 *   if not empty, system will load UI & prepare saving rows,
 *     and rows container tag is fixed to 'tbody'
 * param-3 tplRowId {string} (optional) row template id
 *   1.if empty, it will log error when call related function.
 *   2.system get fid-type from this variables
 *   3.called by singleFormLoadRow、loadRowsByBox、_renderRow
 * param-4 rowFilter {string} (optional) jQuery filter for find row object
 *   1.if empty, it will log error when call related function.
 *   2.inside element -> row(onDeleteRow),
 *   3.rowsBox -> row(getUpdRows)
 * param-5 sortFid {string} (optional) sort fid for front-side sorting function
 * 
 * return {EditMany}
 */
function EditMany(kid, eformId, tplRowId, rowFilter, sortFid) {

    /**
     * initial & and instance variables (this.validator by _valid.init())
     * call by this
     */ 
    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid, lowercase

        //variables
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
        this.hasEform = _str.notEmpty(eformId);
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
     * check is a new tr or not
     * param tr {object} 
     * return {bool}
     */
    this.isNewTr = function (tr) {
        var id = _itext.get(this.kid, tr);
        return _edit.isNewKey(id);
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
     * (urm: UserRole Mode), load json rows into UI by urm
     * param json {json} 
     */
    this.urmLoadJson = function (json, rowsBox, fids) {
        //reset form first
        var objs = rowsBox.find(':checkbox');
        _icheck.setO(objs, 0);
        objs.data('key', '');

        //check
        var rows = _crudE.getRowsByJson(json);
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
     * get upd json by UserRole mode(urm), Role欄位使用checkbox
     * called by User.js、XpRole.js
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
    },

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
     * load this json rows into UI, also set old values !!
     * param json {json} 
     */
    this.loadJson = function (json) {
        if (this.hasEform) {
            var rows = (json == null || json[_crudE.Rows] == null)
                ? null : json[_crudE.Rows];
            this.loadRowsByBox(this.rowsBox, rows);
        } else {
            //will raise error if no function
            this.fnLoadJson(json);
        }
    };

    /**
     * load rows with rowsBox
     * param rowsBox {object} rows box object
     * param rows {jsons}
     * param reset {bool} (default true) reset rowsBox first.
     */ 
    this.loadRowsByBox = function (rowsBox, rows, reset) {
        if (!this.checkTplRow())
            return;

        //reset if need
        //use "reset || true"" will cause wrong result !!
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
        return (this.hasEform) ? this.eform.validTable(this.validator) :
            (this.fnValid == null) ? true : this.fnValid();
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
        json[_crudE.Rows] = this.getUpdRows(upKey, rowsBox);
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
     * add one row(or empty) into UI
     * param {object} (optional) rowsBox
     * param {object} (optional) row
     * return {object} row jquery object(with UI)
     */
    this.addRow = function (rowsBox, row) {
        row = row || {};
        rowsBox = this.getRowsBox(rowsBox);
        var obj = this._renderRow(rowsBox, row);
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
    this._renderRow = function (rowsBox, row) {
        if (!this.checkTplRow())
            return null;

        rowsBox = this.getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.tplRow, row));
        _form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    };

    /**
     * (need this.rowFilter !!) formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * param rowsBox {object} (optional) use EditMany setting if empty
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