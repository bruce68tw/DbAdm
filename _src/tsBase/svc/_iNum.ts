//數值欄位
class _iNum extends _iBase {
    //額外提供函數傳回number
    static get2(fid: string, box: JQuery): number {
        return this.getO2(_Obj.get(fid, box));
    }

    //get value by object
    static getO2(obj: JQuery): number {
        const value = _iBase.getO(obj);
        return _Str.isEmpty(value) ? 0 : Number(value);
    }

}
window._iNum = _iNum;
