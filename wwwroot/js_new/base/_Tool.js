import _Btn from "./_Btn";
import _ITextarea from "./_ITextarea";
import _Modal from "./_Modal";
import _Obj from "./_Obj";
//small public components
class _Tool {
    static init() {
        //alert
        _Tool.xgMsg = $('#xgMsg'); //使用id
        _Tool.xgAns = $('#xgAns'); //使用id
        _Tool.xgAlert = $('.x-alert');
        _Tool.xgArea = $('.x-area');
        _Tool.xgImage = $('.x-image');
        _Tool.xgWork = $('.x-work');
    }
    /**
     * show message box
     * param msg {string} html or string
     * param fnClose {function} callback function
     */
    static msg(msg, fnClose) {
        const box = _Tool.xgMsg;
        if (!box)
            return;
        box.find('.xd-msg').html(msg);
        _Modal.showO(box);
        //set callback
        _Tool._fnOnMsgClose = fnClose || null;
    }
    /**
     * show confirmation
     * @param msg {string}
     * @param fnYes {function}
     * @param fnNo {function}
     */
    static ans(msg, fnYes, fnNo) {
        const box = _Tool.xgAns;
        if (!box)
            return;
        box.find('.xd-msg').html(msg);
        _Modal.showO(box);
        //set callback
        _Tool._fnOnAnsYes = fnYes;
        _Tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    }
    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    static alert(msg, color) {
        const box = _Tool.xgAlert;
        if (!box)
            return;
        box.find('.xd-msg').text(msg);
        box.fadeIn(500, function () {
            _Obj.show(box);
            setTimeout(function () {
                _Tool.onAlertClose();
            }, 5000); //show 5 seconds
        });
    }
    //??show waiting
    static showWait() {
        //$('body').addClass('x-show-loading');
        _Obj.show($('.x-wait'));
    }
    //??
    static hideWait() {
        //$('body').removeClass('x-show-loading');
        _Obj.hide($('.x-wait'));
    }
    /**
     * show textarea editor
     * param title {string} modal title
     * param value {string} textarea value
     * param isEdit {boolean} true:edit, false:readonly
     * param fnOk {function} function of onOk
     */
    static showArea(title, value, isEdit, fnOk) {
        //set title
        const box = _Tool.xgArea;
        if (!box)
            return;
        box.find('.modal-title').text(title);
        //get value & yes button status
        const obj = box.find('textarea');
        obj.val(value);
        _ITextarea.setEditO(obj, isEdit);
        _Btn.setEditO(box.find('.xd-yes'), isEdit);
        //set callback function
        if (isEdit)
            _Tool._fnOnAreaYes = fnOk;
        //show modal
        _Modal.showO(box);
    }
    static onAreaYes() {
        const box = _Tool.xgArea;
        if (!box)
            return;
        if (_Tool._fnOnAreaYes) {
            _Modal.hideO(box);
            // .val() 的返回值可能是 string | number | string[]
            const value = box.find('textarea').val();
            _Tool._fnOnAreaYes(value);
        }
    }
    /**
     * show image modal
     * param fileName {string} image file name without path
     * param imageSrc {string} image src
     */
    static showImage(fileName, imageSrc) {
        const box = _Tool.xgImage;
        if (!box)
            return;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _Modal.showO(box);
    }
    /**
     * onclick alert close button
     */
    static onAlertClose() {
        const box = _Tool.xgAlert;
        if (!box)
            return;
        box.fadeOut(500, function () {
            _Obj.hide(box);
        });
    }
    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    static onAnsYes() {
        if (_Tool._fnOnAnsYes && _Tool.xgAns) {
            _Modal.hideO(_Tool.xgAns);
            _Tool._fnOnAnsYes();
        }
    }
    static onAnsNo() {
        if (_Tool._fnOnAnsNo)
            _Tool._fnOnAnsNo();
        if (_Tool.xgAns) {
            _Modal.hideO(_Tool.xgAns);
        }
    }
    static onMsgClose() {
        if (_Tool._fnOnMsgClose)
            _Tool._fnOnMsgClose();
        if (_Tool.xgMsg) {
            _Modal.hideO(_Tool.xgMsg);
        }
    }
} //class
// Static properties for jQuery elements
_Tool.xgMsg = null; //使用id
_Tool.xgAns = null; //使用id
_Tool.xgAlert = null;
_Tool.xgArea = null;
_Tool.xgImage = null;
_Tool.xgWork = null;
// Static properties for callback functions
_Tool._fnOnMsgClose = null;
_Tool._fnOnAnsYes = null;
_Tool._fnOnAnsNo = null;
_Tool._fnOnAreaYes = null;
export default _Tool;
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/_Tool.js.map