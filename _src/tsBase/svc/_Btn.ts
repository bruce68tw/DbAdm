//button
class _Btn {
    static setEdit(btn: JQuery, status: boolean): void {
        btn.prop('disabled', !status);
    }
}
window._Btn = _Btn;