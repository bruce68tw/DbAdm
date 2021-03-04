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
    getJson: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            //dataType: backend return type: xml, html, script, json, jsonp, text
            dataType: 'json',   //JsonResult
            //processData: false
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return json by FormData, for upload file
     * param url {string}
     * param data {json}
     * param fnOk {function}
     * param fnError {function}
     * return {json}
     */
    getJsonByFormData: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            cache: false,
            data: data,
            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
            dataType: 'json',   //TODO: pending test
            processData: false, //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return string
     */ 
    getStr: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return html string
     * return html string
     */
    getView: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return image file
     * return html string
     */
    getImageFile: function (url, data) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json);
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
     * return {json} ResultDto
     */
    _call: function (json, fnOk, fnError) {
        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (data) {
                //data maps to ResultDto
                if (data && data.ErrorMsg) {
                    if (fnError == null)
                        _tool.msg(data.ErrorMsg);
                    else
                        fnError(data);
                } else if (fnOk) {
                    fnOk(data);
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr != null) {
                    console.log("status" + xhr.status);
                    console.log(thrownError);
                }
            },
            beforeSend: function () {
                _tool.showWait();
            },
            complete: function () {
                _tool.hideWait();
            },
        };

        $.ajax(_json.copy(json, config));
    },

};//class