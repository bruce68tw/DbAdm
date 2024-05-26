﻿
/**
 * input form
 * 裡面function預設傳入object(not element or selector) 
 */
var _form = {

    /**
     * get input values, except read type
     * param form {object} input form
     * return {json}
     */ 
    toRow: function (form) {
        //skip link & read fields
        var row = {};
        form.find(_fun.fidFilter()).filter(':not(.xi-unsave)').each(function () {
            var obj = $(this);
            row[_fun.getFid(obj)] = _input.getO(obj, form);            
        });
        return row;

        /*
        //get input
        var attr = 'name';
        var array = form.serializeArray();  //key-value

        //good: jquery foreach
        var json = {};
        $.each(array, function () {
            json[this.name] = this.value || '';
        });

        //add checkbox input, skip pre name with '-'(for summernote)
        form.find(':checkbox').each(function () {
            var item = $(this);
            var id = item.attr(attr);
            //summernote auto generate checkbox with pre name '-', must skip !!
            if (_fun.hasValue(id) && id.indexOf('-') < 0)
                json[id] = _icheck.getO(item);
        });

        //add radio input
        var attr2 = '[' + attr + ']:radio';
        form.find(attr2).each(function () {
            var item = $(this);
            var id = item.attr(attr);
            json[id] = _iradio.get(id, form);
        });
        return json;
        */
    },
    toRowStr: function (form) {
        return JSON.stringify(_form.toRow(form));
    },

    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    loadRow: function (form, row) {
        for (var key in row)
            _input.set(key, row[key], form);
    },

    /**
     * reset all inputs with name attribute
     * param form {object}
     */
    reset: function (form) {
        form.find(_fun.fidFilter()).each(function () {
            _input.setO($(this), '', form);
        });
    },

    /**
     * check has file input or not
     */ 
    hasFile: function (form) {
        return (form.find(':file').length > 0);
    },

    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    setEdit: function (form, status) {
        //text & textArea
        _itext.setEditO(form.find('input:text'), status);
        _itextarea.setEditO(form.find('textarea'), status);

        //date, dt
        _idate.setEditO(form.find('.date input'), status);

        //dropdown
        _iselect.setEditO(form.find('select'), status);

        //checkbox & radio
        _icheck.setEditO(form.find(':checkbox'), status);
        _iradio.setEditO(form.find(':radio'), status);

        //TODO: html

        //button
        _btn.setEditO(form.find('button'), status);

        /*
        form.find(':checkbox').each(function () {
            $(this).icheck(enabled);
        });
        //radio
        form.find(':radio').each(function () {
            $(this).icheck(enabled);
        });
        */
    },

    /**
     * hide & show div with effect
     * param hides {array} object array to hide
     * param shows {array} object array to show
     */
    hideShow: function (hides, shows) {
        //hide first
        if (hides) {
            for (var i = 0; i < hides.length; i++) {
                var form1 = hides[i];
                form1.fadeOut(500, function () {
                    form1.hide();
                });
            }
        }

        //show
        if (shows) {
            for (var i = 0; i < shows.length; i++) {
                var form2 = shows[i];
                form2.fadeIn(500, function () {
                    form2.show();
                });
            }
        }
    },


    //=== below is old and remark ===
    /*
    //get save data without files
    //row: jobject
    //deletes: list<list<string>>
    //rows: list<JArray>
    //return json
    getSaveData: function (isNew, key, row, rows, deletes) {
        return {
            isNew: isNew,
            key: key,
            row: _json.toStr(row),
            rows: _json.toStr(rows),
            deletes: _form.keysToStr(deletes),
        };
    },

    //??
    //單筆資料包含要上傳的多個檔案
    //files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
    getSaveRow: function (isNew, box, row, files) {
        files = files || [];
        //multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        //var i;
        for (var i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], box);

        data.append('row', _json.toStr(row));
        return data;
    },
    */

    /** 
     * description 傳回要送到後端的儲存資料
     * param {bool} isNew
     * param {object} box object
     * param {object} row json object, for save
     * param {array} files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
     * param {array} multis 多筆資料 src
     * return {FormData} json
     */
    /*
    //getSaveData: function (isNew, box, row, files, multis) {
    getSaveDataWithFiles: function (isNew, box, row, files, multis) {
        files = files || [];
        multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        var i;
        for (i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], box);

        //rows 加入單筆
        var rows = [row];

        //多筆資料的異動/刪除
        var deletes = [];
        for (i = 0; i < multis.length; i++) {
            //異動資料
            _editMany.dataAddRows(data, rows, multis[i]); //多筆
            //var hasRows = (multis[i][1] !== null && multis[i][1] !== undefined);
            //if (hasRows)
            //    multis[i][1].rows = rows2;

            //刪除資料
            deletes[i] = multis[i].deletes;
        }

        //加入
        data.append('rows', _json.toStr(rows));     //加入多筆
        data.append('deletes', _editMany.keysToStr(deletes));  //輸出字串
        return data;
    },

    //??
    //捲動畫面到第一個錯誤欄位
    zz_scrollTopError: function () {
        $('.' + _fun.errLabCls).each(function (i, data) {
            if ($(data).is(':visible')) {
                var t = $(data);
                var x = $(t).offset().top - 185;

                if ($('.wrapper').parent().hasClass('slimScrollDiv'))
                    $('.wrapper').slimScroll({ scrollTo: x });
                else if ($('.wrapper').hasClass('noWrapperScroll'))
                    $('.scroolablePanel').slimScroll({ scrollTo: $(t).position().top - 200 });
                else
                    $("html, body").animate({ scrollTop: x }, "slow");
                return (false);
            }
        })
    },

    //keys is two dimension
    zz_keysToStr: function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    },
    */

    /**
     * ??
     檢查欄位清單內是否有空白欄位, 如果有則顯示必填
     讀取 xd-required class
     如果欄位值有錯誤, 則會focus在第一個錯誤欄位
     包含多筆區域 !!
     //param {array} ids source field id array
     param {object} box box object, for 多筆畫面??
     //param {string} msg error msg, 如果沒輸入, 則使用 _BR.FieldRequired
     return {bool} true(field ok), false(has empty)
    */
    /*
    checkEmpty: function (box) {
        //clear error label first
        box.find('.' + _fun.errCls).removeClass(_fun.errCls);
        box.find('.' + _fun.errLabCls).hide();

        //if (_str.isEmpty(msg))
        //var msg = ;

        //get ids
        //var ids = [];
        var ok = true;
        box.find('.' + _fun.XdRequired).each(function () {
            var me = $(this);
            if (_str.isEmpty(_input.getO(me, box))) {
                ok = false;
                //me.addClass(_fun.errCls);
                var id = _obj.getId(me);
                if (_str.isEmpty(id))
                    id = _obj.getDid(me);
                _input.showError(me, id, _BR.FieldRequired, box);
            }
        });
        return ok;

        //check if ids is string
        //if (typeof ids === 'string') {
        //    ids = [ ids ];    //把字串變成陣列
        //if (ids == null || ids.length == 0)
        //    return true;

    },
    */

    /*
    //把json的資料比對checkbox,相同值勾選起來(相同欄位名稱)
    jsonCheckBoxToForm: function (json, boxId) {
        var box = $('#' + boxId);
        Object.keys(json).map(function (key, index) {
            $('input[name=""]' + key).each(function () {
                if ($(this).val() == json[key]) {
                    $(this).prop("checked", true);
                }
            });
        });
    },
    */    

    /*
    zz_reset: function (box) {
        //var box = $('#' + box);
        //文字欄位
        box.find('input:text').val('');
    },
    */

}; //class