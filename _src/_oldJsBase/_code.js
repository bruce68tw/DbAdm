
//配合 XpCode table
var _code = {

    //add empty option
    addEmptyOpt: function (rows) {
        rows ??= [];
        rows.unshift({ Id: '', Str: _BR.PlsSelect });   //加在第一筆
        return rows;
    },

    /**
     * filter json array
     * @param addEmpty {bool} default true
     */ 
    filterRows: function (rows, value, addEmpty = true) {
        rows ??= [];
        let result = rows
            .filter(row => row.Ext === value)
            .map(row => ({ Id: row.Id, Str: row.Str }));

        return addEmpty
            ? _code.addEmptyOpt(result)
            : result;
    },


}; //class