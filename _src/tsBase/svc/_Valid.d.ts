export default class _Valid {
    /**
     * initial jQuery Validation
     * @param form form object
     * @returns validator object
     */
    static init(form: any): any;
    /**
     * 使用 jquery validation方式顯示錯誤, 通知由後端傳回錯誤, 再前端顯示
     * @param fid field id
     * @param msg error msg
     * @param eformId (optional for 多筆) 若為多筆則必須配合rowId找到fid
     * @param rowId (optional for 多筆) row Id valud
     */
    static showError(fid: string, msg: string, eformId?: string, rowId?: string): void;
    private static _getBox;
    /**
     * get error object
     * @param obj input object
     */
    private static _getError;
}
