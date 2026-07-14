import BaseResDto from "./tsBase/dto/BaseResDto";

//for gulp ¼g¤J base.min.js
export { default as EditModeEstr } from "./tsBase/enum/EditModeEstr";
export { default as FunEstr } from "./tsBase/enum/FunEstr";
export { default as InputTypeEstr } from "./tsBase/enum/InputTypeEstr";
export { default as MouseEstr } from "./tsBase/enum/MouseEstr";
export { default as NodeTypeEstr } from "./tsBase/enum/NodeTypeEstr";
export { default as UiItemTypeEstr } from "./tsBase/enum/UiItemTypeEstr";

export { default as AjaxDto } from "./tsBase/dto/AjaxDto";
export { default as BaseResDto } from "./tsBase/dto/BaseResDto";
export { default as ChartDto } from "./tsBase/dto/ChartDto";
export { default as EditDto } from "./tsBase/dto/EditDto";
export { default as ErrorRowDto } from "./tsBase/dto/ErrorRowDto";
export { default as IdStrDto } from "./tsBase/dto/IdStrDto";
export { default as IdStrExtDto } from "./tsBase/dto/IdStrExtDto";
export { default as ResultDto } from "./tsBase/dto/ResultDto";

export { default as _Ajax } from "./tsBase/svc/_Ajax";
export { default as _Array } from "./tsBase/svc/_Array";
export { default as _Assert } from "./tsBase/svc/_Assert";
export { default as _Browser } from "./tsBase/svc/_Browser";
export { default as _Btn } from "./tsBase/svc/_Btn";
export { default as _Chart } from "./tsBase/svc/_Chart";
export { default as _Code } from "./tsBase/svc/_Code";
export { default as _Date } from "./tsBase/svc/_Date";
export { default as _Dom } from "./tsBase/svc/_Dom";
export { default as _Edit } from "./tsBase/svc/_Edit";
export { default as _Error } from "./tsBase/svc/_Error";
export { default as _File } from "./tsBase/svc/_File";
export { default as _Flow } from "./tsBase/svc/_Flow";
export { default as _Form } from "./tsBase/svc/_Form";
export { default as _Fun } from "./tsBase/svc/_Fun";
export { default as _Group } from "./tsBase/svc/_Group";
export { default as _Helper } from "./tsBase/svc/_Helper";
export { default as _Html } from "./tsBase/svc/_Html";
export { default as _iBase } from "./tsBase/svc/_iBase";
export { default as _iCheck } from "./tsBase/svc/_iCheck";
export { default as _iColor } from "./tsBase/svc/_iColor";
export { default as _iDate } from "./tsBase/svc/_iDate";
export { default as _iDt } from "./tsBase/svc/_iDt";
export { default as _iFile } from "./tsBase/svc/_iFile";
export { default as _iHtml } from "./tsBase/svc/_iHtml";
export { default as _iLink } from "./tsBase/svc/_iLink";
export { default as _Input } from "./tsBase/svc/_Input";
export { default as _iNum } from "./tsBase/svc/_iNum";
export { default as _iRadio } from "./tsBase/svc/_iRadio";
export { default as _iRead } from "./tsBase/svc/_iRead";
export { default as _iSelect } from "./tsBase/svc/_iSelect";
export { default as _iText } from "./tsBase/svc/_iText";
export { default as _iTextarea } from "./tsBase/svc/_iTextarea";
export { default as _Json } from "./tsBase/svc/_Json";
export { default as _Jwt } from "./tsBase/svc/_Jwt";
export { default as _Leftmenu } from "./tsBase/svc/_Leftmenu";
export { default as _Log } from "./tsBase/svc/_Log";
export { default as _Modal } from "./tsBase/svc/_Modal";
export { default as _Nav } from "./tsBase/svc/_Nav";
export { default as _Num } from "./tsBase/svc/_Num";
export { default as _Obj } from "./tsBase/svc/_Obj";
export { default as _Pjax } from "./tsBase/svc/_Pjax";
export { default as _Prog } from "./tsBase/svc/_Prog";
export { default as _Qrcode } from "./tsBase/svc/_Qrcode";
export { default as _Str } from "./tsBase/svc/_Str";
export { default as _Switch } from "./tsBase/svc/_Switch";
export { default as _Tab } from "./tsBase/svc/_Tab";
export { default as _Table } from "./tsBase/svc/_Table";
export { default as _Temp } from "./tsBase/svc/_Temp";
export { default as _Time } from "./tsBase/svc/_Time";
export { default as _Tool } from "./tsBase/svc/_Tool";
export { default as _Valid } from "./tsBase/svc/_Valid";
export { default as _Var } from "./tsBase/svc/_Var";

export { default as CrudE } from "./tsBase/svc/CrudE";
export { default as CrudR } from "./tsBase/svc/CrudR";
export { default as Datatable } from "./tsBase/svc/Datatable";
export { default as EditMany } from "./tsBase/svc/EditMany";
export { default as EditOne } from "./tsBase/svc/EditOne";
export { default as FlowLine } from "./tsBase/svc/FlowLine";
export { default as FlowMany } from "./tsBase/svc/FlowMany";
export { default as FlowNode } from "./tsBase/svc/FlowNode";
export { default as FlowView } from "./tsBase/svc/FlowView";
export { default as Page } from "./tsBase/svc/Page";

declare global {
    interface Window {
        _me: any,
        _BR: BaseResDto,
    }
}

window._me = {};
window._BR = new BaseResDto();
//if (!window._me) {
//}