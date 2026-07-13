export default class _Btn {
    static setEdit(obj, status) {
        obj.prop('disabled', !status);
    }
}
