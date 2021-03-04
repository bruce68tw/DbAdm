
//擴充_ibase屬性, 使用jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
var _itext = $.extend({}, _ibase, {

    /** 
     for 多筆資料only, 配合jquery validate
     產生 input text html 內容, 與後端 XiTextHelper 一致
     validate使用name屬性, 必須唯一, 所以加上rowNo參數
     @param {int} rowNo row no
     @param {string} fid data-id
     @param {string} value value
     @param {int} maxLen 字串長度限制, default 0(表示不限制)
     @param {bool} required default false, 是否為必填
     @param {bool} editable default true, 是否可編輯
     @param {string} extClass extend class
     @param {string} extProp extend property, 可以放onChange
     @return {string} html string.
    */
    /*
    render: function (rowNo, fid, value, type, maxLen, required, editable, extClass, extProp) {
        //default value
        rowNo = rowNo || 0;
        fid = fid || '';
        value = value || '';
        maxLen = maxLen || 0;
        type = _var.emptyToValue(type, 'text');
        required = required || false;
        editable = editable || true;
        extClass = extClass || '';
        extProp = extProp || '';

        //attr
        var attr = _helper.getBaseProp(rowNo, fid, value, type, required, editable, extProp);
        if (maxLen > 0)
            attr += " maxlength='" + maxLen + "'";
        if (extProp != '')
            attr += " style='" + extProp + "'"; 
        if (attr != '')
            attr = ' ' + attr;
        var html = "<input{0} data-val='true' class='form-control {1}'>";
        return _str.format(html, attr, extClass);
    },
    */

    //add input mask
    //use jquery maskedinput
    mask: function (box) {
        var filter = "[data-mask!='']";
        _obj.getF(filter, box).each(function () {
            var me = $(this);
            me.mask(me.data('mask'));
        });
    },

}); //class
