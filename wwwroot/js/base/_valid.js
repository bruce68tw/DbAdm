
//use jquery validation
var _valid = {

    //error & valid calss same to jquer validate
    errorClass: 'error',
    //validClass: 'valid',

    /**
     * initial
     * param form {object}
     * param inputCfg {json} config
     */
    init: function (form) {

        //remove data first
        form.removeData('validator');
        //form.removeData('unobtrusiveValidation');

        //default config
        //this keyword not work inside !!
        var config = {
            /*
            unhighlight: function (elm, errorClass, validClass) {
                var me = $(elm);
                me.data('edit', 1);    //註記此欄位有異動
            }
            */
            ignore: '',     //xiFile has hidden input need validate
            errorElement: 'span',
            //onclick: false, //checkbox, radio, and select
            /*
            highlight: function (elm) {
                _valid._getError(elm).addClass(_valid.errorClass);
                return false;
            },
            unhighlight: function (elm) {
                _valid._getError(elm).removeClass(_valid.errorClass);
                return false;
            },
            */
            //errorClass: 'label label-danger',
            errorPlacement: function (error, elm) {
                error.insertAfter(_valid._getBox(elm));
                return false;
            }
        };

        //加入外部傳入的自定義組態
        //if (inputCfg)
        //    config = _json.copy(inputCfg, config);

        return form.validate(config);
    },

    _getBox: function (elm) {
        return $(elm).closest('.xi-box');
    },

    //get error object
    _getError: function (elm) {
        return _valid._getBox(elm).next();
    },

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

}; //class