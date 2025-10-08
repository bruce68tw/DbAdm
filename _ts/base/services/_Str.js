"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Var_1 = require("./_Var");
var _Str = /** @class */ (function () {
    function _Str() {
    }
    //variables is empty or not
    _Str.isEmpty = function (str) {
        return (str === undefined || str === null || str === '');
    };
    _Str.notEmpty = function (str) {
        return !_Str.isEmpty(str);
    };
    //convert empty string to new string
    _Str.emptyToStr = function (str, newStr) {
        return _Str.isEmpty(str) ? newStr : str;
    };
    /**
     * format string like c# String.Format()
     * The first argument is the format string, subsequent arguments are values to insert.
     */
    _Str.format = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var str = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, args[i + 1]);
        }
        return str;
    };
    //get mid part string
    _Str.getMid = function (str, find1, find2) {
        if (_Str.isEmpty(str))
            return '';
        var pos = str.indexOf(find1);
        if (pos < 0)
            return str;
        var pos2 = str.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? str.substring(pos + find1.length)
            : str.substring(pos + find1.length, pos2);
    };
    //get tail part string
    _Str.getTail = function (value, find) {
        var pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    };
    _Str.toBool = function (val) {
        //return (val === '1' || val === true || val === 'True');
        // Assuming _var.toBool is on a class named _Var
        return _Var_1.default.toBool(val);
    };
    /**
     * 合併多個欄位成為字串??
     * The first argument is the initial string, subsequent arguments are appended with colSep.
     */
    _Str.colsToStr = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var str = args[0];
        for (var i = 1; i < args.length; i++)
            str += _Str.colSep + args[i];
        return str;
    };
    _Str.trim = function (str) {
        return str.trim();
    };
    _Str.toJson = function (str) {
        try {
            return JSON.parse(str);
        }
        catch (error) {
            //console.log("JSON.parse failed");
            return null;
        }
    };
    _Str.replaceAll = function (str, oldStr, newStr) {
        // 轉義特殊字元，避免錯誤正則
        var oldStr2 = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp(oldStr2, 'g');
        return str.replace(regex, newStr);
    };
    //column seperator
    _Str.colSep = '@@';
    return _Str;
}()); //class
exports.default = _Str;
