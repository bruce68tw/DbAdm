
//program, 包含 crud功能
var _prog = {
    //filter: '.x-prog-path',
    me: null,
    oriPath: '',    //original path

    init: function () {
        _prog.me = $('.x-prog-path');
        //_prog.oriPath = _prog.me.text();
        if (_prog.me.text() == '') {
            //F5 重整時 _fun.data.progPath 為空
            if (_str.isEmpty(_fun.data.progPath)) {
                //從url找menu
                let nowUrl = window.location.pathname;
                let activeLink = $(`.x-leftmenu [href="${nowUrl}"]`);
                var menuPath = _leftmenu.getMenuPath(activeLink);
                _prog.storeProgPath(menuPath);
            }

            _prog.oriPath = _fun.data.progPath;
            _prog.me.text(_prog.oriPath);
        }
    },
    
    storeProgPath: function (progPath) {
        _fun.data.progPath = progPath;
    },
    
    //reset path to initial
    resetPath: function () {
        _prog.me.text(_prog.oriPath);
    },

    /**
     * set program path
     * param fun {string} fun mode
     */
    setPath: function (fun, updName) {
        var name = (fun == FunEstr.Create) ? _BR.Create :
            (fun == FunEstr.View) ? _BR.View :
            (fun != FunEstr.Update) ? '??' :
            _str.isEmpty(updName) ? _BR.Update :
            updName;
        _prog.setFunName(name);
    },

    /**
     * set fun name
     * param name {string} fun name
     */
    setFunName: function (name) {
        _prog.me.text(_prog.oriPath + '-' + name);
    },
};