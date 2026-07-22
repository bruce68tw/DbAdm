
//https://github.com/davidshimjs/qrcodejs
var _qrcode = {

    set: function (id, box, url, width) {
        return _qrcode.setO(_obj.getById(id, box), url, width);
    },
    setO: function (obj, url, width) {
        width = width || 128;

        //return new QRCode(document.getElementById(id), {
        return new QRCode(obj[0], {
            text: url,
            width: width,
            height: width,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },

};//class