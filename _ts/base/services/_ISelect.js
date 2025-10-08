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
var _Str_1 = require("./_Str");
var _Ajax_1 = require("./_Ajax");
//select option 
var _ISelect = /** @class */ (function (_super) {
    __extends(_ISelect, _super);
    function _ISelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //#region override
    _ISelect.getO = function (obj) {
        return _Obj_1.default.isEmpty(obj) ? '' : obj.find('option:selected').val();
    };
    _ISelect.setO = function (obj, value) {
        if (_Obj_1.default.isEmpty(obj))
            return null;
        var filter = 'option[value="' + value + '"]';
        var item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        }
        else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    };
    _ISelect.setEditO = function (obj, status) {
        if (_Obj_1.default.isEmpty(obj))
            return;
        obj.prop('disabled', !status);
    };
    //#endregion
    //get selected index(base 0)
    _ISelect.getIndex = function (fid, box) {
        return _ISelect.getIndexO(_Obj_1.default.get(fid, box));
    };
    _ISelect.getIndexO = function (obj) {
        if (_Obj_1.default.isEmpty(obj))
            return -1;
        return obj.prop('selectedIndex');
    };
    //get options count
    _ISelect.getCount = function (fid, box) {
        return _ISelect.getCountO(_Obj_1.default.get(fid, box));
    };
    _ISelect.getCountO = function (obj) {
        if (_Obj_1.default.isEmpty(obj))
            return -1;
        return obj.find('option').length;
    };
    //set by index(base 0)
    _ISelect.setIndex = function (fid, idx, box) {
        _ISelect.setIndexO(_Obj_1.default.get(fid, box), idx);
    };
    _ISelect.setIndexO = function (obj, idx) {
        if (_Obj_1.default.isEmpty(obj))
            return;
        obj.find('option').eq(idx).prop('selected', true);
    };
    //傳回選取的欄位的文字
    _ISelect.getText = function (fid, box) {
        var obj = _Obj_1.default.get(fid, box);
        return _ISelect.getTextO(obj);
    };
    _ISelect.getTextO = function (obj) {
        if (_Obj_1.default.isEmpty(obj))
            return '';
        return obj.find('option:selected').text();
    };
    //傳回data屬性(name)值
    _ISelect.getData = function (fid, name, box) {
        return _Obj_1.default.get(fid, box).find('option:selected').data(name);
    };
    _ISelect.getDataO = function (obj, name) {
        if (_Obj_1.default.isEmpty(obj))
            return null;
        return obj.find('option:selected').data(name);
    };
    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    _ISelect.setItems = function (fid, items, box) {
        var obj = _Obj_1.default.get(fid, box);
        _ISelect.setItemsO(obj, items);
    };
    _ISelect.setItemsF = function (filter, items, box) {
        var obj = _Obj_1.default.getF(filter, box);
        _ISelect.setItemsO(obj, items);
    };
    //by object
    _ISelect.setItemsO = function (obj, items) {
        if (_Obj_1.default.isEmpty(obj))
            return;
        obj.find('option').remove();
        if (items === null)
            return;
        for (var i = 0; i < items.length; i++)
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    };
    //get all options
    //getIdStrExts -> getExts
    _ISelect.getExts = function (fid, box) {
        var rows = [];
        _Obj_1.default.get(fid, box).find('option').each(function (i) {
            var me = $(this);
            rows[i] = {
                Id: me.val(),
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    };
    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    _ISelect.setExts = function (fid, items, box) {
        var filter = '#' + fid;
        var obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (var i = 0; i < items.length; i++)
            obj.append(_Str_1.default.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    };
    //把多欄位值寫入json
    //fids: 欄位名稱 array
    _ISelect.valuesToJson = function (json, fids, box) {
        for (var i = 0; i < fids.length; i++)
            json[fids[i]] = _ISelect.get(fids[i], box);
        return json;
    };
    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    _ISelect.filterByExt = function (fid, value, rows, box, allItem, addEmptyStr) {
        if (allItem === undefined)
            allItem = false;
        var obj = _Obj_1.default.get(fid, box);
        obj.empty();
        if (addEmptyStr !== undefined && addEmptyStr !== '')
            obj.append(_Str_1.default.format('<option value="">{0}</option>', addEmptyStr));
        //item.find('option').hide();
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext === '') || row.Ext === value)
                obj.append(_Str_1.default.format('<option value="{0}">{1}</option>', row.Id, row.Str));
        }
        //選取第0筆
        if (len > 0)
            _ISelect.setIndexO(obj, 0);
    };
    /**
     * ?? //todo
     * onChangeParent -> changeParent
     * 處理2個下拉欄位的連動, 例如:城市-鄉鎮, parent欄位改變時, child欄位的內容也改變
     * param parentFid {stirng} parent欄位Id
     * param childFid {stirng} child欄位Id
     * param childId {stirng} child欄位值, 如果空白表示不設定此欄位值(只更新來源)
     * param action {stirng} 後端action讀取來源, 固定傳入parentId
     * param isEdit {bool} true(編輯畫面), false(查詢畫面)
     */
    _ISelect.changeParent = function (parentFid, childFid, childId, action, isEdit) {
        // 假設 _me, _ajax 在其他地方有定義或引入，這裡因為原始程式碼沒有提供，所以需要根據實際情況調整
        // 為了編譯通過，暫時將 _me.divEdit 和 _me.divRead 假設為 JQuery 類型
        var _me = { divEdit: $({}), divRead: $({}) }; // 模擬 _me 物件
        var box = isEdit ? _me.divEdit : _me.divRead;
        var thisId = _ISelect.get(parentFid, box);
        _Ajax_1.default.getJsonA(action, { parentId: thisId }, function (rows) {
            _ISelect.setItems(childFid, rows, box);
            if (_Str_1.default.notEmpty(childId)) {
                _ISelect.set(childFid, childId, box);
            }
        });
    };
    return _ISelect;
}(_IBase_1.default)); //class
exports.default = _ISelect;
