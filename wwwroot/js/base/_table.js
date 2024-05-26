
var _table = {

    //btn: fun button in tr
    rowMoveUp: function (btn) {
        var row = $(btn).closest('tr');
        row.insertBefore(row.prev());
    },
    rowMoveDown: function (btn) {
        var row = $(btn).closest('tr');
        row.insertAfter(row.next());
    },

    /*
    //delete, up, down
    rowFun: function () {
        return '' +
            _str.format('<a href="javascript:_crudE.onUpdateA(\'{0}\');"><i class="ico-delete" title="{0}"></i></a>', key, _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="ico-up" title="{0}"></i></a>', _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="ico-down" title="{0}"></i></a>', _BR.TipUpdate);
    },
    */

    /**
     * get rows count
     * param table {object} table object
     * param fid {string} field id(name attribute)
     * return {int} rows count
     */
    getRowCount: function (table, fid) {
        return table.find(_fun.fidFilter(fid)).length;
    },

}; //class