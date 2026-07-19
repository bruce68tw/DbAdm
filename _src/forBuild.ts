//import BaseResDto from "./tsBase/dto/BaseResDto";
//import MeDto from "./tsBase/dto/MeDto";

//for gulp 寫入 base.min.js
import "./tsBase/enum/EditModeEstr";
import "./tsBase/enum/FunEstr";
import "./tsBase/enum/InputTypeEstr";
import "./tsBase/enum/MouseEstr";
import "./tsBase/enum/NodeTypeEstr";
import "./tsBase/enum/UiItemTypeEstr";

import "./tsBase/dto/AjaxDto";
import "./tsBase/dto/BaseResDto";
import "./tsBase/dto/ChartDto";
import "./tsBase/dto/EditDto";
import "./tsBase/dto/ErrorRowDto";
import "./tsBase/dto/IdStrDto";
import "./tsBase/dto/IdStrExtDto";
import "./tsBase/dto/ResultDto";
import "./tsBase/dto/DragItemDto";
import "./tsBase/dto/MeDto";

import "./tsBase/svc/_Ajax";
import "./tsBase/svc/_Array";
import "./tsBase/svc/_Assert";
import "./tsBase/svc/_Browser";
import "./tsBase/svc/_Btn";
import "./tsBase/svc/_Chart";
import "./tsBase/svc/_Code";
import "./tsBase/svc/_Date";
import "./tsBase/svc/_Dom";
import "./tsBase/svc/_Edit";
import "./tsBase/svc/_Error";
import "./tsBase/svc/_File";
import "./tsBase/svc/_Flow";
import "./tsBase/svc/_Form";
import "./tsBase/svc/_Fun";
import "./tsBase/svc/_Group";
import "./tsBase/svc/_Helper";
import "./tsBase/svc/_Html";
import "./tsBase/svc/_iBase";
import "./tsBase/svc/_iCheck";
import "./tsBase/svc/_iColor";
import "./tsBase/svc/_iDate";
import "./tsBase/svc/_iDt";
import "./tsBase/svc/_iFile";
import "./tsBase/svc/_iHtml";
import "./tsBase/svc/_iLink";
import "./tsBase/svc/_Input";
import "./tsBase/svc/_iNum";
import "./tsBase/svc/_iRadio";
import "./tsBase/svc/_iRead";
import "./tsBase/svc/_iSelect";
import "./tsBase/svc/_iText";
import "./tsBase/svc/_iTextarea";
import "./tsBase/svc/_Json";
import "./tsBase/svc/_Jwt";
import "./tsBase/svc/_Leftmenu";
import "./tsBase/svc/_Log";
import "./tsBase/svc/_Modal";
import "./tsBase/svc/_Nav";
import "./tsBase/svc/_Num";
import "./tsBase/svc/_Obj";
import "./tsBase/svc/_Pjax";
import "./tsBase/svc/_Prog";
import "./tsBase/svc/_Qrcode";
import "./tsBase/svc/_Str";
import "./tsBase/svc/_Switch";
import "./tsBase/svc/_Tab";
import "./tsBase/svc/_Table";
import "./tsBase/svc/_Temp";
import "./tsBase/svc/_Time";
import "./tsBase/svc/_Tool";
import "./tsBase/svc/_Valid";
import "./tsBase/svc/_Var";

import "./tsBase/svc/CrudE";
import "./tsBase/svc/CrudR";
import "./tsBase/svc/Datatable";
import "./tsBase/svc/EditMany";
import "./tsBase/svc/EditOne";
import "./tsBase/svc/FlowLine";
import "./tsBase/svc/FlowMany";
import "./tsBase/svc/FlowNode";
import "./tsBase/svc/FlowView";
import "./tsBase/svc/Page";

/*
//擴充 Window 型別
declare global {
    interface Window {
        _xg: Json,   //global varaiables
        _me: MeDto,
        _vo: Json,
        _BR: BaseResDto,
    }
}

//執行時真的建立變數
window._xg = {};
window._me = new MeDto();
window._vo = {};
window._BR = new BaseResDto();
*/