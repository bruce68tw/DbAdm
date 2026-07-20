/**
 * modal 多選參考 XpRole/Read.cshtml 選取用戶
 * modal 單選參考 XpRole/Read.cshtml 選取用戶
 */
class _Modal {

    //showO -> show
    static show(obj: JQuery): void {
        obj.modal('show');
    }
    
    //hideO -> hide
    static hide(obj: JQuery): void {
        obj.modal('hide');
    }
    
    /*
    static show(id: string): void {
        $('#' + id).modal('show');
    }
    static hide(id: string): void {
        $('#' + id).modal('hide');
    }
    static showF(filter: string): void {
        $(filter).modal('show');
    }
    static hideF(filter: string): void {
        $(filter).modal('hide');
    }
    */
}
window._Modal = _Modal;