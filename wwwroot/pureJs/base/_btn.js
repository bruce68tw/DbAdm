
//button
var _btn = {

    setEdit: function (id, status, box) {
        //use _obj.getById() !!
        _btn.setEditO(_obj.getById(id, box), status);
    },
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    setEditF: function (ft, status, box) {
        _btn.setEditO(_obj.getF(ft, box), status);
    },

}; //class