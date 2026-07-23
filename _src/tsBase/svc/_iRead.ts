//唯讀文字欄位, 不繼承 _iBase, 欄位型態為 string
class _iRead {
    //value by fid
    static get(fid: string, box: JQuery): string {
        return this.getO(_Obj.get(fid, box));
    }

    //value by filter
    static getF(filter: string, box: JQuery): string {
        return this.getO(_Obj.getByFt(filter, box));
    }

    //value by object
    static getO(obj: JQuery): string {
        return obj.text();
    }

    static set(fid: string, value: string, box: JQuery) {
        this.setO(_Obj.get(fid, box), value);
    }

    static setF(filter: string, value: string, box: JQuery) {
        this.setO(_Obj.getByFt(filter, box), value);
    }

    static setO(obj: JQuery, value: string) {
        obj.text(value);
        //obj.text(value);    //for XiRead
    }
}
window._iRead = _iRead;