
//jquery object
//同時用在輸入欄位和非輸入欄位(ex: button)
var _obj = {

    /**
     * get object by name for input field
     */
    get: function (val, box) {
        return _obj.getF('[data-fid=' + val + ']', box);
    },

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    getById: function (val, box) {
        return _obj.getF('#' + val, box);
    },

    /**
     * get object by filter string
     */
    getF: function (ft, box) {
        return box.find(ft);
    },

    /**
     * get object by name
     */
    getN: function (val, box) {
        return _obj.getF('[name=' + val + ']', box);
    },

    /**
     * get object by data-id
     */
    getD: function (val, box) {
        return _obj.getF('[data-id=' + val + ']', box);
    },

    /**
     * get object by value
     */
    getV: function (val, box) {
        return _obj.getF('[value=' + val + ']', box);
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
     */
    getDid: function (obj) {
        return (obj.length > 0) ? obj.data('id') : '';
    },

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