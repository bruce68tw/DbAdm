import zhTW from '../locale/zh-TW/BR';
import zhCN from '../locale/zh-CN/BR';
import enUS from '../locale/en-US/BR';

// 支援語系型別
type Locale = 'zh-TW' | 'zh-CN' | 'en-US';

export default class _Locale {
    private static current: Locale = 'zh-TW';

    static init() {
        (globalThis as any)._BR = this.getBR();
    }

    // 切換語系
    static setLocale(locale: Locale) {
        this.current = locale;
        (globalThis as any)._BR = this.getBR();
    }

    // 取得目前語系類別
    static get BR() {
        switch (this.current) {
            case 'zh-CN': return zhCN;
            case 'en-US': return enUS;
            default: return zhTW;
        }
    }

    // 取得目前語系代碼
    static get locale() {
        return this.current;
    }
} //class