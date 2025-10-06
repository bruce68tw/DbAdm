//resource for js base component
export default class _BR {

    //=== moment.js convert these to UI format ===
    static readonly MmUiDateFmt: string = 'YYYY/MM/DD';          //match bootstrap-datepicker.js format property
    static readonly MmUiDtFmt: string = 'YYYY/MM/DD HH:mm:ss';   //datetime 
    static readonly MmUiDt2Fmt: string = 'YYYY/MM/DD HH:mm';     //datetime no second

    //row status
    static readonly StatusYes: string = '正常';
    static readonly StatusNo: string = '停用';
    static readonly Yes: string = '是';

    //check input
    static readonly InputWrong: string = '輸入錯誤。';

    //for crud form
    static readonly Create: string = '新增';
    static readonly Update: string = '修改';
    static readonly View: string = '檢視';
    static readonly UpdateOk: string = '資料更新完成。';
    static readonly DeleteOk: string = '資料刪除完成。';
    static readonly SaveOk: string = '資料儲存完成。';
    static readonly SaveNone: string = '無任何資料異動。';
    static readonly Done: string = '作業完成。';

    //find form
    static readonly FindOk: string = '查詢完成。';
    static readonly FindNone: string = '找不到資料。';

    //form tip
    static readonly TipUpdate: string = '修改這筆資料';
    static readonly TipDelete: string = '刪除這筆資料';
    static readonly TipView: string = '檢視這筆資料';

    //message-upload file
    static readonly UploadFileNotBig: string = '上傳檔案不可大於{0}M !';
    static readonly UploadFileNotMatch: string = '上傳檔案種類不符合 !';
    static readonly NewFileNotView: string = '新檔案尚未上傳, 無法檢視。';

    //message-others
    static readonly PlsSelectDeleted: string = '請選取要刪除的資料。';
    static readonly PlsSelectRows: string = '請先選取資料。';
    static readonly SureDeleteRow: string = '是否確定刪除這筆資料?';
    static readonly SureDeleteSelected: string = '是否確定刪除選取的資料?';

    //authority
    static readonly NoAuthUser: string = '您只能存取個人資料，請聯絡管理者。';
    static readonly NoAuthDept: string = '您只能存取同部門資料，請聯絡管理者。';
    static readonly NoAuthProg: string = '您沒有此功能的權限，請聯絡管理者。';
    static readonly NotLogin: string = '您尚未登入系統。';

    //others
    static readonly Working: string = '作業處理中...';
    static readonly TimeOut: string = '待機時間過久，或未登入系統。';
    static readonly Page: string = '每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆';

};