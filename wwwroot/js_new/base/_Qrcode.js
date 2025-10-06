import _Obj from "./_Obj";
//https://github.com/davidshimjs/qrcodejs
export default class _Qrcode {
    static set(id, box, url, width) {
        const obj = _Obj.getById(id, box);
        // 確保找到元素，否則 setO 會失敗
        if (obj === null) {
            console.error(`_Qrcode.set: Could not find element with id: ${id}`);
            return null;
        }
        return _Qrcode.setO(obj, url, width);
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
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/_Qrcode.js.map