import _iBase from './_iBase';
interface SelectItem {
    Id: string | number;
    Str: string;
    Ext?: any;
}
export default class _iSelect extends _iBase {
    static get(fid: string, box?: JQuery): any;
    static set(fid: string, value: any, box?: JQuery): any;
    static getO(obj: JQuery): string | number | undefined;
    static setO(obj: JQuery, value: any): JQuery | null;
    static setEditO(obj: JQuery, status: boolean): void;
    static getIndex(fid: string, box?: JQuery): number;
    static getIndexO(obj: JQuery): number;
    static getCount(fid: string, box?: JQuery): number;
    static getCountO(obj: JQuery): number;
    static setIndex(fid: string, idx: number, box?: JQuery): void;
    static setIndexO(obj: JQuery, idx: number): void;
    static getText(fid: string, box?: JQuery): string;
    static getTextO(obj: JQuery): string;
    static getData(fid: string, name: string, box?: JQuery): any;
    static getDataO(obj: JQuery, name: string): any;
    static setItems(fid: string, items: SelectItem[] | null, box?: JQuery): void;
    static setItemsO(obj: JQuery, items: SelectItem[] | null): void;
    static getExts(fid: string, box?: JQuery): SelectItem[];
    static setExts(fid: string, items: SelectItem[] | null, box?: JQuery): void;
    static valuesToJson(json: any, fids: string[], box?: JQuery): any;
    static filterByExt(fid: string, value: any, rows: SelectItem[], box?: JQuery, allItem?: boolean, addEmptyStr?: string): void;
    /**
     * onChangeParent -> changeParent
     * 處理2個下拉欄位的連動, 例如:城市-鄉鎮, parent欄位改變時, child欄位的內容也改變
     * param parentFid {string} parent欄位Id
     * param childFid {string} child欄位Id
     * param childId {string} child欄位值, 如果空白表示不設定此欄位值(只更新來源)
     * param action {string} 後端action讀取來源, 固定傳入parentId
     * param isEdit {bool} true(編輯畫面), false(查詢畫面)
     */
    static changeParent(upFid: string, childFid: string, childId: string, action: string, isEdit: boolean): void;
}
export {};
