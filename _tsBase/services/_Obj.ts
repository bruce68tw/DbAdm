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
    public static get(fid: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        // Assuming _input.fidFilter is on a class named _Input
        return _Obj.getF(_Input.fidFilter(fid), box);
    }

    /**
     * get object by filter string
     */
    public static getF(ft: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
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
    public static getN(name: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        return _Obj.getF('[name=' + name + ']', box);
    }

    /**
     * get object by data-id
    public static getD(val: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        return _Obj.getF('[data-id=' + val + ']', box);
    }
     */

    /**
     * get object by value
     */
    public static getV(val: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        return _Obj.getF('[value=' + val + ']', box);
    }

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    public static getById(id: string, box: JQuery<HTMLElement>): JQuery<HTMLElement> | null {
        return _Obj.getF('#' + id, box);
    }

    //以下function都傳入object
    /**
     * get id of object
     */
    public static getId(obj: JQuery<HTMLElement>): string {
        return (obj.length > 0) ? obj.attr('id') ?? '' : '';
    }

    /**
     * get name of object
     */
    public static getName(obj: JQuery<HTMLElement>): string {
        return (obj.length > 0) ? obj.attr('name') ?? '' : '';
    }

    /**
     * get data-id of object
    public static getDid(obj: JQuery<HTMLElement>): string {
        return (obj.length > 0) ? obj.data('id') : '';
    }
     */

    /**
     * check object is visible or not
     */
    public static isShow(obj: JQuery<HTMLElement>): boolean {
        return obj.is(':visible');
    }

    /**
     * check object existed or not
     */
    public static isEmpty(obj: JQuery<HTMLElement> | null): boolean {
        // Modified signature to accept JQuery<HTMLElement> | null for robustness
        return (obj == null || obj.length === 0);
    }

    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    public static notEmpty(obj: JQuery<HTMLElement> | null): boolean {
        return !_Obj.isEmpty(obj);
    }

    /**
     * check object has attribute or not
     * return boolean
     */
    public static hasAttr(obj: JQuery<HTMLElement>, attr: string): string | undefined {
        // Added 'attr' parameter as it was missing and assumed to be a string return type
        return obj.attr(attr);
    }

    //如果使用show()/hide()會動態寫入 inline style, 造成CSRF !!
    public static show(obj: JQuery<HTMLElement>): void {
        obj.removeClass('d-none');
    }

    public static hide(obj: JQuery<HTMLElement>): void {
        obj.addClass('d-none');
    }

    //status可能傳入文字!!
    public static showByStatus(obj: JQuery<HTMLElement>, status: any): void {
        // Assuming _var.toBool is on a class named _Var
        if (_Var.toBool(status))
            _Obj.show(obj);
        else
            _Obj.hide(obj);
    }

    public static getData(obj: JQuery<HTMLElement>, fid: string): any {
        return obj.data(fid);
    }

    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    public static setData(obj: JQuery<HTMLElement>, fid: string, value: string): void {
        obj.attr('data-' + fid, value);
    }

    //傳回小寫tagName
    public static tagName(obj: JQuery<HTMLElement>): string {
        // Added null check for robustness, assuming the JQuery object contains elements
        return obj[0] ? obj[0].tagName.toLowerCase() : '';
    }

    //rename css class
    public static renameCss(obj: JQuery<HTMLElement>, oldCss: string, newCss: string): void {
        obj.removeClass(oldCss).addClass(newCss);
    }
} //class