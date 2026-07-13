export default class _Table {
    /**
     * 讀取某個欄位值
     * 傳回字串陣列
     */
    static getFidValues(box: JQuery, trFilter: string, fid: string): string[];
    /**
     * btn: fun button in tr
     */
    static rowMoveUp(): void;
    static rowMoveDown(): void;
    /**
     * get rows count
     * @param table table object
     * @param fid field id(name attribute)
     * @returns rows count
     */
    static getRowCount(table: JQuery, fid: string): number;
}
