// @ts-nocheck
import _IBase from "./_IBase";
import _Date from "./_Date";
import _Fun from "./_Fun";
import _Obj from "./_Obj";
import _Str from "./_Str";
/**
 * //使用 box 來操作 datepicker !!
 * //for date input (bootstrap-datepicker)
 * //_idt drive from _idate
 */
class _IDate extends _IBase {
    //=== get/set start ===
    /**
     * get ymd with format _fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    static getO(obj) {
        return _Date.uiToMmDate(obj.val());
    }
    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _fun.MmDateFmt
     */
    static setO(obj, value) {
        //_idate._boxSetDate(_idate._objToBox(obj), _date.dtsToFormat(value));
        _IDate._boxSetDate(_IDate._objToBox(obj), value);
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
     * param box {object}
     * param fid {string} optional
     */
    static init(box, fid = null) {
        const obj = _Str.isEmpty(fid)
            ? box.find(_IDate.BoxFilter)
            : _Obj.get(fid, box).closest(_IDate.BoxFilter);
        if (obj.length == 0)
            return;
        //initial
        // Assuming datepicker is a jQuery plugin attached to the JQuery object
        obj.datepicker({
            //format in bootstrap-datepicker.js
            language: _Fun.locale,
            autoclose: true,
            showOnFocus: false,
            todayHighlight: true, // 高亮顯示今天的日期
            //startDate: '-3d'
        }).on('changeDate', function (e) {
            //datepicker(使用box)和 validation(使用input)是2個不同的機制
            //$(this).focus();
            //$(this).valid();
            //var aa = 'aa';
            _IDate._boxGetInput($(this)).valid();
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
    }
    //show/hide datepicker
    static onToggle() {
        const btn = _Fun.getMe();
        //$(btn).parent().parent().find('input').trigger('focus');
        _IDate._elmToBox(btn).datepicker('show');
    }
    //reset value
    static onReset() {
        //check input status first
        const btn = _Fun.getMe();
        const box = _IDate._elmToBox(btn);
        const input = _IDate._boxGetInput(box);
        if (_IDate.getEditO(input)) {
            _IDate._boxSetDate(box, '');
            //input.trigger('change');
        }
    }
    //get edit status, return bool
    static getEditO(obj) {
        return !obj.is(':disabled');
    }
    //=== private function below ===
    /**
     * input element to date box
     * return {object}
     */
    static _elmToBox(elm) {
        return _IDate._objToBox($(elm));
    }
    static _objToBox(obj) {
        return obj.closest(_IDate.BoxFilter);
    }
    static _boxSetDate(box, date) {
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
    }
    static _boxGetInput(box) {
        return box.find('input');
    }
} //class
//find box, 同時用來執行日期欄位初始化
_IDate.BoxFilter = '.date';
export default _IDate;
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_IDate.js.map