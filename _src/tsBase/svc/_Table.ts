class _Table {
    /**
     * 讀取某個欄位值
     * 傳回字串陣列
     */
    static getFidValues(box: JQuery, trFilter: string, fid: string): string[] {
        const ary: string[] = []; // return array
        box.find(trFilter).each((_idx: number, trElm: Elm) => {
            const key = _Input.get(fid, $(trElm)) as string;
            ary.push(key);
        });
        return ary;
    }

    /**
     * btn: fun button in tr
     */
    static rowMoveUp(): void {
        const row = _Fun.getMe().closest('tr');
        row.insertBefore(row.prev());
    }

    static rowMoveDown(): void {
        const row = _Fun.getMe().closest('tr');
        row.insertAfter(row.next());
    }

    /**
     * get rows count
     * @param table table object
     * @param fid field id(name attribute)
     * @returns rows count
     */
    static getRowCount(table: JQuery, fid: string): number {
        return table.find(_Input.fidFilter(fid)).length;
    }
}
window._Table = _Table;