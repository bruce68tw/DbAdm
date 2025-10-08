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
var _Ajax_1 = require("./_Ajax");
var _Leftmenu_1 = require("./_Leftmenu");
var _Obj_1 = require("./_Obj");
var _Pjax_1 = require("./_Pjax");
var _Tool_1 = require("./_Tool");
//FormData
var _Fun = /** @class */ (function () {
    function _Fun() {
    }
    /**
     * initial
     * param {string} locale
     * param {string} pjaxArea Filter
     */
    _Fun.init = function (locale) {
        //set jwt token
        //_fun.jwtToken = localStorage.getItem('_jwtToken') || '';
        //localStorage.removeItem('_jwtToken');
        _Fun.locale = locale;
        //initial
        _Leftmenu_1.default.init();
        _Pjax_1.default.init('.x-main-right');
        _Tool_1.default.init();
        // @ts-ignore: moment is globally available
        moment.locale(_Fun.locale);
        //註冊事件, 避免使用inline script for CSRF
        var body = $('body');
        _Fun.setEvent(body, 'click'); //eventName 不含 on
        _Fun.setEvent(body, 'change');
        //資安: 防止CSRF
        $.ajaxSetup({
            headers: {
                'RequestVerificationToken': $('meta[name="csrf-token"]').attr('content')
            }
        });
    };
    //server need Fun/Hello()
    //no called
    _Fun.onHelloA = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _Ajax_1.default.getStrA('../Fun/Hello', null, function (msg) {
                            alert(msg);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //get 目前event this
    //param {bool} isObj: true(jQuery object)
    _Fun.getObj = function () {
        return $(_Fun.nowElm);
    };
    _Fun.getElm = function () {
        return _Fun.nowElm;
    };
    /**
     * 註冊事件, 避免使用inline script for CSRF
     * param {object} box 容器
     * param {string} event name(不含on)
     */
    _Fun.setEvent = function (box, eventName) {
        //eventName ||= 'onclick'; //default event name
        var event2 = 'on' + eventName;
        box.on(eventName, "[data-".concat(event2, "]"), function () {
            //set global
            _Fun.nowElm = this;
            var me = $(this);
            var fnPath = me.data(event2); // "_me.crudR.onAddRow"
            var argsStr = me.data("args");
            argsStr = (argsStr == null) ? "" : argsStr.toString(); //數字必須轉字串, 否則split error
            var args = argsStr ? argsStr.split(",") : [];
            //在解析 fnPath 時，不要直接拿到方法後執行，而是保留父物件
            var parts = fnPath.split(".");
            var obj = window;
            for (var i = 0; i < parts.length - 1; i++) {
                obj = obj[parts[i]];
            }
            var fnName = parts[parts.length - 1];
            var fn = obj[fnName];
            if (typeof fn === "function") {
                fn.apply(obj, args); // <-- 用 obj 當 this
            }
            else {
                console.warn("Function ".concat(fnPath, " not found"));
            }
        });
    };
    /**
     * get default value if need
     * param val {object} checked value
     * param defVal {object} default value to return if need
     */
    _Fun.default = function (val, defVal) {
        return (val == null) ? defVal : val;
    };
    _Fun.hasValue = function (obj) {
        //can not obj != null !!
        return !(obj == null);
    };
    //on change locale, 後端必須實作 Fun/SetLocale()
    //no called
    _Fun.onSetLocaleA = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _Ajax_1.default.getStrA('../Fun/SetLocale', { code: code }, function (msg) {
                            //_browser.setLang(lang);
                            location.reload();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //for CSP, 不使用 jQuery.blockUI(), 會有inline style 衝突!!
    _Fun.block = function () {
        _Obj_1.default.show(_Tool_1.default.work);
    };
    _Fun.unBlock = function () {
        _Obj_1.default.hide(_Tool_1.default.work);
    };
    //#region constant (big camel) ===
    //for moment.js, match to _Fun.cs CsDtFmt
    _Fun.MmDateFmt = 'YYYY/MM/DD';
    _Fun.MmDtFmt = 'YYYY/MM/DD HH:mm:ss';
    _Fun.FidErrorMsg = '_ErrorMsg';
    //input field error validation, need match server side _Web.cs
    //jsPath: '../Scripts/',      //js path for load
    //error BR code, same to _Fun.PreBrError, fixed len to 2
    _Fun.PreBrError = 'B:';
    //class name of hide RWD phone
    _Fun.HideRwd = 'x-hide-rwd';
    //#endregion
    //variables
    _Fun.locale = 'zh-TW'; //now locale, _Layout.cshmlt will set
    _Fun.maxFileSize = 50971520; //upload file limit(50M)
    _Fun.isRwd = false;
    _Fun.pageRows = 10; //must be 10,20(not 25),50,100    
    _Fun.userId = ''; //now userId
    _Fun.nowElm = null; //now dom event element
    //mid variables
    _Fun.data = {};
    //datatables column define default values
    _Fun.dtColDef = {
        className: 'x-center',
        orderable: false,
        targets: '_all',
    };
    return _Fun;
}());
exports.default = _Fun;
; //class
