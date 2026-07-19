class BaseResDto {

    // moment.js convert these to UI format
    MmUiDateFmt: string;
    MmUiDtFmt: string;
    MmUiDt2Fmt: string;

    // row status
    StatusYes: string;
    StatusNo: string;
    Yes: string;

    // check input
    InputWrong: string;

    // crud form
    Create: string;
    Update: string;
    View: string;
    UpdateOk: string;
    DeleteOk: string;
    SaveOk: string;
    SaveNone: string;
    Done: string;

    // find form
    FindOk: string;
    FindNone: string;

    // form tip
    TipUpdate: string;
    TipDelete: string;
    TipView: string;
    TipCopy: string;

    // message-upload file
    UploadFileNotBig: string;
    UploadFileNotMatch: string;
    NewFileNotView: string;

    // message-others
    PlsSelect: string;
    PlsSelectDeleted: string;
    PlsSelectRows: string;
    SureDeleteRow: string;
    SureDeleteSelected: string;

    // authority
    NoAuthUser: string;
    NoAuthDept: string;
    NoAuthProg: string;
    NoFile: string;
    NotLogin: string;

    // others
    Working: string;
    TimeOut: string;
    Page: string;
    UniqueError: string;
}
window.BaseResDto = BaseResDto;