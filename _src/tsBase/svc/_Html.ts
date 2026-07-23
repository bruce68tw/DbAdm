class _Html {
    //load css theme
    static loadTheme(color: string): void {
        const link = document.getElementById('xgTheme') as HTMLLinkElement | null;
        if (link) {
            link.href = `/cssView/_xg${color}.css`;
        }
    }

    static loadThemeByElm(): void {
        const color = _iSelect.getO(_Fun.getMe()) as string;
        _Html.loadTheme(color);
    }

    //*** 必要屬性 or 函式 ***
    //get locale code
    static encodeRow<T extends Record<string, any>>(row: T, fields: string[]): T {
        for (let i = 0; i < fields.length; i++) {
            const id = fields[i];
            if (id in row) {
                row[id as keyof T] = _Html.encode(row[id]) as any;
            }
        }
        return row;
    }

    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    static encode(value: unknown): string {
        return $('<div/>').text(value as string).html() ?? '';
    }

    static decode(value: string): string {
        return $('<div/>').html(value).text() ?? '';
    }

    //?? 更新html欄位內容, 讀取 text()
    static update(id: string, box?: JQuery): void {
        const filter = '#' + id;
        const obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        (obj as any).summernote('code', obj.text());
    }

    //??
    static updates(ids: string[], box?: JQuery): void {
        for (let i = 0; i < ids.length; i++) {
            _Html.update(ids[i], box);
        }
    }
}
window._Html = _Html;