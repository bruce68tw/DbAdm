
//program, 包含 crud功能
var _prog = {
    //filter: '.x-prog-path',
    me: null,       //prog path object
    initPath: '',   //original path

    init: function () {
        _prog.me = $('.x-prog-path');
        //_prog.initPath = _prog.me.text();
        if (_prog.me.text() == '') {
            //F5 重整時 _fun.data.progPath 為空
            if (_str.isEmpty(_fun.data.progPath)) {
                //url menu -> prog path
                let nowUrl = window.location.pathname;
                let activeLink = $(`.x-leftmenu [href="${nowUrl}"]`);
                var menuPath = _leftmenu.getMenuPath(activeLink);
                _prog.storePath(menuPath);
            }

            _prog.initPath = _fun.data.progPath;
            _prog.me.text(_prog.initPath);
        }
    },

    setBorder: function (status) {
        var prog = $('.x-prog');
        if (status)
            prog.removeClass(_fun.CssFlag);
        else
            prog.addClass(_fun.CssFlag);
    },

    //storeProgPath -> storePath
    storePath: function (progPath) {
        _fun.data.progPath = progPath;
    },
    
    //reset path to initial
    resetPath: function () {
        _prog.me.text(_prog.initPath);
    },

    /**
     * set program path
     * param fun {string} fun mode
     */
    setPath: function (fun, updName) {
        var name = (fun == EstrFun.Create) ? _BR.Create :
            (fun == EstrFun.View) ? _BR.View :
            (fun != EstrFun.Update) ? '??' :
            _str.isEmpty(updName) ? _BR.Update :
            updName;
        _prog.setFunName(name);
    },

    /**
     * set fun name
     * param name {string} fun name
     */
    setFunName: function (name) {
        _prog.me.text(_prog.initPath + '-' + name);
    },
};