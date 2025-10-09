import 'jquery-pjax';
import _Ajax from "./_Ajax";
import _Leftmenu from "./_Leftmenu";
import _Prog from "./_Prog";
import _Str from "./_Str";

//SPA pjax
export default class _Pjax {

    /**
     * initial
     * param {string} boxFt : box(container) filter
     */
    static init(boxFt: string): void {
        //if skip 'POST', it will trigger twice !!
        const docu = $(document);
        // Assuming $.fn.pjax is available via a definition file or installed typings
        docu.pjax('[data-pjax]', boxFt, { type: 'POST' });

        //點擊功能項目時記錄功能名稱
        docu.on('click', '.x-leftmenu [data-pjax]', function () {
            const menuPath = _Leftmenu.getMenuPath($(this));
            _Prog.storeProgPath(menuPath);
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
        docu.on('pjax:success', function (event: any, data: string, status: string, xhr: JQueryXHR, opts: any) {
            const json = _Str.toJson(data);
            if (json != null) {
                //只顯示錯誤訊息, 不處理欄位 validation error
                const errMsg = _Ajax.resultToErrMsg(json);
                if (errMsg) {
                    $(opts.container).html(errMsg);
                }
            }
        });

        //when backend exception
        docu.on('pjax:error', function (event: any, xhr: JQueryXHR, textStatus: string, errorThrown: string, opts: any) {
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
    }

};//class