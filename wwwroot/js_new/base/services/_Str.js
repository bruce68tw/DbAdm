import _Var from "./_Var";
class _Str {
    //variables is empty or not
    static isEmpty(str) {
        return (str === undefined || str === null || str === '');
    }
    static notEmpty(str) {
        return !_Str.isEmpty(str);
    }
    //convert empty string to new string
    static emptyToStr(str, newStr) {
        return _Str.isEmpty(str) ? newStr : str;
    }
    /**
     * format string like c# String.Format()
     * The first argument is the format string, subsequent arguments are values to insert.
     */
    static format(...args) {
        let str = args[0];
        for (let i = 0; i < args.length - 1; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, args[i + 1]);
        }
        return str;
    }
    //get mid part string
    static getMid(str, find1, find2) {
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
    static getTail(value, find) {
        const pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    }
    static toBool(val) {
        //return (val === '1' || val === true || val === 'True');
        // Assuming _var.toBool is on a class named _Var
        return _Var.toBool(val);
    }
    /**
     * 合併多個欄位成為字串??
     * The first argument is the initial string, subsequent arguments are appended with colSep.
     */
    static colsToStr(...args) {
        let str = args[0];
        for (let i = 1; i < args.length; i++)
            str += _Str.colSep + args[i];
        return str;
    }
    static trim(str) {
        return str.trim();
    }
    static toJson(str) {
        try {
            return JSON.parse(str);
        }
        catch (error) {
            //console.log("JSON.parse failed");
            return null;
        }
    }
    static replaceAll(str, oldStr, newStr) {
        // 轉義特殊字元，避免錯誤正則
        const oldStr2 = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(oldStr2, 'g');
        return str.replace(regex, newStr);
    }
} //class
//column seperator
_Str.colSep = '@@';
export default _Str;
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Str.js.map