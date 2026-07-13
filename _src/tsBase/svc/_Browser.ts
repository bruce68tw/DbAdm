import _Obj from './_Obj';

export default class _Browser {
    // 傳到後端的語系code 欄位
    private static _langCode: string = '_langCode';

    static pushState(url: string): void {
        history.pushState(null, '', url);
    }

    /*
    //把語系code寫入 cookie (以後可改寫入 localeStorage)
    static setLang(lang: string): void {
        $.cookie(_Browser._langCode, lang);
    }

    static zz_print(id: string, fm?: any, fnCallback?: () => void): void {
        _Browser.zz_printO(_Obj.getById(id, fm, fnCallback));
    }
    */

    static zz_printO(obj: any, fnCallback?: () => void): void {
        window.print();
        /*
        debugger;
        //var me = _me;
        var body = document.body;
        var old = body.innerHTML;
        body.innerHTML = obj.html();
        window.print();
        body.innerHTML = old;
        //_me = me;
        //_me.divRead = $('#divRead');
        //if (fnCallback !== undefined)
        //    fnCallback();
        */
    }
}