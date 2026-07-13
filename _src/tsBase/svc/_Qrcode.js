import _Obj from './_Obj';
//https://github.com/davidshimjs/qrcodejs
export default class _Qrcode {
    static set(id, box, url, width) {
        return _Qrcode.setO(_Obj.getById(id, box), url, width);
    }
    static setO(obj, url, width) {
        const qrWidth = width || 128;
        //return new QRCode(document.getElementById(id), {
        return new QRCode(obj[0], {
            text: url,
            width: qrWidth,
            height: qrWidth,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}
