//jquery ajax call
var _ajax = {

    /** 
     * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} success callback function
     * param fnError {function} failed callback function
     * return {json}
     */
    getJson: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            //dataType: backend return type: xml, html, script, json, jsonp, text
            dataType: 'json',   //return type: ContentType,JsonResult
            //processData: false
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getJson0: function (url, data, fnOk, fnError) {
        _ajax.getJson(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return json by FormData, for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function}
     * param fnError {function}
     * return {json}
     */
    getJsonByFormData: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //return type, TODO: pending test
            cache: false,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getJsonByFormData0: function (url, data, fnOk, fnError) {
        _ajax.getJsonByFormData(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return string
     */ 
    getStr: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getStr0: function (url, data, fnOk, fnError, block) {
        _ajax.getStr(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return html string
     * return html string
     */
    getView: function (url, data, fnOk, fnError, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, fnOk, fnError);
    },
    //no block UI
    getView0: function (url, data, fnOk, fnError, block) {
        _ajax.getView(url, data, fnOk, fnError, false);
    },

    /**
     * ajax return image file
     * return html string
     */
    getImageFile: function (url, data, block) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, null, null, block);
    },
    //no block UI
    getImageFile0: function (url, data) {
        _ajax.getImageFile(url, data, false);
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
        _ajax._call(json, fnOk, fnError);
    },
    */

    /**
     * ajax call(private), only return success info(include custom message)
     * param json {json} ajax json
     * param fnOk {function} callback function
     * param fnError {function} callback function
     * param block {bool} block ui or not, default true
     * return {json} ResultDto
     */
    _call: function (json, fnOk, fnError, block) {
        if (_var.isEmpty(block))
            block = true;

        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (result) {
                //result maps to ResultDto/JObject
                //if (!result)
                //    return;

                var msg = _ajax.resultToMsg(result);
                if (msg) {
                    if (fnError == null)
                        _tool.msg(msg);
                    else
                        fnError(result);

                //case of getStr()
                } else if (typeof result === 'string' && result.substring(0, 2) === _fun.PreBrError) {
                    var msg = _ajax.strToMsg(result)
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
    },

    //result to error msg
    //also called by Datatable.js
    resultToMsg: function (result) {
        return (result.ErrorMsg)
            ? _ajax.strToMsg(result.ErrorMsg)
            : '';
    },

    strToMsg: function (str) {
        if (_str.isEmpty(str))
            return '';
        if (str.substring(0, 2) !== _fun.PreBrError)
            return str;

        var fid = str.substring(2);
        return (_BR[fid])
            ? _BR[fid]
            : _str.format('_ajax._call() failed, no BR Fid={0}', fid);
    },

};//class