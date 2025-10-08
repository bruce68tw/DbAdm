var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 假設的依賴靜態類別
import _Var from "./_Var";
import _Fun from "./_Fun";
import _Jwt from "./_Jwt";
import _Str from "./_Str";
import _Tool from "./_Tool";
//import _BR from "./_BR";
// 假設 $ 來自 jQuery
//import $ from "jquery";
/**
 * jquery ajax call
 */
export default class _Ajax {
    /** * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|json}
     */
    static getJsonA(url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                //dataType: backend return type: xml, html, script, json, jsonp, text
                dataType: 'json', //return type: ContentType,JsonResult
                //processData: false
            };
            return yield _Ajax._rpcA(json, fnOk, block);
        });
    }
    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|json}
     */
    static getJsonByFdA(url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json', //return type, TODO: pending test
                cache: false,
                contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
                processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
            };
            return yield _Ajax._rpcA(json, fnOk, block);
        });
    }
    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|string}
     */
    static getStrA(url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                dataType: 'text', //backend return text(ContentResult with text)
            };
            return yield _Ajax._rpcA(json, fnOk, block);
        });
    }
    static getIntA(url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                dataType: 'text', //backend return text(ContentResult with text)
            };
            return yield _Ajax._rpcA(json, fnOk, block);
        });
    }
    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|string}
     */
    static getViewA(url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                dataType: 'html',
            };
            return yield _Ajax._rpcA(json, fnOk, block);
        });
    }
    /**
     * ajax return image file
     * return {boolean|File}
     */
    static getImageFileA(url, data, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {
                url: url,
                type: 'POST',
                data: data,
                dataType: 'html',
            };
            return yield _Ajax._rpcA(json, null, block);
        });
    }
    /**
     * ajax upload file (註解掉的部分)
     */
    /*
    static file(url: string, serverFid: string, fileObj: File, fnOk?: (result: any) => void, fnError?: (msg: string) => void) {
        const data = new FormData();  //for upload files if need
        data.append(serverFid, fileObj);
        const json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',       //server return text
            cache: false,
            contentType: false,     //false!! 傳入參數編碼方式, default為 "application/x-www-form-urlencoded"
            processData: false,     //false!! if true it will convert input data to string, then get error !!
        };
        _Ajax._rpcA(json, fnOk, block); // 這裡 block 的參數需要處理
    }
    */
    /**
     * ajax call(private), only return success info(include custom message)
     * 使用 async/await 傳回值 for caller 判斷執行結果是否成功
     * param json {any} ajax json
     * param fnOk {function} (optional) callback function
     * //param fnError {function} (optional) callback function
     * param block {boolean|object} block ui or not, default true
     * //如果要block modal, 必須傳入 modal object !!
     * return {boolean|json|any} ResultDto return null when error
     * boolean: fnOk not empty, return false when error
     * json/any: fnOk is empty, return null when error
     */
    static _rpcA(json, fnOk, block) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_Var.isEmpty(block))
                block = true;
            if (block)
                _Fun.block();
            //改用 async/await
            let status = false;
            let result = null;
            try {
                _Jwt.jsonAddJwtHeader(json);
                // 假設 $ 來自 jQuery
                result = yield $.ajax(json);
                const errMsg = _Ajax.resultToErrMsg(result);
                /*
                if (!errMsg && typeof result === 'string' && _Ajax._isBrError(result)) {
                    //case of string error
                    errMsg = _Ajax.strToErrMsg(result);
                }
                */
                //先判斷error msg
                if (_Str.notEmpty(errMsg)) {
                    result = null; //reset here !!
                    _Tool.msg(errMsg);
                }
                else if (result && result.ErrorRows && result.ErrorRows.length > 0) {
                    //有欄位驗證錯誤, //todo: 多筆區域是否顯示正確?
                    const errJson = {};
                    for (let i = 0; i < result.ErrorRows.length; i++) {
                        const row = result.ErrorRows[i];
                        // 假設 _me.edit0 存在且為 jQuery 物件或 DOM element
                        const edit = _Str.isEmpty(row.FormId) ? _me.edit0 : $(`#${row.FormId}`);
                        errJson[row.Fid] = row.Msg;
                        // 假設 edit.validator 存在 (來自 jQuery Validation plugin)
                        if (edit.validator) {
                            edit.validator.showErrors(errJson);
                        }
                    }
                    //todo: 考慮下載檔案
                }
                else if (fnOk) {
                    fnOk(result);
                    status = true;
                }
            }
            catch (error) {
                console.error(error);
            }
            if (block)
                _Fun.unBlock();
            return (fnOk == null) ? result : status;
        });
    }
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    static _isBrError(result) {
        // 假設 _Fun.PreBrError 存在
        return (result.length >= 2 && result.substring(0, 2) === _Fun.PreBrError);
    }
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    static resultToErrMsg(result) {
        // 假設 _Fun.FidErrorMsg 存在
        return (result[_Fun.FidErrorMsg])
            ? _Ajax.strToErrMsg(result[_Fun.FidErrorMsg])
            : '';
    }
    /**
     * result string to error msg if any
     */
    static strToErrMsg(str) {
        if (_Str.isEmpty(str))
            return '';
        if (!_Ajax._isBrError(str))
            return str;
        //case of BR error msg
        const fid = str.substring(2);
        // 假設 _BR[fid] 存在
        let br = _BR;
        return (br[fid])
            ? br[fid]
            : _Str.format('_ajax.strToErrMsg() failed, no BR Fid={0}', fid);
    }
}
//# sourceMappingURL=../../../map/_tsBase/services/_Ajax.js.map