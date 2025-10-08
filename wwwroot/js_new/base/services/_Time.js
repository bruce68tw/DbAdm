export default class _Time {
    /**
     * An asynchronous function that pauses execution for a specified number of milliseconds.
     * @param ms {number} Milliseconds to sleep.
     * @returns {Promise<void>}
     */
    static async sleepA(ms) {
        return new Promise(a => setTimeout(a, ms));
    }
} //class
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/_Time.js.map