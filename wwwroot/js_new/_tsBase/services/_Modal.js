export default class _Modal {
    static show(id) {
        $('#' + id).modal('show');
    }
    static hide(id) {
        $('#' + id).modal('hide');
    }
    static showO(obj) {
        obj.modal('show');
    }
    static hideO(obj) {
        obj.modal('hide');
    }
    static showF(filter) {
        $(filter).modal('show');
    }
    static hideF(filter) {
        $(filter).modal('hide');
    }
} //class
//# sourceMappingURL=../../../map/_tsBase/services/_Modal.js.map