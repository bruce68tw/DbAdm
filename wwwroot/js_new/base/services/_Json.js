import _Str from "./_Str";
export default class _Json {
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
    static toChartRows(json, cols) {
        const rows = [];
        for (let i = 0; i < cols.length; i++) {
            const fid = cols[i];
            rows.push({ Id: fid, Num: json[fid] });
        }
        return rows;
    }
    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    static copy(from, to) {
        const target = to || {};
        for (const key in from) {
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
    }
    /**
     * convert keyValues to json object
     * param keyValues {array} keyValue array
     * param keyId {string} key field id, default to 'Key'
     * param valueId {string} value field id, default to 'Value'
     * return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    static keyValuesToJson(keyValues, keyId, valueId) {
        if (keyValues === null || keyValues.length === 0)
            return null;
        if (!keyId)
            keyId = 'Key';
        if (!valueId)
            valueId = 'Value';
        const data = {};
        for (let i = 0; i < keyValues.length; i++) {
            const row = keyValues[i];
            data['f' + row[keyId]] = row[valueId];
        }
        return data;
    }
    //json: object or object array
    static toStr(json) {
        return (_Json.isEmpty(json)) ? '' : JSON.stringify(json);
    }
    static isEmpty(json) {
        // 假設 $.isEmptyObject 是可用的，或是自行實現
        return (json == null || window.jQuery.isEmptyObject(json));
    }
    static notEmpty(json) {
        return !_Json.isEmpty(json);
    }
    //check is key-value pair
    static isKeyValue(value) {
        return (Object.prototype.toString.call(value) === '[object Object]');
    }
    //convert url to json 
    static urlToJson(url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        const pairs = url.split('&');
        const json = {};
        pairs.forEach(function (pair) {
            const parts = pair.split('=');
            if (parts[0] !== "")
                json[parts[0]] = decodeURIComponent(parts[1] || '');
        });
        return json;
    }
    //convert string to json array
    static strToArray(str) {
        return JSON.parse(str);
    }
    //find jarray
    //return array index
    static findIndex(rows, fid, value) {
        if (rows == null)
            return -1;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][fid] == value)
                return i;
        }
        //case of not found
        return -1;
    }
    //filter json array
    static filterRows(rows, fid, value) {
        if (rows == null || rows.length == 0)
            return null;
        return rows.filter(function (row) {
            return (row[fid] === value);
        });
    }
    //appendRows
    static appendRows(froms, tos) {
        if (froms == null || froms.length == 0)
            return;
        const len = tos.length;
        for (let i = 0; i < froms.length; i++) {
            tos[len + i] = froms[i];
        }
    }
    /**
     * (recursive) remove null for json object
     * param obj {json} by ref
     * param level {int} (default 0) debug purpose, base 0
     * return void
     */
    static removeNull(obj, level) {
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
                const len = value.length;
                if (len == 0) {
                    delete obj[key];
                    return; //continue
                }
                //case of string array
                if (!_Json.isKeyValue(value[0])) {
                    let isEmpty = true;
                    for (let i = 0; i < len; i++) {
                        if (_Str.notEmpty(value[i])) {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (isEmpty)
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
                let isEmpty = true;
                //from end
                for (let i = len - 1; i >= 0; i--) {
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
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Json.js.map