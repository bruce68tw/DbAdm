import _iBase from './_iBase';
export default class _iFile extends _iBase {
    /**
     * get border object
     * param obj {object} input object
     */
    static getBorder(obj: JQuery): JQuery;
    static setO(obj: JQuery, value: string): void;
    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    static dataAddFile(data: FormData, fid: string, serverFid: string, box?: JQuery): boolean;
    static onOpenFile(): void;
    static onChangeFile(): void;
    static onDeleteFile(): void;
    static zz_init(fid: string, path: string, form?: JQuery): void;
    /**
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    private static _elmToBox;
    private static _elmToFile;
    private static _elmToObj;
    private static _elmToLink;
    /**
     * box get link object
     * param box {object} box object
     */
    private static _boxGetLink;
    private static _boxGetFile;
    private static _boxGetObj;
    static getUploadFile(fileObj: JQuery): File | null;
}
