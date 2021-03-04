//多筆維護
//處理沒有 child 的資料
//called by _crud.js
/*
 一個 crud json 包含3個欄位: _rows, _deletes, _childs
   _rows: 多筆資料, 包含資料異動和 "檔案上傳"
   _deletes[]: 要刪除的Id array 字串(後端才能decode!!), 只有一個 id欄位(必須使用json格式才能傳到後端 !!)
   _childs  
 處理編輯畫面的多筆資料, 
   1.產生的資料(變數)包含3個欄位:
     form: form container
     rows[]: 表示要異動的資料 array, 欄位為欄位名稱, 其中 :
       //_new : 1/0
       //_key : 主key值, from data-key, for刪除only
       _fileNo : 欄位對應到要上傳的檔案序號(>=0), -1表示無檔案, -2表示要刪除檔案
 注意:
   //1.tr要放一個checkbox欄位 for 刪除資料
   //2.tr最多只能有一個上傳檔案欄位(也可以沒有)
   3.系統自動填入tr 2個屬性 :
     //(a).data-new: 1/0
     //(b).data-key: 單欄位主key
   4.異動欄位設定屬性 : name='xxx', xxx為欄位名稱
   //5.刪除按鈕固定呼叫 : this.onClickDeleteRows(_me.divXXX, _me.XXX)
   ??5.刪除按鈕固定呼叫 : this.onClickDeleteRows(_me.multiXXX)
   ??6.檔案欄位固定內容 : <input type='file' onchange='this.onChangeFile(this)'>
   ??7.在後端要自行處理上傳檔名的問題
   ??8.刪除多table多筆資料時, 分隔符號為: table(:), row(;), col(,), 後端必須同時配合!!
   ??9.多筆資料的上傳檔案暫時呼叫 _xp.tdFile(url)

 * 注意:
 *   保留的自訂函數:
 *     //void ufAfterLoadJson(rowJson)
 *     //bool ufWhenSave():
 *     //void ufAfterSave(): 在 _crud.js呼叫

   //如果有child, 則新增時要設定 id=new index
   儲存前要設定 data fkeyFid(base 0, for 新增)
 */

/**
 * constructor
 * param kid {string} pkey field id(single key)
 * param formId {string} form row container id
 *   if not empty, system will load UI & prepare save rows
 *   and rows container tag is fixed to 'tbody'
 * param tplRowId {string} row template id
 * param sortFid {string} (optional) sort fid for sorting function
 */
