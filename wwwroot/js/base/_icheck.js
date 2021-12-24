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
     * get checked status by fid
     */
    checked: function (fid, form) {
        return _icheck.checkedO(_obj.get(fid, form));
    },

    /**
     * get checked status by filter
     */
    checkedF: function (filter, form) {
        return _icheck.checkedO(_obj.getF(filter, form));
    },

    /**
     * get checked status by object
     */
    checkedO: function (obj) {
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    },

    /**
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */ 
    getCheckeds: function (form, fid) {
        fid = fid || _icheck.Check0Id;
        var ary = [];
        _obj.getF(_fun.fidFilter(fid) + ':checked', form).each(function (i) {
            ary[i] = $(this).data('value');
        });
        return ary;
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