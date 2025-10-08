// 假設的依賴靜態類別
import _Error from "./_Error";
/**
 * assertion helper class
 */
export default class _Assert {
    /**
     * Log an assertion message using _error.log
     * param msg {string} The message to log.
     */
    static echo(msg) {
        _Error.log('_assert.js ' + msg);
    }
    /**
     * Assert if a value is present in an array or object keys.
     * NOTE: Original implementation uses 'for...in' which iterates over keys/indices (strings)
     * and performs loose comparison (==).
     * * param value {any} The value to find.
     * param ary {Array<any> | { [key: string]: any }} The array or object keys to search in.
     * return {void} (The function asserts/logs on failure)
     */
    static inArray(value, ary) {
        let find = false;
        // 原始程式碼使用了 for...in, 這會遍歷物件的可列舉屬性 (key),
        // 如果 ary 是陣列，它會遍歷索引 (index) 且索引是 string 類型。
        for (const item in ary) {
            // 使用 == 保持與原始 js 相同的寬鬆比較行為
            if (item == value) {
                find = true;
                break;
            }
        }
        if (!find)
            _Assert.echo('inArray failed: ' + value);
    }
}
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Assert.js.map