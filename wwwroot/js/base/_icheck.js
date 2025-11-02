//for checkbox(use html checkbox)
var _icheck = $.extend({}, _ibase, {

    /**
     * default data-fid attribute value for multiple selection
     */
    Check0Id: '_check0',

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
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array} checked value list
     */ 
    //getCheckeds: function (form, fid) {
    getCheckeds: function (form) {
        //fid = fid || _icheck.Check0Id;
        var ary = [];
        _obj.getByFt(_input.fidFilter(_icheck.Check0Id) + ':checked', form).each(function (i) {
            ary[i] = $(this).data('value');
        });
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
        //fid = fid || _icheck.Check0Id;
        var filter = _input.fidFilter(_icheck.Check0Id);
        _icheck.setO(form.find(filter), status);
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

        fid = fid || _icheck.Check0Id;
        for (var i = 0; i < rows.length; i++) {
            var obj = form.find('[data-value=' + rows[i][fid] + ']');
            _icheck.setO(obj, 1);
        }
    },
     */

}); //class