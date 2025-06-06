/**
 * Traditional Chinese translation for bootstrap-datepicker
 * Rung-Sheng Jang <daniel@i-trend.co.cc>
 * FrankWu  <frankwu100@gmail.com> Fix more appropriate use of Traditional Chinese habit
 */
;(function($){
	$.fn.datepicker.dates['zh-TW'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今天",
		format: "yyyy/mm/dd",
		weekStart: 1,
		clear: "清除"
	};
}(jQuery));

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese; 中文 (Zhōngwén), 汉语, 漢語)
 * Region: TW (Taiwan)
 */
$.extend( $.validator.messages, {
	required: "必須填寫",
	remote: "請修正此欄位",
	email: "請輸入有效的電子郵件",
	url: "請輸入有效的網址",
	date: "請輸入有效的日期",
	dateISO: "請輸入有效的日期 (YYYY-MM-DD)",
	number: "請輸入正確的數值",
	digits: "只可輸入數字",
	creditcard: "請輸入有效的信用卡號碼",
	equalTo: "請重複輸入一次",
	extension: "請輸入有效的後綴",
	maxlength: $.validator.format( "最多 {0} 個字" ),
	minlength: $.validator.format( "最少 {0} 個字" ),
	rangelength: $.validator.format( "請輸入長度為 {0} 至 {1} 之間的字串" ),
	range: $.validator.format( "請輸入 {0} 至 {1} 之間的數值" ),
	step: $.validator.format( "請輸入 {0} 的整數倍值" ),
	max: $.validator.format( "請輸入不大於 {0} 的數值" ),
	min: $.validator.format( "請輸入不小於 {0} 的數值" )
} );
return $;
}));
//resource for js base component
var _BR = {

    //=== moment.js convert these to UI format ===
    MmUiDateFmt: 'YYYY/MM/DD',          //match bootstrap-datepicker.js format property
    MmUiDtFmt: 'YYYY/MM/DD HH:mm:ss',   //datetime 
    MmUiDt2Fmt: 'YYYY/MM/DD HH:mm',     //datetime no second

    //row status
    StatusYes: '正常',
    StatusNo: '停用',
    Yes: '是',

    //check input
    InputWrong: '輸入錯誤。',

    //for crud form
    Create: '新增',
    Update: '修改',
    View: '檢視',
    UpdateOk: '資料更新完成。',
    DeleteOk: '資料刪除完成。',
    SaveOk: '資料儲存完成。',
    SaveNone: '無任何資料異動。',
    Done: '作業完成。',

    //find form
    FindOk: '查詢完成。',
    FindNone: '找不到資料。',

    //form tip
    TipUpdate: '修改這筆資料',
    TipDelete: '刪除這筆資料',
    TipView: '檢視這筆資料',

    //message-upload file
    UploadFileNotBig: '上傳檔案不可大於{0}M !',
    UploadFileNotMatch: '上傳檔案種類不符合 !',
    NewFileNotView: '新檔案尚未上傳, 無法檢視。',

    //message-others
    PlsSelectDeleted: '請選取要刪除的資料。',
    PlsSelectRows: '請先選取資料。',
    SureDeleteRow: '是否確定刪除這筆資料?',
    SureDeleteSelected: '是否確定刪除選取的資料?',

    //authority
    NoAuthUser: '您只能存取個人資料，請聯絡管理者。',
    NoAuthDept: '您只能存取同部門資料，請聯絡管理者。',
    NoAuthProg: '您沒有此功能的權限，請聯絡管理者。',
    NotLogin: '您尚未登入系統。',

    //others
    Working: '作業處理中...',
    TimeOut: '待機時間過久，或未登入系統。',
    Page: '每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆',

};