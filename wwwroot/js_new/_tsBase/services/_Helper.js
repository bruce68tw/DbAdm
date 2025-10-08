import _Str from "./_Str";
export default class _Helper {
    /**
     * ??
     */
    static getBaseProp(rowNo, fid, value, type, required, editable, extAttr) {
        let attr = _Str.format("type='{0}' data-id='{1}' name='{2}' value='{3}'", type, fid, fid + rowNo, value);
        if (required === true)
            attr += " required";
        if (editable === false)
            attr += " readonly";
        if (_Str.notEmpty(extAttr))
            attr += " " + extAttr;
        return _Str.trim(attr);
    }
    //參考 _Helper.cs GetEventAttr
    static getEventAttr(fnName, fnValue, args) {
        if (_Str.isEmpty(fnValue))
            return "";
        let attr = `data-${fnName}='${fnValue}'`;
        if (_Str.notEmpty(args))
            attr += ` data-args='${args}'`;
        return attr;
    }
}
;
//# sourceMappingURL=../../../map/_tsBase/services/_Helper.js.map