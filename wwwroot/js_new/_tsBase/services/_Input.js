// @ts-nocheck
import _BR from "./_BR";
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
import EstrInputType from "./EstrInputType"; // 假設 EstrInputType 是外部常數/列舉
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
    static getO(obj, box, type) {
        type = type || _Input.getType(obj);
        switch (type) {
            case EstrInputType.Text:
                return _IText.getO(obj);
            case EstrInputType.Textarea:
                return _ITextarea.getO(obj);
            case EstrInputType.Check:
                return _ICheck.getO(obj);
            case EstrInputType.Radio:
                return _IRadio.getO(obj, box);
            case EstrInputType.Select:
                return _ISelect.getO(obj);
            case EstrInputType.Date:
                return _IDate.getO(obj);
            case EstrInputType.DateTime:
                return _IDt.getO(obj);
            case EstrInputType.File:
                return _IFile.getO(obj);
            case EstrInputType.Html:
                return _IHtml.getO(obj);
            case EstrInputType.ReadOnly:
                return _IRead.getO(obj);
            case EstrInputType.Link:
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
            case EstrInputType.Text:
                _IText.setO(obj, value);
                break;
            case EstrInputType.Check:
                _ICheck.setO(obj, value);
                break;
            case EstrInputType.Radio:
                //此時 obj 為 array
                value = value || '0';
                _IRadio.setO(obj, value, box);
                break;
            case EstrInputType.Select:
                _ISelect.setO(obj, value);
                break;
            case EstrInputType.Date:
                return _IDate.setO(obj, value);
            case EstrInputType.DateTime:
                return _IDt.setO(obj, value);
            case EstrInputType.File:
                _IFile.setO(obj, value);
                break;
            case EstrInputType.Textarea:
                _ITextarea.setO(obj, value);
                break;
            case EstrInputType.Html:
                _IHtml.setO(obj, value);
                break;
            case EstrInputType.Read:
                const format = obj.data('format');
                if (_Str.notEmpty(format) && _Str.notEmpty(_BR[format]))
                    value = _Date.dtsToFormat(value, _BR[format]);
                _IRead.setO(obj, value);
                break;
            case EstrInputType.Link:
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
        return (ftype === EstrInputType.Radio) ? _IRadio.getObj(fid, box) : _Obj.get(fid, box);
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
    static fidFilter(fid) {
        return _Str.isEmpty(fid)
            ? '[data-fid]'
            : `[data-fid='${fid}']`;
    }
} //class
//# sourceMappingURL=../../../map/_tsBase/services/_Input.js.map