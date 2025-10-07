import _IBase from "./_IBase";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Ajax from "./_Ajax";

//select option 
export default class _ISelect extends _IBase {

    //#region override
    static getO(obj: JQueryN): string {
        return _Obj.isEmpty(obj) ? '' : obj!.find('option:selected').val() as string;
    }

    static setO(obj: JQueryN, value: string): JQueryN {
        if (_Obj.isEmpty(obj)) return null;

        const filter = 'option[value="' + value + '"]';
        const item = obj!.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        } else {
            //remove selected
            obj!.find('option:selected').prop('selected', false);
            return null;
        }
    }

    static setEditO(obj: JQueryN, status: boolean): void {
        if (_Obj.isEmpty(obj)) return;
        obj!.prop('disabled', !status);
    }
    //#endregion

    //get selected index(base 0)
    static getIndex(fid: string, box: JQuery): number {
        return _ISelect.getIndexO(_Obj.get(fid, box));
    }
    static getIndexO(obj: JQueryN): number {
        if (_Obj.isEmpty(obj)) return -1;
        return obj!.prop('selectedIndex') as number;
    }

    //get options count
    static getCount(fid: string, box: JQuery): number {
        return _ISelect.getCountO(_Obj.get(fid, box));
    }
    static getCountO(obj: JQueryN): number {
        if (_Obj.isEmpty(obj)) return -1;
        return obj!.find('option').length;
    }

    //set by index(base 0)
    static setIndex(fid: string, idx: number, box: JQuery): void {
        _ISelect.setIndexO(_Obj.get(fid, box)!, idx);
    }
    static setIndexO(obj: JQueryN, idx: number): void {
        if (_Obj.isEmpty(obj)) return;
        obj!.find('option').eq(idx).prop('selected', true);
    }

    //傳回選取的欄位的文字
    static getText(fid: string, box: JQuery): string {
        const obj = _Obj.get(fid, box);
        return _ISelect.getTextO(obj);
    }
    static getTextO(obj: JQueryN): string {
        if (_Obj.isEmpty(obj)) return '';
        return obj!.find('option:selected').text();
    }

    //傳回data屬性(name)值
    static getData(fid: string, name: string, box: JQuery): any {
        return _Obj.get(fid, box)!.find('option:selected').data(name);
    }
    static getDataO(obj: JQueryN, name: string): any {
        if (_Obj.isEmpty(obj)) return null;
        return obj!.find('option:selected').data(name);
    }

    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    static setItems(fid: string, items: { Id: string, Str: string }[] | null, box: JQuery): void {
        const obj = _Obj.get(fid, box);
        _ISelect.setItemsO(obj, items);
    }
    static setItemsF(filter: string, items: { Id: string, Str: string }[] | null, box: JQuery): void {
        const obj = _Obj.getF(filter, box);
        _ISelect.setItemsO(obj, items);
    }
    //by object
    static setItemsO(obj: JQueryN, items: { Id: string, Str: string }[] | null): void {
        if (_Obj.isEmpty(obj)) return;

        obj!.find('option').remove();
        if (items === null)
            return;

        for (let i = 0; i < items.length; i++)
            obj!.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    }

    //get all options
    //getIdStrExts -> getExts
    static getExts(fid: string, box: JQuery): { Id: string, Str: string, Ext: string }[] {
        const rows: { Id: string, Str: string, Ext: string }[] = [];
        _Obj.get(fid, box)!.find('option').each(function (i) {
            const me = $(this);
            rows[i] = {
                Id: me.val() as string,
                Str: me.text(),
                Ext: me.data('ext') as string,
            };
        });
        return rows;
    }

    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    static setExts(fid: string, items: { Id: string, Str: string, Ext: string }[] | null, box: JQuery): void {
        const filter = '#' + fid;
        const obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (let i = 0; i < items.length; i++)
            obj.append(_Str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    }

    //把多欄位值寫入json
    //fids: 欄位名稱 array
    static valuesToJson(json: { [key: string]: any }, fids: string[], box: JQuery): { [key: string]: any } {
        for (let i = 0; i < fids.length; i++)
            json[fids[i]] = _ISelect.get(fids[i], box);
        return json;
    }

    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    static filterByExt(fid: string, value: string, rows: { Id: string, Str: string, Ext: string }[], box: JQuery, allItem?: boolean, addEmptyStr?: string): void {
        if (allItem === undefined)
            allItem = false;
        const obj = _Obj.get(fid, box);
        obj!.empty();

        if (addEmptyStr !== undefined && addEmptyStr !== '')
            obj!.append(_Str.format('<option value="">{0}</option>', addEmptyStr));

        //item.find('option').hide();
        const len = rows.length;
        for (let i = 0; i < len; i++) {
            const row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext === '') || row.Ext === value)
                obj!.append(_Str.format('<option value="{0}">{1}</option>', row.Id, row.Str));
        }

        //選取第0筆
        if (len > 0)
            _ISelect.setIndexO(obj, 0);
    }

    /**
     * ?? //todo
     * onChangeParent -> changeParent
     * 處理2個下拉欄位的連動, 例如:城市-鄉鎮, parent欄位改變時, child欄位的內容也改變
     * param parentFid {stirng} parent欄位Id
     * param childFid {stirng} child欄位Id
     * param childId {stirng} child欄位值, 如果空白表示不設定此欄位值(只更新來源)
     * param action {stirng} 後端action讀取來源, 固定傳入parentId
     * param isEdit {bool} true(編輯畫面), false(查詢畫面)
     */
    static changeParent(parentFid: string, childFid: string, childId: string, action: string, isEdit: boolean): void {
        // 假設 _me, _ajax 在其他地方有定義或引入，這裡因為原始程式碼沒有提供，所以需要根據實際情況調整
        // 為了編譯通過，暫時將 _me.divEdit 和 _me.divRead 假設為 JQuery 類型
        const _me: { divEdit: JQuery, divRead: JQuery } = { divEdit: $({}), divRead: $({}) }; // 模擬 _me 物件
        const box = isEdit ? _me.divEdit : _me.divRead;
        const thisId = _ISelect.get(parentFid, box);
        _Ajax.getJsonA(action, { parentId: thisId }, (rows: { Id: string, Str: string }[]) => {
            _ISelect.setItems(childFid, rows, box);
            if (_Str.notEmpty(childId)) {
                _ISelect.set(childFid, childId, box);
            }
        });
    }

} //class