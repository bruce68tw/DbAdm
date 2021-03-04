
/**
 * 建立 jQuery dataTables
 * selector {string} datatable selector
 * url {string} backend action url
 * dtConfig {json} datatables config
 * findJson {json} 初始化時的查詢條件
 * fnOk {function}: 查詢成功時的callback, 如果空白, 則顯示成功訊息
 * tbarHtml {string}: datatable toolbar html for 增加額外的功能按鈕
 */
function Datatable(selector, url, dtConfig, findJson, fnOk, tbarHtml) {

    //public property 
    this.dt = null;             //datatable object
    this.findJson = findJson;   //查詢條件
    //this.findStr = '';          //快速查詢字串    
    this.recordsFiltered = -1;  //查詢筆數, -1表重新計算, 名稱配合DataTables
    this.defaultShowOk = true;  //是否顯示查詢成功訊息, default value

    //private
    //從上次查詢的頁次開始, false(查詢), true(儲存後重整UI)
    this._keepStart = false;

    //記錄目前的開始行數, 因為在 ajax.dataSrc() 無法得到(會得0)
    this._start = 0;

    //(目前)是否顯示查詢成功訊息
    this._nowShowOk = this.defaultShowOk;      
        
    /**
     * 重新計算筆數
     */ 
    this.resetCount = function () {
        //var count = reset ? -1 : this.dt.recordsFiltered;
        this.recordsFiltered = -1;
    };

    /**
     * 查詢資料
     * findJson {json} 查詢條件
     * search {string} 搜尋字串
     */
    this.find = function (findJson) {

        //debugger;
        this.findJson = findJson;
        //this.findStr = findStr || '';
        this.resetCount();   //重新計算條件下的筆數

        //trigger dataTables search event
        //this.dt.search(this.findStr).draw();
        this.dt.search('').draw(!this._keepStart);
    };

    /**
     * 用相同的條件再查詢一次, 用於資料更新之後
     * 不顯示 "查詢成功" 訊息
     */ 
    this.reload = function () {
        this._keepStart = true;
        this._nowShowOk = false;  //不顯示成功訊息
        this.find(this.findJson);
    };

    /**
     * initial jquery datatables, 參數參考前面的建構子
     */
    this.init = function (selector, url, dtConfig, fnOk, tbarHtml) {
        
        //default config for dataTables
        var config = {
            processing: false,  //使用自定義的處理中訊息
            serverSide: true,   //server pagination
            jQueryUI: false,    //可載入Jquery UI主題  
            //stateSave: true,    //
            //ordering: false,
            filter: false,      //搜尋            
            paginate: true,     //翻頁功能            
            lengthChange: true, //改變每頁顯示數據數量            
            info: true,         //顯示表格的相關資訊，包括當前頁面紀錄，以及總記錄頁面數量。
            sorting: [],        //default not sorting, 否則datatable會使用第一個欄位排序 !!
            pagingType: "full_numbers",

            //多國語
            language: {
                url: "../locale/" + _fun.locale + "/dataTables.txt",
            },

            //自訂工具列
            dom: 'l<"toolbar">frtip',

            //dataTables完成初始化之後會呼叫這個函式
            //1.增加 toolbar button list if need
            //2.改變查詢欄位的行為, 按下 enter 時才執行查詢
            initComplete: function (settings, json) {
                //1.toolbar
                if (tbarHtml)
                    $(this).closest('.dataTables_wrapper').find('div.toolbar').html(tbarHtml);

                //check filter existed
                var filter = $(selector + "_filter input");
                if (filter.length > 0) {
                    //2.unbind first
                    filter.unbind();

                    //bind key enter for quick search
                    var api = this.api();
                    filter.bind('keyup', function (e) {
                        if (e.keyCode === 13) {
                            this.resetCount();

                            //run search
                            api.search(this.value).draw();     //must draw() !!
                        }
                    });
                } else {
                    //console.log('no dataTables filter !!');
                    //return;
                }
            }.bind(this),

            //ajax config(不是標準的 jquery ajax !!)
            //me: this,
            ajax: {
                //config
                url: url,
                type: 'POST',
                dataType: 'json',

                //增加傳入參數 for datatables
                data: function (arg) {
                    //debugger;
                    arg.findJson = _json.toStr(this.findJson);    //以字串型式傳入
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),                

                //on success
                //cannot use success, see dataTables document !!
                dataSrc: function (result) {
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset

                    //debugger;
                    //data is mapping to backend ErrorModel
                    if (result.ErrorMsg != null && result.ErrorMsg != "") {
                        _tool.msg(result.ErrorMsg);
                        result.recordsFiltered = 0;
                        this.recordsFiltered = 0;
                        return [];  //no null, or jquery will get wrong !!

                    } else {
                        //set global
                        this.recordsFiltered = result.recordsFiltered;

                        if (fnOk) {
                            return fnOk(result);
                        } else if (result.data === null || result.data.length === 0) {
                            _tool.alert(_BR.FindNone, 'R');
                            return [];
                        } else {
                            if (this._nowShowOk)
                                _tool.alert(_BR.FindOk);
                            this._nowShowOk = this.defaultShowOk;  //reset to default
                            return result.data;
                        }
                    }
                }.bind(this),

                //on error
                error: function (xhr, ajaxOptions, thrownError) {
                    //debugger;
                    _tool.hideWait();
                    _tool.msg('Datatable.js error.');
                    if (xhr != null) {
                        console.log('status' + xhr.status);
                        console.log(thrownError);
                    }
                },
            },
        };

        //add custom config
        if (dtConfig)
            config = _json.copy(dtConfig, config);
        
        //before/after ajax call, show/hide waiting msg
        var dt = $(selector);
        dt.on('preXhr.dt', function (e, settings, data) { _tool.showWait(); });
        dt.on('xhr.dt', function (e, settings, data) { _tool.hideWait(); });
        this.dt = dt.DataTable(config);
        //.DataTables() will return DataTable API instance, but .dataTable() only return jQuery object !!
        //return { datatable: dt.DataTable(config), findJson: {} };
    };

    //必須放最後面
    this.init(selector, url, dtConfig, fnOk, tbarHtml);

} //class