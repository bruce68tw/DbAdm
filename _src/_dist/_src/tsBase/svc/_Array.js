export default class _Array {
    /**
     * find array
     * @param ary {any[]} target array
     * @param id {number|string} find value
     * @returns {number} -1(not found), n
     */
    static find(ary, id) {
        if (ary == null)
            return -1;
        for (let i = 0; i < ary.length; i++) {
            if (ary[i] == id)
                return i;
        }
        return -1;
    }
    /**
     * convert array to string with separator
     * @param ary {any[]} source array
     * @param sep {string} separator, default to ','
     * @returns {string} ex: '1,2,3'
     */
    static toStr(ary, sep = ",") {
        return ary.join(sep);
    }
    static isEmpty(ary) {
        return (ary == null || ary.length == 0);
    }
    static notEmpty(ary) {
        return !_Array.isEmpty(ary);
    }
}
