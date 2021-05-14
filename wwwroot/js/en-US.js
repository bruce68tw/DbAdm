//resource for js base component
var _BR = {

    //=== moment.js convert these to UI format ===
    UiDateFormat: 'YYYY/MM/DD',
    //DateShowFormat: 'YYYY年MM月DD日',
    UiDtFormat: 'YYYY/MM/DD HH:mm:ss',
    //no second
    UiDt2Format: 'YYYY/MM/DD HH:mm',

    //row status
    StatusYes: 'Active',
    StatusNo: 'Off',
    Yes: 'Yes',

    //check input
    InputWrong: 'Input Wrong.',

    //for crud form
    Create: 'Create',
    Update: 'Update',
    View: 'View',
    UpdateOk: 'Update Ok.',
    DeleteOk: 'Delete Ok.',
    SaveOk: 'Save Ok.',
    SaveNone: 'No row changed !',
    Done: 'Done.',

    //find form
    FindOk: 'Find Ok.',
    FindNone: 'Find None !',

    //form tip
    TipUpdate: 'Update this Row.',
    TipDelete: 'Delete this Row.',
    TipView: 'View this Row.',

    //message-upload file
    UploadFileNotBig: 'Upload File Size Should Less Than{0}M !',
    UploadFileNotMatch: 'Upload File Type Not Match !',
    NewFileNotView: 'Save First Then View !',

    //message-others
    PlsSelectDeleted: 'Please Select Deleted Rows.',
    PlsSelectRows: 'Please Select Rows First.',
    SureDeleteRow: 'Sure to Delete Row ?',
    SureDeleteSelected: 'Sure to Delete Selected ?',

};
/**
 * American English translation for bootstrap-datepicker
 */
;(function($){
	$.fn.datepicker.dates['en-US'] = {
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Today",
		monthsTitle: "Months",
		clear: "Clear",
		weekStart: 0,
		format: "m/d/yyyy"
	};
}(jQuery));
