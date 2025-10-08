import zhTW from '../locale/zh-TW/BR';
import zhCN from '../locale/zh-CN/BR';
import enUS from '../locale/en-US/BR';
class _Locale {
    /*
    static init() {
        (globalThis as any)._BR = this.getBR();
    }
    */
    // 切換語系
    static setLocale(locale) {
        this.current = locale;
        globalThis._BR = this.getBR();
    }
    // 取得目前語系類別
    static getBR() {
        switch (this.current) {
            case 'zh-CN': return zhCN;
            case 'en-US': return enUS;
            default: return zhTW;
        }
    }
    // 取得目前語系代碼
    static getLocale() {
        return this.current;
    }
} //class
_Locale.current = 'zh-TW';
export default _Locale;
//# sourceMappingURL=../../../map/_tsBase/services/_Locale.js.map