
var _json = {

    /**
     add json object into another object
     param {object} source source object
     param {object} target target object
     return {object}
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
     * (by AI) 
     * 將扁平 rows 陣列 轉換成 樹狀結構 jsons, 規則:
     *   1.rows 事先以 BoxId, ChildNo, Sort 排序
     *   2.rows 元素包含欄位: Id(資料Id)、BoxId(上層Id)、ChildNo(在上層的子代序號)、Childs2(子代2維陣列)
     * param {json array} rows
     * return {json array} nested json array
     */
    rowsToJsons: function (rows) {
        if (!rows || rows.length === 0) return [];

        // 依 BoxId 分組
        const boxMap = new Map();
        for (const row of rows) {
            const boxId = row.BoxId;
            if (!boxMap.has(boxId)) boxMap.set(boxId, []);
            boxMap.get(boxId).push(row);
        }

        // 遞迴建立 Childs2（二維陣列）
        function buildTree(boxId) {
            const childs = boxMap.get(boxId);
            if (!childs) return null;

            // 以 ChildNo 分群
            const items2 = [];
            for (const child of childs) {
                const idx = parseInt(child.ChildNo);
                if (!items2[idx])
                    items2[idx] = [];
                items2[idx].push(child);
            }

            // 遞迴建立每個 node 的 Childs2
            for (const items of items2) {
                for (const item of items) {
                    const sub = buildTree(item.Id);
                    if (sub && sub.length > 0)
                        item.Childs2 = sub;
                }
            }

            // 移除空群組
            return (boxId == '0')
                ? items2[0]
                : items2.filter(g => g && g.length > 0);
        }

        // 根節點是 BoxId = '0'，理論上應該只有一個根節點
        return buildTree('0') || [];
    },


    /**
     * (by AI) jsons(tree) to rows(陣列)
     * 固定的相關欄位: Id(資料Id)、BoxId(上層Id)、ChildNo, Childs2(子代2維陣列)
     * param {json array} jsons nested json array
     * return {json array} json array
     */
    jsonsToRows: function (jsons) {
        const rows = [];

        function flatten(items, parentId) {
            for (const item of items) {
                const { ChildNo, ...row } = item;
                row.BoxId = parentId;
                rows.push(row);

                // 若存在子層群組欄位
                if (ChildNo && Array.isArray(item[ChildNo]) && item[ChildNo].length > 0) {
                    flatten(item[ChildNo], row.Id);
                }
            }
        }

        flatten(jsons, '0');
        return rows;
    },

    /**
     * 轉換一筆json為多筆資料, 用於產生統計圖
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    toChartRows: function (json, cols) {
        var rows = [];
        for (var i = 0; i < cols.length; i++) {
            var fid = cols[i];
            rows.push({ Id: fid, Num:json[fid]});
        }
        return rows;
    },

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

    notEmpty: function (json) {
        return !_json.isEmpty(json);
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
        return JSON.parse(str);
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
            } else if (Array.isArray(value)) {
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