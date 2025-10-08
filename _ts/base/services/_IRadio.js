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
// @ts-nocheck
var _IBase_1 = require("./_IBase");
var _Obj_1 = require("./_Obj");
var _Str_1 = require("./_Str");
/**
 * //注意: 單筆時, 要設定 fid/data-fid(只設定第1個radio), name (2個屬性的內容必須相同!!)
 * //與其他類型輸入欄位操作不同 !!
 * //iRadio 沒有 getD/setD
 */
var _IRadio = /** @class */ (function (_super) {
    __extends(_IRadio, _super);
    function _IRadio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //=== get ===
    //get checked data-value
    _IRadio.get = function (fid, box) {
        return _IRadio._getByName(fid, box);
    };
    /**
     * get checked data-value by fid
     * param obj {object} single object
     */
    _IRadio.getO = function (obj, box) {
        // 假設 _Obj.getName 返回 'name' 屬性值
        return _IRadio._getByName(_Obj_1.default.getName(obj), box);
    };
    //get checked object
    _IRadio.getObj = function (fid, box) {
        // 假設 fid 為 name 屬性值
        return _Obj_1.default.getF("[name=".concat(fid, "]:checked"), box);
    };
    //get data-value by checked name
    _IRadio._getByName = function (name, box) {
        return _IRadio.getObj(name, box).data('value');
    };
    //=== set ===
    //改成用name來查欄位
    _IRadio.set = function (fid, value, box) {
        _IRadio._setByName(fid, value, box);
    };
    //setO: function (obj, value, box) {
    _IRadio.setO = function (obj, value, box) {
        // 假設 _Obj.getName 返回 'name' 屬性值
        _IRadio._setByName(_Obj_1.default.getName(obj), value, box);
    };
    //set checked status by name & data-value
    _IRadio._setByName = function (name, value, box) {
        var obj = _Obj_1.default.getF("[name=".concat(name, "][data-value=").concat(value, "]"), box);
        if (obj != null && obj.length > 0)
            obj.prop('checked', true);
    };
    //set status by name
    //改成用name來查欄位
    _IRadio.setEdit = function (fid, status, box) {
        //use getN() !!
        _IRadio.setEditOs(_Obj_1.default.get(fid, box), status);
    };
    _IRadio.setEditOs = function (objs, status) {
        objs.attr('disabled', !status); //use attr !!
    };
    /**
     button radio onclick event
     params
       me : this component
       fid: field id
       value: field value
       onClickFn: (optional) callback function
     */
    /*
    _onClickBtnRadio: function (me, fid, value, onClickFn) {
        //unselect所有欄位
        fid = '#' + fid;
        var field = $(me);
        var box = field.closest(fid + '_box');      //找最近的 xxx_box 元素, 因為考慮相同 id的情況
        box.find('.active').removeClass('active');

        //更新欄位內容
        field.addClass('active');   //high light
        box.find(fid).val(value);   //set field value

        //更新欄位 xxx_now 內容
        box.find(fid + '_now').val(field.attr('data-old'));

        //call user define function
        //if (onClickFn != undefined && onClickFn != "")
        if (onClickFn)
            onClickFn(me, value);
    },

    //get field value
    getValue: function (fid) {
        var me = $('[name="' + fid + '"]:radio');
        if (me.length > 0) {
            return me.parent().hasClass('checked') ? me.val() : '';
        } else {
            return '';
        }
    },
    */
    /** ?? for 多筆資料only(data-id)
     產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     @param {string} fid (optional)id/data-id
     @param {string} label (optional)show label
     @param {bool} checked default false, 是否勾選
     @param {string} value (optional) 如果null則為1
     @param {bool} editable default true, 是否可編輯
     @param {string} boxClass (optional) boxClass
     @param {string} extClass (optional) extClass
     @param {string} extProp (optional) extProp
     @return {string} html string.
    */
    _IRadio.render = function (fid, label, checked, value, editable, extClass, extProp) {
        var html = "" +
            "<label class='xi-check {0}'>" +
            "   <input type='radio'{1}>{2}" +
            "   <span class='xi-rspan'></span>" +
            "</label>";
        //adjust
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extProp = extProp || '';
        value = value || '';
        if (label === '')
            label = '&nbsp;';
        if (_Str_1.default.isEmpty(value.toString()))
            value = 1;
        //attr
        extProp += " data-id='".concat(fid || '', "' name='").concat(fid || '', "'") +
            " value='".concat(value, "'");
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled'; //disabled='disabled'
        return _Str_1.default.format(html, extClass, extProp, label);
    };
    return _IRadio;
}(_IBase_1.default)); //class
exports.default = _IRadio;
