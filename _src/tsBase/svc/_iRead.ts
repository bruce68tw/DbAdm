//不繼承 _iBase
class _iRead {
    //value by fid
    static get(fid: string, form?: JQuery): string {
        return this.getO(_Obj.get(fid, form));
    }

    //value by filter
    static getF(filter: string, form?: JQuery): string {
        return this.getO(_Obj.getByFt(filter, form));
    }

    //value by object
    static getO(obj: JQuery): string {
        return obj.text();
    }

    static set(fid: string, value: string | number, form?: JQuery): void {
        this.setO(_Obj.get(fid, form), value);
    }

    static setF(filter: string, value: string | number, form?: JQuery): void {
        this.setO(_Obj.getByFt(filter, form), value);
    }

    static setO(obj: JQuery, value: string | number): void {
        obj.text(value);
        obj.text(value);    //for XiRead
    }
}
window._iRead = _iRead;