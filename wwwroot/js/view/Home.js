
var _me = {

    //初始化
    //add page on click
    init: function () {

        //把 html element 對應到 jquery object
        _me.eform = $('#eform');

        //show msg if any
        var msg = _text.get('Msg');
        if (!_str.isEmpty(msg))
            _tool.msg(msg);
    },

    onClickLogin: function () {
        //debugger;
        var fm = _me.eform;
        var userId = _text.get('UserId', fm);
        var pwd = _text.get('Pwd', fm);
        if (userId == '') {
            _tool.msg('請輸入帳號。')
            $('#UserId').focus();
            return;
        } else if (pwd == '') {
            _tool.msg('請輸入密碼。')
            $('#Pwd').focus();
            return;
        }

        _ajax.getJson('UserLogin', { id: userId, pwd: pwd }, function (data) {
            window.location = '../Home/Index';
        });

    },

}; //class

