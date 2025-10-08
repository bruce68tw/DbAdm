import _Obj from "./_Obj";
import _Str from "./_Str";
//use jquery validation
export default class _Valid {
    //error & valid class same to jquer validate
    //errorClass: 'error',
    //validClass: 'valid',
    /**
     * initial jQuery Validation
     * param form {JQuery<HTMLElement>} form object
     * return {JQuery.Validator} validator object
     */
    static init(form) {
        //remove data first
        form.removeData('validator');
        //config
        const config = {
            /*
            */
            //errorClass: 'label label-danger',
            //onclick: false, //checkbox, radio, and select
            //ignore: ':hidden:not(.xd-valid[data-type=file]),:hidden:not([data-type=html]),.note-editable.card-block',   //or summernote got error
            //ignore: ':hidden:not(.xd-valid)',     //html/file has .xd-valid need validate !!
            ignore: ':hidden:not(.xd-valid), .note-editable.panel-body',
            errorElement: 'span',
            errorPlacement: function (error, elm) {
                error.insertAfter(_Valid._getBox(elm));
                return false;
            },
            //顯示validation錯誤
            highlight: function (elm, errorClass, validClass) {
                const me = $(elm);
                const box = _Valid._getBox(me);
                box.removeClass(validClass).addClass(errorClass);
                const errObj = _Valid._getError(me);
                if (errObj != null)
                    _Obj.show(errObj);
                return false;
            },
            //清除validation錯誤
            unhighlight: function (elm, errorClass, validClass) {
                const me = $(elm);
                const box = _Valid._getBox(me);
                box.removeClass(errorClass).addClass(validClass);
                const errObj = _Valid._getError(me);
                if (errObj != null)
                    _Obj.hide(errObj);
                return false;
            },
            /*
            //copy from jquery validate defaultShowErrors()
            showErrors: function (errorMap, errorList) {
                //this.defaultShowErrors();
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                //remark below !!
                //this.toHide = this.toHide.not(this.toShow);
                //this.hideErrors();
                //this.addWrapper(this.toShow).show();
                //return false;
            },
            */
        };
        // 假設 jQuery.fn.validate() 存在並返回 JQuery.Validator
        return form.validate(config);
    }
    /**
     * 使用 jquery validation方式顯示錯誤, 通知由後端傳回錯誤, 再前端顯示
     * param fid{string} field id
     * param msg{string} error msg
     * param eform id{string} (optional for 多筆) 若為多筆則必須配合rowId找到fid
     * param rowId{string} (optional for 多筆) row Id valud
     */
    // 注意: 原始JS代碼中，_me.eform0 是一個未定義的外部變數，這裡假設它可以在 TS 環境中被訪問或替換為一個 JQuery<HTMLElement>
    static showError(fid, msg, eformId, rowId) {
        // 假設 _me 是一個可用的類別，並且它有一個 eform0 屬性
        // 由於我們無法訪問 _me，這裡使用一個假設的類型 JQuery<HTMLElement>
        let eform; // JQuery<HTMLElement> | undefined
        // 假設有一個可用的全局變數 _ME.eform0
        const _ME = {}; // 假設的 _ME 類別
        eform = _Str.isEmpty(eformId) ? _ME.eform0 : $('#' + eformId);
        /*
        var input;
        if (_str.isEmpty(rowId)) {
            input = eform.find(_input.fidFilter(fid));
        } else {
            //多筆??
        }
        */
        // 必須確保 eform 是有效的 JQuery 物件且已初始化 validator
        if (eform && eform.validator) {
            eform.validator.showErrors({
                [fid]: msg
            });
        }
    }
    static _getBox(obj) {
        //closest will check this first !!
        return obj.closest('.xi-box');
    }
    /**
     * get error object
     * param obj {object} input object
     */
    static _getError(obj) {
        const error = _Valid._getBox(obj).next();
        return (error.length === 1 && error.hasClass('error') && error.is('span'))
            ? error : null;
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Valid.js.map