/**
 * modal 多選參考 XpRole/Read.cshtml 選取用戶
 * modal 單選參考 XpRole/Read.cshtml 選取用戶
 */
export default class _Modal {
    //showO -> show
    static show(obj) {
        obj.modal('show');
    }
    //hideO -> hide
    static hide(obj) {
        obj.modal('hide');
    }
}
