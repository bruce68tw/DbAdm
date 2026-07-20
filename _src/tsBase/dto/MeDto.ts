class MeDto {
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
    fnWhenFind?: () => boolean;
    fnAfterFind?: (result: any) => void;
    fnAfterSwap?: (toRead: boolean) => void;
    fnWhenSave?: (fun: FunEstr) => string;
    fnWhenSave2?: (fun: FunEstr, json: Json) => string;
    fnAfterSave?: () => void;
    fnAfterOpenEdit?: (fun: FunEstr, json: Json) => void;
    fnGetJsonAndEditA?: (fun: string, key: StrNum) => Promise<boolean>;
    fnViewFileA?: (table: string, fid: string) => Promise<void>;
    //vo?: TVo;
    //[key: string]: any; //有此欄位 _me 才能設定其他欄位內容
}
window.MeDto = MeDto;