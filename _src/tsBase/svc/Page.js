import _Var from './_Var';
import _Obj from './_Obj';
import _Tool from './_Tool';
import _Str from './_Str';
import _Html from './_Html';
export default class Page {
    constructor(config) {
        this.pager = config.pager;
        this.linker = config.linker;
        this.action = config.action;
        this.showMenu = config.showMenu || _Var.notEmpty(config.pageRowList);
        this.pageRowList = config.pageRowList || [10, 25, 50, 100];
        this._init(config.pageStr, config.onFind);
    }
    _init(pageStr, onFind) {
        this.pageArg = this._getPageArg(pageStr);
        const arg = this.pageArg;
        const pager = this.pager;
        if (arg.filterRows <= 0) {
            _Obj.hide(pager);
            _Tool.msg(_BR.FindNone);
            return;
        }
        let menu = '';
        if (this.showMenu) {
            const cols = _BR.Page.split('@@');
            menu = cols[0].replace('_Menu', this._getMenuHtml());
            const start = (arg.pageNo - 1) * arg.pageRows + 1;
            const end = start + arg.pageRows - 1;
            const info = cols[1]
                .replace('_Start', start.toString())
                .replace('_End', (end <= arg.filterRows ? end : arg.filterRows).toString())
                .replace('_Total', arg.filterRows.toString());
            menu = _Str.format("<div class='x-page-menu'><label>{0}<span>{1}</span></label></div>", menu, info);
        }
        pager.html(menu + "<div class='x-page-btns'></div>");
        pager.find('select').on('change', () => {
            if (onFind)
                onFind();
        });
        pager.find('.x-page-btns').pagination({
            currentPage: arg.pageNo,
            itemsOnPage: arg.pageRows,
            items: arg.filterRows,
            listStyle: 'pagination ' + (this.showMenu ? 'x-has-menu' : 'x-no-menu'),
            prevText: "<",
            nextText: ">",
            onPageClick: onFind,
        });
    }
    _getMenuHtml() {
        let menu = "<select class='form-select x-inline x-w100'>";
        for (let i = 0; i < this.pageRowList.length; i++) {
            menu += _Str.format("<option value='{0}'{1}>{0}</option>", this.pageRowList[i], this.pageArg.pageRows == this.pageRowList[i] ? ' selected' : '');
        }
        menu += "</select>";
        return menu;
    }
    _getPageArg(pageStr) {
        var _a;
        const json = JSON.parse(_Html.decode(pageStr));
        return {
            pageNo: json['pageNo'] || 1,
            pageRows: json['pageRows'] || 0,
            filterRows: (_a = json['filterRows']) !== null && _a !== void 0 ? _a : -1
        };
    }
    find(json = {}, page) {
        const arg = this.pageArg;
        if (_Var.isEmpty(page)) {
            arg.pageNo = 1;
            arg.filterRows = -1;
            arg.pageRows = parseInt(this.pager.find('select').val());
        }
        else {
            arg.pageNo = page;
        }
        let url = this.action +
            '?page=' + arg.pageNo +
            '&rows=' + arg.pageRows +
            '&filter=' + arg.filterRows;
        for (const key in json) {
            if (_Str.notEmpty(json[key])) {
                url += '&' + key + '=' + json[key];
            }
        }
        if (_Obj.isEmpty(this.linker)) {
            window.location.href = url;
        }
        else {
            this.linker.attr('href', url);
            this.linker.trigger('click');
        }
    }
}
