var _xp = {

    //middle variables
    temp: {},

    //initial application
    initApp: function () {
        //debugger;
        //_locale.getBaseR0(locale);
        _leftmenu.init();
        _pjax.init('.xu-body');
        _tool.init();
        moment.locale(_fun.locale);
    },
    
};//class