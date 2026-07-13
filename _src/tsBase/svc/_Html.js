import _iSelect from './_iSelect';
import _Fun from './_Fun';
export default class _Html {
    //load css theme
    static loadTheme(color) {
        const link = document.getElementById('xgTheme');
        if (link) {
            link.href = `/css/view/_xg${color}.css`;
        }
    }
    static loadThemeByElm() {
        const color = _iSelect.getO(_Fun.getMe());
        _Html.loadTheme(color);
    }
    //*** 必要屬性 or 函式 ***
    //get locale code
    static encodeRow(row, fields) {
        for (let i = 0; i < fields.length; i++) {
            const id = fields[i];
            if (id in row) {
                row[id] = _Html.encode(row[id]);
            }
        }
        return row;
    }
    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    static encode(value) {
        var _a;
        return (_a = $('<div/>').text(value).html()) !== null && _a !== void 0 ? _a : '';
    }
    static decode(value) {
        var _a;
        return (_a = $('<div/>').html(value).text()) !== null && _a !== void 0 ? _a : '';
    }
    //?? 更新html欄位內容, 讀取 text()
    static update(id, box) {
        const filter = '#' + id;
        const obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    }
    //??
    static updates(ids, box) {
        for (let i = 0; i < ids.length; i++) {
            _Html.update(ids[i], box);
        }
    }
}
