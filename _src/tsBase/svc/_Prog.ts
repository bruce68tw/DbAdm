import FunEstr from '../enum/FunEstr';
import _Fun from './_Fun';
import _Str from './_Str';
import _Leftmenu from './_Leftmenu';
import _Ajax from './_Ajax';

//program, 包含 crud功能
export default class _Prog {
    //filter: '.x-prog-path',
    static me: JQuery = null;       //prog path object
    static initPath: string = '';   //original path

    static init(): void {
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

    static setBorder(status: boolean): void {
        const prog = $('.x-prog');
        if (status)
            prog.removeClass(_Fun.CssFlag);
        else
            prog.addClass(_Fun.CssFlag);
    }

    //storeProgPath -> storePath
    static storePath(progPath: string): void {
        _Fun.data.progPath = progPath;
    }

    static getProgCode(): string {
        let cols: string[] = _Fun.data.progPath.split('//');
        return (cols.length > 1) ? cols[1] : '';
    }
    
    //reset path to initial
    static resetPath(): void {
        _Prog.me.text(_Prog.initPath);
    }

    /**
     * set program path
     * param fun {string} fun mode
     */
    static setPath(fun: string, updName?: string): void {
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
    static setFunName(name: string): void {
        _Prog.me.text(_Prog.initPath + '-' + name);
    }
}