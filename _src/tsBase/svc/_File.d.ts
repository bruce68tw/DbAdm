export default class _File {
    /**
     * get file name by path
     */
    static getFileName(path: string): string;
    /**
     * get file ext without '.' in lowerCase, ex: txt
     */
    static getFileExt(path: string): string;
    static isImageExt(ext: string): boolean;
    static isExcelExt(ext: string): boolean;
}
