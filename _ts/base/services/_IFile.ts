// @ts-nocheck
import _BR from "./_BR"; // Assuming _BR is a resource object
import _File from "./_File";
import _Fun from "./_Fun";
import _IBase from "./_IBase";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Tool from "./_Tool";

/**
 * //input file
 */
export default class _IFile extends _IBase {

    //object: file input

    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */
    static getBorder(obj: JQuery): JQuery {
        return obj.prev();
    }

    static setO(obj: JQuery, value: string): void {
        obj.val(value);     //set hidden input value
        _IFile._elmToLink(obj).text(value);  //set link show text
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
    static dataAddFile(data: FormData, fid: string, serverFid: string, box: JQuery): boolean {
        const obj = _Obj.get(fid, box);
        const file = _IFile.getUploadFile(_IFile._elmToFile(obj));
        const hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    }

    //=== event start ===
    static onOpenFile(): void {
        const btn = _Fun.getMe();
        const file = _IFile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    }

    //file: input element
    static onChangeFile(): void {
        //case of empty file
        const file = _Fun.getMe() as HTMLInputElement;
        const obj = _IFile._elmToObj(file);
        const fileObj = $(file);
        const value = file.value; //full path
        if (_Str.isEmpty(value)) {
            _IFile.setO(obj, '');
            return;
        }

        //check file ext
        let exts = (fileObj.data('exts') as string).toLowerCase();
        if (_Str.notEmpty(exts) && exts !== '*') {
            const ext = _File.getFileExt(value);
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _Tool.msg(_BR.UploadFileNotMatch);
                file.value = '';
                return;
            }
        }

        //check file size
        const max = fileObj.data('max') as number;
        if (file.files && file.files[0] && file.files[0].size > max * 1024 * 1024) {
            _Tool.msg(_Str.format(_BR.UploadFileNotBig, max));
            file.value = '';
            return;
        }

        //case ok
        _IFile.setO(obj, _File.getFileName(value));
    }

    static onDeleteFile(): void {
        const btn = _Fun.getMe();
        _IFile.setO(_IFile._elmToObj(btn), '');
    }
    //=== event end ===

    //?? initial after load rows
    static zz_init(fid: string, path: string, form: JQuery): void {
        const fileObj = _Obj.get(fid, form);
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
    }


    //=== private function below ===
    /**
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    static _elmToBox(elm: Elm): JQuery {
        return $(elm).closest('.xi-box');
    }
    //get file object
    static _elmToFile(elm: Elm): JQuery {
        return _IFile._boxGetFile(_IFile._elmToBox(elm));
    }
    //get input object
    static _elmToObj(elm: Elm): JQuery {
        return _IFile._boxGetObj(_IFile._elmToBox(elm));
    }
    //get link object
    static _elmToLink(elm: Elm): JQuery {
        return _IFile._boxGetLink(_IFile._elmToBox(elm));
    }

    /**
     * box get link object
     * param box {object} box object
     */
    static _boxGetLink(box: JQuery): JQuery {
        //return box.find('a');
        return box.find('a').last();
    }
    static _boxGetFile(box: JQuery): JQuery {
        return box.find(':file');
    }
    //box get input object
    static _boxGetObj(box: JQuery): JQuery {
        return box.find('[data-type=file]');
    }

    //border get uploaded file, return null if empty
    static getUploadFile(fileObj: JQuery): File | null {
        if (fileObj.length == 0)
            return null;

        // The input element (HTMLInputElement)
        const inputElement = fileObj.get(0) as HTMLInputElement;

        // Check for files property and its length
        if (inputElement.files && inputElement.files.length > 0) {
            return inputElement.files[0];
        }

        return null;
    }

} //class