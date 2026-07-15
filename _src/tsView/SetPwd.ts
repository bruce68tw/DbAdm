import { _Ajax, _Tool, _iText } from "@baseJs";

_me = {
    onSave: async function () {
        var form = $('#eform');
        var oldPwd = _iText.get('OldPwd', form);
        var newPwd = _iText.get('NewPwd', form);
        if (newPwd == '') {
            _Tool.msg('新密碼不可空白。');
            return;
        }
        if (newPwd !== _iText.get('NewPwd2', form)) {
            _Tool.msg('確認新密碼輸入錯誤。');
            return;
        }
        await _Ajax.getStrA('Save', { oldPwd: oldPwd, newPwd: newPwd }, function (msg) {
            _Tool.msg(msg || '儲存完成。');
        });
    },
};