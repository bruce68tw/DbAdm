export default class _Fun {
    static readonly MmDateFmt = "YYYY/MM/DD";
    static readonly MmDtFmt = "YYYY/MM/DD HH:mm:ss";
    static readonly FidErrorMsg = "_ErrorMsg";
    static readonly PreBrError = "B:";
    static readonly CssFlag = "x-flag";
    static readonly HideRwd = "x-hide-rwd";
    static userId: string;
    static locale: string;
    static maxFileSize: number;
    static isRwd: boolean;
    static pageRows: number;
    static nowDom: any;
    static lengthMenu: number[];
    static jwtToken: string;
    static data: Json;
    static dtColDef: any;
    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    static init(locale: string): void;
    static onHelloA(): Promise<void>;
    static getMe(): JQuery;
    static getMeElm(): Elm;
    static getMeValue(): any;
    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} eventName name(不含on)
     */
    static setEvent(box: JQuery, eventName: string): void;
    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    static default(val: StrNum, defVal: StrNum): StrNum;
    static hasValue(obj: StrNum): boolean;
    static block(obj?: JQuery): void;
    static unBlock(obj?: JQuery): void;
}
