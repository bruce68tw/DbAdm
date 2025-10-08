import _Fun from "./_Fun";
import _Input from "./_Input";
// import _Br from "./_Br"; // 註解中提到
// import _Str from "./_Str"; // 註解中提到
export default class _Table {
    //btn: fun button in tr
    static rowMoveUp() {
        // _fun.getMe(true) 傳回觸發事件的元件 (例如按鈕)，closest('tr') 找到包含該元件的列
        const row = _Fun.getObj().closest('tr');
        row.insertBefore(row.prev());
    }
    static rowMoveDown() {
        // _fun.getMe(true) 傳回觸發事件的元件 (例如按鈕)，closest('tr') 找到包含該元件的列
        const row = _Fun.getObj().closest('tr');
        row.insertAfter(row.next());
    }
    /*
    //delete, up, down
    static rowFun(): string {
        return '' +
            _Str.format('<a href="javascript:_me.crudE.onUpdateA(\'{0}\');"><i class="ico-delete" title="{0}"></i></a>', key, _Br.TipUpdate) +
            _Str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="ico-up" title="{0}"></i></a>', _Br.TipUpdate) +
            _Str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="ico-down" title="{0}"></i></a>', _Br.TipUpdate);
    }
    */
    /**
     * get rows count
     * param table {JQuery<HTMLElement>} table object
     * param fid {string} field id(name attribute)
     * return {number} rows count
     */
    static getRowCount(table, fid) {
        // _input.fidFilter 應該在 _Input 類別中
        return table.find(_Input.fidFilter(fid)).length;
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Table.js.map