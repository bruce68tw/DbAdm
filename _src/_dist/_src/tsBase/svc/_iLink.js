import _Obj from './_Obj';
//不繼承 _iBase
export default class _iLink {
    //value by fid
    static get(fid, form) {
        return this.getO(_Obj.get(fid, form));
    }
    //value by object
    static getO(obj) {
        return obj.text();
    }
    static set(fid, value, form) {
        this.setO(_Obj.get(fid, form), value);
    }
    static setO(obj, value) {
        obj.text(value);
    }
}
