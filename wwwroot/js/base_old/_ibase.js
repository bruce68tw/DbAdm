
//base class of all input field
//must loaded first, or will got error !!
var _ibase = {

    //get value by fid
    get: function (fid, box) {
        return _ibase.getO(_obj.get(fid, box));
    },
    //get value by filter
    getF: function (ft, box) {
        return _ibase.getO(_obj.getF(ft, box));
    },
    /*
    //get value by name
    getN: function (fid, box) {
        return _ibase.getO(_obj.getN(fid, box));
    },
    */
    //get value by object
    getO: function (obj) {
        return obj.val();
    },

    //get input border for show red border
    //default return this, drive class could rewrite.
    getBorder: function (obj) {
        return obj;
    },

    //set value
    set: function (fid, value, box) {
        _ibase.setO(_obj.get(fid, box), value)
    },
    setF: function (ft, value, box) {
        _ibase.setO(_obj.getF(ft, box), value)
    },
    /*
    setN: function (fid, value, box) {
        _ibase.setO(_obj.getN(fid, box), value)
    },
    */
    setO: function (obj, value) {
        obj.val(value);
    },

    //set edit status
    setEdit: function (fid, status, box) {
        _ibase.setEditO(_obj.get(fid, box), status);
    },
    setEditF: function (ft, status, box) {
        _ibase.setEditO(_obj.getF(ft, box), status);
    },
    /*
    setEditN: function (fid, status, box) {
        _ibase.setEditO(_obj.getN(fid, box), status);
    },
    */
    setEditO: function (obj, status) {
        obj.prop('readonly', !status);
    },

};//class