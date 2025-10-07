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
    public static find(ary: Array<any> | null | undefined, id: number | string): number {
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
    public static toStr(ary: Array<any>, sep?: string): string {
        // 使用 const 宣告變數
        const separator = sep || ',';
        return ary.join(separator);
    }

    /**
     * check if array is null or empty
     * param ary {Array<any>}
     * return {boolean}
     */
    public static isEmpty(ary: Array<any> | null | undefined): boolean {
        return (ary == null || ary.length === 0);
    }
}