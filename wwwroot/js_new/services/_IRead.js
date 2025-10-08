import _Obj from "./_Obj";
//label
export default class _IRead {
    //value by fid
    static get(fid, form) {
        return _IRead.getO(_Obj.get(fid, form));
    }
    //value by filter
    static getF(filter, form) {
        return _IRead.getO(_Obj.getF(filter, form));
    }
    //value by object
    static getO(obj) {
        return obj.text();
    }
    static set(fid, value, form) {
        _IRead.setO(_Obj.get(fid, form), value);
    }
    static setF(filter, value, form) {
        _IRead.setO(_Obj.getF(filter, form), value);
    }
    static setO(obj, value) {
        obj.text(value);
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_IRead.js.map