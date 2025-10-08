import _Str from "./_Str";
export default class _File {
    /**
     * get file name by path
     * @param path The full or relative path to the file.
     * @returns The file name with extension.
     */
    static getFileName(path) {
        const sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _Str.getTail(path, sep);
    }
    /**
     * get file ext without '.' in lowerCase, ex: txt
     * @param path The full or relative path to the file.
     * @returns The file extension in lowercase without the dot.
     */
    static getFileExt(path) {
        // Assuming _Str.getTail(path, '.') returns the string after the last dot.
        return _Str.getTail(path, '.').toLowerCase();
    }
    /**
     * Checks if the extension is a common image extension.
     * @param ext The file extension (without dot).
     * @returns True if it's a known image extension.
     */
    static isImageExt(ext) {
        // Ensure the input extension is lowercased for comparison
        const lowerExt = ext.toLowerCase();
        return (",jpg,jpeg,png,gif,tif,tiff,").indexOf("," + lowerExt + ",") >= 0;
    }
    /**
     * Checks if the extension is a common Excel extension.
     * @param ext The file extension (without dot).
     * @returns True if it's a known Excel extension.
     */
    static isExcelExt(ext) {
        // Ensure the input extension is lowercased for comparison
        const lowerExt = ext.toLowerCase();
        return (",xls,xlsx,").indexOf("," + lowerExt + ",") >= 0;
    }
} //class
//# sourceMappingURL=../../../map/_tsBase/services/_File.js.map