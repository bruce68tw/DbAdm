
//link file
var _ilinkFile = {

    //value by fid
    get: function (fid, form) {
        return _ilinkFile.getO(_obj.get(fid, form));   //use data-fid
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },
    set: function (fid, value, form) {
        _ilinkFile.setO(_obj.get(fid, form), value);   //use data-fid
    },
    setO: function (obj, value) {
        obj.text(value);
    },

}; //class