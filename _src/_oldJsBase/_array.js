
var _array = {

    /**
     * find array
     * param ary {array}
     * param id {int/string} find value
     * return {int} -1(not found), n
     */ 
    find: function (ary, id) {
        if (ary == null)
            return -1;

        for (var i = 0; i < ary.length; i++) {
            if (ary[i] == id)
                return i;
        }
        return -1;
    },

    /**
     * convert array to string with seperator
     * param ary {array} source array
     * param sep {string} seperator, default to ','
     * retrun {string} ex: '1,2,3'
     */ 
    toStr: function (ary, sep) {
        sep = sep || ',';
        return ary.join(sep);
    },

    isEmpty: function (ary) {
        return (ary == null || ary.length == 0);
    },

    notEmpty: function (ary) {
        return !_array.isEmpty(ary);
    },
};//class