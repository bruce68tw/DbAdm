
//var RB = null;  //resource base
var _fun = {

    //=== constant start(大camel) ===
    Fid: 'fid',            //data-fid

    //input field error validation, need match server side _Web.cs
    //jsPath: '../Scripts/',      //js path for load
    //errTail: '_err',            //error label 欄位id後面會加上這個字元
    XiBorder: 'xi-border',           //input border class
    errCls: 'xg-error',           //欄位驗証錯誤時會加上這個 class name
    errLabCls: 'xg-error-label',     //error label 的 class name
    //errBoxCls: 'xg-errorbox', //??_box欄位驗証錯誤時會加上這個 class name
    XdRequired: 'xd-required',

    //constant for mapping to backend
    FunC: 'C',     //create
    FunR: 'R',     //read
    FunU: 'U',     //update
    FunD: 'D',     //delete, for input file
    FunV: 'V',     //view row
    //=== constant end ===


    //變數
    locale: 'zh-TW',
    maxFileSize: 50971520,  //上傳檔案限制50M
    //localeCode: 'zh-TW',

    //mid variables
    data: {},

    //variables ??
    isCheck: true,

    //後端必須實作 Fun/Test()
    onHello: function () {
        _ajax.getStr('../Fun/Hello', null, function (msg) {
            alert('OK');
        });
    },

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} field id
     * param square {bool} (false)has square or not
     * return {string}
     */
    getFidFilter: function (fid) {
        return '[data-fid=' + fid + ']';
    },

    /*
    isNull: function (obj) {
        return (obj == null);
    },
    */

    default: function (val, val0) {
        return (val == null) ? val0 : val;
    },

    notNull: function (obj) {
        //不可使用 obj != null
        return !(obj == null);
    },

    //on change locale, 後端必須實作 Fun/SetLocale()
    onSetLocale: function (code) {
        _ajax.getStr('../Fun/SetLocale', { code: code }, function (msg) {
            //_browser.setLang(lang);
            location.reload();
        });
    },

    /*
      ??
    */
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

    /*
     ??
    */
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

    /**
     multiple checkbox onclick event
     params
       me : this component
       fid: field id 
       value: field value
     */
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

};//class