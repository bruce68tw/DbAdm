//import type { JQuery } from "jquery";
import BR from '../_tsBase/locale/zh-TW/BR';

declare global {
    //type JObj = JQuery<HTMLElement>;
    type JQueryN = JQuery | null;
    type FunN = Function | null;
    type StrN = string | null;
    type Elm = HTMLElement;

    /** 全域多國語資源 */
    var _BR: typeof BR;

    /** 目前功能畫面 */
    var _me: any;
}

export { };
