/*
 * handle html data
 */
export default class _Html {
    //*** 必要屬性 or 函式 ***
    //get locale code
    static encodeRow(row, fields) {
        for (let i = 0; i < fields.length; i++) {
            const id = fields[i];
            row[id] = _Html.encode(row[id]);
        }
        return row;
    }
    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    static encode(value) {
        if (value == null)
            return '';
        // @ts-ignore: jQuery is globally available
        return $('<div/>').text(value).html();
    }
    static decode(value) {
        if (value == null)
            return '';
        // @ts-ignore: jQuery is globally available
        return $('<div/>').html(value).text();
    }
    //?? 更新html欄位內容, 讀取 text()
    static update(id, box) {
        const filter = '#' + id;
        // @ts-ignore: jQuery is globally available
        const obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        // @ts-ignore: summernote is expected to be a jQuery plugin
        obj.summernote('code', obj.text());
    }
    //??
    static updates(ids, box) {
        for (let i = 0; i < ids.length; i++)
            _Html.update(ids[i], box);
    }
}
;
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Html.js.map