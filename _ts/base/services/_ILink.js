"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var _Obj_1 = require("./_Obj");
/**
 * //link file
 */
var _ILink = /** @class */ (function () {
    function _ILink() {
    }
    //value by fid
    _ILink.get = function (fid, form) {
        return this.getO(_Obj_1.default.get(fid, form));
    };
    //value by object
    _ILink.getO = function (obj) {
        return obj.text();
    };
    _ILink.set = function (fid, value, form) {
        this.setO(_Obj_1.default.get(fid, form), value);
    };
    _ILink.setO = function (obj, value) {
        obj.text(value);
    };
    return _ILink;
}()); //class
exports.default = _ILink;
