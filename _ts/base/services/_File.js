"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Str_1 = require("./_Str");
var _File = /** @class */ (function () {
    function _File() {
    }
    /**
     * get file name by path
     * @param path The full or relative path to the file.
     * @returns The file name with extension.
     */
    _File.getFileName = function (path) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _Str_1.default.getTail(path, sep);
    };
    /**
     * get file ext without '.' in lowerCase, ex: txt
     * @param path The full or relative path to the file.
     * @returns The file extension in lowercase without the dot.
     */
    _File.getFileExt = function (path) {
        // Assuming _Str.getTail(path, '.') returns the string after the last dot.
        return _Str_1.default.getTail(path, '.').toLowerCase();
    };
    /**
     * Checks if the extension is a common image extension.
     * @param ext The file extension (without dot).
     * @returns True if it's a known image extension.
     */
    _File.isImageExt = function (ext) {
        // Ensure the input extension is lowercased for comparison
        var lowerExt = ext.toLowerCase();
        return (",jpg,jpeg,png,gif,tif,tiff,").indexOf("," + lowerExt + ",") >= 0;
    };
    /**
     * Checks if the extension is a common Excel extension.
     * @param ext The file extension (without dot).
     * @returns True if it's a known Excel extension.
     */
    _File.isExcelExt = function (ext) {
        // Ensure the input extension is lowercased for comparison
        var lowerExt = ext.toLowerCase();
        return (",xls,xlsx,").indexOf("," + lowerExt + ",") >= 0;
    };
    return _File;
}()); //class
exports.default = _File;
