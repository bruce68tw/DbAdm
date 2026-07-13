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
   
    static get(fid: string, form?: JQuery): string {
        return _iColor.getO(_Obj.get(fid, form));
    }

    //value by filter
    static getF(filter: string, form?: JQuery): string {
        return _iColor.getO(_Obj.getByFt(filter, form));
    }

    //value by object
    static getO(obj: JQuery): string {
        return _iColor.rgbToHex(obj.find('i').css('background-color') || '');
    }

    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    static rgbToHex(rgb: string): string {
        const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!parts) {
            return '';
        }
        
        const hexParts: string[] = [];
        for (let i = 1; i <= 3; ++i) {
            let part = parseInt(parts[i], 10).toString(16);
            if (part.length === 1) {
                part = '0' + part;
            }
            hexParts.push(part);
        }
        return '#' + hexParts.join('');
    }

    /*
    onChange: function(me) {
        $(me).css('background-color', me.color.toHex());
    },
    */

    /*
    set: function (fid, value, form) {
        _iText.setO(_Obj.get(fid, form), value)
    },
    setF: function (filter, value, form) {
        _iText.setO(_Obj.getByFt(filter, form), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },
    */
}