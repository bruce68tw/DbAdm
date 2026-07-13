import IdStrDto from '../dto/IdStrDto';
import IdStrExtDto from '../dto/IdStrExtDto';

export default class _Code {
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
    static filterRows(rows: IdStrExtDto[] = [], value: any, addEmpty: boolean = true): IdStrDto[] {
        //rows ??= [];
        let result: IdStrDto[] = rows
            .filter(row => row.Ext === value)
            .map(row => ({ Id: row.Id, Str: row.Str }));

        return addEmpty
            ? _Code.addEmptyOpt(result)
            : result;
    }
}