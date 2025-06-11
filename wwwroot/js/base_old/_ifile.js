
//input file
var _ifile = $.extend({}, _ibase, {

    //object: file input

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
        _ifile._elmToLink(obj).text(value);  //set link show text
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
        var file = _ifile.getUploadFile(_ifile._elmToFile(obj));
        var hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    },

    //=== event start ===
    onOpenFile: function (btn) {
        var file = _ifile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    },

    //file: input element
    onChangeFile: function (file) {
        //case of empty file
        var obj = _ifile._elmToObj(file);
        var fileObj = $(file);
        var value = file.value; //full path
        if (_str.isEmpty(value)) {
            _ifile.setO(obj, '');
            return;
        }

        //check file ext
        var exts = fileObj.data('exts').toLowerCase();
        if (_str.notEmpty(exts) && exts !== '*') {
            var ext = _file.getFileExt(value);
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
        _ifile.setO(obj, _file.getFileName(value));
    },

    onDeleteFile: function (btn) {
        _ifile.setO(_ifile._elmToObj(btn), '');
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
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    _elmToBox: function (elm) {
        return $(elm).closest('.xi-box');
    },
    //get file object
    _elmToFile: function (elm) {
        return _ifile._boxGetFile(_ifile._elmToBox(elm));
    },
    //get input object
    _elmToObj: function (elm) {
        return _ifile._boxGetObj(_ifile._elmToBox(elm));
    },
    //get link object
    _elmToLink: function (elm) {
        return _ifile._boxGetLink(_ifile._elmToBox(elm));
    },

    /**
     * box get link object
     * param box {object} box object
     */
    _boxGetLink: function (box) {
        //return box.find('a');
        return box.find('button').last();
    },
    _boxGetFile: function (box) {
        return box.find(':file');
    },
    //box get input object
    _boxGetObj: function (box) {
        return box.find('[data-type=file]');
    },

    //border get uploaded file, return null if empty
    getUploadFile: function (fileObj) {
        if (fileObj.length == 0)
            return null;

        var files = fileObj.get(0).files;
        return (files.length > 0) ? files[0] : null;
    },

}); //class