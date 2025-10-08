"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var _BR_1 = require("./_BR"); // Assuming _BR is a resource object
var _File_1 = require("./_File");
var _Fun_1 = require("./_Fun");
var _IBase_1 = require("./_IBase");
var _Obj_1 = require("./_Obj");
var _Str_1 = require("./_Str");
var _Tool_1 = require("./_Tool");
/**
 * //input file
 */
var _IFile = /** @class */ (function (_super) {
    __extends(_IFile, _super);
    function _IFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //object: file input
    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */
    _IFile.getBorder = function (obj) {
        return obj.prev();
    };
    _IFile.setO = function (obj, value) {
        obj.val(value); //set hidden input value
        _IFile._elmToLink(obj).text(value); //set link show text
    };
    //=== overwrite end ===
    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    _IFile.dataAddFile = function (data, fid, serverFid, box) {
        var obj = _Obj_1.default.get(fid, box);
        var file = _IFile.getUploadFile(_IFile._elmToFile(obj));
        var hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    };
    //=== event start ===
    _IFile.onOpenFile = function () {
        var btn = _Fun_1.default.getMe();
        var file = _IFile._elmToFile(btn);
        file.focus().trigger('click'); //focus first !!
    };
    //file: input element
    _IFile.onChangeFile = function () {
        //case of empty file
        var file = _Fun_1.default.getMe();
        var obj = _IFile._elmToObj(file);
        var fileObj = $(file);
        var value = file.value; //full path
        if (_Str_1.default.isEmpty(value)) {
            _IFile.setO(obj, '');
            return;
        }
        //check file ext
        var exts = fileObj.data('exts').toLowerCase();
        if (_Str_1.default.notEmpty(exts) && exts !== '*') {
            var ext = _File_1.default.getFileExt(value);
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _Tool_1.default.msg(_BR_1.default.UploadFileNotMatch);
                file.value = '';
                return;
            }
        }
        //check file size
        var max = fileObj.data('max');
        if (file.files && file.files[0] && file.files[0].size > max * 1024 * 1024) {
            _Tool_1.default.msg(_Str_1.default.format(_BR_1.default.UploadFileNotBig, max));
            file.value = '';
            return;
        }
        //case ok
        _IFile.setO(obj, _File_1.default.getFileName(value));
    };
    _IFile.onDeleteFile = function () {
        var btn = _Fun_1.default.getMe();
        _IFile.setO(_IFile._elmToObj(btn), '');
    };
    //=== event end ===
    //?? initial after load rows
    _IFile.zz_init = function (fid, path, form) {
        var fileObj = _Obj_1.default.get(fid, form);
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
    };
    //=== private function below ===
    /**
     * element to file box object
     * param elm {element}
     * return {object} file box object
     */
    _IFile._elmToBox = function (elm) {
        return $(elm).closest('.xi-box');
    };
    //get file object
    _IFile._elmToFile = function (elm) {
        return _IFile._boxGetFile(_IFile._elmToBox(elm instanceof Elm ? elm : elm.get(0)));
    };
    //get input object
    _IFile._elmToObj = function (elm) {
        return _IFile._boxGetObj(_IFile._elmToBox(elm instanceof Elm ? elm : elm.get(0)));
    };
    //get link object
    _IFile._elmToLink = function (elm) {
        return _IFile._boxGetLink(_IFile._elmToBox(elm instanceof Elm ? elm : elm.get(0)));
    };
    /**
     * box get link object
     * param box {object} box object
     */
    _IFile._boxGetLink = function (box) {
        //return box.find('a');
        return box.find('a').last();
    };
    _IFile._boxGetFile = function (box) {
        return box.find(':file');
    };
    //box get input object
    _IFile._boxGetObj = function (box) {
        return box.find('[data-type=file]');
    };
    //border get uploaded file, return null if empty
    _IFile.getUploadFile = function (fileObj) {
        if (fileObj.length == 0)
            return null;
        // The input element (HTMLInputElement)
        var inputElement = fileObj.get(0);
        // Check for files property and its length
        if (inputElement.files && inputElement.files.length > 0) {
            return inputElement.files[0];
        }
        return null;
    };
    return _IFile;
}(_IBase_1.default)); //class
exports.default = _IFile;
