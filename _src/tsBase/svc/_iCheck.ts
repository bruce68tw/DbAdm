class _iCheck extends _iBase {
    /**
     * Check0Id -> FidCheck0
     * default data-fid attribute value for multiple selection
     */
    static fidCheck0: string = '_check0';

    /**
     * filter for get checked list objects, 初始代階段不可使用 _Input
     */
    static fltCheckeds: string = "[data-fid='_check0']:checked";

    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    static getO(obj: JQuery): string {
        return obj.is(':checked') ? (obj.data('value') as string) : '0';
    }

    /**
     * (override)set checked or not
     */
    static setO(obj: JQuery, value: any): void {
        const status = !(value == null || value === '0' || value === 'False' || value === false);
        obj.prop('checked', status);
    }

    /**
     * (override) set status by object(s)
     */
    static setEditO(obj: JQuery, status: boolean): void {
        obj.prop('disabled', !status);
    }

    /**
     * checked -> isChecked
     * get checked status by fid
     * return {bool}
     */
    static isChecked(fid: string, form?: JQuery): boolean {
        return _iCheck.isCheckedO(_Obj.get(fid, form));
    }

    /**
     * checkedO -> isCheckedO
     * get checked status by object
     * return {bool}
     */
    static isCheckedO(obj: JQuery): boolean {
        return obj.is(':checked');
    }

    /**
     * getCheckeds -> getCheck0Values
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array} checked value list
     */
    static getCheck0Values(form: JQuery): string[] {
        const ary: string[] = [];
        const item = _Obj.getByFt(_iCheck.fltCheckeds, form);
        if (_Obj.notEmpty(item)) {
            item.each(function (this: Elm, i: number) {
                ary[i] = $(this).data('value') as string;
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
    static getCheckedValues(form: JQuery, preFid: string): string[] {
        const ary: string[] = [];
        const item = _Obj.getByFt(`[data-fid^='${preFid}']:checked`, form);
        if (_Obj.notEmpty(item)) {
            item.each(function (this: Elm, i: number) {
                ary[i] = $(this).data('value') as string;
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
    static checkAll(form: JQuery, status: any): void {
        _iCheck.setO(form.find(_iCheck.fltCheckeds), status);
    }
}
window._iCheck = _iCheck;

//??
//Object.assign(_iCheck, _iBase);
