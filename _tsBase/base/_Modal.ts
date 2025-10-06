export default class _Modal {

    public static show(id: string): void {
        $('#' + id).modal('show');
    }
    public static hide(id: string): void {
        $('#' + id).modal('hide');
    }
    public static showO(obj: JQuery): void {
        obj.modal('show');
    }
    public static hideO(obj: JQuery): void {
        obj.modal('hide');
    }
    public static showF(filter: string): void {
        $(filter).modal('show');
    }
    public static hideF(filter: string): void {
        $(filter).modal('hide');
    }

}//class