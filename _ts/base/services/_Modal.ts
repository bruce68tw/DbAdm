export default class _Modal {

    static show(id: string): void {
        $('#' + id).modal('show');
    }
    static hide(id: string): void {
        $('#' + id).modal('hide');
    }
    static showO(obj: JQuery): void {
        obj.modal('show');
    }
    static hideO(obj: JQuery): void {
        obj.modal('hide');
    }
    static showF(filter: string): void {
        $(filter).modal('show');
    }
    static hideF(filter: string): void {
        $(filter).modal('hide');
    }

}//class