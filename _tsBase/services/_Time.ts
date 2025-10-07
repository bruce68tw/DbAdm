export default class _Time {

    /**
     * An asynchronous function that pauses execution for a specified number of milliseconds.
     * @param ms {number} Milliseconds to sleep.
     * @returns {Promise<void>}
     */
    public static async sleepA(ms: number): Promise<void> {
        return new Promise(a => setTimeout(a, ms));
    }

} //class