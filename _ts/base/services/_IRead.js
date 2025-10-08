"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Obj_1 = require("./_Obj");
//label
var _IRead = /** @class */ (function () {
    function _IRead() {
    }
    //value by fid
    _IRead.get = function (fid, form) {
        return _IRead.getO(_Obj_1.default.get(fid, form));
    };
    //value by filter
    _IRead.getF = function (filter, form) {
        return _IRead.getO(_Obj_1.default.getF(filter, form));
    };
    //value by object
    _IRead.getO = function (obj) {
        return obj.text();
    };
    _IRead.set = function (fid, value, form) {
        _IRead.setO(_Obj_1.default.get(fid, form), value);
    };
    _IRead.setF = function (filter, value, form) {
        _IRead.setO(_Obj_1.default.getF(filter, form), value);
    };
    _IRead.setO = function (obj, value) {
        obj.text(value);
    };
    return _IRead;
}()); //class
exports.default = _IRead;
