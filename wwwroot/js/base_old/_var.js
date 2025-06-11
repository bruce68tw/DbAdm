
var _var = {

    emptyToValue: function (var1, value) {
        return _str.isEmpty(var1) ? value : var1;
    },

    //variables is empty or not
    isEmpty: function (var1) {
        return (var1 === undefined || var1 === null)
    },
    
    notEmpty: function (var1) {
        return !_var.isEmpty(var1);
    },

    //check not object、array
    isPureData: function (value) {
        return (typeof value !== 'object' && !Array.isArray(value));
    },

};