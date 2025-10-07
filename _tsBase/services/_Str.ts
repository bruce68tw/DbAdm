import _Var from "./_Var";

export default class _Str {

    //column seperator
    static readonly colSep: string = '@@';

    //variables is empty or not
    static isEmpty(str: StrN): boolean {
        return (str === undefined || str === null || str === '');
    }

    static notEmpty(str: StrN): boolean {
        return !_Str.isEmpty(str);
    }

    //convert empty string to new string
    static emptyToStr(str: StrN, newStr: string): string {
        return _Str.isEmpty(str) ? newStr : str as string;
    }

    /**
     * format string like c# String.Format()
     * The first argument is the format string, subsequent arguments are values to insert.
     */
    static format(...args: any[]): string {
        let str = args[0] as string;
        for (let i = 0; i < args.length - 1; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, args[i + 1]);
        }
        return str;
    }

    //get mid part string
    static getMid(str: string, find1: string, find2: string): string {
        if (_Str.isEmpty(str))
            return '';
        const pos = str.indexOf(find1);
        if (pos < 0)
            return str;
        const pos2 = str.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? str.substring(pos + find1.length)
            : str.substring(pos + find1.length, pos2);
    }

    //get tail part string
    static getTail(value: string, find: string): string {
        const pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    }

    static toBool(val: any): boolean {
        //return (val === '1' || val === true || val === 'True');
        // Assuming _var.toBool is on a class named _Var
        return _Var.toBool(val);
    }

    /**
     * 合併多個欄位成為字串??
     * The first argument is the initial string, subsequent arguments are appended with colSep.
     */
    static colsToStr(...args: string[]): string {
        let str = args[0];
        for (let i = 1; i < args.length; i++)
            str += _Str.colSep + args[i];
        return str;
    }

    static trim(str: string): string {
        return str.trim();
    }

    static toJson(str: string): any | null {
        try {
            return JSON.parse(str);
        } catch (error) {
            //console.log("JSON.parse failed");
            return null;
        }
    }

    static replaceAll(str: string, oldStr: string, newStr: string): string {
        // 轉義特殊字元，避免錯誤正則
        const oldStr2 = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(oldStr2, 'g');
        return str.replace(regex, newStr);
    }
} //class