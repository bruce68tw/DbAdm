import FunEstr from '../enum/FunEstr';
import _Fun from './_Fun';
import _Str from './_Str';
import _Leftmenu from './_Leftmenu';
//program, 包含 crud功能
class _Prog {
    static init() {
        _Prog.me = $('.x-prog-path');
        //_Prog.initPath = _Prog.me.text();
        if (_Prog.me.text() == '') {
            //F5 重整時 _Fun.data.progPath 為空
            if (_Str.isEmpty(_Fun.data.progPath)) {
                //url menu -> prog path
                const nowUrl = window.location.pathname;
                const activeLink = $(`.x-leftmenu [href="${nowUrl}"]`);
                const menuPath = _Leftmenu.getMenuPath(activeLink);
                _Prog.storePath(menuPath);
            }
            _Prog.initPath = _Fun.data.progPath;
            _Prog.me.text(_Prog.initPath);
        }
    }
    static setBorder(status) {
        const prog = $('.x-prog');
        if (status)
            prog.removeClass(_Fun.CssFlag);
        else
            prog.addClass(_Fun.CssFlag);
    }
    //storeProgPath -> storePath
    static storePath(progPath) {
        _Fun.data.progPath = progPath;
    }
    //reset path to initial
    static resetPath() {
        _Prog.me.text(_Prog.initPath);
    }
    /**
     * set program path
     * param fun {string} fun mode
     */
    static setPath(fun, updName) {
        const name = (fun == FunEstr.Create) ? _BR.Create :
            (fun == FunEstr.View) ? _BR.View :
                (fun != FunEstr.Update) ? '??' :
                    _Str.isEmpty(updName) ? _BR.Update :
                        updName;
        _Prog.setFunName(name);
    }
    /**
     * set fun name
     * param name {string} fun name
     */
    static setFunName(name) {
        _Prog.me.text(_Prog.initPath + '-' + name);
    }
}
//filter: '.x-prog-path',
_Prog.me = null; //prog path object
_Prog.initPath = ''; //original path
export default _Prog;
