export default class _Json {
    /**
     * add json object into another object
     * param {object} source source object
     * param {object} target target object
     * return {object}
     */
    /**
     * 轉換一筆json為多筆資料, 用於產生統計圖
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    static toChartRows(json: Record<string, any>, cols: string[]): Array<{
        Id: string;
        Num: any;
    }>;
    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    static copy(from: Record<string, any>, to?: Record<string, any>): Record<string, any>;
    /**
     * convert keyValues to json object
     * param keyValues {array} keyValue array
     * param keyId {string} key field id, default to 'Key'
     * param valueId {string} value field id, default to 'Value'
     * return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    static keyValuesToJson(keyValues: Record<string, any>[] | null, keyId?: string, valueId?: string): Record<string, any> | null;
    static toStr(json: any): string;
    static isEmpty(json: any): boolean;
    static notEmpty(json: any): boolean;
    static fidIsEmpty(json: any, fid: string): boolean;
    static fidNotEmpty(json: any, fid: string): boolean;
    static isKeyValue(value: any): boolean;
    static urlToJson(url: string): Record<string, string>;
    static strToArray(str: string): any;
    static findIndex(rows: Record<string, any>[] | null, fid: string, value: any): number;
    static filterRows(rows: Record<string, any>[] | null, fid: string, value: any): Record<string, any>[] | null;
    static appendRows(froms: any[] | null, tos: any[]): void;
    /**
     * (recursive) remove null for json object
     * param obj {json} by ref
     * param level {int} (default 0) debug purpose, base 0
     * return void
     */
    static removeNull(obj: any, level?: number): void;
}