function EditMany(kid, formId, tplRowId, sortFid) {

    //新增row時, 同時設定以下2個row box 欄位, save時, 會傳入後端
    //1.row index, 
    //this.DataIndex = '_index';
    //2.對應上層資料的key值, 如上層為新增, 則設定為 DataIndex的值(前面加負號, 做為區別)
    //this.DataMapFid = '_mapfid';

    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid
        this.RowTag = 'tr';             //row tag

        this.kid = kid;
        this.tplRow = $('#' + tplRowId).html();

        var rowObj = $(this.tplRow);
        _edit.setFidTypeVars(this, rowObj);
        _edit.setFileVars(this, rowObj);

        this.hasForm = !_str.isEmpty(formId);
        if (this.hasForm) {
            this.form = $('#' + formId);     //form object
            this.rowsBox = this.form.find('tbody'); //use tbody
        }

        this.sortFid = sortFid;
        this.deletedRows = [];  //deleted key array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * check is a new row or not
     * param row {json} 
     * return {bool}
     */
    this.isNewRow = function (row) {
        //return _str.isEmpty(row[this.kid]);
        return this.isNewKey(row[this.kid]);
    };

    /**
     * reset edit form
     */
    this.resetVar = function () {
        //this.loadJson();
        //if (!this.hasForm)
        //    return;

        //rowsBox.empty();   //empty rows ui first
        this.newIndex = 0;
        this.deletedRows = [];
    };

    /**
     * load this json rows into UI
     * param {jarray} rows
     */
    this.loadJson = function (json) {
        //reset first
        this.resetVar();

        //if (json == null || json[_crud.Rows] == null)
        //    return;

        if (this.hasForm) {
            var rows = (json == null || json[_crud.Rows] == null) ? null : json[_crud.Rows];
            this.loadRows(this.rowsBox, rows);
        } else {
            this.fnLoadJson(json);
        }
    };

    /**
     * load this json rows into UI
     * param {jarray} rows
     */
    /*
    this.loadRows = function (rows) {
        //reset first
        this.reset();

        if (this.hasForm)
            this.loadRows(this.rowsBox, rows);
        else
            this.fnLoadJson(rows);
    };
    */

    //load row by row box(container)
    this.loadRow = function (box, row, index) {
        var form = $(Mustache.render(this.tplRow, { Index: index }));
        _form.loadRow(form, row);   //使用 name

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, form);
            obj.data(_edit.DataOld, row[fid]);
        }

        box.append(form);
    };

    /**
     * load rows to form UI
     * param rowsBox {object} rows box container
     * param rows {jsons}
     */ 
    this.loadRows = function (rowsBox, rows) {
        //reset first
        rowsBox.empty();

        //var rows = json._rows;
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen === 0)
            return;

        //render this rows
        //var fidTypeLen = fidTypes.length;
        for (var i = 0; i < rowLen; i++) {
            var row = rows[i];
            var obj = $(Mustache.render(this.tplRow, row));
            //obj.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j = j + 2) {
                fid = this.fidTypes[j];
                var obj2 = _obj.get(fid, obj);
                _edit.setOld(obj2, row[fid]);
            }

            _form.loadRow(obj, row);
            /*
            //設定 checkbox, radio status(後端無法設定) !!
            //要加入 checkbox 欄位, 只會讀取有name的欄位值
            obj.find(':checkbox').each(function () {
                var item = $(this);
                var id = item.data('id');
                if (id !== undefined && id.indexOf('-') < 0)
                    _icheck.setO(item, row[id]);
            });

            //要加入 radio 欄位, 只會讀取有name的欄位值
            obj.find(':radio').each(function () {
                var item = $(this);
                var id = item.data('id');
                if (id !== undefined)
                    _iradio.setO(item, row[id]);
            });
            */

            obj.appendTo(rowsBox);
        }        
    };

    this.valid = function () {
        return (this.hasForm)
            ? this.form.valid()
            : this.fnValid();
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
            row[fid] = _input.getByType(obj, this.fidTypes[i + 1], trObj);
        }
        return row;
    };

    /**
     * get row box by inside object/element
     * param obj {object/element} 
     * return {object}
     */
    this.getRowBox = function (obj) {
        return $(obj).closest(this.RowTag);
    };

    /**
     * get updated json
     * param {upKey}
     * return {json} different column only
     */
    this.getUpdJson = function (upKey) {
        if (!this.hasForm)
            return this.fnGetUpdJson();

        var json = {};
        json[_crud.Rows] = this.getUpdRowsByArg(upKey, this.rowsBox);
        json[_crud.Deletes] = this.getDeletedRows();
        return json;
    };

    //是否為new key, parseInt(英數字) 會傳回int, 不可使用!!
    this.isNewKey = function (key) {
        return (key.length <= 3);
    };

    /**
     * get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} rows container
     * param trFilter {string} (optional) default to this.RowTag
     * return {json} null if empty
     */ 
    this.getUpdRowsByArg = function (upKey, rowsBox, trFilter) {
        //rowsBox = rowsBox || this.rowsBox;
        trFilter = trFilter || this.RowTag;

        //set sort field
        this.setSort();

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //先用變數接起來, 否則在 each() 裡面不能用 this
        rowsBox.find(me.RowTag).each(function (idx, item) {
            //add new row if empty key
            var tr = $(item);
            var key = _input.get(me.kid, tr);
            if (me.isNewKey(key)) {
                var row2 = me.getRow(tr);
                row2[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
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
                //label 不取值
                ftype = me.fidTypes[j + 1];
                if (ftype === 'label')
                    continue;

                fid = me.fidTypes[j];
                obj = _obj.get(fid, tr);
                value = _input.getByType(obj, ftype, tr);
                //如果使用完全比對, 字串和數字會不相等!!
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
     * return empty if empty.
     */ 
    this.getDeletedRows = function () {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    };    

    //onclick addRow button
    this.onAddRow = function () {
        this.addRow();
    };

    /**
     * 增加一筆資料
     * param {object} row(optional)
     * return {object} row jquery object(with UI)
     */
    //this.addRow = function (upKey, row) {
    this.addRow = function (row) {
        if (!this.hasForm) {
            _log.error('EditMany.js addRow() failed, hasForm is false.');
            return null;
        }

        row = row || {};
        //row[this.DataIsNew] = isNew ? 1 : 0;
        //var isNew = this.isNewRow(row);
        //if (this.isNewRow(row))
        //    row[this.kid] = ;
        //if (this.oldRows == null)
        //    this.oldRows = [];
        //this.oldRows[this.oldRows.length] = row;

        var obj = this.renderRow(row);
        this.boxSetNewId(obj);
        return obj;
    };

    //user click deleteRow
    this.onDeleteRow = function (btn) {        
        //var trObj = $(btn).closest(this.RowTag);
        var trObj = this.getRowBox(btn);
        this.deleteRow(_itext.get(this.kid, trObj), trObj);
    };

    /**
     * add deleted row & remove UI row
     * param key {string} row key
     * param trObj {object} (optional) tr object
     */ 
    this.deleteRow = function (key, trObj) {
        var rows = this.deletedRows;
        var found = false;
        var rowLen = rows.length;
        for (var i = 0; i < rowLen; i++) {
            //do nothing if existed
            if (rows[i][this.kid] === key) {
                found = true;
                break;
            }
        }

        //add deleted[]
        if (!found)
            rows[rowLen] = key;

        //remove UI row if need
        //if (this.hasForm && trObj)
        //this.rowsBox.remove(trObj);
        if (_obj.isExist(trObj))
            trObj.remove();
    };

    /**
     * onclick viewFile
     * param elm {element} link element
     */
    this.onViewImage = function (table, fid, elm) {
        var key = this.getKey(this.getRowBox(elm));
        if (this.isNewKey(key))
            _tool.msg(_BR.NewFileNotView);
        else
            _tool.showImage(elm.innerHTML, _str.format('GetFile?table={0}&fid={1}&key={2}', table, fid, key));
    };

    /**
     * render row by UI template
     * return jquery object of row
     */ 
    this.renderRow = function (row) {
        if (!this.hasForm)
            return null;

        var obj = $(Mustache.render(this.tplRow, row));
        //obj.data(this.kid, row[this.kid]);
        obj.appendTo(this.rowsBox);
        return obj;
    };

    /**
     * formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        //debugger;
        //var form = this.form;
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        this.rowsBox.find(me.RowTag).each(function (index, item) {
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

    //=== 以下待修正 ===
    /**
     @description 2個功能: 
       1.FormDate 增加上傳檔案
       2.累加多筆資料
     如果多筆資料有上傳檔案, 而且是多主key, 則要在後端自行處理上傳檔案名稱的問題 !!
     注意: radio 有2種情形(true/false):
         
     @param {object} data FormData(在外面宣告), 把上傳檔案加到這個變數裡面
     @param {array} toRows 來源多筆資料, [0]為單筆(已存在), [1]以後為多筆(開始寫入)
     @param src: container
     @param oneRadio: 
       1.false: row有自己的 radio group(default): (此時id & name不同):
         用id 找name, 取name有checked的項目取值, 再寫回 id欄位
       2.true: rows共用一個 radio group: (此時id & name相同):
     //kid: key id欄位名稱, 把key值寫到這個欄位, 如果沒有上傳檔案, 則不需要
     //setRowsFiles: function (data, src, src, kid) {
     //@return 資料筆數
    */
    //addFilesAndRows: function (data, toRows, src) {
    //??
    /*
    this.dataAddRows = function (data, toRows, src) {
        //if (oneRadio === undefined)
        //    oneRadio = false;
        var fileLen = data.getAll('files').length;    //目前上傳檔案數量
        var rows = [];      //要異動的多筆資料
        var fields = [];    //obj. id, type欄位
        src.box.find('tr').each(function (index, item) {
            //寫入欄位資訊 fields[id,type] (只寫第一次)
            var tr = $(item);
            if (fields.length === 0) {
                //尋找所有 data-id 的欄位
                tr.find("[data-id]").each(function (i2, item2) {
                    var obj2 = $(item2);
                    fields[i2] = {
                        //obj: obj2,
                        id: obj2.data('id'),
                        type: _input.getType(obj2),
                    };
                });
            }

            //檔案加入 formData, 欄位名稱(後端變數名稱)為 files
            var fileNo = -1;    //初始化, -1表示無檔案
            var files = tr.find(':file');
            if (files.length > 0) {
                files = files[0].files;
                if (files.length > 0) {
                    data.append('files', files[0]);
                    fileNo = fileLen;
                    fileLen++;
                }
            }

            //寫入異動資料
            //row為多筆的一筆資料, 保留欄位的名稱加底線
            var row = { _fileNo: fileNo };  //對應要上傳的檔案位置序號, -1表示無檔案
            //if (kid !== undefined && kid != '')
            //    row[kid] = tr.data('key');      //寫入key值
            row._fun = tr.data(this.dataFun);          //row fun??
            row._key = tr.data(this.DataKey);          //row key
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = '';
                var obj = tr.find('[data-id=' + field.id + ']');
                //考慮多筆的 radio 欄位是否為共用!!
                row[field.id] = (field.type == 'radio')
                    ? (src.oneRadio)
                        ? _iradio.getO(obj, src.box)
                        : _iradio.get(obj.attr('name'), src.box)
                    : _input.getByType(obj, field.type, tr);
            }
            rows.push(row);
        });

        //陣列加一
        toRows[toRows.length] = rows;   //寫入外部 rows
        src.rows = rows;    //同時寫入自己的rows !!
        //return rows;
    };

    //write row key info from jquery object to model
    this.keyObjToModel = function (obj, model) {
        model[this.DataIsNew] = obj.data(this.DataIsNew);
        model[this.DataKey] = obj.data(this.DataKey);
    };
    //write row key info from model to jquery object
    this.keyModelToObj = function (model, obj) {
        obj.data(this.DataIsNew, model[this.DataIsNew]);
        obj.data(this.DataKey, model[this.DataKey]);
    };
    this.keyModelToModel = function (from, to) {
        if (!_str.isEmpty(from[this.DataIsNew]))
            to[this.DataIsNew] = from[this.DataIsNew];
        if (!_str.isEmpty(from[this.DataKey]))
            to[this.DataKey] = from[this.DataKey];
    };
    this.keyValuesToObj = function (isNew, key, obj) {
        obj.data(this.DataIsNew, isNew);
        obj.data(this.DataKey, key);
    };
    this.keyValuesToModel = function (isNew, key, model) {
        model[this.DataIsNew] = isNew;
        model[this.DataKey] = key;
    };
    */

    /**
    * @param {string} rows checkbox data-id value
    */
    /*
    this.zz_boxLoadData = function (rows) {
        var len = (rows == null) ? 0 : rows.length;

        //empty rows ui first
        this.rowsBox.empty();

        //render rows
        for (var i = 0; i < len; i++)
            this.rowsBox.append(Mustache.render(this.tplRow, rows[i]));

        //keep old column values

        //reset
        //this.oldRows = rows;
        this.newIndex = 0;
        this.deletedRows = [];
    };    
    */

    this.rowSetFkeyFid = function (row, fkeyFid) {
        if (row != null && this.isNewRow(row))
            row[this.DataFkeyFid] = fkeyFid;
    };

    this.rowsSetFkeyFid = function (rows, fkeyFid) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && this.isNewRow(row))
                    row[this.DataFkeyFid] = fkeyFid;
            }
        }
    };

    /*
    this.boxSetMapId = function (box, fkeyFid) {
        box.data(this.DataFkeyFid, fkeyFid);
    };
    */

    //set new id for box
    this.boxSetNewId = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
    };

    //set sort field
    this.setSort = function () {
        var sortFid = this.sortFid;
        if (!_str.isEmpty(sortFid)) {
            this.rowsBox.find(this.RowTag).each(function (i, item) {
                //this did not work in this loop !!
                _itext.set(sortFid, i, $(item));
            });
        }
    };


    //=== 最後呼叫 ===
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