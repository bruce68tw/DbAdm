import type BaseResDto  from "./tsBase/dto/BaseResDto";
import type EditOne from "./tsBase/svc/EditOne";
import type EditMany from "./tsBase/svc/EditMany";

/**
 * for IDE 檢查typeScript語法
 * 個別套件做法不同:
 *  moment: UMD套件, tsconfig 加 allowUmdGlobalAccess: true
 *  Mustache: @types/mustache 已有 export as namespace Mustache, 不需要 global.d.ts 宣告
 *  chart: 是 ES Module，不提供 global namespace, 在 global.d.ts 宣告
 */

//沒有提供 @types 的第3方套件要手動加入宣告 type
import dayjsLib, { Dayjs as DayjsType } from "dayjs";
import type { Chart as ChartType } from "chart.js";

declare global {
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
    type ElmN = HTMLElement | null;
    type FnN = Function | null;
    type FnVoidN = ((result: any) => void) | null;
    type OneMany = EditOne | EditMany;

    //chart
    const Chart: typeof ChartType;  //for js 執行的全域變數宣告
   
    //dayjs 取代 moment
    type Dayjs = DayjsType; //for ts 編譯的型別宣告    
    const dayjs: typeof dayjsLib;   //Day.js global object (window.dayjs)

    //其他
    //pajx: 只有個別檔案使用, 所以用any

    //擴充 Window 型別
    interface Window {
        _xg: Json,
        _me: Json,
        _BR: BaseResDto,
    }

    //告訴 TypeScript 這些變數的型別是什麼
    let _xg: Json;
    let _me: Json;
    let _BR: BaseResDto;
}

export { };
