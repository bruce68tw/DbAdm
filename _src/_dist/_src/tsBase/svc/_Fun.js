//import moment from "moment";
import _Ajax from './_Ajax';
import _Leftmenu from './_Leftmenu';
import _Pjax from './_Pjax';
import _Tool from './_Tool';
import _Input from './_Input';
import _Obj from './_Obj';
/*
export interface DtColDef {
    className?: string;
    targets?: string;
    type?: string;
    orderable?: boolean;
    orderSequence?: string[];
    [key: string]: any;
}
*/
class _Fun {
    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    static init(locale) {
        //set jwt token
        _Fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        localStorage.removeItem('_jwtToken');
        //initial
        _Fun.locale = locale;
        _Leftmenu.init();
        _Pjax.init('.x-main-right');
        _Tool.init();
        moment.locale(_Fun.locale);
        //註冊事件, 避免使用inline script for CSRF
        var body = $('body');
        _Fun.setEvent(body, 'click');
        _Fun.setEvent(body, 'change');
        //資安: 防止CSRF
        $.ajaxSetup({
            headers: {
                'RequestVerificationToken': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
    static async onHelloA() {
        await _Ajax.getStrA('../Fun/Hello', null, function (msg) {
            alert(msg);
        });
    }
    static getMe() {
        return $(_Fun.nowDom);
    }
    static getMeElm() {
        return _Fun.nowDom;
    }
    static getMeValue() {
        return _Input.getO($(_Fun.nowDom));
    }
    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} eventName name(不含on)
     */
    static setEvent(box, eventName) {
        var event2 = 'on' + eventName;
        box.on(eventName, `[data-${event2}]`, function () {
            _Fun.nowDom = this;
            var me = $(this);
            const fnPath = me.data(event2);
            var argsStr = me.data("args");
            argsStr = (argsStr == null) ? "" : argsStr.toString();
            const args = argsStr ? argsStr.split(",") : [];
            const parts = fnPath.split(".");
            let obj = window;
            for (let i = 0; i < parts.length - 1; i++) {
                obj = obj[parts[i]];
            }
            const fnName = parts[parts.length - 1];
            const fn = obj[fnName];
            if (typeof fn === "function") {
                fn.apply(obj, args);
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
        return !(obj == null);
    }
    /*
    //move to _Locale.setLocaleA
    static async onSetLocaleA(code: string): Promise<void> {
        await _Ajax.getStrA('../Fun/SetLocale', { code: code }, function (msg: string) {
            location.reload();
        });
    }
    */
    static block(obj) {
        _Obj.show(_Tool.xWork);
    }
    static unBlock(obj) {
        _Obj.hide(_Tool.xWork);
    }
}
// #region constant (big camel) ===
_Fun.MmDateFmt = 'YYYY/MM/DD';
_Fun.MmDtFmt = 'YYYY/MM/DD HH:mm:ss';
_Fun.FidErrorMsg = '_ErrorMsg';
_Fun.PreBrError = 'B:';
_Fun.CssFlag = 'x-flag';
_Fun.HideRwd = 'x-hide-rwd';
// #endregion
// variables
_Fun.userId = '';
_Fun.locale = 'zh-TW';
_Fun.maxFileSize = 50971520; //upload file limit(50M)
_Fun.isRwd = false;
_Fun.pageRows = 10; //must be 10,20(not 25),50,100
_Fun.nowDom = ''; //now dom event element
_Fun.lengthMenu = [10, 20, 50, 100];
_Fun.jwtToken = ''; //for JWT, 登入後自行設定內容
// mid variables
_Fun.data = {};
// datatables column define default values
_Fun.dtColDef = {
    className: 'x-center',
    targets: '_all',
    type: 'string',
    orderable: false,
    orderSequence: ['asc', 'desc'],
};
export default _Fun;
