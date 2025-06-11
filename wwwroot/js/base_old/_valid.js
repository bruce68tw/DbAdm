﻿
//use jquery validation
var _valid = {

    //error & valid class same to jquer validate
    //errorClass: 'error',
    //validClass: 'valid',

    /**
     * initial jQuery Validation
     * param form {object} form object
     * return {object} validator object
     */
    init: function (form) {
        //remove data first
        form.removeData('validator');

        //config
        var config = {
            /*
            */
            //errorClass: 'label label-danger',
            //onclick: false, //checkbox, radio, and select
            //ignore: ':hidden:not(.xd-valid[data-type=file]),:hidden:not([data-type=html]),.note-editable.card-block',   //or summernote got error
            //ignore: ':hidden:not(.xd-valid)',     //html/file has .xd-valid need validate !!
            ignore: ':hidden:not(.xd-valid), .note-editable.panel-body',
            errorElement: 'span',
            errorPlacement: function (error, elm) {
                error.insertAfter(_valid._getBox($(elm)));
                return false;
            },
            //顯示validation錯誤
            highlight: function (elm, errorClass, validClass) {
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(validClass).addClass(errorClass);
                var errObj = _valid._getError(me);
                if (errObj != null)
                    errObj.show();
                return false;
            },
            //清除validation錯誤
            unhighlight: function (elm, errorClass, validClass) {
                var me = $(elm);
                var box = _valid._getBox(me);
                box.removeClass(errorClass).addClass(validClass);
                var errObj = _valid._getError(me);
                if (errObj != null)
                    errObj.hide();
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

        return form.validate(config);
    },

    /**
     * 使用 jquery validation方式顯示錯誤, 通知由後端傳回錯誤, 再前端顯示
     * param fid{string} field id
     * param msg{string} error msg
     * param eform id{string} (optional for 多筆) 若為多筆則必須配合rowId找到fid
     * param rowId{string} (optional for 多筆) row Id valud
     */
    showError: function (fid, msg, eformId, rowId) {
        var eform = _str.isEmpty(eformId) ? _me.eform0 : $('#' + eformId);
        /*
        var input;
        if (_str.isEmpty(rowId)) {
            input = eform.find(_input.fidFilter(fid));
        } else {
            //多筆??
        }
        */

        eform.validator.showErrors({
            [fid]: msg
        });
    },

    _getBox: function (obj) {
        //closest will check this first !!
        return obj.closest('.xi-box');
    },

    /**
     * get error object
     * param obj {object} input object
     */ 
    _getError: function (obj) {
        var error = _valid._getBox(obj).next();
        return (error.length == 1 && error.hasClass('error') && error.is('span'))
            ? error : null;
    },

    /*
    valid: function () {
        var valid, validator, errorList;

        if ($(this[0]).is("form")) {
            valid = this.validate().form();
        } else {
            errorList = [];
            valid = true;
            validator = $(this[0].form).validate();
            this.each(function () {
                valid = validator.element(this) && valid;
                if (!valid) {
                    errorList = errorList.concat(validator.errorList);
                }
            });
            validator.errorList = errorList;
        }
        return valid;
    },
    */

    //#region remark code
    /**
     * check regular
     * param fids {array} fid string array
     * param msg {string} error message
     * param expr {regular} regular expression
     * return {bool}
    anyRegularsWrong: function (fids, msg, expr) {
        if (fids == null || fids.length == 0)
            return false;

        //var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var find = false;
        for (var i = 0; i < fids.length; i++) {
            var value = $('#' + fids[i]).val();
            if (!expr.test(value)) {
                find = true;
                _input.showError(fids[i], msg);
            }
        }
        return find;
    },
     */

    /**
     * check email 
     * see : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
     * params
     *   data : email address
     * return : true/false
    anyEmailsWrong: function (fids, msg) {
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return _valid.anyRegularsWrong(fids, msg, expr);
    },
     */

    /**
     * check address
     * params
     *   data : address
     * return : true/false
    anyAddressesWrong: function (fids, msg) {
        var expr = /^\d+\w*\s*(?:(?:[\-\/]?\s*)?\d*(?:\s*\d+\/\s*)?\d+)?\s+/;
        return _valid.anyRegularsWrong(fids, msg, expr);
    },
     */
    //#endregion

}; //class