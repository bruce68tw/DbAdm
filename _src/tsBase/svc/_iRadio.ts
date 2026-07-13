import _iBase from './_iBase';
import _Obj from './_Obj';
import _iCheck from './_iCheck';
import _Str from './_Str';
import _Ajax from './_Ajax';

export default class _iRadio extends _iBase {
    //=== get ===
    //get checked data-value
    static get(fid: string, box?: JQuery): string {
        return this._getByName(fid, box);
    }

    /**
     * get checked data-value by fid
     * param obj {object} single object
     */ 
    static getO(obj: JQuery, box?: JQuery): string {
        return this._getByName(_Obj.getName(obj), box);
    }

    //get checked object, 如果沒有選取則會回傳null !!
    static getObj(fid: string, box?: JQuery): JQuery {
        return _Obj.getByFt(`[name='${fid}']:checked`, box);
    }

    //get data-value by checked name
    private static _getByName(name: string, box?: JQuery): string {
        const obj = this.getObj(name, box);
        return _Obj.isEmpty(obj) ? '' : obj.data('value');
    }

    //=== set ===
    //改成用name來查欄位
    static set(fid: string, value: string | number, box?: JQuery): void {
        this._setByName(fid, value, box);
    }
    
    static setO(obj: JQuery, value: string | number, box?: JQuery): void {
        this._setByName(_Obj.getName(obj), value, box);
    }

    static reset(fid: string, box?: JQuery): void {
        const objs = _Obj.getByFt(`[name='${fid}']`, box);
        if (objs != null)
            objs.prop('checked', false);
    }

    //set checked status by name & data-value
    private static _setByName(name: string, value: string | number, box?: JQuery): void {
        const obj = _Obj.getByFt(`[name='${name}'][data-value='${value}']`, box);
        if (obj != null) 
            obj.prop('checked', true);
    }

    //set status by name
    //改成用name來查欄位
    static setEdit(fid: string, status: boolean, box?: JQuery): void {
        //use getN() !!
        this.setEditO(_Obj.get(fid, box), status);
    }

    /**
     * setEditOs -> setEditO, 因為上層呼叫 setEditO !!
     * @param {object} obj, 可以是複數
     * @param {bool} status
     */
    static setEditO(obj: JQuery, status: boolean): void {
        obj.attr('disabled', !status ? 'disabled' : null); //use attr !!
    }

    //for modal單選畫面
    //傳回checked一筆資料, 讀取tr全部data欄位
    static getCheck0Tr(form: JQuery): JQuery | null {
        const radio = _Obj.getByFt(_iCheck.fltCheckeds, form).first();
        return (radio.length == 1) ? radio.closest('tr') : null;
    }

    /** * ?? for 多筆資料only(data-id)
     * 產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     * @param {string} fid (optional)id/data-id 
     * @param {string} label (optional)show label 
     * @param {bool} checked default false, 是否勾選
     * @param {string} value (optional) 如果null則為1
     * @param {bool} editable default true, 是否可編輯
     * @param {string} extClass (optional) extClass
     * @param {string} extProp (optional) extProp
     * @return {string} html string.
    */
    static render(fid: string, label?: string, checked?: boolean, value?: StrNum, editable?: boolean, extClass?: string, extProp?: string): string {
        const html = "" +
            "<label class='xi-check {0}'>" +
            "   <input type='radio'{1}>{2}" +
            "   <span class='xi-rspan'></span>" +
            "</label>";

        //adjust
        label = label || '';
        extClass = extClass || '';
        extProp = extProp || '';
        let valStr = value || '';
        if (label == '')
            label = '&nbsp;';
        if (_Str.isEmpty(valStr as string))
            valStr = 1;

        //attr
        extProp += " data-id='" + fid + "' name='" + fid + "'" + 
            " value='" + valStr + "'";
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled'; //disabled='disabled'

        return _Str.format(html, extClass, extProp, label);
    }
}

Object.assign(_iRadio, _iBase);