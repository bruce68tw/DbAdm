//datetime欄位, 欄位值型態為 string
class _iDt extends _iBase {
    //constant
    //BoxFilter: '.date',

    //=== get/set start ===
    static getO(obj: JQuery): string {        
        //var date = _Date.uiToMmDate(_iDate.getO(_iDt._boxGetDate(obj)));
        const date = _iDate.getO(_iDt._boxGetDate(obj));
        return _Str.isEmpty(date)
            ? ''
            : `${date} ${_iSelect.getO(_iDt._boxGetHour(obj))}:${_iSelect.getO(_iDt._boxGetMin(obj))}`;
    }

    /**
     * set input value
     * param obj {object} datetime box object
     * param value {string} _Fun.MmDtFmt
     */
    static setO(obj: JQuery, value?: string): void {
        let date: string;
        let hour: number;
        let min: number;        
        if (_Str.isEmpty(value)) {
            date = '';
            hour = 0;
            min = 0;
        } else {
            date = value!; //_iDate will set
            hour = parseInt(_Str.getMid(value, ' ', ':'), 10);
            min = parseInt(_Str.getMid(value, ':', ':'), 10);
        }
        
        _iDate.setO(_iDt._boxGetDate(obj), date);
        _iSelect.setO(_iDt._boxGetHour(obj), hour.toString());
        _iSelect.setO(_iDt._boxGetMin(obj), min.toString());
    }

    static setEditO(obj: JQuery, status: boolean): void {
        _iDate.setEditO(_iDt._boxGetDate(obj), status);
        _iSelect.setEditO(_iDt._boxGetHour(obj), status);
        _iSelect.setEditO(_iDt._boxGetMin(obj), status);
    }

    //=== private function below ===
    /**
     * get date input object(not date box)
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetDate(box: JQuery): JQuery {
        return box.find('input:first');
    }

    /**
     * get hour object
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetHour(box: JQuery): JQuery {
        return box.find('select:first');
    }

    /**
     * get minute object
     * param box {object} datetime box
     * return {object}
     */
    private static _boxGetMin(box: JQuery): JQuery {
        return box.find('select:last');
    }
}
window._iDt = _iDt;