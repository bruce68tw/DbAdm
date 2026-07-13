export default class _Log {
    /**
     * @description 記錄程式時間功能的變數
     */
    static _start: any;
    static _now: any;
    static info(msg: any): void;
    static error(msg: any): void;
    /**
     * @description 初始化記錄程式時間功能
     */
    static logTimeInit(name?: string): void;
    /**
     * @description 記錄程式執行時花用的時間
     */
    static logTime(name: string): void;
}
