
var _fun = {

    //#region constant (big camel) ===
    //for moment.js, match to _Fun.cs CsDtFmt
    MmDateFmt: 'YYYY/MM/DD',
    MmDtFmt: 'YYYY/MM/DD HH:mm:ss',
    FidErrorMsg: '_ErrorMsg',

    //input field error validation, need match server side _Web.cs
    //jsPath: '../Scripts/',      //js path for load

    //error BR code, same to _Fun.PreBrError, fixed len to 2
    PreBrError: 'B:',

    //class name of hide RWD phone
    HideRwd: 'x-hide-rwd',
    //#endregion

    //variables
    locale: 'zh-TW',    //now locale, _Layout.cshmlt will set
    maxFileSize: 50971520,  //upload file limit(50M)
    isRwd: false,
    pageRows: 10,   //must be 10,20(not 25),50,100    
    userId: '',     //now userId
    nowDom: '',     //now dom event element

    //mid variables
    data: {},

    //datatables column define default values
    dtColDef: {
        className: 'x-center',
        orderable: false,
        targets: '_all',
    },

    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    init: function (locale) {
        //set jwt token
        //_fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        //localStorage.removeItem('_jwtToken');

        _fun.locale = locale;
        //initial
        _leftmenu.init();
        _pjax.init('.x-main-right');
        _tool.init();
        moment.locale(_fun.locale);

        //註冊事件, 避免使用inline script for CSRF
        var body = $('body');
        _fun.setEvent(body, 'click');   //eventName 不含 on
        _fun.setEvent(body, 'change');

        //資安: 防止CSRF
        $.ajaxSetup({
            headers: {
                'RequestVerificationToken': $('meta[name="csrf-token"]').attr('content')
            }
        });
    },

    //server need Fun/Hello()
    //no called
    onHelloA: async function () {
        await _ajax.getStrA('../Fun/Hello', null, function (msg) {
            alert(msg);
        });
    },

    //get 目前event this
    //param {bool} isObj: true(jQuery object)
    getMe: function (isObj) {
        return isObj ? $(_fun.nowDom) : _fun.nowDom;
    },

    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} event name(不含on)
     */ 
    setEvent: function (box, eventName) {
        //eventName ||= 'onclick'; //default event name
        var event2 = 'on' + eventName;
        box.on(eventName, `[data-${event2}]`, function () {
            //set global
            _fun.nowDom = this;

            var me = $(this);
            const fnPath = me.data(event2);  // "_me.crudR.onAddRow"
            var argsStr = me.data("args");
            argsStr = (argsStr == null) ? "" : argsStr.toString();  //數字必須轉字串, 否則split error
            const args = argsStr ? argsStr.split(",") : [];

            //在解析 fnPath 時，不要直接拿到方法後執行，而是保留父物件
            const parts = fnPath.split(".");
            let obj = window;
            for (let i = 0; i < parts.length - 1; i++) {
                obj = obj[parts[i]];
            }
            const fnName = parts[parts.length - 1];
            const fn = obj[fnName];

            if (typeof fn === "function") {
                fn.apply(obj, args); // <-- 用 obj 當 this
            } else {
                console.warn(`Function ${fnPath} not found`);
            }
        });
    },

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
    //no called
    onSetLocaleA: async function (code) {
        await _ajax.getStrA('../Fun/SetLocale', { code: code }, function (msg) {
            //_browser.setLang(lang);
            location.reload();
        });
    },

    //for CSP, 不使用 jQuery.blockUI(), 會有inline style 衝突!!
    block: function (obj) {
        _obj.show(_tool.xgWork);
    },

    unBlock: function (obj) {
        _obj.hide(_tool.xgWork);
    },

    //#region remark code
    /*
      ??
    xgTextBoxValid: function (obj, Regex) {
        var parent = obj.parentNode;
        if (Regex == "") {
            if (obj.value != "") {
                obj.parentNode.classList.remove("x-error");
            }
            else {
                obj.parentNode.classList.add("x-error");
                _fun.isCheck = false;
            }
        }
        else {
            if (obj.value.match(new RegExp(Regex)) != null) {
                obj.parentNode.classList.remove("x-error");
            }
            else {
                obj.parentNode.classList.add("x-error");
                _fun.isCheck = false;
            }
        }
    },

     ??
    xgCheckfn: function () {
        _fun.isCheck = true;
        var Inputs = document.getElementsByClassName('x-textbox');
        for (var i = 0; i < Inputs.length; i++) {
            Inputs[i].childNodes[1].onchange();
        }
        var selects = document.getElementsByClassName('x-select');
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].childNodes[1].value == 0 || selects[i].childNodes[1].value == "") {
                selects[i].classList.add("x-error");
                _fun.isCheck = false;
            }
            else {
                selects[i].classList.remove("x-error");
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