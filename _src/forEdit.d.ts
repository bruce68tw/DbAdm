/*
import type BaseResDto from "./tsBase/dto/BaseResDto";
import type EditOne from "./tsBase/svc/EditOne";
import type EditMany from "./tsBase/svc/EditMany";
import type MeDto from "./tsBase/dto/MeDto";
//import type _Ajax from "./tsBase/svc/_Ajax";
//import type _Tool from "./tsBase/svc/_Tool";
*/

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
        _me: MeDto,
        //_m2: Json,
        //_vo: Json,
        _BR: BaseResDto,

        //#region tsBase
        EditModeEstr: typeof EditModeEstr;
        FunEstr: typeof FunEstr;
        InputTypeEstr: typeof InputTypeEstr;
        MouseEstr: typeof MouseEstr;
        NodeTypeEstr: typeof NodeTypeEstr;
        UiItemTypeEstr: typeof UiItemTypeEstr;

        AjaxDto: typeof AjaxDto;
        BaseResDto: typeof BaseResDto;
        ChartDto: typeof ChartDto;
        EditDto: typeof EditDto;
        ErrorRowDto: typeof ErrorRowDto;
        IdStrDto: typeof IdStrDto;
        IdStrExtDto: typeof IdStrExtDto;
        ResultDto: typeof ResultDto;
        DragItemDto: typeof DragItemDto;
        MeDto: typeof MeDto;

        _Array: typeof _Array;
        _Ajax: typeof _Ajax;
        _Assert: typeof _Assert;
        _Browser: typeof _Browser;
        _Btn: typeof _Btn;
        _Chart: typeof _Chart;
        _Code: typeof _Code;
        _Date: typeof _Date;
        _Dom: typeof _Dom;
        _Edit: typeof _Edit;
        _Error: typeof _Error;
        _File: typeof _File;
        _Flow: typeof _Flow;
        _Form: typeof _Form;
        _Fun: typeof _Fun;
        _Group: typeof _Group;
        _Helper: typeof _Helper;
        _Html: typeof _Html;
        _iBase: typeof _iBase;
        _iCheck: typeof _iCheck;
        _iColor: typeof _iColor;
        _iDate: typeof _iDate;
        _iDt: typeof _iDt;
        _iFile: typeof _iFile;
        _iHtml: typeof _iHtml;
        _iLink: typeof _iLink;
        _Input: typeof _Input;
        _iNum: typeof _iNum;
        _iRadio: typeof _iRadio;
        _iRead: typeof _iRead;
        _iSelect: typeof _iSelect;
        _iText: typeof _iText;
        _iTextarea: typeof _iTextarea;
        _Json: typeof _Json;
        _Jwt: typeof _Jwt;
        _Leftmenu: typeof _Leftmenu;
        _Log: typeof _Log;
        _Modal: typeof _Modal;
        _Nav: typeof _Nav;
        _Num: typeof _Num;
        _Obj: typeof _Obj;
        _Pjax: typeof _Pjax;
        _Prog: typeof _Prog;
        _Qrcode: typeof _Qrcode;
        _Str: typeof _Str;
        _Switch: typeof _Switch;
        _Tab: typeof _Tab;
        _Table: typeof _Table;
        _Temp: typeof _Temp;
        _Time: typeof _Time;
        _Tool: typeof _Tool;
        _Valid: typeof _Valid;
        _Var: typeof _Var;

        CrudE: typeof CrudE;
        CrudR: typeof CrudR;
        Datatable: typeof Datatable;
        EditMany: typeof EditMany;
        EditOne: typeof EditOne;
        FlowLine: typeof FlowLine;
        FlowMany: typeof FlowMany;
        FlowNode: typeof FlowNode;
        FlowView: typeof FlowView;
        Page: typeof Page;
        //#endregion
    }

    //告訴 TypeScript 這些變數的型別是什麼
    let _xg: Json;
    let _me: MeDto;
    //let _m2: Json;
    let _BR: BaseResDto;
    //let _Array: _Array;
}

export { };
