//for 輸入欄位, 欄位型態使用 StrNum
class _Input {
    //is ftype radio or not
    static isRadio(ftype: string): boolean {
        return (ftype == InputTypeEstr.Radio);
    }

    //get input value
    static get(fid: string, box: JQuery): string {
        return _Input.getO(_Obj.get(fid, box), box);
    }

    /**
     * get input value by object
     * param obj {object}
     * param box {JQuery} (optional) for radio !!
     * param type {string} (optional) data-type
     * return input value
     */ 
    static getO(obj: JQuery, box?: JQuery, type?: string): string {
        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                return _iText.getO(obj);
            case InputTypeEstr.Textarea:
                return _iTextarea.getO(obj);
            case InputTypeEstr.Check:
                return _iCheck.getO(obj);
            case InputTypeEstr.Radio:
                return _iRadio.getO(obj, box);
            case InputTypeEstr.Select:
                return _iSelect.getO(obj);
            case InputTypeEstr.Date:
                return _iDate.getO(obj);
            case InputTypeEstr.DateTime:
                return _iDt.getO(obj);
            case InputTypeEstr.File:
                return _iFile.getO(obj);
            case InputTypeEstr.Html:
                return _iHtml.getO(obj);
            case InputTypeEstr.Read:
                return _iRead.getO(obj);
            case InputTypeEstr.Link:
                return _iLink.getO(obj);
            default:
                //text, textarea
                return obj?.val?.() as string;
        }
    }

    static set(fid: string, value: string, box: JQuery) {
        _Input.setO(_Obj.get(fid, box), value, box);
    }

    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param box {object} for radio
     * param type {string} optional, data-type
     */ 
    static setO(obj: JQuery, value: string, box: JQuery, type?: string) {
        if (obj == null || !_Var.isPureData(value)) return;

        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                _iText.setO(obj, value as string);
                break;
            case InputTypeEstr.Check:
                _iCheck.setO(obj, value);
                break;
            case InputTypeEstr.Radio:
                //此時 obj 為 array
                value = value || '0';
                _iRadio.setO(obj, value as string, box);
                break;
            case InputTypeEstr.Select:
                _iSelect.setO(obj, value as string);
                break;
            case InputTypeEstr.Date:
                return _iDate.setO(obj, value as string);
            case InputTypeEstr.DateTime:
                return _iDt.setO(obj, value as string);
            case InputTypeEstr.File:
                _iFile.setO(obj, value as string);
                break;
            case InputTypeEstr.Textarea:
                _iTextarea.setO(obj, value as string);
                break;
            case InputTypeEstr.Html:
                _iHtml.setO(obj, value as string);
                break;
            case InputTypeEstr.Read:
                const format = obj?.data?.('format');
                if (_Str.notEmpty(format) && _Str.notEmpty(_BR[format]))
                    value = _Date.dtsToFormat(value as string, _BR[format]);
                _iRead.setO(obj, value as string);
                break;
            case InputTypeEstr.Link:
                return _iLink.setO(obj, value as string);
            default:
                //text
                obj?.val?.(value);
                break;
        }
    }

    /**
     * get input field type
     * 如果obj沒有data-type, 可能存在child
     */ 
    static getType(obj: JQuery): StrN {
        return obj.attr('data-type') ?? obj.find('[data-type]').attr('data-type');
    }

    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    static getObj(fid: string, box: JQuery, ftype?: string): JQueryN {
        ftype = ftype || _Input.getType(_Obj.get(fid, box));
        return _Input.isRadio(ftype ?? '')
            ? _iRadio.getObj(fid, box)
            : _Obj.get(fid, box);
    }

    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    static getFid(obj: JQuery): StrN {
        return obj.data('fid');
    }

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {string} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    static fidFilter(fid?: StrN): string {
        return _Str.isEmpty(fid)
            ? '[data-fid]'
            : `[data-fid='${fid}']`;
    }

    static preFidFilter(fid: string): string {
        return `[data-fid^='${fid}']`;
    }
}
window._Input = _Input;