//program, 包含 crud功能
class _Prog {
    //filter: '.x-prog-path',
    static me: JQuery = null;       //prog path object
    static initPath: string = '';   //original path
    static progPath: string = '';   //now prog path
    static progCode: string = '';   //now prog code

    static async init(): Promise<void> {
        _Prog.me = $('.x-prog-path');
        //_Prog.initPath = _Prog.me.text();
        if (_Prog.me.text() == '') {
            //F5 重整時 _Prog.progPath 為空
            if (_Str.isEmpty(_Prog.progPath)) {
                //url menu -> prog path
                const nowUrl = window.location.pathname;
                const activeLink = $(`.x-leftmenu [href="${nowUrl}"]`);
                const progPath = _Leftmenu.getMenuPath(activeLink); //從功能表找功能名稱
                const progCode = _Prog.urlToProgCode(nowUrl);
                _Prog.storePathAndCode(progPath, progCode);
                //await _Prog.loadProgCodeA();
            }

            _Prog.initPath = _Prog.progPath;
            _Prog.me.text(_Prog.initPath);
        }
    }

    /* 停用自動載入功能js, 改成在 view 指定
    static async loadProgCodeA() {
        const progCode = _Prog.progCode;
        if (_Str.notEmpty(progCode))
        {
            try {
                //後面加上時間亂數避免cache !!
                await import(`/jsView/${progCode}.js?v=${Date.now()}`);
                //如果有init則執行
                if (_me && _me.init) {
                    _me.init();
                }
            } catch (err) {
                console.warn(`載入功能 JS 失敗: ${progCode}`, err);
            }
        }
    }
    */

    static setBorder(status: boolean): void {
        const prog = $('.x-prog');
        if (status)
            prog.removeClass(_Fun.CssFlag);
        else
            prog.addClass(_Fun.CssFlag);
    }

    //storeProgPath -> storePath -> storePathAndCode
    static storePathAndCode(path: string, code:string): void {
        _Prog.progPath = path;
        _Prog.progCode = code;
    }

    //getProgCode -> urlToProgCode
    //url: 考慮長短網址
    static urlToProgCode(url: string): string {
        const sep = (url.indexOf('//') >= 0) ? '//' : '/';
        let cols: string[] = url.split(sep);
        return (cols.length > 1) ? cols[1] : '';
    }
    
    //reset path to initial
    static resetPath(): void {
        _Prog.me.text(_Prog.initPath);
    }

    /**
     * setPath -> showPath
     * set program path
     * param fun {string} fun mode
     */
    static showPath(fun: FunEstr, updName?: string): void {
        const name = (fun == FunEstr.Create) ? _BR.Create :
            (fun == FunEstr.View) ? _BR.View :
            (fun != FunEstr.Update) ? '??' :
            _Str.isEmpty(updName) ? _BR.Update :
            updName;
        _Prog.updFunName(name);
    }

    /**
     * setFunName -> updFunName
     * update fun name
     * param name {string} fun name
     */
    static updFunName(name: string): void {
        _Prog.me.text(_Prog.initPath + '-' + name);
    }
}
window._Prog = _Prog;