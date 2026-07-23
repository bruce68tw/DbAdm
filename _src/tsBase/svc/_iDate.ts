//日期欄位, 使用 bootstrap-datepicker
//欄位值型態為 string
class _iDate extends _iBase {
    static BoxFilter: string = '.date';

    /**
     * initial, called by _me.crudE.js
     * 注意: 欄位必須放在 form裡面, 因為使用 validator !!
     * param box {object}
     * param fid {string} (optional)
     */
    static init(box: JQuery, fid?: string) {
        const obj = _Str.isEmpty(fid)
            ? box.find(_iDate.BoxFilter)
            : _Obj.get(fid, box).closest(_iDate.BoxFilter);

        if (obj.length === 0) return;

        //initial
        obj.datepicker({
            language: _Fun.locale,
            autoclose: true,
            showOnFocus: false,
            todayHighlight: true,
        }).on('changeDate', function (this: any, e: any) {
            _iDate._boxGetInput($(this)).valid();
        });

        //stop event, or it will popup when reset(jquery 3.21) !!
        obj.find('.input-group-addon').off('click');
    }

    /**
     * get ymd with format _Fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    static getO(obj: JQuery): string {
        return _Date.uiToMmDate(obj.val() as string);
    }

    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _Fun.MmDateFmt
     */
    static setO(obj: JQuery, value: string) {
        _iDate._boxSetDate(_iDate._objToBox(obj), value);
    }

    /**
     * set edit status
     * param obj {object} date input object
     */
    static setEditO(obj: JQuery, status: boolean) {
        obj.prop('disabled', !status);
    }

    //show/hide datepicker
    static onToggle() {
        const btn = _Fun.getMeElm();
        _iDate._elmToBox(btn).datepicker('show');
    }

    //reset value
    static onReset() {
        const btn = _Fun.getMeElm();
        const box = _iDate._elmToBox(btn);
        const input = _iDate._boxGetInput(box);
        if (_iDate.getEditO(input)) {
            _iDate._boxSetDate(box, '');
        }
    }

    //get edit status, return bool
    static getEditO(obj: JQuery): boolean {
        return !obj.is(':disabled');
    }

    /**
     * input element to date box
     * return {object}
     */
    private static _elmToBox(elm: Elm): JQuery {
        return _iDate._objToBox($(elm));
    }

    private static _objToBox(obj: JQuery): JQuery {
        return obj.closest(_iDate.BoxFilter);
    }

    private static _boxSetDate(box: JQuery, date: string) {
        date = _Date.dsToUiDate(date);
        box.datepicker('update', date);
        box.trigger({
            type: 'changeDate',
            date: date
        } as any);
    }

    private static _boxGetInput(box: JQuery): JQuery {
        return box.find('input');
    }
}
window._iDate = _iDate;