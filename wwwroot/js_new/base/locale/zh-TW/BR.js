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
BR.InputWrong = '輸入錯誤。';
//for crud form
BR.Create = '新增';
BR.Update = '修改';
BR.View = '檢視';
BR.UpdateOk = '資料更新完成。';
BR.DeleteOk = '資料刪除完成。';
BR.SaveOk = '資料儲存完成。';
BR.SaveNone = '無任何資料異動。';
BR.Done = '作業完成。';
//find form
BR.FindOk = '查詢完成。';
BR.FindNone = '找不到資料。';
//form tip
BR.TipUpdate = '修改這筆資料';
BR.TipDelete = '刪除這筆資料';
BR.TipView = '檢視這筆資料';
//message-upload file
BR.UploadFileNotBig = '上傳檔案不可大於{0}M !';
BR.UploadFileNotMatch = '上傳檔案種類不符合 !';
BR.NewFileNotView = '新檔案尚未上傳, 無法檢視。';
//message-others
BR.PlsSelectDeleted = '請選取要刪除的資料。';
BR.PlsSelectRows = '請先選取資料。';
BR.SureDeleteRow = '是否確定刪除這筆資料?';
BR.SureDeleteSelected = '是否確定刪除選取的資料?';
//authority
BR.NoAuthUser = '您只能存取個人資料，請聯絡管理者。';
BR.NoAuthDept = '您只能存取同部門資料，請聯絡管理者。';
BR.NoAuthProg = '您沒有此功能的權限，請聯絡管理者。';
BR.NotLogin = '您尚未登入系統。';
//others
BR.Working = '作業處理中...';
BR.TimeOut = '待機時間過久，或未登入系統。';
BR.Page = '每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆';
export default BR;
;
//# sourceMappingURL=../../../../../_ts/wwwroot/map/base/locale/zh-TW/BR.js.map