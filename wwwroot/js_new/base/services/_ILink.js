// @ts-nocheck
import _Obj from "./_Obj";
/**
 * //link file
 */
export default class _ILink {
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
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_ILink.js.map