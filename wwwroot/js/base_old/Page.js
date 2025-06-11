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
function Page(config) {

	//get from input parameters
	this.pager = config.pager;
	this.linker = config.linker;
	this.action = config.action;
	this.showMenu = config.showMenu || _var.notEmpty(config.pageRowList);
	this.pageRowList = config.pageRowList || [10,25,50,100];
	//this.onFind = config.onFind;
	//this.noRowMsg = noRowMsg || _BR.FindNone;

	//initial
	this._init = function(pageStr, onFind) {
		//has: pageNo, pageRows, filterRows
		this.pageArg = this._getPageArg(pageStr);
		var arg = this.pageArg;
		var pager = this.pager;
		if (arg.filterRows <= 0) {
			pager.hide();
			_tool.msg(_BR.FindNone);
			return;
		}

		/*
		//var count = this.pager.length == 0 ? 0 : parseInt(this.pager.data('count'));
		if (arg.filterRows <= arg.pageRows) {
			if (arg.filterRows == 0)
				pager.html('<div class="-info">' + noRowMsg + '</div>')
			//pager.hide();
			return;
		}
		*/

		//set rows menu if need
		var menu = '';
		if (this.showMenu) {
			//var tpl = "每頁顯示 _Menu @@筆, 第 _Start 至 _End 筆, 總共 _Total 筆";
			var cols = _BR.Page.split('@@');
			menu = cols[0].replace('_Menu', this._getMenuHtml());

			var start = (arg.pageNo - 1) * arg.pageRows + 1;
			var end = start + arg.pageRows - 1;
			var info = cols[1]
				.replace('_Start', start)
				.replace('_End', end <= arg.filterRows ? end : arg.filterRows)
				.replace('_Total', arg.filterRows);
			menu = _str.format(
				"<div class='xg-page-menu'>" +
					"<label>{0}<span>{1}</span></label>" +
				"</div>", menu, info);
		}

		//set html
		//pager.addClass('row');	//for layout
		pager.html(menu + "<div class='xg-page-btns'></div>");

		//register onchange event, this did not work inside !!
		pager.find('select').change(function () {
			onFind();
		});

		//initial simplePagin
		pager.find('.xg-page-btns').pagination({
			currentPage: arg.pageNo,
			itemsOnPage: arg.pageRows,
			items: arg.filterRows,
			//displayedPages: 3,
			//cssStyle: 'col-md-' + (this.showMenu ? '8' : '12'),	//for layout, will add into ul class(listStyle)
			//listStyle: 'pagination justify-content-' + (this.showMenu ? 'end' : 'center'),
			listStyle: 'pagination ' + (this.showMenu ? 'xg-has-menu' : 'xg-no-menu'),
			prevText: "<",
			nextText: ">",
			//prevText: "<i class='fas fa-chevron-left'></i>",
			//nextText: "<i class='fas fa-chevron-right'></i>",
			onPageClick: onFind,
		});

	};

	this._getMenuHtml = function () {
		var menu = "<select class='form-select' style='width:80px; display:inline-block'>";
		for (var i = 0; i < this.pageRowList.length; i++) {
			menu += _str.format("<option value='{0}'{1}>{0}</option>", this.pageRowList[i],
				this.pageArg.pageRows == this.pageRowList[i] ? ' selected' : '');
		}
		menu += "</select>";
		return menu;
	};

	//pageArg has 3 property: pageNo, pageRows, filterRows
	this._getPageArg = function (pageStr) {
		var json = JSON.parse(_html.decode(pageStr));
		if (json['pageNo'] == null)
			json['pageNo'] = 1;
		if (json['pageRows'] == null)
			json['pageRows'] = 0;
		if (json['filterRows'] == null)
			json['filterRows'] = -1;
		return json;
	};

	/**
	 * public method for find rows
	 * param url {string} action url
	 * param json {json} query json
	 * param page {int} page no
	 */
	this.find = function (json, page) {
		json = json || {};
		var arg = this.pageArg;
		if (_var.isEmpty(page)) {
			arg.pageNo = 1;
			arg.filterRows = -1;
			arg.pageRows = this.pager.find('select').val();
		} else {
			arg.pageNo = page;
		}

		var url = this.action +
			'?page=' + arg.pageNo +
			'&rows=' + arg.pageRows +
			'&filter=' + arg.filterRows;
		for (var key in json) {
			if (_str.notEmpty(json[key]))
				url += '&' + key + '=' + json[key];
		}

		var linker = this.linker;
		if (_obj.isExist(linker)) {
			linker.attr('href', url);
			linker.trigger('click');
		} else {
			window.location = url;
        }
	};

    //call last
    this._init(config.pageStr, config.onFind);

}//class