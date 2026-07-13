export default class _Time {
  /**
   * 延遲指定的毫秒數
   * @param ms 延遲毫秒數
   */
  static async sleepA(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }
}