export default class _Log {

    /**
     * @description 記錄程式時間功能的變數
     */
    private static _start: Date = new Date();      //開始時間
    private static _now: Date = new Date();        //目前時間
    //_result: '',    //目前記錄的內容

    public static info(msg: string): void {
        console.log(msg);
    }

    public static error(msg: string): void {
        alert(msg);
    }

    /**
     * @description 初始化記錄程式時間功能
     */
    public static logTimeInit(name?: string): void {
        _Log._start = new Date();
        _Log._now = _Log._start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    }

    /**
     * @description 記錄程式執行時花用的時間
     */
    public static logTime(name: string): void {
        const now = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        const msg = name + ":" + (now.getTime() - _Log._now.getTime()) + "/" + (now.getTime() - _Log._start.getTime());
        console.log(msg);
        _Log._now = new Date();    //reset
    }

} //class