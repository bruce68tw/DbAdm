
//使用jQuery繼承&擴充屬性
//checkbox(使用 html checkbox)
var _icheck = $.extend({}, _ibase, {

    /**
     * default name attribute value for 選取多筆
     */
    check0Id: '_check0',

    /**
     * (override)傳回value, 不是狀態 !!, 如果無選取, 則傳回0 !!
     */ 
    getO: function (obj) {
        //return obj.val();
        return obj.is(':checked') ? obj.val() : '0';
    },

    /**
     * (override)set checked or not
     */
    setO: function (obj, value) {
        //obj.val(value);
        var status = (value == '1' || value == 'True' || value == true);
        obj.prop('checked', status);
    },

    /**
     * (override) set status by object, obj可為複數
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    
    /**
     * get checked status by fid
     */
    checked: function (fid, box) {
        return _icheck.checkedO(_obj.get(fid, box));
    },

    /**
     * get checked status by filter
     */
    checkedF: function (filter, box) {
        return _icheck.checkedO(_obj.getF(filter, box));
    },

    /**
     * get checked status by object
     */
    checkedO: function (obj) {
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    },

    /**
     * for 多筆資料only(data-id), 所以function後面加上2
     * 產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     * 
     * rowNo {Number} (optional)id/data-id
     * fid {string} (optional)id/data-id
     * value {string} (optional 1) checkbox value
     * checked {boolean} default false, 是否勾選
     * label {string} (optional) show label
     * editable {boolean} (optional true) 是否可編輯
     * extClass {string} (optional) extClass
     * extAttr {string} (optional) extAttr
     * 
     * return {string} html string.
     */
    /*
    render2: function (rowNo, fid, value, checked, label, editable, extClass, extAttr) {
        //default
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extAttr = extAttr || '';
        //value = value || '';
        //if (label == '')
        //    label = '&nbsp;';
        if (_str.isEmpty(label))
            extClass += ' xg-no-label'; //for 控制位置
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = _helper.getBaseProp(rowNo, fid, value, 'checkbox', false, editable, extAttr);
        if (checked)
            attr += ' checked';
        if (attr != '')
            attr = ' ' + attr;

        var html = "" +
            "<label class='xg-check {0}'>" +
            "   <input{1}>{2}" +
            "   <span></span>" +
            "</label>";

        return _str.format(html, extClass, attr, label);
    },
    */

    dtCheck0: function (value, checked) {
        //debugger;
        //var extClass = ' xg-no-label'; //for 控制位置
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = "name='" + _icheck.check0Id + "'" +
            " value='" + value + "'";
            
        if (checked)
            attr += ' checked';

        return "" +
            "<label class='xg-check xg-no-label'>" +
            "   <input " + attr + " type='checkbox'>" +
            "   <span></span>" +
            "</label>";
    },

    /**
     * 傳回有選取的欄位(使用data-id)值的字串陣列
     * box {object} container
     * dataFid {string} (optional '_check1') data-id value
     * return {string[]}
     */ 
    getCheckedValues: function (box, dataFid) {
        dataFid = dataFid || _icheck.check0Id;
        var rows = [];
        _obj.getF('[name=' + dataFid + ']:checked', box).each(function (i) {
            rows[i] = this.value;
        });
        return rows;
    },

    /**
     * 設定多個欄位的選取狀態
     * box {object} container
     * rows {json array}
     * dataFid {string} (optional '_check1') name value
     * return void
     */
    setCheckedByJsons: function (box, rows, dataFid) {
        if (_str.isEmpty(rows))
            return;

        dataFid = dataFid || _icheck.check0Id;
        for (var i = 0; i < rows.length; i++) {
            var obj = box.find('[value=' + rows[i][dataFid] + ']');
            _icheck.setO(obj, 1);
        }
    },

}); //class