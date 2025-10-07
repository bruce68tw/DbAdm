import _Str from "./_Str";

//switch radio, 使用 css3 toggle switch
//https://www.htmllion.com/css3-toggle-switch-button.html
export default class _Switch {

    /**
     * 傳回元件內容字串 for client render
     * @param yes {string} 
     * @param no {string} 
     * @param width {number} 
     * @param status {boolean} 
     * @param inline {boolean} 
     * @param fid {string}
     * @param cls {string}
     * @returns {string}
     */
    public static getText(yes: string, no: string, width: number, status: boolean, inline: boolean, fid?: string, cls?: string): string {
        const inline2 = (inline) ? ' x-inline' : '';
        let attr = (fid) ? (` id="${fid}"`) : '';
        if (status)
            attr += ' checked';
        
        const cls2 = (cls) ? (` ${cls}`) : '';
        
        const html = '' +
            '<label class="switch{5}" style="width:{2}px;">' +
                '<input{3} class="switch-input{4}" type="checkbox" />' +
                '<span class="switch-label" data-on="{0}" data-off="{1}"></span>' +
                '<span class="switch-handle"></span>' +
            '</label>';

        // 使用 _Str.format 進行字串格式化，並將參數傳遞給它
        return _Str.format(html, yes, no, width, attr, cls2, inline2);
    }

} //class