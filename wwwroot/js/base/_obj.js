
//jquery object
//同時用在輸入欄位和非輸入欄位(ex: button)
var _obj = {

    /**
     * get object by name for input field
     */
    get: function (fid, box) {
        return _obj.getByFt(_input.fidFilter(fid), box);
    },

    /**
     * getF -> getByFt
     * get object by filter string
     */
    getByFt: function (ft, box) {
        var obj = box.find(ft);
        if (obj.length == 0) {
            //_log.info('_obj.js getF() found none. (filter=' + ft + ')');
            return null;
        } else {
            return obj;
        }
    },

    /**
     * getN -> getByName
     * get object by name
     */
    /*
    getByName: function (name, box) {
        return _obj.getByFt('[name=' + name + ']', box);
    },
    */

    /**
     * get object by data-id
    getD: function (val, box) {
        return _obj.getByFt('[data-id=' + val + ']', box);
    },
     */

    /**
     * getV -> getByVal
     * get object by value
     */
    /*
    getByVal: function (val, box) {
        return _obj.getByFt('[value=' + val + ']', box);
    },
    */

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    getById: function (id, box) {
        return _obj.getByFt('#' + id, box);
    },

    //以下function都傳入object
    /**
     * get id of object
     */
    getId: function (obj) {
        return (obj.length > 0) ? obj.attr('id') : '';
    },

    /**
     * get name of object
     */
    getName: function (obj) {
        return (obj.length > 0) ? obj.attr('name') : '';
    },

    /**
     * get data-id of object
    getDid: function (obj) {
        return (obj.length > 0) ? obj.data('id') : '';
    },
     */

    /**
     * check object is visible or not
     */
    isShow: function (obj) {
        return obj.is(':visible');
    },

    /**
     * check object existed or not
     */
    isEmpty: function (obj) {
        return (obj == null || obj.length == 0);
    },

    /**
     * isExist -> notEmpty
     * check object existed or not
     */
    notEmpty: function (obj) {
        return !_obj.isEmpty(obj);
    },

    /**
     * check object has attribute or not
     * return boolean
     */
    hasAttr: function (obj) {
        return obj.attr(attr);
    },

    //如果使用show()/hide()會動態寫入 inline style, 造成CSRF !!
    show: function (obj) {
        obj.removeClass('d-none');
    },
    hide: function (obj) {
        obj.addClass('d-none');
    },

    //status可能傳入文字!!
    showByStatus: function (obj, status) {
        if (_var.toBool(status))
            _obj.show(obj);
        else
            _obj.hide(obj);
    },

    getData: function (obj, fid) {
        //return obj.data(fid); //傳回json
        return obj.attr('data-' + fid); //傳回字串!!
    },

    /**
     * jquery data() 只寫入 jquery 暫存, 不寫入 DOM !!
     * param {object} obj
     * param {string} fid
     * param {string} value
     */
    setData: function (obj, fid, value) {
        obj.attr('data-' + fid, value);
    },

    //傳回小寫tagName
    tagName: function (obj) {
        return obj[0].tagName.toLowerCase();
    },

    //rename css class
    renameCss: function (obj, oldCss, newCss) {
        obj.removeClass(oldCss).addClass(newCss);
    }
}; //class