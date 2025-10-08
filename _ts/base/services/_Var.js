"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Str_1 = require("./_Str");
var _Var = /** @class */ (function () {
    function _Var() {
    }
    _Var.emptyToValue = function (var1, value) {
        return _Str_1.default.isEmpty(var1) ? value : var1;
    };
    //variables is empty or not
    _Var.isEmpty = function (var1) {
        return (var1 === undefined || var1 === null);
    };
    _Var.notEmpty = function (var1) {
        return !_Var.isEmpty(var1);
    };
    //check not object、array
    _Var.isPureData = function (value) {
        return (typeof value !== 'object' && !Array.isArray(value));
    };
    //使用 == 模型比對即可 !!
    _Var.toBool = function (val) {
        return (val == '1' || val == true || val == 'True');
    };
    return _Var;
}());
exports.default = _Var;
