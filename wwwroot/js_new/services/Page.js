import _BR from "./_BR";
import _Html from "./_Html";
import _Obj from "./_Obj";
import _Str from "./_Str";
import _Tool from "./_Tool";
import _Var from "./_Var";
/**
 * pagin component, config has properties:
 * pageStr {string} json string from backend(pageNo,pageRows,filterRows)
 * pager {object} jquery page object
 * linker {object} (optional) link object, if empty
 * action {string} action url
 * showMenu {bool} (default false) show page menu or not(select page rows)
 * pageRowList {array} (default [10,25,50,100]) page menu item list
 * onFind {function} (optional) callback for get input json
 * return {Page}
 */
export default class Page {
    constructor(config) {
        //get from input parameters
        this.pager = config.pager;
        this.linker = config.linker;
        this.action = config.action;
        this.showMenu = config.showMenu || _Var.notEmpty(config.pageRowList);
        this.pageRowList = config.pageRowList || [10, 25, 50, 100];
        //this.onFind = config.onFind;
        //this.noRowMsg = noRowMsg || _BR.FindNone;
        //call last
        this._init(config.pageStr, config.onFind);
    }
    //initial
    _init(pageStr, onFind) {
        //has: pageNo, pageRows, filterRows
        this.pageArg = this._getPageArg(pageStr);
        const arg = this.pageArg;
        const pager = this.pager;
        if (arg.filterRows <= 0) {
            _Obj.hide(pager);
            _Tool.msg(_BR.FindNone);
            return;
        }
        /*
        //const count = this.pager.length == 0 ? 0 : parseInt(this.pager.data('count'));
        if (arg.filterRows <= arg.pageRows) {
            if (arg.filterRows == 0)
                pager.html('<div class="-info">' + noRowMsg + '</div>')
            //pager.hide();
            return;
        }
        */
        //set rows menu if need
        let menu = '';
        if (this.showMenu) {
            //const tpl = "每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆";
            const cols = _BR.Page.split('@@');
            menu = cols[0].replace('_Menu', this._getMenuHtml());
            const start = (arg.pageNo - 1) * arg.pageRows + 1;
            const end = start + arg.pageRows - 1;
            const info = cols[1]
                .replace('_Start', start)
                .replace('_End', end <= arg.filterRows ? end : arg.filterRows)
                .replace('_Total', arg.filterRows);
            menu = _Str.format("<div class='x-page-menu'>" +
                "<label>{0}<span>{1}</span></label>" +
                "</div>", menu, info);
        }
        //set html
        //pager.addClass('row');	//for layout
        pager.html(menu + "<div class='x-page-btns'></div>");
        //register onchange event, this did not work inside !!
        pager.find('select').change(function () {
            onFind();
        });
        //initial simplePagin
        pager.find('.x-page-btns').pagination({
            currentPage: arg.pageNo,
            itemsOnPage: arg.pageRows,
            items: arg.filterRows,
            //displayedPages: 3,
            listStyle: 'pagination ' + (this.showMenu ? 'x-has-menu' : 'x-no-menu'),
            prevText: "<",
            nextText: ">",
            //prevText: "<i class='fas fa-chevron-left'></i>",
            //nextText: "<i class='fas fa-chevron-right'></i>",
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
    //pageArg has 3 property: pageNo, pageRows, filterRows
    _getPageArg(pageStr) {
        const json = JSON.parse(_Html.decode(pageStr));
        if (json['pageNo'] == null)
            json['pageNo'] = 1;
        if (json['pageRows'] == null)
            json['pageRows'] = 0;
        if (json['filterRows'] == null)
            json['filterRows'] = -1;
        return json;
    }
    /**
     * public method for find rows
     * param url {string} action url
     * param json {json} query json
     * param page {int} page no
     */
    find(json, page) {
        json = json || {};
        const arg = this.pageArg;
        if (_Var.isEmpty(page)) {
            arg.pageNo = 1;
            arg.filterRows = -1;
            arg.pageRows = this.pager.find('select').val();
        }
        else {
            arg.pageNo = page;
        }
        let url = this.action +
            '?page=' + arg.pageNo +
            '&rows=' + arg.pageRows +
            '&filter=' + arg.filterRows;
        for (const key in json) {
            if (_Str.notEmpty(json[key]))
                url += '&' + key + '=' + json[key];
        }
        const linker = this.linker;
        if (_Obj.isEmpty(linker)) {
            window.location.href = url;
        }
        else {
            linker.attr('href', url);
            linker.trigger('click');
        }
    }
}
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/Page.js.map