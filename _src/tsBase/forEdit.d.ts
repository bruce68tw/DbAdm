import type BaseResDto  from "./dto/BaseResDto";
import type EditOne from "./svc/EditOne";
import type EditMany from "./svc/EditMany";

/**
 * 個別套件做法不同:
 *  moment: UMD套件, tsconfig 加 allowUmdGlobalAccess: true
 *  Mustache: @types/mustache 已有 export as namespace Mustache, 不需要 global.d.ts 宣告
 *  chart: 是 ES Module，不提供 global namespace, 在 global.d.ts 宣告
 */
//沒有提供 @types 的第3方套件要手動加入宣告 type
import type { Moment as MomentType } from "moment";
import type { Chart as ChartType } from "chart.js";

declare global {
    //for js 執行的全域變數宣告
    const Chart: typeof ChartType;

    //for ts 編譯的型別宣告
    type Moment = MomentType;

    //自定型別
    type StrN = string | null;
    type StrNum = string | number;
    type StrNumN = string | number | null;
    type NumN = number | null;
    type BoolN = boolean | null;
    type AnyN = any | null;
    type Json = { [key: string]: any };     //key為字串, value為任意值
    type JsonN = Json | null;
    type JQueryN = JQuery | null;
    type Elm = HTMLElement;
    type FnN = Function | null;
    type FnVoidN = ((result: any) => void) | null;
    type OneMany = EditOne | EditMany;

    /** 全域變數:多語系 */
    let _BR: BaseResDto;

    //window 才會有全域變數 window._BR
    interface Window {
        _BR: BaseResDto;
    }

    /** 目前功能畫面 */
    let _me: any;
}

export { };
