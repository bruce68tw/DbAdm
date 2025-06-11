
//switch radio, 使用 css3 toggle switch
//https://www.htmllion.com/css3-toggle-switch-button.html
var _switch = {

    //傳回元件內容字串 for client render
    getText: function (yes, no, width, status, inline, fid, cls) {
        var inline2 = (inline) ? ' xg-inline' : '';
        var attr = (fid) ? (' id="' + fid + '"') : '';
        if (status)
            attr += ' checked';
        cls = (cls) ? (' ' + cls) : '';
        var  html = '' +
            '<label class="switch{5}" style="width:{2}px;">' +
                '<input{3} class="switch-input{4}" type="checkbox" />' +
                '<span class="switch-label" data-on="{0}" data-off="{1}"></span>' +
                '<span class="switch-handle"></span>' +
            '</label>';
        return _str.format(html, yes, no, width, attr, cls, inline2);
    },

}; //class