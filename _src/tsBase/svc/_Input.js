import InputTypeEstr from '../enum/InputTypeEstr';
import _Obj from './_Obj';
import _Var from './_Var';
import _Str from './_Str';
import _Date from './_Date';
import _iText from './_iText';
import _iTextarea from './_iTextarea';
import _iCheck from './_iCheck';
import _iRadio from './_iRadio';
import _iSelect from './_iSelect';
import _iDate from './_iDate';
import _iDt from './_iDt';
import _iFile from './_iFile';
import _iHtml from './_iHtml';
import _iRead from './_iRead';
import _iLink from './_iLink';
export default class _Input {
    static isRadio(ftype) {
        return (ftype === InputTypeEstr.Radio);
    }
    //get input value
    static get(fid, box) {
        return _Input.getO(_Obj.get(fid, box), box);
    }
    /**
     * get input value by object
     * param obj {object}
     * param type {string} (optional) data-type
     * return input value
     */
    static getO(obj, box, type) {
        var _a;
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
                return (_a = obj === null || obj === void 0 ? void 0 : obj.val) === null || _a === void 0 ? void 0 : _a.call(obj);
        }
    }
    static set(fid, value, box) {
        _Input.setO(_Obj.get(fid, box), value, box);
    }
    /**
     * set input value by object
     * param obj {object}
     * param value {object}
     * param box {object} for radio
     * param type {string} optional, data-type
     */
    static setO(obj, value, box, type) {
        var _a, _b;
        if (obj == null || !_Var.isPureData(value))
            return;
        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                _iText.setO(obj, value);
                break;
            case InputTypeEstr.Check:
                _iCheck.setO(obj, value);
                break;
            case InputTypeEstr.Radio:
                //此時 obj 為 array
                value = value || '0';
                _iRadio.setO(obj, value, box);
                break;
            case InputTypeEstr.Select:
                _iSelect.setO(obj, value);
                break;
            case InputTypeEstr.Date:
                return _iDate.setO(obj, value);
            case InputTypeEstr.DateTime:
                return _iDt.setO(obj, value);
            case InputTypeEstr.File:
                _iFile.setO(obj, value);
                break;
            case InputTypeEstr.Textarea:
                _iTextarea.setO(obj, value);
                break;
            case InputTypeEstr.Html:
                _iHtml.setO(obj, value);
                break;
            case InputTypeEstr.Read:
                const format = (_a = obj === null || obj === void 0 ? void 0 : obj.data) === null || _a === void 0 ? void 0 : _a.call(obj, 'format');
                if (_Str.notEmpty(format) && _Str.notEmpty(_BR[format]))
                    value = _Date.dtsToFormat(value, _BR[format]);
                _iRead.setO(obj, value);
                break;
            case InputTypeEstr.Link:
                return _iLink.setO(obj, value);
            default:
                //text
                (_b = obj === null || obj === void 0 ? void 0 : obj.val) === null || _b === void 0 ? void 0 : _b.call(obj, value);
                break;
        }
    }
    /**
     * get input field type
     * 如果obj沒有data-type, 可能存在child
     */
    static getType(obj) {
        var _a, _b, _c, _d;
        var _e;
        return (_e = (_a = obj === null || obj === void 0 ? void 0 : obj.attr) === null || _a === void 0 ? void 0 : _a.call(obj, 'data-type')) !== null && _e !== void 0 ? _e : (_d = (_c = (_b = obj === null || obj === void 0 ? void 0 : obj.find) === null || _b === void 0 ? void 0 : _b.call(obj, '[data-type]')) === null || _c === void 0 ? void 0 : _c.attr) === null || _d === void 0 ? void 0 : _d.call(_c, 'data-type');
    }
    /**
     * get object
     * param fid {string}
     * param box {object}
     * param ftype {string} optional
     * return object
     */
    static getObj(fid, box, ftype) {
        ftype = ftype || _Input.getType(_Obj.get(fid, box));
        return _Input.isRadio(ftype !== null && ftype !== void 0 ? ftype : '')
            ? _iRadio.getObj(fid, box) : _Obj.get(fid, box);
    }
    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    static getFid(obj) {
        var _a;
        return (_a = obj === null || obj === void 0 ? void 0 : obj.data) === null || _a === void 0 ? void 0 : _a.call(obj, 'fid');
    }
    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {string} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    static fidFilter(fid) {
        return _Str.isEmpty(fid)
            ? '[data-fid]'
            : `[data-fid='${fid}']`;
    }
    static preFidFilter(fid) {
        return `[data-fid^='${fid}']`;
    }
}
// 為了內部自我參照
//const _Input = _Input;
