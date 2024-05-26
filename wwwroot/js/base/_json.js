﻿
var _json = {

    /**
     add json object into another object
     @param {object} source source object
     @param {object} target target object
     @return {object}
     */
    /*
    addJson: function (source, target) {
        if (!target)
            target = {};
        Object.keys(source).map(function (key, index) {
            target[key] = source[key];
        });
        return target;
    },
    */

    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */ 
    copy: function (from, to) {
        var to = to || {};
        for (var key in from)
            to[key] = from[key];
        return to;
        /*
        Object.keys(from).map(function (key, index) {
            to[key] = from[key];
        });
        */
    },

    /**
     * convert keyValues to json object
     * param keyValues {array} keyValue array
     * param keyId {string} key field id, default to 'Key'
     * param valueId {string} value field id, default to 'Value'
     * return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    keyValuesToJson: function (keyValues, keyId, valueId) {
        if (keyValues === null || keyValues.length === 0)
            return null;

        if (!keyId)
            keyId = 'Key';
        if (!valueId)
            valueId = 'Value';
        var data = {};
        for (var i=0; i<keyValues.length; i++) {
            var row = keyValues[i];
            data['f'+row[keyId]] = row[valueId];
        }
        return data;
    },

    //json: object or object array
    toStr: function (json) {
        return (_json.isEmpty(json)) ? '' : JSON.stringify(json);
    },

    isEmpty: function (json) {
        return (json == null || $.isEmptyObject(json));
    },

    //check is key-value pair
    isKeyValue: function (value) {
        return (Object.prototype.toString.call(value) === '[object Object]');
    },

    //convert url to json 
    urlToJson: function (url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        var pairs = url.split('&');
        var json = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            if (pair[0] !== "")
                json[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return json;
    },

    //convert string to json array
    strToArray: function (str) {
        return $.parseJSON(str);
    },

    //find jarray
    //return array index
    findIndex: function (rows, fid, value) {
        if (rows == null)
            return -1;

        for (var i = 0; i < rows.length; i++) {
            if (rows[i][fid] == value) 
                return i;           
        }

        //case of not found
        return -1;
    },

    //filter json array
    filterRows: function (rows, fid, value) {
        if (rows == null || rows.length == 0)
            return null;

        return rows.filter(function (row) {
            return (row[fid] === value);
        });
    },

    //appendRows
    appendRows: function (froms, tos) {
        if (froms == null || froms.length == 0)
            return;

        var len = tos.length;
        for (var i = 0; i < froms.length; i++) {
            tos[len + i] = froms[i];
        }
    },

    /**
     * (recursive) remove null for json object
     * param obj {json} by ref
     * param level {int} (default 0) debug purpose, base 0
     * return void
     */
    removeNull: function (obj, level) {
        //debugger;
        level = level || 0;
        $.each(obj, function (key, value) {
            if (value === null) {
                //delete only null, empty is not !!
                delete obj[key];
            } else if (_json.isKeyValue(value)) {
                _json.removeNull(value, level + 1);
            } else if ($.isArray(value)) {
                //check
                var len = value.length;
                if (len == 0) {
                    delete obj[key];
                    return; //continue
                }

                //case of string array
                if (!_json.isKeyValue(value[0])) {
                    var isEmpty = true;
                    for (var i = 0; i < len; i++) {
                        if (_str.notEmpty(value[i])) {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (isEmpty)
                        delete obj[key];
                    return; //continue
                }

                //case of json array
                $.each(value, function (k2, v2) {
                    _json.removeNull(v2, level + 1);

                    if (_json.isEmpty(v2))
                        v2 = null;
                });

                //check json and remove if need
                var isEmpty = true;
                //from end
                for (var i = len - 1; i >= 0; i--) {
                    if (!_json.isEmpty(value[i])) {
                        isEmpty = false;
                    } else if (isEmpty) {
                        //delete array element
                        delete value[i];
                    } else {
                        value[i] = null;
                    }
                }
                if (isEmpty)
                    delete obj[key];
            }
        });

        if (_json.isEmpty(obj))
            obj = null;
    },

}; //class