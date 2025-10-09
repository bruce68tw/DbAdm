import _IBase from "./_IBase";
import _Input from "./_Input";
import _Obj from "./_Obj";

//for checkbox(use html checkbox)
// export default class _ICheck extends _IBase { ... } is more correct OOP,
// but since the original uses $.extend({}, _ibase, {...}), we will keep
// it as a static class extending/merging the functionality of _IBase
export default class _ICheck extends _IBase {

    /**
     * default data-fid attribute value for multiple selection
     */
    static Check0Id: string = '_check0';

    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    static getO(obj: JQuery): StrN {
        //return obj.val();
        // @ts-ignore: data('value') is expected to return a string or equivalent
        return obj.is(':checked') ? obj.data('value') : '0';
    }

    /**
     * (override)set checked or not
     */
    static setO(obj: JQuery, value: any): void {
        //obj.val(value);
        const status: boolean = !(value == null || value == '0' || value == 'False' || value == false);
        obj.prop('checked', status);
    }

    /**
     * (override) set status by object(s)
     */
    static setEditO(obj: JQuery, status: boolean): void {
        obj.prop('disabled', !status);
    }

    /**
     * get checked status by fid
     */
    static checked(fid: string, form?: JQuery): boolean {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj.get(fid, form));
    }

    /**
     * get checked status by filter
     */
    static checkedF(filter: string, form?: JQuery): boolean {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj.getF(filter, form));
    }

    /**
     * get checked status by object
     */
    static checkedO(obj: JQueryN): boolean {
        if (obj == null) return false;
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
    static getCheckeds(form: JQuery, fid?: string): string[] {
        fid = fid || _ICheck.Check0Id;
        const ary: string[] = [];
        _Obj.getF(_Input.fidFilter(fid) + ':checked', form)!.each(function (i) {
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
    static checkAll(form: JQuery, status: boolean, fid?: string): void {
        fid = fid || _ICheck.Check0Id;
        const filter = _Input.fidFilter(fid);
        // @ts-ignore: 'this' will be _ICheck at runtime
        this.setO(form.find(filter), status);
    }

    /**
     * set checked status for multiple rows
     * form {object} container
     * rows {json array}
     * fid {string} (optional '_check0') field name in rows
     * return void
    static setCheckedByJsons(form: JQuery, rows: any[] | null | undefined, fid?: string): void {
        if (_Str.isEmpty(rows))
            return;

        fid = fid || _ICheck.Check0Id;
        for (let i = 0; i < rows!.length; i++) {
            const obj = form.find('[data-value=' + rows![i][fid] + ']');
            // @ts-ignore: 'this' will be _ICheck at runtime
            this.setO(obj, 1);
        }
    },
     */

}; //class