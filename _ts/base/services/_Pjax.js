"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Ajax_1 = require("./_Ajax");
// import _Fun from "./_Fun"; // JWT token 相關的註解中提到
var _Leftmenu_1 = require("./_Leftmenu");
var _Prog_1 = require("./_Prog");
var _Str_1 = require("./_Str");
//SPA pjax
var _Pjax = /** @class */ (function () {
    function _Pjax() {
    }
    /**
     * initial
     * param {string} boxFt : box(container) filter
     */
    _Pjax.init = function (boxFt) {
        //if skip 'POST', it will trigger twice !!
        var docu = $(document);
        // Assuming $.fn.pjax is available via a definition file or installed typings
        docu.pjax('[data-pjax]', boxFt, { type: 'POST' });
        //點擊功能項目時記錄功能名稱
        docu.on('click', '.x-leftmenu [data-pjax]', function () {
            var menuPath = _Leftmenu_1.default.getMenuPath($(this));
            _Prog_1.default.storeProgPath(menuPath);
        });
        /*
        //PJAX請求前
        docu.on('pjax:beforeSend', function (event: any, xhr: JQueryXHR, opts: any) {
            // Assuming _fun.jwtToken is on a class named _Fun
            if (_Fun.jwtToken)
                xhr.setRequestHeader('Authorization', `Bearer ${_Fun.jwtToken}`);
        });
        */
        //'data' 是後端回傳字串, 可能為 HTML 或錯誤訊息
        docu.on('pjax:success', function (event, data, status, xhr, opts) {
            var json = _Str_1.default.toJson(data);
            if (json != null) {
                //只顯示錯誤訊息, 不處理欄位 validation error
                var errMsg = _Ajax_1.default.resultToErrMsg(json);
                if (errMsg) {
                    $(opts.container).html(errMsg);
                }
            }
        });
        //when backend exception
        docu.on('pjax:error', function (event, xhr, textStatus, errorThrown, opts) {
            opts.success(xhr.responseText, textStatus, xhr);
            return false;
        });
        //選擇性 binding event
        //xd-bind 只有用在這裡
        //debugger;
        //$('[data-pjax]:not(.xd-bind)').addClass('xd-bind').on('click', function () {
        //    //post submit
        //    //debugger;
        //    /*
        //    */
        //    $(document).on('ready pjax:success', box, function () {
        //        //bindPJAX(target); // Call initializers
        //        init();
        //        $(document).off('ready pjax:success', box); // Unbind initialization
        //    });
        //    /*
        //    $(document).on('pjax:end', function () {
        //        init();
        //        $(document).off('pjax:end');
        //    });
        //    */
        //    // PJAX-load the new content
        //    //debugger;
        //    //$.pjax.click(event, { container: $(box) });
        //    //var path = _pjax._getPath($(this), '');
        //    var url = $(this).data('pjax');
        //    _Pjax.submit(url, box);
        //});
        /*
        //如果後端驗証失敗, 則取消 submit
        $(document).on('pjax:beforeReplace', function (contents, options) {
        });
        $(document).on('pjax:end', function (data, status, xhr) {
            init();
        });
        */
        //pjax載入完成後必須程式載入.js檔案
        //$(document).on('pjax:success', function (data, status, xhr) {
        //    //_me.initByPjax();
        //    //_me.init();
        //    /*
        //    //先載入 JsLib if need
        //    var jsLib = $('#_JsLib').val();
        //    if (_Str.notEmpty(jsLib)) {
        //        $.getScript('../Scripts/' + jsLib + '.js');
        //    }
        //    //如果view包含_JsView這個hidden欄位, 則表示要載入指定的js檔案,
        //    //否則載入與controller相同名稱的js file
        //    var jsView = $('#_JsView').val();
        //    if (_Str.isEmpty(jsView)) {
        //        //get controller name, 在倒數第2個, js檔案名稱固定為controller小寫
        //        var url = data.currentTarget.URL.replace('//', '/');
        //        if (url.substr(url.length - 1, 1) == '/')
        //            url = url.substr(0, url.length - 1);
        //        var items = url.split('/');
        //        if (items.length >= 4)
        //            jsView = items[items.length - 2].toLowerCase();
        //    }
        //    //載入 jsView
        //    if (_Str.notEmpty(jsView)) {
        //        $.getScript('../Scripts/view/' + jsView + '.js', function (data, textStatus, jqxhr) {
        //            //載入成功後執行 init()
        //            if (typeof (_me) !== 'undefined')
        //                _me.init();
        //        });
        //    }
        //    */
        //});
    };
    return _Pjax;
}());
exports.default = _Pjax;
; //class
