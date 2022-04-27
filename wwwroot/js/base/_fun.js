
var _fun = {

    //#region constant (big camel) ===
    //for moment.js, match to _Fun.cs CsDtFmt
    MmDateFmt: 'YYYY/MM/DD',
    MmDtFmt: 'YYYY/MM/DD HH:mm:ss',

    //input field error validation, need match server side _Web.cs
    //jsPath: '../Scripts/',      //js path for load

    //for mapping to backend
    FunC: 'C',     //create
    FunR: 'R',     //read
    FunU: 'U',     //update
    FunD: 'D',     //delete, for input file
    FunV: 'V',     //view row

    //error BR code, same to _Fun.PreBrError, fixed len to 2
    PreBrError: 'B:',

    //class name of hide RWD phone
    HideRwd: 'xg-hide-rwd',
    //#endregion

    //variables
    locale: 'zh-TW',    //now locale, _Layout.cshmlt will set
    maxFileSize: 50971520,  //upload file limit(50M)
    isRwd: false,
    //pageRows: 10,       //for _page.js (pagination object)

    //mid variables
    //data: {},

    //variables ??
    //isCheck: true,

    //server need Fun/Hello()
    onHello: function () {
        _ajax.getStr('../Fun/Hello', null, function (msg) {
            alert(msg);
        });
    },

    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    getFid: function (obj) {
        return obj.data('fid');
    },

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    fidFilter: function (fid) {
        return _str.isEmpty(fid)
            ? '[data-fid]'
            : '[data-fid=' + fid + ']';
    },

    /*
    isNull: function (obj) {
        return (obj == null);
    },
    */

    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    default: function (val, defVal) {
        return (val == null) ? defVal : val;
    },

    hasValue: function (obj) {
        //can not obj != null !!
        return !(obj == null);
    },

    //on change locale, 後端必須實作 Fun/SetLocale()
    onSetLocale: function (code) {
        _ajax.getStr('../Fun/SetLocale', { code: code }, function (msg) {
            //_browser.setLang(lang);
            location.reload();
        });
    },

    block: function (){
        $.blockUI({
            message: '' +
                '<table><tr><td style="height:50px">' +
                '   <i class="spinner ico-spin"></i>' +
                '   <span style="margin-left:3px; vertical-align:middle;">' + _BR.Working + '</span>' +
                '</td></tr></table>',
            css: {
                padding: '0 30px',
                borderWidth: '2px', //no dash here, use camel or add '
                width: 'auto',
                left: '42%',
            },
            overlayCSS: { opacity: 0.3 },
        });
    },

    unBlock: function () {
        $.unblockUI();
    },

    //#region remark code
    /*
      ??
    xgTextBoxValid: function (obj, Regex) {
        var parent = obj.parentNode;
        if (Regex == "") {
            if (obj.value != "") {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
        else {
            if (obj.value.match(new RegExp(Regex)) != null) {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
    },

     ??
    xgCheckfn: function () {
        _fun.isCheck = true;
        var Inputs = document.getElementsByClassName('xg-textbox');
        for (var i = 0; i < Inputs.length; i++) {
            Inputs[i].childNodes[1].onchange();
        }
        var selects = document.getElementsByClassName('xg-select');
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].childNodes[1].value == 0 || selects[i].childNodes[1].value == "") {
                selects[i].classList.add("xg-error");
                _fun.isCheck = false;
            }
            else {
                selects[i].classList.remove("xg-error");
            }
        }
        return _fun.isCheck;
    },

    //
     multiple checkbox onclick event
     params
       me : this component
       fid: field id 
       value: field value
    //onClickCheckMulti: function (me, fid, value, separator, onClickFn) {
    zz_onChangeMultiCheck: function (me, fid) {

        //var fid = $(me).attr('data-item-id');
        //var field = $('[data-id="' + fid + '"]');           //field
        var field = $('#' + fid);       //field
        //var box = field.parent();     //找包含所有 checkbox 的 container
        //update value list
        var values = '';
        var texts = '';
        var separator = field.attr('data-separator');
        var onClickFn = field.attr('data-onclick');
        $(field.parent()).find('input:checked').each(function () {
            values += $(this).val() + separator;
            texts += $(this).text() + ',';
        });

        //adjust
        if (values != '') {
            values = values.substring(0, values.length - 1);
            texts = texts.substring(0, texts.length - 1);
        }
        //更新欄位內容
        field.attr('title', texts); //update show text
        field.val(values);           //set field value

        //call user define function
        if (onClickFn != undefined && onClickFn != "")
            onClickFn(me, $(me).val());

    },
    */
 
    /**
     * 傳回錯誤訊息(多國語)
     * params
     *   form : 多國語 form 
     *   errorCode: error code
     */
    /*
    errorMsg: function (form, errorCode) {
        if (errorCode == null || errorCode == '')
            return '';
        else if (errorCode.subsubstring(0, 1) == 'E')
            return (_global[errorCode] == null) ? '(no error code: ' + errorCode +')' : _global[errorCode];
        else
            return (form[errorCode] == null) ? '(no error code: ' + errorCode + ')' : form[errorCode];
    },
    */

    /**
     * get value of multiple select field
     * params
     *   fid : field id
     * return : string
     */
    //getMultiSelectValue: function (fid, separator) {
    //    var field = $('#' + fid);
    //    return (field.length == 0) ? '' : field.val().join(separator);
    //},
    //#endregion

};//class