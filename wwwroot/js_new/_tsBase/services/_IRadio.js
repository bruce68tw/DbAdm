// @ts-nocheck
import _IBase from "./_IBase";
import _Obj from "./_Obj";
import _Str from "./_Str";
/**
 * //注意: 單筆時, 要設定 fid/data-fid(只設定第1個radio), name (2個屬性的內容必須相同!!)
 * //與其他類型輸入欄位操作不同 !!
 * //iRadio 沒有 getD/setD
 */
export default class _IRadio extends _IBase {
    //=== get ===
    //get checked data-value
    static get(fid, box) {
        return _IRadio._getByName(fid, box);
    }
    /**
     * get checked data-value by fid
     * param obj {object} single object
     */
    static getO(obj, box) {
        // 假設 _Obj.getName 返回 'name' 屬性值
        return _IRadio._getByName(_Obj.getName(obj), box);
    }
    //get checked object
    static getObj(fid, box) {
        // 假設 fid 為 name 屬性值
        return _Obj.getF(`[name=${fid}]:checked`, box);
    }
    //get data-value by checked name
    static _getByName(name, box) {
        return _IRadio.getObj(name, box).data('value');
    }
    //=== set ===
    //改成用name來查欄位
    static set(fid, value, box) {
        _IRadio._setByName(fid, value, box);
    }
    //setO: function (obj, value, box) {
    static setO(obj, value, box) {
        // 假設 _Obj.getName 返回 'name' 屬性值
        _IRadio._setByName(_Obj.getName(obj), value, box);
    }
    //set checked status by name & data-value
    static _setByName(name, value, box) {
        const obj = _Obj.getF(`[name=${name}][data-value=${value}]`, box);
        if (obj != null && obj.length > 0)
            obj.prop('checked', true);
    }
    //set status by name
    //改成用name來查欄位
    static setEdit(fid, status, box) {
        //use getN() !!
        _IRadio.setEditOs(_Obj.get(fid, box), status);
    }
    static setEditOs(objs, status) {
        objs.attr('disabled', !status); //use attr !!
    }
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
    static render(fid, label, checked, value, editable, extClass, extProp) {
        const html = "" +
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
        if (_Str.isEmpty(value.toString()))
            value = 1;
        //attr
        extProp += ` data-id='${fid || ''}' name='${fid || ''}'` +
            ` value='${value}'`;
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled'; //disabled='disabled'
        return _Str.format(html, extClass, extProp, label);
    }
} //class
//# sourceMappingURL=../../../map/_tsBase/services/_IRadio.js.map