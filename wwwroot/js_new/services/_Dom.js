//操作DOM元素
export default class _Dom {
    /**
     * 傳回字串, 不會自動轉型
     * @param elm DOM element
     * @param fid data field name
     * @returns data value string
     */
    static getData(elm, fid) {
        return elm.getAttribute("data-" + fid);
    }
    /**
     * 設定 data 屬性
     * @param elm DOM element
     * @param fid data field name
     * @param value data value to set
     */
    static setData(elm, fid, value) {
        elm.setAttribute("data-" + fid, value);
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/services/_Dom.js.map