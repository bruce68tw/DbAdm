"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Fun_1 = require("./_Fun");
var _Leftmenu_1 = require("./_Leftmenu");
var _Str_1 = require("./_Str");
// 假設這些是外部的列舉或常數類別/對象
// 並且它們將被轉換為大 camel case 命名
var EstrFun_1 = require("./EstrFun");
//import _Br from "./_Br";
//program, 包含 crud功能
var _Prog = /** @class */ (function () {
    function _Prog() {
    }
    _Prog.init = function () {
        _Prog.me = $('.x-prog-path');
        //_Prog.oriPath = _Prog.me.text();
        if (_Prog.me.text() === '') {
            //F5 重整時 _fun.data.progPath 為空
            if (_Str_1.default.isEmpty(_Fun_1.default.data.progPath)) {
                //從url找menu
                var nowUrl = window.location.pathname;
                var activeLink = $(".x-leftmenu [href=\"".concat(nowUrl, "\"]"));
                var menuPath = _Leftmenu_1.default.getMenuPath(activeLink);
                _Prog.storeProgPath(menuPath);
            }
            _Prog.oriPath = _Fun_1.default.data.progPath;
            _Prog.me.text(_Prog.oriPath);
        }
    };
    _Prog.storeProgPath = function (progPath) {
        _Fun_1.default.data.progPath = progPath;
    };
    //reset path to initial
    _Prog.resetPath = function () {
        if (_Prog.me) {
            _Prog.me.text(_Prog.oriPath);
        }
    };
    /**
     * set program path
     * param fun {string} fun mode (Assuming fun is a value from EstrFun)
     * param updName {string}
     */
    _Prog.setPath = function (fun, updName) {
        var name;
        if (fun === EstrFun_1.default.Create) {
            name = _BR.Create;
        }
        else if (fun === EstrFun_1.default.View) {
            name = _BR.View;
        }
        else if (fun !== EstrFun_1.default.Update) {
            name = '??';
        }
        else {
            name = _Str_1.default.isEmpty(updName) ? _BR.Update : updName;
        }
        _Prog.setFunName(name);
    };
    /**
     * set fun name
     * param name {string} fun name
     */
    _Prog.setFunName = function (name) {
        if (_Prog.me) {
            _Prog.me.text(_Prog.oriPath + '-' + name);
        }
    };
    //filter: '.x-prog-path',
    _Prog.me = null;
    _Prog.oriPath = ''; //original path
    return _Prog;
}());
exports.default = _Prog;
