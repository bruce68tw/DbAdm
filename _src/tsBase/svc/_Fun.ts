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
    // #region constant (big camel) ===
    static readonly MmDateFmt = 'YYYY/MM/DD';
    static readonly MmDtFmt = 'YYYY/MM/DD HH:mm:ss';
    static readonly FidErrorMsg = '_ErrorMsg';
    static readonly PreBrError = 'B:';
    static readonly CssFlag = 'x-flag';
    static readonly HideRwd = 'x-hide-rwd';
    // #endregion

    // variables
    static userId = '';
    static locale = 'zh-TW';
    static maxFileSize = 50971520;  //upload file limit(50M)
    static isRwd = false;   
    static pageRows = 10;   //must be 10,20(not 25),50,100
    static nowDom: Elm;    //now dom event element
    static lengthMenu = [10, 20, 50, 100];
    static jwtToken = '';   //for JWT, 登入後自行設定內容

    // mid variables
    static data: Json = {};

    // datatables column define default values
    static dtColDef: any = {
        className: 'x-center',
        targets: '_all',
        type: 'string',
        orderable: false,
        orderSequence: ['asc', 'desc'],
    };

    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    static async init(locale: string): Promise<void> {
        //set jwt token
        _Fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        localStorage.removeItem('_jwtToken');

        //initial
        _Fun.locale = locale;
        _Leftmenu.init();
        _Pjax.init('.x-main-right');
        _Tool.init();
        await _Fun.setLocaleA(locale);
        _Date.setLocale(locale);

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

        //可能是F5重整, 要新載入目前功能
        _Prog.init();
    }

    static async setLocaleA(code: string) {
        const module = await import(
            `/locale/${code}.min.js`
        );

        window._BR = module.default;

        // Dayjs locale
        dayjs.locale(code.toLowerCase());

        // bootstrap-datepicker
        //$.fn.datepicker.dates[code] = module.datepicker;
    }

    static async onHelloA(): Promise<void> {
        await _Ajax.getStrA('../Fun/Hello', null, function (msg: string) {
            alert(msg);
        });
    }

    static getMe(): JQuery {
        return $(_Fun.nowDom);
    }

    static getMeElm(): Elm {
        return _Fun.nowDom;
    }

    static getMeValue(): any {
        return _Input.getO($(_Fun.nowDom));
    }

    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} eventName name(不含on)
     */
    static setEvent(box: JQuery, eventName: string): void {
        var event2 = 'on' + eventName;
        box.on(eventName, `[data-${event2}]`, function (this: Elm) {
            _Fun.nowDom = this;

            const me = $(this);
            const fnPath = me.data(event2);
            let argsStr = me.data("args");
            argsStr = (argsStr == null) ? "" : argsStr.toString();
            const args = argsStr ? argsStr.split(",") : [];

            const parts = fnPath.split(".");
            let obj:any = window;
            for (let i = 0; i < parts.length - 1; i++) {
                obj = obj[parts[i]];
            }
            const fnName = parts[parts.length - 1];
            const fn = obj[fnName];

            if (typeof fn === "function") {
                fn.apply(obj, args);
            } else {
                console.warn(`Function ${fnPath} not found`);
            }
        });
    }

    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    static default(val: StrNum, defVal: StrNum): StrNum {
        return (val == null) ? defVal : val;
    }

    static hasValue(obj: StrNum): boolean {
        return !(obj == null);
    }

    static block(): void {
        _Obj.show(_Tool.xWork);
    }

    static unBlock(): void {
        _Obj.hide(_Tool.xWork);
    }
}
window._Fun = _Fun;