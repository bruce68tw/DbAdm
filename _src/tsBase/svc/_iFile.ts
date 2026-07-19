class _iFile extends _iBase {
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
        _iFile._elmToLink(obj).text(value);  //set link show text
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
    static dataAddFile(data: FormData, fid: string, serverFid: string, box?: JQuery): boolean {
        const obj = _Obj.get(fid, box);
        const file = _iFile.getUploadFile(_iFile._elmToFile(obj));
        const hasFile = (file != null);
        if (hasFile) {
            data.append(serverFid, file!);
        }
        return hasFile;
    }

    //=== event start ===
    static onOpenFile(): void {
        const btn = _Fun.getMe();
        const file = _iFile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    }

    //file: input element
    static onChangeFile(): void {
        //case of empty file
        const fileElm = _Fun.getMeElm() as HTMLInputElement;
        const obj = _iFile._elmToObj(fileElm);
        const fileObj = $(fileElm);
        const value = fileElm.value; //full path
        if (_Str.isEmpty(value)) {
            _iFile.setO(obj, '');
            return;
        }

        //check file ext
        let exts = (fileObj.data('exts') as string || '').toLowerCase();
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
        const max = fileObj.data('max') as number;
        if (fileElm.files && fileElm.files[0] && fileElm.files[0].size > max * 1024 * 1024) {
            _Tool.msg(_Str.format(_BR.UploadFileNotBig, max));
            fileElm.value = '';
            return;
        }

        //case ok
        _iFile.setO(obj, _File.getFileName(value));
    }

    static onDeleteFile(): void {
        const btn = _Fun.getMe();
        _iFile.setO(_iFile._elmToObj(btn), '');
    }
    //=== event end ===

    //?? initial after load rows
    static zz_init(fid: string, path: string, form?: JQuery): void {
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
    private static _elmToBox(elm: Elm | JQuery): JQuery {
        return $(elm).closest('.xi-box');
    }
    
    //get file object
    private static _elmToFile(elm: Elm | JQuery): JQuery {
        return _iFile._boxGetFile(_iFile._elmToBox(elm));
    }
    
    //get input object
    private static _elmToObj(elm: Elm | JQuery): JQuery {
        return _iFile._boxGetObj(_iFile._elmToBox(elm));
    }
    
    //get link object
    private static _elmToLink(elm: Elm | JQuery): JQuery {
        return _iFile._boxGetLink(_iFile._elmToBox(elm));
    }

    /**
     * box get link object
     * param box {object} box object
     */
    private static _boxGetLink(box: JQuery): JQuery {
        //return box.find('a');
        return box.find('a').last();
    }
    
    private static _boxGetFile(box: JQuery): JQuery {
        return box.find(':file');
    }
    
    //box get input object
    private static _boxGetObj(box: JQuery): JQuery {
        return box.find('[data-type=file]');
    }

    //border get uploaded file, return null if empty
    static getUploadFile(fileObj: JQuery): File | null {
        if (fileObj.length === 0) {
            return null;
        }

        const inputElm = fileObj.get(0) as HTMLInputElement;
        const files = inputElm.files;
        return (files && files.length > 0) ? files[0] : null;
    }
}
window._iFile = _iFile;

//??
//Object.assign(_iFile, _iBase);