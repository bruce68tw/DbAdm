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
var _IDate_1 = require("./_IDate");
var _ISelect_1 = require("./_ISelect");
var _Str_1 = require("./_Str");
/**
 * //for datetime input (bootstrap-datepicker)
 */
var _IDt = /** @class */ (function (_super) {
    __extends(_IDt, _super);
    function _IDt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //constant
    //BoxFilter: '.date',
    //=== get/set start ===
    _IDt.getO = function (obj) {
        //var date = _date.uiToMmDate(_idate.getO(_idt._boxGetDate(obj)));
        var date = _IDate_1.default.getO(_IDt._boxGetDate(obj));
        return _Str_1.default.isEmpty(date)
            ? ''
            : date + ' ' +
                _ISelect_1.default.getO(_IDt._boxGetHour(obj)) + ':' +
                _ISelect_1.default.getO(_IDt._boxGetMin(obj));
    };
    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _fun.MmDtFmt
     */
    _IDt.setO = function (obj, value) {
        var date, hour, min;
        if (_Str_1.default.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        }
        else {
            date = value; //_idate will set
            hour = parseInt(_Str_1.default.getMid(value, ' ', ':'), 10);
            min = parseInt(_Str_1.default.getMid(value, ':', ':'), 10);
        }
        _IDate_1.default.setO(_IDt._boxGetDate(obj), date);
        _ISelect_1.default.setO(_IDt._boxGetHour(obj), hour.toString()); // Assuming _iselect.setO takes a string value
        _ISelect_1.default.setO(_IDt._boxGetMin(obj), min.toString()); // Assuming _iselect.setO takes a string value
    };
    _IDt.setEditO = function (obj, status) {
        _IDate_1.default.setEditO(_IDt._boxGetDate(obj), status);
        _ISelect_1.default.setEditO(_IDt._boxGetHour(obj), status);
        _ISelect_1.default.setEditO(_IDt._boxGetMin(obj), status);
    };
    //=== private function below ===
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    _IDt._boxGetDate = function (box) {
        return box.find('input:first');
    };
    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    _IDt._boxGetHour = function (box) {
        return box.find('select:first');
    };
    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    _IDt._boxGetMin = function (box) {
        return box.find('select:last');
    };
    return _IDt;
}(_IDate_1.default)); //class
exports.default = _IDt;
