
var _var = {
    preZero: function (len, value) {
        return String(value).padStart(len, '0');
    },

    emptyToValue: function (var1, value) {
        return _str.isEmpty(var1) ? value : var1;
    },

    //variables is empty or not
    isEmpty: function (var1) {
        return (var1 === undefined || var1 === null || var1 === '');
    },

    isStr: function (var1) {
        return (typeof var1 == 'string');
    },

    notEmpty: function (var1) {
        return !_var.isEmpty(var1);
    },

    //check not object、array
    isPureData: function (value) {
        return (typeof value !== 'object' && !Array.isArray(value));
    },

    //使用 == 模型比對即可 !!
    toBool: function (val) {
        return (val == '1' || val == true || val == 'True');
    },
};