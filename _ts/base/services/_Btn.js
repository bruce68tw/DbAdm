"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 假設的依賴靜態類別
var _Obj_1 = require("./_Obj");
// 假設 JQuery 已經在專案中定義或透過 @types/jquery 引入
/**
 * button helper class
 */
var _Btn = /** @class */ (function () {
    function _Btn() {
    }
    /**
     * Set the disabled status of a button or element identified by ID.
     * It relies on _Obj.getById to find the element.
     * param id {string} The ID of the button/element.
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     * param box {any} (Optional) The context/container object for finding the element.
     */
    _Btn.setEdit = function (id, status, box) {
        //use _obj.getById() !!
        // 假設 _Obj.getById 返回一個 jQuery 物件
        _Btn.setEditO(_Obj_1.default.getById(id, box), status);
    };
    /**
     * Set the disabled status of a button or element using its object reference.
     * param obj {JQuery<HTMLElement>|any} The button/element object (usually a jQuery object).
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     */
    _Btn.setEditO = function (obj, status) {
        // .prop('disabled', true) 會禁用按鈕，所以當 status 為 false 時應禁用
        obj.prop('disabled', !status);
    };
    /**
     * Set the disabled status of a button or element identified by form type (ft).
     * It relies on _Obj.getF to find the element.
     * param ft {string} The form type identifier.
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     * param box {any} (Optional) The context/container object for finding the element.
     */
    _Btn.setEditF = function (ft, status, box) {
        // 假設 _Obj.getF 返回一個 jQuery 物件
        _Btn.setEditO(_Obj_1.default.getF(ft, box), status);
    };
    return _Btn;
}());
exports.default = _Btn;
