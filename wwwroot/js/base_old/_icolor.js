
var _icolor = {

    init: function () {
        $('.xg-color').colorpicker({
            //component: true,
            /*
            onchange: function (me, color) {
                $(me).css('background-color', color.toHex());
            },
            */
        });
    },

    get: function (fid, form) {
        return _icolor.getO(_obj.get(fid, form));
    },
    //value by filter
    getF: function (filter, form) {
        return _icolor.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return _icolor.rgbToHex(obj.find('i').css('background-color'));
    },

    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    rgbToHex: function(rgb) {
        var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete (parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1)
                parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('');
    },

    /*
    onChange: function(me) {
        $(me).css('background-color', me.color.toHex());
    },
    */

    /*
    set: function (fid, value, form) {
        _itext.setO(_obj.get(fid, form), value)
    },
    setF: function (filter, value, form) {
        _itext.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },
    */

}; //class