import type FunEstr from "../enum/FunEstr";
import type CrudE from "../svc/CrudE";
import type CrudR from "../svc/CrudR";
import type EditOne from "../svc/EditOne";

export default class MeDto {
    init: () => void;
    hasRead?: boolean;  //只能正向取值判斷
    hasEdit?: boolean;  //只能正向取值判斷
    crudR?: CrudR;
    divRead?: JQuery;
    rform?: JQuery;
    rform2?: JQuery;
    crudE?: CrudE;
    divEdit?: JQuery;
    edit0?: EditOne;
    eform0?: JQuery; 
    fnAfterFind?: (result: any) => void;
    fnAfterSwap?: (toRead: boolean) => void;
    fnWhenSave?: (fun: FunEstr) => string;
    fnWhenSave2?: (fun: FunEstr) => string;
    fnAfterSave?: () => void;
    fnAfterOpenEdit?: (fun: FunEstr, json: Json) => void;
    fnGetJsonAndEditA?: (fun: string, key: StrNum) => Promise<boolean>;
    vo?: any;
    //[key: string]: any; //有此欄位 _me 才能設定其他欄位內容
}