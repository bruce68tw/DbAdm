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
    static nowElm: Elm;    //now dom event element
    static lengthMenu = [10, 20, 50, 100];  //名稱配合 jquery datatables
    static jwtToken = '';   //for JWT, 登入後自行設定內容

    // mid variables
    //static data: Json = {};

    // datatables column define default values
    static dtColDef: Json = {
        className: 'x-center',
        targets: '_all',
        type: 'string',
        orderable: false,
        orderSequence: ['asc', 'desc'],
    };

    //for test
    static async onHelloA() {
        await _Ajax.getStrA('../Fun/Hello', null, function (msg: string) {
            alert(msg);
        });
    }

    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    static async init(locale: string) {
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

        //??可能是F5重整, 要新載入目前功能
        _Prog.init();
    }

    static async setLocaleA(locale: string) {
        await _Fun.loadScriptA(`/locale/${locale}.min.js`);

        // Dayjs locale
        //dayjs.locale(code.toLowerCase());
        _Date.setLocale(locale);

        // bootstrap-datepicker
        //$.fn.datepicker.dates[code] = module.datepicker;
    }

    //載入 & 執行 script
    //這裡不能省略 Promise<void>
    static async loadScriptA(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    //trigger 事件的 jquery object
    static getMe(): JQuery {
        return $(_Fun.nowElm);
    }

    static getMeElm(): Elm {
        return _Fun.nowElm;
    }

    static getMeValue(): any {
        return _Input.getO($(_Fun.nowElm));
    }

    /**
     * 註冊事件, 避免使用inline script for CSRF
     * 使用全域變數 window
     * param {object} box 容器
     * param {string} eventName name(不含on)
     */
    static setEvent(box: JQuery, eventName: string): void {
        var event2 = 'on' + eventName;
        box.on(eventName, `[data-${event2}]`, function (this: Elm) {
            _Fun.nowElm = this;

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

    //block ui
    static block(): void {
        _Obj.show(_Tool.xWork);
    }

    //unblock ui
    static unBlock(): void {
        _Obj.hide(_Tool.xWork);
    }
}
window._Fun = _Fun;