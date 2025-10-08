//resource for js base component
export default class BR {

    //=== moment.js ymd format ===
    static readonly MmUiDateFmt: string = 'MMM-D-YYYY';          //match datepicker format
    static readonly MmUiDtFmt: string = 'MMM-D-YYYY HH:mm:ss';
    static readonly MmUiDt2Fmt: string = 'MMM-D-YYYY HH:mm';     //no second

    //row status
    static readonly StatusYes: string = 'Active';
    static readonly StatusNo: string = 'Off';
    static readonly Yes: string = 'Yes';

    //check input
    static readonly InputWrong: string = 'Input Wrong.';

    //for crud form
    static readonly Create: string = 'Create';
    static readonly Update: string = 'Update';
    static readonly View: string = 'View';
    static readonly UpdateOk: string = 'Update Ok.';
    static readonly DeleteOk: string = 'Delete Ok.';
    static readonly SaveOk: string = 'Save Ok.';
    static readonly SaveNone: string = 'No row changed !';
    static readonly Done: string = 'Done.';

    //find form
    static readonly FindOk: string = 'Find Ok.';
    static readonly FindNone: string = 'Find None !';

    //form tip
    static readonly TipUpdate: string = 'Update this Row.';
    static readonly TipDelete: string = 'Delete this Row.';
    static readonly TipView: string = 'View this Row.';

    //message-upload file
    static readonly UploadFileNotBig: string = 'Upload File Size Should Less Than {0}M !';
    static readonly UploadFileNotMatch: string = 'Upload File Type Not Match !';
    static readonly NewFileNotView: string = 'Save First Then View !';

    //message-others
    static readonly PlsSelectDeleted: string = 'Please Select Deleted Rows.';
    static readonly PlsSelectRows: string = 'Please Select Rows First.';
    static readonly SureDeleteRow: string = 'Sure to Delete Row ?';
    static readonly SureDeleteSelected: string = 'Sure to Delete Selected ?';

    //authority
    static readonly NoAuthUser: string = 'No right for this user, Please connect Admin.';
    static readonly NoAuthDept: string = 'No right for this department, Please connect Admin.';
    static readonly NoAuthProg: string = 'You have not access right, Please connect Admin.';
    static readonly NotLogin: string = 'Please Login First.';

    //others
    static readonly Working: string = 'Working...';
    static readonly TimeOut: string = 'Standby too long, or not Login.';
}