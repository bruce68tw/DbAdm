"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Modal = /** @class */ (function () {
    function _Modal() {
    }
    _Modal.show = function (id) {
        $('#' + id).modal('show');
    };
    _Modal.hide = function (id) {
        $('#' + id).modal('hide');
    };
    _Modal.showO = function (obj) {
        obj.modal('show');
    };
    _Modal.hideO = function (obj) {
        obj.modal('hide');
    };
    _Modal.showF = function (filter) {
        $(filter).modal('show');
    };
    _Modal.hideF = function (filter) {
        $(filter).modal('hide');
    };
    return _Modal;
}()); //class
exports.default = _Modal;
