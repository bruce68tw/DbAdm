import _Modal from './_Modal';
import _Obj from './_Obj';
import _iTextarea from './_iTextarea';
import _Btn from './_Btn';
class _Tool {
    static init() {
        // alert
        _Tool.xMsg = $('#xMsg'); // 使用id
        _Tool.xAns = $('#xAns'); // 使用id
        _Tool.xAnsA = $('#xAnsA'); // 使用id, 非同步
        _Tool.xAlert = $('.x-alert');
        _Tool.xArea = $('.x-area');
        _Tool.xImage = $('.x-image');
        _Tool.xWork = $('.x-work');
    }
    /**
     * show message box
     * @param msg html or string
     * @param fnClose callback function
     */
    static msg(msg, fnClose) {
        const box = _Tool.xMsg;
        box.find(_Tool.FltMsgText).html(msg);
        _Modal.show(box);
        // set callback
        _Tool._fnOnMsgClose = fnClose;
    }
    /**
     * show confirmation
     * @param msg
     * @param fnYes
     * @param fnNo
     */
    static ans(msg, fnYes, fnNo) {
        const box = _Tool.xAns;
        box.find(_Tool.FltMsgText).html(msg);
        _Modal.show(box);
        // set callback
        _Tool._fnOnAnsYes = fnYes;
        _Tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    }
    /**
     * 非同步方式, 比callback function(promise)方便
     * show confirmation
     * @param msg
     * @return yes/no
     */
    static async ansA(msg) {
        const box = _Tool.xAnsA;
        box.find(_Tool.FltMsgText).html(msg);
        _Modal.show(box);
        return new Promise((resolve) => {
            // reset flag, 防止重複 resolve
            _Tool.ansStatus = false;
            _Tool.fnResolve = resolve;
        });
    }
    // called by ansA yes/no onclick event
    static onAnsA(value) {
        if (_Tool.ansStatus)
            return;
        _Tool.ansStatus = true;
        _Modal.hide(_Tool.xAnsA);
        if (_Tool.fnResolve) {
            _Tool.fnResolve(value == 1);
        }
    }
    /**
     * show alert(auto close), use bootstrap alert
     * @param msg
     * @param color default blue, R(red)
     */
    static alert(msg, color) {
        const box = _Tool.xAlert;
        box.find(_Tool.FltMsgText).text(msg);
        box.fadeIn(500, function () {
            _Obj.show(box);
            setTimeout(function () {
                _Tool.onAlertClose();
            }, 5000); // show 5 seconds
        });
    }
    // ??show waiting
    static showWait() {
        _Obj.show(_Tool.xAlert);
    }
    // ??
    static hideWait() {
        _Obj.hide(_Tool.xAlert);
    }
    /**
     * show textarea editor
     * @param title modal title
     * @param value textarea value
     * @param isEdit true:edit, false:readonly
     * @param fnOk function of onOk
     */
    static showArea(title, value, isEdit, fnOk) {
        // set title
        const box = _Tool.xArea;
        box.find('.modal-title').text(title);
        // get value & yes button status
        const obj = box.find('textarea');
        obj.val(value);
        _iTextarea.setEditO(obj, isEdit);
        _Btn.setEdit(box.find('.xd-yes'), isEdit);
        // set callback function
        if (isEdit) {
            _Tool._fnOnAreaYes = fnOk;
        }
        // show modal
        _Modal.show(box);
    }
    static onAreaYes() {
        const box = _Tool.xArea;
        if (_Tool._fnOnAreaYes) {
            _Modal.hide(box);
            const value = box.find('textarea').val();
            _Tool._fnOnAreaYes(value);
        }
    }
    /**
     * show image modal
     * @param fileName image file name without path
     * @param imageSrc image src
     */
    static showImage(fileName, imageSrc) {
        const box = _Tool.xImage;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _Modal.show(box);
    }
    /**
     * onclick alert close button
     */
    static onAlertClose() {
        const box = _Tool.xAlert;
        box.fadeOut(500, function () {
            _Obj.hide(box);
        });
    }
    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    static onAnsYes() {
        if (_Tool._fnOnAnsYes) {
            _Modal.hide(_Tool.xAns);
            _Tool._fnOnAnsYes();
        }
    }
    static onAnsNo() {
        if (_Tool._fnOnAnsNo) {
            _Tool._fnOnAnsNo();
        }
        _Modal.hide(_Tool.xAns);
    }
    static onMsgClose() {
        if (_Tool._fnOnMsgClose) {
            _Tool._fnOnMsgClose();
        }
        _Modal.hide(_Tool.xMsg);
    }
}
// constant
// msg text
_Tool.FltMsgText = '.xd-msg';
// variables for ansA
_Tool.ansStatus = false;
_Tool.fnResolve = null;
_Tool._fnOnMsgClose = null;
_Tool._fnOnAnsYes = null;
_Tool._fnOnAnsNo = null;
_Tool._fnOnAreaYes = null;
export default _Tool;
