import _iBase from './_iDate';
import _iDate from './_iDate';
import _iSelect from './_iSelect';
import _Str from './_Str';
export default class _iDt extends _iBase {
    //constant
    //BoxFilter: '.date',
    //=== get/set start ===
    static getO(obj) {
        //var date = _Date.uiToMmDate(_iDate.getO(_iDt._boxGetDate(obj)));
        const date = _iDate.getO(_iDt._boxGetDate(obj));
        return _Str.isEmpty(date)
            ? ''
            : date + ' ' +
                _iSelect.getO(_iDt._boxGetHour(obj)) + ':' +
                _iSelect.getO(_iDt._boxGetMin(obj));
    }
    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _Fun.MmDtFmt
     */
    static setO(obj, value) {
        let date;
        let hour;
        let min;
        if (_Str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        }
        else {
            date = value; //_iDate will set
            hour = parseInt(_Str.getMid(value, ' ', ':'), 10);
            min = parseInt(_Str.getMid(value, ':', ':'), 10);
        }
        _iDate.setO(_iDt._boxGetDate(obj), date);
        _iSelect.setO(_iDt._boxGetHour(obj), hour);
        _iSelect.setO(_iDt._boxGetMin(obj), min);
    }
    static setEditO(obj, status) {
        _iDate.setEditO(_iDt._boxGetDate(obj), status);
        _iSelect.setEditO(_iDt._boxGetHour(obj), status);
        _iSelect.setEditO(_iDt._boxGetMin(obj), status);
    }
    //=== private function below ===
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    static _boxGetDate(box) {
        return box.find('input:first');
    }
    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    static _boxGetHour(box) {
        return box.find('select:first');
    }
    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    static _boxGetMin(box) {
        return box.find('select:last');
    }
}
