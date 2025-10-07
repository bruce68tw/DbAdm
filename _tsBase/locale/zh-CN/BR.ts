//resource for js base component
export default class BR {

    //=== moment.js convert these to UI format ===
    static readonly MmUiDateFmt: string = 'YYYY/MM/DD';          //match bootstrap-datepicker.js format property
    static readonly MmUiDtFmt: string = 'YYYY/MM/DD HH:mm:ss';   //datetime
    static readonly MmUiDt2Fmt: string = 'YYYY/MM/DD HH:mm';     //datetime no second

    //row status
    static readonly StatusYes: string = '正常';
    static readonly StatusNo: string = '停用';
    static readonly Yes: string = '是';

    //check input
    static readonly InputWrong: string = '输入错误。 ';

    //for crud form
    static readonly Create: string = '新增';
    static readonly Update: string = '修改';
    static readonly View: string = '检视';
    static readonly UpdateOk: string = '资料更新完成。 ';
    static readonly DeleteOk: string = '资料删除完成。 ';
    static readonly SaveOk: string = '资料储存完成。 ';
    static readonly SaveNone: string = '无任何资料异动。 ';
    static readonly Done: string = '作业完成。 ';

    //find form
    static readonly FindOk: string = '查询完成。 ';
    static readonly FindNone: string = '找不到资料。 ';

    //form tip
    static readonly TipUpdate: string = '修改这笔资料';
    static readonly TipDelete: string = '删除这笔资料';
    static readonly TipView: string = '检视这笔资料';

    //message-upload file
    static readonly UploadFileNotBig: string = '上传档案不可大于{0}M !';
    static readonly UploadFileNotMatch: string = '上传档案种类不符合 !';
    static readonly NewFileNotView: string = '新档案尚未上传, 无法检视。 ';

    //message-others
    static readonly PlsSelectDeleted: string = '请选取要删除的资料。 ';
    static readonly PlsSelectRows: string = '请先选取资料。 ';
    static readonly SureDeleteRow: string = '是否确定删除这笔资料?';
    static readonly SureDeleteSelected: string = '是否确定删除选取的资料?';

    //authority
    static readonly NoAuthUser: string = '您只能存取个人资料，请联络管理者。 ';
    static readonly NoAuthDept: string = '您只能存取同部门资料，请联络管理者。 ';
    static readonly NoAuthProg: string = '您没有此功能的权限，请联络管理者。 ';
    static readonly NotLogin: string = '您尚未登入系统。 ';

    //others
    static readonly Working: string = '作业处理中...';
    static readonly TimeOut: string = '待机时间过久，或未登入系统。 ';
    static readonly Page: string = '每页显示 _Menu @@笔, 第 _Start 至 _End 笔, 总共 _Total 笔';

};