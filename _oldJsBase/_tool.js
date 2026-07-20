
//small public components
var _tool = {
    //constant
    //msg text
    FltMsgText: '.xd-msg',

    //variables for ansA
    ansStatus: false,
    fnResolve: null,

    init: function () {
        //alert
        _tool.xMsg = $('#xMsg');      //使用id
        _tool.xAns = $('#xAns');      //使用id
        _tool.xAnsA = $('#xAnsA');    //使用id, 非同步
        _tool.xAlert = $('.x-alert');
        _tool.xArea = $('.x-area');
        _tool.xImage = $('.x-image');
        _tool.xWork = $('.x-work');
    },

    /**
     * show message box
     * param msg {string} html or string
     * param fnOk {function} callback function
     */
    msg: function (msg, fnClose) {
        var box = _tool.xMsg;
        box.find(_tool.FltMsgText).html(msg);
        _modal.show(box);

        //set callback
        _tool._fnOnMsgClose = fnClose;
    },

    /**
     * show confirmation 
     * param {string} msg
     * param {function} fnYes
     * param {function} fnNo
     */
    ans: function (msg, fnYes, fnNo) {
        var box = _tool.xAns;
        box.find(_tool.FltMsgText).html(msg);
        _modal.show(box);

        //set callback
        _tool._fnOnAnsYes = fnYes;
        _tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    },

    /**
     * 非同步方式, 比callback function(promise)方便
     * show confirmation 
     * param {string} msg
     * return {bool} yes/no
     */
    ansA: async function (msg) {
        var box = _tool.xAnsA;
        box.find(_tool.FltMsgText).html(msg);
        _modal.show(box);

        return new Promise((resolve) => {
            //reset flag, 防止重複 resolve
            _tool.ansStatus = false;
            _tool.fnResolve = resolve;
        });
    },

    //called by ansA yes/no onclick event
    onAnsA: function(value) {
        if (_tool.ansStatus) return;

        _tool.ansStatus = true;
        _modal.hide(_tool.xAnsA);
        _tool.fnResolve(value == 1);
    },

    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    alert: function (msg, color) {
        var box = _tool.xAlert;
        box.find(_tool.FltMsgText).text(msg)
        box.fadeIn(500, function () {
            _obj.show(box);
            setTimeout(function () {
                _tool.onAlertClose();
            }, 5000);   //show 5 seconds
        });
    },

    //??show waiting
    showWait: function () {
        _obj.show(_tool.xAlert);
    },
    //??
    hideWait: function () {
        _obj.hide(_tool.xAlert);
    },

    /**
     * show textarea editor
     * param title {string} modal title
     * param value {string} textarea value
     * param isEdit {bool} true:edit, false:readonly
     * param fnOk {function} function of onOk
     */
    showArea: function (title, value, isEdit, fnOk) {
        //set title
        var box = _tool.xArea;
        box.find('.modal-title').text(title);

        //get value & yes button status
        var obj = box.find('textarea');
        obj.val(value);
        _itextarea.setEditO(obj, isEdit);
        _btn.setEdit(box.find('.xd-yes'), isEdit);

        //set callback function
        if (isEdit)
            _tool._fnOnAreaYes = fnOk;

        //show modal
        _modal.show(box);
    },

    onAreaYes: function () {
        var box = _tool.xArea;
        if (_tool._fnOnAreaYes) {
            _modal.hide(box);
            var value = box.find('textarea').val();
            _tool._fnOnAreaYes(value);
        }
    },

    /**
     * show image modal
     * param fileName {string} image file name without path
     * param imageSrc {string} image src
     */ 
    showImage: function (fileName, imageSrc) {
        var box = _tool.xImage;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _modal.show(box);
    },

    /**
     * onclick alert close button
     */
    onAlertClose: function () {
        var box = _tool.xAlert;
        box.fadeOut(500, function () {
            _obj.hide(box);
        });
    },

    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    onAnsYes: function () {
        if (_tool._fnOnAnsYes) {
            _modal.hide(_tool.xAns);
            _tool._fnOnAnsYes();
        }
    },
    onAnsNo: function () {
        if (_tool._fnOnAnsNo)
            _tool._fnOnAnsNo();
        _modal.hide(_tool.xAns);
    },
    onMsgClose: function () {
        if (_tool._fnOnMsgClose)
            _tool._fnOnMsgClose();
        _modal.hide(_tool.xMsg);
    },

}; //class