"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var _BR_1 = require("./_BR");
var _Date_1 = require("./_Date");
var _ICheck_1 = require("./_ICheck");
var _IDate_1 = require("./_IDate");
var _IDt_1 = require("./_IDt");
var _IFile_1 = require("./_IFile");
var _IHtml_1 = require("./_IHtml");
var _ILink_1 = require("./_ILink");
var _IRadio_1 = require("./_IRadio");
var _IRead_1 = require("./_IRead");
var _ISelect_1 = require("./_ISelect");
var _IText_1 = require("./_IText");
var _ITextarea_1 = require("./_ITextarea");
var _Obj_1 = require("./_Obj");
var _Str_1 = require("./_Str");
var _Var_1 = require("./_Var");
var EstrInputType_1 = require("./EstrInputType"); // 假設 EstrInputType 是外部常數/列舉
/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toRow()
 * 3.validation error span position rules:
 * (a)same parent, could be different child level
 * (b)sibling(ex: Date)
 */
var _Input = /** @class */ (function () {
    function _Input() {
    }
    //get input value
    _Input.get = function (fid, box) {
        return _Input.getO(_Obj_1.default.get(fid, box), box);
    };
    /**
     * get input value by object
     * param obj {object}
     * param type {string} (optional) data-type
     * return input value
     */
    _Input.getO = function (obj, box, type) {
        type = type || _Input.getType(obj);
        switch (type) {
            case EstrInputType_1.default.Text:
                return _IText_1.default.getO(obj);
            case EstrInputType_1.default.Textarea:
                return _ITextarea_1.default.getO(obj);
            case EstrInputType_1.default.Check:
                return _ICheck_1.default.getO(obj);
            case EstrInputType_1.default.Radio:
                return _IRadio_1.default.getO(obj, box);
            case EstrInputType_1.default.Select:
                return _ISelect_1.default.getO(obj);
            case EstrInputType_1.default.Date:
                return _IDate_1.default.getO(obj);
            case EstrInputType_1.default.DateTime:
                return _IDt_1.default.getO(obj);
            case EstrInputType_1.default.File:
                return _IFile_1.default.getO(obj);
            case EstrInputType_1.default.Html:
                return _IHtml_1.default.getO(obj);
            case EstrInputType_1.default.ReadOnly:
                return _IRead_1.default.getO(obj);
            case EstrInputType_1.default.Link:
                return _ILink_1.default.getO(obj);
            default:
                //text, textarea
                return obj.val();
        }
    };
    _Input.set = function (fid, value, box) {
        _Input.setO(_Obj_1.default.get(fid, box), value, box);
    };
    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param box {object} for radio
     * param type {string} optional, data-type
     */
    _Input.setO = function (obj, value, box, type) {
        if (obj == null || !_Var_1.default.isPureData(value))
            return;
        type = type || _Input.getType(obj);
        switch (type) {
            case EstrInputType_1.default.Text:
                _IText_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Check:
                _ICheck_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Radio:
                //此時 obj 為 array
                value = value || '0';
                _IRadio_1.default.setO(obj, value, box);
                break;
            case EstrInputType_1.default.Select:
                _ISelect_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Date:
                return _IDate_1.default.setO(obj, value);
            case EstrInputType_1.default.DateTime:
                return _IDt_1.default.setO(obj, value);
            case EstrInputType_1.default.File:
                _IFile_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Textarea:
                _ITextarea_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Html:
                _IHtml_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Read:
                var format = obj.data('format');
                if (_Str_1.default.notEmpty(format) && _Str_1.default.notEmpty(_BR_1.default[format]))
                    value = _Date_1.default.dtsToFormat(value, _BR_1.default[format]);
                _IRead_1.default.setO(obj, value);
                break;
            case EstrInputType_1.default.Link:
                return _ILink_1.default.setO(obj, value);
            default:
                //text
                obj.val(value);
                break;
        }
    };
    /**
     * get input field type
     */
    _Input.getType = function (obj) {
        return obj.data('type');
    };
    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    _Input.getObj = function (fid, box, ftype) {
        ftype = ftype || _Input.getType(_Obj_1.default.get(fid, box));
        return (ftype === EstrInputType_1.default.Radio) ? _IRadio_1.default.getObj(fid, box) : _Obj_1.default.get(fid, box);
    };
    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    _Input.getFid = function (obj) {
        return obj.data('fid');
    };
    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    _Input.fidFilter = function (fid) {
        return _Str_1.default.isEmpty(fid)
            ? '[data-fid]'
            : "[data-fid='".concat(fid, "']");
    };
    return _Input;
}()); //class
exports.default = _Input;
