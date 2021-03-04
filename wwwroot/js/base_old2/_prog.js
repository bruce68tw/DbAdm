
//program, 包含 crud功能
var _prog = {
    //filter: '.xg-prog-path',
    me: null,
    oriPath: '',    //original path

    init: function () {
        _prog.me = $('.xg-prog-path');
        _prog.oriPath = _prog.me.text();
    },

    //reset path to initial
    resetPath: function () {
        _prog.me.text(_prog.oriPath);
    },

    /**
     * set program path
     * param fun {string} fun mode
     */
    setPath: function (fun) {
        var name = (fun == _fun.FunC) ? _BR.Create :
            (fun == _fun.FunU) ? _BR.Update :
            (fun == _fun.FunV) ? _BR.View :
            '??';
        _prog.me.text(_prog.oriPath + '-' + name);
    },

};