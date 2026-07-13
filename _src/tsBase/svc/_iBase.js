import _Obj from './_Obj';
export default class _iBase {
    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string}
     */
    static get(fid, box) {
        return this.getO(_Obj.get(fid, box));
    }
    //get value by id
    static getD(id, box) {
        return this.getO(_Obj.getById(id, box));
    }
    //get value by filter
    static getF(ft, box) {
        return this.getO(_Obj.getByFt(ft, box));
    }
    //get value by object
    static getO(obj) {
        return obj == null ? null : obj.val();
    }
    //set value, set -> setF -> setO
    static set(fid, value, box) {
        this.setO(_Obj.get(fid, box), value);
    }
    static setD(id, value, box) {
        this.setO(_Obj.getById(id, box), value);
    }
    static setF(ft, value, box) {
        this.setO(_Obj.getByFt(ft, box), value);
    }
    static setO(obj, value) {
        obj.val(value);
    }
    //get input border for show red border
    //default return this, drive class could rewrite.
    static getBorder(obj) {
        return obj;
    }
    //set edit status
    static setEdit(fid, status, box) {
        this.setEditO(_Obj.get(fid, box), status);
    }
    static setEditO(obj, status) {
        obj.prop('readonly', !status);
    }
}
