import _Date from "./_Date";
import _ICheck from "./_ICheck";
import _IDate from "./_IDate";
import _IDt from "./_IDt";
import _IFile from "./_IFile";
import _IHtml from "./_IHtml";
import _ILink from "./_ILink";
import _IRadio from "./_IRadio";
import _IRead from "./_IRead";
import _ISelect from "./_ISelect";
import _IText from "./_IText";
import _ITextarea from "./_ITextarea";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Var from "./_Var";
import InputTypeEstr from "../enums/InputTypeEstr";

/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toRow()
 * 3.validation error span position rules:
 * (a)same parent, could be different child level
 * (b)sibling(ex: Date)
 */
export default class _Input {

    //get input value
    static get(fid: string, box: JQuery): StrN {
        return _Input.getO(_Obj.get(fid, box)!, box);
    }

    /**
     * get input value by object
     * param obj {object}
     * param type {string} (optional) data-type
     * return input value
     */
    static getO(obj: JQuery, box: JQuery, type: StrN = null): StrN {
        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                return _IText.getO(obj);
            case InputTypeEstr.Textarea:
                return _ITextarea.getO(obj);
            case InputTypeEstr.Check:
                return _ICheck.getO(obj);
            case InputTypeEstr.Radio:
                return _IRadio.getO(obj, box);
            case InputTypeEstr.Select:
                return _ISelect.getO(obj);
            case InputTypeEstr.Date:
                return _IDate.getO(obj);
            case InputTypeEstr.DateTime:
                return _IDt.getO(obj);
            case InputTypeEstr.File:
                return _IFile.getO(obj);
            case InputTypeEstr.Html:
                return _IHtml.getO(obj);
            case InputTypeEstr.Read:
                return _IRead.getO(obj);
            case InputTypeEstr.Link:
                return _ILink.getO(obj);
            default:
                //text, textarea
                return obj.val() as string;
        }
    }

    static set(fid: string, value: any, box: JQuery): void {
        _Input.setO(_Obj.get(fid, box)!, value, box);
    }

    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param box {object} for radio
     * param type {string} optional, data-type
     */
    static setO(obj: JQuery, value: any, box: JQuery, type?: string): void {
        if (obj == null || !_Var.isPureData(value))
            return;

        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                _IText.setO(obj, value);
                break;
            case InputTypeEstr.Check:
                _ICheck.setO(obj, value);
                break;
            case InputTypeEstr.Radio:
                //此時 obj 為 array
                value = value || '0';
                _IRadio.setO(obj, value, box);
                break;
            case InputTypeEstr.Select:
                _ISelect.setO(obj, value);
                break;
            case InputTypeEstr.Date:
                return _IDate.setO(obj, value);
            case InputTypeEstr.DateTime:
                return _IDt.setO(obj, value);
            case InputTypeEstr.File:
                _IFile.setO(obj, value);
                break;
            case InputTypeEstr.Textarea:
                _ITextarea.setO(obj, value);
                break;
            case InputTypeEstr.Html:
                _IHtml.setO(obj, value);
                break;
            case InputTypeEstr.Read:
                const format = obj.data('format') as string;
                if (_Str.notEmpty(format) && _Str.notEmpty((_BR as any)[format]))
                    value = _Date.dtsToFormat(value, (_BR as any)[format]);
                _IRead.setO(obj, value);
                break;
            case InputTypeEstr.Link:
                return _ILink.setO(obj, value);
            default:
                //text
                obj.val(value);
                break;
        }
    }

    /**
     * get input field type
     */
    static getType(obj: JQuery): string {
        return obj.data('type') as string;
    }

    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    static getObj(fid: string, box: JQuery, ftype?: string): JQuery {
        ftype = ftype || _Input.getType(_Obj.get(fid, box)!);
        return (ftype === InputTypeEstr.Radio) ? _IRadio.getObj(fid, box) : _Obj.get(fid, box)!;
    }

    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    static getFid(obj: JQuery): string {
        return obj.data('fid') as string;
    }

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    static fidFilter(fid: StrN = null): string {
        return _Str.isEmpty(fid)
            ? '[data-fid]'
            : `[data-fid='${fid}']`;
    }


    //#region remark code
    /**
     * ??顯示欄位的錯誤訊息, fid欄位會直接加上 error className
     * 先找 error label, 再找上面相鄰的 object, 然後加入 x-error
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
        _obj.show(label);
        //_form.scrollTopError();
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
     * data : address
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
     * fid: 欄位id
     * separator: 分隔符號
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

    /* ??
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

    /* 移除所有 error class
     return: void
    clearFieldsError: function () {
        //尋找所有 err_ 開頭的 dom
        $('.' + _fun.errCls).removeClass(_fun.errCls);
        //$('.' + _fun.errBoxCls).removeClass(_fun.errBoxCls);
    },
    */
    //#endregion

} //class