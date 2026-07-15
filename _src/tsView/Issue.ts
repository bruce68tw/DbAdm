import {
    CrudR, EditMany, FunEstr, _Ajax, _Btn, _Date, _Edit, _Form, _Fun,
    _Obj, _Str, _Tool, _iDate, _iSelect, _iText
} from "@baseJs";

_me = {
    issueId: '',        //要追踪或取消的Issue.Id
    hasWatchId: '',     //是否有IssueWatch.Id

    init: function () {
        //datatable config
        var config = {
            //showWork: true,     //顯示作業中
            pageLength: 50,
            columns: [
                { data: 'ProjectName', orderable: true },
                { data: 'ProgName', orderable: true },
                { data: 'IssueTypeName', orderable: true },
                { data: 'WorkDate', orderable: true },
                { data: 'WorkHours' },
                { data: 'Id' },
                { data: 'Title' },
                { data: 'IsFinish' },       //7:Issue是否結案
                { data: 'FromMgrName' },
                { data: 'OwnerName' },
                { data: 'SendTimes' },      //9:寄送問卷次數
                { data: '_Survey' },        //10.空白(沒有問卷Id && 沒有回報人)/已填問卷(有問卷Id)/寄送問卷(有回報人)
                { data: '_fun' },
            ],
            columnDefs: [
                { targets: [3], render: function (data, type, full, meta) {
                    return _Date.dsToUiDate(data);
                }},
                { targets: [7], render: function (data, type, full, meta) {
                    return _me.crudR.dtYesEmpty(data);
                }},
                { targets: [11], render: function (data, type, full, meta) {
                    return _Str.notEmpty(full.SurveyId) ? '是' :
                        (full.IsFinish == 1 && _Str.notEmpty(full.RptUser) && (full.OwnerId == _Fun.userId || _Fun.userId=='Bruce'))
                            ? `<button type='button' class='btn btn-secondary' data-onclick='_me.onSurvey' data-args='${full.Id}'>寄問卷</button>`
                            : '';
                }},
                { targets: [12], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mIssueFile = new EditMany('Id', 'tbodyIssueFile', 'tplIssueFile', 'tr');
        _me.mIssueRelat = new EditMany('Id', 'tbodyIssueRelat', 'tplIssueRelat', 'tr');
        new CrudR(config, [null, _me.mIssueFile, _me.mIssueRelat]);

    },

    fnAfterFind: function (result) {
        $('#SumHours').text(result.SumHours || 0);
    },

    //開啟編輯畫面時自動觸發
    //如果是主管交辦, 則標題、交辦主管設定唯讀
    fnAfterOpenEdit: function (fun, json) {
        const FromMgr = 'FromMgr';
        var isFunU = (fun == FunEstr.Update);
        var eform = _me.eform0;

        if (isFunU || fun == FunEstr.View) {
            //設定專案功能欄位
            var row0 = _Edit.jsonGetRows0(json);
            _me.onChgProject(1, row0.ProgId);

            //設定追踪按鈕
            _me.issueId = row0.Id;
            _me.hasWatchId = _Str.notEmpty(row0.WatchId);
            _me.setWatchBtn(true);

            //set edit status

            if (isFunU){
                var hasFromMsg = _Str.notEmpty(_iSelect.get(FromMgr, eform));
                _iText.setEdit('Title', !hasFromMsg, eform);
                _iSelect.setEdit(FromMgr, !hasFromMsg, eform);
            }

            //設定延續工作按鈕的狀態
            _me.setKeepBtn(row0.OwnerId == _Fun.userId);
        } else {
            //新增
            _iSelect.set('OwnerId', _Fun.userId, eform);       //處理人員預設自己
            _iDate.set('WorkDate', _Date.uiToday(), eform);    //工作日期預設今天

            //set edit status
            _iText.setEdit('Title', true, eform);
            _iSelect.setEdit(FromMgr, true, eform);

            _me.setWatchBtn(false);
            _me.setKeepBtn(false);
        }
    },

    fnWhenSave: function (fun) {
        //set _IssueType, _RptUser
        var form = _me.eform0;
        _iText.set('_IssueType', _iSelect.get('IssueType', form), form);
        _iText.set('_RptUser', _iText.get('RptUser', form), form);
    },

    //寄問卷
    onSurvey: async function (issueId) {
        if (await _Tool.ansA('是否確定寄送問卷?')) {
            await _Ajax.getStrA('SendSurvey', { issueId: issueId }, function (str) {
                var ok = (str == '1');
                _Tool.msg(ok ? '成功寄送問卷。' : '無法寄送問卷 !!');
                if (ok) {
                    _me.crudR.dt.reload();
                }
            });
        }
    },

    //設定延續工作按鈕的狀態
    setKeepBtn: function (isShow) {
        var btn = _me.divEdit.find('#btnKeepIssue');
        if (isShow)
            _me.showBtn(btn);
        else
            _Obj.hide(btn);
    },

    //show & enabled button
    showBtn: function (btn) {
        _Obj.show(btn);
        _Btn.setEdit(btn, true);
    },

    //設定追踪按鈕的狀態
    setWatchBtn: function (isShow) {
        var box = _me.divEdit;
        var btnAdd = box.find('#btnAddWatch');
        var btnDel = box.find('#btnDeleteWatch');
        if (!isShow){
            _Obj.hide(btnAdd);
            _Obj.hide(btnDel);
        } else if (_me.hasWatchId){
            _Obj.hide(btnAdd);
            _me.showBtn(btnDel);
        } else {
            _me.showBtn(btnAdd);
            _Obj.hide(btnDel);
        }
    },

    //on change projectId
    //此時isEdit為字串, 因為 EventArgs 無法傳bool
    onChgProject: function (isEdit, progId) {
        _iSelect.changeParent('_ProjectId', 'ProgId', progId, 'GetPrjProgs', (isEdit == 1));
    },

    //onclick viewFile, called by XiFile component
    onViewFile: function (table, fid) {
        if (fid == 'FileName')
            _me.mIssueFile.onViewFile(table, fid);
    },

    onMyToday: function () {
        var today = _Date.uiToday();
        var box = _me.rform;
        _me.crudR.onResetFind();   //reset
        _iSelect.set('OwnerId', _Fun.userId, box);
        _iDate.set('WorkDate', today, box);
        _iDate.set('WorkDate2', today, box);
        _me.crudR.onFind();
    },

    //因為onFind2使用_form.hideShow, 這裡必須一致才能正確顯示rform2
    showRform2: function () {
        _Form.hideShow(null, [_me.rform2]);
    },

    onMyWeek: function () {
        var box = _me.rform;
        _me.crudR.onResetFind();   //reset
        _iSelect.set('OwnerId', _Fun.userId, box);
        _iDate.set('WorkDate', _Date.uiWeekMonday(), box);
        _iDate.set('WorkDate2', _Date.uiWeekFriday(), box);
        _me.crudR.onFind();
    },

    //我的未結案
    onMyNotFinish: function () {
        var box = _me.rform;
        var box2 = _me.rform2;
        //_obj.show(box2);
        _me.showRform2();
        _me.crudR.onResetFind();   //reset
        _iSelect.set('OwnerId', _Fun.userId, box);
        _iSelect.set('IsFinish', '0', box2);
        _me.crudR.onFind();
    },
        
    //我的追踪
    onMyWatch: function () {
        var box2 = _me.rform2;
        //_obj.show(box2);
        _me.showRform2();
        _me.crudR.onResetFind();   //reset
        _iSelect.set('_IsWatch', '1', box2);
        _me.crudR.onFind();
    },

    //我的交辦(全部)
    onMyAskAll: function () {
        var box2 = _me.rform2;
        //_obj.show(box2);
        _me.showRform2();
        _me.crudR.onResetFind();   //reset
        _iSelect.set('FromMgr', _Fun.userId, box2);
        _me.crudR.onFind();
    },

    //我的交辦(未完成)
    onMyAskPend: function () {
        var box2 = _me.rform2;
        //_obj.show(box2);
        _me.showRform2();
        _me.crudR.onResetFind();   //reset
        _iSelect.set('FromMgr', _Fun.userId, box2);
        _iSelect.set('IsFinish', '0', box2);
        _me.crudR.onFind();
    },

    //加入追踪
    onAddWatch: async()=>{
        _Tool.ans('是否確定加入追踪?', async()=>{
            await _Ajax.getStrA('AddWatch', {issueId: _me.issueId}, function(str){
                var ok = (str == '1');
                _Tool.msg(ok ? '成功加入追踪。' : '無法加入此筆追踪 !!');
                if (ok){
                    _me.hasWatchId = true;
                    _me.setWatchBtn(true);
                }                        
            });
        });
    },

    //取消追踪
    onDeleteWatch: async () => {
        _Tool.ans('是否確定取消追踪?', async()=>{
            await _Ajax.getStrA('DeleteWatch', { issueId: _me.issueId }, (str) => {
                var ok = (str == '1');
                _Tool.msg(ok ? '已取消追踪。' : '無法取消此筆追踪 !!');
                if (ok){
                    _me.hasWatchId = false;
                    _me.setWatchBtn(true);
                }                        
            });
        });
    },

    //延續工作        
    onKeepIssue: ()=>{
        _Tool.ans('是否確定延續此筆工作?', ()=>{
            //變成新增狀態
            _me.crudE.editToNew(); 

            //設定按鈕
            _me.setWatchBtn(false);
            _me.setKeepBtn(false);

            //title欄位前面加上'(續)'
            var title = _Obj.get('Title', _me.eform0);
            _iText.setO(title, '(續)'+ _iText.getO(title))
            _iDate.set('WorkDate', _Date.uiToday(), _me.eform0);    //工作日期預設今天

            //reset & 增加一筆相關工作
            _me.mIssueFile.reset();
            _me.mIssueRelat.reset();
            _me.mIssueRelat.addRow({SourceIssue: _me.issueId});
        });
    },

}; //class
