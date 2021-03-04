
//small public components
var _tool = {

    init: function () {
        //alert
        _tool.xgAlert = $('#xgAlert');
        _tool.xgMsg = $('#xgMsg');
        _tool.xgAns = $('#xgAns');
        _tool.xgArea = $('#xgArea');
        _tool.xgImage = $('#xgImage');
    },

    /**
     * show message box
     * param msg {string} html or string
     * param fnOk {function} callback function
     */
    msg: function (msg, fnClose) {
        var box = _tool.xgMsg;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnMsgClose = fnClose;
    },

    /**
     * show confirmation 
     */
    ans: function (msg, fnYes, fnNo) {
        var box = _tool.xgAns;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnAnsYes = fnYes;
        _tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    },

    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    alert: function (msg, color) {
        var box = _tool.xgAlert;
        box.find('.xd-msg').text(msg)
        box.fadeIn(500, function () {
            box.show();
            setTimeout(function () {
                _tool.onAlertClose();
            }, 5000);   //show 5 seconds
        });
    },

    //show waiting
    showWait: function () {
        //$('body').addClass('xg-show-loading');
        $('#xgWait').show();
    },
    hideWait: function () {
        //$('body').removeClass('xg-show-loading');
        $('#xgWait').hide();
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
        var box = _tool.xgArea;
        box.find('.modal-title').text(title);

        //get value & yes button status
        var obj = box.find('textarea');
        obj.val(value);
        _itextarea.setEditO(obj, isEdit);
        _btn.setEditO(box.find('.xd-yes'), isEdit);

        //set callback function
        if (isEdit)
            _tool._fnOnAreaYes = fnOk;

        //show modal
        _modal.showO(box);
    },

    onAreaYes: function () {
        var box = _tool.xgArea;
        if (_tool._fnOnAreaYes) {
            _modal.hideO(box);
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
        var box = _tool.xgImage;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _modal.showO(box);
    },

    /**
     * onclick alert close button
     */
    onAlertClose: function () {
        var box = _tool.xgAlert;
        box.fadeOut(500, function () {
            box.hide();
        });
    },

    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    onAnsYes: function () {
        if (_tool._fnOnAnsYes) {
            _modal.hideO(_tool.xgAns);
            _tool._fnOnAnsYes();
        }
    },
    onAnsNo: function () {
        if (_tool._fnOnAnsNo)
            _tool._fnOnAnsNo();
        _modal.hideO(_tool.xgAns);
    },
    onMsgClose: function () {
        if (_tool._fnOnMsgClose)
            _tool._fnOnMsgClose();
        _modal.hideO(_tool.xgMsg);
    },

}; //class