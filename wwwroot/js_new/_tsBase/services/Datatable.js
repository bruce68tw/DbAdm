import _Ajax from "./_Ajax";
import _Fun from "./_Fun";
import _Json from "./_Json";
import _Tool from "./_Tool";
import _Var from "./_Var";
/**
 * create jQuery dataTables object
 * param selector {string} datatable selector
 * param url {string} backend action url
 * param dtConfig {json} datatables config, 自定欄位如下：
 * showWork: {bool} default false, 查詢時是否顯示作業中...
 * param findJson {json} (optional) find condition when initial
 * param fnOk {function} (optional) callback after query ok, if empty then show successful msg
 * param tbarHtml {string} (optional) datatable toolbar html for extra button for 客製化 toolbar
 * param fnAfterFind {function} (optional) 查詢成功後執行, 傳入result, 如果有指定fnOk
 */
export default class Datatable {
    /**
     * @param selector datatable selector
     * @param url backend action url
     * @param dtConfig datatables config
     * @param findJson (optional) find condition when initial
     * @param fnOk (optional) callback after query ok, if empty then show successful msg
     * @param tbarHtml (optional) datatable toolbar html for extra button for 客製化 toolbar
     * @param fnAfterFind (optional) 查詢成功後執行, 傳入result, 如果有指定fnOk
     */
    constructor(selector, url, dtConfig, findJson, fnOk, tbarHtml, fnAfterFind) {
        //public property 
        this.dt = null; //jquery datatables object
        this.recordsFiltered = -1; //found count, -1 for recount, name map to DataTables
        this.defaultShowOk = true; //whethor show find ok msg, default value
        //private
        //keep start row idx, false(find), true(save reload)
        this._keepStart = false;
        //now start row idx, coz ajax.dataSrc() always get 0 !!
        this._start = 0;
        this.findJson = findJson;
        this.showWork = (dtConfig.showWork == null) ? false : dtConfig.showWork;
        this._fnAfterFind = fnAfterFind;
        this._nowShowOk = this.defaultShowOk;
        //must put last
        this.init(selector, url, dtConfig, fnOk, tbarHtml);
    }
    /**
     * reset found count
     */
    resetCount() {
        //var count = reset ? -1 : this.dt.recordsFiltered;
        this.recordsFiltered = -1;
    }
    /**
     * find rows
     * param findJson {json} find condition
     */
    find(findJson) {
        this.findJson = findJson;
        //this.findStr = findStr || '';
        this.resetCount(); //recount first
        //trigger dataTables search event
        //this.dt.search(this.findStr).draw();
        // Use non-null assertion '!' on this.dt as it is initialized in the constructor
        this.dt.search('').draw(!this._keepStart);
    }
    /**
     * refind with same condition for refresh form
     * not show find ok msg
     */
    reload() {
        this._keepStart = true;
        this._nowShowOk = false; //not show find ok msg
        this.find(this.findJson);
    }
    /**
     * initial jquery datatables, 參數參考前面的建構子
     */
    init(selector, url, dtConfig, fnOk, tbarHtml) {
        //default config for dataTables
        let config = {
            //deferLoading: 0,    //0表示一開始不自動執行
            pageLength: _Fun.pageRows || 10,
            lengthMenu: [10, 20, 50, 100], //25 -> 20 for more friendly
            processing: false, //use custom processing msg
            serverSide: true, //server pagination
            jQueryUI: false,
            filter: false, //find string            
            paginate: true, //paging          
            lengthChange: true, //set page rows
            info: true, //show page info, include now page, total pages
            sorting: [], //default not sorting, or datatable will sort by first column !!
            pagingType: "full_numbers",
            //stateSave: true,
            //ordering: false,
            //set locale file
            language: {
                url: "/locale/" + _Fun.locale + "/dataTables.txt",
            },
            //default toolbar layout
            //dom: '<"toolbar">t<li>p',
            dom: `
t
<"row d-flex justify-content-between align-items-center mt-2"
    <"col d-flex align-items-center gap-2 li-container"li>
    <"col-auto"p>
>
`,
            //call after dataTables initialize
            //1.add toolbar button list if need
            //2.change find action: find after enter !!
            initComplete: function (settings, json) {
                //1.toolbar
                if (tbarHtml)
                    $(this).closest('.tableRead_wrapper').find('div.toolbar').html(tbarHtml);
                //check filter existed
                const filter = $(selector + "_filter input");
                if (filter.length > 0) {
                    //2.unbind first
                    filter.off();
                    //bind key enter for quick search
                    const api = this.dt;
                    filter.on('keyup', (e) => {
                        if (e.key === 'Enter') {
                            this.resetCount();
                            //run search
                            api.search(filter.val()).draw(); //must draw() !!
                        }
                    });
                }
                else {
                    //console.log('no dataTables filter !!');
                    //return;
                }
            }.bind(this),
            //ajax config(not standard jquery ajax !!)
            //me: this,
            ajax: {
                //config
                url: url,
                type: 'POST',
                dataType: 'json',
                /*
                beforeSend: function (jqXHR) {
                    //debugger;
                    if (_fun.jwtToken)
                        jqXHR.setRequestHeader("Authorization", "Bearer " + _fun.jwtToken);
                },
                */
                //add input parameter for datatables
                data: function (arg) {
                    //如果存在 _me.fnWhenFind(傳回bool), 則先檢查
                    if (_me && _me.fnWhenFind) {
                        if (!_me.fnWhenFind())
                            return;
                    }
                    //write order.fid if any
                    const orders = arg.order;
                    if (orders.length > 0) {
                        const order = orders[0];
                        order.fid = arg.columns[order.column].data;
                    }
                    arg.findJson = _Json.toStr(this.findJson); //string type
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),
                //on success (cannot use success event), see DataTables document !!
                dataSrc: function (result) {
                    // Use non-null assertion '!' on this.dt as it is initialized in the constructor
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset
                    //只顯示錯誤訊息, 不處理欄位 validation error
                    const errMsg = _Ajax.resultToErrMsg(result);
                    if (errMsg) {
                        _Tool.msg(errMsg);
                        result.recordsFiltered = 0;
                        this.recordsFiltered = 0;
                        return []; //no null, or jquery will get wrong !!
                    }
                    else {
                        //set global
                        this.recordsFiltered = result.recordsFiltered;
                        if (fnOk) {
                            return fnOk(result);
                        }
                        else if (result.data === null || result.data.length === 0) {
                            _Tool.alert(_BR.FindNone, 'R');
                            if (this._fnAfterFind)
                                this._fnAfterFind({});
                            return [];
                        }
                        else {
                            if (this._nowShowOk)
                                _Tool.alert(_BR.FindOk);
                            this._nowShowOk = this.defaultShowOk; //reset to default
                            if (this._fnAfterFind)
                                this._fnAfterFind(result);
                            return result.data;
                        }
                    }
                }.bind(this),
                //on error
                error: function (xhr, ajaxOptions, thrownError) {
                    _Tool.hideWait();
                    _Tool.msg('Datatable.js error.');
                    if (xhr != null) {
                        console.log('status' + xhr.status);
                        console.log(thrownError);
                    }
                },
            },
        };
        //add custom columnDefs
        if (dtConfig) {
            if (_Var.notEmpty(dtConfig.columnDefs)) {
                const colDefs = dtConfig.columnDefs;
                // Assuming _Fun.dtColDef is available and correct type
                colDefs[colDefs.length] = _Fun.dtColDef; //add last array element
            }
            config = _Json.copy(dtConfig, config); // Type assertion needed for merge
        }
        //add data-rwd-th if need
        const dt = $(selector);
        /*
        if (_fun.isRwd) {
            //讀取多筆資料 header (set this._rwdTh[])
            var me = this;
            me._rwdTh = [];
            dt.find('th').each(function (idx) {
                me._rwdTh[idx] = $(this).text() + '：';
            });
            config.createdRow = function (row, data, dataIndex) {
                $(row).find('td').each(function (idx) {
                    $(this).attr('data-rwd-th', me._rwdTh[idx]);
                });
            };
        }
        */
        // Explicitly cast the result to DataTables.Api
        this.dt = dt.DataTable(config);
        // 在 settings 物件掛自訂屬性
        // Accessing settings() directly on the API instance
        this.dt.settings()[0].showWork = this.showWork;
        //before/after ajax call, show/hide waiting msg
        dt.on('preXhr.dt', (e, settings, data) => {
            // settings has been augmented with showWork
            if (settings.showWork)
                _Fun.block();
        });
        dt.on('xhr.dt', (e, settings, data) => {
            if (settings.showWork)
                _Fun.unBlock();
        });
    }
} //class
//# sourceMappingURL=../../../map/_tsBase/services/Datatable.js.map