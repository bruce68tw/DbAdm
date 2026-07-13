import _iBase from './_iBase';
import _Obj from './_Obj';
export default class _iText extends _iBase {
    static mask(box) {
        const filter = "[data-mask!='']";
        _Obj.getByFt(filter, box).each(function () {
            const me = $(this);
            me.mask(me.data('mask'));
        });
    }
}
