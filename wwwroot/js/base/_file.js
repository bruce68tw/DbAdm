
var _file = {

    /**
     * get file name by path
     */ 
    getFileName: function (path) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _str.getTail(path, sep);
    },

    /**
     * get file ext without '.'
     */
    getFileExt: function (path) {
        return _str.getTail(path, '.');
    },


};//class