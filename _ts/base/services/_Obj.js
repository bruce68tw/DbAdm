"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Input_1 = require("./_Input");
var _Var_1 = require("./_Var");
/**
 * jquery object
 * 同時用在輸入欄位和非輸入欄位(ex: button)
 */
var _Obj = /** @class */ (function () {
    function _Obj() {
    }
    /**
     * get object by name for input field
     */
    _Obj.get = function (fid, box) {
        // Assuming _input.fidFilter is on a class named _Input
        return _Obj.getF(_Input_1.default.fidFilter(fid), box);
    };
    /**
     * get object by filter string
     */
    _Obj.getF = function (ft, box) {
        var obj = box.find(ft);
        if (obj.length === 0) {
            //_log.info('_obj.js getF() found none. (filter=' + ft + ')');
            return null;
        }
        else {
            return obj;
        }
    };
    /**
     * get object by name
     */
    _Obj.getN = function (name, box) {
        return _Obj.getF('[name=' + name + ']', box);
    };
    /**
     * get object by data-id
    static getD(val: string, box: JQuery): JQueryN {
        return _Obj.getF('[data-id=' + val + ']', box);
    }
     */
    /**
     * get object by value
     */
    _Obj.getV = function (val, box) {
        return _Obj.getF('[value=' + val + ']', box);
    };
    /**
     * for none input object
     * get object by id for none input field, like button
     */
    _Obj.getById = function (id, box) {
        return _Obj.getF('#' + id, box);
    };
    //以下function都傳入object
    /**
     * get id of object
     */
    _Obj.getId = function (obj) {
        var _a;
        return _Obj.isEmpty(obj) ? '' : (_a = obj.attr('id')) !== null && _a !== void 0 ? _a : '';
    };
    /**
     * get name of object
     */
    _Obj.getName = function (obj) {
        var _a;
        return _Obj.isEmpty(obj) ? '' : (_a = obj.attr('name')) !== null && _a !== void 0 ? _a : '';
    };
    /**
     * get data-id of object
    static getDid(obj: JQuery): string {
        return (obj.length > 0) ? obj.data('id') : '';
    }
     */
    /**
     * check object is visible or not
     */
    _Obj.isShow = function (obj) {
        return obj.is(':visible');
    };
    /**
     * check object existed or not
     */
    _Obj.isEmpty = function (obj) {
        // Modified signature to accept JQueryN for robustness
        return (obj == null || obj.length === 0);
    };
    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    _Obj.notEmpty = function (obj) {
        return !_Obj.isEmpty(obj);
    };
    /**
     * check object has attribute or not
     * return boolean
     */
    _Obj.hasAttr = function (obj, attr) {
        // Added 'attr' parameter as it was missing and assumed to be a string return type
        return obj.attr(attr);
    };
    //如果使用show()/hide()會動態寫入 inline style, 造成CSRF !!
    _Obj.show = function (obj) {
        obj.removeClass('d-none');
    };
    _Obj.hide = function (obj) {
        obj.addClass('d-none');
    };
    //status可能傳入文字!!
    _Obj.showByStatus = function (obj, status) {
        // Assuming _var.toBool is on a class named _Var
        if (_Var_1.default.toBool(status))
            _Obj.show(obj);
        else
            _Obj.hide(obj);
    };
    _Obj.getData = function (obj, fid) {
        return obj.data(fid);
    };
    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    _Obj.setData = function (obj, fid, value) {
        obj.attr('data-' + fid, value);
    };
    //傳回小寫tagName
    _Obj.tagName = function (obj) {
        // Added null check for robustness, assuming the JQuery object contains elements
        return obj[0] ? obj[0].tagName.toLowerCase() : '';
    };
    //rename css class
    _Obj.renameCss = function (obj, oldCss, newCss) {
        obj.removeClass(oldCss).addClass(newCss);
    };
    return _Obj;
}()); //class
exports.default = _Obj;
