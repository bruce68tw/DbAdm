import _IBase from "./_IBase";
import _Input from "./_Input";
import _Obj from "./_Obj";
//for checkbox(use html checkbox)
// export default class _ICheck extends _IBase { ... } is more correct OOP,
// but since the original uses $.extend({}, _ibase, {...}), we will keep
// it as a static class extending/merging the functionality of _IBase
class _ICheck extends _IBase {
    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    static getO(obj) {
        //return obj.val();
        // @ts-ignore: data('value') is expected to return a string or equivalent
        return obj.is(':checked') ? obj.data('value') : '0';
    }
    /**
     * (override)set checked or not
     */
    static setO(obj, value) {
        //obj.val(value);
        const status = !(value == null || value == '0' || value == 'False' || value == false);
        obj.prop('checked', status);
    }
    /**
     * (override) set status by object(s)
     */
    static setEditO(obj, status) {
        obj.prop('disabled', !status);
    }
    /**
     * get checked status by fid
     */
    static checked(fid, form) {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj.get(fid, form));
    }
    /**
     * get checked status by filter
     */
    static checkedF(filter, form) {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj.getF(filter, form));
    }
    /**
     * get checked status by object
     */
    static checkedO(obj) {
        if (obj == null)
            return false;
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    }
    /**
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */
    static getCheckeds(form, fid) {
        fid = fid || _ICheck.Check0Id;
        const ary = [];
        _Obj.getF(_Input.fidFilter(fid) + ':checked', form).each(function (i) {
            // @ts-ignore: data('value') is expected to return a string or equivalent
            ary[i] = $(this).data('value');
        });
        return ary;
    }
    /**
     * set checked status for multiple rows
     * form {object} container
     * status {boolean} check or uncheck
     * fid {string} (optional '_check0') data-fid value
     * return void
     */
    static checkAll(form, status, fid) {
        fid = fid || _ICheck.Check0Id;
        const filter = _Input.fidFilter(fid);
        // @ts-ignore: 'this' will be _ICheck at runtime
        this.setO(form.find(filter), status);
    }
}
/**
 * default data-fid attribute value for multiple selection
 */
_ICheck.Check0Id = '_check0';
export default _ICheck;
; //class
//# sourceMappingURL=../../../map/_tsBase/services/_ICheck.js.map