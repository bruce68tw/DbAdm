//for datetime input (bootstrap-datepicker)
var _idt = $.extend({}, _idate, {

    //constant
    //BoxFilter: '.date',

    //=== get/set start ===
    getO: function (obj) {        
        //var date = _date.uiToMmDate(_idate.getO(_idt._boxGetDate(obj)));
        var date = _idate.getO(_idt._boxGetDate(obj));
        return _str.isEmpty(date)
            ? ''
            : date + ' ' +
                _iselect.getO(_idt._boxGetHour(obj)) + ':' +
                _iselect.getO(_idt._boxGetMin(obj));
    },

    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _fun.MmDtFmt
     */
    setO: function (obj, value) {
        var date, hour, min;
        if (_str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        } else {
            date = value;   //_idate will set
            hour = parseInt(_str.getMid(value, ' ', ':'));
            min = parseInt(_str.getMid(value, ':', ':'));
        }
        _idate.setO(_idt._boxGetDate(obj), date);
        _iselect.setO(_idt._boxGetHour(obj), hour);
        _iselect.setO(_idt._boxGetMin(obj), min);
    },

    setEditO: function (obj, status) {
        _idate.setEditO(_idt._boxGetDate(obj), status);
        _iselect.setEditO(_idt._boxGetHour(obj), status);
        _iselect.setEditO(_idt._boxGetMin(obj), status);
    },

    //=== private function below ===
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    _boxGetDate: function (box) {
        return box.find('input:first');
    },

    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    _boxGetHour: function (box) {
        return box.find('select:first');
    },

    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    _boxGetMin: function (box) {
        return box.find('select:last');
    },

}); //class