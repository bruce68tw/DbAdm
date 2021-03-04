
var _browser = {

    //傳到後端的語系code 欄位
    _langCode: '_langCode',

    pushState: function (url) {
        history.pushState(null, null, url);
    },

    /*
    //把語系code寫入 cookie (以後可改寫入 localeStorage)
    setLang: function (lang) {
        $.cookie(_browser._langCode, lang);
    },
    */

    zz_print: function (id, fm, fnCallback) {
        _browser.printO(_obj.getById(id, fm, fnCallback));
    },
    zz_printO: function (obj, fnCallback) {
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
    },

}; //class