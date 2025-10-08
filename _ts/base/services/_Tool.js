"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Btn_1 = require("./_Btn");
var _ITextarea_1 = require("./_ITextarea");
var _Modal_1 = require("./_Modal");
var _Obj_1 = require("./_Obj");
//small public components
var _Tool = /** @class */ (function () {
    function _Tool() {
    }
    _Tool.init = function () {
        //alert
        _Tool._msg = $('#xgMsg'); //使用id
        _Tool._ans = $('#xgAns'); //使用id
        _Tool._alert = $('.x-alert');
        _Tool._area = $('.x-area');
        _Tool._image = $('.x-image');
        _Tool.work = $('.x-work');
    };
    /**
     * show message box
     * param msg {string} html or string
     * param fnClose {function} callback function
     */
    _Tool.msg = function (msg, fnClose) {
        var box = _Tool._msg;
        if (!box)
            return;
        box.find('.xd-msg').html(msg);
        _Modal_1.default.showO(box);
        //set callback
        _Tool._fnOnMsgClose = fnClose || null;
    };
    /**
     * show confirmation
     * @param msg {string}
     * @param fnYes {function}
     * @param fnNo {function}
     */
    _Tool.ans = function (msg, fnYes, fnNo) {
        var box = _Tool._ans;
        if (!box)
            return;
        box.find('.xd-msg').html(msg);
        _Modal_1.default.showO(box);
        //set callback
        _Tool._fnOnAnsYes = fnYes;
        _Tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    };
    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    _Tool.alert = function (msg, color) {
        var box = _Tool._alert;
        if (!box)
            return;
        box.find('.xd-msg').text(msg);
        box.fadeIn(500, function () {
            _Obj_1.default.show(box);
            setTimeout(function () {
                _Tool.onAlertClose();
            }, 5000); //show 5 seconds
        });
    };
    //??show waiting
    _Tool.showWait = function () {
        //$('body').addClass('x-show-loading');
        _Obj_1.default.show($('.x-wait'));
    };
    //??
    _Tool.hideWait = function () {
        //$('body').removeClass('x-show-loading');
        _Obj_1.default.hide($('.x-wait'));
    };
    /**
     * show textarea editor
     * param title {string} modal title
     * param value {string} textarea value
     * param isEdit {boolean} true:edit, false:readonly
     * param fnOk {function} function of onOk
     */
    _Tool.showArea = function (title, value, isEdit, fnOk) {
        //set title
        var box = _Tool._area;
        if (!box)
            return;
        box.find('.modal-title').text(title);
        //get value & yes button status
        var obj = box.find('textarea');
        obj.val(value);
        _ITextarea_1.default.setEditO(obj, isEdit);
        _Btn_1.default.setEditO(box.find('.xd-yes'), isEdit);
        //set callback function
        if (isEdit)
            _Tool._fnOnAreaYes = fnOk;
        //show modal
        _Modal_1.default.showO(box);
    };
    _Tool.onAreaYes = function () {
        var box = _Tool._area;
        if (!box)
            return;
        if (_Tool._fnOnAreaYes) {
            _Modal_1.default.hideO(box);
            // .val() 的返回值可能是 string | number | string[]
            var value = box.find('textarea').val();
            _Tool._fnOnAreaYes(value);
        }
    };
    /**
     * show image modal
     * param fileName {string} image file name without path
     * param imageSrc {string} image src
     */
    _Tool.showImage = function (fileName, imageSrc) {
        var box = _Tool._image;
        if (!box)
            return;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _Modal_1.default.showO(box);
    };
    /**
     * onclick alert close button
     */
    _Tool.onAlertClose = function () {
        var box = _Tool._alert;
        if (!box)
            return;
        box.fadeOut(500, function () {
            _Obj_1.default.hide(box);
        });
    };
    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    _Tool.onAnsYes = function () {
        if (_Tool._fnOnAnsYes && _Tool._ans) {
            _Modal_1.default.hideO(_Tool._ans);
            _Tool._fnOnAnsYes();
        }
    };
    _Tool.onAnsNo = function () {
        if (_Tool._fnOnAnsNo)
            _Tool._fnOnAnsNo();
        if (_Tool._ans) {
            _Modal_1.default.hideO(_Tool._ans);
        }
    };
    _Tool.onMsgClose = function () {
        if (_Tool._fnOnMsgClose)
            _Tool._fnOnMsgClose();
        if (_Tool._msg) {
            _Modal_1.default.hideO(_Tool._msg);
        }
    };
    // Static properties for jQuery elements
    _Tool._msg = null; //使用id
    _Tool._ans = null; //使用id
    _Tool._alert = null;
    _Tool._area = null;
    _Tool._image = null;
    _Tool.work = null;
    // Static properties for callback functions
    _Tool._fnOnMsgClose = null;
    _Tool._fnOnAnsYes = null;
    _Tool._fnOnAnsNo = null;
    _Tool._fnOnAreaYes = null;
    return _Tool;
}()); //class
exports.default = _Tool;
