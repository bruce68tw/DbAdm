var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _Ajax from "./_Ajax";
import _Leftmenu from "./_Leftmenu";
import _Obj from "./_Obj";
import _Pjax from "./_Pjax";
import _Tool from "./_Tool";
//FormData
class _Fun {
    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    static init(locale) {
        //set jwt token
        //_fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        //localStorage.removeItem('_jwtToken');
        _Fun.locale = locale;
        //initial
        _Leftmenu.init();
        _Pjax.init('.x-main-right');
        _Tool.init();
        // @ts-ignore: moment is globally available
        moment.locale(_Fun.locale);
        //註冊事件, 避免使用inline script for CSRF
        const body = $('body');
        _Fun.setEvent(body, 'click'); //eventName 不含 on
        _Fun.setEvent(body, 'change');
        //資安: 防止CSRF
        $.ajaxSetup({
            headers: {
                'RequestVerificationToken': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    //server need Fun/Hello()
    //no called
    static onHelloA() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _Ajax.getStrA('../Fun/Hello', null, function (msg) {
                alert(msg);
            });
        });
    }
    //get 目前event this
    //param {bool} isObj: true(jQuery object)
    static getMe(isObj) {
        return isObj ? $(_Fun.nowDom) : _Fun.nowDom;
    }
    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} event name(不含on)
     */
    static setEvent(box, eventName) {
        //eventName ||= 'onclick'; //default event name
        const event2 = 'on' + eventName;
        box.on(eventName, `[data-${event2}]`, function () {
            //set global
            _Fun.nowDom = this;
            const me = $(this);
            const fnPath = me.data(event2); // "_me.crudR.onAddRow"
            let argsStr = me.data("args");
            argsStr = (argsStr == null) ? "" : argsStr.toString(); //數字必須轉字串, 否則split error
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
            }
            else {
                console.warn(`Function ${fnPath} not found`);
            }
        });
    }
    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    static default(val, defVal) {
        return (val == null) ? defVal : val;
    }
    static hasValue(obj) {
        //can not obj != null !!
        return !(obj == null);
    }
    //on change locale, 後端必須實作 Fun/SetLocale()
    //no called
    static onSetLocaleA(code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _Ajax.getStrA('../Fun/SetLocale', { code: code }, function (msg) {
                //_browser.setLang(lang);
                location.reload();
            });
        });
    }
    //for CSP, 不使用 jQuery.blockUI(), 會有inline style 衝突!!
    static block(obj) {
        _Obj.show(_Tool.xgWork);
    }
    static unBlock(obj) {
        _Obj.hide(_Tool.xgWork);
    }
}
//#region constant (big camel) ===
//for moment.js, match to _Fun.cs CsDtFmt
_Fun.MmDateFmt = 'YYYY/MM/DD';
_Fun.MmDtFmt = 'YYYY/MM/DD HH:mm:ss';
_Fun.FidErrorMsg = '_ErrorMsg';
//input field error validation, need match server side _Web.cs
//jsPath: '../Scripts/',      //js path for load
//error BR code, same to _Fun.PreBrError, fixed len to 2
_Fun.PreBrError = 'B:';
//class name of hide RWD phone
_Fun.HideRwd = 'x-hide-rwd';
//#endregion
//variables
_Fun.locale = 'zh-TW'; //now locale, _Layout.cshmlt will set
_Fun.maxFileSize = 50971520; //upload file limit(50M)
_Fun.isRwd = false;
_Fun.pageRows = 10; //must be 10,20(not 25),50,100    
_Fun.userId = ''; //now userId
_Fun.nowDom = null; //now dom event element
//mid variables
_Fun.data = {};
//datatables column define default values
_Fun.dtColDef = {
    className: 'x-center',
    orderable: false,
    targets: '_all',
};
export default _Fun;
; //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/_Fun.js.map