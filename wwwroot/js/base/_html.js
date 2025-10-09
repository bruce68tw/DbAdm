/*
 * handle html data
 */
var _html = {
    //*** 必要屬性 or 函式 ***
    //get locale code
    encodeRow: function (row, fields) {
        for (var i = 0; i < fields.length; i++) {
            var id = fields[i];
            row[id] = _html.encode(row[id]);
        }
        return row;
    },

    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    encode: function (value) {
        return $('<div/>').text(value).html();
    },

    decode: function(value){
        return $('<div/>').html(value).text();
    },

    //?? 更新html欄位內容, 讀取 text()
    update: function(id, box) {
        var filter = '#' + id;
        var obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
	//??
    updates: function (ids, box) {
        for (var i = 0; i < ids.length; i++)
            _html.update(ids[i], box);
    },
    
};