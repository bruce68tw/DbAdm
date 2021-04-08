
//擴充_ibase屬性, 使用jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
var _itext = $.extend({}, _ibase, {

    //add input mask
    //use jquery maskedinput
    mask: function (box) {
        var filter = "[data-mask!='']";
        _obj.getF(filter, box).each(function () {
            var me = $(this);
            me.mask(me.data('mask'));
        });
    },

}); //class
