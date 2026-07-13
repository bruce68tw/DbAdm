export default class _Str {
    static readonly colSep: string;
    /**
     * 前端儲存檔案
     * param str {string} 檔案內容
     * param fileName {string} 下載的檔名
     */
    static saveFile(str: string, fileName: string): void;
    static isEmpty(str: StrN): boolean;
    static notEmpty(str: StrN): boolean;
    static emptyToStr(str: StrN, newStr: string): string;
    static format(formatStr: string, ...args: any[]): string;
    static getMid(str: StrN, find1: string, find2: string): string;
    static getTail(value: string, find: string): string;
    static toBool(val: any): boolean;
    static colsToStr(firstCol: string, ...args: string[]): string;
    static trim(str: string): string;
    static toJson(str: string): any;
    static replaceAll(str: string, oldStr: string, newStr: string): string;
}
