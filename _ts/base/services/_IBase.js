"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Obj_1 = require("./_Obj");
//base class of all input field, use 'this' instead of '_ibase'
//must loaded first, or will got error !!
var _IBase = /** @class */ (function () {
    function _IBase() {
    }
    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string | null}
     */
    _IBase.get = function (fid, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj_1.default.get(fid, box));
    };
    //get value by filter
    _IBase.getF = function (ft, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj_1.default.getF(ft, box));
    };
    //get value by id
    _IBase.getD = function (id, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj_1.default.getD(id, box));
    };
    //get value by object
    _IBase.getO = function (obj) {
        return obj == null ? null : obj.val();
    };
    //get input border for show red border
    //default return this, drive class could rewrite.
    _IBase.getBorder = function (obj) {
        return obj;
    };
    //set value, set -> setF -> setO
    _IBase.set = function (fid, value, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setO(_Obj_1.default.get(fid, box), value);
    };
    _IBase.setF = function (ft, value, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setO(_Obj_1.default.getF(ft, box), value);
    };
    _IBase.setO = function (obj, value) {
        obj.val(value);
        obj.text(value); //for XiRead
    };
    //set edit status
    _IBase.setEdit = function (fid, status, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setEditO(_Obj_1.default.get(fid, box), status);
    };
    _IBase.setEditF = function (ft, status, box) {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setEditO(_Obj_1.default.getF(ft, box), status);
    };
    _IBase.setEditO = function (obj, status) {
        obj.prop('readonly', !status);
    };
    return _IBase;
}());
exports.default = _IBase;
; //class
