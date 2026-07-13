import _Var from './_Var';

export default class _Str {
    // column separator
    static readonly colSep: string = '@@';

    /**
     * 前端儲存檔案
     * param str {string} 檔案內容
     * param fileName {string} 下載的檔名
     */
    static saveFile(str: string, fileName: string): void {
        const blob = new Blob([str], { type: "application/json" });

        // create link & trigger click
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }

    // variables is empty or not
    static isEmpty(str: StrN): boolean {
        return (str === undefined || str === null || str === '');
    }

    static notEmpty(str: StrN): boolean {
        return !_Str.isEmpty(str);
    }

    // convert empty string to new string
    static emptyToStr(str: StrN, newStr: string): string {
        return _Str.isEmpty(str) ? newStr : (str as string);
    }

    // format string like c# String.Format()
    static format(formatStr: string, ...args: any[]): string {
        let str = formatStr;
        for (let i = 0; i < args.length; i++) {
            const reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, args[i]);
        }
        return str;
    }

    // get mid part string
    static getMid(str: StrN, find1: string, find2: string): string {
        if (_Str.isEmpty(str))
            return '';
        
        const currentStr = str as string;
        const pos = currentStr.indexOf(find1);
        if (pos < 0)
            return currentStr;
        const pos2 = currentStr.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? currentStr.substring(pos + find1.length)
            : currentStr.substring(pos + find1.length, pos2);
    }

    // get tail part string
    static getTail(value: string, find: string): string {
        const pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    }

    static toBool(val: any): boolean {
        return _Var.toBool(val);
    }

    // 合併多個欄位成為字串
    static colsToStr(firstCol: string, ...args: string[]): string {
        let str = firstCol;
        for (let i = 0; i < args.length; i++)
            str += _Str.colSep + args[i];
        return str;
    }

    static trim(str: string): string {
        return str.trim();
    }

    static toJson(str: string): any {
        try {
            return JSON.parse(str);
        } catch (error) {
            return null;
        }
    }

    static replaceAll(str: string, oldStr: string, newStr: string): string {
        // 轉義特殊字元，避免錯誤正則
        const oldStr2 = oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(oldStr2, 'g');
        return str.replace(regex, newStr);
    }
}