
//base class of all input field, use 'this' instead of '_ibase'
//must loaded first, or will got error !!
var _ibase = {

    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string}
     */ 
    get: function (fid, box) {
        return this.getO(_obj.get(fid, box));
    },
    //get value by filter
    getF: function (ft, box) {
        return this.getO(_obj.getF(ft, box));
    },
    //get value by object
    getO: function (obj) {
        return obj.val();
    },

    //get input border for show red border
    //default return this, drive class could rewrite.
    getBorder: function (obj) {
        return obj;
    },

    //set value, set -> setF -> setO
    set: function (fid, value, box) {
        this.setO(_obj.get(fid, box), value)
    },
    setF: function (ft, value, box) {
        this.setO(_obj.getF(ft, box), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },

    //set edit status
    setEdit: function (fid, status, box) {
        this.setEditO(_obj.get(fid, box), status);
    },
    setEditF: function (ft, status, box) {
        this.setEditO(_obj.getF(ft, box), status);
    },
    setEditO: function (obj, status) {
        obj.prop('readonly', !status);
    },

};//class