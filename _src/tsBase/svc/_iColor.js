import _Obj from './_Obj';
//不繼承 iBase
//bootstrap-colorpicker 支援到 bootstrap4, 若要用此功能可改用其他元件
export default class _iColor {
    /*
    static init(): void {
        $('.x-color').colorpicker({
            //component: true,
            //onchange: function (me, color) {
            //    $(me).css('background-color', color.toHex());
            //},
        });
    }
    */
    static get(fid, form) {
        return _iColor.getO(_Obj.get(fid, form));
    }
    //value by filter
    static getF(filter, form) {
        return _iColor.getO(_Obj.getByFt(filter, form));
    }
    //value by object
    static getO(obj) {
        return _iColor.rgbToHex(obj.find('i').css('background-color') || '');
    }
    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    static rgbToHex(rgb) {
        const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!parts) {
            return '';
        }
        const hexParts = [];
        for (let i = 1; i <= 3; ++i) {
            let part = parseInt(parts[i], 10).toString(16);
            if (part.length === 1) {
                part = '0' + part;
            }
            hexParts.push(part);
        }
        return '#' + hexParts.join('');
    }
}
