class _iSelect extends _iBase {
    static get(fid: string, box?: JQuery): any {
        return _iBase.get ? _iBase.get(fid, box) : '';
    }

    static set(fid: string, value: any, box?: JQuery): any {
        return _iBase.set ? _iBase.set(fid, value, box) : null;
    }

    //#region override
    static getO(obj: JQuery): string | number | undefined {
        return (obj.length === 0) ? '' : obj.find('option:selected').val() as string | number;
    }

    static setO(obj: JQuery, value: any): JQuery | null {
        const filter = 'option[value="' + value + '"]';
        const item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        } else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    }

    static setEditO(obj: JQuery, status: boolean): void {
        obj.prop('disabled', !status);
    }
    //#endregion

    //get selected index(base 0)
    static getIndex(fid: string, box?: JQuery): number {
        return this.getIndexO(_Obj.get(fid, box));
    }
    static getIndexO(obj: JQuery): number {
        return obj.prop('selectedIndex') as number;
    }

    //get options count
    static getCount(fid: string, box?: JQuery): number {
        return this.getCountO(_Obj.get(fid, box));
    }
    static getCountO(obj: JQuery): number {
        return obj.find('option').length;
    }

    //set by index(base 0)
    static setIndex(fid: string, idx: number, box?: JQuery): void {
        this.setIndexO(_Obj.get(fid, box), idx);
    }
    static setIndexO(obj: JQuery, idx: number): void {
        obj.find('option').eq(idx).prop('selected', true);
    }

    //傳回選取的欄位的文字
    static getText(fid: string, box?: JQuery): string {
        const obj = _Obj.get(fid, box);
        return this.getTextO(obj);
    }
    static getTextO(obj: JQuery): string {
        return obj.find('option:selected').text();
    }

    //傳回data屬性(name)值
    static getData(fid: string, name: string, box?: JQuery): any {
        return _Obj.get(fid, box).find('option:selected').data(name);
    }
    static getDataO(obj: JQuery, name: string): any {
        return obj.find('option:selected').data(name);
    }

    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    static setItems(fid: string, items: IdStrDto[] | null, box?: JQuery): void {
        const obj = _Obj.get(fid, box);
        this.setItemsO(obj, items);
    }
    //by object
    static setItemsO(obj: JQuery, items: IdStrDto[] | null): void {
        obj.find('option').remove();
        if (items === null) return;
        for (let i = 0; i < items.length; i++) {
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
        }
    }

    //get all options
    //getIdStrExts -> getExts
    static getExts(fid: string, box?: JQuery): IdStrExtDto[] {
        const rows: IdStrExtDto[] = [];
        _Obj.get(fid, box).find('option').each(function (this: Elm, i: number) {
            const me = $(this);
            rows[i] = {
                Id: me.val() as string,
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    }

    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    static setExts(fid: string, items: IdStrExtDto[] | null, box?: JQuery): void {
        const filter = '#' + fid;
        const obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null) return;
        for (let i = 0; i < items.length; i++) {
            obj.append(_Str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
        }
    }

    //把多欄位值寫入json
    //fids: 欄位名稱 array
    static valuesToJson(json: any, fids: string[], box?: JQuery): any {
        for (let i = 0; i < fids.length; i++) {
            json[fids[i]] = this.get(fids[i], box);
        }
        return json;
    }

    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    static filterByExt(fid: string, value: any, rows: IdStrExtDto[], box?: JQuery, allItem?: boolean, addEmptyStr?: string): void {
        if (allItem === undefined) {
            allItem = false;
        }
        const obj = _Obj.get(fid, box);
        obj.empty();

        if (addEmptyStr !== '') {
            obj.append(_Str.format('<option value="">{0}</option>', addEmptyStr));
        }

        const len = rows.length;
        for (let i = 0; i < len; i++) {
            const row = rows[i];
            if ((allItem === true && row.Ext === '') || row.Ext == value) {
                obj.append(_Str.format('<option value="{0}">{1}</option>', row.Id, row.Str));
            }
        }

        //選取第0筆
        if (len > 0) {
            this.setIndexO(obj, 0);
        }
    }

    /**
     * onChangeParent -> changeParent
     * 處理2個下拉欄位的連動, 例如:城市-鄉鎮, parent欄位改變時, child欄位的內容也改變
     * param parentFid {string} parent欄位Id
     * param childFid {string} child欄位Id
     * param childId {string} child欄位值, 如果空白表示不設定此欄位值(只更新來源)
     * param action {string} 後端action讀取來源, 固定傳入parentId
     * param isEdit {bool} true(編輯畫面), false(查詢畫面)
     */
    static changeParent(upFid: string, childFid: string, childId: string, action: string, isEdit: boolean): void {
        const box = isEdit ? _me.divEdit : _me.divRead; 
        const thisId = this.get(upFid, box);
        _Ajax.getJsonA(action, { parentId: thisId }, (rows: any) => {
            this.setItems(childFid, rows as IdStrExtDto[], box);
            if (_Str.notEmpty(childId)) {
                this.set(childFid, childId, box);
            }
        });
    }
}
window._iSelect = _iSelect;