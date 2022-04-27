
//jquery object
//同時用在輸入欄位和非輸入欄位(ex: button)
var _obj = {

    /**
     * get object by name for input field
     */
    get: function (fid, box) {
        return _obj.getF(_fun.fidFilter(fid), box);
    },

    /**
     * get object by filter string
     */
    getF: function (ft, box) {
        var obj = box.find(ft);
        if (obj.length == 0) {
            //_log.info('_obj.js getF() found none. (filter=' + ft + ')');
            return null;
        } else {
            return obj;
        }
    },

    /**
     * get object by name
     */
    getN: function (name, box) {
        return _obj.getF('[name=' + name + ']', box);
    },

    /**
     * get object by data-id
    getD: function (val, box) {
        return _obj.getF('[data-id=' + val + ']', box);
    },
     */

    /**
     * get object by value
     */
    getV: function (val, box) {
        return _obj.getF('[value=' + val + ']', box);
    },

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    getById: function (id, box) {
        return _obj.getF('#' + id, box);
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
    isExist: function (obj) {
        return (obj !== undefined && obj !== null && obj.length > 0);
    },

    /**
     * check object has attribute or not
     * return boolean
     */
    hasAttr: function (obj) {
        return obj.attr(attr);
    },

}; //class