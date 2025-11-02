
//label
var _iread = {

    //value by fid
    get: function (fid, form) {
        return _iread.getO(_obj.get(fid, form));
    },
    //value by filter
    getF: function (filter, form) {
        return _iread.getO(_obj.getByFt(filter, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        _iread.setO(_obj.get(fid, form), value);
    },
    setF: function (filter, value, form) {
        _iread.setO(_obj.getByFt(filter, form), value)
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class