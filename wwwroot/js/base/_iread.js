
//label
var _iread = {

    //value by fid
    get: function (fid, form) {
        return this.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by filter
    getF: function (filter, form) {
        return this.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        this.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setF: function (filter, value, form) {
        this.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class