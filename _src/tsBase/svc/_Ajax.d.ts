export default class _Ajax {
    /** * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    static getJsonA(url: string, data: Json, fnOk?: (res: Json) => void, block?: boolean): Promise<Json>;
    static getJsonsA(url: string, data: Json, fnOk?: (res: Json[]) => void, block?: boolean): Promise<Json[]>;
    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    static getJsonByFdA(url: string, data: FormData, fnOk?: (res: Json) => void, block?: boolean): Promise<Json>;
    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/string}
     */
    static getStrA(url: string, data: Json, fnOk?: (res: string) => void, block?: boolean): Promise<string>;
    static getIntA(url: string, data: Json, fnOk?: (res: number) => void, block?: boolean): Promise<number>;
    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/html string}
     */
    static getViewA(url: string, data: Json, fnOk?: (res: string) => void, block?: boolean): Promise<string>;
    /**
     * 使用fetch, 將來考慮取代jquery ajax
     * GET ok, 但是 POST 有問題(所以用GET) !!
     * param url {string} action url
     * param data {json} 傳入參數
     * param elm {element} 如果是XiFile欄位則此參數為必要
     * param fnOk {function} 目前無作用
     * return {file/string(錯誤訊息)/空白(檔案不存在)}
     */
    static getFileA(url: string, data: Json, elm?: Elm, fnOk?: (res: any) => void): Promise<void>;
    /**
     * ajax call(private), only return success info(include custom message)
     * 使用 async/await 傳回值 for caller 判斷執行結果是否成功
     * param json {json} ajax json
     * param fnOk {function} (optional) callback function
     * //param fnError {function} (optional) callback function
     * param block {bool/object} block ui or not, default true
     * //如果要block modal, 必須傳入 modal object !!
     * return {bool/json/any} ResultDto return null when error
     * bool: fnOk not empty, return false when error
     * json/any: fnOk is empty, return null when error
     */
    private static _rpcA;
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    private static _isBrError;
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    static resultToErrMsg(result: any): string;
    /**
     * result string to error msg if any
     */
    static strToErrMsg(str: string): string;
}
