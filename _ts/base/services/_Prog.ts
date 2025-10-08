import _Fun from "./_Fun";
import _Leftmenu from "./_Leftmenu";
import _Str from "./_Str";

// 假設這些是外部的列舉或常數類別/對象
// 並且它們將被轉換為大 camel case 命名
import EstrFun from "./EstrFun";
//import _Br from "./_Br";

//program, 包含 crud功能
export default class _Prog {
    //filter: '.x-prog-path',
    private static me: JQuery<HTMLElement> | null = null;
    private static oriPath: string = '';    //original path

    static init(): void {
        _Prog.me = $('.x-prog-path');
        //_Prog.oriPath = _Prog.me.text();
        if (_Prog.me.text() === '') {
            //F5 重整時 _fun.data.progPath 為空
            if (_Str.isEmpty(_Fun.data.progPath)) {
                //從url找menu
                const nowUrl = window.location.pathname;
                const activeLink = $(`.x-leftmenu [href="${nowUrl}"]`);
                const menuPath = _Leftmenu.getMenuPath(activeLink);
                _Prog.storeProgPath(menuPath);
            }

            _Prog.oriPath = _Fun.data.progPath;
            _Prog.me.text(_Prog.oriPath);
        }
    }
    
    static storeProgPath(progPath: string): void {
        _Fun.data.progPath = progPath;
    }
    
    //reset path to initial
    static resetPath(): void {
        if (_Prog.me) {
            _Prog.me.text(_Prog.oriPath);
        }
    }

    /**
     * set program path
     * param fun {string} fun mode (Assuming fun is a value from EstrFun)
     * param updName {string}
     */
    static setPath(fun: string, updName: StrN = null): void {
        let name: string;
        if (fun === EstrFun.Create) {
            name = _BR.Create;
        } else if (fun === EstrFun.View) {
            name = _BR.View;
        } else if (fun !== EstrFun.Update) {
            name = '??';
        } else {
            name = _Str.isEmpty(updName) ? _BR.Update : updName!;
        }

        _Prog.setFunName(name);
    }

    /**
     * set fun name
     * param name {string} fun name
     */
    static setFunName(name: string): void {
        if (_Prog.me) {
            _Prog.me.text(_Prog.oriPath + '-' + name);
        }
    }
}