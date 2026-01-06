//使用 box 來操作 datepicker !!
//for date input (bootstrap-datepicker)
//_idt drive from _idate
var _idate = $.extend({}, _ibase, {

    //find box, 同時用來執行日期欄位初始化
    BoxFilter: '.date',

    //=== get/set start ===
    /**
     * get ymd with format _fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    getO: function (obj) {
        return _date.uiToMmDate(obj.val());
    },

    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _fun.MmDateFmt
     */
    setO: function (obj, value) {
        //_idate._boxSetDate(_idate._objToBox(obj), _date.dtsToFormat(value));
        _idate._boxSetDate(_idate._objToBox(obj), value);
    },

    /**
     * set edit status
     * param obj {object} date input object
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },

    /**
     * initial, called by _me.crudE.js
     * 注意:
     *   欄位必須放在 form裡面, 因為使用 validator !!
     * param box {object}
     * param fid {string} optional
     */ 
    init: function (box, fid) {
        var obj = _str.isEmpty(fid)
            ? box.find(_idate.BoxFilter)
            : _obj.get(fid, box).closet(_idate.BoxFilter);
        if (obj.length == 0)
            return;

        //initial
        obj.datepicker({
            //format in bootstrap-datepicker.js
            language: _fun.locale,
            autoclose: true,
            showOnFocus: false,
            todayHighlight: true,   // 高亮顯示今天的日期
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
            //datepicker(使用box)和 validation(使用input)是2個不同的機制
            //$(this).focus();
            //$(this).valid();
            //var aa = 'aa';
            _idate._boxGetInput($(this)).valid();
            //$(_idate).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = _str.notEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
                fnOnChange(fid, me.val());
            }
            */
        });

        //stop event, or it will popup when reset(jquery 3.21) !!
        obj.find('.input-group-addon').off('click');
    },

    //show/hide datepicker
    onToggle: function () {
        var btn = _fun.getMe();
        //$(btn).parent().parent().find('input').trigger('focus');
        _idate._elmToBox(btn).datepicker('show');
    },

    //reset value
    onReset: function () {
        //check input status first
        var btn = _fun.getMe();
        var box = _idate._elmToBox(btn);
        var input = _idate._boxGetInput(box);
        if (_idate.getEditO(input)) {
            _idate._boxSetDate(box, '');
            //input.trigger('change');
        }
    },    

    //get edit status, return bool
    getEditO: function (obj) {
        return !obj.is(':disabled');
    },

    //=== private function below ===
    /**
     * input element to date box
     * return {object}
     */
    _elmToBox: function (elm) {
        return _idate._objToBox($(elm));
    },
    _objToBox: function (obj) {
        return obj.closest(_idate.BoxFilter);
    },

    _boxSetDate: function (box, date) {
        box.datepicker('update', date);
        //var input = _idate._boxGetInput(box);
        //input.datepicker('update', date);
        // 手動觸發 changeDate 事件
        box.trigger({
            type: 'changeDate',
            date: date // 獲取更新後的日期物件
        });
        //box.datepicker('update', '2024-12-30');
        //box.val().datepicker('update', date('2024-12-25'));
    },

    _boxGetInput: function (box) {
        return box.find('input');
    },

}); //class