/**
 * Simplified Chinese translation for bootstrap-datepicker
 * Yuan Cheung <advanimal@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['zh-CN'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		daysMin: ["日", "一", "二", "三", "四", "五", "六"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今天",
		monthsTitle: "选择月份",
		clear: "清除",
		format: "yyyy/mm/dd",
		titleFormat: "yyyy年mm月",
		weekStart: 1
	};
}(jQuery));

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend( $.validator.messages, {
	required: "这是必填字段",
	remote: "请修正此字段",
	email: "请输入有效的电子邮件地址",
	url: "请输入有效的网址",
	date: "请输入有效的日期",
	dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	number: "请输入有效的数字",
	digits: "只能输入数字",
	creditcard: "请输入有效的信用卡号码",
	equalTo: "你的输入不相同",
	extension: "请输入有效的后缀",
	maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
	minlength: $.validator.format( "最少要输入 {0} 个字符" ),
	rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
	range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
	step: $.validator.format( "请输入 {0} 的整数倍值" ),
	max: $.validator.format( "请输入不大于 {0} 的数值" ),
	min: $.validator.format( "请输入不小于 {0} 的数值" )
} );

//resource for js base component
var _BR = {

    //=== moment.js convert these to UI format ===
    MmUiDateFmt: 'YYYY/MM/DD',
    MmUiDtFmt: 'YYYY/MM/DD HH:mm:ss',
    MmUiDt2Fmt: 'YYYY/MM/DD HH:mm',     //no second

    //row status
    StatusYes: '正常',
    StatusNo: '停用',
    Yes: '是',

    //check input
    InputWrong: '输入错误。 ',

    //for crud form
    Create: '新增',
    Update: '修改',
    View: '检视',
    UpdateOk: '资料更新完成。 ',
    DeleteOk: '资料删除完成。 ',
    SaveOk: '资料储存完成。 ',
    SaveNone: '无任何资料异动。 ',
    Done: '作业完成。 ',

    //find form
    FindOk: '查询完成。 ',
    FindNone: '找不到资料。 ',

    //form tip
    TipUpdate: '修改这笔资料',
    TipDelete: '删除这笔资料',
    TipView: '检视这笔资料',

    //message-upload file
    UploadFileNotBig: '上传档案不可大于{0}M !',
    UploadFileNotMatch: '上传档案种类不符合 !',
    NewFileNotView: '新档案尚未上传, 无法检视。 ',

    //message-others
    PlsSelectDeleted: '请选取要删除的资料。 ',
    PlsSelectRows: '请先选取资料。 ',
    SureDeleteRow: '是否确定删除这笔资料?',
    SureDeleteSelected: '是否确定删除选取的资料?',

    //authority
    NoAuthUser: '您只能存取个人资料，请联络管理者。 ',
    NoAuthDept: '您只能存取同部门资料，请联络管理者。 ',
    NoAuthProg: '您没有此功能的权限，请联络管理者。 ',
    NotLogin: '您尚未登入系统。 ',

    //others
    Working: '作业处理中...',
    TimeOut: '待机时间过久，或未登入系统。',

};