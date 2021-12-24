
/**
 * create jQuery dataTables object
 * param selector {string} datatable selector
 * param url {string} backend action url
 * param dtConfig {json} datatables config
 * param findJson {json} (optional) find condition when initial
 * param fnOk {function} (optional) callback after query ok, if empty then show successful msg
 * param tbarHtml {string} (optional) datatable toolbar html for extra button
 */
function Datatable(selector, url, dtConfig, findJson, fnOk, tbarHtml) {

    //public property 
    this.dt = null;             //jquery datatables object
    this.findJson = findJson;   //find condition
    this.recordsFiltered = -1;  //found count, -1 for recount, name map to DataTables
    this.defaultShowOk = true;  //whethor show find ok msg, default value

    //private
    //keep start row idx, false(find), true(save reload)
    this._keepStart = false;

    //now start row idx, coz ajax.dataSrc() always get 0 !!
    this._start = 0;

    //(now)show find ok msg or not
    this._nowShowOk = this.defaultShowOk;      
        
    /**
     * reset found count
     */ 
    this.resetCount = function () {
        //var count = reset ? -1 : this.dt.recordsFiltered;
        this.recordsFiltered = -1;
    };

    /**
     * find rows
     * param findJson {json} find condition
     */
    this.find = function (findJson) {

        this.findJson = findJson;
        //this.findStr = findStr || '';
        this.resetCount();   //recount first

        //trigger dataTables search event
        //this.dt.search(this.findStr).draw();
        this.dt.search('').draw(!this._keepStart);
    };

    /**
     * refind with same condition for refresh form
     * not show find ok msg
     */ 
    this.reload = function () {
        this._keepStart = true;
        this._nowShowOk = false;  //not show find ok msg
        this.find(this.findJson);
    };

    /**
     * initial jquery datatables, 參數參考前面的建構子
     */
    this.init = function (selector, url, dtConfig, fnOk, tbarHtml) {
        
        //default config for dataTables
        var config = {
            processing: false,  //use custom processing msg
            serverSide: true,   //server pagination
            jQueryUI: false,
            filter: false,      //find string            
            paginate: true,     //paging          
            lengthChange: true, //set page rows
            info: true,         //show page info, include now page, total pages
            sorting: [],        //default not sorting, or datatable will sort by first column !!
            pagingType: "full_numbers",
            //stateSave: true,
            //ordering: false,

            //set locale file
            language: {
                url: "/locale/" + _fun.locale + "/dataTables.txt",
            },

            //default toolbar layout
            dom: _crud.dtDom,

            //call after dataTables initialize
            //1.add toolbar button list if need
            //2.change find action: find after enter !!
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

            //ajax config(not standard jquery ajax !!)
            //me: this,
            ajax: {
                //config
                url: url,
                type: 'POST',
                dataType: 'json',

                //add input parameter for datatables
                data: function (arg) {
                    arg.findJson = _json.toStr(this.findJson);    //string type
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),                

                //on success (cannot use success event), see DataTables document !!
                dataSrc: function (result) {
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset

                    var msg = _ajax.resultToMsg(result);
                    if (msg) {
                        _tool.msg(msg);
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
                    _tool.hideWait();
                    _tool.msg('Datatable.js error.');
                    if (xhr != null) {
                        console.log('status' + xhr.status);
                        console.log(thrownError);
                    }
                },
            },
        };

        //add custom columnDefs
        if (dtConfig) {
            if (!_var.isEmpty(dtConfig.columnDefs)) {
                var colDefs = dtConfig.columnDefs;
                colDefs[colDefs.length] = _crud.dtColDef;
            }
            config = _json.copy(dtConfig, config);
        }
        
        //before/after ajax call, show/hide waiting msg
        var dt = $(selector);
        dt.on('preXhr.dt', function (e, settings, data) { _fun.block(); });
        dt.on('xhr.dt', function (e, settings, data) { _fun.unBlock(); });
        this.dt = dt.DataTable(config);

        //.DataTables() will return DataTable API instance, but .dataTable() only return jQuery object !!
        //return { datatable: dt.DataTable(config), findJson: {} };
    };

    //must put last
    this.init(selector, url, dtConfig, fnOk, tbarHtml);

} //class