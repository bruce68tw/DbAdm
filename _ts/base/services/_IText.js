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
var _Obj_1 = require("./_Obj");
//extend _ibase.js, use jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
var _IText = /** @class */ (function (_super) {
    __extends(_IText, _super);
    function _IText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //new method
    //add input mask, use jquery maskedinput
    _IText.mask = function (box) {
        var filter = "[data-mask!='']";
        _Obj_1.default.getF(filter, box).each(function () {
            var me = $(this);
            // 假設 JQuery 已經透過擴充支援 .mask 方法
            me.mask(me.data('mask'));
        });
    };
    return _IText;
}(_IBase_1.default)); //class
exports.default = _IText;
