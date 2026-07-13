//import "bootstrap";

export default class _Leftmenu {
    static menu: any;

    static init(): void {
        //set variables
        _Leftmenu.menu = $('.x-leftmenu');
        //_Leftmenu.box = _Leftmenu.menu.parent();
        //_Leftmenu.body = $('#_Body');
        //_Leftmenu.setBoxWidth(true);
        //.css('width', _Leftmenu.menu.data('max-width') + 'px');

        //click時, show/hide 下一個 element, 可省去在panel設定id的步驟
        //for left-menu
        $('.x-toggle').on('click', function (this: any, e: any) {
            e.preventDefault();

            const me = $(this);
            me.next().collapse('toggle');
            const arrow = me.find('.x-arrow');
            const clsName = 'x-open';
            if (arrow.hasClass(clsName)) {
                arrow.removeClass(clsName);
            } else {
                arrow.addClass(clsName);
            }
        });
    }

    /*
    //set width for container of left menu
    static setBoxWidth(isOpen: boolean): void {
        var fid = isOpen ? 'max-width' : 'min-width';
        //_Leftmenu.box.css('width', _Leftmenu.menu.data(fid) + 'px');
    }
    */

    static onToggleMenu(): void {
        _Leftmenu.menu.toggleClass('x-close');
    }

    static getMenuPath(me: any): string {
        const menuName = me.text().trim();

        // 找父層文字
        const parents: string[] = [];
        me.parents('li').each(function (this: any) {
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