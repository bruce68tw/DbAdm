
//button
var _btn = {

    //setEditO -> setEdit
    setEdit: function (obj, status) {
        obj.prop('disabled', !status);
    },
    /*
    setEdit: function (id, status, box) {
        //use _obj.getById() !!
        _btn.setEdit(_obj.getById(id, box), status);
    },
    setEditF: function (ft, status, box) {
        _btn.setEdit(_obj.getByFt(ft, box), status);
    },
    */

}; //class