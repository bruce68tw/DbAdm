import _Obj from "./_Obj";

// 假設 'QRCode' 和 'QRCode.CorrectLevel' 是全域變數或從外部庫導入，
// 並且它們的類型定義（例如 @types/qrcodejs）已存在。
// 為了避免編譯錯誤，我們假設 QRCode 是一個型別，並且在其上定義了 CorrectLevel。
// 注意：QRCode 庫本身不是 ES module，這裡假設已透過 script 標籤載入，
// 或是已存在一個定義了其結構的 .d.ts 檔案。

declare var QRCode: any;

//https://github.com/davidshimjs/qrcodejs
export default class _Qrcode {

    public static set(id: string, box: JQuery<HTMLElement>, url: string, width?: number): any {
        const obj = _Obj.getById(id, box);
        // 確保找到元素，否則 setO 會失敗
        if (obj === null) {
            console.error(`_Qrcode.set: Could not find element with id: ${id}`);
            return null;
        }
        return _Qrcode.setO(obj, url, width);
    }

    public static setO(obj: JQuery<HTMLElement>, url: string, width?: number): any {
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

}//class