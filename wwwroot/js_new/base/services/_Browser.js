// 假設的依賴靜態類別
import _Obj from "./_Obj";
// 假設 JQuery 已經在專案中定義或透過 @types/jquery 引入
/**
 * Browser related utility class
 */
class _Browser {
    /**
     * Use history.pushState to change the browser URL without reloading the page.
     * param url {string} The new URL.
     */
    static pushState(url) {
        history.pushState(null, '', url); // 將第二個參數 title 設為空字串或 null
    }
    /*
    //把語系code寫入 cookie (以後可改寫入 localeStorage)
    static setLang(lang: string): void {
        // 假設 $.cookie 存在
        $.cookie(_Browser._langCode, lang);
    }
    */
    /**
     * Print the content of a specific element identified by id.
     * param id {string} The ID of the element to print.
     * param fm {any} (Optional) The form object or context.
     * param fnCallback {function} (Optional) Callback function after printing.
     */
    static zz_print(id, fm, fnCallback) {
        // 假設 _Obj.getById 存在且返回一個物件或 jQuery 物件
        _Browser.zz_printO(_Obj.getById(id, fm), fnCallback);
    }
    /**
     * Print the content of a given object (typically a DOM/jQuery object).
     * NOTE: Original implementation only calls window.print() directly, the commented-out code
     * suggests an intention to isolate and print content, but the active code is simpler.
     * param obj {any} The object (e.g., DOM element or jQuery object) whose content should be printed (though currently ignored).
     * param fnCallback {function} (Optional) Callback function after printing.
     */
    static zz_printO(obj, fnCallback) {
        window.print();
        /*
        debugger;
        //var me = _me;
        const body = document.body;
        const old = body.innerHTML;
        body.innerHTML = obj.html(); // 假設 obj 有 html() 方法
        window.print();
        body.innerHTML = old;
        //_me = me;
        //_me.divRead = $('#divRead');
        //if (fnCallback !== undefined)
        //    fnCallback();
        */
        // 原始程式碼未呼叫 fnCallback，故此處亦不呼叫。
    }
}
//傳到後端的語系code 欄位
_Browser._langCode = '_langCode';
export default _Browser;
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Browser.js.map