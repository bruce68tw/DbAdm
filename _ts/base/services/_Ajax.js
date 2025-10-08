"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// 假設的依賴靜態類別
var _Var_1 = require("./_Var");
var _Fun_1 = require("./_Fun");
var _Str_1 = require("./_Str");
var _Tool_1 = require("./_Tool");
//import _BR from "./_BR";
// 假設 $ 來自 jQuery
//import $ from "jquery";
/**
 * jquery ajax call
 */
var _Ajax = /** @class */ (function () {
    function _Ajax() {
    }
    /** * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|json}
     */
    _Ajax.getJsonA = function (url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            //dataType: backend return type: xml, html, script, json, jsonp, text
                            dataType: 'json', //return type: ContentType,JsonResult
                            //processData: false
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, fnOk, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * ajax return json by FormData(Fd), for upload file
     * param url {string}
     * param data {FormData}
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|json}
     */
    _Ajax.getJsonByFdA = function (url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            dataType: 'json', //return type, TODO: pending test
                            cache: false,
                            contentType: false, //false!! input type, default 'application/x-www-form-urlencoded; charset=UTF-8'
                            processData: false, //false!! (jQuery only) if true it will convert input data to string, then get error !!
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, fnOk, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * ajax return string
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|string}
     */
    _Ajax.getStrA = function (url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            dataType: 'text', //backend return text(ContentResult with text)
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, fnOk, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    _Ajax.getIntA = function (url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            dataType: 'text', //backend return text(ContentResult with text)
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, fnOk, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * ajax return html string
     * param fnOk {function} (optional) callback function
     * param block {boolean} block ui or not, default true
     * return {boolean|string}
     */
    _Ajax.getViewA = function (url, data, fnOk, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            dataType: 'html',
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, fnOk, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * ajax return image file
     * return {boolean|File}
     */
    _Ajax.getImageFileA = function (url, data, block) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = {
                            url: url,
                            type: 'POST',
                            data: data,
                            dataType: 'html',
                        };
                        return [4 /*yield*/, _Ajax._rpcA(json, null, block)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
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
    _Ajax._rpcA = function (json_1) {
        return __awaiter(this, arguments, void 0, function (json, fnOk, block) {
            var status, result, errMsg, errJson, i, row, edit, error_1;
            if (fnOk === void 0) { fnOk = null; }
            if (block === void 0) { block = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (_Var_1.default.isEmpty(block))
                            block = true;
                        if (block)
                            _Fun_1.default.block();
                        status = false;
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, $.ajax(json)];
                    case 2:
                        //web不使用JWT
                        //_Jwt.jsonAddJwtHeader(json);
                        // 假設 $ 來自 jQuery
                        result = _a.sent();
                        errMsg = _Ajax.resultToErrMsg(result);
                        /*
                        if (!errMsg && typeof result === 'string' && _Ajax._isBrError(result)) {
                            //case of string error
                            errMsg = _Ajax.strToErrMsg(result);
                        }
                        */
                        //先判斷error msg
                        if (_Str_1.default.notEmpty(errMsg)) {
                            result = null; //reset here !!
                            _Tool_1.default.msg(errMsg);
                        }
                        else if (result && result.ErrorRows && result.ErrorRows.length > 0) {
                            errJson = {};
                            for (i = 0; i < result.ErrorRows.length; i++) {
                                row = result.ErrorRows[i];
                                edit = _Str_1.default.isEmpty(row.FormId) ? _me.edit0 : $("#".concat(row.FormId));
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
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (block)
                            _Fun_1.default.unBlock();
                        return [2 /*return*/, (fnOk == null) ? result : status];
                }
            });
        });
    };
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    _Ajax._isBrError = function (result) {
        // 假設 _Fun.PreBrError 存在
        return (result.length >= 2 && result.substring(0, 2) === _Fun_1.default.PreBrError);
    };
    /**
     * resultDto to error msg string
     * also called by Datatable.js
     * param result {ResultDto} error msg
     */
    _Ajax.resultToErrMsg = function (result) {
        // 假設 _Fun.FidErrorMsg 存在
        return (result[_Fun_1.default.FidErrorMsg])
            ? _Ajax.strToErrMsg(result[_Fun_1.default.FidErrorMsg])
            : '';
    };
    /**
     * result string to error msg if any
     */
    _Ajax.strToErrMsg = function (str) {
        if (_Str_1.default.isEmpty(str))
            return '';
        if (!_Ajax._isBrError(str))
            return str;
        //case of BR error msg
        var fid = str.substring(2);
        // 假設 _BR[fid] 存在
        var br = _BR;
        return (br[fid])
            ? br[fid]
            : _Str_1.default.format('_ajax.strToErrMsg() failed, no BR Fid={0}', fid);
    };
    return _Ajax;
}());
exports.default = _Ajax;
