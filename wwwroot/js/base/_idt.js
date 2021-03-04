//for datetime input (bootstrap-datepicker)
var _idt = $.extend({}, _idate, {

    //constant
    //BoxFilter: '.date',

    //=== get/set start ===
    getO: function (obj) {        
        var date = _date.uiToJsDate(_idate.getO(_idt._boxGetDate(obj)));
        return _str.isEmpty(date)
            ? ''
            : date + ' ' +
                _iselect.getO(_idt._boxGetHour(obj)) + ':' +
                _iselect.getO(_idt._boxGetMin(obj));
    },

    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _fun.JsDtFormat
     */
    setO: function (obj, value) {
        var date, hour, min;
        if (_str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        } else {
            date = _date.jsToUiDate(value);
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

    /**
     * initial, called by _crud.js
     * param box {object}
     * param fid {string} optional
    init: function (box, fid) {
        var obj = _str.isEmpty(fid)
            ? $(_idate.BoxFilter)
            : _obj.get(fid, box).closet(_idate.BoxFilter);
        if (obj.length > 0)
            _idate.initO(obj);
    },

    //initial by object(s)
    //initO: function (obj, fnOnChange) {
    initO: function (obj) {

        //initial
        obj.datepicker({
            //format: _BR.UiDateFormat,
            language: _fun.locale,
            autoclose: true,
            showOnFocus: false,
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
        });

        //skip event listen, otherwise it will show calendar when reset(jquery 3.21 will listen) !!
        obj.find('.input-group-addon').off('click');
    },
     */

    /**
     * element to date box
     * return {object}
    elmToBox: function (elm) {
        return $(elm).closest(_idate.BoxFilter);
    },

    //show/hide datepicker
    onToggle: function (btn) {
        //$(btn).parent().parent().find('input').trigger('focus');
        _idate.elmToBox(btn).datepicker('show');
    },

    //reset value
    onReset: function (btn) {
        _idate.elmToBox(btn).datepicker('update', '');
    },
     */


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