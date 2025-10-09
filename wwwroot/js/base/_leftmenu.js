
var _leftmenu = {

    init: function () {
        //set variables
        _leftmenu.menu = $('.x-leftmenu');
        //_leftmenu.box = _leftmenu.menu.parent();
        //_leftmenu.body = $('#_Body');
        //_leftmenu.setBoxWidth(true);
        //.css('width', _leftmenu.menu.data('max-width') + 'px');

        //click時, show/hide 下一個 element, 可省去在panel設定id的步驟
        //for left-menu
        $('.x-toggle').on('click', function (e) {
            e.preventDefault();

            var me = $(this);
            me.next().collapse('toggle');
            var arrow = me.find('.x-arrow');
            var clsName= 'x-open';
            if (arrow.hasClass(clsName))
                arrow.removeClass(clsName);
            else
                arrow.addClass(clsName);
        });
    },

    /*
    //set width for container of left menu
    setBoxWidth: function (isOpen) {
        var fid = isOpen ? 'max-width' : 'min-width';
        //_leftmenu.box.css('width', _leftmenu.menu.data(fid) + 'px');
    },
    */

    onToggleMenu: function () {
        _leftmenu.menu.toggleClass('x-close');
    },

    getMenuPath: function (me) {
        let menuName = me.text().trim();

        // 找父層文字
        let parents = [];
        me.parents('li').each(function () {
            let parentLink = $(this).children('.x-toggle');
            if (parentLink.length) {
                parents.unshift(parentLink.text().trim()); // 放到前面，形成正確順序
            }
        });

        // 組合麵包屑
        let fullPath = parents.concat(menuName).join(' > ');
        return fullPath;
    },

};