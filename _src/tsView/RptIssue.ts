import { CrudR, _Date, _iDate } from "@baseJs";

_me = {
    init: function () {
        //datatable config
        var config = {
            paginate: false, //不顯示分頁, 顯示全部資料
            pageLength: 500,
            columns: [
                { data: 'ProjectName', sort: false },
                { data: 'IssueTypeName' },
                { data: 'RowLen' },
            ],
        };

        //initial
        new CrudR(config);

    },

    onNowWeek: function () {
        var box = _me.rform;
        _me.crudR.onResetFind();   //reset
        _iDate.set('WorkDate', _Date.uiWeekMonday(), box);
        _iDate.set('WorkDate2', _Date.uiWeekFriday(), box);
        _me.crudR.onFind();
    },

    onNowMonth: function () {
        var box = _me.rform;
        _me.crudR.onResetFind();   //reset
        _iDate.set('WorkDate', _Date.uiMonthDay1(), box);
        _iDate.set('WorkDate2', _Date.uiMonthDayLast(), box);
        _me.crudR.onFind();
    },

}; //class
