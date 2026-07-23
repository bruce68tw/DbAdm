//??
class _Error {
    static log(msg: any): void {
        console.log(msg);
    }
}
window._Error = _Error;