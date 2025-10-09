import _Input from "./_Input";
import _Var from "./_Var";

/**
 * jquery object
 * 同時用在輸入欄位和非輸入欄位(ex: button)
 */
export default class _Obj {

    /**
     * get object by name for input field
     */
    static get(fid: string, box: JQuery): JQueryN {
        // Assuming _input.fidFilter is on a class named _Input
        return _Obj.getF(_Input.fidFilter(fid), box);
    }

    /**
     * get object by filter string
     */
    static getF(ft: string, box: JQuery): JQueryN {
        const obj = box.find(ft);
        if (obj.length === 0) {
            //_log.info('_obj.js getF() found none. (filter=' + ft + ')');
            return null;
        } else {
            return obj;
        }
    }

    /**
     * get object by name
     */
    static getN(name: string, box: JQuery): JQueryN {
        return _Obj.getF('[name=' + name + ']', box);
    }

    /**
     * get object by data-id
    static getD(val: string, box: JQuery): JQueryN {
        return _Obj.getF('[data-id=' + val + ']', box);
    }
     */

    /**
     * get object by value
     */
    static getV(val: string, box: JQuery): JQueryN {
        return _Obj.getF('[value=' + val + ']', box);
    }

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    static getById(id: string, box: JQuery): JQueryN {
        return _Obj.getF('#' + id, box);
    }

    //以下function都傳入object
    /**
     * get id of object
     */
    static getId(obj: JQueryN): string {
        return _Obj.isEmpty(obj) ? '' : obj!.attr('id') ?? '';
    }

    /**
     * get name of object
     */
    static getName(obj: JQueryN): string {
        return _Obj.isEmpty(obj) ? '' : obj!.attr('name') ?? '';
    }

    /**
     * get data-id of object
    static getDid(obj: JQuery): string {
        return (obj.length > 0) ? obj.data('id') : '';
    }
     */

    /**
     * check object is visible or not
     */
    static isShow(obj: JQuery): boolean {
        return obj.is(':visible');
    }

    /**
     * check object existed or not
     */
    static isEmpty(obj: JQueryN): boolean {
        // Modified signature to accept JQueryN for robustness
        return (obj == null || obj.length === 0);
    }

    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    static notEmpty(obj: JQueryN): boolean {
        return !_Obj.isEmpty(obj);
    }

    /**
     * check object has attribute or not
     * return boolean
     */
    static hasAttr(obj: JQuery, attr: string): string {
        // Added 'attr' parameter as it was missing and assumed to be a string return type
        return obj.attr(attr) || '';
    }

    //如果使用show()/hide()會動態寫入 inline style, 造成CSRF !!
    static show(obj: JQuery): void {
        obj.removeClass('d-none');
    }

    static hide(obj: JQuery): void {
        obj.addClass('d-none');
    }

    //status可能傳入文字!!
    static showByStatus(obj: JQuery, status: any): void {
        // Assuming _var.toBool is on a class named _Var
        if (_Var.toBool(status))
            _Obj.show(obj);
        else
            _Obj.hide(obj);
    }

    static getData(obj: JQuery, fid: string): any {
        return obj.data(fid);
    }

    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    static setData(obj: JQuery, fid: string, value: string): void {
        obj.attr('data-' + fid, value);
    }

    //傳回小寫tagName
    static tagName(obj: JQuery): string {
        // Added null check for robustness, assuming the JQuery object contains elements
        return obj[0] ? obj[0].tagName.toLowerCase() : '';
    }

    //rename css class
    static renameCss(obj: JQuery, oldCss: string, newCss: string): void {
        obj.removeClass(oldCss).addClass(newCss);
    }
} //class