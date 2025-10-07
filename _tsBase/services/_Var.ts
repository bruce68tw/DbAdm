import _Str from "./_Str";

export default class _Var {

    public static emptyToValue(var1: any, value: any): any {
        return _Str.isEmpty(var1) ? value : var1;
    }

    //variables is empty or not
    public static isEmpty(var1: any): boolean {
        return (var1 === undefined || var1 === null);
    }
    
    public static notEmpty(var1: any): boolean {
        return !_Var.isEmpty(var1);
    }

    //check not object、array
    public static isPureData(value: any): boolean {
        return (typeof value !== 'object' && !Array.isArray(value));
    }

    //使用 == 模型比對即可 !!
    public static toBool(val: any): boolean {
        return (val == '1' || val == true || val == 'True');
    }
}