//resource for js base component
class BR {
}
//=== moment.js convert these to UI format ===
BR.MmUiDateFmt = 'YYYY/MM/DD'; //match bootstrap-datepicker.js format property
BR.MmUiDtFmt = 'YYYY/MM/DD HH:mm:ss'; //datetime
BR.MmUiDt2Fmt = 'YYYY/MM/DD HH:mm'; //datetime no second
//row status
BR.StatusYes = '正常';
BR.StatusNo = '停用';
BR.Yes = '是';
//check input
BR.InputWrong = '输入错误。 ';
//for crud form
BR.Create = '新增';
BR.Update = '修改';
BR.View = '检视';
BR.UpdateOk = '资料更新完成。 ';
BR.DeleteOk = '资料删除完成。 ';
BR.SaveOk = '资料储存完成。 ';
BR.SaveNone = '无任何资料异动。 ';
BR.Done = '作业完成。 ';
//find form
BR.FindOk = '查询完成。 ';
BR.FindNone = '找不到资料。 ';
//form tip
BR.TipUpdate = '修改这笔资料';
BR.TipDelete = '删除这笔资料';
BR.TipView = '检视这笔资料';
//message-upload file
BR.UploadFileNotBig = '上传档案不可大于{0}M !';
BR.UploadFileNotMatch = '上传档案种类不符合 !';
BR.NewFileNotView = '新档案尚未上传, 无法检视。 ';
//message-others
BR.PlsSelectDeleted = '请选取要删除的资料。 ';
BR.PlsSelectRows = '请先选取资料。 ';
BR.SureDeleteRow = '是否确定删除这笔资料?';
BR.SureDeleteSelected = '是否确定删除选取的资料?';
//authority
BR.NoAuthUser = '您只能存取个人资料，请联络管理者。 ';
BR.NoAuthDept = '您只能存取同部门资料，请联络管理者。 ';
BR.NoAuthProg = '您没有此功能的权限，请联络管理者。 ';
BR.NotLogin = '您尚未登入系统。 ';
//others
BR.Working = '作业处理中...';
BR.TimeOut = '待机时间过久，或未登入系统。 ';
BR.Page = '每页显示 _Menu @@笔, 第 _Start 至 _End 笔, 总共 _Total 笔';
export default BR;
;
//# sourceMappingURL=../../../../map/_tsBase/locale/zh-CN/BR.js.map