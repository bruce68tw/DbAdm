
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
        if (!_str.isEmpty(extAttr))
            attr += " " + extAttr;
        return _str.trim(attr);
    },
};