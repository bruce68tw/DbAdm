import _iBase from './_iBase';
import _Obj from './_Obj';
import _Fun from './_Fun';
import _Str from './_Str';
import _File from './_File';
import _Tool from './_Tool';
export default class _iFile extends _iBase {
    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */
    static getBorder(obj) {
        return obj.prev();
    }
    static setO(obj, value) {
        obj.val(value); //set hidden input value
        _iFile._elmToLink(obj).text(value); //set link show text
    }
    //=== overwrite end ===
    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    static dataAddFile(data, fid, serverFid, box) {
        const obj = _Obj.get(fid, box);
        const file = _iFile.getUploadFile(_iFile._elmToFile(obj));
        const hasFile = (file != null);
        if (hasFile) {
            data.append(serverFid, file);
        }
        return hasFile;
    }
    //=== event start ===
    static onOpenFile() {
        const btn = _Fun.getMe();
        const file = _iFile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    }
    //file: input element
    static onChangeFile() {
        //case of empty file
        const fileElm = _Fun.getMeElm();
        const obj = _iFile._elmToObj(fileElm);
        const fileObj = $(fileElm);
        const value = fileElm.value; //full path
        if (_Str.isEmpty(value)) {
            _iFile.setO(obj, '');
            return;
        }
        //check file ext
        let exts = (fileObj.data('exts') || '').toLowerCase();
        if (_Str.notEmpty(exts) && exts !== '*') {
            const ext = _File.getFileExt(value);
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _Tool.msg(_BR.UploadFileNotMatch);
                fileElm.value = '';
                return;
            }
        }
        //check file size
        const max = fileObj.data('max');
        if (fileElm.files && fileElm.files[0] && fileElm.files[0].size > max * 1024 * 1024) {
            _Tool.msg(_Str.format(_BR.UploadFileNotBig, max));
            fileElm.value = '';
            return;
        }
        //case ok
        _iFile.setO(obj, _File.getFileName(value));
    }
    static onDeleteFile() {
        const btn = _Fun.getMe();
        _iFile.setO(_iFile._elmToObj(btn), '');
    }
    //=== event end ===
    //?? initial after load rows
    static zz_init(fid, path, form) {
        const fileObj = _Obj.get(fid, form);
        fileObj.val('');
        //_iFile.setFun(fileObj, ''); //set fun to empty
        //_iFile.setPathByFile(fileObj, path);
        /*
        //file element 要 reset
        var file = _Obj.getByFt(_iFile.fileF(id), form);
        //var $el = $('#example-file');
        file.wrap('<form>').closest('form').get(0).reset();
        file.unwrap();
        */
    }
    //=== private function below ===
    /**
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    static _elmToBox(elm) {
        return $(elm).closest('.xi-box');
    }
    //get file object
    static _elmToFile(elm) {
        return _iFile._boxGetFile(_iFile._elmToBox(elm));
    }
    //get input object
    static _elmToObj(elm) {
        return _iFile._boxGetObj(_iFile._elmToBox(elm));
    }
    //get link object
    static _elmToLink(elm) {
        return _iFile._boxGetLink(_iFile._elmToBox(elm));
    }
    /**
     * box get link object
     * param box {object} box object
     */
    static _boxGetLink(box) {
        //return box.find('a');
        return box.find('a').last();
    }
    static _boxGetFile(box) {
        return box.find(':file');
    }
    //box get input object
    static _boxGetObj(box) {
        return box.find('[data-type=file]');
    }
    //border get uploaded file, return null if empty
    static getUploadFile(fileObj) {
        if (fileObj.length === 0) {
            return null;
        }
        const inputElm = fileObj.get(0);
        const files = inputElm.files;
        return (files && files.length > 0) ? files[0] : null;
    }
}
Object.assign(_iFile, _iBase);
