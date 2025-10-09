//import type { JQuery } from "jquery";
import BR from './locale/zh-TW/BR';

declare global {
    type JQueryN = JQuery | null;
    type StrN = string | null;
    type Elm = HTMLElement;
    type FnN = Function | null;
    type FnVoidN = ((result: any) => void) | null;
    type Json = { [key: string]: any };     //key為字串, value為任意值
    type JsonN = Json | null;
    type AnyN = any | null;
    type NumN = number | null;
    type BoolN = boolean | null;
    type StrNum = string | number;

    /** 全域多國語資源 */
    var _BR: typeof BR;

    /** 目前功能畫面 */
    var _me: any;
}

export { };
