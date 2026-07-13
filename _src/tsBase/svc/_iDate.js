//import 'bootstrap-datepicker';
import _iBase from './_iBase';
import _Obj from './_Obj';
import _Fun from './_Fun';
import _Str from './_Str';
import _Date from './_Date';
class _iDate extends _iBase {
    /**
     * get ymd with format _Fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    static getO(obj) {
        return _Date.uiToMmDate(obj.val());
    }
    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _Fun.MmDateFmt
     */
    static setO(obj, value) {
        _iDate._boxSetDate(_iDate._objToBox(obj), value);
    }
    /**
     * set edit status
     * param obj {object} date input object
     */
    static setEditO(obj, status) {
        obj.prop('disabled', !status);
    }
    /**
     * initial, called by _me.crudE.js
     * 注意:
     * 欄位必須放在 form裡面, 因為使用 validator !!
     * param box {object}
     * param fid {string} optional
     */
    static init(box, fid) {
        const obj = _Str.isEmpty(fid)
            ? box.find(_iDate.BoxFilter)
            : _Obj.get(fid, box).closest(_iDate.BoxFilter);
        if (obj.length === 0)
            return;
        //initial
        obj.datepicker({
            language: _Fun.locale,
            autoclose: true,
            showOnFocus: false,
            todayHighlight: true,
        }).on('changeDate', function (e) {
            _iDate._boxGetInput($(this)).valid();
        });
        //stop event, or it will popup when reset(jquery 3.21) !!
        obj.find('.input-group-addon').off('click');
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
    static getEditO(obj) {
        return !obj.is(':disabled');
    }
    /**
     * input element to date box
     * return {object}
     */
    static _elmToBox(elm) {
        return _iDate._objToBox($(elm));
    }
    static _objToBox(obj) {
        return obj.closest(_iDate.BoxFilter);
    }
    static _boxSetDate(box, date) {
        date = _Date.dsToUiDate(date);
        box.datepicker('update', date);
        box.trigger({
            type: 'changeDate',
            date: date
        });
    }
    static _boxGetInput(box) {
        return box.find('input');
    }
}
_iDate.BoxFilter = '.date';
export default _iDate;
