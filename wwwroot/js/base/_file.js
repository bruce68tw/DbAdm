
var _file = {

    /**
     * get file name by path
     */ 
    getFileName: function (path) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _str.getTail(path, sep);
    },

    /**
     * get file ext without '.' in lowerCase, ex: txt
     */
    getFileExt: function (path) {
        return _str.getTail(path, '.').toLowerCase();
    },

    isImageExt: function (ext) {
        return (",jpg,jpeg,png,gif,tif,tiff,").indexOf("," + ext + ",") >= 0;
    }
};//class