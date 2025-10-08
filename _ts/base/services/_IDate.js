"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var _IBase_1 = require("./_IBase");
var _Date_1 = require("./_Date");
var _Fun_1 = require("./_Fun");
var _Obj_1 = require("./_Obj");
var _Str_1 = require("./_Str");
/**
 * //使用 box 來操作 datepicker !!
 * //for date input (bootstrap-datepicker)
 * //_idt drive from _idate
 */
var _IDate = /** @class */ (function (_super) {
    __extends(_IDate, _super);
    function _IDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //=== get/set start ===
    /**
     * get ymd with format _fun.MmDateFmt
     * param obj {object} date input object
     * return mm date
     */
    _IDate.getO = function (obj) {
        return _Date_1.default.uiToMmDate(obj.val());
    };
    /**
     * set input value
     * param obj {object} date input object
     * param value {string} format: _fun.MmDateFmt
     */
    _IDate.setO = function (obj, value) {
        //_idate._boxSetDate(_idate._objToBox(obj), _date.dtsToFormat(value));
        _IDate._boxSetDate(_IDate._objToBox(obj), value);
    };
    /**
     * set edit status
     * param obj {object} date input object
     */
    _IDate.setEditO = function (obj, status) {
        obj.prop('disabled', !status);
    };
    /**
     * initial, called by _me.crudE.js
     * param box {object}
     * param fid {string} optional
     */
    _IDate.init = function (box, fid) {
        var obj = _Str_1.default.isEmpty(fid)
            ? box.find(_IDate.BoxFilter)
            : _Obj_1.default.get(fid, box).closest(_IDate.BoxFilter);
        if (obj.length == 0)
            return;
        //initial
        // Assuming datepicker is a jQuery plugin attached to the JQuery object
        obj.datepicker({
            //format in bootstrap-datepicker.js
            language: _Fun_1.default.locale,
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
    };
    //show/hide datepicker
    _IDate.onToggle = function () {
        var btn = _Fun_1.default.getMe();
        //$(btn).parent().parent().find('input').trigger('focus');
        _IDate._elmToBox(btn).datepicker('show');
    };
    //reset value
    _IDate.onReset = function () {
        //check input status first
        var btn = _Fun_1.default.getMe();
        var box = _IDate._elmToBox(btn);
        var input = _IDate._boxGetInput(box);
        if (_IDate.getEditO(input)) {
            _IDate._boxSetDate(box, '');
            //input.trigger('change');
        }
    };
    //get edit status, return bool
    _IDate.getEditO = function (obj) {
        return !obj.is(':disabled');
    };
    //=== private function below ===
    /**
     * input element to date box
     * return {object}
     */
    _IDate._elmToBox = function (elm) {
        return _IDate._objToBox($(elm));
    };
    _IDate._objToBox = function (obj) {
        return obj.closest(_IDate.BoxFilter);
    };
    _IDate._boxSetDate = function (box, date) {
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
    };
    _IDate._boxGetInput = function (box) {
        return box.find('input');
    };
    //find box, 同時用來執行日期欄位初始化
    _IDate.BoxFilter = '.date';
    return _IDate;
}(_IBase_1.default)); //class
exports.default = _IDate;
