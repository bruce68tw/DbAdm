import _IBase from "./_IBase";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Ajax from "./_Ajax";
//select option 
export default class _ISelect extends _IBase {
    //#region override
    static getO(obj) {
        return _Obj.isEmpty(obj) ? '' : obj.find('option:selected').val();
    }
    static setO(obj, value) {
        if (_Obj.isEmpty(obj))
            return null;
        const filter = 'option[value="' + value + '"]';
        const item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        }
        else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    }
    static setEditO(obj, status) {
        if (_Obj.isEmpty(obj))
            return;
        obj.prop('disabled', !status);
    }
    //#endregion
    //get selected index(base 0)
    static getIndex(fid, box) {
        return _ISelect.getIndexO(_Obj.get(fid, box));
    }
    static getIndexO(obj) {
        if (_Obj.isEmpty(obj))
            return -1;
        return obj.prop('selectedIndex');
    }
    //get options count
    static getCount(fid, box) {
        return _ISelect.getCountO(_Obj.get(fid, box));
    }
    static getCountO(obj) {
        if (_Obj.isEmpty(obj))
            return -1;
        return obj.find('option').length;
    }
    //set by index(base 0)
    static setIndex(fid, idx, box) {
        _ISelect.setIndexO(_Obj.get(fid, box), idx);
    }
    static setIndexO(obj, idx) {
        if (_Obj.isEmpty(obj))
            return;
        obj.find('option').eq(idx).prop('selected', true);
    }
    //傳回選取的欄位的文字
    static getText(fid, box) {
        const obj = _Obj.get(fid, box);
        return _ISelect.getTextO(obj);
    }
    static getTextO(obj) {
        if (_Obj.isEmpty(obj))
            return '';
        return obj.find('option:selected').text();
    }
    //傳回data屬性(name)值
    static getData(fid, name, box) {
        return _Obj.get(fid, box).find('option:selected').data(name);
    }
    static getDataO(obj, name) {
        if (_Obj.isEmpty(obj))
            return null;
        return obj.find('option:selected').data(name);
    }
    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    static setItems(fid, items, box) {
        const obj = _Obj.get(fid, box);
        _ISelect.setItemsO(obj, items);
    }
    static setItemsF(filter, items, box) {
        const obj = _Obj.getF(filter, box);
        _ISelect.setItemsO(obj, items);
    }
    //by object
    static setItemsO(obj, items) {
        if (_Obj.isEmpty(obj))
            return;
        obj.find('option').remove();
        if (items === null)
            return;
        for (let i = 0; i < items.length; i++)
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    }
    //get all options
    //getIdStrExts -> getExts
    static getExts(fid, box) {
        const rows = [];
        _Obj.get(fid, box).find('option').each(function (i) {
            const me = $(this);
            rows[i] = {
                Id: me.val(),
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    }
    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    static setExts(fid, items, box) {
        const filter = '#' + fid;
        const obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (let i = 0; i < items.length; i++)
            obj.append(_Str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    }
    //把多欄位值寫入json
    //fids: 欄位名稱 array
    static valuesToJson(json, fids, box) {
        for (let i = 0; i < fids.length; i++)
            json[fids[i]] = _ISelect.get(fids[i], box);
        return json;
    }
    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    static filterByExt(fid, value, rows, box, allItem = false, addEmptyStr = null) {
        //if (allItem === undefined)
        //    allItem = false;
        const obj = _Obj.get(fid, box);
        obj.empty();
        if (addEmptyStr !== undefined && addEmptyStr !== '')
            obj.append(_Str.format('<option value="">{0}</option>', addEmptyStr));
        //item.find('option').hide();
        const len = rows.length;
        for (let i = 0; i < len; i++) {
            const row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext === '') || row.Ext === value)
                obj.append(_Str.format('<option value="{0}">{1}</option>', row.Id, row.Str));
        }
        //選取第0筆
        if (len > 0)
            _ISelect.setIndexO(obj, 0);
    }
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
    static changeParent(upFid, childFid, childId, action, isEdit) {
        const box = isEdit ? _me.divEdit : _me.divRead;
        const thisId = _ISelect.get(upFid, box);
        _Ajax.getJsonA(action, { parentId: thisId }, (rows) => {
            _ISelect.setItems(childFid, rows, box);
            if (_Str.notEmpty(childId)) {
                _ISelect.set(childFid, childId, box);
            }
        });
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_ISelect.js.map