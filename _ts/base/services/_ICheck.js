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
var _IBase_1 = require("./_IBase");
var _Input_1 = require("./_Input");
var _Obj_1 = require("./_Obj");
//for checkbox(use html checkbox)
// export default class _ICheck extends _IBase { ... } is more correct OOP,
// but since the original uses $.extend({}, _ibase, {...}), we will keep
// it as a static class extending/merging the functionality of _IBase
var _ICheck = /** @class */ (function (_super) {
    __extends(_ICheck, _super);
    function _ICheck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * (override)get data-value, not checked status !!, return '0' if unchecked.
     */
    _ICheck.getO = function (obj) {
        //return obj.val();
        // @ts-ignore: data('value') is expected to return a string or equivalent
        return obj.is(':checked') ? obj.data('value') : '0';
    };
    /**
     * (override)set checked or not
     */
    _ICheck.setO = function (obj, value) {
        //obj.val(value);
        var status = !(value == null || value == '0' || value == 'False' || value == false);
        obj.prop('checked', status);
    };
    /**
     * (override) set status by object(s)
     */
    _ICheck.setEditO = function (obj, status) {
        obj.prop('disabled', !status);
    };
    /**
     * get checked status by fid
     */
    _ICheck.checked = function (fid, form) {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj_1.default.get(fid, form));
    };
    /**
     * get checked status by filter
     */
    _ICheck.checkedF = function (filter, form) {
        // @ts-ignore: 'this' will be _ICheck at runtime
        return this.checkedO(_Obj_1.default.getF(filter, form));
    };
    /**
     * get checked status by object
     */
    _ICheck.checkedO = function (obj) {
        if (obj == null)
            return false;
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    };
    /**
     * get checked checkebox data-value string array
     * form {object} container
     * fid {string} (optional '_check0') data-fid value
     * return {string array}
     */
    _ICheck.getCheckeds = function (form, fid) {
        fid = fid || _ICheck.Check0Id;
        var ary = [];
        _Obj_1.default.getF(_Input_1.default.fidFilter(fid) + ':checked', form).each(function (i) {
            // @ts-ignore: data('value') is expected to return a string or equivalent
            ary[i] = $(this).data('value');
        });
        return ary;
    };
    /**
     * set checked status for multiple rows
     * form {object} container
     * status {boolean} check or uncheck
     * fid {string} (optional '_check0') data-fid value
     * return void
     */
    _ICheck.checkAll = function (form, status, fid) {
        fid = fid || _ICheck.Check0Id;
        var filter = _Input_1.default.fidFilter(fid);
        // @ts-ignore: 'this' will be _ICheck at runtime
        this.setO(form.find(filter), status);
    };
    /**
     * default data-fid attribute value for multiple selection
     */
    _ICheck.Check0Id = '_check0';
    return _ICheck;
}(_IBase_1.default));
exports.default = _ICheck;
; //class
