//jquery ajax call
var _ajax = {

    /** 
     * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    getJsonA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            //dataType: backend return type: xml, html, script, json, jsonp, text
            dataType: 'json',   //return type: ContentType,JsonResult
            //processData: false
        };
        return await _ajax._callA(json, fnOk);
    },

    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json}
     */
    getJsonByFdA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type, TODO: pending test
            cache: false,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
        };
        return await _ajax._callA(json, fnOk, block);
    },

    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/string}
     */ 
    getStrA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        return await _ajax._callA(json, fnOk, block);
    },

    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/html string}
     */
    getViewA: async function (url, data, fnOk, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        return await _ajax._callA(json, fnOk, block);
    },

    /**
     * ajax return image file
     * return {bool/file}
     */
    getImageFileA: async function (url, data, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        return await _ajax._callA(json, null, block);
    },

    /**
     * ajax upload file
     * param url {string}
     * param serverFid {string} server side fid
     * param fileObj {file} file object
     * param fnOk {function}
     */
    /*
    file: function (url, serverFid, fileObj, fnOk, fnError) {
        var data = new FormData();  //for upload files if need 
        data.append(serverFid, fileObj);
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',       //server return text
            cache: false,
            contentType: false,     //false!! 傳入參數編碼方式, default為 "application/x-www-form-urlencoded"
            processData: false,     //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._callA(json, fnOk, fnError);
    },
    */

    /**
     * ajax call(private), only return success info(include custom message)
     * 使用 async/await 傳回值 for caller 判斷執行結果是否成功
     * param json {json} ajax json
     * param fnOk {function} (optional) callback function
     * param fnError {function} (optional) callback function
     * param block {bool} block ui or not, default true
     * return {bool/json/any} ResultDto return null when error
     *   bool: fnOk not empty, return false when error
     *   json/any: fnOk is empty, return null when error
     */
    _callA: async function (json, fnOk, block) {
        if (_var.isEmpty(block)) block = true;
        if (block) _fun.block();

        //改用 async/await
        var status = false;
        var result = null;
        try {
            _fun.jsonAddJwtHeader(json);
            result = await $.ajax(json);
            var errMsg = _ajax.resultToErrMsg(result);
            if (!errMsg && typeof result === 'string' && result.substring(0, 2) === _fun.PreBrError) {
                //case of string error
                errMsg = _ajax.strToErrMsg(result);
            }

            if (errMsg) {
                result = null;
                _tool.msg(errMsg);
            } else if (fnOk) {
                fnOk(result);
                status = true;
            }
        } catch (error) {
            console.error(error);
        }

        if (block) _fun.unBlock();
        return (fnOk == null) ? result : status;

        /*
        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (result) {
                //result maps to ResultDto/JObject
                //if (!result)
                //    return;

                var msg = _ajax.resultToErrMsg(result);
                if (msg) {
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(result);

                //case of getStr()
                } else if (typeof result === 'string' && result.substring(0, 2) === _fun.PreBrError) {
                    var msg = _ajax.strToErrMsg(result)
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(msg);

                } else if (fnOk) {
                    fnOk(result);
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr != null) {
                    console.log("status" + xhr.status);
                    console.log(thrownError);
                }
            },
            beforeSend: function () {
                //_tool.showWait();
                if (block)
                    _fun.block();
            },
            complete: function () {
                //_tool.hideWait();
                if (block)
                    _fun.unBlock();
            },
        };

        $.ajax(_json.copy(json, config));
        */
    },

    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */ 
    resultToErrMsg: function (result) {
        return (result.ErrorMsg)
            ? _ajax.strToErrMsg(result.ErrorMsg)
            : '';
    },

    /**
     * result string to error msg if any
     */ 
    strToErrMsg: function (str) {
        if (_str.isEmpty(str))
            return '';
        if (str.substring(0, 2) !== _fun.PreBrError)
            return str;

        var fid = str.substring(2);
        return (_BR[fid])
            ? _BR[fid]
            : _str.format('_ajax._callA() failed, no BR Fid={0}', fid);
    },

};//class