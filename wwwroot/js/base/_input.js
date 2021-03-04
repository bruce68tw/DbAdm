/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toJson()
 * 3.validation error span position rules:
 *   (a)same parent, could be different child level
 *   (b)sibling(ex: Date)
 */
var _input = {

    /*
    //get object
    getObj: function (fid, box) {
        var obj = _obj.get(fid, box);
        if (obj.length == 0)
            obj = _obj.getD(fid, box);   //iRead use data-fid
        return obj;
    },
    */

    //get input value by data-fid
    get: function (fid, box) {
        return _input.getO(_obj.get(fid, box));
    },

    /**
     * get input value by object
     * param obj {object}
     * param type {string} optional, data-type
     * return input value
     */ 
    getO: function (obj, type) {
        type = type || _input.getType(obj);
        switch (type) {
            case 'check':
                return _icheck.getO(obj);
            case 'radio':
                //obj is array now !!
                return _iradio.getO(obj);
            case 'textarea':
                //must set html !!
                return _itextarea.getO(obj);
            case 'select':
                return _iselect.getO(obj);
            case 'file':
                return _ifile.getO(obj);
            case 'read':
                return _iread.getO(obj);
            case 'date':
                return _idate.getO(obj);
            case 'dt':
                return _idt.getO(obj);
            case 'linkFile':
                return _ilinkFile.getO(obj);
            default:
                //text, textarea
                return obj.val();
        }
    },

    set: function (fid, value, box) {
        _input.setO(_obj.get(fid, box), value);
    },

    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param type {string} optional, data-type
     */ 
    setO: function (obj, value, type) {
        type = type || _input.getType(obj);
        switch (type) {
            case 'check':
                _icheck.setO(obj, value);
                break;
            case 'radio':
                //此時 obj 為 array
                value = value || '0';
                _iradio.setOs(obj, value);
                break;
            case 'textarea':
                //重要!! 要設定它的 html 屬性!!
                value = _ihtml.decode(value);
                obj.html(value);
                obj.val(value);     //也要設定這個屬性 !!
                //obj.text(value);
                break;
            case 'select':
                _iselect.setO(obj, value);
                break;
            case 'file':
                _ifile.setO(obj, value);
                break;
            case 'read':
                //debugger;
                var format = obj.data('format');
                if (!_str.isEmpty(format) && !_str.isEmpty(_BR[format]))
                    value = _date.jsToFormat(value, _BR[format]);
                _iread.setO(obj, value);
                break;
            case 'date':
                return _idate.setO(obj, value);
            case 'dt':
                return _idt.setO(obj, value);
            case 'linkFile':
                return _ilinkFile.setO(obj, value);
            default:
                //text, textarea
                obj.val(value);
                break;
        }
    },

    /**
     * get input field type
     */ 
    getType: function (obj) {
        return obj.data('type');
    },


    //=== below is old && remark ===
    /**
     * ??顯示欄位的錯誤訊息, fid欄位會直接加上 error className
     * 先找 error label, 再找上面相鄰的 object, 然後加入 xg-error
     * param fid {string} 欄位id
     * param msg {string} 顯示訊息, 可為空白, 此時會顯示錯誤外框, 但是無錯誤訊息
     * param box {object} (optional) box(jquery object), for 多筆畫面
     * return: void
    showError: function (obj, fid, msg, box) {
        //輸入欄位增加 error class
        obj.addClass(_fun.errCls);

        //label欄位設定文字內容
        var filter = '[data-id2=' + fid + _fun.errTail + ']';
        //先找parent下
        //var label = _obj.getF(filter, box);
        var parent = obj.parent();
        var label = parent.find(filter);
        if (label.length == 0)
            label = parent.next();
        //obj.addClass(_fun.errCls);
        label.text(msg);
        label.show();
        //_form.scrollTopError();
    },
     */

    /**
     * get input value by type
     * param obj {object}
     * param type {string} field type
     * param box {object} (optional) for radio only
     * return {object} input value
    getByType: function (obj, type, box) {
        switch (type) {
            case 'check':
                return _icheck.getO(obj);
            case 'radio':
                return _iradio.getO(obj, box);
            //TODO: summernote
            //case 'textarea':
            //    return obj.html();   //html !!
            default:
                //同時適用select option
                return obj.val();
        }
    },
     */

    /**
     * get old value (get data-old value)
    getOld: function (obj) {
        return obj.data('old');
    },
     */

    /**
     * 檢查欄位是否binding event
    isBound: function(filter) {
        var field = $(filter);
        return (field.find(':not(.bound)').length == 0);
    },
     */

    /**
     * set edit status
    setEdit: function (fid, status, box) {
        //文字欄位
        _obj.get(fid, box).attr('readonly', !status);
    },
    setEdits: function (fids, status, box) {
        //文字欄位
        for (var i = 0; i < fids.length; i++) 
            _obj.get(fids[i], box).attr('readonly', !status);
    },

    //檢查欄位是否存在, true/fales
    exist: function (fid, box) {
        return _input.existF('#' + fid, box);
    },

    existF: function (filter, box) {
        var field = (box === undefined) ? $(filter) : box.find(filter);
        return (field.length > 0);
    },
     */

    /**
     * select option on change event.
    _onChangeSelect: function (me) {
        //var tt = 'tt';
        var className = 'selected';
        var len = me.options.length;
        for (var i = 0; i < len; i++) {
            var opt = me.options[i];
            var opt2 = $(opt);

            // check if selected
            if (opt.selected) {
                if (!opt2.hasClass(className))
                    opt2.addClass(className);
            } else {
                if (opt2.hasClass(className))
                    opt2.removeClass(className);
            }
        }
    },
     */

    /**
     * set select field value
     * params
     *   data : address
     * return : true/false
    setSelect: function (fid, value) {
        $('#' + fid).selectpicker('val', value);
    },

    setValue: function (fid, value) {
        var field = $('#' + fid);
        if (field.length == 0)
            console.log('no field: ' + fid);
        else
            field.val(value);
    },
     */

    /**
     * 寫入 multiple select value (使用 bootstrap-select)
     * 多選欄位值為陣列, 必須轉成字串
     * param :
     *    fid: 欄位id
     *    separator: 分隔符號
    writeMultiValue: function (fid, separator) {
        var value = $('#' + fid + '_tmp').val();
        if (value)
            value = value.join(separator);
        $('#' + fid).val(value);
    },

    //把json塞進label的text(相同欄位名稱)
    setLabel: function (fid, value) {
            $('#'+fid).text(value); 
    },
     */

    /* 
    ??
     移除欄位的 error class
     para:
       fid: 欄位id
       box: (optional) box(jquery object), for 多筆畫面
     return: void
    clearFieldError: function (fid, box) {
        var labelFid = '#' + fid + _fun.errTail;
        var error = (box === undefined) ? $(labelFid) : box.find(labelFid);
        var field = error.prev();
        var id = field.attr('id');
        //
        field.removeClass(_fun.errCls)
    },
    */

    /* 
     移除所有 error class
     return: void
    clearFieldsError: function () {
        //尋找所有 err_ 開頭的 dom
        $('.' + _fun.errCls).removeClass(_fun.errCls);
        //$('.' + _fun.errBoxCls).removeClass(_fun.errBoxCls);
    },
    */

}; //class