
var _modal = {

    show: function (id) {
        $('#' + id).modal('show');
    },
    hide: function (id) {
        $('#' + id).modal('hide');
    },
    showO: function (obj) {
        obj.modal('show');
    },
    hideO: function (obj) {
        obj.modal('hide');
    },
    showF: function (filter) {
        $(filter).modal('show');
    },
    hideF: function (filter) {
        $(filter).modal('hide');
    },

};//class