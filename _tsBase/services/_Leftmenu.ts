export default class _Leftmenu {

    private static menu: JQuery;
    //private static box: JQuery;
    //private static body: JQuery;

    static init(): void {
        //set variables
        _Leftmenu.menu = $('.x-leftmenu');
        //_Leftmenu.box = _Leftmenu.menu.parent();
        //_Leftmenu.body = $('#_Body');
        //_Leftmenu.setBoxWidth(true);
        //.css('width', _Leftmenu.menu.data('max-width') + 'px');

        //click時, show/hide 下一個 element, 可省去在panel設定id的步驟
        //for left-menu
        $('.x-toggle').on('click', function (e) {
            e.preventDefault();

            const me = $(this);
            me.next().collapse('toggle');
            const arrow = me.find('.x-arrow');
            const clsName = 'x-open';
            if (arrow.hasClass(clsName))
                arrow.removeClass(clsName);
            else
                arrow.addClass(clsName);
        });
    }

    /*
    //set width for container of left menu
    static setBoxWidth(isOpen: boolean): void {
        const fid = isOpen ? 'max-width' : 'min-width';
        //_Leftmenu.box.css('width', _Leftmenu.menu.data(fid) + 'px');
    },
    */

    static onToggleMenu(): void {
        _Leftmenu.menu.toggleClass('x-close');
    }

    static getMenuPath(me: JQuery): string {
        const menuName = me.text().trim();

        // 找父層文字
        const parents: string[] = [];
        me.parents('li').each(function () {
            const parentLink = $(this).children('.x-toggle');
            if (parentLink.length) {
                parents.unshift(parentLink.text().trim()); // 放到前面，形成正確順序
            }
        });

        // 組合麵包屑
        const fullPath = parents.concat(menuName).join(' > ');
        return fullPath;
    }

}