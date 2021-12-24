
//link file
var _ilink = {

    //value by fid
    get: function (fid, form) {
        return this.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },

    set: function (fid, value, form) {
        this.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class