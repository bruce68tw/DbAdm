import _Str from "./_Str";
export default class _Var {
    static emptyToValue(var1, value) {
        return _Str.isEmpty(var1) ? value : var1;
    }
    //variables is empty or not
    static isEmpty(var1) {
        return (var1 === undefined || var1 === null);
    }
    static notEmpty(var1) {
        return !_Var.isEmpty(var1);
    }
    //check not object、array
    static isPureData(value) {
        return (typeof value !== 'object' && !Array.isArray(value));
    }
    //使用 == 模型比對即可 !!
    static toBool(val) {
        return (val == '1' || val == true || val == 'True');
    }
}
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/_Var.js.map