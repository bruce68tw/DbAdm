
//會用到公用js : _fun, _xp, _datatable
//後端固定呼叫 :
//  datatables讀資料: ../OpenUser/GetPage
var _openUser = {

    //fn: 按下ok時會回call的函數
    //boxId: 必須配合引用 OpenUser partial view時的 ViewDataDictionary 的 BoxId 欄位, 2邊要一致 !! (可同時空白)
    //  modal的div id 為 _xxx, xxx為boxId
    //return: 整個openUser變數
    init: function (fn, boxId) {
        boxId = boxId || 'ou';
        //type = type || 0;
        //if (isRows === undefined)
        //    isRows = true;

        //要回傳的資料(ou: open user)
        var filter = '#_' + boxId;
        var box = $(filter);
        var ou = {
            boxId: boxId,
            filter: filter, //配合 Read.cshtml !!
            fn: fn,
            //type: _iText.get('_Type', box),
            //isAdmin: _iText.get('_IsAdmin', box),    //文字
            isRows: (_iText.get('_IsRows', box) == 1),   //bool
        };

        //datatable config
        var config = {
            dom: _crud.dtDom,
            filter: true,  //範本: 開啟文字搜尋欄位(使用自訂欄位) !!
            //columns 數必須與 datatables ui 一致
            columns: [
                { data: '_Fun' },
                { data: 'Account' },
                { data: 'Name' },
            ],
            //客製化欄位
            columnDefs: [
                _crud.dtProp,
                { targets: [0], render: function (data, type, full, meta) {
                    //多選或單選
                    var value = _str.colsToStr(full.Id, full.Name, full.Account);
                    return ou.isRows
                        ? _iCheck.dtCheck0(value)
                        : _crud.dtRadio1(value);
                }},
            ],
        };

        //初始化 datatable, table id和action必須對應正確
        //html table名稱固定為 _Table
        var table = ou.filter + ' #_Table';
        //var findJson = { OrgId: orgId, _Type: ou.type };
        ou.dt = _datatable.init(table, '../OpenUser/GetPage', config);

        /*
        //註刪click事件 for 讀取目前資料列
        $(table + ' tbody').on('click', 'tr', function () {
            ou.row = ou.dt.row(this).data();
        });
        */

        return ou;
    },

    /*
    getBaseCond: function (box, ou) {
        return {
            OrgId: _input.exist('OrgId', box) ? _iSelect.get('OrgId', box) : '',
            _IsAdmin: ou.isAdmin,
            _Type: ou.type,
        };
    },
    */

    //show modal
    show: function (ou) {
        //清除上次的選取
        //$(ou.filter + ' #_Table :checked').prop('checked', false);
        _iCheck.setF(ou.filter + ' #_Table', false);
        _modal.showF(ou.filter);
    },

    //pjax無法動態載入 .js, 所以放到這裡面
    onClickFind: function (ou) {
        var box = $(ou.filter);
        //var json = _iSelect.valuesToJson({}, ['DeptId', 'TeamId'], box);
        //json = _json.addProps(json, _openUser.getBaseCond(box, ou));
        //json._Type = _iText.get('_Type', box);
        //json._Type = ou.type;
        _datatable.find(ou.dt, null, _iText.get('Name', box));
    },

    //user click [選取]按鈕
    onClickOk: function (ou) {
        var box = $(ou.filter);
        //var fn = ou.boxId + 'OnClickOk';  //要callback的函數名稱 !!
        if (ou.isRows) {
            //多選
            var keys = _iCheck.getCheckedValues(box, _iCheck.check0Id);
            if (keys.length == 0) {
                _tool.msg('請先選取資料。');
            } else {
                //範本: 呼叫動態 function !!
                //_me[fn](keys);
                ou.fn(keys);
                _modal.hideO(box);
            }
        } else {
            //單選, radio欄位名稱固定為 _dtRadio1 !!
            var value = _iRadio.get(_iCheck.Check1Id, box);
            if (value == '') {
            //var obj = box.find('input[name=_dtRadio1]:checked');
            //if (obj.length == 0) {
                _tool.msg('請先選取資料。');
            } else {
                //_me[fn](ou.row);
                ou.fn(value);
                _modal.hideO(box);
            }
        }
    },

}; //class