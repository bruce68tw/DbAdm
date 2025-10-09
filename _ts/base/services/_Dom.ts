//操作DOM元素
export default class _Dom {

    /**
     * 傳回字串, 不會自動轉型
     * @param elm DOM element
     * @param fid data field name
     * @returns data value string
     */
    static getData(elm: Element, fid: string): StrN {
        return elm.getAttribute("data-" + fid);
    }

    /**
     * 設定 data 屬性
     * @param elm DOM element
     * @param fid data field name
     * @param value data value to set
     */
    static setData(elm: Element, fid: string, value: string): void {
        elm.setAttribute("data-" + fid, value);
    }

} //class