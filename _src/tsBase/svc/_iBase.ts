//輸入欄位的基底, 預設欄位值型態為 string, 子代視需要轉型別
class _iBase {
    /**
     * get value by fid
     * param fid {string}
     * param box {object}
     * return {string}
     */
    static get(fid: string, box: JQuery): string {
        return this.getO(_Obj.get(fid, box));
    }

    //get value by object
    static getO(obj: JQuery): string {
        return (obj == null) ? '' : obj.val() as string;
    }

    /*
    //??get value by id(#id)
    static getD(id: string, box: JQuery): string {
        return this.getO(_Obj.getById(id, box));
    }

    //get value by filter
    static getF(ft: string, box: JQuery): string {
        return this.getO(_Obj.getByFt(ft, box));
    }
    */

    //set value, set -> setF -> setO
    static set(fid: string, value: string, box: JQuery) {
        this.setO(_Obj.get(fid, box), value);
    }

    static setO(obj: JQuery, value: string) {
        obj.val(value);
    }

    /*
    static setD(id: string, value: string, box: JQuery) {
        this.setO(_Obj.getById(id, box), value);
    }

    static setF(ft: string, value: string, box: JQuery) {
        this.setO(_Obj.getByFt(ft, box), value);
    }
    */

    //?? get input border for show red border
    //default return this, drive class could rewrite.
    static getBorder(obj: JQuery): JQuery {
        return obj;
    }

    //set edit status
    static setEdit(fid: string, status: boolean, box: JQuery) {
        this.setEditO(_Obj.get(fid, box), status);
    }

    static setEditO(obj: JQuery, status: boolean) {
        obj.prop('readonly', !status);
    }
}
window._iBase = _iBase;