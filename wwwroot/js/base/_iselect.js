
//一般的 select option 
var _iselect = $.extend({}, _ibase, {

    //=== default get/set ===
    getO: function (obj) {
        return (obj.length === 0) ? '' : obj.find('option:selected').val();
    },

    //設定目前選取的item
    //不傳回選取的 option object(自行呼叫 getIndex())
    setO: function (obj, value) {
        filter = 'option[value="' + value + '"]';
        var item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        } else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    //=== end ===


    //get selected index(base 0)
    getIndex: function (fid, box) {
        return _iselect.getIndexO(_obj.get(fid, box));
    },
    getIndexO: function (obj) {
        return obj.prop('selectedIndex');
    },

    //get options count
    getCount: function (fid, box) {
        return _iselect.getCountO(_obj.get(fid, box));
    },
    getCountO: function (obj) {
        return obj.find('option').length;
    },

    //set by index(base 0)
    setIndex: function (fid, idx, box) {
        _iselect.setIndexO(_obj.get(fid, box), idx);
    },
    setIndexO: function (obj, idx) {
        obj.find('option').eq(idx).prop('selected', true);
    },

    //傳回選取的欄位的文字
    getText: function (fid, box) {
        var obj = _obj.get(fid, box);
        return _iselect.getTextO(obj);
    },
    getTextO: function (obj) {
        return obj.find('option:selected').text();
    },

    //傳回data屬性(name)值
    getData: function (fid, name, box) {
        return _obj.get(fid, box).find('option:selected').data(name);
    },
    getDataO: function (obj, name) {
        return obj.find('option:selected').data(name);
    },

    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    setItems: function (fid, items, box) {
        var obj = _obj.get(fid, box);
        _iselect.setItemsO(obj, items);
    },
    setItemsF: function (filter, items, box) {
        var obj = _obj.getF(filter, box);
        _iselect.setItemsO(obj, items);
    },
    //by object
    setItemsO: function (obj, items) {
        obj.find('option').remove();
        if (items === null)
            return;

        for (var i = 0; i < items.length; i++)
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    },

    //get all options
    //getIdStrExts -> getExts
    getExts: function (fid, box) {
        var rows = [];
        _obj.get(fid, box).find('option').each(function (i) {
            var me = $(this);
            rows[i] = {
                Id: me.val(),
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    },

    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    setExts: function (fid, items, box) {
        var filter = '#' + fid;
        var obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (var i = 0; i < items.length; i++)
            obj.append(_str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    },

    //把多欄位值寫入json
    //fids: 欄位名稱 array
    valuesToJson: function (json, fids, box) {
        for (var i = 0; i < fids.length; i++)
            json[fids[i]] = _iselect.get(fids[i], box);
        return json;
    },

    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    filterByExt: function (fid, value, rows, box, allItem) {
        if (allItem === undefined)
            allItem = false;
        var obj = _obj.get(fid, box);
        obj.empty();
        //item.find('option').hide();
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext == '') || row.Ext == value)
                obj.append(_str.format('<option value="{0}">{1}</option>', row.Id, row.Text));
        }

        //選取第0筆
        if (len > 0)
            _iselect.setIndexO(obj, 0);
    },

}); //class