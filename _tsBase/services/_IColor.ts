import _Obj from "./_Obj";

export default class _IColor {

    static init(): void {
        // @ts-ignore: colorpicker is expected to be a jQuery plugin
        $('.x-color').colorpicker({
            //component: true,
            /*
            onchange: function (me, color) {
                $(me).css('background-color', color.toHex());
            },
            */
        });
    }

    static get(fid: string, form?: JQuery): string | null {
        // @ts-ignore: 'this' will be _IColor at runtime
        return this.getO(_Obj.get(fid, form));
    }
    //value by filter
    static getF(filter: string, form?: JQuery): string | null {
        // @ts-ignore: 'this' will be _IColor at runtime
        return this.getO(_Obj.getF(filter, form));
    }
    //value by object
    static getO(obj: JQuery | null): string | null {
        if (obj == null) return null;
        // @ts-ignore: 'this' will be _IColor at runtime
        return this.rgbToHex(obj.find('i').css('background-color'));
    }

    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    static rgbToHex(rgb: string): string {
        const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!parts) return rgb; // Return original if format doesn't match

        // delete (parts[0]); // Don't use delete on array index, use slice or shift if needed, but here we just ignore index 0 in the loop
        let hex = '';
        for (let i = 1; i <= 3; ++i) {
            // @ts-ignore: parts[i] is guaranteed to be a string of digits here
            let part = parseInt(parts[i]).toString(16);
            if (part.length == 1)
                part = '0' + part;
            hex += part;
        }
        return '#' + hex;
    }

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