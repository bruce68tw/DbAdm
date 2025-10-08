import _IBase from "./_IBase";
import _Obj from "./_Obj";
//extend _ibase.js, use jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
export default class _IText extends _IBase {
    //new method
    //add input mask, use jquery maskedinput
    static mask(box) {
        const filter = "[data-mask!='']";
        _Obj.getF(filter, box).each(function () {
            const me = $(this);
            // 假設 JQuery 已經透過擴充支援 .mask 方法
            me.mask(me.data('mask'));
        });
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_IText.js.map