import _Btn from "./_Btn";
import _ITextarea from "./_ITextarea";
import _Modal from "./_Modal";
import _Obj from "./_Obj";

//small public components
export default class _Tool {

    // Static properties for jQuery elements
    private static xgMsg: JQuery<HTMLElement> | null = null; //使用id
    private static xgAns: JQuery<HTMLElement> | null = null; //使用id
    private static xgAlert: JQuery<HTMLElement> | null = null;
    private static xgArea: JQuery<HTMLElement> | null = null;
    private static xgImage: JQuery<HTMLElement> | null = null;
    private static xgWork: JQuery<HTMLElement> | null = null;

    // Static properties for callback functions
    private static _fnOnMsgClose: Function | null = null;
    private static _fnOnAnsYes: Function | null = null;
    private static _fnOnAnsNo: Function | null = null;
    private static _fnOnAreaYes: Function | null = null;

    static init(): void {
        //alert
        _Tool.xgMsg = $('#xgMsg');  //使用id
        _Tool.xgAns = $('#xgAns');  //使用id
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
    static msg(msg: string, fnClose?: Function): void {
        const box = _Tool.xgMsg;
        if (!box) return;

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
    static ans(msg: string, fnYes: Function, fnNo?: Function): void {
        const box = _Tool.xgAns;
        if (!box) return;

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
    static alert(msg: string, color?: string): void {
        const box = _Tool.xgAlert;
        if (!box) return;

        box.find('.xd-msg').text(msg)
        box.fadeIn(500, function () {
            _Obj.show(box);
            setTimeout(function () {
                _Tool.onAlertClose();
            }, 5000);   //show 5 seconds
        });
    }

    //??show waiting
    static showWait(): void {
        //$('body').addClass('x-show-loading');
        _Obj.show($('.x-wait'));
    }
    //??
    static hideWait(): void {
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
    static showArea(title: string, value: string, isEdit: boolean, fnOk: Function): void {
        //set title
        const box = _Tool.xgArea;
        if (!box) return;

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

    static onAreaYes(): void {
        const box = _Tool.xgArea;
        if (!box) return;

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
    static showImage(fileName: string, imageSrc: string): void {
        const box = _Tool.xgImage;
        if (!box) return;

        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _Modal.showO(box);
    }

    /**
     * onclick alert close button
     */
    static onAlertClose(): void {
        const box = _Tool.xgAlert;
        if (!box) return;

        box.fadeOut(500, function () {
            _Obj.hide(box);
        });
    }

    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    static onAnsYes(): void {
        if (_Tool._fnOnAnsYes && _Tool.xgAns) {
            _Modal.hideO(_Tool.xgAns);
            _Tool._fnOnAnsYes();
        }
    }
    
    static onAnsNo(): void {
        if (_Tool._fnOnAnsNo)
            _Tool._fnOnAnsNo();
        if (_Tool.xgAns) {
            _Modal.hideO(_Tool.xgAns);
        }
    }
    
    static onMsgClose(): void {
        if (_Tool._fnOnMsgClose)
            _Tool._fnOnMsgClose();
        if (_Tool.xgMsg) {
            _Modal.hideO(_Tool.xgMsg);
        }
    }

} //class