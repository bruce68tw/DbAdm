
//操作DOM元素
var _dom = {

    //傳回字串, 不會自動轉型
    getData: function (elm, fid) {
        return elm.getAttribute("data-" + fid);
    },

    setData: function (elm, fid, value) {
        elm.setAttribute("data-" + fid, value);
    },

};//class