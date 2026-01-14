
//group text
var _group = {

    toggle: function() {
        //$(this).next().toggle();            // 簡單切換 show/hide
        _fun.getMe(true).parent('.x-group').next().slideToggle();    // 如果想要動畫，用這行
    },

}; //class