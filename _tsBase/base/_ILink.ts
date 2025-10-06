// @ts-nocheck
import _Obj from "./_Obj";

/**
 * //link file
 */
export default class _ILink {

    //value by fid
    static get(fid: string, form: JQuery): string {
        return this.getO(_Obj.get(fid, form));
    }
    //value by object
    static getO(obj: JQuery): string {
        return obj.text();
    }

    static set(fid: string, value: string, form: JQuery): void {
        this.setO(_Obj.get(fid, form), value);
    }
    static setO(obj: JQuery, value: string): void {
        obj.text(value);
    }

} //class