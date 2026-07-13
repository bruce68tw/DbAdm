import _Input from './_Input';
import _Fun from './_Fun';
export default class _Table {
    /**
     * 讀取某個欄位值
     * 傳回字串陣列
     */
    static getFidValues(box, trFilter, fid) {
        const ary = []; // return array
        box.find(trFilter).each((_idx, trElm) => {
            const key = _Input.get(fid, $(trElm));
            ary.push(key);
        });
        return ary;
    }
    /**
     * btn: fun button in tr
     */
    static rowMoveUp() {
        const row = _Fun.getMe().closest('tr');
        row.insertBefore(row.prev());
    }
    static rowMoveDown() {
        const row = _Fun.getMe().closest('tr');
        row.insertAfter(row.next());
    }
    /**
     * get rows count
     * @param table table object
     * @param fid field id(name attribute)
     * @returns rows count
     */
    static getRowCount(table, fid) {
        return table.find(_Input.fidFilter(fid)).length;
    }
}
