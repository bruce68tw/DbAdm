import _Input from './_Input';
import _Var from './_Var';
//操作 jQuery object
export default class _Obj {
    static toAny(obj) {
        return obj;
    }
    static setEdit(obj, status) {
        obj.prop('disabled', !status);
    }
    /**
     * get object by name for input field
     */
    static get(fid, box) {
        return _Obj.getByFt(_Input.fidFilter(fid), box);
    }
    /**
     * getF -> getByFt
     * get object by filter string
     * 傳回JQuery物件, 裡面包含多個 element,
     */
    static getByFt(ft, box) {
        const obj = box.find(ft);
        if (obj.length === 0) {
            return null;
        }
        else {
            return obj;
        }
    }
    /**
     * for none input object
     * get object by id for none input field, like button
     */
    static getById(id, box) {
        return _Obj.getByFt('#' + id, box);
    }
    static getByPreFid(id, box) {
        return _Obj.getByFt('#' + id, box);
    }
    //以下function都傳入object
    /**
     * get id of object
     */
    static getId(obj) {
        return (obj && obj.length > 0) ? (obj.attr('id') || '') : '';
    }
    /**
     * get name of object
     */
    static getName(obj) {
        return (obj && obj.length > 0) ? (obj.attr('name') || '') : '';
    }
    /**
     * check object is visible or not
     */
    static isShow(obj) {
        return obj.is(':visible');
    }
    /**
     * check object existed or not
     */
    static isEmpty(obj) {
        return (obj == null || obj.length === 0);
    }
    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    static notEmpty(obj) {
        return !_Obj.isEmpty(obj);
    }
    /**
     * check object has attribute or not
     * return boolean
     */
    static hasAttr(obj, attr) {
        return obj.attr(attr);
    }
    //如果使用show()/hide()會動態寫入 inline style, 造成CSRF !!
    static show(obj) {
        obj.removeClass('d-none');
    }
    static hide(obj) {
        obj.addClass('d-none');
    }
    //status可能傳入文字!!
    static showByStatus(obj, status) {
        if (_Var.toBool(status)) {
            _Obj.show(obj);
        }
        else {
            _Obj.hide(obj);
        }
    }
    //如果data-屬性不存在會傳回''
    static getData(obj, fid) {
        return obj.attr('data-' + fid) || '';
    }
    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    static setData(obj, fid, value) {
        obj.attr('data-' + fid, value);
    }
    //傳回小寫tagName
    static tagName(obj) {
        return obj[0].tagName.toLowerCase();
    }
    //rename css class
    static renameCss(obj, oldCss, newCss) {
        obj.removeClass(oldCss).addClass(newCss);
    }
}
