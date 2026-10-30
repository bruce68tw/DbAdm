//處理 _XpCode, 下拉式欄位資料
class _Code {

    //尋找 id 相同的物件，若找到則回傳其 name，若沒找到或 rows 為空則回傳空字串
    static findName(rows: IdStrDto[] = [], id: string): string {
        return rows.find(row => row.Id === id)?.Str ?? '';
    }

    //add empty option
    static addEmptyOpt(rows: IdStrDto[] = []): IdStrDto[] {
        //rows ??= [];
        rows.unshift({ Id: '', Str: _BR.PlsSelect });   //加在第一筆
        return rows;
    }

    /**
     * filter json array
     * @param addEmpty {bool} default true
     */ 
    static filterRows(rows: IdStrExtDto[], value: StrNum, addEmpty: boolean = true): IdStrDto[] {
        //rows ??= [];
        let result: IdStrDto[] = rows
            .filter(row => row.Ext === value)
            .map(row => ({ Id: row.Id, Str: row.Str }));

        return addEmpty
            ? _Code.addEmptyOpt(result)
            : result;
    }
}
window._Code = _Code;