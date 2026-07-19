class _Btn {
    static setEdit(obj: JQuery, status: boolean): void {
        obj.prop('disabled', !status);
    }
}
window._Btn = _Btn;