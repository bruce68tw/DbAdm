
var _helper = {

    /**
     * ??
     */ 
    getBaseProp: function (rowNo, fid, value, type, required, editable, extAttr) {
        var attr = _str.format("type='{0}' data-id='{1}' name='{2}' value='{3}'",
            type, fid, fid + rowNo, value);
        if (required === true)
            attr += " required";
        if (editable === false)
            attr += " readonly";
        if (_str.notEmpty(extAttr))
            attr += " " + extAttr;
        return _str.trim(attr);
    },

    //參考 _Helper.cs GetEventAttr
    getEventAttr: function (fnName, fnValue, args) {
        if (_str.isEmpty(fnValue))
            return "";

        var attr = `data-${fnName}='${fnValue}'`;
        if (_str.notEmpty(args))
            attr += ` data-args='${args}'`;
        return attr;
    },
};