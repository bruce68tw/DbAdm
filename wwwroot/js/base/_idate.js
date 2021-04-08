//for date input (bootstrap-datepicker)
var _idate = $.extend({}, _ibase, {

    //constant
    BoxFilter: '.date',

    //=== get/set start ===
    getO: function (obj) {
        return _date.uiToJsDate(obj.val());
    },

    /**
     * set input value
     * param obj {object} date object
     * param value {string}
     */
    setO: function (obj, value) {
        //obj.val(_date.jsToUiDate(value));
        this._boxSetDate(this._elmToBox(obj), value);
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },

    /**
     * initial, called by _crud.js
     * param box {object}
     * param fid {string} optional
     */ 
    init: function (box, fid) {
        var obj = _str.isEmpty(fid)
            ? $(this.BoxFilter)
            : _obj.get(fid, box).closet(this.BoxFilter);
        if (obj.length > 0)
            this.initO(obj);
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
            //$(this).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = !_str.isEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
                fnOnChange(fid, me.val());
            }
            */
        });

        //skip event listen, otherwise it will show calendar when reset(jquery 3.21 will listen) !!
        obj.find('.input-group-addon').off('click');
    },

    /*
    //for 多筆區域
    initByBox: function (box, fnOnChange) {
        this.initO(box.find(this.BoxFilter), fnOnChange);
    },
    */

    //show/hide datepicker
    onToggle: function (btn) {
        //$(btn).parent().parent().find('input').trigger('focus');
        this._elmToBox(btn).datepicker('show');
    },

    //reset value
    onReset: function (btn) {
        this._boxSetDate(this._elmToBox(btn), '');
    },    


    //=== private function below ===
    /**
     * element to date box
     * return {object}
     */
    _elmToBox: function (elm) {
        return $(elm).closest(this.BoxFilter);
    },

    _boxSetDate: function (box, date) {
        box.datepicker('update', date);
    },

}); //class