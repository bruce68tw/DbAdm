import _Obj from "./_Obj";

//label
export default class _IRead {

    //value by fid
    public static get(fid: string, form: any): string {
        return _IRead.getO(_Obj.get(fid, form));
    }
    //value by filter
    public static getF(filter: string, form: any): string {
        return _IRead.getO(_Obj.getF(filter, form));
    }
    //value by object
    public static getO(obj: any): string {
        return obj.text();
    }
    public static set(fid: string, value: string, form: any): void {
        _IRead.setO(_Obj.get(fid, form), value);
    }
    public static setF(filter: string, value: string, form: any): void {
        _IRead.setO(_Obj.getF(filter, form), value)
    }
    public static setO(obj: any, value: string): void {
        obj.text(value);
    }

} //class