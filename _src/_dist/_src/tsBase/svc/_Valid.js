import _Str from './_Str';
import _Obj from './_Obj';
export default class _Valid {
    /**
     * initial jQuery Validation
     * @param form form object
     * @returns validator object
     */
    static init(form) {
        //remove data first
        form.removeData('validator');
        //config
        const config = {
            ignore: ':hidden:not(.xd-valid), .note-editable.panel-body, .xi-read',
            errorElement: 'span',
            errorPlacement: function (error, elm) {
                error.insertAfter(_Valid._getBox($(elm)));
                return false;
            },
            //顯示validation錯誤
            highlight: function (elm, errorClass, validClass) {
                const me = $(elm);
                const box = _Valid._getBox(me);
                box.removeClass(validClass).addClass(errorClass);
                const errObj = _Valid._getError(me);
                if (errObj != null) {
                    _Obj.show(errObj);
                }
                return false;
            },
            //清除validation錯誤
            unhighlight: function (elm, errorClass, validClass) {
                const me = $(elm);
                const box = _Valid._getBox(me);
                box.removeClass(errorClass).addClass(validClass);
                const errObj = _Valid._getError(me);
                if (errObj != null) {
                    _Obj.hide(errObj);
                }
                return false;
            },
        };
        return form.validate(config);
    }
    /**
     * 使用 jquery validation方式顯示錯誤, 通知由後端傳回錯誤, 再前端顯示
     * @param fid field id
     * @param msg error msg
     * @param eformId (optional for 多筆) 若為多筆則必須配合rowId找到fid
     * @param rowId (optional for 多筆) row Id valud
     */
    static showError(fid, msg, eformId, rowId) {
        const eform = _Str.isEmpty(eformId) ? _me.eform0 : $('#' + eformId);
        eform.validator.showErrors({
            [fid]: msg
        });
    }
    static _getBox(obj) {
        //closest will check this first !!
        return obj.closest('.xi-box');
    }
    /**
     * get error object
     * @param obj input object
     */
    static _getError(obj) {
        const error = _Valid._getBox(obj).next();
        return (error.length == 1 && error.hasClass('error') && error.is('span'))
            ? error : null;
    }
}
