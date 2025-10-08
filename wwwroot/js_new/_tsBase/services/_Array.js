/**
 * array helper class
 */
export default class _Array {
    /**
     * find array
     * param ary {Array<any>}
     * param id {number|string} find value
     * return {number} -1(not found), n
     */
    static find(ary, id) {
        if (ary == null)
            return -1;
        // 使用 const 宣告迴圈變數 i
        for (let i = 0; i < ary.length; i++) {
            // 使用 == 進行比較，保持與原始 js 相同的行為
            if (ary[i] == id)
                return i;
        }
        return -1;
    }
    /**
     * convert array to string with seperator
     * param ary {Array<any>} source array
     * param sep {string} seperator, default to ','
     * retrun {string} ex: '1,2,3'
     */
    static toStr(ary, sep) {
        // 使用 const 宣告變數
        sep || (sep = ',');
        return ary.join(sep);
    }
    /**
     * check if array is null or empty
     * param ary {Array<any>}
     * return {boolean}
     */
    static isEmpty(ary) {
        return (ary == null || ary.length === 0);
    }
}
//# sourceMappingURL=../../../map/_tsBase/services/_Array.js.map