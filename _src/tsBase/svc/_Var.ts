//處理變數
class _Var {
    static preZero(len: number, value: string | number): string {
        return String(value).padStart(len, '0');
    }

    static emptyToValue(var1: any, value: any): any {
        return _Var.isEmpty(var1) ? value : var1;
    }

    // variables is empty or not
    static isEmpty(var1: any): boolean {
        return (var1 === undefined || var1 === null || var1 === '');
    }

    static notEmpty(var1: any): boolean {
        return !_Var.isEmpty(var1);
    }

    static isStr(var1: any): boolean {
        return (typeof var1 === 'string');
    }

    // check not object、array
    static isPureData(value: any): boolean {
        return (typeof value !== 'object' && !Array.isArray(value));
    }

    // 使用 == 模型比對即可 !!
    static toBool(val: any): boolean {
        return (val == '1' || val == true || val == 'True');
    }

    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    /*
    static default(val: StrNum, defVal: StrNum): StrNum {
        return (val == null) ? defVal : val;
    }

    static hasValue(obj: StrNum): boolean {
        return !(obj == null);
    }
    */
}
window._Var = _Var;