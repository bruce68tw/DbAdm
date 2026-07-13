import _iBase from './_iBase';
import _Obj from './_Obj';
class _iCheck extends _iBase {
    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    static getO(obj) {
        return obj.is(':checked') ? obj.data('value') : '0';
    }
    /**
     * (override)set checked or not
     */
    static setO(obj, value) {
        const status = !(value == null || value === '0' || value === 'False' || value === false);
        obj.prop('checked', status);
    }
    /**
     * (override) set status by object(s)
     */
    static setEditO(obj, status) {
        obj.prop('disabled', !status);
    }
    /**
     * checked -> isChecked
     * get checked status by fid
     * return {bool}
     */
    static isChecked(fid, form) {
        return _iCheck.isCheckedO(_Obj.get(fid, form));
    }
    /**
     * checkedO -> isCheckedO
     * get checked status by object
     * return {bool}
     */
    static isCheckedO(obj) {
        return obj.is(':checked');
    }
    /**
     * getCheckeds -> getCheck0Values
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array} checked value list
     */
    static getCheck0Values(form) {
        const ary = [];
        const item = _Obj.getByFt(_iCheck.fltCheckeds, form);
        if (_Obj.notEmpty(item)) {
            item.each(function (i) {
                ary[i] = $(this).data('value');
            });
        }
        return ary;
    }
    /**
     * (不是處理_check0)讀取多個一群checkbox的值(有勾選的欄位only)
     * form {object} container
     * preFid {string} fid前面字元
     * return {string array} checked value list
     */
    static getCheckedValues(form, preFid) {
        const ary = [];
        const item = _Obj.getByFt(`[data-fid^='${preFid}']:checked`, form);
        if (_Obj.notEmpty(item)) {
            item.each(function (i) {
                ary[i] = $(this).data('value');
            });
        }
        return ary;
    }
    /**
     * no used??
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */
    static checkAll(form, status) {
        _iCheck.setO(form.find(_iCheck.fltCheckeds), status);
    }
}
/**
 * Check0Id -> FidCheck0
 * default data-fid attribute value for multiple selection
 */
_iCheck.fidCheck0 = '_check0';
/**
 * filter for get checked list objects, 初始代階段不可使用 _Input
 */
_iCheck.fltCheckeds = "[data-fid='_check0']:checked";
export default _iCheck;
Object.assign(_iCheck, _iBase);
