//for checkbox(use html checkbox)
var _icheck = $.extend({}, _ibase, {

    /**
     * Check0Id -> FidCheck0
     * default data-fid attribute value for multiple selection
     */
    FidCheck0: '_check0',

    /**
     * filter for get checked list objects, 初始代階段不可使用 _input
     */
    FltCheckeds: "[data-fid='_check0']:checked",

    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    getO: function (obj) {
        //return obj.val();
        return obj.is(':checked') ? obj.data('value') : '0';
    },

    /**
     * (override)set checked or not
     */
    setO: function (obj, value) {
        //obj.val(value);
        var status = !(value == null || value == '0' || value == 'False' || value == false);
        obj.prop('checked', status);
    },

    /**
     * (override) set status by object(s)
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },

    /**
     * checked -> isChecked
     * get checked status by fid
     * return {bool}
     */
    isChecked: function (fid, form) {
        return _icheck.isCheckedO(_obj.get(fid, form));
    },

    /**
     * checkedO -> isCheckedO
     * get checked status by object
     * return {bool}
     */
    isCheckedO: function (obj) {
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    },

    /**
     * get checked status by filter
     * return {bool}
     */
    /*
    checkedF: function (filter, form) {
        return _icheck.isCheckedO(_obj.getByFt(filter, form));
    },
    */

    /**
     * todo: getCheckeds -> getCheck0Values
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array} checked value list
     */
    //getCheckeds: function (form, fid) {
    getCheck0Values: function (form) {
        var ary = [];
        var items = _obj.getByFt(_icheck.FltCheckeds, form);
        if (_array.notEmpty(items)) {
            items.each(function (i) {
                ary[i] = $(this).data('value');
            });
        }
        return ary;
    },

    /**
     * (不是處理_check0)讀取多個一群checkbox的值(有勾選的欄位only)
     * form {object} container
     * preFid {string} fid前面字元
     * return {string array} checked value list
     */
    getCheckedValues: function (form, preFid) {
        var ary = [];
        var items = _obj.getByFt(`[data-fid^='${preFid}']:checked`, form);
        if (_array.notEmpty(items)) {
            items.each(function (i) {
                ary[i] = $(this).data('value');
            });
        }
        return ary;
    },

    /**
     * no used??
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */ 
    //checkAll: function (form, status, fid) {
    checkAll: function (form, status) {
        _icheck.setO(form.find(_icheck.FltCheckeds), status);
    },

    /**
     * set checked status for multiple rows
     * form {object} container
     * rows {json array}
     * fid {string} (optional '_check0') field name in rows
     * return void
    setCheckedByJsons: function (form, rows, fid) {
        if (_str.isEmpty(rows))
            return;

        fid = fid || _icheck.FidCheck0;
        for (var i = 0; i < rows.length; i++) {
            var obj = form.find('[data-value=' + rows[i][fid] + ']');
            _icheck.setO(obj, 1);
        }
    },
     */

}); //class