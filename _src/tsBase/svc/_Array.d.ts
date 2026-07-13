export default class _Array {
    /**
     * find array
     * @param ary {any[]} target array
     * @param id {number|string} find value
     * @returns {number} -1(not found), n
     */
    static find(ary: StrNum[] | null, id: StrNum): number;
    /**
     * convert array to string with separator
     * @param ary {any[]} source array
     * @param sep {string} separator, default to ','
     * @returns {string} ex: '1,2,3'
     */
    static toStr(ary: StrNum[], sep?: string): string;
    static isEmpty(ary?: any[]): boolean;
    static notEmpty(ary?: any[]): boolean;
}
