import _Str from './_Str';
export default class _Switch {
    /**
     * 傳回元件內容字串 for client render
     */
    static getText(yes, no, width, status, inline, fid, cls) {
        const inline2 = inline ? ' x-inline' : '';
        let attr = fid ? ` id="${fid}"` : '';
        if (status) {
            attr += ' checked';
        }
        cls = cls ? ` ${cls}` : '';
        const html = '' +
            '<label class="switch{5}" style="width:{2}px;">' +
            '<input{3} class="switch-input{4}" type="checkbox" />' +
            '<span class="switch-label" data-on="{0}" data-off="{1}"></span>' +
            '<span class="switch-handle"></span>' +
            '</label>';
        return _Str.format(html, yes, no, width, attr, cls, inline2);
    }
}
