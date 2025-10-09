import _Date from "./_Date";
import _ICheck from "./_ICheck";
import _IDate from "./_IDate";
import _IDt from "./_IDt";
import _IFile from "./_IFile";
import _IHtml from "./_IHtml";
import _ILink from "./_ILink";
import _IRadio from "./_IRadio";
import _IRead from "./_IRead";
import _ISelect from "./_ISelect";
import _IText from "./_IText";
import _ITextarea from "./_ITextarea";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Var from "./_Var";
import InputTypeEstr from "../enums/InputTypeEstr";
/**
 * 1.data-fid -> find object, get data-type, get/set old value
 * 2.name attr -> for _form.toRow()
 * 3.validation error span position rules:
 * (a)same parent, could be different child level
 * (b)sibling(ex: Date)
 */
export default class _Input {
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
    static getO(obj, box, type = null) {
        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                return _IText.getO(obj);
            case InputTypeEstr.Textarea:
                return _ITextarea.getO(obj);
            case InputTypeEstr.Check:
                return _ICheck.getO(obj);
            case InputTypeEstr.Radio:
                return _IRadio.getO(obj, box);
            case InputTypeEstr.Select:
                return _ISelect.getO(obj);
            case InputTypeEstr.Date:
                return _IDate.getO(obj);
            case InputTypeEstr.DateTime:
                return _IDt.getO(obj);
            case InputTypeEstr.File:
                return _IFile.getO(obj);
            case InputTypeEstr.Html:
                return _IHtml.getO(obj);
            case InputTypeEstr.Read:
                return _IRead.getO(obj);
            case InputTypeEstr.Link:
                return _ILink.getO(obj);
            default:
                //text, textarea
                return obj.val();
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
        if (obj == null || !_Var.isPureData(value))
            return;
        type = type || _Input.getType(obj);
        switch (type) {
            case InputTypeEstr.Text:
                _IText.setO(obj, value);
                break;
            case InputTypeEstr.Check:
                _ICheck.setO(obj, value);
                break;
            case InputTypeEstr.Radio:
                //此時 obj 為 array
                value = value || '0';
                _IRadio.setO(obj, value, box);
                break;
            case InputTypeEstr.Select:
                _ISelect.setO(obj, value);
                break;
            case InputTypeEstr.Date:
                return _IDate.setO(obj, value);
            case InputTypeEstr.DateTime:
                return _IDt.setO(obj, value);
            case InputTypeEstr.File:
                _IFile.setO(obj, value);
                break;
            case InputTypeEstr.Textarea:
                _ITextarea.setO(obj, value);
                break;
            case InputTypeEstr.Html:
                _IHtml.setO(obj, value);
                break;
            case InputTypeEstr.Read:
                const format = obj.data('format');
                if (_Str.notEmpty(format) && _Str.notEmpty(_BR[format]))
                    value = _Date.dtsToFormat(value, _BR[format]);
                _IRead.setO(obj, value);
                break;
            case InputTypeEstr.Link:
                return _ILink.setO(obj, value);
            default:
                //text
                obj.val(value);
                break;
        }
    }
    /**
     * get input field type
     */
    static getType(obj) {
        return obj.data('type');
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
        return (ftype === InputTypeEstr.Radio) ? _IRadio.getObj(fid, box) : _Obj.get(fid, box);
    }
    /**
     * get data-fid of object
     * param obj {object}
     * return fid string
     */
    static getFid(obj) {
        return obj.data('fid');
    }
    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} optional, if empty means find all inputs with data-fid
     * return {string} filter
     */
    static fidFilter(fid = null) {
        return _Str.isEmpty(fid)
            ? '[data-fid]'
            : `[data-fid='${fid}']`;
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Input.js.map