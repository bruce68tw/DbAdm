
//input file
var _ifile = $.extend({}, _ibase, {

    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */ 
    getBorder: function (obj) {
        return obj.prev();
    },

    setO: function (obj, value) {
        obj.val(value);     //set hidden input value
        _ifile._getLink(_ifile.getBorder(obj)).text(value);  //set link show text
    },
    //=== overwrite end ===

    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    dataAddFile: function (data, fid, serverFid, box) {
        var obj = _obj.get(fid, box);
        var file = _ifile._getUploadFile(_ifile.getBorder(obj));
        var hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    },

    //get file name by path
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

    //=== event start ===
    onOpenFile: function (btn) {
        var label = _ifile._getOutBorder(btn);
        var file = _ifile._getFileObj(label);
        file.focus().trigger('click'); //focus first !!
    },

    //file: input element
    onChangeFile: function (file) {
        //case of empty file
        var border = _ifile._getOutBorder(file);
        var fileObj = $(file);
        var value = file.value; //full path
        if (_str.isEmpty(value)) {
            _ifile._setValue(border, '');
            return;
        }

        //check file ext
        var exts = fileObj.data('exts').toLowerCase();
        if (!_str.isEmpty(exts)) {
            var ext = _ifile.getFileExt(value).toLowerCase();
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _tool.msg(_BR.UploadFileNotMatch);
                file.value = '';
                return;
            }
        }

        //check file size
        var max = fileObj.data('max');
        if (file.files[0].size > max * 1024 * 1024) {
            _tool.msg(_str.format(_BR.UploadFileNotBig, max));
            file.value = '';
            return;
        }

        //case ok
        _ifile._setValue(border, value);
    },

    onDeleteFile: function (btn) {
        var border = _ifile._getOutBorder(btn);
        //var file = _ifile._getFileObj(label);
        _ifile._setValue(border, '');
    },
    //=== event end ===

    //?? initial after load rows
    zz_init: function(fid, path, form) {
        var fileObj = _obj.get(fid, form);
        fileObj.val('');
        //_ifile.setFun(fileObj, ''); //set fun to empty
        //_ifile.setPathByFile(fileObj, path);

        /*
        //file element 要 reset
        var file = _obj.getF(_ifile.fileF(id), form);
        //var $el = $('#example-file');
        file.wrap('<form>').closest('form').get(0).reset();
        file.unwrap();
        */
    },

    //=== private function below ===
    /**
     * get outer label object(same to border)
     * param elm {object/element} border inside object/element
     */
    _getOutBorder: function (elm) {
        return $(elm).closest('.xi-border');
    },

    /**
     * border set input value
     * param border {object}
     */
    _setValue: function (border, value) {
        _ifile._getObj(border).val(value);
    },

    /**
     * border get input object
     * param border {object}
     */
    _getObj: function (border) {
        return border.next();
    },

    /**
     * border get link object
     * param border {object} border object
     */
    _getLink: function (border) {
        return border.find('a');
    },

    /**
     * border get file object
     * param border {object} border object
     */
    _getFileObj: function (border) {
        return border.find(':file');
    },

    //border get uploaded file, return null if empty
    _getUploadFile: function (border) {
        var fileObj = _ifile._getFileObj(border);
        var files = fileObj.get(0).files;
        return (files.length > 0) ? files[0] : null;
    },

}); //class