class _iText extends _iBase {
    static mask(box?: any): void {
        const filter = "[data-mask!='']";
        _Obj.getByFt(filter, box).each(function () {
            const me = $(this);
            (me as any).mask(me.data('mask'));
        });
    }
}
window._iText = _iText;