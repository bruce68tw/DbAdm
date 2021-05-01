
//label
var _iread = {

    //value by fid
    get: function (fid, form) {
        return _iread.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by filter
    getF: function (filter, form) {
        return _iread.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        _iread.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setF: function (filter, value, form) {
        _iread.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class