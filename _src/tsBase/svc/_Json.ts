import _Var from './_Var';
import _Str from './_Str';

export default class _Json {

    /**
     * add json object into another object
     * param {object} source source object
     * param {object} target target object
     * return {object}
     */
    /*
    static addJson(source: Record<string, any>, target?: Record<string, any>): Record<string, any> {
        if (!target)
            target = {};
        Object.keys(source).map(function (key, index) {
            target[key] = source[key];
        });
        return target;
    }
    */

    /**
     * 轉換一筆json為多筆資料, 用於產生統計圖
     * param from {json}
     * param to {json}
     * return {json} new json data
     */
    static toChartRows(json: Record<string, any>, cols: string[]): Array<{ Id: string; Num: any }> {
        const rows: Array<{ Id: string; Num: any }> = [];
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
    static copy(from: Record<string, any>, to?: Record<string, any>): Record<string, any> {
        const target = to || {};
        for (const key in from) {
            target[key] = from[key];
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
    static keyValuesToJson(keyValues: Record<string, any>[] | null, keyId?: string, valueId?: string): Record<string, any> | null {
        if (keyValues === null || keyValues.length === 0)
            return null;

        const actualKeyId = keyId || 'Key';
        const actualValueId = valueId || 'Value';
        const data: Record<string, any> = {};
        for (let i = 0; i < keyValues.length; i++) {
            const row = keyValues[i];
            data['f' + row[actualKeyId]] = row[actualValueId];
        }
        return data;
    }

    //json: object or object array
    static toStr(json: any): string {
        return _Json.isEmpty(json) ? '' : JSON.stringify(json);
    }

    static isEmpty(json: any): boolean {
        return json == null || $.isEmptyObject(json);
    }

    static notEmpty(json: any): boolean {
        return !_Json.isEmpty(json);
    }

    static fidIsEmpty(json: any, fid: string): boolean {
        return _Json.isEmpty(json)
            ? true
            : _Var.isEmpty(json[fid]);
    }
    
    static fidNotEmpty(json: any, fid: string): boolean {
        return !_Json.fidIsEmpty(json, fid);
    }

    //check is key-value pair
    static isKeyValue(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    //convert url to json 
    static urlToJson(url: string): Record<string, string> {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        const pairs = url.split('&');
        const json: Record<string, string> = {};
        pairs.forEach(function (pairStr) {
            const pair = pairStr.split('=');
            if (pair[0] !== "")
                json[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return json;
    }

    //convert string to json array
    static strToArray(str: string): any {
        return JSON.parse(str);
    }

    //find jarray
    //return array index
    static findIndex(rows: Record<string, any>[] | null, fid: string, value: any): number {
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
    static filterRows(rows: Record<string, any>[] | null, fid: string, value: any): Record<string, any>[] | null {
        if (rows == null || rows.length == 0)
            return null;

        return rows.filter(function (row) {
            return row[fid] === value;
        });
    }

    //appendRows
    static appendRows(froms: any[] | null, tos: any[]): void {
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
    static removeNull(obj: any, level?: number): void {
        //debugger;
        const currentLevel = level || 0;
        $.each(obj, function (key: string, value: any) {
            if (value === null) {
                //delete only null, empty is not !!
                delete obj[key];
            } else if (_Json.isKeyValue(value)) {
                _Json.removeNull(value, currentLevel + 1);
            } else if (Array.isArray(value)) {
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
                $.each(value, function (k2: any, v2: any) {
                    _Json.removeNull(v2, currentLevel + 1);

                    if (_Json.isEmpty(v2))
                        value[k2] = null;
                });

                //check json and remove if need
                let isEmpty = true;
                //from end
                for (let i = len - 1; i >= 0; i--) {
                    if (!_Json.isEmpty(value[i])) {
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

        if (_Json.isEmpty(obj)) {
            // Note: assigned to parameter reference, won't affect original root variable, but mimics original JS design
            obj = null;
        }
    }

}