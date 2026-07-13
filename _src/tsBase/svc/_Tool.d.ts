export default class _Tool {
    static readonly FltMsgText: string;
    static ansStatus: boolean;
    static fnResolve: ((value: boolean) => void) | null;
    static xMsg: any;
    static xAns: any;
    static xAnsA: any;
    static xAlert: any;
    static xArea: any;
    static xImage: any;
    static xWork: any;
    private static _fnOnMsgClose;
    private static _fnOnAnsYes;
    private static _fnOnAnsNo;
    private static _fnOnAreaYes;
    static init(): void;
    /**
     * show message box
     * @param msg html or string
     * @param fnClose callback function
     */
    static msg(msg: string, fnClose?: () => void): void;
    /**
     * show confirmation
     * @param msg
     * @param fnYes
     * @param fnNo
     */
    static ans(msg: string, fnYes?: () => void, fnNo?: () => void): void;
    /**
     * 非同步方式, 比callback function(promise)方便
     * show confirmation
     * @param msg
     * @return yes/no
     */
    static ansA(msg: string): Promise<boolean>;
    static onAnsA(value: string | number): void;
    /**
     * show alert(auto close), use bootstrap alert
     * @param msg
     * @param color default blue, R(red)
     */
    static alert(msg: string, color?: string): void;
    static showWait(): void;
    static hideWait(): void;
    /**
     * show textarea editor
     * @param title modal title
     * @param value textarea value
     * @param isEdit true:edit, false:readonly
     * @param fnOk function of onOk
     */
    static showArea(title: string, value: string, isEdit: boolean, fnOk?: (val: string) => void): void;
    static onAreaYes(): void;
    /**
     * show image modal
     * @param fileName image file name without path
     * @param imageSrc image src
     */
    static showImage(fileName: string, imageSrc: string): void;
    /**
     * onclick alert close button
     */
    static onAlertClose(): void;
    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    static onAnsYes(): void;
    static onAnsNo(): void;
    static onMsgClose(): void;
}
