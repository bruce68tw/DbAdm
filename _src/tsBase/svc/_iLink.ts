//不繼承 _iBase
class _iLink {
    //value by fid
    static get(fid: string, form?: JQuery): string {
        return this.getO(_Obj.get(fid, form));
    }
    
    //value by object
    static getO(obj: JQuery): string {
        return obj.text();
    }

    static set(fid: string, value: string, form?: JQuery) {
        this.setO(_Obj.get(fid, form), value);
    }
    
    static setO(obj: JQuery, value: string) {
        obj.text(value);
    }
}
window._iLink = _iLink;