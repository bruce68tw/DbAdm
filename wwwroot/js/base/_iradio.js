
//注意: 單筆時, 要設定 fid/data-fid(只設定第1個radio), name (2個屬性的內容必須相同!!)
//與其他類型輸入欄位操作不同 !!
//iRadio 沒有 getD/setD
var _iradio = $.extend({}, _ibase, {

    //=== get ===
    get: function (fid, box) {
        return _iradio.getOs(_obj.get(fid, box));
    },
    //obj 為單筆object
    getO: function (obj, box) {
        return obj.val();
        /*
        if (obj.length == 1)
            obj = _obj.get(_obj.getName(obj), box);
        return _iradio._getO(obj);
        */
    },
    //get value by objects
    getOs: function (objs) {
        //use filter !!
        return objs.filter(':checked').val();
    },

    //=== set ===
    //改成用name來查欄位
    set: function (fid, value, box) {
        _iradio.setOs(_obj.get(fid, box), value);
    },
    //obj 為單筆object
    //setO: function (obj, value, box) {
    setO: function (obj) {
        obj.prop('checked', true);
        /*
        if (obj.length == 1)
            obj = _obj.getN(_obj.getName(obj), box);
        return _iradio._setO(obj, value);
        */
    },
    //set value by objects
    setOs: function (objs, value) {
        //use filter !!
        objs.filter('[value=' + value + ']').prop('checked', true);
    },

    //set status by name
    //改成用name來查欄位
    setEdit: function (fid, status, box) {
        //use getN() !!
        _iradio.setEditOs(_obj.get(fid, box));
    },
    setEditOs: function (objs, status) {
        objs.attr('disabled', !status); //use attr !!
    },

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

    /** 
     ?? for 多筆資料only(data-id)
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
    render: function (fid, label, checked, value, editable, extClass, extProp) {
        var html = "" +
            "<label class='xg-radio {0}'>" +
            "   <input type='radio'{1}>{2}" +
            "   <span></span>" +
            "</label>";

        //adjust
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extProp = extProp || '';
        value = value || '';
        if (label == '')
            label = '&nbsp;';
        if (_str.isEmpty(value))
            value = 1;

        //attr
        extProp += " data-id='" + fid + "' name='" + fid + "'" + 
            " value='" + value + "'";
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled';    //disabled='disabled'

        return _str.format(html, extClass, extProp, label);
    },

}); //class