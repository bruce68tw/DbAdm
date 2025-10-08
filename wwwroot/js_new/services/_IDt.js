import _IDate from "./_IDate";
import _ISelect from "./_ISelect";
import _Str from "./_Str";
/**
 * //for datetime input (bootstrap-datepicker)
 */
export default class _IDt extends _IDate {
    //constant
    //BoxFilter: '.date',
    //=== get/set start ===
    static getO(obj) {
        //var date = _date.uiToMmDate(_idate.getO(_idt._boxGetDate(obj)));
        const date = _IDate.getO(_IDt._boxGetDate(obj));
        return _Str.isEmpty(date)
            ? ''
            : date + ' ' +
                _ISelect.getO(_IDt._boxGetHour(obj)) + ':' +
                _ISelect.getO(_IDt._boxGetMin(obj));
    }
    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _fun.MmDtFmt
     */
    static setO(obj, value) {
        let date, hour, min;
        if (_Str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        }
        else {
            date = value; //_idate will set
            hour = parseInt(_Str.getMid(value, ' ', ':'), 10);
            min = parseInt(_Str.getMid(value, ':', ':'), 10);
        }
        _IDate.setO(_IDt._boxGetDate(obj), date);
        _ISelect.setO(_IDt._boxGetHour(obj), hour.toString()); // Assuming _iselect.setO takes a string value
        _ISelect.setO(_IDt._boxGetMin(obj), min.toString()); // Assuming _iselect.setO takes a string value
    }
    static setEditO(obj, status) {
        _IDate.setEditO(_IDt._boxGetDate(obj), status);
        _ISelect.setEditO(_IDt._boxGetHour(obj), status);
        _ISelect.setEditO(_IDt._boxGetMin(obj), status);
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
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_IDt.js.map