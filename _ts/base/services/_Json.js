"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Str_1 = require("./_Str");
var _Json = /** @class */ (function () {
    function _Json() {
    }
    /**
     add json object into another object
     param {object} source source object
     param {object} target target object
     return {object}
     */
    /*
    static addJson(source: { [key: string]: any }, target?: { [key: string]: any }): { [key: string]: any } {
        if (!target)
            target = {};
        Object.keys(source).map(function (key, index) {
            target![key] = source[key];
        });
        return target;
    },
    */
    /**
     * 轉換一筆json為多筆資料, 用於產生統計圖
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    _Json.toChartRows = function (json, cols) {
        var rows = [];
        for (var i = 0; i < cols.length; i++) {
            var fid = cols[i];
            rows.push({ Id: fid, Num: json[fid] });
        }
        return rows;
    };
    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    _Json.copy = function (from, to) {
        var target = to || {};
        for (var key in from) {
            if (from.hasOwnProperty(key)) {
                target[key] = from[key];
            }
        }
        return target;
        /*
        Object.keys(from).map(function (key, index) {
            to[key] = from[key];
        });
        */
    };
    /**
     * convert keyValues to json object
     * param keyValues {array} keyValue array
     * param keyId {string} key field id, default to 'Key'
     * param valueId {string} value field id, default to 'Value'
     * return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    _Json.keyValuesToJson = function (keyValues, keyId, valueId) {
        if (keyValues === null || keyValues.length === 0)
            return null;
        if (!keyId)
            keyId = 'Key';
        if (!valueId)
            valueId = 'Value';
        var data = {};
        for (var i = 0; i < keyValues.length; i++) {
            var row = keyValues[i];
            data['f' + row[keyId]] = row[valueId];
        }
        return data;
    };
    //json: object or object array
    _Json.toStr = function (json) {
        return (_Json.isEmpty(json)) ? '' : JSON.stringify(json);
    };
    _Json.isEmpty = function (json) {
        // 假設 $.isEmptyObject 是可用的，或是自行實現
        return (json == null || window.jQuery.isEmptyObject(json));
    };
    _Json.notEmpty = function (json) {
        return !_Json.isEmpty(json);
    };
    //check is key-value pair
    _Json.isKeyValue = function (value) {
        return (Object.prototype.toString.call(value) === '[object Object]');
    };
    //convert url to json 
    _Json.urlToJson = function (url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        var pairs = url.split('&');
        var json = {};
        pairs.forEach(function (pair) {
            var parts = pair.split('=');
            if (parts[0] !== "")
                json[parts[0]] = decodeURIComponent(parts[1] || '');
        });
        return json;
    };
    //convert string to json array
    _Json.strToArray = function (str) {
        return JSON.parse(str);
    };
    //find jarray
    //return array index
    _Json.findIndex = function (rows, fid, value) {
        if (rows == null)
            return -1;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i][fid] == value)
                return i;
        }
        //case of not found
        return -1;
    };
    //filter json array
    _Json.filterRows = function (rows, fid, value) {
        if (rows == null || rows.length == 0)
            return null;
        return rows.filter(function (row) {
            return (row[fid] === value);
        });
    };
    //appendRows
    _Json.appendRows = function (froms, tos) {
        if (froms == null || froms.length == 0)
            return;
        var len = tos.length;
        for (var i = 0; i < froms.length; i++) {
            tos[len + i] = froms[i];
        }
    };
    /**
     * (recursive) remove null for json object
     * param obj {json} by ref
     * param level {int} (default 0) debug purpose, base 0
     * return void
     */
    _Json.removeNull = function (obj, level) {
        //debugger;
        level = level || 0;
        if (!obj || _Json.isEmpty(obj))
            return;
        window.jQuery.each(obj, function (key, value) {
            if (value === null) {
                //delete only null, empty is not !!
                delete obj[key];
            }
            else if (_Json.isKeyValue(value)) {
                _Json.removeNull(value, level + 1);
            }
            else if (Array.isArray(value)) {
                //check
                var len = value.length;
                if (len == 0) {
                    delete obj[key];
                    return; //continue
                }
                //case of string array
                if (!_Json.isKeyValue(value[0])) {
                    var isEmpty_1 = true;
                    for (var i = 0; i < len; i++) {
                        if (_Str_1.default.notEmpty(value[i])) {
                            isEmpty_1 = false;
                            break;
                        }
                    }
                    if (isEmpty_1)
                        delete obj[key];
                    return; //continue
                }
                //case of json array
                window.jQuery.each(value, function (k2, v2) {
                    _Json.removeNull(v2, level + 1);
                    if (_Json.isEmpty(v2))
                        value[k2] = null; // Mark as null to be cleaned up later
                });
                //check json and remove if need
                var isEmpty = true;
                //from end
                for (var i = len - 1; i >= 0; i--) {
                    if (!_Json.isEmpty(value[i])) {
                        isEmpty = false;
                    }
                    else if (isEmpty) {
                        //delete array element
                        value.splice(i, 1); // Use splice to remove array element
                    }
                    else {
                        value[i] = null; // This case seems to be for preserving the index if a non-empty item follows
                    }
                }
                if (isEmpty)
                    delete obj[key];
            }
        });
        // 原始程式碼的最後這行 `if (_json.isEmpty(obj)) obj = null;` 在 TS 靜態類別方法中難以直接模擬 'by ref' 的行為來改變傳入的 obj 變數本身，
        // 且通常在 JS 中，`delete obj` 是正確的，但 `obj = null` 只是改變了區域變數的引用。
        // 保持 obj 的屬性被刪除即可達到「移除 null」的目的。
    };
    return _Json;
}()); //class
exports.default = _Json;
