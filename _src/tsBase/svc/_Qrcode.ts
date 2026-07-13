import _Obj from './_Obj';

//todo
declare const QRCode: any;

//https://github.com/davidshimjs/qrcodejs
export default class _Qrcode {

    static set(id: string, box: any, url: string, width?: number): any {
        return _Qrcode.setO(_Obj.getById(id, box), url, width);
    }

    static setO(obj: any, url: string, width?: number): any {
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